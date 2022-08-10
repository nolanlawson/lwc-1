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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const errors_1 = require("@lwc/errors");
const state_1 = __importDefault(require("./state"));
const config_1 = require("./config");
const parser_1 = __importDefault(require("./parser"));
const codegen_1 = __importDefault(require("./codegen"));
__exportStar(require("./shared/types"), exports);
function parse(source, config = {}) {
    const options = (0, config_1.normalizeConfig)(config);
    const state = new state_1.default(options);
    return (0, parser_1.default)(source, state);
}
exports.parse = parse;
function compile(source, config) {
    const options = (0, config_1.normalizeConfig)(config);
    const state = new state_1.default(options);
    let code = '';
    let root;
    const warnings = [];
    try {
        const parsingResults = (0, parser_1.default)(source, state);
        warnings.push(...parsingResults.warnings);
        const hasParsingError = parsingResults.warnings.some((warning) => warning.level === errors_1.DiagnosticLevel.Error);
        if (!hasParsingError && parsingResults.root) {
            code = (0, codegen_1.default)(parsingResults.root, state);
            root = parsingResults.root;
        }
    }
    catch (error) {
        const diagnostic = (0, errors_1.normalizeToDiagnostic)(errors_1.ParserDiagnostics.GENERIC_PARSING_ERROR, error);
        diagnostic.message = `Unexpected compilation error: ${diagnostic.message}`;
        warnings.push(diagnostic);
    }
    return {
        code,
        root,
        warnings,
    };
}
exports.default = compile;
//# sourceMappingURL=index.js.map