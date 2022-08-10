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
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const estree_walker_1 = require("estree-walker");
const shared_1 = require("@lwc/shared");
const t = __importStar(require("../shared/estree"));
const types_1 = require("../shared/types");
const constants_1 = require("../shared/constants");
const ast_1 = require("../shared/ast");
const estree_1 = require("../shared/estree");
const helpers_1 = require("./helpers");
const static_element_serializer_1 = require("./static-element-serializer");
const RENDER_APIS = {
    iterator: { name: 'i', alias: 'api_iterator' },
    flatten: { name: 'f', alias: 'api_flatten' },
    element: { name: 'h', alias: 'api_element' },
    slot: { name: 's', alias: 'api_slot' },
    customElement: { name: 'c', alias: 'api_custom_element' },
    dynamicCtor: { name: 'dc', alias: 'api_dynamic_component' },
    bind: { name: 'b', alias: 'api_bind' },
    text: { name: 't', alias: 'api_text' },
    dynamicText: { name: 'd', alias: 'api_dynamic_text' },
    key: { name: 'k', alias: 'api_key' },
    tabindex: { name: 'ti', alias: 'api_tab_index' },
    scopedId: { name: 'gid', alias: 'api_scoped_id' },
    scopedFragId: { name: 'fid', alias: 'api_scoped_frag_id' },
    comment: { name: 'co', alias: 'api_comment' },
    sanitizeHtmlContent: { name: 'shc', alias: 'api_sanitize_html_content' },
    staticFragment: { name: 'st', alias: 'api_static_fragment' },
};
class CodeGen {
    constructor({ root, state, scopeFragmentId, }) {
        var _a, _b, _c, _d;
        this.staticNodes = new Set();
        this.hoistedNodes = [];
        this.currentId = 0;
        this.currentKey = 0;
        this.innerHtmlInstances = 0;
        this.usedApis = {};
        this.usedLwcApis = new Set();
        this.slotNames = new Set();
        this.memorizedIds = [];
        this.referencedComponents = new Set();
        this.root = root;
        if (state.config.enableStaticContentOptimization) {
            this.staticNodes = (0, helpers_1.getStaticNodes)(root, state);
        }
        this.renderMode =
            (_b = (_a = root.directives.find(ast_1.isRenderModeDirective)) === null || _a === void 0 ? void 0 : _a.value.value) !== null && _b !== void 0 ? _b : types_1.LWCDirectiveRenderMode.shadow;
        this.preserveComments =
            (_d = (_c = root.directives.find(ast_1.isPreserveCommentsDirective)) === null || _c === void 0 ? void 0 : _c.value.value) !== null && _d !== void 0 ? _d : state.config.preserveHtmlComments;
        this.scopeFragmentId = scopeFragmentId;
        this.scope = this.createScope();
        this.state = state;
    }
    generateKey() {
        return this.currentKey++;
    }
    genElement(tagName, data, children) {
        const args = [t.literal(tagName), data];
        if (!(0, estree_1.isArrayExpression)(children) || children.elements.length > 0) {
            args.push(children); // only generate children if non-empty
        }
        return this._renderApiCall(RENDER_APIS.element, args);
    }
    genCustomElement(tagName, componentClass, data, children) {
        this.referencedComponents.add(tagName);
        const args = [t.literal(tagName), componentClass, data];
        if (!(0, estree_1.isArrayExpression)(children) || children.elements.length > 0) {
            args.push(children); // only generate children if non-empty
        }
        return this._renderApiCall(RENDER_APIS.customElement, args);
    }
    genDynamicElement(tagName, ctor, data, children) {
        const args = [t.literal(tagName), ctor, data];
        if (!(0, estree_1.isArrayExpression)(children) || children.elements.length > 0) {
            args.push(children); // only generate children if non-empty
        }
        return this._renderApiCall(RENDER_APIS.dynamicCtor, args);
    }
    genText(value) {
        const mappedValues = value.map((v) => {
            return typeof v === 'string'
                ? t.literal(v)
                : this._renderApiCall(RENDER_APIS.dynamicText, [v]);
        });
        let textConcatenation = mappedValues[0];
        for (let i = 1, n = mappedValues.length; i < n; i++) {
            textConcatenation = t.binaryExpression('+', textConcatenation, mappedValues[i]);
        }
        return this._renderApiCall(RENDER_APIS.text, [textConcatenation]);
    }
    genComment(value) {
        return this._renderApiCall(RENDER_APIS.comment, [t.literal(value)]);
    }
    genSanitizeHtmlContent(content) {
        return this._renderApiCall(RENDER_APIS.sanitizeHtmlContent, [content]);
    }
    genIterator(iterable, callback) {
        return this._renderApiCall(RENDER_APIS.iterator, [iterable, callback]);
    }
    genBind(handler) {
        return this._renderApiCall(RENDER_APIS.bind, [handler]);
    }
    genFlatten(children) {
        return this._renderApiCall(RENDER_APIS.flatten, children);
    }
    genKey(compilerKey, value) {
        return this._renderApiCall(RENDER_APIS.key, [compilerKey, value]);
    }
    genScopedId(id) {
        if (typeof id === 'string') {
            return this._renderApiCall(RENDER_APIS.scopedId, [t.literal(id)]);
        }
        return this._renderApiCall(RENDER_APIS.scopedId, [id]);
    }
    genScopedFragId(id) {
        if (typeof id === 'string') {
            return this._renderApiCall(RENDER_APIS.scopedFragId, [t.literal(id)]);
        }
        return this._renderApiCall(RENDER_APIS.scopedFragId, [id]);
    }
    getSlot(slotName, data, children) {
        this.slotNames.add(slotName);
        return this._renderApiCall(RENDER_APIS.slot, [
            t.literal(slotName),
            data,
            children,
            t.identifier('$slotset'),
        ]);
    }
    genTabIndex(children) {
        return this._renderApiCall(RENDER_APIS.tabindex, children);
    }
    getMemorizationId() {
        const currentId = this.currentId++;
        const memorizationId = t.identifier(`_m${currentId}`);
        this.memorizedIds.push(memorizationId);
        return memorizationId;
    }
    genBooleanAttributeExpr(bindExpr) {
        return t.conditionalExpression(bindExpr, t.literal(''), t.literal(null));
    }
    /**
     * This routine generates an expression that avoids
     * computing the sanitized html of a raw html if it does not change
     * between renders.
     *
     * @param expr
     * @returns sanitizedHtmlExpr
     */
    genSanitizedHtmlExpr(expr) {
        const instance = this.innerHtmlInstances++;
        // Optimization for static html.
        // Example input: <div lwc:inner-html="foo">
        // Output: $ctx._sanitizedHtml$0 || ($ctx._sanitizedHtml$0 = api_sanitize_html_content("foo"))
        if (t.isLiteral(expr)) {
            return t.logicalExpression('||', t.memberExpression(t.identifier(constants_1.TEMPLATE_PARAMS.CONTEXT), t.identifier(`_sanitizedHtml$${instance}`)), t.assignmentExpression('=', t.memberExpression(t.identifier(constants_1.TEMPLATE_PARAMS.CONTEXT), t.identifier(`_sanitizedHtml$${instance}`)), this.genSanitizeHtmlContent(expr)));
        }
        // Example input: <div lwc:inner-html={foo}>
        // Output: $ctx._rawHtml$0 !== ($ctx._rawHtml$0 = $cmp.foo)
        //             ? ($ctx._sanitizedHtml$0 = api_sanitize_html_content($cmp.foo))
        //             : $ctx._sanitizedHtml$0
        //
        // Note: In the case of iterations, when the lwc:inner-html bound value depends on the
        //       iteration item, the generated expression won't be enough, and `sanitizeHtmlContent`
        //       will be called every time because this expression is based on the specific template
        //       usage of the lwc:inner-html, and in an iteration, usages are dynamically generated.
        return t.conditionalExpression(t.binaryExpression('!==', t.memberExpression(t.identifier(constants_1.TEMPLATE_PARAMS.CONTEXT), t.identifier(`_rawHtml$${instance}`)), t.assignmentExpression('=', t.memberExpression(t.identifier(constants_1.TEMPLATE_PARAMS.CONTEXT), t.identifier(`_rawHtml$${instance}`)), expr)), t.assignmentExpression('=', t.memberExpression(t.identifier(constants_1.TEMPLATE_PARAMS.CONTEXT), t.identifier(`_sanitizedHtml$${instance}`)), this.genSanitizeHtmlContent(expr)), t.memberExpression(t.identifier(constants_1.TEMPLATE_PARAMS.CONTEXT), t.identifier(`_sanitizedHtml$${instance}`)));
    }
    _renderApiCall(primitive, params) {
        const { name, alias } = primitive;
        let identifier = this.usedApis[name];
        if (!identifier) {
            identifier = this.usedApis[name] = t.identifier(alias);
        }
        return t.callExpression(identifier, params);
    }
    beginScope() {
        this.scope = this.createScope(this.scope);
    }
    createScope(parent = null) {
        return {
            parent,
            declaration: new Set(),
        };
    }
    endScope() {
        /* istanbul ignore if */
        if (!this.scope.parent) {
            throw new Error("Can't invoke endScope if the current scope has no parent");
        }
        this.scope = this.scope.parent;
    }
    declareIdentifier(identifier) {
        this.scope.declaration.add(identifier.name);
    }
    /**
     * Searches the scopes to find an identifier with a matching name.
     */
    isLocalIdentifier(identifier) {
        let scope = this.scope;
        while (scope !== null) {
            if (scope.declaration.has(identifier.name)) {
                return true;
            }
            scope = scope.parent;
        }
        return false;
    }
    /**
     * Bind the passed expression to the component instance. It applies the following transformation to the expression:
     * - {value} --> {$cmp.value}
     * - {value[index]} --> {$cmp.value[$cmp.index]}
     */
    bindExpression(expression) {
        if (t.isIdentifier(expression)) {
            if (!this.isLocalIdentifier(expression)) {
                return t.memberExpression(t.identifier(constants_1.TEMPLATE_PARAMS.INSTANCE), expression);
            }
            else {
                return expression;
            }
        }
        const scope = this;
        (0, estree_walker_1.walk)(expression, {
            leave(node, parent) {
                if (parent !== null &&
                    t.isIdentifier(node) &&
                    t.isMemberExpression(parent) &&
                    parent.object === node &&
                    !scope.isLocalIdentifier(node)) {
                    this.replace(t.memberExpression(t.identifier(constants_1.TEMPLATE_PARAMS.INSTANCE), node));
                }
            },
        });
        return expression;
    }
    genHoistedElement(element, slotParentName) {
        const key = slotParentName !== undefined
            ? `@${slotParentName}:${this.generateKey()}`
            : this.generateKey();
        const html = (0, static_element_serializer_1.serializeStaticElement)(element, this.preserveComments);
        const parseMethod = element.name !== 'svg' && element.namespace === shared_1.SVG_NAMESPACE
            ? constants_1.PARSE_SVG_FRAGMENT_METHOD_NAME
            : constants_1.PARSE_FRAGMENT_METHOD_NAME;
        this.usedLwcApis.add(parseMethod);
        // building the taggedTemplate expression as if it were a string
        const expr = t.taggedTemplateExpression(t.identifier(parseMethod), t.templateLiteral([
            {
                type: 'TemplateElement',
                tail: true,
                value: {
                    raw: html,
                    cooked: html,
                },
            },
        ], []));
        const identifier = t.identifier(`$fragment${this.hoistedNodes.length + 1}`);
        this.hoistedNodes.push({
            identifier,
            expr,
        });
        return this._renderApiCall(RENDER_APIS.staticFragment, [
            t.callExpression(identifier, []),
            t.literal(key),
        ]);
    }
}
exports.default = CodeGen;
//# sourceMappingURL=codegen.js.map