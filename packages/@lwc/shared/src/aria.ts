/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { create, forEach, StringReplace, StringToLowerCase } from './language';

/**
 * According to the following list, there are 48 aria attributes of which two (ariaDropEffect and
 * ariaGrabbed) are deprecated:
 * https://www.w3.org/TR/wai-aria-1.1/#x6-6-definitions-of-states-and-properties-all-aria-attributes
 *
 * The above list of 46 aria attributes is consistent with the following resources:
 * https://github.com/w3c/aria/pull/708/files#diff-eacf331f0ffc35d4b482f1d15a887d3bR11060
 * https://wicg.github.io/aom/spec/aria-reflection.html
 */
const AriaPropertyNames = [
    'ariaAtomic',
    'ariaAutoComplete',
    'ariaBusy',
    'ariaChecked',
    'ariaColCount',
    'ariaColIndex',
    'ariaColSpan',
    'ariaCurrent',
    'ariaDisabled',
    'ariaExpanded',
    'ariaHasPopup',
    'ariaHidden',
    'ariaInvalid',
    'ariaKeyShortcuts',
    'ariaLabel',
    'ariaLevel',
    'ariaLive',
    'ariaModal',
    'ariaMultiLine',
    'ariaMultiSelectable',
    'ariaOrientation',
    'ariaPlaceholder',
    'ariaPosInSet',
    'ariaPressed',
    'ariaReadOnly',
    'ariaRelevant',
    'ariaRequired',
    'ariaRoleDescription',
    'ariaRowCount',
    'ariaRowIndex',
    'ariaRowSpan',
    'ariaSelected',
    'ariaSetSize',
    'ariaSort',
    'ariaValueMax',
    'ariaValueMin',
    'ariaValueNow',
    'ariaValueText',
    'role',
] as const;

// Any aria-* attribute with Element or FrozenArray<Element> here: https://w3c.github.io/aria/#ARIAMixin
const AriaIdReferencingAttributes = new Set([
    'aria-activedescendant',
    'aria-controls',
    'aria-describedby',
    'aria-details',
    'aria-errormessage',
    'aria-flowto',
    'aria-labelledby',
    'aria-owns',
]);

export type AccessibleElementProperties = {
    [prop in typeof AriaPropertyNames[number]]: string | null;
};

const { AriaAttrNameToPropNameMap, AriaPropNameToAttrNameMap } = /*@__PURE__*/ (() => {
    const AriaAttrNameToPropNameMap: Record<string, string> = create(null);
    const AriaPropNameToAttrNameMap: Record<string, string> = create(null);

    // Synthetic creation of all AOM property descriptors for Custom Elements
    forEach.call(AriaPropertyNames, (propName) => {
        const attrName = StringToLowerCase.call(
            StringReplace.call(propName, /^aria/, () => 'aria-')
        );
        AriaAttrNameToPropNameMap[attrName] = propName;
        AriaPropNameToAttrNameMap[propName] = attrName;
    });

    return { AriaAttrNameToPropNameMap, AriaPropNameToAttrNameMap };
})();

export function isAriaAttribute(attrName: string): boolean {
    return attrName in AriaAttrNameToPropNameMap || AriaIdReferencingAttributes.has(attrName);
}

export function isIdReferencingAriaAttribute(attrName: string): boolean {
    return AriaIdReferencingAttributes.has(attrName);
}

export { AriaAttrNameToPropNameMap, AriaPropNameToAttrNameMap };
