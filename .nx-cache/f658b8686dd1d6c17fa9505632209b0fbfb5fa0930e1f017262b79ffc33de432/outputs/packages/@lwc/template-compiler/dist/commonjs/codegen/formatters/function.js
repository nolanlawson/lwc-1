"use strict";
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
exports.format = void 0;
const t = __importStar(require("../../shared/estree"));
const constants_1 = require("../../shared/constants");
const helpers_1 = require("../helpers");
const optimize_1 = require("../optimize");
/**
 * Generate a function body AST from a template ESTree AST. This function can then be instantiated
 * via `new Function(code, modules)` The generated function retrieves receives the dependent LWC
 * components as arguments and returns the template function.
 *
 * @example
 * ```js
 * const {
 *   // Components names
 * } = modules;
 *
 * function tmpl() {
 *   // Template generated code
 * }
 * // Template metadata
 *
 * return tmpl;
 * ```
 */
function format(templateFn, codeGen) {
    const lookups = Array.from(codeGen.referencedComponents)
        .sort()
        .map((name) => {
        const localIdentifier = (0, helpers_1.identifierFromComponentName)(name);
        return t.variableDeclaration('const', [
            t.variableDeclarator(localIdentifier, t.memberExpression(t.identifier(constants_1.TEMPLATE_MODULES_PARAMETER), t.literal(name), {
                computed: true,
            })),
        ]);
    });
    const optimizedTemplateDeclarations = (0, optimize_1.optimizeStaticExpressions)(templateFn);
    const metadata = (0, helpers_1.generateTemplateMetadata)(codeGen);
    return t.program([
        ...lookups,
        ...optimizedTemplateDeclarations,
        ...metadata,
        t.returnStatement(t.identifier(constants_1.TEMPLATE_FUNCTION_NAME)),
    ]);
}
exports.format = format;
//# sourceMappingURL=function.js.map