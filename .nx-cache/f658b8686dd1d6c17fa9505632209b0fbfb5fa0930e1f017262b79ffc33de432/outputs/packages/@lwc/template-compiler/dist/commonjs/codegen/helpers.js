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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStaticNodes = exports.parseClassNames = exports.styleMapToStyleDeclsAST = exports.parseStyleText = exports.generateTemplateMetadata = exports.memorizeHandler = exports.hasIdAttribute = exports.shouldFlatten = exports.containsDynamicChildren = exports.objectToAST = exports.getMemberExpressionRoot = exports.identifierFromComponentName = void 0;
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const t = __importStar(require("../shared/estree"));
const utils_1 = require("../shared/utils");
const types_1 = require("../shared/types");
const ast_1 = require("../shared/ast");
const constants_1 = require("../shared/constants");
const estree_1 = require("../shared/estree");
const attribute_1 = require("../parser/attribute");
const renderer_hooks_1 = require("../shared/renderer-hooks");
function identifierFromComponentName(name) {
    return t.identifier(`_${(0, utils_1.toPropertyName)(name)}`);
}
exports.identifierFromComponentName = identifierFromComponentName;
function getMemberExpressionRoot(expression) {
    let current = expression;
    while (t.isMemberExpression(current)) {
        current = current.object;
    }
    return current;
}
exports.getMemberExpressionRoot = getMemberExpressionRoot;
function objectToAST(obj, valueMapper) {
    return t.objectExpression(Object.keys(obj).map((key) => t.property(t.literal(key), valueMapper(key))));
}
exports.objectToAST = objectToAST;
function containsDynamicChildren(children) {
    return children.some((child) => {
        if ((0, ast_1.isForBlock)(child) || (0, ast_1.isIf)(child)) {
            return containsDynamicChildren(child.children);
        }
        return false;
    });
}
exports.containsDynamicChildren = containsDynamicChildren;
/**
 * Returns true if the children should be flattened.
 *
 * Children should be flattened if they contain an iterator,
 * a dynamic directive or a slot inside a light dom element.
 */
function shouldFlatten(codeGen, children) {
    return children.some((child) => (0, ast_1.isForBlock)(child) ||
        ((0, ast_1.isParentNode)(child) &&
            // If node is only a control flow node and does not map to a stand alone element.
            // Search children to determine if it should be flattened.
            (((0, ast_1.isIf)(child) && shouldFlatten(codeGen, child.children)) ||
                (codeGen.renderMode === types_1.LWCDirectiveRenderMode.light && (0, ast_1.isSlot)(child)))));
}
exports.shouldFlatten = shouldFlatten;
/**
 * Returns true if the AST element or any of its descendants use an id attribute.
 */
