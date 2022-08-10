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
const path = __importStar(require("path"));
const errors_1 = require("@lwc/errors");
const template_compiler_1 = __importDefault(require("@lwc/template-compiler"));
/**
 * Transforms a HTML template into module exporting a template function.
 * The transform also add a style import for the default stylesheet associated with
 * the template regardless if there is an actual style or not.
 */
function templateTransform(src, filename, options) {
    const { experimentalDynamicComponent, preserveHtmlComments, enableStaticContentOptimization, customRendererConfig, } = options;
    const experimentalDynamicDirective = Boolean(experimentalDynamicComponent);
    let result;
    try {
        result = (0, template_compiler_1.default)(src, {
            experimentalDynamicDirective,
            preserveHtmlComments,
            enableStaticContentOptimization,
            customRendererConfig,
        });
    }
    catch (e) {
        throw (0, errors_1.normalizeToCompilerError)(errors_1.TransformerErrors.HTML_TRANSFORMER_ERROR, e, { filename });
    }
    const fatalError = result.warnings.find((warning) => warning.level === errors_1.DiagnosticLevel.Error);
    if (fatalError) {
        throw errors_1.CompilerError.from(fatalError, { filename });
    }
    // The "Error" diagnostic level makes no sense to include here, because it would already have been
    // thrown above. As for "Log" and "Fatal", they are currently unused.
    const warnings = result.warnings.filter((_) => _.level === errors_1.DiagnosticLevel.Warning);
    // Rollup only cares about the mappings property on the map. Since producing a source map for
    // the template doesn't make sense, the transform returns an empty mappings.
    return {
        code: serialize(result.code, filename, options),
        map: { mappings: '' },
        warnings,
    };
}
exports.default = templateTransform;
function escapeScopeToken(input) {
    // Minimal escape for strings containing the "@" and "#" characters, which are disallowed
    // in certain cases in attribute names
    return input.replace(/@/g, '___at___').replace(/#/g, '___hash___');
}
function serialize(code, filename, { namespace, name }) {
    const cssRelPath = `./${path.basename(filename, path.extname(filename))}.css`;
    const scopedCssRelPath = `./${path.basename(filename, path.extname(filename))}.scoped.css`;
    const scopeToken = escapeScopeToken(`${namespace}-${name}_${path.basename(filename, path.extname(filename))}`);
    let buffer = '';
    buffer += `import { freezeTemplate } from "lwc";\n\n`;
    buffer += `import _implicitStylesheets from "${cssRelPath}";\n\n`;
    buffer += `import _implicitScopedStylesheets from "${scopedCssRelPath}?scoped=true";\n\n`;
    buffer += code;
    buffer += '\n\n';
    buffer += 'if (_implicitStylesheets) {\n';
    buffer += `  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)\n`;
    buffer += `}\n`;
    buffer += 'if (_implicitScopedStylesheets) {\n';
    buffer += `  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)\n`;
    buffer += `}\n`;
    buffer += 'if (_implicitStylesheets || _implicitScopedStylesheets) {\n';
    buffer += `  tmpl.stylesheetToken = "${scopeToken}"\n`;
    buffer += '}\n';
    // Note that `renderMode` and `slots` are already rendered in @lwc/template-compiler and appear
    // as `code` above. At this point, no more expando props should be added to `tmpl`.
    buffer += 'freezeTemplate(tmpl);\n';
    return buffer;
}
//# sourceMappingURL=template.js.map