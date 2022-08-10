"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProperty = exports.isPreserveCommentsDirective = exports.isRenderModeDirective = exports.isKeyDirective = exports.isInnerHTMLDirective = exports.isDomDirective = exports.isDynamicDirective = exports.isParentNode = exports.isIf = exports.isForBlock = exports.isForEach = exports.isForOf = exports.isBooleanLiteral = exports.isStringLiteral = exports.isExpression = exports.isComment = exports.isText = exports.isBaseElement = exports.isSlot = exports.isComponent = exports.isRoot = exports.isElement = exports.property = exports.attribute = exports.renderModeDirective = exports.preserveCommentsDirective = exports.innerHTMLDirective = exports.domDirective = exports.dynamicDirective = exports.keyDirective = exports.eventListener = exports.ifNode = exports.forOf = exports.forEach = exports.literal = exports.sourceLocation = exports.elementSourceLocation = exports.comment = exports.text = exports.slot = exports.component = exports.element = exports.root = void 0;
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const shared_1 = require("@lwc/shared");
function root(parse5ElmLocation) {
    return {
        type: 'Root',
        location: elementSourceLocation(parse5ElmLocation),
        directives: [],
        children: [],
    };
}
exports.root = root;
function element(parse5Elm, parse5ElmLocation) {
    return {
        type: 'Element',
        name: parse5Elm.nodeName,
        namespace: parse5Elm.namespaceURI,
        location: elementSourceLocation(parse5ElmLocation),
        attributes: [],
        properties: [],
        directives: [],
        listeners: [],
        children: [],
    };
}
exports.element = element;
function component(parse5Elm, parse5ElmLocation) {
    return {
        type: 'Component',
        name: parse5Elm.nodeName,
        namespace: shared_1.HTML_NAMESPACE,
        location: elementSourceLocation(parse5ElmLocation),
        attributes: [],
        properties: [],
        directives: [],
        listeners: [],
        children: [],
    };
}
exports.component = component;
function slot(slotName, parse5ElmLocation) {
    return {
        type: 'Slot',
        name: 'slot',
        namespace: shared_1.HTML_NAMESPACE,
        slotName,
        location: elementSourceLocation(parse5ElmLocation),
        attributes: [],
        properties: [],
        directives: [],
        listeners: [],
        children: [],
    };
}
exports.slot = slot;
function text(raw, value, parse5Location) {
    return {
        type: 'Text',
        raw,
        value,
        location: sourceLocation(parse5Location),
    };
}
exports.text = text;
function comment(raw, value, parse5Location) {
    return {
        type: 'Comment',
        raw,
        value,
        location: sourceLocation(parse5Location),
    };
}
exports.comment = comment;
function elementSourceLocation(parse5ElmLocation) {
    const elementLocation = sourceLocation(parse5ElmLocation);
    const startTag = sourceLocation(parse5ElmLocation.startTag);
    // endTag must be optional because Parse5 currently fails to collect end tag location for element with a tag name
    // containing an upper case character (inikulin/parse5#352).
    const endTag = parse5ElmLocation.endTag
        ? sourceLocation(parse5ElmLocation.endTag)
        : parse5ElmLocation.endTag;
    return { ...elementLocation, startTag, endTag };
}
exports.elementSourceLocation = elementSourceLocation;
function sourceLocation(location) {
    return {
        startLine: location.startLine,
        startColumn: location.startCol,
        endLine: location.endLine,
        endColumn: location.endCol,
        start: location.startOffset,
        end: location.endOffset,
    };
}
exports.sourceLocation = sourceLocation;
function literal(value) {
    return {
        type: 'Literal',
        value,
    };
}
exports.literal = literal;
function forEach(expression, elementLocation, directiveLocation, item, index) {
    return {
        type: 'ForEach',
        expression,
        item,
        index,
        location: elementLocation,
        directiveLocation,
        children: [],
    };
}
exports.forEach = forEach;
function forOf(expression, iterator, elementLocation, directiveLocation) {
    return {
        type: 'ForOf',
        expression,
        iterator,
        location: elementLocation,
        directiveLocation,
        children: [],
    };
}
exports.forOf = forOf;
function ifNode(modifier, condition, elementLocation, directiveLocation) {
    return {
        type: 'If',
        modifier,
        condition,
        location: elementLocation,
        directiveLocation,
        children: [],
    };
}
exports.ifNode = ifNode;
function eventListener(name, handler, location) {
    return {
        type: 'EventListener',
        name,
        handler,
        location,
    };
}
exports.eventListener = eventListener;
function keyDirective(value, location) {
    return {
        type: 'Directive',
        name: 'Key',
        value,
        location,
    };
}
exports.keyDirective = keyDirective;
function dynamicDirective(value, location) {
    return {
        type: 'Directive',
        name: 'Dynamic',
        value,
        location,
    };
}
exports.dynamicDirective = dynamicDirective;
function domDirective(lwcDomAttr, location) {
    return {
        type: 'Directive',
        name: 'Dom',
        value: literal(lwcDomAttr),
        location,
    };
}
exports.domDirective = domDirective;
function innerHTMLDirective(value, location) {
    return {
        type: 'Directive',
        name: 'InnerHTML',
        value,
        location,
    };
}
exports.innerHTMLDirective = innerHTMLDirective;
function preserveCommentsDirective(preserveComments, location) {
    return {
        type: 'Directive',
        name: 'PreserveComments',
        value: literal(preserveComments),
        location,
    };
}
exports.preserveCommentsDirective = preserveCommentsDirective;
function renderModeDirective(renderMode, location) {
    return {
        type: 'Directive',
        name: 'RenderMode',
        value: literal(renderMode),
        location,
    };
}
exports.renderModeDirective = renderModeDirective;
function attribute(name, value, location) {
    return {
        type: 'Attribute',
        name,
        value,
        location,
    };
}
exports.attribute = attribute;
function property(name, attributeName, value, location) {
    return {
        type: 'Property',
        name,
        attributeName,
        value,
        location,
    };
}
exports.property = property;
function isElement(node) {
    return node.type === 'Element';
}
exports.isElement = isElement;
function isRoot(node) {
    return node.type === 'Root';
}
exports.isRoot = isRoot;
function isComponent(node) {
    return node.type === 'Component';
}
exports.isComponent = isComponent;
function isSlot(node) {
    return node.type === 'Slot';
}
exports.isSlot = isSlot;
function isBaseElement(node) {
    return isElement(node) || isComponent(node) || isSlot(node);
}
exports.isBaseElement = isBaseElement;
function isText(node) {
    return node.type === 'Text';
}
exports.isText = isText;
function isComment(node) {
    return node.type === 'Comment';
}
exports.isComment = isComment;
function isExpression(node) {
    return node.type === 'Identifier' || node.type === 'MemberExpression';
}
exports.isExpression = isExpression;
function isStringLiteral(node) {
    return node.type === 'Literal' && typeof node.value === 'string';
}
exports.isStringLiteral = isStringLiteral;
function isBooleanLiteral(node) {
    return node.type === 'Literal' && typeof node.value === 'boolean';
}
exports.isBooleanLiteral = isBooleanLiteral;
function isForOf(node) {
    return node.type === 'ForOf';
}
exports.isForOf = isForOf;
function isForEach(node) {
    return node.type === 'ForEach';
}
exports.isForEach = isForEach;
function isForBlock(node) {
    return isForOf(node) || isForEach(node);
}
exports.isForBlock = isForBlock;
function isIf(node) {
    return node.type === 'If';
}
exports.isIf = isIf;
function isParentNode(node) {
    return isBaseElement(node) || isRoot(node) || isForBlock(node) || isIf(node);
}
exports.isParentNode = isParentNode;
function isDynamicDirective(directive) {
    return directive.name === 'Dynamic';
}
exports.isDynamicDirective = isDynamicDirective;
function isDomDirective(directive) {
    return directive.name === 'Dom';
}
exports.isDomDirective = isDomDirective;
function isInnerHTMLDirective(directive) {
    return directive.name === 'InnerHTML';
}
exports.isInnerHTMLDirective = isInnerHTMLDirective;
function isKeyDirective(directive) {
    return directive.name === 'Key';
}
exports.isKeyDirective = isKeyDirective;
function isRenderModeDirective(directive) {
    return directive.name === 'RenderMode';
}
exports.isRenderModeDirective = isRenderModeDirective;
function isPreserveCommentsDirective(directive) {
    return directive.name === 'PreserveComments';
}
exports.isPreserveCommentsDirective = isPreserveCommentsDirective;
function isProperty(node) {
    return node.type === 'Property';
}
exports.isProperty = isProperty;
//# sourceMappingURL=ast.js.map