"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DASHED_TAGNAME_ELEMENT_SET = exports.TEMPLATE_PARAMS = exports.TEMPLATE_FUNCTION_NAME = exports.TEMPLATE_MODULES_PARAMETER = exports.LWC_MODULE_NAME = exports.RENDERER = exports.PARSE_SVG_FRAGMENT_METHOD_NAME = exports.PARSE_FRAGMENT_METHOD_NAME = exports.SECURE_REGISTER_TEMPLATE_METHOD_NAME = void 0;
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
exports.SECURE_REGISTER_TEMPLATE_METHOD_NAME = 'registerTemplate';
exports.PARSE_FRAGMENT_METHOD_NAME = 'parseFragment';
exports.PARSE_SVG_FRAGMENT_METHOD_NAME = 'parseSVGFragment';
exports.RENDERER = 'renderer';
exports.LWC_MODULE_NAME = 'lwc';
exports.TEMPLATE_MODULES_PARAMETER = 'modules';
exports.TEMPLATE_FUNCTION_NAME = 'tmpl';
exports.TEMPLATE_PARAMS = {
    INSTANCE: '$cmp',
    API: '$api',
    SLOT_SET: '$slotset',
    CONTEXT: '$ctx',
};
exports.DASHED_TAGNAME_ELEMENT_SET = new Set([
    'annotation-xml',
    'color-profile',
    'font-face',
    'font-face-src',
    'font-face-uri',
    'font-face-format',
    'font-face-name',
    'missing-glyph',
]);
//# sourceMappingURL=constants.js.map