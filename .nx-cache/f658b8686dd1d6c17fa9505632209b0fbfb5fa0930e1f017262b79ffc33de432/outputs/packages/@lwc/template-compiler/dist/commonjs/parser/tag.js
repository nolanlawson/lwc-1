"use strict";
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUnsafeTopLevelSerializableElement = void 0;
const constants_1 = require("./constants");
function isUnsafeTopLevelSerializableElement(element) {
    return constants_1.TAGS_THAT_CANNOT_BE_PARSED_AS_TOP_LEVEL.has(element.name);
}
exports.isUnsafeTopLevelSerializableElement = isUnsafeTopLevelSerializableElement;
//# sourceMappingURL=tag.js.map