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
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const babel = __importStar(require("@babel/core"));
const plugin_proposal_class_properties_1 = __importDefault(require("@babel/plugin-proposal-class-properties"));
const plugin_proposal_object_rest_spread_1 = __importDefault(require("@babel/plugin-proposal-object-rest-spread"));
const babel_plugin_component_1 = __importDefault(require("@lwc/babel-plugin-component"));
const errors_1 = require("@lwc/errors");
function scriptTransform(code, filename, options) {
    const { isExplicitImport, experimentalDynamicComponent: dynamicImports, outputConfig: { sourcemap }, } = options;
    let result;
    try {
        result = babel.transformSync(code, {
            filename,
            sourceMaps: sourcemap,
            // Prevent Babel from loading local configuration.
            babelrc: false,
            configFile: false,
            // Force Babel to generate new line and whitespaces. This prevent Babel from generating
            // an error when the generated code is over 500KB.
            compact: false,
            plugins: [
                [babel_plugin_component_1.default, { isExplicitImport, dynamicImports }],
                [plugin_proposal_class_properties_1.default, { loose: true }],
                // This plugin should be removed in a future version. The object-rest-spread is
                // already a stage 4 feature. The LWC compile should leave this syntax untouched.
                plugin_proposal_object_rest_spread_1.default,
            ],
        });
    }
    catch (e) {
        throw (0, errors_1.normalizeToCompilerError)(errors_1.TransformerErrors.JS_TRANSFORMER_ERROR, e, { filename });
    }
    return {
        code: result.code,
        map: result.map,
    };
}
exports.default = scriptTransform;
//# sourceMappingURL=javascript.js.map