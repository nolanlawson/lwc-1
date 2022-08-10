"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCustomElementTag = exports.toPropertyName = void 0;
const constants_1 = require("./constants");
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function toPropertyName(attr) {
    let prop = '';
    let shouldUpperCaseNext = false;
    for (let i = 0; i < attr.length; i++) {
        const char = attr.charAt(i);
        if (char === '-') {
            shouldUpperCaseNext = true;
        }
        else {
            prop += shouldUpperCaseNext ? char.toUpperCase() : char;
            shouldUpperCaseNext = false;
        }
    }
    return prop;
}
exports.toPropertyName = toPropertyName;
/**
 * Test if given tag name is a custom element.
 * @param tagName element tag name to test
 * @returns true if given tag name represents a custom element, false otherwise.
 */
function isCustomElementTag(tagName) {
    return tagName.includes('-') && !constants_1.DASHED_TAGNAME_ELEMENT_SET.has(tagName);
}
exports.isCustomElementTag = isCustomElementTag;
//# sourceMappingURL=utils.js.map