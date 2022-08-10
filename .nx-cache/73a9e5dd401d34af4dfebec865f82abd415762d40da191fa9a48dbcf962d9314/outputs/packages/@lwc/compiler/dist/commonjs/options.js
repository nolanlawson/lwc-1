"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTransformOptions = void 0;
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const errors_1 = require("@lwc/errors");
const shared_1 = require("@lwc/shared");
const DEFAULT_OPTIONS = {
    isExplicitImport: false,
    preserveHtmlComments: false,
    enableStaticContentOptimization: true,
};
const DEFAULT_DYNAMIC_CMP_CONFIG = {
    loader: '',
    strictSpecifier: true,
};
const DEFAULT_STYLESHEET_CONFIG = {
    customProperties: {
        resolution: { type: 'native' },
    },
};
const DEFAULT_OUTPUT_CONFIG = {
    minify: false,
    sourcemap: false,
};
function validateTransformOptions(options) {
    validateOptions(options);
    return normalizeOptions(options);
}
exports.validateTransformOptions = validateTransformOptions;
function validateOptions(options) {
    (0, errors_1.invariant)(!(0, shared_1.isUndefined)(options), errors_1.CompilerValidationErrors.MISSING_OPTIONS_OBJECT, [options]);
    if (!(0, shared_1.isUndefined)(options.stylesheetConfig)) {
        validateStylesheetConfig(options.stylesheetConfig);
    }
    if (!(0, shared_1.isUndefined)(options.outputConfig)) {
        validateOutputConfig(options.outputConfig);
    }
}
function validateStylesheetConfig(config) {
    const { customProperties } = config;
    if (!(0, shared_1.isUndefined)(customProperties)) {
        const { resolution } = customProperties;
        if (!(0, shared_1.isUndefined)(resolution)) {
            (0, errors_1.invariant)((0, shared_1.isObject)(resolution), errors_1.CompilerValidationErrors.INVALID_RESOLUTION_PROPERTY, [
                resolution,
            ]);
            const { type } = resolution;
            (0, errors_1.invariant)(type === 'native' || type === 'module', errors_1.CompilerValidationErrors.INVALID_TYPE_PROPERTY, [type]);
        }
    }
}
function isUndefinedOrBoolean(property) {
    return (0, shared_1.isUndefined)(property) || (0, shared_1.isBoolean)(property);
}
function validateOutputConfig(config) {
    (0, errors_1.invariant)(isUndefinedOrBoolean(config.sourcemap), errors_1.CompilerValidationErrors.INVALID_SOURCEMAP_PROPERTY, [config.sourcemap]);
    if (!(0, shared_1.isUndefined)(config.minify)) {
        // eslint-disable-next-line no-console
        console.warn(`"OutputConfig.minify" property is deprecated. The value doesn't impact the compilation and can safely be removed.`);
    }
}
function normalizeOptions(options) {
    const outputConfig = {
        ...DEFAULT_OUTPUT_CONFIG,
        ...options.outputConfig,
    };
    const stylesheetConfig = {
        customProperties: {
            ...DEFAULT_STYLESHEET_CONFIG.customProperties,
            ...(options.stylesheetConfig && options.stylesheetConfig.customProperties),
        },
    };
    const experimentalDynamicComponent = {
        ...DEFAULT_DYNAMIC_CMP_CONFIG,
        ...options.experimentalDynamicComponent,
    };
    return {
        ...DEFAULT_OPTIONS,
        ...options,
        stylesheetConfig,
        outputConfig,
        experimentalDynamicComponent,
    };
}
//# sourceMappingURL=options.js.map