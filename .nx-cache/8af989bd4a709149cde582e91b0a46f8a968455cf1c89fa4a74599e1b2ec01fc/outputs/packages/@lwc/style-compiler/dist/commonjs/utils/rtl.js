"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDirPseudoClass = void 0;
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const postcss_selector_parser_1 = require("postcss-selector-parser");
function isDirPseudoClass(node) {
    return (0, postcss_selector_parser_1.isPseudoClass)(node) && node.value === ':dir';
}
exports.isDirPseudoClass = isDirPseudoClass;
//# sourceMappingURL=rtl.js.map