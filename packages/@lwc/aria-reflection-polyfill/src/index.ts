/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { AriaPropNameToAttrNameMap, keys } from '@lwc/shared';
import { detect } from './detect';
import { patch } from './polyfill';

// These are included for backwards compat. They were part of an earlier version of the spec
// that didn't ship, but we need to continue "polyfilling" them to avoid breaking existing code.
const NonStandardAriaPropNameToAttrNameMap = {
    ariaActiveDescendant: 'aria-activedescendant',
    ariaControls: 'aria-controls',
    ariaDescribedBy: 'aria-describedby',
    ariaDetails: 'aria-details',
    ariaErrorMessage: 'aria-errormessage',
    ariaFlowTo: 'aria-flowto',
    ariaLabelledBy: 'aria-labelledby',
    ariaOwns: 'aria-owns',
};

const propNamesToAttrs: { [key: string]: string } = {
    ...AriaPropNameToAttrNameMap,
    ...NonStandardAriaPropNameToAttrNameMap,
};

const ElementPrototypeAriaPropertyNames = keys(propNamesToAttrs);

for (let i = 0, len = ElementPrototypeAriaPropertyNames.length; i < len; i += 1) {
    const propName = ElementPrototypeAriaPropertyNames[i];
    const attrName = propNamesToAttrs[propName];
    if (detect(propName)) {
        patch(propName, attrName);
    }
}
