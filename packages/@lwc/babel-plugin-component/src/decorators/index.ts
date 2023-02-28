/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import {Node, types, Visitor} from "@babel/core";
import {NodePath} from "@babel/traverse";
import moduleImports from '@babel/helper-module-imports';
import { DecoratorErrors } from '@lwc/errors';
import { DECORATOR_TYPES, LWC_PACKAGE_ALIAS, REGISTER_DECORATORS_ID } from '../constants';
import { generateError, isClassMethod, isSetterClassMethod, isGetterClassMethod } from '../utils';
import {BabelAPI, LwcBabelPluginPass} from "../types";
import api from './api';
import wire from './wire';
import track from './track';

const DECORATOR_TRANSFORMS = [api, wire, track];
const AVAILABLE_DECORATORS = DECORATOR_TRANSFORMS.map((transform) => transform.name).join(', ');

export type DecoratorMeta = {
    name: 'api' | 'track' | 'wire',
    propertyName: any,
    path:  NodePath<types.Decorator>,
    decoratedNodeType: string,
    type?: 'property' | 'getter' | 'setter' | 'method',
}

function isLwcDecoratorName(name: string) {
    return DECORATOR_TRANSFORMS.some((transform) => transform.name === name);
}

/** Returns a list of all the references to an identifier */
function getReferences(identifier) {
    return identifier.scope.getBinding(identifier.node.name).referencePaths;
}

/** Returns the type of decorator depdending on the property or method if get applied to */
function getDecoratedNodeType(decoratorPath) {
    const propertyOrMethod = decoratorPath.parentPath;
    if (isClassMethod(propertyOrMethod)) {
        return DECORATOR_TYPES.METHOD;
    } else if (isGetterClassMethod(propertyOrMethod)) {
        return DECORATOR_TYPES.GETTER;
    } else if (isSetterClassMethod(propertyOrMethod)) {
        return DECORATOR_TYPES.SETTER;
    } else if (propertyOrMethod.isClassProperty()) {
        return DECORATOR_TYPES.PROPERTY;
    } else {
        throw generateError(propertyOrMethod, {
            errorInfo: DecoratorErrors.INVALID_DECORATOR_TYPE,
        });
    }
}

function validateImportedLwcDecoratorUsage(engineImportSpecifiers) {
    engineImportSpecifiers
        .filter(({ name }) => isLwcDecoratorName(name))
        .reduce((acc, { name, path }) => {
            // Get a list of all the  local references
            const local = path.get('imported');
            const references = getReferences(local).map((reference) => ({
                name,
                reference,
            }));

            return [...acc, ...references];
        }, [])
        .forEach(({ name, reference }) => {
            // Get the decorator from the identifier
            // If the the decorator is:
            //   - an identifier @track : the decorator is the parent of the identifier
            //   - a call expression @wire("foo") : the decorator is the grand-parent of the identifier
            const decorator = reference.parentPath.isDecorator()
                ? reference.parentPath
                : reference.parentPath.parentPath;

            if (!decorator.isDecorator()) {
                throw generateError(decorator, {
                    errorInfo: DecoratorErrors.IS_NOT_DECORATOR,
                    messageArgs: [name],
                });
            }

            const propertyOrMethod = decorator.parentPath;
            if (!propertyOrMethod.isClassProperty() && !propertyOrMethod.isClassMethod()) {
                throw generateError(propertyOrMethod, {
                    errorInfo: DecoratorErrors.IS_NOT_CLASS_PROPERTY_OR_CLASS_METHOD,
                    messageArgs: [name],
                });
            }
        });
}

function isImportedFromLwcSource(decoratorBinding) {
    const bindingPath = decoratorBinding.path;
    return bindingPath.isImportSpecifier() && bindingPath.parent.source.value === 'lwc';
}

/** Validate the usage of decorator by calling each validation function */
function validate(decorators) {
    for (const { name, path } of decorators) {
        const binding = path.scope.getBinding(name);
        if (binding === undefined || !isImportedFromLwcSource(binding)) {
            throw generateInvalidDecoratorError(path);
        }
    }
    DECORATOR_TRANSFORMS.forEach(({ validate }) => validate(decorators));
}

/** Remove import specifiers. It also removes the import statement if the specifier list becomes empty */
function removeImportedDecoratorSpecifiers(engineImportSpecifiers) {
    engineImportSpecifiers
        .filter(({ name }) => isLwcDecoratorName(name))
        .forEach(({ path }) => {
            const importStatement = path.parentPath;
            path.remove();
            if (importStatement.get('specifiers').length === 0) {
                importStatement.remove();
            }
        });
}

