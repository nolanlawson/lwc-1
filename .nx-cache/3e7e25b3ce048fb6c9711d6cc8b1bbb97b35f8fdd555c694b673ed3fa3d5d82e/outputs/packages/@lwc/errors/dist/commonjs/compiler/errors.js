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
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeToDiagnostic = exports.normalizeToCompilerError = exports.invariant = exports.generateCompilerError = exports.generateCompilerDiagnostic = exports.generateErrorMessage = exports.CompilerError = void 0;
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const utils_1 = require("../shared/utils");
const utils_2 = require("./utils");
var utils_3 = require("./utils");
Object.defineProperty(exports, "CompilerError", { enumerable: true, get: function () { return utils_3.CompilerError; } });
__exportStar(require("./error-info"), exports);
function generateErrorMessage(errorInfo, args) {
    const message = Array.isArray(args)
        ? (0, utils_1.templateString)(errorInfo.message, args)
        : errorInfo.message;
    if (errorInfo.url && errorInfo.url !== '') {
        // TODO [#1289]: Add url info into message
    }
    return `LWC${errorInfo.code}: ${message}`;
}
exports.generateErrorMessage = generateErrorMessage;
/**
 * Generates a compiler diagnostic. This function is used to look up the specified errorInfo
 * and generate a friendly and consistent diagnostic object. Diagnostic contains
 * info about the error's code and its origin (filename, line, column) when applicable.
 *
 * @param {LWCErrorInfo} errorInfo The object holding the error metadata.
 * @param {ErrorConfig} config A config object providing any message arguments and origin info needed to create the error.
 * @return {CompilerDiagnostic}
 */
function generateCompilerDiagnostic(errorInfo, config) {
    const message = generateErrorMessage(errorInfo, config && config.messageArgs);
    const diagnostic = {
        code: errorInfo.code,
        message,
        level: errorInfo.level,
    };
    if (config && config.origin) {
        diagnostic.filename = (0, utils_2.getFilename)(config.origin);
        diagnostic.location = (0, utils_2.getLocation)(config.origin);
    }
    return diagnostic;
}
exports.generateCompilerDiagnostic = generateCompilerDiagnostic;
/**
 * Generates a compiler error. This function is used to look up the specified errorInfo
 * and generate a friendly and consistent error object. Error object contains info about
 * the error's code and its origin (filename, line, column) when applicable.
 *
 * @param {LWCErrorInfo} errorInfo The object holding the error metadata.
 * @param {ErrorConfig} config A config object providing any message arguments and origin info needed to create the error.
 * @return {CompilerError}
 */
function generateCompilerError(errorInfo, config) {
    const message = generateErrorMessage(errorInfo, config && config.messageArgs);
    const error = new utils_2.CompilerError(errorInfo.code, message);
    if (config) {
        error.filename = (0, utils_2.getFilename)(config.origin);
        error.location = (0, utils_2.getLocation)(config.origin);
    }
    return error;
}
exports.generateCompilerError = generateCompilerError;
function invariant(condition, errorInfo, args) {
    if (!condition) {
        throw generateCompilerError(errorInfo, {
            messageArgs: args,
        });
    }
}
exports.invariant = invariant;
/**
 * Normalizes a received error into a CompilerError. Adds any provided additional origin info.
 * @param errorInfo
 * @param error
 * @param origin
 *
 * @return {CompilerError}
 */
function normalizeToCompilerError(errorInfo, error, origin) {
    if (error instanceof utils_2.CompilerError) {
        if (origin) {
            error.filename = (0, utils_2.getFilename)(origin);
            error.location = (0, utils_2.getLocation)(origin);
        }
        return error;
    }
    const { code, message, filename, location } = convertErrorToDiagnostic(error, errorInfo, origin);
    const compilerError = new utils_2.CompilerError(code, `${error.name}: ${message}`, filename, location);
    compilerError.stack = error.stack;
    return compilerError;
}
exports.normalizeToCompilerError = normalizeToCompilerError;
/**
 * Normalizes a received error into a CompilerDiagnostic. Adds any provided additional origin info.
 * @param error
 * @param origin
 *
 * @return {CompilerDiagnostic}
 */
function normalizeToDiagnostic(errorInfo, error, origin) {
    if (error instanceof utils_2.CompilerError) {
        const diagnostic = error.toDiagnostic();
        if (origin) {
            diagnostic.filename = (0, utils_2.getFilename)(origin);
            diagnostic.location = (0, utils_2.getLocation)(origin);
        }
        return diagnostic;
    }
    return convertErrorToDiagnostic(error, errorInfo, origin);
}
exports.normalizeToDiagnostic = normalizeToDiagnostic;
function convertErrorToDiagnostic(error, fallbackErrorInfo, origin) {
    const code = (0, utils_2.getCodeFromError)(error) || fallbackErrorInfo.code;
    const message = error.lwcCode
        ? error.message
        : generateErrorMessage(fallbackErrorInfo, [error.message]);
    const level = error.level || fallbackErrorInfo.level;
    const filename = (0, utils_2.getFilename)(origin, error);
    const location = (0, utils_2.getLocation)(origin, error);
    // TODO [#1289]: Preserve stack information
    return { code, message, level, filename, location };
}
//# sourceMappingURL=errors.js.map