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
exports.transformSync = exports.transform = void 0;
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const path = __importStar(require("path"));
const shared_1 = require("@lwc/shared");
const errors_1 = require("@lwc/errors");
const options_1 = require("../options");
const style_1 = __importDefault(require("./style"));
const template_1 = __importDefault(require("./template"));
const javascript_1 = __importDefault(require("./javascript"));
/**
 * Transforms the passed code. Returning a Promise of an object with the generated code, source map
 * and gathered metadata.
 *
 * @deprecated Use transformSync instead.
 */
function transform(src, filename, options) {
    validateArguments(src, filename);
    return new Promise((resolve, reject) => {
        try {
            const res = transformSync(src, filename, options);
            resolve(res);
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.transform = transform;
/**
 * Transform the passed source code. Returning an object with the generated code, source map and
 * gathered metadata.
 */
function transformSync(src, filename, options) {
    validateArguments(src, filename);
    const normalizedOptions = (0, options_1.validateTransformOptions)(options);
    return transformFile(src, filename, normalizedOptions);
}
exports.transformSync = transformSync;
function validateArguments(src, filename) {
    (0, errors_1.invariant)((0, shared_1.isString)(src), errors_1.TransformerErrors.INVALID_SOURCE, [src]);
    (0, errors_1.invariant)((0, shared_1.isString)(filename), errors_1.TransformerErrors.INVALID_ID, [filename]);
}
function transformFile(src, filename, options) {
    let transformer;
    switch (path.extname(filename)) {
        case '.html':
            transformer = template_1.default;
            break;
        case '.css':
            transformer = style_1.default;
            break;
        case '.ts':
        case '.js':
            transformer = javascript_1.default;
            break;
        default:
            throw (0, errors_1.generateCompilerError)(errors_1.TransformerErrors.NO_AVAILABLE_TRANSFORMER, {
                messageArgs: [filename],
                origin: { filename },
            });
    }
    return transformer(src, filename, options);
}
//# sourceMappingURL=transformer.js.map