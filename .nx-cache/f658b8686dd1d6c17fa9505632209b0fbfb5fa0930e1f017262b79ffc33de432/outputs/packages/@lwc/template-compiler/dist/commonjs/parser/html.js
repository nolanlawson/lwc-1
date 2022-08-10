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
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeTextContent = exports.cleanTextNode = exports.parseHTML = void 0;
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const parse5 = __importStar(require("parse5"));
const he = __importStar(require("he"));
const errors_1 = require("@lwc/errors");
const ast_1 = require("../shared/ast");
const parse5Errors_1 = require("./parse5Errors");
function getLwcErrorFromParse5Error(code) {
    /* istanbul ignore else */
    if (parse5Errors_1.errorCodesToErrorOn.has(code)) {
        return errors_1.ParserDiagnostics.INVALID_HTML_SYNTAX;
    }
    else if (parse5Errors_1.errorCodesToWarnOn.has(code)) {
        return errors_1.ParserDiagnostics.INVALID_HTML_SYNTAX_WARNING;
    }
    else {
        // It should be impossible to reach here; we have a test in parser.spec.ts to ensure
        // all error codes are accounted for. But just to be safe, make it a warning.
        // TODO [#2650]: better system for handling unexpected parse5 errors
        // eslint-disable-next-line no-console
        console.warn('Found a Parse5 error that we do not know how to handle:', code);
        return errors_1.ParserDiagnostics.INVALID_HTML_SYNTAX_WARNING;
    }
}
function parseHTML(ctx, source) {
    const onParseError = (err) => {
        const { code, ...location } = err;
        const lwcError = getLwcErrorFromParse5Error(code);
        ctx.warnAtLocation(lwcError, (0, ast_1.sourceLocation)(location), [code]);
    };
    return parse5.parseFragment(source, {
        sourceCodeLocationInfo: true,
        onParseError,
    });
}
exports.parseHTML = parseHTML;
// https://github.com/babel/babel/blob/d33d02359474296402b1577ef53f20d94e9085c4/packages/babel-types/src/react.js#L9-L55
function cleanTextNode(value) {
    const lines = value.split(/\r\n|\n|\r/);
    let lastNonEmptyLine = 0;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].match(/[^ \t]/)) {
            lastNonEmptyLine = i;
        }
    }
    let str = '';
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const isFirstLine = i === 0;
        const isLastLine = i === lines.length - 1;
        const isLastNonEmptyLine = i === lastNonEmptyLine;
        let trimmedLine = line.replace(/\t/g, ' ');
        if (!isFirstLine) {
            trimmedLine = trimmedLine.replace(/^[ ]+/, '');
        }
        if (!isLastLine) {
            trimmedLine = trimmedLine.replace(/[ ]+$/, '');
        }
        if (trimmedLine) {
            if (!isLastNonEmptyLine) {
                trimmedLine += ' ';
            }
            str += trimmedLine;
        }
    }
    return str;
}
exports.cleanTextNode = cleanTextNode;
function decodeTextContent(source) {
    return he.decode(source);
}
exports.decodeTextContent = decodeTextContent;
//# sourceMappingURL=html.js.map