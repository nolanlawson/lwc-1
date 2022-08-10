"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const postcss_selector_parser_1 = require("postcss-selector-parser");
const rtl_1 = require("../utils/rtl");
const dir_pseudoclass_1 = require("../utils/dir-pseudoclass");
function isValidDirValue(value) {
    return value === 'ltr' || value === 'rtl';
}
function default_1(root) {
    root.nodes.forEach((selector) => {
        selector.nodes.forEach((node) => {
            if (!(0, rtl_1.isDirPseudoClass)(node)) {
                return;
            }
            const value = node.nodes.toString().trim();
            if (!isValidDirValue(value)) {
                throw root.error(`:dir() pseudo class expects "ltr" or "rtl" for value, but received "${value}".`, {
                    index: node.sourceIndex,
                    word: node.value,
                });
            }
            // Set placeholders for `:dir()` so we can keep it for native shadow and
            // replace it with a polyfill for synthetic shadow.
            //
            // Native:    `:dir(ltr)`
            // Synthetic: `[dir="ltr"]`
            //
            // The placeholders look like this: `[__dirAttributeNativeLtr__]`
            // The attribute has no value because it's simpler during serialization, and there
            // are only two valid values: "ltr" and "rtl".
            //
            // Now consider a more complex selector: `.foo:dir(ltr):not(.bar)`.
            // For native shadow, we need to leave it as-is. Whereas for synthetic shadow, we need
            // to convert it to: `[dir="ltr"] .foo:not(.bar)`.
            // I.e. we need to use a descendant selector (' ' combinator) relying on a `dir`
            // attribute added to the host element. So we need two placeholders:
            // `<synthetic_placeholder> .foo<native_placeholder>:not(.bar)`
            const nativeAttribute = (0, postcss_selector_parser_1.attribute)({
                attribute: value === 'ltr' ? dir_pseudoclass_1.DIR_ATTRIBUTE_NATIVE_LTR : dir_pseudoclass_1.DIR_ATTRIBUTE_NATIVE_RTL,
                value: undefined,
                raws: {},
            });
            const syntheticAttribute = (0, postcss_selector_parser_1.attribute)({
                attribute: value === 'ltr' ? dir_pseudoclass_1.DIR_ATTRIBUTE_SYNTHETIC_LTR : dir_pseudoclass_1.DIR_ATTRIBUTE_SYNTHETIC_RTL,
                value: undefined,
                raws: {},
            });
            node.replaceWith(nativeAttribute);
            // If the selector is not empty and if the first node in the selector is not already a
            // " " combinator, we need to use the descendant selector format
            const shouldAddDescendantCombinator = selector.first && !(0, postcss_selector_parser_1.isCombinator)(selector.first) && selector.first.value !== ' ';
            if (shouldAddDescendantCombinator) {
                selector.insertBefore(selector.first, (0, postcss_selector_parser_1.combinator)({
                    value: ' ',
                }));
                // Add the [dir] attribute in front of the " " combinator, i.e. as an ancestor
                selector.insertBefore(selector.first, syntheticAttribute);
            }
            else {
                // Otherwise there's no need for the descendant selector, so we can skip adding the
                // space combinator and just put the synthetic placeholder next to the native one
                selector.insertBefore(nativeAttribute, syntheticAttribute);
            }
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=transform.js.map