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
const shared_1 = require("@lwc/shared");
const errors_1 = require("@lwc/errors");
const t = __importStar(require("../shared/estree"));
const parse5Utils = __importStar(require("../shared/parse5"));
const ast = __importStar(require("../shared/ast"));
const types_1 = require("../shared/types");
const utils_1 = require("../shared/utils");
const constants_1 = require("../shared/constants");
const parser_1 = __importDefault(require("./parser"));
const html_1 = require("./html");
const expression_1 = require("./expression");
const attribute_1 = require("./attribute");
const constants_2 = require("./constants");
function attributeExpressionReferencesForOfIndex(attribute, forOf) {
    const { value } = attribute;
    // if not an expression, it is not referencing iterator index
    if (!t.isMemberExpression(value)) {
        return false;
    }
    const { object, property } = value;
    if (!t.isIdentifier(object) || !t.isIdentifier(property)) {
        return false;
    }
    if (forOf.iterator.name !== object.name) {
        return false;
    }
    return property.name === 'index';
}
function attributeExpressionReferencesForEachIndex(attribute, forEach) {
    const { index } = forEach;
    const { value } = attribute;
    // No index defined on foreach
    if (!index || !t.isIdentifier(index) || !t.isIdentifier(value)) {
        return false;
    }
    return index.name === value.name;
}
function parse(source, state) {
    const ctx = new parser_1.default(source, state.config);
    const fragment = (0, html_1.parseHTML)(ctx, source);
    if (ctx.warnings.some((_) => _.level === errors_1.DiagnosticLevel.Error)) {
        return { warnings: ctx.warnings };
    }
    const root = ctx.withErrorRecovery(() => {
        const templateRoot = getTemplateRoot(ctx, fragment);
        return parseRoot(ctx, templateRoot);
    });
    return { root, warnings: ctx.warnings };
}
exports.default = parse;
function parseRoot(ctx, parse5Elm) {
    const { sourceCodeLocation: rootLocation } = parse5Elm;
    /* istanbul ignore if */
    if (!rootLocation) {
        // Parse5 will recover from invalid HTML. When this happens the node's sourceCodeLocation will be undefined.
        // https://github.com/inikulin/parse5/blob/master/packages/parse5/docs/options/parser-options.md#sourcecodelocationinfo
        // This is a defensive check as this should never happen for the root template.
        throw new Error('An internal parsing error occurred during node creation; the root template node does not have a sourceCodeLocation.');
    }
    if (parse5Elm.tagName !== 'template') {
        ctx.throw(errors_1.ParserDiagnostics.ROOT_TAG_SHOULD_BE_TEMPLATE, [parse5Elm.tagName], ast.sourceLocation(rootLocation));
    }
    const parsedAttr = parseAttributes(ctx, parse5Elm, rootLocation);
    const root = ast.root(rootLocation);
    applyRootLwcDirectives(ctx, parsedAttr, root);
    ctx.setRootDirective(root);
    validateRoot(ctx, parsedAttr, root);
    parseChildren(ctx, parse5Elm, root, rootLocation);
    return root;
}
/**
 * This function will create LWC AST nodes from an HTML element.
 * A node is generated for each LWC HTML template directive attached to the
 * element as well as the element itself (excluding template tag elements).
 *
 * The hierarchy of nodes created is as follows:
 *
 * For/Iterator -> If -> Element/Component/Slot
 *
 * For each node that's created, the parent will be the most recently
 * created node otherwise it will be parentNode.
 *
 * Note: Not every node in the hierarchy is guaranteed to be created, for example,
 * <div></div> will only create an Element node.
 */
