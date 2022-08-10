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
exports.format = void 0;
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const t = __importStar(require("../../shared/estree"));
const naming_1 = require("../../shared/naming");
const constants_1 = require("../../shared/constants");
const helpers_1 = require("../helpers");
const optimize_1 = require("../optimize");
function generateComponentImports(codeGen) {
    return Array.from(codeGen.referencedComponents).map((name) => {
        const localIdentifier = (0, helpers_1.identifierFromComponentName)(name);
        return t.importDeclaration([t.importDefaultSpecifier(localIdentifier)], t.literal((0, naming_1.kebabcaseToCamelcase)(name)));
    });
}
function generateLwcApisImport(codeGen) {
    const imports = Array.from(codeGen.usedLwcApis)
        .sort()
        .map((name) => {
        return t.importSpecifier(t.identifier(name), t.identifier(name));
    });
    return t.importDeclaration(imports, t.literal(constants_1.LWC_MODULE_NAME));
}
function generateHoistedNodes(codegen) {
    return codegen.hoistedNodes.map(({ identifier, expr }) => {
        return t.variableDeclaration('const', [t.variableDeclarator(identifier, expr)]);
    });
}
/**
 * Generate an ES module AST from a template ESTree AST. The generated module imports the dependent
 * LWC components via import statements and expose the template function via a default export
 * statement.
 *
 * @example
 * ```js
 * import { registerTemplate } from 'lwc';
 * // Components imports
 *
 * function tmpl() {
 *   // Template generated code
 * }
 * // Template metadata
 *
 * export default tmpl;
 * registerTemplate(tmpl);
 * ```
 */
function format(templateFn, codeGen) {
    codeGen.usedLwcApis.add(constants_1.SECURE_REGISTER_TEMPLATE_METHOD_NAME);
    const imports = [...generateComponentImports(codeGen), generateLwcApisImport(codeGen)];
    const hoistedNodes = generateHoistedNodes(codeGen);
    const metadata = (0, helpers_1.generateTemplateMetadata)(codeGen);
    const optimizedTemplateDeclarations = (0, optimize_1.optimizeStaticExpressions)(templateFn);
    const templateBody = [
        ...optimizedTemplateDeclarations,
        t.exportDefaultDeclaration(t.callExpression(t.identifier(constants_1.SECURE_REGISTER_TEMPLATE_METHOD_NAME), [
            t.identifier(constants_1.TEMPLATE_FUNCTION_NAME),
        ])),
    ];
    return t.program([...imports, ...hoistedNodes, ...templateBody, ...metadata]);
}
exports.format = format;
//# sourceMappingURL=module.js.map