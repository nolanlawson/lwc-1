'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.version = exports.transformSync = exports.transform = void 0;
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
var transformer_1 = require("./transformers/transformer");
Object.defineProperty(exports, "transform", { enumerable: true, get: function () { return transformer_1.transform; } });
Object.defineProperty(exports, "transformSync", { enumerable: true, get: function () { return transformer_1.transformSync; } });
exports.version = '2.22.0';