function generateInvalidDecoratorError(path) {
    const expressionPath = path.get('expression');
    const { node } = path;
    const { expression } = node;

    let name;
    if (expressionPath.isIdentifier()) {
        name = expression.name;
    } else if (expressionPath.isCallExpression()) {
        name = expression.callee.name;
    }

    if (name) {
        return generateError(path.parentPath, {
            errorInfo: DecoratorErrors.INVALID_DECORATOR_WITH_NAME,
            messageArgs: [name, AVAILABLE_DECORATORS, LWC_PACKAGE_ALIAS],
        });
    } else {
        return generateError(path.parentPath, {
            errorInfo: DecoratorErrors.INVALID_DECORATOR,
            messageArgs: [AVAILABLE_DECORATORS, LWC_PACKAGE_ALIAS],
        });
    }
}

function collectDecoratorPaths(bodyItems: NodePath<Node>[]) {
    return bodyItems.reduce((acc: NodePath<Node>[], bodyItem) => {
        const decorators = bodyItem.get('decorators');
        if (Array.isArray(decorators)) {
            acc.push(...decorators);
        }
        return acc;
    }, []);
}

function getDecoratorMetadata(decoratorPath: NodePath<types.Node>): DecoratorMeta {
    const expressionPath = decoratorPath.get('expression') as NodePath<types.Node>;

    let name: 'api' | 'track' | 'wire';
    if (expressionPath.isIdentifier()) {
        name = expressionPath.node.name as ('api' | 'track' | 'wire');
    } else if (expressionPath.isCallExpression()) {
        name = (expressionPath.node.callee as types.V8IntrinsicIdentifier).name as ('api' | 'track' | 'wire');
    } else {
        throw generateInvalidDecoratorError(decoratorPath);
    }

    // @ts-ignore
    const propertyName = decoratorPath.parent.key.name
    const decoratedNodeType = getDecoratedNodeType(decoratorPath);

    return {
        name,
        propertyName,
        path: decoratorPath,
        decoratedNodeType,
    };
}

function getMetadataObjectPropertyList(t: typeof types, decoratorMetas: DecoratorMeta[], classBodyItems: NodePath<types.Node>[]) {
    const list = [
        ...api.transform(t, decoratorMetas, classBodyItems),
        ...track.transform(t, decoratorMetas),
        ...wire.transform(t, decoratorMetas),
    ];

    const fieldNames = classBodyItems
        .filter((field) => field.isClassProperty({ computed: false, static: false }))
        .filter((field) => !field.node.decorators)
        .map((field) => field.node.key.name);
    if (fieldNames.length) {
        list.push(t.objectProperty(t.identifier('fields'), t.valueToNode(fieldNames)));
    }

    return list;
}

function decorators({ types: t }: BabelAPI): Visitor<LwcBabelPluginPass> {
    function createRegisterDecoratorsCallExpression(path:  NodePath<types.ClassDeclaration> | NodePath<types.ClassExpression>, classExpression: types.ClassExpression, props: any[]) {
        const id = moduleImports.addNamed(path, REGISTER_DECORATORS_ID, LWC_PACKAGE_ALIAS);
        return t.callExpression(id, [classExpression, t.objectExpression(props)]);
    }

    // Babel reinvokes visitors for node reinsertion so we use this to avoid an infinite loop.
    const visitedClasses = new WeakSet();

    return {
        Class(path) {
            const { node } = path;

            if (visitedClasses.has(node)) {
                return;
            }
            visitedClasses.add(node);

            const classBodyItems: NodePath<Node>[] = path.get('body.body') as NodePath<Node>[];
            if (classBodyItems.length === 0) {
                return;
            }

            const decoratorPaths = collectDecoratorPaths(classBodyItems);
            const decoratorMetas = decoratorPaths.map(getDecoratorMetadata);

            validate(decoratorMetas);

            const metaPropertyList = getMetadataObjectPropertyList(
                t,
                decoratorMetas,
                classBodyItems
            );
            if (metaPropertyList.length === 0) {
                return;
            }

            decoratorPaths.forEach((path) => path.remove());

            const isAnonymousClassDeclaration =
                path.isClassDeclaration() && !path.get('id').isIdentifier();
            const shouldTransformAsClassExpression =
                path.isClassExpression() || isAnonymousClassDeclaration;

            if (shouldTransformAsClassExpression) {
                // Example:
                //      export default class extends LightningElement {}
                // Output:
                //      export default registerDecorators(class extends LightningElement {});
                // if it does not have an id, we can treat it as a ClassExpression
                const classExpression = t.toExpression(node);
                path.replaceWith(
                    createRegisterDecoratorsCallExpression(path, classExpression, metaPropertyList)
                );
            } else {
                // Example: export default class NamedClass extends LightningElement {}
                // Output:
                //      export default class NamedClass extends LightningElement {}
                //      registerDecorators(NamedClass);
                // Note: This will be further transformed
                const statementPath = path.getStatementParent();
                statementPath!.insertAfter(
                    t.expressionStatement(
                        createRegisterDecoratorsCallExpression(path, node.id, metaPropertyList)
                    )
                );
            }
        },
    };
}

export {
    decorators,
    removeImportedDecoratorSpecifiers,
    validateImportedLwcDecoratorUsage,
};
