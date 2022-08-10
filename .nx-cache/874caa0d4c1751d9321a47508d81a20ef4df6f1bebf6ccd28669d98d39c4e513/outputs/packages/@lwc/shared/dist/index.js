/**
 * Copyright (C) 2018 salesforce.com, inc.
 */
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function invariant(value, msg) {
    if (!value) {
        throw new Error(`Invariant Violation: ${msg}`);
    }
}
function isTrue$1(value, msg) {
    if (!value) {
        throw new Error(`Assert Violation: ${msg}`);
    }
}
function isFalse$1(value, msg) {
    if (value) {
        throw new Error(`Assert Violation: ${msg}`);
    }
}
function fail(msg) {
    throw new Error(msg);
}

var assert = /*#__PURE__*/Object.freeze({
    __proto__: null,
    invariant: invariant,
    isTrue: isTrue$1,
    isFalse: isFalse$1,
    fail: fail
});

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const { assign, create, defineProperties, defineProperty, freeze, getOwnPropertyDescriptor, getOwnPropertyNames, getPrototypeOf, hasOwnProperty, isFrozen, keys, seal, setPrototypeOf, } = Object;
const { isArray } = Array;
const { copyWithin: ArrayCopyWithin, fill: ArrayFill, filter: ArrayFilter, find: ArrayFind, indexOf: ArrayIndexOf, join: ArrayJoin, map: ArrayMap, pop: ArrayPop, push: ArrayPush, reduce: ArrayReduce, reverse: ArrayReverse, shift: ArrayShift, slice: ArraySlice, sort: ArraySort, splice: ArraySplice, unshift: ArrayUnshift, forEach, } = Array.prototype;
const { fromCharCode: StringFromCharCode } = String;
const { charCodeAt: StringCharCodeAt, replace: StringReplace, slice: StringSlice, toLowerCase: StringToLowerCase, } = String.prototype;
function isUndefined(obj) {
    return obj === undefined;
}
function isNull(obj) {
    return obj === null;
}
function isTrue(obj) {
    return obj === true;
}
function isFalse(obj) {
    return obj === false;
}
function isBoolean(obj) {
    return typeof obj === 'boolean';
}
function isFunction(obj) {
    return typeof obj === 'function';
}
function isObject(obj) {
    return typeof obj === 'object';
}
function isString(obj) {
    return typeof obj === 'string';
}
function isNumber(obj) {
    return typeof obj === 'number';
}
function noop() {
    /* Do nothing */
}
const OtS = {}.toString;
function toString(obj) {
    if (obj && obj.toString) {
        // Arrays might hold objects with "null" prototype So using
        // Array.prototype.toString directly will cause an error Iterate through
        // all the items and handle individually.
        if (isArray(obj)) {
            return ArrayJoin.call(ArrayMap.call(obj, toString), ',');
        }
        return obj.toString();
    }
    else if (typeof obj === 'object') {
        return OtS.call(obj);
    }
    else {
        return obj + '';
    }
}
function getPropertyDescriptor(o, p) {
    do {
        const d = getOwnPropertyDescriptor(o, p);
        if (!isUndefined(d)) {
            return d;
        }
        o = getPrototypeOf(o);
    } while (o !== null);
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
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
    'ariaActiveDescendant',
    'ariaAtomic',
    'ariaAutoComplete',
    'ariaBusy',
    'ariaChecked',
    'ariaColCount',
    'ariaColIndex',
    'ariaColSpan',
    'ariaControls',
    'ariaCurrent',
    'ariaDescribedBy',
    'ariaDetails',
    'ariaDisabled',
    'ariaErrorMessage',
    'ariaExpanded',
    'ariaFlowTo',
    'ariaHasPopup',
    'ariaHidden',
    'ariaInvalid',
    'ariaKeyShortcuts',
    'ariaLabel',
    'ariaLabelledBy',
    'ariaLevel',
    'ariaLive',
    'ariaModal',
    'ariaMultiLine',
    'ariaMultiSelectable',
    'ariaOrientation',
    'ariaOwns',
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
];
const { AriaAttrNameToPropNameMap, AriaPropNameToAttrNameMap } = /*@__PURE__*/ (() => {
    const AriaAttrNameToPropNameMap = create(null);
    const AriaPropNameToAttrNameMap = create(null);
    // Synthetic creation of all AOM property descriptors for Custom Elements
    forEach.call(AriaPropertyNames, (propName) => {
        const attrName = StringToLowerCase.call(StringReplace.call(propName, /^aria/, () => 'aria-'));
        AriaAttrNameToPropNameMap[attrName] = propName;
        AriaPropNameToAttrNameMap[propName] = attrName;
    });
    return { AriaAttrNameToPropNameMap, AriaPropNameToAttrNameMap };
})();
function isAriaAttribute(attrName) {
    return attrName in AriaAttrNameToPropNameMap;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// Inspired from: https://mathiasbynens.be/notes/globalthis
const _globalThis = /*@__PURE__*/ (function () {
    // On recent browsers, `globalThis` is already defined. In this case return it directly.
    if (typeof globalThis === 'object') {
        return globalThis;
    }
    let _globalThis;
    try {
        // eslint-disable-next-line no-extend-native
        Object.defineProperty(Object.prototype, '__magic__', {
            get: function () {
                return this;
            },
            configurable: true,
        });
        // __magic__ is undefined in Safari 10 and IE10 and older.
        // @ts-ignore
        // eslint-disable-next-line no-undef
        _globalThis = __magic__;
        // @ts-ignore
        delete Object.prototype.__magic__;
    }
    catch (ex) {
        // In IE8, Object.defineProperty only works on DOM objects.
    }
    finally {
        // If the magic above fails for some reason we assume that we are in a legacy browser.
        // Assume `window` exists in this case.
        if (typeof _globalThis === 'undefined') {
            // @ts-ignore
            _globalThis = window;
        }
    }
    return _globalThis;
})();

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const KEY__IS_NATIVE_SHADOW_ROOT_DEFINED = '$isNativeShadowRootDefined$';
const KEY__SHADOW_RESOLVER = '$shadowResolver$';
const KEY__SHADOW_RESOLVER_PRIVATE = '$$ShadowResolverKey$$';
const KEY__SHADOW_STATIC = '$shadowStaticNode$';
const KEY__SHADOW_STATIC_PRIVATE = '$shadowStaticNodeKey$';
const KEY__SHADOW_TOKEN = '$shadowToken$';
const KEY__SHADOW_TOKEN_PRIVATE = '$$ShadowTokenKey$$';
const KEY__SYNTHETIC_MODE = '$$lwc-synthetic-mode';
const KEY__SCOPED_CSS = '$scoped$';

/*
 * Copyright (c) 2022, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
const XML_NAMESPACE = 'http://www.w3.org/XML/1998/namespace';
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
const XLINK_NAMESPACE = 'http://www.w3.org/1999/xlink';

/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// Void elements are elements that self-close even without an explicit solidus (slash),
// e.g. `</tagName>` or `<tagName />`. For instance, `<meta>` closes on its own; no need for a slash.
// These only come from HTML; there are no void elements in the SVG or MathML namespaces.
// See: https://html.spec.whatwg.org/multipage/syntax.html#syntax-tags
const VOID_ELEMENTS_SET = new Set([
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'link',
    'meta',
    'source',
    'track',
    'wbr',
]);
function isVoidElement(name, namespace) {
    return namespace === HTML_NAMESPACE && VOID_ELEMENTS_SET.has(name.toLowerCase());
}

/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
/**
 * Maps boolean attribute name to supported tags: 'boolean attr name' => Set of allowed tag names
 * that supports them.
 */
const BOOLEAN_ATTRIBUTES = new Map([
    ['autofocus', new Set(['button', 'input', 'keygen', 'select', 'textarea'])],
    ['autoplay', new Set(['audio', 'video'])],
    ['checked', new Set(['command', 'input'])],
    [
        'disabled',
        new Set([
            'button',
            'command',
            'fieldset',
            'input',
            'keygen',
            'optgroup',
            'select',
            'textarea',
        ]),
    ],
    ['formnovalidate', new Set(['button'])],
    ['hidden', new Set()],
    ['loop', new Set(['audio', 'bgsound', 'marquee', 'video'])],
    ['multiple', new Set(['input', 'select'])],
    ['muted', new Set(['audio', 'video'])],
    ['novalidate', new Set(['form'])],
    ['open', new Set(['details'])],
    ['readonly', new Set(['input', 'textarea'])],
    ['required', new Set(['input', 'select', 'textarea'])],
    ['reversed', new Set(['ol'])],
    ['selected', new Set(['option'])],
]);
function isBooleanAttribute(attrName, tagName) {
    const allowedTagNames = BOOLEAN_ATTRIBUTES.get(attrName);
    return (allowedTagNames !== undefined &&
        (allowedTagNames.size === 0 || allowedTagNames.has(tagName)));
}
const GLOBAL_ATTRIBUTE = new Set([
    'role',
    'accesskey',
    'class',
    'contenteditable',
    'contextmenu',
    'dir',
    'draggable',
    'dropzone',
    'hidden',
    'id',
    'itemprop',
    'lang',
    'slot',
    'spellcheck',
    'style',
    'tabindex',
    'title',
]);
function isGlobalHtmlAttribute(attrName) {
    return GLOBAL_ATTRIBUTE.has(attrName);
}
/**
 * Map composed of properties to attributes not following the HTML property to attribute mapping
 * convention.
 */
const NO_STANDARD_PROPERTY_ATTRIBUTE_MAPPING = new Map([
    ['accessKey', 'accesskey'],
    ['readOnly', 'readonly'],
    ['tabIndex', 'tabindex'],
    ['bgColor', 'bgcolor'],
    ['colSpan', 'colspan'],
    ['rowSpan', 'rowspan'],
    ['contentEditable', 'contenteditable'],
    ['crossOrigin', 'crossorigin'],
    ['dateTime', 'datetime'],
    ['formAction', 'formaction'],
    ['isMap', 'ismap'],
    ['maxLength', 'maxlength'],
    ['minLength', 'minlength'],
    ['noValidate', 'novalidate'],
    ['useMap', 'usemap'],
    ['htmlFor', 'for'],
]);
/**
 * Map associating previously transformed HTML property into HTML attribute.
 */
const CACHED_PROPERTY_ATTRIBUTE_MAPPING = new Map();
function htmlPropertyToAttribute(propName) {
    const ariaAttributeName = AriaPropNameToAttrNameMap[propName];
    if (!isUndefined(ariaAttributeName)) {
        return ariaAttributeName;
    }
    const specialAttributeName = NO_STANDARD_PROPERTY_ATTRIBUTE_MAPPING.get(propName);
    if (!isUndefined(specialAttributeName)) {
        return specialAttributeName;
    }
    const cachedAttributeName = CACHED_PROPERTY_ATTRIBUTE_MAPPING.get(propName);
    if (!isUndefined(cachedAttributeName)) {
        return cachedAttributeName;
    }
    let attributeName = '';
    for (let i = 0, len = propName.length; i < len; i++) {
        const code = StringCharCodeAt.call(propName, i);
        if (code >= 65 && // "A"
            code <= 90 // "Z"
        ) {
            attributeName += '-' + StringFromCharCode(code + 32);
        }
        else {
            attributeName += StringFromCharCode(code);
        }
    }
    CACHED_PROPERTY_ATTRIBUTE_MAPPING.set(propName, attributeName);
    return attributeName;
}

/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const ESCAPED_CHARS = {
    '"': '&quot;',
    "'": '&#x27;',
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
};
function htmlEscape(str, attrMode = false) {
    const searchValue = attrMode ? /["&]/g : /["'<>&]/g;
    return str.replace(searchValue, (char) => ESCAPED_CHARS[char]);
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// We use this to detect symbol support in order to avoid the expensive symbol polyfill. Note that
// we can't use typeof since it will fail when transpiling.
const hasNativeSymbolSupport = /*@__PURE__*/ (() => Symbol('x').toString() === 'Symbol(x)')();

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// Increment whenever the LWC template compiler changes
const LWC_VERSION = "2.22.0";
const LWC_VERSION_COMMENT = `LWC compiler v${LWC_VERSION}`;
const LWC_VERSION_COMMENT_REGEX = /\/\*LWC compiler v([\d.]+)\*\/\s*}/;

export { AriaAttrNameToPropNameMap, AriaPropNameToAttrNameMap, ArrayCopyWithin, ArrayFill, ArrayFilter, ArrayFind, ArrayIndexOf, ArrayJoin, ArrayMap, ArrayPop, ArrayPush, ArrayReduce, ArrayReverse, ArrayShift, ArraySlice, ArraySort, ArraySplice, ArrayUnshift, HTML_NAMESPACE, KEY__IS_NATIVE_SHADOW_ROOT_DEFINED, KEY__SCOPED_CSS, KEY__SHADOW_RESOLVER, KEY__SHADOW_RESOLVER_PRIVATE, KEY__SHADOW_STATIC, KEY__SHADOW_STATIC_PRIVATE, KEY__SHADOW_TOKEN, KEY__SHADOW_TOKEN_PRIVATE, KEY__SYNTHETIC_MODE, LWC_VERSION, LWC_VERSION_COMMENT, LWC_VERSION_COMMENT_REGEX, MATHML_NAMESPACE, SVG_NAMESPACE, StringCharCodeAt, StringFromCharCode, StringReplace, StringSlice, StringToLowerCase, XLINK_NAMESPACE, XML_NAMESPACE, assert, assign, create, defineProperties, defineProperty, forEach, freeze, getOwnPropertyDescriptor, getOwnPropertyNames, getPropertyDescriptor, getPrototypeOf, _globalThis as globalThis, hasNativeSymbolSupport, hasOwnProperty, htmlEscape, htmlPropertyToAttribute, isAriaAttribute, isArray, isBoolean, isBooleanAttribute, isFalse, isFrozen, isFunction, isGlobalHtmlAttribute, isNull, isNumber, isObject, isString, isTrue, isUndefined, isVoidElement, keys, noop, seal, setPrototypeOf, toString };
/** version: 2.22.0 */