function hasIdAttribute(node) {
    if ((0, ast_1.isBaseElement)(node)) {
        const hasIdAttr = [...node.attributes, ...node.properties].some(({ name }) => name === 'id');
        if (hasIdAttr) {
            return true;
        }
    }
    if ((0, ast_1.isParentNode)(node)) {
        return node.children.some((child) => hasIdAttribute(child));
    }
    return false;
}
exports.hasIdAttribute = hasIdAttribute;
function memorizeHandler(codeGen, componentHandler, handler) {
    // #439 - The handler can only be memorized if it is bound to component instance
    const id = getMemberExpressionRoot(componentHandler);
    const shouldMemorizeHandler = !codeGen.isLocalIdentifier(id);
    // Apply memorization if the handler is memorizable.
    //   $cmp.handlePress -> _m1 || ($ctx._m1 = b($cmp.handlePress))
    if (shouldMemorizeHandler) {
        const memorizedId = codeGen.getMemorizationId();
        const memorization = t.assignmentExpression('=', t.memberExpression(t.identifier(constants_1.TEMPLATE_PARAMS.CONTEXT), memorizedId), handler);
        handler = t.logicalExpression('||', memorizedId, memorization);
    }
    return handler;
}
exports.memorizeHandler = memorizeHandler;
function generateTemplateMetadata(codeGen) {
    const metadataExpressions = [];
    if (codeGen.slotNames.size) {
        const slotsProperty = t.memberExpression(t.identifier(constants_1.TEMPLATE_FUNCTION_NAME), t.identifier('slots'));
        const slotsArray = t.arrayExpression(Array.from(codeGen.slotNames)
            .sort()
            .map((slot) => t.literal(slot)));
        const slotsMetadata = t.assignmentExpression('=', slotsProperty, slotsArray);
        metadataExpressions.push(t.expressionStatement(slotsMetadata));
    }
    const stylesheetsMetadata = t.assignmentExpression('=', t.memberExpression(t.identifier(constants_1.TEMPLATE_FUNCTION_NAME), t.identifier('stylesheets')), t.arrayExpression([]));
    metadataExpressions.push(t.expressionStatement(stylesheetsMetadata));
    // ignore when shadow because we don't want to modify template unnecessarily
    if (codeGen.renderMode === types_1.LWCDirectiveRenderMode.light) {
        const renderModeMetadata = t.assignmentExpression('=', t.memberExpression(t.identifier(constants_1.TEMPLATE_FUNCTION_NAME), t.identifier('renderMode')), t.literal('light'));
        metadataExpressions.push(t.expressionStatement(renderModeMetadata));
    }
    return metadataExpressions;
}
exports.generateTemplateMetadata = generateTemplateMetadata;
const DECLARATION_DELIMITER = /;(?![^(]*\))/g;
const PROPERTY_DELIMITER = /:(.+)/;
// Borrowed from Vue template compiler.
// https://github.com/vuejs/vue/blob/531371b818b0e31a989a06df43789728f23dc4e8/src/platforms/web/util/style.js#L5-L16
function parseStyleText(cssText) {
    const styleMap = {};
    const declarations = cssText.split(DECLARATION_DELIMITER);
    for (const declaration of declarations) {
        if (declaration) {
            const [prop, value] = declaration.split(PROPERTY_DELIMITER);
            if (prop !== undefined && value !== undefined) {
                styleMap[prop.trim()] = value.trim();
            }
        }
    }
    return styleMap;
}
exports.parseStyleText = parseStyleText;
// Given a map of CSS property keys to values, return an array AST like:
// ['color', 'blue', false]    // { color: 'blue' }
// ['background', 'red', true] // { background: 'red !important' }
function styleMapToStyleDeclsAST(styleMap) {
    const styles = Object.entries(styleMap).map(([key, value]) => {
        const important = value.endsWith('!important');
        if (important) {
            // trim off the trailing "!important" (10 chars)
            value = value.substring(0, value.length - 10).trim();
        }
        return [key, value, important];
    });
    return t.arrayExpression(styles.map((arr) => t.arrayExpression(arr.map((val) => t.literal(val)))));
}
exports.styleMapToStyleDeclsAST = styleMapToStyleDeclsAST;
const CLASSNAME_DELIMITER = /\s+/;
function parseClassNames(classNames) {
    return classNames
        .split(CLASSNAME_DELIMITER)
        .map((className) => className.trim())
        .filter((className) => className.length);
}
exports.parseClassNames = parseClassNames;
function isStaticNode(node) {
    let result = true;
    const { name: nodeName, namespace = '', attributes, directives, properties, listeners } = node;
    result && (result = (0, ast_1.isElement)(node));
    // it is an element.
    result && (result = attributes.every(({ name, value }) => {
        return ((0, estree_1.isLiteral)(value) &&
            name !== 'slot' &&
            // check for ScopedId
            name !== 'id' &&
            name !== 'spellcheck' && // spellcheck is specially handled by the vnodes.
            !(0, attribute_1.isIdReferencingAttribute)(name) &&
            // svg href needs sanitization.
            !(0, attribute_1.isSvgUseHref)(nodeName, name, namespace) &&
            // Check for ScopedFragId
            !((0, attribute_1.isAllowedFragOnlyUrlsXHTML)(nodeName, name, namespace) &&
                (0, attribute_1.isFragmentOnlyUrl)(value.value)));
    })); // all attrs are static
    result && (result = directives.length === 0); // do not have any directive
    result && (result = properties.every((prop) => (0, estree_1.isLiteral)(prop.value))); // all properties are static
    result && (result = listeners.length === 0); // do not have any event listener
    return result;
}
function collectStaticNodes(node, staticNodes, state) {
    let childrenAreStatic = true;
    let nodeIsStatic;
    if ((0, ast_1.isText)(node)) {
        nodeIsStatic = (0, estree_1.isLiteral)(node.value);
    }
    else if ((0, ast_1.isComment)(node)) {
        nodeIsStatic = true;
    }
    else {
        // it is ForBlock | If | BaseElement
        node.children.forEach((childNode) => {
            collectStaticNodes(childNode, staticNodes, state);
            childrenAreStatic = childrenAreStatic && staticNodes.has(childNode);
        });
        nodeIsStatic =
            (0, ast_1.isBaseElement)(node) && !(0, renderer_hooks_1.isCustomRendererHookRequired)(node, state) && isStaticNode(node);
    }
    if (nodeIsStatic && childrenAreStatic) {
        staticNodes.add(node);
    }
}
function getStaticNodes(root, state) {
    const staticNodes = new Set();
    root.children.forEach((childNode) => {
        collectStaticNodes(childNode, staticNodes, state);
    });
    return staticNodes;
}
exports.getStaticNodes = getStaticNodes;
//# sourceMappingURL=helpers.js.map