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
exports.parseIdentifier = exports.parseExpression = exports.isPotentialExpression = exports.isExpression = exports.EXPRESSION_SYMBOL_END = exports.EXPRESSION_SYMBOL_START = void 0;
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const acorn_1 = require("acorn");
const errors_1 = require("@lwc/errors");
const t = __importStar(require("../shared/estree"));
const javascript_1 = require("./utils/javascript");
exports.EXPRESSION_SYMBOL_START = '{';
exports.EXPRESSION_SYMBOL_END = '}';
const VALID_EXPRESSION_RE = /^{.+}$/;
const POTENTIAL_EXPRESSION_RE = /^.?{.+}.*$/;
const WHITESPACES_RE = /\s/;
function isExpression(source) {
    return !!source.match(VALID_EXPRESSION_RE);
}
exports.isExpression = isExpression;
function isPotentialExpression(source) {
    return !!source.match(POTENTIAL_EXPRESSION_RE);
}
exports.isPotentialExpression = isPotentialExpression;
function validateExpression(node, config) {
    const isValidNode = t.isIdentifier(node) || t.isMemberExpression(node);
    (0, errors_1.invariant)(isValidNode, errors_1.ParserDiagnostics.INVALID_NODE, [node.type]);
    if (t.isMemberExpression(node)) {
        (0, errors_1.invariant)(config.experimentalComputedMemberExpression || !node.computed, errors_1.ParserDiagnostics.COMPUTED_PROPERTY_ACCESS_NOT_ALLOWED);
        const { object, property } = node;
        if (!t.isIdentifier(object)) {
            validateExpression(object, config);
        }
        if (!t.isIdentifier(property)) {
            validateExpression(property, config);
        }
    }
}
function validateSourceIsParsedExpression(source, parsedExpression) {
    if (parsedExpression.end === source.length - 1) {
        return;
    }
    let unclosedParenthesisCount = 0;
    for (let i = 0, n = parsedExpression.start; i < n; i++) {
        if (source[i] === '(') {
            unclosedParenthesisCount++;
        }
    }
    // source[source.length - 1] === '}', n = source.length - 1 is to avoid processing '}'.
    for (let i = parsedExpression.end, n = source.length - 1; i < n; i++) {
        const character = source[i];
        if (character === ')') {
            unclosedParenthesisCount--;
        }
        else if (character === ';') {
            // acorn parseExpressionAt will stop at the first ";", it may be that the expression is not
            // a multiple expression ({foo;}), but this is a case that we explicitly do not want to support.
            // in such case, let's fail with the same error as if it were a multiple expression.
            (0, errors_1.invariant)(false, errors_1.ParserDiagnostics.MULTIPLE_EXPRESSIONS);
        }
        else {
            (0, errors_1.invariant)(WHITESPACES_RE.test(character), errors_1.ParserDiagnostics.TEMPLATE_EXPRESSION_PARSING_ERROR, ['Unexpected end of expression']);
        }
    }
    (0, errors_1.invariant)(unclosedParenthesisCount === 0, errors_1.ParserDiagnostics.TEMPLATE_EXPRESSION_PARSING_ERROR, [
        'Unexpected end of expression',
    ]);
}
function parseExpression(ctx, source, location) {
    return ctx.withErrorWrapping(() => {
        const parsed = (0, acorn_1.parseExpressionAt)(source, 1, { ecmaVersion: 2020 });
        validateSourceIsParsedExpression(source, parsed);
        validateExpression(parsed, ctx.config);
        return { ...parsed, location };
    }, errors_1.ParserDiagnostics.TEMPLATE_EXPRESSION_PARSING_ERROR, location, (err) => `Invalid expression ${source} - ${err.message}`);
}
exports.parseExpression = parseExpression;
function parseIdentifier(ctx, source, location) {
    let isValid = true;
    isValid = (0, acorn_1.isIdentifierStart)(source.charCodeAt(0));
    for (let i = 1; i < source.length && isValid; i++) {
        isValid = (0, acorn_1.isIdentifierChar)(source.charCodeAt(i));
    }
    if (isValid && !(0, javascript_1.isReservedES6Keyword)(source)) {
        return {
            ...t.identifier(source),
            location,
        };
    }
    else {
        ctx.throwAtLocation(errors_1.ParserDiagnostics.INVALID_IDENTIFIER, location, [source]);
    }
}
exports.parseIdentifier = parseIdentifier;
//# sourceMappingURL=expression.js.map