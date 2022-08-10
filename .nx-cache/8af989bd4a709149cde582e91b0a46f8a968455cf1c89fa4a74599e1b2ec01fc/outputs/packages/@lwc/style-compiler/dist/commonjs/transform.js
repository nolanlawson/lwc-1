"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = void 0;
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const postcss_1 = __importDefault(require("postcss"));
const serialize_1 = __importDefault(require("./serialize"));
const postcss_lwc_plugin_1 = __importDefault(require("./postcss-lwc-plugin"));
function transform(src, id, config = {}) {
    if (src === '') {
        return { code: 'export default undefined' };
    }
    const scoped = !!config.scoped;
    const plugins = [(0, postcss_lwc_plugin_1.default)({ scoped })];
    const result = (0, postcss_1.default)(plugins).process(src, { from: id }).sync();
    return { code: (0, serialize_1.default)(result, config) };
}
exports.transform = transform;
//# sourceMappingURL=transform.js.map