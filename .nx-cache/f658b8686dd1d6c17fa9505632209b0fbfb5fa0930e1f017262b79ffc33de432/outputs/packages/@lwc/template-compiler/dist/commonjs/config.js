"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeConfig = void 0;
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const errors_1 = require("@lwc/errors");
const shared_1 = require("@lwc/shared");
const utils_1 = require("./shared/utils");
const AVAILABLE_OPTION_NAMES = new Set([
    'customRendererConfig',
    'experimentalComputedMemberExpression',
    'experimentalDynamicDirective',
    'preserveHtmlComments',
    'enableStaticContentOptimization',
]);
function normalizeCustomRendererConfig(config) {
    const tagNames = [];
    const normalizedConfig = {
        elements: config.elements.map((e) => {
            var _a, _b;
            const tagName = e.tagName.toLowerCase();
            // Custom element cannot be allowed to have a custom renderer hook
            // The renderer is cascaded down from the owner(custom element) to all its child nodes who
            // do not have a renderer specified.
            (0, errors_1.invariant)(!(0, utils_1.isCustomElementTag)(tagName), errors_1.TemplateErrors.CUSTOM_ELEMENT_TAG_DISALLOWED, [
                e.tagName,
            ]);
            tagNames.push(tagName);
            return {
                tagName,
                namespace: (_a = e.namespace) === null || _a === void 0 ? void 0 : _a.toLowerCase(),
                attributes: (_b = e.attributes) === null || _b === void 0 ? void 0 : _b.map((a) => a.toLowerCase()),
            };
        }),
        directives: config.directives.map((d) => d.toLowerCase()),
    };
    // Check for duplicate tag names
    const dupTagNames = tagNames.filter((item, index) => index !== tagNames.indexOf(item));
    (0, errors_1.invariant)(dupTagNames.length == 0, errors_1.TemplateErrors.DUPLICATE_ELEMENT_ENTRY, [
        dupTagNames.join(', '),
    ]);
    return normalizedConfig;
}
function normalizeConfig(config) {
    (0, errors_1.invariant)(config !== undefined && typeof config === 'object', errors_1.TemplateErrors.OPTIONS_MUST_BE_OBJECT);
    const customRendererConfig = config.customRendererConfig
        ? normalizeCustomRendererConfig(config.customRendererConfig)
        : undefined;
    for (const property in config) {
        if (!AVAILABLE_OPTION_NAMES.has(property) && shared_1.hasOwnProperty.call(config, property)) {
            throw (0, errors_1.generateCompilerError)(errors_1.TemplateErrors.UNKNOWN_OPTION_PROPERTY, {
                messageArgs: [property],
            });
        }
    }
    return {
        preserveHtmlComments: false,
        experimentalComputedMemberExpression: false,
        experimentalDynamicDirective: false,
        enableStaticContentOptimization: true,
        ...config,
        ...{ customRendererConfig },
    };
}
exports.normalizeConfig = normalizeConfig;
//# sourceMappingURL=config.js.map