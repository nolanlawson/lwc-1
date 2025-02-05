/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { ElementPrototypeAriaPropertyNames } from '../polyfills/aria-properties/main';
import {
    assign,
    create,
    forEach,
    isUndefined,
    StringReplace,
    StringToLowerCase,
} from '../shared/language';

// These properties get added to LWCElement.prototype publicProps automatically
export const defaultDefHTMLPropertyNames = [
    'accessKey',
    'dir',
    'draggable',
    'hidden',
    'id',
    'lang',
    'tabIndex',
    'title',
];

// Few more exceptions that are using the attribute name to match the property in lowercase.
// this list was compiled from https://msdn.microsoft.com/en-us/library/ms533062(v=vs.85).aspx
// and https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
// Note: this list most be in sync with the compiler as well.
const HTMLPropertyNamesWithLowercasedReflectiveAttributes = [
    'accessKey',
    'readOnly',
    'tabIndex',
    'bgColor',
    'colSpan',
    'rowSpan',
    'contentEditable',
    'dateTime',
    'formAction',
    'isMap',
    'maxLength',
    'useMap',
];

function offsetPropertyErrorMessage(name) {
    return `Using the \`${name}\` property is an anti-pattern because it rounds the value to an integer. Instead, use the \`getBoundingClientRect\` method to obtain fractional values for the size of an element and its position relative to the viewport.`;
}

// Global HTML Attributes & Properties
// https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
export const globalHTMLProperties: {
    [prop: string]: {
        attribute?: string;
        error?: string;
        readOnly?: boolean;
    };
} = assign(create(null), {
    accessKey: {
        attribute: 'accesskey',
    },
    accessKeyLabel: {
        readOnly: true,
    },
    className: {
        attribute: 'class',
        error:
            'Using the `className` property is an anti-pattern because of slow runtime behavior and potential conflicts with classes provided by the owner element. Use the `classList` API instead.',
    },
    contentEditable: {
        attribute: 'contenteditable',
    },
    dataset: {
        readOnly: true,
        error:
            "Using the `dataset` property is an anti-pattern because it can't be statically analyzed. Expose each property individually using the `@api` decorator instead.",
    },
    dir: {
        attribute: 'dir',
    },
    draggable: {
        attribute: 'draggable',
    },
    dropzone: {
        attribute: 'dropzone',
        readOnly: true,
    },
    hidden: {
        attribute: 'hidden',
    },
    id: {
        attribute: 'id',
    },
    inputMode: {
        attribute: 'inputmode',
    },
    lang: {
        attribute: 'lang',
    },
    slot: {
        attribute: 'slot',
        error: 'Using the `slot` property is an anti-pattern.',
    },
    spellcheck: {
        attribute: 'spellcheck',
    },
    style: {
        attribute: 'style',
    },
    tabIndex: {
        attribute: 'tabindex',
    },
    title: {
        attribute: 'title',
    },
    translate: {
        attribute: 'translate',
    },

    // additional "global attributes" that are not present in the link above.
    isContentEditable: {
        readOnly: true,
    },
    offsetHeight: {
        readOnly: true,
        error: offsetPropertyErrorMessage('offsetHeight'),
    },
    offsetLeft: {
        readOnly: true,
        error: offsetPropertyErrorMessage('offsetLeft'),
    },
    offsetParent: {
        readOnly: true,
    },
    offsetTop: {
        readOnly: true,
        error: offsetPropertyErrorMessage('offsetTop'),
    },
    offsetWidth: {
        readOnly: true,
        error: offsetPropertyErrorMessage('offsetWidth'),
    },
    role: {
        attribute: 'role',
    },
});

const AttrNameToPropNameMap: Record<string, string> = create(null);
const PropNameToAttrNameMap: Record<string, string> = create(null);

// Synthetic creation of all AOM property descriptors for Custom Elements
forEach.call(ElementPrototypeAriaPropertyNames, (propName: string) => {
    // Typescript is inferring the wrong function type for this particular
    // overloaded method: https://github.com/Microsoft/TypeScript/issues/27972
    // @ts-ignore type-mismatch
    const attrName = StringToLowerCase.call(StringReplace.call(propName, /^aria/, 'aria-'));
    AttrNameToPropNameMap[attrName] = propName;
    PropNameToAttrNameMap[propName] = attrName;
});

forEach.call(defaultDefHTMLPropertyNames, propName => {
    const attrName = StringToLowerCase.call(propName);
    AttrNameToPropNameMap[attrName] = propName;
    PropNameToAttrNameMap[propName] = attrName;
});

forEach.call(HTMLPropertyNamesWithLowercasedReflectiveAttributes, propName => {
    const attrName = StringToLowerCase.call(propName);
    AttrNameToPropNameMap[attrName] = propName;
    PropNameToAttrNameMap[propName] = attrName;
});

const CAMEL_REGEX = /-([a-z])/g;

/**
 * This method maps between attribute names
 * and the corresponding property name.
 */
export function getPropNameFromAttrName(attrName: string): string {
    if (isUndefined(AttrNameToPropNameMap[attrName])) {
        AttrNameToPropNameMap[attrName] = StringReplace.call(
            attrName,
            CAMEL_REGEX,
            (g: string): string => g[1].toUpperCase()
        );
    }
    return AttrNameToPropNameMap[attrName];
}

const CAPS_REGEX = /[A-Z]/g;

/**
 * This method maps between property names
 * and the corresponding attribute name.
 */
export function getAttrNameFromPropName(propName: string): string {
    if (isUndefined(PropNameToAttrNameMap[propName])) {
        PropNameToAttrNameMap[propName] = StringReplace.call(
            propName,
            CAPS_REGEX,
            (match: string): string => '-' + match.toLowerCase()
        );
    }
    return PropNameToAttrNameMap[propName];
}

let controlledElement: Element | null = null;
let controlledAttributeName: string | void;

export function isAttributeLocked(elm: Element, attrName: string): boolean {
    return elm !== controlledElement || attrName !== controlledAttributeName;
}

export function lockAttribute(_elm: Element, _key: string) {
    controlledElement = null;
    controlledAttributeName = undefined;
}

export function unlockAttribute(elm: Element, key: string) {
    controlledElement = elm;
    controlledAttributeName = key;
}