function parseElement(ctx, parse5Elm, parentNode, parse5ParentLocation) {
    var _a;
    const parse5ElmLocation = parseElementLocation(ctx, parse5Elm, parse5ParentLocation);
    const parsedAttr = parseAttributes(ctx, parse5Elm, parse5ElmLocation);
    // Create an AST node for each LWC template directive and chain them into a parent child hierarchy
    const directive = parseElementDirectives(ctx, parsedAttr, parentNode, parse5ElmLocation);
    // Create an AST node for the HTML element (excluding template tag elements) and add as child to parent
    const element = parseBaseElement(ctx, parsedAttr, parse5Elm, directive || parentNode, parse5ElmLocation);
    if (element) {
        applyHandlers(ctx, parsedAttr, element);
        applyKey(ctx, parsedAttr, element);
        applyLwcDirectives(ctx, parsedAttr, element);
        applyAttributes(ctx, parsedAttr, element);
        validateElement(ctx, element, parse5Elm);
        validateAttributes(ctx, parsedAttr, element);
        validateProperties(ctx, element);
    }
    else {
        // parseBaseElement will always return an element EXCEPT when processing a <template>
        validateTemplate(ctx, parsedAttr, parse5Elm, parse5ElmLocation);
    }
    // The next step is to assign children to the last AST node created by this function.
    // If no element or directive was created, the HTML element is a template tag element without LWC HTML directives.
    //
    // ex: <template style="foo">hello</template>
    //
    // These type of templates should be ignored and throw an error however, for backwards compatibility,
    // we will reparent their children to the template's parent.
    const currentNode = (_a = element !== null && element !== void 0 ? element : directive) !== null && _a !== void 0 ? _a : parentNode;
    // pareChildren will iterate through parse5Elm's children and assign newly created AST nodes as children of currentNode.
    parseChildren(ctx, parse5Elm, currentNode, parse5ElmLocation);
    validateChildren(ctx, element);
}
function parseElementLocation(ctx, parse5Elm, parse5ParentLocation) {
    var _a;
    let location = parse5Elm.sourceCodeLocation;
    // AST hierarchy is ForBlock > If > BaseElement, if immediate parent is not a BaseElement it is a template.
    const parentNode = ctx.findAncestor(ast.isBaseElement, () => false);
    if (!location) {
        // Parse5 will recover from invalid HTML. When this happens the element's sourceCodeLocation will be undefined.
        // https://github.com/inikulin/parse5/blob/master/packages/parse5/docs/options/parser-options.md#sourcecodelocationinfo
        ctx.warn(errors_1.ParserDiagnostics.INVALID_HTML_RECOVERY, [
            parse5Elm.tagName,
            (_a = parentNode === null || parentNode === void 0 ? void 0 : parentNode.name) !== null && _a !== void 0 ? _a : 'template',
        ]);
    }
    // With parse5 automatically recovering from invalid HTML, some AST nodes might not have
    // location information. For example when a <table> element has a <tr> child element, parse5
    // creates a <tbody> element in the middle without location information. In this case, we
    // can safely skip the closing tag validation.
    let current = parse5Elm;
    while (!location && parse5Utils.isElementNode(current.parentNode)) {
        current = current.parentNode;
        location = current.sourceCodeLocation;
    }
    return location !== null && location !== void 0 ? location : parse5ParentLocation;
}
function parseElementDirectives(ctx, parsedAttr, parent, parse5ElmLocation) {
    let current;
    const parsers = [parseForEach, parseForOf, parseIf];
    for (const parser of parsers) {
        const prev = current || parent;
        const node = parser(ctx, parsedAttr, parse5ElmLocation);
        if (node) {
            ctx.addNodeCurrentScope(node);
            prev.children.push(node);
            current = node;
        }
    }
    return current;
}
function parseBaseElement(ctx, parsedAttr, parse5Elm, parent, parse5ElmLocation) {
    const { tagName: tag } = parse5Elm;
    let element;
    if (tag === 'slot') {
        element = parseSlot(ctx, parsedAttr, parse5ElmLocation);
        // Skip creating template nodes
    }
    else if (tag !== 'template') {
        // Check if the element tag is a valid custom element name and is not part of known standard
        // element name containing a dash.
        if (!(0, utils_1.isCustomElementTag)(tag)) {
            element = ast.element(parse5Elm, parse5ElmLocation);
        }
        else {
            element = ast.component(parse5Elm, parse5ElmLocation);
        }
    }
    if (element) {
        ctx.addNodeCurrentScope(element);
        parent.children.push(element);
    }
    return element;
}
function parseChildren(ctx, parse5Parent, parent, parse5ParentLocation) {
    var _a;
    const children = ((_a = parse5Utils.getTemplateContent(parse5Parent)) !== null && _a !== void 0 ? _a : parse5Parent).childNodes;
    for (const child of children) {
        ctx.withErrorRecovery(() => {
            if (parse5Utils.isElementNode(child)) {
                ctx.beginScope();
                parseElement(ctx, child, parent, parse5ParentLocation);
                ctx.endScope();
            }
            else if (parse5Utils.isTextNode(child)) {
                const textNodes = parseText(ctx, child);
                parent.children.push(...textNodes);
            }
            else if (parse5Utils.isCommentNode(child)) {
                const commentNode = parseComment(child);
                parent.children.push(commentNode);
            }
        });
    }
}
function parseText(ctx, parse5Text) {
    const parsedTextNodes = [];
    const location = parse5Text.sourceCodeLocation;
    /* istanbul ignore if */
    if (!location) {
        // Parse5 will recover from invalid HTML. When this happens the node's sourceCodeLocation will be undefined.
        // https://github.com/inikulin/parse5/blob/master/packages/parse5/docs/options/parser-options.md#sourcecodelocationinfo
        // This is a defensive check as this should never happen for TextNode.
        throw new Error('An internal parsing error occurred during node creation; a text node was found without a sourceCodeLocation.');
    }
    // Extract the raw source to avoid HTML entity decoding done by parse5
    const rawText = (0, html_1.cleanTextNode)(ctx.getSource(location.startOffset, location.endOffset));
    if (!rawText.trim().length) {
        return parsedTextNodes;
    }
    // Split the text node content arround expression and create node for each
    const tokenizedContent = rawText.split(constants_2.EXPRESSION_RE);
    for (const token of tokenizedContent) {
        // Don't create nodes for emtpy strings
        if (!token.length) {
            continue;
        }
        let value;
        if ((0, expression_1.isExpression)(token)) {
            value = (0, expression_1.parseExpression)(ctx, token, ast.sourceLocation(location));
        }
        else {
            value = ast.literal((0, html_1.decodeTextContent)(token));
        }
        parsedTextNodes.push(ast.text(token, value, location));
    }
    return parsedTextNodes;
}
function parseComment(parse5Comment) {
    const location = parse5Comment.sourceCodeLocation;
    /* istanbul ignore if */
    if (!location) {
        // Parse5 will recover from invalid HTML. When this happens the node's sourceCodeLocation will be undefined.
        // https://github.com/inikulin/parse5/blob/master/packages/parse5/docs/options/parser-options.md#sourcecodelocationinfo
        // This is a defensive check as this should never happen for CommentNode.
        throw new Error('An internal parsing error occurred during node creation; a comment node was found without a sourceCodeLocation.');
    }
    return ast.comment(parse5Comment.data, (0, html_1.decodeTextContent)(parse5Comment.data), location);
}
function getTemplateRoot(ctx, documentFragment) {
    // Filter all the empty text nodes
    const validRoots = documentFragment.childNodes.filter((child) => parse5Utils.isElementNode(child) ||
        (parse5Utils.isTextNode(child) && child.value.trim().length));
    if (validRoots.length > 1) {
        const duplicateRoot = validRoots[1].sourceCodeLocation;
        ctx.throw(errors_1.ParserDiagnostics.MULTIPLE_ROOTS_FOUND, [], duplicateRoot ? ast.sourceLocation(duplicateRoot) : duplicateRoot);
    }
    const [root] = validRoots;
    if (!root || !parse5Utils.isElementNode(root)) {
        ctx.throw(errors_1.ParserDiagnostics.MISSING_ROOT_TEMPLATE_TAG);
    }
    return root;
}
function applyHandlers(ctx, parsedAttr, element) {
    let eventHandlerAttribute;
    while ((eventHandlerAttribute = parsedAttr.pick(constants_2.EVENT_HANDLER_RE))) {
        const { name } = eventHandlerAttribute;
        if (!ast.isExpression(eventHandlerAttribute.value)) {
            ctx.throwOnNode(errors_1.ParserDiagnostics.EVENT_HANDLER_SHOULD_BE_EXPRESSION, eventHandlerAttribute);
        }
        if (!name.match(constants_2.EVENT_HANDLER_NAME_RE)) {
            ctx.throwOnNode(errors_1.ParserDiagnostics.INVALID_EVENT_NAME, eventHandlerAttribute, [name]);
        }
        // Strip the `on` prefix from the event handler name
        const eventName = name.slice(2);
        const listener = ast.eventListener(eventName, eventHandlerAttribute.value, eventHandlerAttribute.location);
        element.listeners.push(listener);
    }
}
function parseIf(ctx, parsedAttr, parse5ElmLocation) {
    const ifAttribute = parsedAttr.pick(constants_2.IF_RE);
    if (!ifAttribute) {
        return;
    }
    if (!ast.isExpression(ifAttribute.value)) {
        ctx.throwOnNode(errors_1.ParserDiagnostics.IF_DIRECTIVE_SHOULD_BE_EXPRESSION, ifAttribute);
    }
    const [, modifier] = ifAttribute.name.split(':');
    if (!constants_2.VALID_IF_MODIFIER.has(modifier)) {
        ctx.throwOnNode(errors_1.ParserDiagnostics.UNEXPECTED_IF_MODIFIER, ifAttribute, [modifier]);
    }
    return ast.ifNode(modifier, ifAttribute.value, ast.sourceLocation(parse5ElmLocation), ifAttribute.location);
}
function applyRootLwcDirectives(ctx, parsedAttr, root) {
    const lwcAttribute = parsedAttr.get(constants_2.LWC_RE);
    if (!lwcAttribute) {
        return;
    }
    applyLwcRenderModeDirective(ctx, parsedAttr, root);
    applyLwcPreserveCommentsDirective(ctx, parsedAttr, root);
}
function applyLwcRenderModeDirective(ctx, parsedAttr, root) {
    const lwcRenderModeAttribute = parsedAttr.pick(constants_2.ROOT_TEMPLATE_DIRECTIVES.RENDER_MODE);
    if (!lwcRenderModeAttribute) {
        return;
    }
    const { value: renderDomAttr } = lwcRenderModeAttribute;
    if (!ast.isStringLiteral(renderDomAttr) ||
        (renderDomAttr.value !== types_1.LWCDirectiveRenderMode.shadow &&
            renderDomAttr.value !== types_1.LWCDirectiveRenderMode.light)) {
        ctx.throwOnNode(errors_1.ParserDiagnostics.LWC_RENDER_MODE_INVALID_VALUE, root);
    }
    root.directives.push(ast.renderModeDirective(renderDomAttr.value, lwcRenderModeAttribute.location));
}
function applyLwcPreserveCommentsDirective(ctx, parsedAttr, root) {
    const lwcPreserveCommentAttribute = parsedAttr.pick(constants_2.ROOT_TEMPLATE_DIRECTIVES.PRESERVE_COMMENTS);
    if (!lwcPreserveCommentAttribute) {
        return;
    }
    const { value: lwcPreserveCommentsAttr } = lwcPreserveCommentAttribute;
    if (!ast.isBooleanLiteral(lwcPreserveCommentsAttr)) {
        ctx.throwOnNode(errors_1.ParserDiagnostics.PRESERVE_COMMENTS_MUST_BE_BOOLEAN, root);
    }
    root.directives.push(ast.preserveCommentsDirective(lwcPreserveCommentsAttr.value, lwcPreserveCommentAttribute.location));
}
function applyLwcDirectives(ctx, parsedAttr, element) {
    const lwcAttribute = parsedAttr.get(constants_2.LWC_RE);
    if (!lwcAttribute) {
        return;
    }
    if (!constants_2.LWC_DIRECTIVE_SET.has(lwcAttribute.name)) {
        ctx.throwOnNode(errors_1.ParserDiagnostics.UNKNOWN_LWC_DIRECTIVE, element, [
            lwcAttribute.name,
            `<${element.name}>`,
        ]);
    }
    // Should not allow render mode or preserve comments on non root nodes
    if (parsedAttr.get(constants_2.ROOT_TEMPLATE_DIRECTIVES.RENDER_MODE)) {
        ctx.throwOnNode(errors_1.ParserDiagnostics.UNKNOWN_LWC_DIRECTIVE, element, [
            constants_2.ROOT_TEMPLATE_DIRECTIVES.RENDER_MODE,
            `<${element.name}>`,
        ]);
    }
    if (parsedAttr.get(constants_2.ROOT_TEMPLATE_DIRECTIVES.PRESERVE_COMMENTS)) {
        ctx.throwOnNode(errors_1.ParserDiagnostics.UNKNOWN_LWC_DIRECTIVE, element, [
            constants_2.ROOT_TEMPLATE_DIRECTIVES.PRESERVE_COMMENTS,
            `<${element.name}>`,
        ]);
    }
    applyLwcDynamicDirective(ctx, parsedAttr, element);
    applyLwcDomDirective(ctx, parsedAttr, element);
    applyLwcInnerHtmlDirective(ctx, parsedAttr, element);
}
function applyLwcDynamicDirective(ctx, parsedAttr, element) {
    const { name: tag } = element;
    const lwcDynamicAttribute = parsedAttr.pick('lwc:dynamic');
    if (!lwcDynamicAttribute) {
        return;
    }
    if (!ctx.config.experimentalDynamicDirective) {
        ctx.throwOnNode(errors_1.ParserDiagnostics.INVALID_OPTS_LWC_DYNAMIC, element);
    }
    if (!ast.isComponent(element)) {
        ctx.throwOnNode(errors_1.ParserDiagnostics.INVALID_LWC_DYNAMIC_ON_NATIVE_ELEMENT, element, [
            `<${tag}>`,
        ]);
    }
    const { value: lwcDynamicAttr } = lwcDynamicAttribute;
    if (!ast.isExpression(lwcDynamicAttr)) {
        ctx.throwOnNode(errors_1.ParserDiagnostics.INVALID_LWC_DYNAMIC_LITERAL_PROP, element, [`<${tag}>`]);
    }
    element.directives.push(ast.dynamicDirective(lwcDynamicAttr, lwcDynamicAttr.location));
}
function applyLwcDomDirective(ctx, parsedAttr, element) {
    const { name: tag } = element;
    const lwcDomAttribute = parsedAttr.pick('lwc:dom');
    if (!lwcDomAttribute) {
        return;
    }
    if (ctx.renderMode === types_1.LWCDirectiveRenderMode.light) {
        ctx.throwOnNode(errors_1.ParserDiagnostics.LWC_DOM_INVALID_IN_LIGHT_DOM, element, [`<${tag}>`]);
    }
    if (ast.isComponent(element)) {
        ctx.throwOnNode(errors_1.ParserDiagnostics.LWC_DOM_INVALID_CUSTOM_ELEMENT, element, [`<${tag}>`]);
    }
    if (ast.isSlot(element)) {
        ctx.throwOnNode(errors_1.ParserDiagnostics.LWC_DOM_INVALID_SLOT_ELEMENT, element);
    }
    const { value: lwcDomAttr } = lwcDomAttribute;
    if (!ast.isStringLiteral(lwcDomAttr) || lwcDomAttr.value !== types_1.LWCDirectiveDomMode.manual) {
        const possibleValues = Object.keys(types_1.LWCDirectiveDomMode)
            .map((value) => `"${value}"`)
            .join(', or ');
        ctx.throwOnNode(errors_1.ParserDiagnostics.LWC_DOM_INVALID_VALUE, element, [possibleValues]);
    }
    element.directives.push(ast.domDirective(lwcDomAttr.value, lwcDomAttribute.location));
}
function applyLwcInnerHtmlDirective(ctx, parsedAttr, element) {
    const lwcInnerHtmlDirective = parsedAttr.pick(constants_2.LWC_DIRECTIVES.INNER_HTML);
    if (!lwcInnerHtmlDirective) {
        return;
    }
    if (ast.isComponent(element)) {
        ctx.throwOnNode(errors_1.ParserDiagnostics.LWC_INNER_HTML_INVALID_CUSTOM_ELEMENT, element, [
            `<${element.name}>`,
        ]);
    }
    if (ast.isSlot(element)) {
        ctx.throwOnNode(errors_1.ParserDiagnostics.LWC_INNER_HTML_INVALID_ELEMENT, element, [
            `<${element.name}>`,
        ]);
    }
    const { value: innerHTMLVal } = lwcInnerHtmlDirective;
    if (!ast.isStringLiteral(innerHTMLVal) && !ast.isExpression(innerHTMLVal)) {
        ctx.throwOnNode(errors_1.ParserDiagnostics.LWC_INNER_HTML_INVALID_VALUE, element, [
            `<${element.name}>`,
        ]);
    }
    element.directives.push(ast.innerHTMLDirective(innerHTMLVal, lwcInnerHtmlDirective.location));
}
function parseForEach(ctx, parsedAttr, parse5ElmLocation) {
    const forEachAttribute = parsedAttr.pick('for:each');
    const forItemAttribute = parsedAttr.pick('for:item');
    const forIndex = parsedAttr.pick('for:index');
    if (forEachAttribute && forItemAttribute) {
        if (!ast.isExpression(forEachAttribute.value)) {
            ctx.throwOnNode(errors_1.ParserDiagnostics.FOR_EACH_DIRECTIVE_SHOULD_BE_EXPRESSION, forEachAttribute);
        }
        const forItemValue = forItemAttribute.value;
        if (!ast.isStringLiteral(forItemValue)) {
            ctx.throwOnNode(errors_1.ParserDiagnostics.FOR_ITEM_DIRECTIVE_SHOULD_BE_STRING, forItemAttribute);
        }
        const item = (0, expression_1.parseIdentifier)(ctx, forItemValue.value, forItemAttribute.location);
        let index;
        if (forIndex) {
            const forIndexValue = forIndex.value;
            if (!ast.isStringLiteral(forIndexValue)) {
                ctx.throwOnNode(errors_1.ParserDiagnostics.FOR_INDEX_DIRECTIVE_SHOULD_BE_STRING, forIndex);
            }
            index = (0, expression_1.parseIdentifier)(ctx, forIndexValue.value, forIndex.location);
        }
        return ast.forEach(forEachAttribute.value, ast.sourceLocation(parse5ElmLocation), forEachAttribute.location, item, index);
    }
    else if (forEachAttribute || forItemAttribute) {
        ctx.throwAtLocation(errors_1.ParserDiagnostics.FOR_EACH_AND_FOR_ITEM_DIRECTIVES_SHOULD_BE_TOGETHER, ast.sourceLocation(parse5ElmLocation));
    }
}
function parseForOf(ctx, parsedAttr, parse5ElmLocation) {
    const iteratorExpression = parsedAttr.pick(constants_2.ITERATOR_RE);
    if (!iteratorExpression) {
        return;
    }
    const hasForEach = ctx.findSibling(ast.isForEach);
    if (hasForEach) {
        ctx.throwAtLocation(errors_1.ParserDiagnostics.INVALID_FOR_EACH_WITH_ITERATOR, ast.sourceLocation(parse5ElmLocation), [iteratorExpression.name]);
    }
    const iteratorAttributeName = iteratorExpression.name;
    const [, iteratorName] = iteratorAttributeName.split(':');
    if (!ast.isExpression(iteratorExpression.value)) {
        ctx.throwOnNode(errors_1.ParserDiagnostics.DIRECTIVE_SHOULD_BE_EXPRESSION, iteratorExpression, [
            iteratorExpression.name,
        ]);
    }
    const iterator = (0, expression_1.parseIdentifier)(ctx, iteratorName, iteratorExpression.location);
    return ast.forOf(iteratorExpression.value, iterator, ast.sourceLocation(parse5ElmLocation), iteratorExpression.location);
}
function applyKey(ctx, parsedAttr, element) {
    const { name: tag } = element;
    const keyAttribute = parsedAttr.pick('key');
    if (keyAttribute) {
        if (!ast.isExpression(keyAttribute.value)) {
            ctx.throwOnNode(errors_1.ParserDiagnostics.KEY_ATTRIBUTE_SHOULD_BE_EXPRESSION, keyAttribute);
        }
        const forOfParent = getForOfParent(ctx);
        const forEachParent = getForEachParent(ctx);
        if (forOfParent) {
            if (attributeExpressionReferencesForOfIndex(keyAttribute, forOfParent)) {
                ctx.throwOnNode(errors_1.ParserDiagnostics.KEY_SHOULDNT_REFERENCE_ITERATOR_INDEX, keyAttribute, [tag]);
            }
        }
        else if (forEachParent) {
            if (attributeExpressionReferencesForEachIndex(keyAttribute, forEachParent)) {
                const name = 'name' in keyAttribute.value && keyAttribute.value.name;
                ctx.throwOnNode(errors_1.ParserDiagnostics.KEY_SHOULDNT_REFERENCE_FOR_EACH_INDEX, keyAttribute, [tag, name]);
            }
        }
        if (forOfParent || forEachParent) {
            element.directives.push(ast.keyDirective(keyAttribute.value, keyAttribute.location));
        }
        else {
            ctx.warnOnNode(errors_1.ParserDiagnostics.KEY_SHOULD_BE_IN_ITERATION, keyAttribute, [tag]);
        }
    }
    else if (isInIteratorElement(ctx)) {
        ctx.throwOnNode(errors_1.ParserDiagnostics.MISSING_KEY_IN_ITERATOR, element, [tag]);
    }
}
function parseSlot(ctx, parsedAttr, parse5ElmLocation) {
    const location = ast.sourceLocation(parse5ElmLocation);
    const hasDirectives = ctx.findSibling(ast.isForBlock) || ctx.findSibling(ast.isIf);
    if (hasDirectives) {
        ctx.throwAtLocation(errors_1.ParserDiagnostics.SLOT_TAG_CANNOT_HAVE_DIRECTIVES, location);
    }
    // Can't handle slots in applySlot because it would be too late for class and style attrs
    if (ctx.renderMode === types_1.LWCDirectiveRenderMode.light) {
        const invalidAttrs = parsedAttr
            .getAttributes()
            .filter(({ name }) => name !== 'name')
            .map(({ name }) => name);
        if (invalidAttrs.length) {
            // Light DOM slots cannot have events because there's no actual `<slot>` element
            const eventHandler = invalidAttrs.find((name) => name.match(constants_2.EVENT_HANDLER_NAME_RE));
            if (eventHandler) {
                ctx.throwAtLocation(errors_1.ParserDiagnostics.LWC_LIGHT_SLOT_INVALID_EVENT_LISTENER, location, [eventHandler]);
            }
            ctx.throwAtLocation(errors_1.ParserDiagnostics.LWC_LIGHT_SLOT_INVALID_ATTRIBUTES, location, [
                invalidAttrs.join(','),
            ]);
        }
    }
    // Default slot have empty string name
    let name = '';
    const nameAttribute = parsedAttr.get('name');
    if (nameAttribute) {
        if (ast.isExpression(nameAttribute.value)) {
            ctx.throwOnNode(errors_1.ParserDiagnostics.NAME_ON_SLOT_CANNOT_BE_EXPRESSION, nameAttribute);
        }
        else if (ast.isStringLiteral(nameAttribute.value)) {
            name = nameAttribute.value.value;
        }
    }
    const alreadySeen = ctx.seenSlots.has(name);
    ctx.seenSlots.add(name);
    if (alreadySeen) {
        ctx.warnAtLocation(errors_1.ParserDiagnostics.NO_DUPLICATE_SLOTS, location, [
            name === '' ? 'default' : `name="${name}"`,
        ]);
    }
    else if (isInIteration(ctx)) {
        ctx.warnAtLocation(errors_1.ParserDiagnostics.NO_SLOTS_IN_ITERATOR, location, [
            name === '' ? 'default' : `name="${name}"`,
        ]);
    }
    return ast.slot(name, parse5ElmLocation);
}
function applyAttributes(ctx, parsedAttr, element) {
    const { name: tag } = element;
    const attributes = parsedAttr.getAttributes();
    const properties = new Map();
    for (const attr of attributes) {
        const { name } = attr;
        if (!(0, attribute_1.isValidHTMLAttribute)(tag, name)) {
            ctx.warnOnNode(errors_1.ParserDiagnostics.INVALID_HTML_ATTRIBUTE, attr, [name, tag]);
        }
        if (name.match(/[^a-z0-9]$/)) {
            ctx.throwOnNode(errors_1.ParserDiagnostics.ATTRIBUTE_NAME_MUST_END_WITH_ALPHA_NUMERIC_CHARACTER, attr, [name, tag]);
        }
        if (!/^-*[a-z]/.test(name)) {
            ctx.throwOnNode(errors_1.ParserDiagnostics.ATTRIBUTE_NAME_MUST_START_WITH_ALPHABETIC_OR_HYPHEN_CHARACTER, attr, [name, tag]);
        }
        // disallow attr name which combines underscore character with special character.
        // We normalize camel-cased names with underscores caMel -> ca-mel; thus sanitization.
        if (name.match(/_[^a-z0-9]|[^a-z0-9]_/)) {
            ctx.throwOnNode(errors_1.ParserDiagnostics.ATTRIBUTE_NAME_CANNOT_COMBINE_UNDERSCORE_WITH_SPECIAL_CHARS, attr, [name, tag]);
        }
        if (ast.isStringLiteral(attr.value)) {
            if (name === 'id') {
                const { value } = attr.value;
                if (/\s+/.test(value)) {
                    ctx.throwOnNode(errors_1.ParserDiagnostics.INVALID_ID_ATTRIBUTE, attr, [value]);
                }
                if (isInIteration(ctx)) {
                    ctx.warnOnNode(errors_1.ParserDiagnostics.INVALID_STATIC_ID_IN_ITERATION, attr);
                }
                if (ctx.seenIds.has(value)) {
                    ctx.throwOnNode(errors_1.ParserDiagnostics.DUPLICATE_ID_FOUND, attr, [value]);
                }
                else {
                    ctx.seenIds.add(value);
                }
            }
        }
        // Prevent usage of the slot attribute with expression.
        if (name === 'slot' && ast.isExpression(attr.value)) {
            ctx.throwOnNode(errors_1.ParserDiagnostics.SLOT_ATTRIBUTE_CANNOT_BE_EXPRESSION, attr);
        }
        // the if branch handles
        // 1. All attributes for standard elements except 1 case are handled as attributes
        // 2. For custom elements, only key, slot and data are handled as attributes, rest as properties
        if ((0, attribute_1.isAttribute)(element, name)) {
            element.attributes.push(attr);
        }
        else {
            const propName = (0, attribute_1.attributeToPropertyName)(name);
            const existingProp = properties.get(propName);
            if (existingProp) {
                ctx.warnOnNode(errors_1.ParserDiagnostics.DUPLICATE_ATTR_PROP_TRANSFORM, attr, [
                    existingProp.attributeName,
                    name,
                    propName,
                ]);
            }
            properties.set(propName, ast.property(propName, name, attr.value, attr.location));
            parsedAttr.pick(name);
        }
    }
    element.properties.push(...properties.values());
}
function validateRoot(ctx, parsedAttr, root) {
    if (parsedAttr.getAttributes().length) {
        ctx.throwOnNode(errors_1.ParserDiagnostics.ROOT_TEMPLATE_HAS_UNKNOWN_ATTRIBUTES, root);
    }
    if (!root.location.endTag) {
        ctx.throwOnNode(errors_1.ParserDiagnostics.NO_MATCHING_CLOSING_TAGS, root, ['template']);
    }
}
function validateElement(ctx, element, parse5Elm) {
    const { tagName: tag, namespaceURI: namespace } = parse5Elm;
    // Check if a non-void element has a matching closing tag.
    //
    // Note: Parse5 currently fails to collect end tag location for element with a tag name
    // containing an upper case character (inikulin/parse5#352).
    const hasClosingTag = Boolean(element.location.endTag);
    if (!(0, shared_1.isVoidElement)(tag, namespace) &&
        !hasClosingTag &&
        tag === tag.toLocaleLowerCase() &&
        namespace === shared_1.HTML_NAMESPACE) {
        ctx.throwOnNode(errors_1.ParserDiagnostics.NO_MATCHING_CLOSING_TAGS, element, [tag]);
    }
    if (tag === 'style' && namespace === shared_1.HTML_NAMESPACE) {
        ctx.throwOnNode(errors_1.ParserDiagnostics.STYLE_TAG_NOT_ALLOWED_IN_TEMPLATE, element);
    }
    else {
        const isNotAllowedHtmlTag = constants_2.DISALLOWED_HTML_TAGS.has(tag);
        if (namespace === shared_1.HTML_NAMESPACE && isNotAllowedHtmlTag) {
            ctx.throwOnNode(errors_1.ParserDiagnostics.FORBIDDEN_TAG_ON_TEMPLATE, element, [tag]);
        }
        const isNotAllowedSvgTag = !constants_2.SUPPORTED_SVG_TAGS.has(tag);
        if (namespace === shared_1.SVG_NAMESPACE && isNotAllowedSvgTag) {
            ctx.throwOnNode(errors_1.ParserDiagnostics.FORBIDDEN_SVG_NAMESPACE_IN_TEMPLATE, element, [tag]);
        }
        const isNotAllowedMathMlTag = constants_2.DISALLOWED_MATHML_TAGS.has(tag);
        if (namespace === shared_1.MATHML_NAMESPACE && isNotAllowedMathMlTag) {
            ctx.throwOnNode(errors_1.ParserDiagnostics.FORBIDDEN_MATHML_NAMESPACE_IN_TEMPLATE, element, [
                tag,
            ]);
        }
        const isKnownTag = ast.isComponent(element) ||
            constants_2.KNOWN_HTML_AND_SVG_ELEMENTS.has(tag) ||
            constants_2.SUPPORTED_SVG_TAGS.has(tag) ||
            constants_1.DASHED_TAGNAME_ELEMENT_SET.has(tag);
        if (!isKnownTag) {
            ctx.warnOnNode(errors_1.ParserDiagnostics.UNKNOWN_HTML_TAG_IN_TEMPLATE, element, [tag]);
        }
    }
}
function validateTemplate(ctx, parsedAttr, template, parse5ElmLocation) {
    const location = ast.sourceLocation(parse5ElmLocation);
    // Empty templates not allowed outside of root
    if (!template.attrs.length) {
        ctx.throwAtLocation(errors_1.ParserDiagnostics.NO_DIRECTIVE_FOUND_ON_TEMPLATE, location);
    }
    if (parsedAttr.get(constants_2.LWC_DIRECTIVES.INNER_HTML)) {
        ctx.throwAtLocation(errors_1.ParserDiagnostics.LWC_INNER_HTML_INVALID_ELEMENT, location, [
            '<template>',
        ]);
    }
    // At this point in the parsing all supported attributes from a non root template
    // should have been validated and removed from ParsedAttribute.
    const templateAttrs = parsedAttr.getAttributes();
    if (templateAttrs.length) {
        ctx.warnAtLocation(errors_1.ParserDiagnostics.INVALID_TEMPLATE_ATTRIBUTE, location, [
            templateAttrs.map((attr) => attr.name).join(', '),
        ]);
    }
}
function validateChildren(ctx, element) {
    if (!element) {
        return;
    }
    const effectiveChildren = ctx.preserveComments
        ? element.children
        : element.children.filter((child) => !ast.isComment(child));
    const hasDomDirective = element.directives.find(ast.isDomDirective);
    if (hasDomDirective && effectiveChildren.length) {
        ctx.throwOnNode(errors_1.ParserDiagnostics.LWC_DOM_INVALID_CONTENTS, element);
    }
    // prevents lwc:inner-html to be used in an element with content
    if (element.directives.find(ast.isInnerHTMLDirective) && effectiveChildren.length) {
        ctx.throwOnNode(errors_1.ParserDiagnostics.LWC_INNER_HTML_INVALID_CONTENTS, element, [
            `<${element.name}>`,
        ]);
    }
}
function validateAttributes(ctx, parsedAttr, element) {
    const { name: tag } = element;
    const attributes = parsedAttr.getAttributes();
    for (const attr of attributes) {
        const { name: attrName, value: attrVal } = attr;
        if ((0, attribute_1.isProhibitedIsAttribute)(attrName)) {
            ctx.throwOnNode(errors_1.ParserDiagnostics.IS_ATTRIBUTE_NOT_SUPPORTED, element);
        }
        if ((0, attribute_1.isTabIndexAttribute)(attrName)) {
            if (!ast.isExpression(attrVal) && !(0, attribute_1.isValidTabIndexAttributeValue)(attrVal.value)) {
                ctx.throwOnNode(errors_1.ParserDiagnostics.INVALID_TABINDEX_ATTRIBUTE, element);
            }
        }
        // TODO [#1136]: once the template compiler emits the element namespace information to the engine we should
        // restrict the validation of the "srcdoc" attribute on the "iframe" element only if this element is
        // part of the HTML namespace.
        if (tag === 'iframe' && attrName === 'srcdoc') {
            ctx.throwOnNode(errors_1.ParserDiagnostics.FORBIDDEN_IFRAME_SRCDOC_ATTRIBUTE, element);
        }
    }
}
function validateProperties(ctx, element) {
    for (const prop of element.properties) {
        const { attributeName: attrName, value } = prop;
        if ((0, attribute_1.isProhibitedIsAttribute)(attrName)) {
            ctx.throwOnNode(errors_1.ParserDiagnostics.IS_ATTRIBUTE_NOT_SUPPORTED, element);
        }
        if (
        // tabindex is transformed to tabIndex for properties
        (0, attribute_1.isTabIndexAttribute)(attrName) &&
            !ast.isExpression(value) &&
            !(0, attribute_1.isValidTabIndexAttributeValue)(value.value)) {
            ctx.throwOnNode(errors_1.ParserDiagnostics.INVALID_TABINDEX_ATTRIBUTE, element);
        }
    }
}
function parseAttributes(ctx, parse5Elm, parse5ElmLocation) {
    const parsedAttrs = new attribute_1.ParsedAttribute();
    const { attrs: attributes, tagName } = parse5Elm;
    const { attrs: attrLocations } = parse5ElmLocation;
    for (const attr of attributes) {
        const attrLocation = attrLocations === null || attrLocations === void 0 ? void 0 : attrLocations[(0, attribute_1.attributeName)(attr).toLowerCase()];
        /* istanbul ignore if */
        if (!attrLocation) {
            throw new Error('An internal parsing error occurred while parsing attributes; attributes were found without a location.');
        }
        parsedAttrs.append(getTemplateAttribute(ctx, tagName, attr, attrLocation));
    }
    return parsedAttrs;
}
function getTemplateAttribute(ctx, tag, attribute, attributeLocation) {
    // Convert attribute name to lowercase because the location map keys follow the algorithm defined in the spec
    // https://wicg.github.io/controls-list/html-output/multipage/syntax.html#attribute-name-state
    const rawAttribute = ctx.getSource(attributeLocation.startOffset, attributeLocation.endOffset);
    const location = ast.sourceLocation(attributeLocation);
    // parse5 automatically converts the casing from camelcase to all lowercase. If the attribute name
    // is not the same before and after the parsing, then the attribute name contains capital letters
    const attrName = (0, attribute_1.attributeName)(attribute);
    if (!rawAttribute.startsWith(attrName)) {
        ctx.throwAtLocation(errors_1.ParserDiagnostics.INVALID_ATTRIBUTE_CASE, location, [
            rawAttribute,
            tag,
        ]);
    }
    const isBooleanAttribute = !rawAttribute.includes('=');
    const { value, escapedExpression } = (0, attribute_1.normalizeAttributeValue)(ctx, rawAttribute, tag, attribute, location);
    let attrValue;
    if ((0, expression_1.isExpression)(value) && !escapedExpression) {
        attrValue = (0, expression_1.parseExpression)(ctx, value, location);
    }
    else if (isBooleanAttribute) {
        attrValue = ast.literal(true);
    }
    else {
        attrValue = ast.literal(value);
    }
    return ast.attribute(attrName, attrValue, location);
}
function isInIteration(ctx) {
    return !!ctx.findAncestor(ast.isForBlock);
}
function getForOfParent(ctx) {
    return ctx.findAncestor(ast.isForOf, ({ parent }) => parent && !ast.isBaseElement(parent));
}
function getForEachParent(ctx) {
    return ctx.findAncestor(ast.isForEach, ({ parent }) => parent && !ast.isBaseElement(parent));
}
function isInIteratorElement(ctx) {
    return !!(getForOfParent(ctx) || getForEachParent(ctx));
}
//# sourceMappingURL=index.js.map