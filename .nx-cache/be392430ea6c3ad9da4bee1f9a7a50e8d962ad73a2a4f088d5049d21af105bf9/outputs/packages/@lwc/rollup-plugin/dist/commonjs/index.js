"use strict";
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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
const pluginutils_1 = __importDefault(require("@rollup/pluginutils"));
const compiler_1 = require("@lwc/compiler");
const module_resolver_1 = require("@lwc/module-resolver");
const PLUGIN_NAME = 'rollup-plugin-lwc-compiler';
const DEFAULT_MODULES = [
    { npm: '@lwc/engine-dom' },
    { npm: '@lwc/synthetic-shadow' },
    { npm: '@lwc/wire-service' },
];
const IMPLICIT_DEFAULT_HTML_PATH = '@lwc/resources/empty_html.js';
const EMPTY_IMPLICIT_HTML_CONTENT = 'export default void 0';
function isImplicitHTMLImport(importee, importer) {
    return (path_1.default.extname(importer) === '.js' &&
        path_1.default.extname(importee) === '.html' &&
        path_1.default.dirname(importer) === path_1.default.dirname(importee) &&
        path_1.default.basename(importer, '.js') === path_1.default.basename(importee, '.html'));
}
function parseQueryParamsForScopedOption(id) {
    const [filename, query] = id.split('?', 2);
    const params = query && new url_1.URLSearchParams(query);
    const scoped = !!(params && params.get('scoped'));
    return {
        filename,
        scoped,
    };
}
function transformWarningToRollupWarning(warning, src, id) {
    var _a;
    // For reference on RollupWarnings, a good example is:
    // https://github.com/rollup/plugins/blob/53776ee/packages/typescript/src/diagnostics/toWarning.ts
    const pluginCode = `LWC${warning.code}`; // modeled after TypeScript, e.g. TS5055
    const result = {
        // Replace any newlines in case they exist, just so the Rollup output looks a bit cleaner
        message: `@lwc/rollup-plugin: ${(_a = warning.message) === null || _a === void 0 ? void 0 : _a.replace(/\n/g, ' ')}`,
        plugin: PLUGIN_NAME,
        pluginCode,
    };
    const { location } = warning;
    if (location) {
        result.loc = {
            // The CompilerDiagnostic from @lwc/template-compiler reports an undefined filename, because it loses the
            // filename context here:
            // https://github.com/salesforce/lwc/blob/e2bc36f/packages/%40lwc/compiler/src/transformers/template.ts#L35-L38
            file: id,
            // For LWC, the column is 0-based and the line is 1-based. Rollup just reports this for informational
            // purposes, though; it doesn't seem to matter what we put here.
            column: location.column,
            line: location.line,
        };
        // To get a fancier output like @rollup/plugin-typescript's, we would need to basically do our
        // own color coding on the entire line, adding the wavy lines to indicate an error, etc. You can see how
        // TypeScript does it here: https://github.com/microsoft/TypeScript/blob/1a4643b/src/compiler/program.ts#L453-L485
        // Outputting just the string that caused the error is good enough for now though.
        if (typeof location.start === 'number' && typeof location.length === 'number') {
            result.frame = src.substring(location.start, location.start + location.length);
        }
    }
    return result;
}
function lwc(pluginOptions = {}) {
    const filter = pluginutils_1.default.createFilter(pluginOptions.include, pluginOptions.exclude);
    let { rootDir, modules = [] } = pluginOptions;
    const { stylesheetConfig, sourcemap = false, preserveHtmlComments, experimentalDynamicComponent, } = pluginOptions;
    return {
        name: PLUGIN_NAME,
        buildStart({ input }) {
            if (rootDir === undefined) {
                if (Array.isArray(input)) {
                    rootDir = path_1.default.dirname(path_1.default.resolve(input[0]));
                    if (input.length > 1) {
                        this.warn(`The "rootDir" option should be explicitly set when passing an "input" array to rollup. The "rootDir" option is implicitly resolved to ${rootDir}.`);
                    }
                }
                else {
                    rootDir = path_1.default.dirname(path_1.default.resolve(Object.values(input)[0]));
                    this.warn(`The "rootDir" option should be explicitly set when passing "input" object to rollup. The "rootDir" option is implicitly resolved to ${rootDir}.`);
                }
            }
            else {
                rootDir = path_1.default.resolve(rootDir);
            }
            modules = [...modules, ...DEFAULT_MODULES, { dir: rootDir }];
        },
        resolveId(importee, importer) {
            // Normalize relative import to absolute import
            // Note that in @rollup/plugin-node-resolve v13, relative imports will sometimes
            // be in absolute format (e.g. "/path/to/module.js") so we have to check that as well.
            if ((importee.startsWith('.') || importee.startsWith('/')) && importer) {
                const importerExt = path_1.default.extname(importer);
                const ext = path_1.default.extname(importee) || importerExt;
                const normalizedPath = path_1.default.resolve(path_1.default.dirname(importer), importee);
                const absPath = pluginutils_1.default.addExtension(normalizedPath, ext);
                if (isImplicitHTMLImport(normalizedPath, importer) && !fs_1.default.existsSync(absPath)) {
                    return IMPLICIT_DEFAULT_HTML_PATH;
                }
                return pluginutils_1.default.addExtension(normalizedPath, ext);
            }
            else if (importer) {
                // Could be an import like `import component from 'x/component'`
                try {
                    return (0, module_resolver_1.resolveModule)(importee, importer, {
                        modules,
                        rootDir,
                    }).entry;
                }
                catch (err) {
                    if (err && err.code !== 'NO_LWC_MODULE_FOUND') {
                        throw err;
                    }
                }
            }
        },
        load(id) {
            if (id === IMPLICIT_DEFAULT_HTML_PATH) {
                return EMPTY_IMPLICIT_HTML_CONTENT;
            }
            // Have to parse the `?scoped=true` in `load`, because it's not guaranteed
            // that `resolveId` will always be called (e.g. if another plugin resolves it first)
            const { scoped, filename } = parseQueryParamsForScopedOption(id);
            if (scoped) {
                id = filename; // remove query param
            }
            const isCSS = path_1.default.extname(id) === '.css';
            if (isCSS) {
                const exists = fs_1.default.existsSync(id);
                const code = exists ? fs_1.default.readFileSync(id, 'utf8') : '';
                return code;
            }
        },
        transform(src, id) {
            // Filter user-land config and lwc import
            if (!filter(id)) {
                return;
            }
            const { scoped, filename } = parseQueryParamsForScopedOption(id);
            if (scoped) {
                id = filename; // remove query param
            }
            // Extract module name and namespace from file path
            const [namespace, name] = path_1.default.dirname(id).split(path_1.default.sep).slice(-2);
            const { code, map, warnings } = (0, compiler_1.transformSync)(src, id, {
                name,
                namespace,
                outputConfig: { sourcemap },
                stylesheetConfig,
                experimentalDynamicComponent,
                preserveHtmlComments,
                scopedStyles: scoped,
            });
            if (warnings) {
                for (const warning of warnings) {
                    this.warn(transformWarningToRollupWarning(warning, src, id));
                }
            }
            const rollupMap = map;
            return { code, map: rollupMap };
        },
    };
}
exports.default = lwc;
// For backward compatibility with commonjs format
module.exports = lwc;
//# sourceMappingURL=index.js.map