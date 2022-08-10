"use strict";
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
const postcss_selector_parser_1 = require("postcss-selector-parser");
const rtl_1 = require("../utils/rtl");
const selectors_scoping_1 = require("../utils/selectors-scoping");
const selector_parser_1 = require("../utils/selector-parser");
const validate_1 = __importDefault(require("./validate"));
function isHostPseudoClass(node) {
    return (0, postcss_selector_parser_1.isPseudoClass)(node) && node.value === ':host';
}
/**
 * Add scoping attributes to all the matching selectors:
 *   h1 -> h1[x-foo_tmpl]
 *   p a -> p[x-foo_tmpl] a[x-foo_tmpl]
 */
function scopeSelector(selector) {
    const compoundSelectors = [[]];
    // Split the selector per compound selector. Compound selectors are interleaved with combinator nodes.
    // https://drafts.csswg.org/selectors-4/#typedef-complex-selector
    selector.each((node) => {
        if ((0, postcss_selector_parser_1.isCombinator)(node)) {
            compoundSelectors.push([]);
        }
        else {
            const current = compoundSelectors[compoundSelectors.length - 1];
            current.push(node);
        }
    });
    for (const compoundSelector of compoundSelectors) {
        // Compound selectors with only a single :dir pseudo class should be scoped, the dir pseudo
        // class transform will take care of transforming it properly.
        const containsSingleDirSelector = compoundSelector.length === 1 && (0, rtl_1.isDirPseudoClass)(compoundSelector[0]);
        // Compound selectors containing :host have a special treatment and should not be scoped
        // like the rest of the complex selectors.
        const containsHost = compoundSelector.some(isHostPseudoClass);
        if (!containsSingleDirSelector && !containsHost) {
            let nodeToScope;
            // In each compound selector we need to locate the last selector to scope.
            for (const node of compoundSelector) {
                if (!(0, postcss_selector_parser_1.isPseudoElement)(node)) {
                    nodeToScope = node;
                }
            }
            const shadowAttribute = (0, postcss_selector_parser_1.attribute)({
                attribute: selectors_scoping_1.SHADOW_ATTRIBUTE,
                value: undefined,
                raws: {},
            });
            if (nodeToScope) {
                // Add the scoping attribute right after the node scope
                selector.insertAfter(nodeToScope, shadowAttribute);
            }
            else {
                // Add the scoping token in the first position of the compound selector as a fallback
                // when there is no node to scope. For example: ::after {}
                selector.insertBefore(compoundSelector[0], shadowAttribute);
            }
        }
    }
}
/**
 * Mark the :host selector with a placeholder. If the selector has a list of
 * contextual selector it will generate a rule for each of them.
 *   :host -> [x-foo_tmpl-host]
 *   :host(.foo, .bar) -> [x-foo_tmpl-host].foo, [x-foo_tmpl-host].bar
 */
function transformHost(selector) {
    // Locate the first :host pseudo-class
    const hostNode = (0, selector_parser_1.findNode)(selector, isHostPseudoClass);
    if (hostNode) {
        // Store the original location of the :host in the selector
        const hostIndex = selector.index(hostNode);
        // Swap the :host pseudo-class with the host scoping token
        const hostAttribute = (0, postcss_selector_parser_1.attribute)({
            attribute: selectors_scoping_1.HOST_ATTRIBUTE,
            value: undefined,
            raws: {},
        });
        hostNode.replaceWith(hostAttribute);
        // Generate a unique contextualized version of the selector for each selector pass as argument
        // to the :host
        const contextualSelectors = hostNode.nodes.map((contextSelectors) => {
            const clonedSelector = selector.clone({});
            const clonedHostNode = clonedSelector.at(hostIndex);
            // Add to the compound selector previously containing the :host pseudo class
            // the contextual selectors.
            contextSelectors.each((node) => {
                (0, selector_parser_1.trimNodeWhitespaces)(node);
                clonedSelector.insertAfter(clonedHostNode, node);
            });
            return clonedSelector;
        });
        // Replace the current selector with the different variants
        (0, selector_parser_1.replaceNodeWith)(selector, ...contextualSelectors);
    }
}
function transformSelector(root, transformConfig) {
    (0, validate_1.default)(root);
    root.each(scopeSelector);
    if (transformConfig.transformHost) {
        root.each(transformHost);
    }
}
exports.default = transformSelector;
//# sourceMappingURL=transform.js.map