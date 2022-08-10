"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCustomRendererHookRequired = exports.LWC_DIRECTIVES = void 0;
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const errors_1 = require("@lwc/errors");
/**
 * Mapping of Directive.name to string literals used in template
 */
exports.LWC_DIRECTIVES = {
    Dom: 'lwc:dom',
    Dynamic: 'lwc:dynamic',
    InnerHTML: 'lwc:inner-html',
    Key: 'key',
};
function checkElement(element, state) {
    const { attributes, directives } = element;
    if (directives.length) {
        let directiveMatched = false;
        // If any directives require custom renderer
        directiveMatched = directives.some((dir) => {
            return state.crDirectives.has(exports.LWC_DIRECTIVES[dir.name]);
        });
        if (directiveMatched) {
            // Directives that require custom renderer are not allowed on custom elements
            // Custom element cannot be allowed to have a custom renderer hook
            // The renderer is cascaded down from the owner(custom element) to all its child nodes who
            // do not have a renderer specified.
            (0, errors_1.invariant)(element.type !== 'Component', errors_1.TemplateErrors.DIRECTIVE_DISALLOWED_ON_CUSTOM_ELEMENT, [element.name, state.config.customRendererConfig.directives.join(', ')]);
            return true;
        }
    }
    const elementConfig = state.crElmToConfigMap[element.name];
    // If element requires custom renderer
    if (elementConfig) {
        const { namespace, attributes: attrConfig } = elementConfig;
        // if element config has namespace, then namespace has to be a match
        if (namespace && element.namespace !== namespace) {
            return false;
        }
        // If no attributes are specified, then consider the element requires custom renderer
        if (attrConfig.size === 0 ||
            attributes.some((attribute) => attrConfig.has(attribute.name))) {
            return true;
        }
    }
    return false;
}
function isCustomRendererHookRequired(element, state) {
    let addCustomRenderer = false;
    if (state.config.customRendererConfig) {
        const cachedResult = state.crCheckedElements.get(element);
        if (cachedResult !== undefined) {
            return cachedResult;
        }
        else {
            addCustomRenderer = checkElement(element, state);
            state.crCheckedElements.set(element, addCustomRenderer);
        }
    }
    return addCustomRenderer;
}
exports.isCustomRendererHookRequired = isCustomRendererHookRequired;
//# sourceMappingURL=renderer-hooks.js.map