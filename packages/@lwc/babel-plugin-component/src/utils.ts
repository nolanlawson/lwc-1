/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import lineColumn from 'line-column';
import {types} from "@babel/core";
import {NodePath} from "@babel/traverse";
import {generateErrorMessage, LWCErrorInfo} from '@lwc/errors';
import { LWC_PACKAGE_ALIAS } from './constants';
import {DecoratorErrors} from "@lwc/errors/src/compiler/error-info/lwc-class";

function isClassMethod(classMethod, properties = {}) {
    const { kind = 'method', name } = properties;
    return (
        classMethod.isClassMethod({ kind }) &&
        (!name || classMethod.get('key').isIdentifier({ name })) &&
        (properties.static === undefined || classMethod.node.static === properties.static)
    );
}

function isGetterClassMethod(classMethod, properties = {}) {
    return isClassMethod(classMethod, {
        kind: 'get',
        name: properties.name,
        static: properties.static,
    });
}

function isSetterClassMethod(classMethod, properties = {}) {
    return isClassMethod(classMethod, {
        kind: 'set',
        name: properties.name,
        static: properties.static,
    });
}

function staticClassProperty(types, name, expression) {
    const classProperty = types.classProperty(types.identifier(name), expression);
    classProperty.static = true;
    return classProperty;
}

function getEngineImportsStatements(path: NodePath) {
    const programPath = path.isProgram() ? path : path.findParent((node) => node.isProgram()) as NodePath<types.Program>;

    return programPath.get('body').filter((node) => {
        const source = node.get('source') as NodePath<types.Node>;
        return node.isImportDeclaration() && source.isStringLiteral({ value: LWC_PACKAGE_ALIAS });
    });
}

function getEngineImportSpecifiers(path: NodePath) {
    const imports = getEngineImportsStatements(path);
    return (
        imports
            // Flat-map the specifier list for each import statement
            .flatMap((importStatement) => importStatement.get('specifiers'))
            // Skip ImportDefaultSpecifier and ImportNamespaceSpecifier
            .filter((specifier) => specifier.type === 'ImportSpecifier')
            // Get the list of specifiers with their name
            .map((specifier) => {
                const imported = specifier.get('imported').node.name;
                return { name: imported, path: specifier };
            })
    );
}

function normalizeFilename(source) {
    return (
        (source.hub && source.hub.file && source.hub.file.opts && source.hub.file.opts.filename) ||
        null
    );
}

function normalizeLocation(source) {
    const location = (source.node && (source.node.loc || source.node._loc)) || null;
    if (!location) {
        return null;
    }
    const code = source.hub.getCode();
    if (!code) {
        return {
            line: location.start.line,
            column: location.start.column,
        };
    }
    const lineFinder = lineColumn(code);
    const startOffset = lineFinder.toIndex(location.start.line, location.start.column + 1);
    const endOffset = lineFinder.toIndex(location.end.line, location.end.column) + 1;
    const length = endOffset - startOffset;
    return {
        line: location.start.line,
        column: location.start.column,
        start: startOffset,
        length,
    };
}

export type DecoratorErrorOptions = {
    errorInfo: LWCErrorInfo
    messageArgs: any[]
}

function generateError(source: NodePath<types.Node>, { errorInfo, messageArgs }: DecoratorErrorOptions) {
    const message = generateErrorMessage(errorInfo, messageArgs);
    const error = source.buildCodeFrameError(message);

    (error as any).filename = normalizeFilename(source);
    (error as any).loc = normalizeLocation(source);
    (error as any).lwcCode = errorInfo && errorInfo.code;
    return error;
}

export {
    isClassMethod,
    isGetterClassMethod,
    isSetterClassMethod,
    generateError,
    getEngineImportSpecifiers,
    staticClassProperty,
};
