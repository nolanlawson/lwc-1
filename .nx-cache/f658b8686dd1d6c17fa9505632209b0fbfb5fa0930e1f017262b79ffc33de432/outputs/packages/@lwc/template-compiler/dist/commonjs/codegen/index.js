"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const astring = __importStar(require("astring"));
const shared_1 = require("@lwc/shared");
const errors_1 = require("@lwc/errors");
const ast_1 = require("../shared/ast");
const constants_1 = require("../shared/constants");
const t = __importStar(require("../shared/estree"));
const attribute_1 = require("../parser/attribute");
const renderer_hooks_1 = require("../shared/renderer-hooks");
const codegen_1 = __importDefault(require("./codegen"));
const helpers_1 = require("./helpers");
const module_1 = require("./formatters/module");
function transform(codeGen) {
    function transformElement(element, slotParentName) {
        const databag = elementDataBag(element, slotParentName);
        let res;
        if (codeGen.staticNodes.has(element) && (0, ast_1.isElement)(element)) {
            // do not process children of static nodes.
            return codeGen.genHoistedElement(element, slotParentName);
        }
        const children = transformChildren(element);
        // Check wether it has the special directive lwc:dynamic
        const { name } = element;
        const dynamic = element.directives.find(ast_1.isDynamicDirective);
        if (dynamic) {
            const expression = codeGen.bindExpression(dynamic.value);
            res = codeGen.genDynamicElement(name, expression, databag, children);
        }
        else if ((0, ast_1.isComponent)(element)) {
            res = codeGen.genCustomElement(name, (0, helpers_1.identifierFromComponentName)(name), databag, children);
        }
        else if ((0, ast_1.isSlot)(element)) {
            const defaultSlot = children;
            res = codeGen.getSlot(element.slotName, databag, defaultSlot);
        }
        else {
            res = codeGen.genElement(name, databag, children);
        }
        return res;
    }
    function transformText(consecutiveText) {
        return codeGen.genText(consecutiveText.map(({ value }) => {
            return (0, ast_1.isStringLiteral)(value) ? value.value : codeGen.bindExpression(value);
        }));
    }
    function transformComment(comment) {
        return codeGen.genComment(comment.value);
    }
    function transformChildren(parent) {
        const res = [];
        const children = parent.children;
        const childrenIterator = children[Symbol.iterator]();
        let current;
        while ((current = childrenIterator.next()) && !current.done) {
            let child = current.value;
            if ((0, ast_1.isText)(child)) {
                const continuousText = [];
                // Consume all the contiguous text nodes.
                do {
                    continuousText.push(child);
                    current = childrenIterator.next();
                    child = current.value;
                } while (!current.done && (0, ast_1.isText)(child));
                res.push(transformText(continuousText));
                // Early exit if a text node is the last child node.
                if (current.done) {
                    break;
                }
            }
            if ((0, ast_1.isForBlock)(child)) {
                res.push(transformForBlock(child));
            }
            else if ((0, ast_1.isIf)(child)) {
                const children = transformIf(child);
                Array.isArray(children) ? res.push(...children) : res.push(children);
            }
            else if ((0, ast_1.isBaseElement)(child)) {
                const slotParentName = (0, ast_1.isSlot)(parent) ? parent.slotName : undefined;
                res.push(transformElement(child, slotParentName));
            }
            else if ((0, ast_1.isComment)(child) && codeGen.preserveComments) {
                res.push(transformComment(child));
            }
        }
        if ((0, helpers_1.shouldFlatten)(codeGen, children)) {
            if (children.length === 1 && !(0, helpers_1.containsDynamicChildren)(children)) {
                return res[0];
            }
            else {
                return codeGen.genFlatten([t.arrayExpression(res)]);
            }
        }
        else {
            return t.arrayExpression(res);
        }
    }
    function transformIf(ifNode) {
        const expression = transformChildren(ifNode);
        let res;
        if (t.isArrayExpression(expression)) {
            // Bind the expression once for all the template children
            const testExpression = codeGen.bindExpression(ifNode.condition);
            res = t.arrayExpression(expression.elements.map((element) => element !== null
                ? applyInlineIf(ifNode, element, testExpression)
                : null));
        }
        else {
            // If the template has a single children, make sure the ternary expression returns an array
            res = applyInlineIf(ifNode, expression, undefined, t.arrayExpression([]));
        }
        if (t.isArrayExpression(res)) {
            // The `if` transformation does not use the SpreadElement, neither null, therefore we can safely
            // typecast it to t.Expression[]
            res = res.elements;
        }
        return res;
    }
    function applyInlineIf(ifNode, node, testExpression, falseValue) {
        if (!testExpression) {
            testExpression = codeGen.bindExpression(ifNode.condition);
        }
        let leftExpression;
        const modifier = ifNode.modifier;
        /* istanbul ignore else */
        if (modifier === 'true') {
            leftExpression = testExpression;
        }
        else if (modifier === 'false') {
            leftExpression = t.unaryExpression('!', testExpression);
        }
        else if (modifier === 'strict-true') {
            leftExpression = t.binaryExpression('===', testExpression, t.literal(true));
        }
        else {
            // This is a defensive check, should be taken care of during parsing.
            throw (0, errors_1.generateCompilerError)(errors_1.TemplateErrors.UNKNOWN_IF_MODIFIER, {
                messageArgs: [modifier],
            });
        }
        return t.conditionalExpression(leftExpression, node, falseValue !== null && falseValue !== void 0 ? falseValue : t.literal(null));
    }
    function transformForBlock(forBlock) {
        let expression = transformForChildren(forBlock);
        if (t.isArrayExpression(expression) && expression.elements.length === 1) {
            expression = expression.elements[0];
        }
        let res;
        if ((0, ast_1.isForEach)(forBlock)) {
            res = applyInlineFor(forBlock, expression);
        }
        else {
            res = applyInlineForOf(forBlock, expression);
        }
        return res;
    }
    function transformForChildren(forBlock) {
        codeGen.beginScope();
        if ((0, ast_1.isForEach)(forBlock)) {
            const { item, index } = forBlock;
            if (index) {
                codeGen.declareIdentifier(index);
            }
            codeGen.declareIdentifier(item);
        }
        else {
            codeGen.declareIdentifier(forBlock.iterator);
        }
        const children = transformChildren(forBlock);
        codeGen.endScope();
        return children;
    }
    function applyInlineFor(forEach, node) {
        const { expression, item, index } = forEach;
        const params = [item];
        if (index) {
            params.push(index);
        }
        const iterable = codeGen.bindExpression(expression);
        const iterationFunction = t.functionExpression(null, params, t.blockStatement([t.returnStatement(node)]));
        return codeGen.genIterator(iterable, iterationFunction);
    }
    function applyInlineForOf(forOf, node) {
        const { expression, iterator } = forOf;
        const { name: iteratorName } = iterator;
        const argsMapping = {
            value: `${iteratorName}Value`,
            index: `${iteratorName}Index`,
            first: `${iteratorName}First`,
            last: `${iteratorName}Last`,
        };
        const iteratorArgs = Object.values(argsMapping).map((arg) => t.identifier(arg));
        const iteratorObject = t.objectExpression(Object.entries(argsMapping).map(([prop, arg]) => t.property(t.identifier(prop), t.identifier(arg))));
        const iterable = codeGen.bindExpression(expression);
        const iterationFunction = t.functionExpression(null, iteratorArgs, t.blockStatement([
            t.variableDeclaration('const', [
                t.variableDeclarator(t.identifier(iteratorName), iteratorObject),
            ]),
            t.returnStatement(node),
        ]));
        return codeGen.genIterator(iterable, iterationFunction);
    }
    function computeAttrValue(attr, element, addLegacySanitizationHook) {
        const { name: elmName, namespace = '' } = element;
        const { value: attrValue } = attr;
        // Evaluate properties based on their attribute name
        const attrName = (0, ast_1.isProperty)(attr) ? attr.attributeName : attr.name;
        const isUsedAsAttribute = (0, attribute_1.isAttribute)(element, attrName);
        if ((0, ast_1.isExpression)(attrValue)) {
            const expression = codeGen.bindExpression(attrValue);
            // TODO [#2012]: Normalize global boolean attrs values passed to custom elements as props
            if (isUsedAsAttribute && (0, shared_1.isBooleanAttribute)(attrName, elmName)) {
                // We need to do some manipulation to allow the diffing algorithm add/remove the attribute
                // without handling special cases at runtime.
                return codeGen.genBooleanAttributeExpr(expression);
            }
            if (attrName === 'tabindex') {
                return codeGen.genTabIndex([expression]);
            }
            if (attrName === 'id' || (0, attribute_1.isIdReferencingAttribute)(attrName)) {
                return codeGen.genScopedId(expression);
            }
            if (codeGen.scopeFragmentId &&
                (0, attribute_1.isAllowedFragOnlyUrlsXHTML)(elmName, attrName, namespace)) {
                return codeGen.genScopedFragId(expression);
            }
            if (addLegacySanitizationHook && (0, attribute_1.isSvgUseHref)(elmName, attrName, namespace)) {
                codeGen.usedLwcApis.add('sanitizeAttribute');
                return t.callExpression(t.identifier('sanitizeAttribute'), [
                    t.literal(elmName),
                    t.literal(namespace),
                    t.literal(attrName),
                    codeGen.genScopedFragId(expression),
                ]);
            }
            return expression;
        }
        else if ((0, ast_1.isStringLiteral)(attrValue)) {
            if (attrName === 'id') {
                return codeGen.genScopedId(attrValue.value);
            }
            if (attrName === 'spellcheck') {
                return t.literal(attrValue.value.toLowerCase() !== 'false');
            }
            if (!isUsedAsAttribute && (0, shared_1.isBooleanAttribute)(attrName, elmName)) {
                // We are in presence of a string value, for a recognized boolean attribute, which is used as
                // property. for these cases, always set the property to true.
                return t.literal(true);
            }
            if ((0, attribute_1.isIdReferencingAttribute)(attrName)) {
                return codeGen.genScopedId(attrValue.value);
            }
            if (codeGen.scopeFragmentId &&
                (0, attribute_1.isAllowedFragOnlyUrlsXHTML)(elmName, attrName, namespace) &&
                (0, attribute_1.isFragmentOnlyUrl)(attrValue.value)) {
                return codeGen.genScopedFragId(attrValue.value);
            }
            if (addLegacySanitizationHook && (0, attribute_1.isSvgUseHref)(elmName, attrName, namespace)) {
                codeGen.usedLwcApis.add('sanitizeAttribute');
                return t.callExpression(t.identifier('sanitizeAttribute'), [
                    t.literal(elmName),
                    t.literal(namespace),
                    t.literal(attrName),
                    (0, attribute_1.isFragmentOnlyUrl)(attrValue.value)
                        ? codeGen.genScopedFragId(attrValue.value)
                        : t.literal(attrValue.value),
                ]);
            }
            return t.literal(attrValue.value);
        }
        else {
            // A boolean value used in an attribute should always generate .setAttribute(attr.name, ''),
            // regardless if is a boolean attribute or not.
            return isUsedAsAttribute ? t.literal('') : t.literal(attrValue.value);
        }
    }
    function elementDataBag(element, slotParentName) {
        const data = [];
        const { attributes, properties, listeners } = element;
        const innerHTML = element.directives.find(ast_1.isInnerHTMLDirective);
        const forKey = element.directives.find(ast_1.isKeyDirective);
        const dom = element.directives.find(ast_1.isDomDirective);
        const addSanitizationHook = (0, renderer_hooks_1.isCustomRendererHookRequired)(element, codeGen.state);
        // Attributes
        if (attributes.length) {
            const rest = {};
            for (const attr of attributes) {
                const { name, value } = attr;
                if (name === 'class') {
                    // Handle class attribute:
                    // - expression values are turned into a `className` property.
                    // - string values are parsed and turned into a `classMap` object associating
                    //   each individual class name with a `true` boolean.
                    if ((0, ast_1.isExpression)(value)) {
                        const classExpression = codeGen.bindExpression(value);
                        data.push(t.property(t.identifier('className'), classExpression));
                    }
                    else if ((0, ast_1.isStringLiteral)(value)) {
                        const classNames = (0, helpers_1.parseClassNames)(value.value);
                        const classMap = t.objectExpression(classNames.map((name) => t.property(t.literal(name), t.literal(true))));
                        data.push(t.property(t.identifier('classMap'), classMap));
                    }
                }
                else if (name === 'style') {
                    // Handle style attribute:
                    // - expression values are turned into a `style` property.
                    // - string values are parsed and turned into a `styles` array
                    // containing triples of [name, value, important (optional)]
                    if ((0, ast_1.isExpression)(value)) {
                        const styleExpression = codeGen.bindExpression(value);
                        data.push(t.property(t.identifier('style'), styleExpression));
                    }
                    else if ((0, ast_1.isStringLiteral)(value)) {
                        const styleMap = (0, helpers_1.parseStyleText)(value.value);
                        const styleAST = (0, helpers_1.styleMapToStyleDeclsAST)(styleMap);
                        data.push(t.property(t.identifier('styleDecls'), styleAST));
                    }
                }
                else {
                    rest[name] = computeAttrValue(attr, element, !addSanitizationHook);
                }
            }
            // Add all the remaining attributes to an `attrs` object where the key is the attribute
            // name and the value is the computed attribute value.
            if (Object.keys(rest).length) {
                const attrsObj = (0, helpers_1.objectToAST)(rest, (key) => rest[key]);
                data.push(t.property(t.identifier('attrs'), attrsObj));
            }
        }
        // Properties
        const propsObj = t.objectExpression([]);
        // Properties
        if (properties.length) {
            for (const prop of properties) {
                propsObj.properties.push(t.property(t.literal(prop.name), computeAttrValue(prop, element, !addSanitizationHook)));
            }
        }
        // Properties: lwc:inner-html directive
        if (innerHTML) {
            const expr = (0, ast_1.isStringLiteral)(innerHTML.value)
                ? t.literal(innerHTML.value.value)
                : codeGen.bindExpression(innerHTML.value);
            propsObj.properties.push(t.property(t.identifier('innerHTML'), 
            // If lwc:inner-html is added as a directive requiring custom renderer, no need
            // to add the legacy sanitizeHtmlContent hook
            addSanitizationHook ? expr : codeGen.genSanitizedHtmlExpr(expr)));
        }
        if (propsObj.properties.length) {
            data.push(t.property(t.identifier('props'), propsObj));
        }
        // Context
        if (dom || innerHTML) {
            const contextObj = t.objectExpression([
                t.property(t.identifier('lwc'), t.objectExpression([t.property(t.identifier('dom'), t.literal('manual'))])),
            ]);
            data.push(t.property(t.identifier('context'), contextObj));
        }
        // Key property on VNode
        if (forKey) {
            // If element has user-supplied `key` or is in iterator, call `api.k`
            const forKeyExpression = codeGen.bindExpression(forKey.value);
            const generatedKey = codeGen.genKey(t.literal(codeGen.generateKey()), forKeyExpression);
            data.push(t.property(t.identifier('key'), generatedKey));
        }
        else {
            // If standalone element with no user-defined key
            let key = codeGen.generateKey();
            // Parent slot name could be the empty string
            if (slotParentName !== undefined) {
                // Prefixing the key is necessary to avoid conflicts with default content for the
                // slot which might have similar keys. Each vnode will always have a key that starts
                // with a numeric character from compiler. In this case, we add a unique notation
                // for slotted vnodes keys, e.g.: `@foo:1:1`. Note that this is *not* needed for
                // dynamic keys, since `api.k` already scopes based on the iteration.
                key = `@${slotParentName}:${key}`;
            }
            data.push(t.property(t.identifier('key'), t.literal(key)));
        }
        // Event handler
        if (listeners.length) {
            const listenerObj = Object.fromEntries(listeners.map((listener) => [listener.name, listener]));
            const listenerObjAST = (0, helpers_1.objectToAST)(listenerObj, (key) => {
                const componentHandler = codeGen.bindExpression(listenerObj[key].handler);
                const handler = codeGen.genBind(componentHandler);
                return (0, helpers_1.memorizeHandler)(codeGen, componentHandler, handler);
            });
            data.push(t.property(t.identifier('on'), listenerObjAST));
        }
        // SVG handling
        if (element.namespace === shared_1.SVG_NAMESPACE) {
            data.push(t.property(t.identifier('svg'), t.literal(true)));
        }
        if (addSanitizationHook) {
            codeGen.usedLwcApis.add(constants_1.RENDERER);
            data.push(t.property(t.identifier(constants_1.RENDERER), t.identifier(constants_1.RENDERER)));
        }
        return t.objectExpression(data);
    }
    return transformChildren(codeGen.root);
}
function generateTemplateFunction(codeGen) {
    const returnedValue = transform(codeGen);
    const args = [
        constants_1.TEMPLATE_PARAMS.API,
        constants_1.TEMPLATE_PARAMS.INSTANCE,
        constants_1.TEMPLATE_PARAMS.SLOT_SET,
        constants_1.TEMPLATE_PARAMS.CONTEXT,
    ].map((id) => t.identifier(id));
    const usedApis = Object.keys(codeGen.usedApis);
    const body = usedApis.length === 0
        ? []
        : [
            t.variableDeclaration('const', [
                t.variableDeclarator(t.objectPattern(usedApis.map((name) => t.assignmentProperty(t.identifier(name), codeGen.usedApis[name]))), t.identifier(constants_1.TEMPLATE_PARAMS.API)),
            ]),
        ];
    if (codeGen.memorizedIds.length) {
        body.push(t.variableDeclaration('const', [
            t.variableDeclarator(t.objectPattern(codeGen.memorizedIds.map((id) => t.assignmentProperty(id, id, { shorthand: true }))), t.identifier(constants_1.TEMPLATE_PARAMS.CONTEXT)),
        ]));
    }
    body.push(t.returnStatement(returnedValue));
    return t.functionDeclaration(t.identifier(constants_1.TEMPLATE_FUNCTION_NAME), args, t.blockStatement(body, {
        trailingComments: [t.comment(shared_1.LWC_VERSION_COMMENT)],
    }));
}
function default_1(root, state) {
    const scopeFragmentId = (0, helpers_1.hasIdAttribute)(root);
    const codeGen = new codegen_1.default({
        root,
        state,
        scopeFragmentId,
    });
    const templateFunction = generateTemplateFunction(codeGen);
    const program = (0, module_1.format)(templateFunction, codeGen);
    return astring.generate(program, { comments: true });
}
exports.default = default_1;
//# sourceMappingURL=index.js.map