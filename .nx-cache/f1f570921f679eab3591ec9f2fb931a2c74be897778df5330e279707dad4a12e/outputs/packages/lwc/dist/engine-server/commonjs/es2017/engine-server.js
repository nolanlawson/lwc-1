'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/* proxy-compat-disable */
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
const { assign, create, defineProperties, defineProperty, freeze, getOwnPropertyDescriptor: getOwnPropertyDescriptor$1, getOwnPropertyNames: getOwnPropertyNames$1, getPrototypeOf: getPrototypeOf$1, hasOwnProperty: hasOwnProperty$1, isFrozen, keys, seal, setPrototypeOf, } = Object;
const { isArray: isArray$1 } = Array;
const { copyWithin: ArrayCopyWithin, fill: ArrayFill, filter: ArrayFilter, find: ArrayFind, indexOf: ArrayIndexOf, join: ArrayJoin, map: ArrayMap, pop: ArrayPop, push: ArrayPush$1, reduce: ArrayReduce, reverse: ArrayReverse, shift: ArrayShift, slice: ArraySlice, sort: ArraySort, splice: ArraySplice, unshift: ArrayUnshift, forEach, } = Array.prototype;
const { fromCharCode: StringFromCharCode } = String;
const { charCodeAt: StringCharCodeAt, replace: StringReplace, slice: StringSlice, toLowerCase: StringToLowerCase, } = String.prototype;
function isUndefined$1(obj) {
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
function isFunction$1(obj) {
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
const OtS$1 = {}.toString;
function toString$1(obj) {
    if (obj && obj.toString) {
        // Arrays might hold objects with "null" prototype So using
        // Array.prototype.toString directly will cause an error Iterate through
        // all the items and handle individually.
        if (isArray$1(obj)) {
            return ArrayJoin.call(ArrayMap.call(obj, toString$1), ',');
        }
        return obj.toString();
    }
    else if (typeof obj === 'object') {
        return OtS$1.call(obj);
    }
    else {
        return obj + '';
    }
}
function getPropertyDescriptor(o, p) {
    do {
        const d = getOwnPropertyDescriptor$1(o, p);
        if (!isUndefined$1(d)) {
            return d;
        }
        o = getPrototypeOf$1(o);
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
const KEY__SHADOW_RESOLVER = '$shadowResolver$';
const KEY__SHADOW_STATIC = '$shadowStaticNode$';
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
    if (!isUndefined$1(ariaAttributeName)) {
        return ariaAttributeName;
    }
    const specialAttributeName = NO_STANDARD_PROPERTY_ATTRIBUTE_MAPPING.get(propName);
    if (!isUndefined$1(specialAttributeName)) {
        return specialAttributeName;
    }
    const cachedAttributeName = CACHED_PROPERTY_ATTRIBUTE_MAPPING.get(propName);
    if (!isUndefined$1(cachedAttributeName)) {
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
// Increment whenever the LWC template compiler changes
const LWC_VERSION = "2.22.0";
const LWC_VERSION_COMMENT_REGEX = /\/\*LWC compiler v([\d.]+)\*\/\s*}/;
/** version: 2.22.0 */

/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
/**
 * The following constructor might be used in either the constructor or the connectedCallback. In
 * order to ensure that the component evaluates, we attach those mock constructors to the global
 * object.
 * Also note that Event is defined in Node 16+, but CustomEvent is not, so they have to be
 * polyfilled separately.
 */
if (typeof Event !== 'function') {
    class Event {
    }
    defineProperty(_globalThis, 'Event', {
        value: Event,
        configurable: true,
        writable: true,
    });
}
if (typeof CustomEvent !== 'function') {
    class CustomEvent extends Event {
    }
    defineProperty(_globalThis, 'CustomEvent', {
        value: CustomEvent,
        configurable: true,
        writable: true,
    });
}

/**
 * Copyright (C) 2018 salesforce.com, inc.
 */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const features = {
    DUMMY_TEST_FLAG: null,
    ENABLE_ELEMENT_PATCH: null,
    ENABLE_FORCE_NATIVE_SHADOW_MODE_FOR_TEST: null,
    ENABLE_HMR: null,
    ENABLE_HTML_COLLECTIONS_PATCH: null,
    ENABLE_INNER_OUTER_TEXT_PATCH: null,
    ENABLE_MIXED_SHADOW_MODE: null,
    ENABLE_NODE_LIST_PATCH: null,
    ENABLE_NODE_PATCH: null,
    ENABLE_REACTIVE_SETTER: null,
    ENABLE_WIRE_SYNC_EMIT: null,
};
if (!_globalThis.lwcRuntimeFlags) {
    Object.defineProperty(_globalThis, 'lwcRuntimeFlags', { value: create(null) });
}
const runtimeFlags = _globalThis.lwcRuntimeFlags;
/**
 * Set the value at runtime of a given feature flag. This method only be invoked once per feature
 * flag. It is meant to be used during the app initialization.
 */
function setFeatureFlag(name, value) {
    if (!isBoolean(value)) {
        const message = `Failed to set the value "${value}" for the runtime feature flag "${name}". Runtime feature flags can only be set to a boolean value.`;
        if (process.env.NODE_ENV !== 'production') {
            throw new TypeError(message);
        }
        else {
            // eslint-disable-next-line no-console
            console.error(message);
            return;
        }
    }
    if (isUndefined$1(features[name])) {
        const availableFlags = keys(features)
            .map((name) => `"${name}"`)
            .join(', ');
        // eslint-disable-next-line no-console
        console.warn(`Failed to set the value "${value}" for the runtime feature flag "${name}" because it is undefined. Available flags: ${availableFlags}.`);
        return;
    }
    if (process.env.NODE_ENV !== 'production') {
        // Allow the same flag to be set more than once outside of production to enable testing
        runtimeFlags[name] = value;
    }
    else {
        // Disallow the same flag to be set more than once in production
        const runtimeValue = runtimeFlags[name];
        if (!isUndefined$1(runtimeValue)) {
            // eslint-disable-next-line no-console
            console.error(`Failed to set the value "${value}" for the runtime feature flag "${name}". "${name}" has already been set with the value "${runtimeValue}".`);
            return;
        }
        defineProperty(runtimeFlags, name, { value });
    }
}
/**
 * Set the value at runtime of a given feature flag. This method should only be used for testing
 * purposes. It is a no-op when invoked in production mode.
 */
function setFeatureFlagForTest(name, value) {
    if (process.env.NODE_ENV !== 'production') {
        setFeatureFlag(name, value);
    }
}
/** version: 2.22.0 */

/* proxy-compat-disable */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// @ts-ignore

if (process.env.NODE_ENV !== 'production' && typeof __karma__ !== 'undefined') {
  window.addEventListener('test-dummy-flag', () => {
    let hasFlag = false;

    if (runtimeFlags.DUMMY_TEST_FLAG) {
      hasFlag = true;
    }

    window.dispatchEvent(new CustomEvent('has-dummy-flag', {
      detail: {
        package: '@lwc/engine-core',
        hasFlag
      }
    }));
  });
}
const SPACE_CHAR = 32;
const EmptyObject = seal(create(null));
const EmptyArray = seal([]);
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
function flattenStylesheets(stylesheets) {
    const list = [];
    for (const stylesheet of stylesheets) {
        if (!Array.isArray(stylesheet)) {
            list.push(stylesheet);
        }
        else {
            list.push(...flattenStylesheets(stylesheet));
        }
    }
    return list;
}

/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const TargetToReactiveRecordMap = new WeakMap();
function valueMutated(target, key) {
    const reactiveRecord = TargetToReactiveRecordMap.get(target);
    if (!isUndefined$1(reactiveRecord)) {
        const reactiveObservers = reactiveRecord[key];
        if (!isUndefined$1(reactiveObservers)) {
            for (let i = 0, len = reactiveObservers.length; i < len; i += 1) {
                const ro = reactiveObservers[i];
                ro.notify();
            }
        }
    }
}
function valueObserved(target, key) {
    // We should determine if an active Observing Record is present to track mutations.
    {
        return;
    }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const DUMMY_REACTIVE_OBSERVER = {
    observe(job) {
        job();
    },
    reset() { },
    link() { },
};
function createReactiveObserver(callback) {
    // On the server side, we don't need mutation tracking. Skipping it improves performance.
    return DUMMY_REACTIVE_OBSERVER;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function getComponentTag(vm) {
    return `<${StringToLowerCase.call(vm.tagName)}>`;
}
// TODO [#1695]: Unify getComponentStack and getErrorComponentStack
function getComponentStack(vm) {
    const stack = [];
    let prefix = '';
    while (!isNull(vm.owner)) {
        ArrayPush$1.call(stack, prefix + getComponentTag(vm));
        vm = vm.owner;
        prefix += '\t';
    }
    return ArrayJoin.call(stack, '\n');
}
function getErrorComponentStack(vm) {
    const wcStack = [];
    let currentVm = vm;
    while (!isNull(currentVm)) {
        ArrayPush$1.call(wcStack, getComponentTag(currentVm));
        currentVm = currentVm.owner;
    }
    return wcStack.reverse().join('\n\t');
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function addErrorComponentStack(vm, error) {
    if (!isFrozen(error) && isUndefined$1(error.wcStack)) {
        const wcStack = getErrorComponentStack(vm);
        defineProperty(error, 'wcStack', {
            get() {
                return wcStack;
            },
        });
    }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function log(method, message, vm) {
    let msg = `[LWC ${method}]: ${message}`;
    if (!isUndefined$1(vm)) {
        msg = `${msg}\n${getComponentStack(vm)}`;
    }
    if (process.env.NODE_ENV === 'test') {
        /* eslint-disable-next-line no-console */
        console[method](msg);
        return;
    }
    try {
        throw new Error(msg);
    }
    catch (e) {
        /* eslint-disable-next-line no-console */
        console[method](e);
    }
}
function logError(message, vm) {
    log('error', message, vm);
}

/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function resolveCircularModuleDependency(fn) {
    const module = fn();
    return (module === null || module === void 0 ? void 0 : module.__esModule) ? module.default : module;
}
function isCircularModuleDependency(obj) {
    return isFunction$1(obj) && hasOwnProperty$1.call(obj, '__circular__');
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// This is a temporary workaround to get the @lwc/engine-server to evaluate in node without having
// to inject at runtime.
const HTMLElementConstructor = typeof HTMLElement !== 'undefined' ? HTMLElement : function () { };
const HTMLElementPrototype = HTMLElementConstructor.prototype;

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// These properties get added to LWCElement.prototype publicProps automatically
const defaultDefHTMLPropertyNames = [
    'accessKey',
    'dir',
    'draggable',
    'hidden',
    'id',
    'lang',
    'spellcheck',
    'tabIndex',
    'title',
];
function offsetPropertyErrorMessage(name) {
    return `Using the \`${name}\` property is an anti-pattern because it rounds the value to an integer. Instead, use the \`getBoundingClientRect\` method to obtain fractional values for the size of an element and its position relative to the viewport.`;
}
// Global HTML Attributes & Properties
// https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
const globalHTMLProperties = assign(create(null), {
    accessKey: {
        attribute: 'accesskey',
    },
    accessKeyLabel: {
        readOnly: true,
    },
    className: {
        attribute: 'class',
        error: 'Using the `className` property is an anti-pattern because of slow runtime behavior and potential conflicts with classes provided by the owner element. Use the `classList` API instead.',
    },
    contentEditable: {
        attribute: 'contenteditable',
    },
    dataset: {
        readOnly: true,
        error: "Using the `dataset` property is an anti-pattern because it can't be statically analyzed. Expose each property individually using the `@api` decorator instead.",
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
let controlledElement = null;
let controlledAttributeName;
function isAttributeLocked(elm, attrName) {
    return elm !== controlledElement || attrName !== controlledAttributeName;
}
function lockAttribute(_elm, _key) {
    controlledElement = null;
    controlledAttributeName = undefined;
}
function unlockAttribute(elm, key) {
    controlledElement = elm;
    controlledAttributeName = key;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
/**
 * This is a descriptor map that contains
 * all standard properties that a Custom Element can support (including AOM properties), which
 * determines what kind of capabilities the Base HTML Element and
 * Base Lightning Element should support.
 */
const HTMLElementOriginalDescriptors = create(null);
forEach.call(keys(AriaPropNameToAttrNameMap), (propName) => {
    // Note: intentionally using our in-house getPropertyDescriptor instead of getOwnPropertyDescriptor here because
    // in IE11, some properties are on Element.prototype instead of HTMLElement, just to be sure.
    const descriptor = getPropertyDescriptor(HTMLElementPrototype, propName);
    if (!isUndefined$1(descriptor)) {
        HTMLElementOriginalDescriptors[propName] = descriptor;
    }
});
forEach.call(defaultDefHTMLPropertyNames, (propName) => {
    // Note: intentionally using our in-house getPropertyDescriptor instead of getOwnPropertyDescriptor here because
    // in IE11, id property is on Element.prototype instead of HTMLElement, and we suspect that more will fall into
    // this category, so, better to be sure.
    const descriptor = getPropertyDescriptor(HTMLElementPrototype, propName);
    if (!isUndefined$1(descriptor)) {
        HTMLElementOriginalDescriptors[propName] = descriptor;
    }
});

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function generateDataDescriptor(options) {
    return assign({
        configurable: true,
        enumerable: true,
        writable: true,
    }, options);
}
function generateAccessorDescriptor(options) {
    return assign({
        configurable: true,
        enumerable: true,
    }, options);
}
let isDomMutationAllowed = false;
function unlockDomMutation() {
    if (process.env.NODE_ENV === 'production') {
        // this method should never leak to prod
        throw new ReferenceError();
    }
    isDomMutationAllowed = true;
}
function lockDomMutation() {
    if (process.env.NODE_ENV === 'production') {
        // this method should never leak to prod
        throw new ReferenceError();
    }
    isDomMutationAllowed = false;
}
function logMissingPortalError(name, type) {
    return logError(`The \`${name}\` ${type} is available only on elements that use the \`lwc:dom="manual"\` directive.`);
}
function patchElementWithRestrictions(elm, options) {
    if (process.env.NODE_ENV === 'production') {
        // this method should never leak to prod
        throw new ReferenceError();
    }
    const originalOuterHTMLDescriptor = getPropertyDescriptor(elm, 'outerHTML');
    const descriptors = {
        outerHTML: generateAccessorDescriptor({
            get() {
                return originalOuterHTMLDescriptor.get.call(this);
            },
            set(_value) {
                throw new TypeError(`Invalid attempt to set outerHTML on Element.`);
            },
        }),
    };
    // Apply extra restriction related to DOM manipulation if the element is not a portal.
    if (!options.isLight && !options.isPortal) {
        const { appendChild, insertBefore, removeChild, replaceChild } = elm;
        const originalNodeValueDescriptor = getPropertyDescriptor(elm, 'nodeValue');
        const originalInnerHTMLDescriptor = getPropertyDescriptor(elm, 'innerHTML');
        const originalTextContentDescriptor = getPropertyDescriptor(elm, 'textContent');
        assign(descriptors, {
            appendChild: generateDataDescriptor({
                value(aChild) {
                    logMissingPortalError('appendChild', 'method');
                    return appendChild.call(this, aChild);
                },
            }),
            insertBefore: generateDataDescriptor({
                value(newNode, referenceNode) {
                    if (!isDomMutationAllowed) {
                        logMissingPortalError('insertBefore', 'method');
                    }
                    return insertBefore.call(this, newNode, referenceNode);
                },
            }),
            removeChild: generateDataDescriptor({
                value(aChild) {
                    if (!isDomMutationAllowed) {
                        logMissingPortalError('removeChild', 'method');
                    }
                    return removeChild.call(this, aChild);
                },
            }),
            replaceChild: generateDataDescriptor({
                value(newChild, oldChild) {
                    logMissingPortalError('replaceChild', 'method');
                    return replaceChild.call(this, newChild, oldChild);
                },
            }),
            nodeValue: generateAccessorDescriptor({
                get() {
                    return originalNodeValueDescriptor.get.call(this);
                },
                set(value) {
                    if (!isDomMutationAllowed) {
                        logMissingPortalError('nodeValue', 'property');
                    }
                    originalNodeValueDescriptor.set.call(this, value);
                },
            }),
            textContent: generateAccessorDescriptor({
                get() {
                    return originalTextContentDescriptor.get.call(this);
                },
                set(value) {
                    logMissingPortalError('textContent', 'property');
                    originalTextContentDescriptor.set.call(this, value);
                },
            }),
            innerHTML: generateAccessorDescriptor({
                get() {
                    return originalInnerHTMLDescriptor.get.call(this);
                },
                set(value) {
                    logMissingPortalError('innerHTML', 'property');
                    return originalInnerHTMLDescriptor.set.call(this, value);
                },
            }),
        });
    }
    defineProperties(elm, descriptors);
}
function getShadowRootRestrictionsDescriptors(sr) {
    if (process.env.NODE_ENV === 'production') {
        // this method should never leak to prod
        throw new ReferenceError();
    }
    // Disallowing properties in dev mode only to avoid people doing the wrong
    // thing when using the real shadow root, because if that's the case,
    // the component will not work when running with synthetic shadow.
    const originalAddEventListener = sr.addEventListener;
    const originalInnerHTMLDescriptor = getPropertyDescriptor(sr, 'innerHTML');
    const originalTextContentDescriptor = getPropertyDescriptor(sr, 'textContent');
    return {
        innerHTML: generateAccessorDescriptor({
            get() {
                return originalInnerHTMLDescriptor.get.call(this);
            },
            set(_value) {
                throw new TypeError(`Invalid attempt to set innerHTML on ShadowRoot.`);
            },
        }),
        textContent: generateAccessorDescriptor({
            get() {
                return originalTextContentDescriptor.get.call(this);
            },
            set(_value) {
                throw new TypeError(`Invalid attempt to set textContent on ShadowRoot.`);
            },
        }),
        addEventListener: generateDataDescriptor({
            value(type, listener, options) {
                // TODO [#420]: this is triggered when the component author attempts to add a listener
                // programmatically into its Component's shadow root
                if (!isUndefined$1(options)) {
                    logError('The `addEventListener` method on ShadowRoot does not support any options.', getAssociatedVMIfPresent(this));
                }
                // Typescript does not like it when you treat the `arguments` object as an array
                // @ts-ignore type-mismatch
                return originalAddEventListener.apply(this, arguments);
            },
        }),
    };
}
// Custom Elements Restrictions:
// -----------------------------
function getCustomElementRestrictionsDescriptors(elm) {
    if (process.env.NODE_ENV === 'production') {
        // this method should never leak to prod
        throw new ReferenceError();
    }
    const originalAddEventListener = elm.addEventListener;
    const originalInnerHTMLDescriptor = getPropertyDescriptor(elm, 'innerHTML');
    const originalOuterHTMLDescriptor = getPropertyDescriptor(elm, 'outerHTML');
    const originalTextContentDescriptor = getPropertyDescriptor(elm, 'textContent');
    return {
        innerHTML: generateAccessorDescriptor({
            get() {
                return originalInnerHTMLDescriptor.get.call(this);
            },
            set(_value) {
                throw new TypeError(`Invalid attempt to set innerHTML on HTMLElement.`);
            },
        }),
        outerHTML: generateAccessorDescriptor({
            get() {
                return originalOuterHTMLDescriptor.get.call(this);
            },
            set(_value) {
                throw new TypeError(`Invalid attempt to set outerHTML on HTMLElement.`);
            },
        }),
        textContent: generateAccessorDescriptor({
            get() {
                return originalTextContentDescriptor.get.call(this);
            },
            set(_value) {
                throw new TypeError(`Invalid attempt to set textContent on HTMLElement.`);
            },
        }),
        addEventListener: generateDataDescriptor({
            value(type, listener, options) {
                // TODO [#420]: this is triggered when the component author attempts to add a listener
                // programmatically into a lighting element node
                if (!isUndefined$1(options)) {
                    logError('The `addEventListener` method in `LightningElement` does not support any options.', getAssociatedVMIfPresent(this));
                }
                // Typescript does not like it when you treat the `arguments` object as an array
                // @ts-ignore type-mismatch
                return originalAddEventListener.apply(this, arguments);
            },
        }),
    };
}
function getComponentRestrictionsDescriptors() {
    if (process.env.NODE_ENV === 'production') {
        // this method should never leak to prod
        throw new ReferenceError();
    }
    return {
        tagName: generateAccessorDescriptor({
            get() {
                throw new Error(`Usage of property \`tagName\` is disallowed because the component itself does` +
                    ` not know which tagName will be used to create the element, therefore writing` +
                    ` code that check for that value is error prone.`);
            },
            configurable: true,
            enumerable: false, // no enumerable properties on component
        }),
    };
}
function getLightningElementPrototypeRestrictionsDescriptors(proto) {
    if (process.env.NODE_ENV === 'production') {
        // this method should never leak to prod
        throw new ReferenceError();
    }
    const originalDispatchEvent = proto.dispatchEvent;
    const descriptors = {
        dispatchEvent: generateDataDescriptor({
            value(event) {
                const vm = getAssociatedVM(this);
                if (!isNull(event) && isObject(event)) {
                    const { type } = event;
                    if (!/^[a-z][a-z0-9_]*$/.test(type)) {
                        logError(`Invalid event type "${type}" dispatched in element ${getComponentTag(vm)}.` +
                            ` Event name must start with a lowercase letter and followed only lowercase` +
                            ` letters, numbers, and underscores`, vm);
                    }
                }
                // Typescript does not like it when you treat the `arguments` object as an array
                // @ts-ignore type-mismatch
                return originalDispatchEvent.apply(this, arguments);
            },
        }),
    };
    forEach.call(getOwnPropertyNames$1(globalHTMLProperties), (propName) => {
        if (propName in proto) {
            return; // no need to redefine something that we are already exposing
        }
        descriptors[propName] = generateAccessorDescriptor({
            get() {
                const { error, attribute } = globalHTMLProperties[propName];
                const msg = [];
                msg.push(`Accessing the global HTML property "${propName}" is disabled.`);
                if (error) {
                    msg.push(error);
                }
                else if (attribute) {
                    msg.push(`Instead access it via \`this.getAttribute("${attribute}")\`.`);
                }
                logError(msg.join('\n'), getAssociatedVM(this));
            },
            set() {
                const { readOnly } = globalHTMLProperties[propName];
                if (readOnly) {
                    logError(`The global HTML property \`${propName}\` is read-only.`, getAssociatedVM(this));
                }
            },
        });
    });
    return descriptors;
}
// This routine will prevent access to certain properties on a shadow root instance to guarantee
// that all components will work fine in IE11 and other browsers without shadow dom support.
function patchShadowRootWithRestrictions(sr) {
    defineProperties(sr, getShadowRootRestrictionsDescriptors(sr));
}
function patchCustomElementWithRestrictions(elm) {
    const restrictionsDescriptors = getCustomElementRestrictionsDescriptors(elm);
    const elmProto = getPrototypeOf$1(elm);
    setPrototypeOf(elm, create(elmProto, restrictionsDescriptors));
}
function patchComponentWithRestrictions(cmp) {
    defineProperties(cmp, getComponentRestrictionsDescriptors());
}
function patchLightningElementPrototypeWithRestrictions(proto) {
    defineProperties(proto, getLightningElementPrototypeRestrictionsDescriptors(proto));
}

function updateComponentValue(vm, key, newValue) {
    const { cmpFields } = vm;
    if (newValue !== cmpFields[key]) {
        cmpFields[key] = newValue;
    }
}

/**
 * Copyright (C) 2017 salesforce.com, inc.
 */
const { isArray } = Array;
const { prototype: ObjectDotPrototype, getPrototypeOf, create: ObjectCreate, defineProperty: ObjectDefineProperty, isExtensible, getOwnPropertyDescriptor, getOwnPropertyNames, getOwnPropertySymbols, preventExtensions, hasOwnProperty, } = Object;
const { push: ArrayPush, concat: ArrayConcat } = Array.prototype;
const OtS = {}.toString;
function toString(obj) {
    if (obj && obj.toString) {
        return obj.toString();
    }
    else if (typeof obj === 'object') {
        return OtS.call(obj);
    }
    else {
        return obj + '';
    }
}
function isUndefined(obj) {
    return obj === undefined;
}
function isFunction(obj) {
    return typeof obj === 'function';
}
const proxyToValueMap = new WeakMap();
function registerProxy(proxy, value) {
    proxyToValueMap.set(proxy, value);
}
const unwrap$1 = (replicaOrAny) => proxyToValueMap.get(replicaOrAny) || replicaOrAny;

class BaseProxyHandler {
    constructor(membrane, value) {
        this.originalTarget = value;
        this.membrane = membrane;
    }
    // Shared utility methods
    wrapDescriptor(descriptor) {
        if (hasOwnProperty.call(descriptor, 'value')) {
            descriptor.value = this.wrapValue(descriptor.value);
        }
        else {
            const { set: originalSet, get: originalGet } = descriptor;
            if (!isUndefined(originalGet)) {
                descriptor.get = this.wrapGetter(originalGet);
            }
            if (!isUndefined(originalSet)) {
                descriptor.set = this.wrapSetter(originalSet);
            }
        }
        return descriptor;
    }
    copyDescriptorIntoShadowTarget(shadowTarget, key) {
        const { originalTarget } = this;
        // Note: a property might get defined multiple times in the shadowTarget
        //       but it will always be compatible with the previous descriptor
        //       to preserve the object invariants, which makes these lines safe.
        const originalDescriptor = getOwnPropertyDescriptor(originalTarget, key);
        // TODO: it should be impossible for the originalDescriptor to ever be undefined, this `if` can be removed
        /* istanbul ignore else */
        if (!isUndefined(originalDescriptor)) {
            const wrappedDesc = this.wrapDescriptor(originalDescriptor);
            ObjectDefineProperty(shadowTarget, key, wrappedDesc);
        }
    }
    lockShadowTarget(shadowTarget) {
        const { originalTarget } = this;
        const targetKeys = ArrayConcat.call(getOwnPropertyNames(originalTarget), getOwnPropertySymbols(originalTarget));
        targetKeys.forEach((key) => {
            this.copyDescriptorIntoShadowTarget(shadowTarget, key);
        });
        const { membrane: { tagPropertyKey }, } = this;
        if (!isUndefined(tagPropertyKey) && !hasOwnProperty.call(shadowTarget, tagPropertyKey)) {
            ObjectDefineProperty(shadowTarget, tagPropertyKey, ObjectCreate(null));
        }
        preventExtensions(shadowTarget);
    }
    // Shared Traps
    // TODO: apply() is never called
    /* istanbul ignore next */
    apply(shadowTarget, thisArg, argArray) {
        /* No op */
    }
    // TODO: construct() is never called
    /* istanbul ignore next */
    construct(shadowTarget, argArray, newTarget) {
        /* No op */
    }
    get(shadowTarget, key) {
        const { originalTarget, membrane: { valueObserved }, } = this;
        const value = originalTarget[key];
        valueObserved(originalTarget, key);
        return this.wrapValue(value);
    }
    has(shadowTarget, key) {
        const { originalTarget, membrane: { tagPropertyKey, valueObserved }, } = this;
        valueObserved(originalTarget, key);
        // since key is never going to be undefined, and tagPropertyKey might be undefined
        // we can simply compare them as the second part of the condition.
        return key in originalTarget || key === tagPropertyKey;
    }
    ownKeys(shadowTarget) {
        const { originalTarget, membrane: { tagPropertyKey }, } = this;
        // if the membrane tag key exists and it is not in the original target, we add it to the keys.
        const keys = isUndefined(tagPropertyKey) || hasOwnProperty.call(originalTarget, tagPropertyKey)
            ? []
            : [tagPropertyKey];
        // small perf optimization using push instead of concat to avoid creating an extra array
        ArrayPush.apply(keys, getOwnPropertyNames(originalTarget));
        ArrayPush.apply(keys, getOwnPropertySymbols(originalTarget));
        return keys;
    }
    isExtensible(shadowTarget) {
        const { originalTarget } = this;
        // optimization to avoid attempting to lock down the shadowTarget multiple times
        if (!isExtensible(shadowTarget)) {
            return false; // was already locked down
        }
        if (!isExtensible(originalTarget)) {
            this.lockShadowTarget(shadowTarget);
            return false;
        }
        return true;
    }
    getPrototypeOf(shadowTarget) {
        const { originalTarget } = this;
        return getPrototypeOf(originalTarget);
    }
    getOwnPropertyDescriptor(shadowTarget, key) {
        const { originalTarget, membrane: { valueObserved, tagPropertyKey }, } = this;
        // keys looked up via getOwnPropertyDescriptor need to be reactive
        valueObserved(originalTarget, key);
        let desc = getOwnPropertyDescriptor(originalTarget, key);
        if (isUndefined(desc)) {
            if (key !== tagPropertyKey) {
                return undefined;
            }
            // if the key is the membrane tag key, and is not in the original target,
            // we produce a synthetic descriptor and install it on the shadow target
            desc = { value: undefined, writable: false, configurable: false, enumerable: false };
            ObjectDefineProperty(shadowTarget, tagPropertyKey, desc);
            return desc;
        }
        if (desc.configurable === false) {
            // updating the descriptor to non-configurable on the shadow
            this.copyDescriptorIntoShadowTarget(shadowTarget, key);
        }
        // Note: by accessing the descriptor, the key is marked as observed
        // but access to the value, setter or getter (if available) cannot observe
        // mutations, just like regular methods, in which case we just do nothing.
        return this.wrapDescriptor(desc);
    }
}

const getterMap$1 = new WeakMap();
const setterMap$1 = new WeakMap();
const reverseGetterMap = new WeakMap();
const reverseSetterMap = new WeakMap();
class ReactiveProxyHandler extends BaseProxyHandler {
    wrapValue(value) {
        return this.membrane.getProxy(value);
    }
    wrapGetter(originalGet) {
        const wrappedGetter = getterMap$1.get(originalGet);
        if (!isUndefined(wrappedGetter)) {
            return wrappedGetter;
        }
        const handler = this;
        const get = function () {
            // invoking the original getter with the original target
            return handler.wrapValue(originalGet.call(unwrap$1(this)));
        };
        getterMap$1.set(originalGet, get);
        reverseGetterMap.set(get, originalGet);
        return get;
    }
    wrapSetter(originalSet) {
        const wrappedSetter = setterMap$1.get(originalSet);
        if (!isUndefined(wrappedSetter)) {
            return wrappedSetter;
        }
        const set = function (v) {
            // invoking the original setter with the original target
            originalSet.call(unwrap$1(this), unwrap$1(v));
        };
        setterMap$1.set(originalSet, set);
        reverseSetterMap.set(set, originalSet);
        return set;
    }
    unwrapDescriptor(descriptor) {
        if (hasOwnProperty.call(descriptor, 'value')) {
            // dealing with a data descriptor
            descriptor.value = unwrap$1(descriptor.value);
        }
        else {
            const { set, get } = descriptor;
            if (!isUndefined(get)) {
                descriptor.get = this.unwrapGetter(get);
            }
            if (!isUndefined(set)) {
                descriptor.set = this.unwrapSetter(set);
            }
        }
        return descriptor;
    }
    unwrapGetter(redGet) {
        const reverseGetter = reverseGetterMap.get(redGet);
        if (!isUndefined(reverseGetter)) {
            return reverseGetter;
        }
        const handler = this;
        const get = function () {
            // invoking the red getter with the proxy of this
            return unwrap$1(redGet.call(handler.wrapValue(this)));
        };
        getterMap$1.set(get, redGet);
        reverseGetterMap.set(redGet, get);
        return get;
    }
    unwrapSetter(redSet) {
        const reverseSetter = reverseSetterMap.get(redSet);
        if (!isUndefined(reverseSetter)) {
            return reverseSetter;
        }
        const handler = this;
        const set = function (v) {
            // invoking the red setter with the proxy of this
            redSet.call(handler.wrapValue(this), handler.wrapValue(v));
        };
        setterMap$1.set(set, redSet);
        reverseSetterMap.set(redSet, set);
        return set;
    }
    set(shadowTarget, key, value) {
        const { originalTarget, membrane: { valueMutated }, } = this;
        const oldValue = originalTarget[key];
        if (oldValue !== value) {
            originalTarget[key] = value;
            valueMutated(originalTarget, key);
        }
        else if (key === 'length' && isArray(originalTarget)) {
            // fix for issue #236: push will add the new index, and by the time length
            // is updated, the internal length is already equal to the new length value
            // therefore, the oldValue is equal to the value. This is the forking logic
            // to support this use case.
            valueMutated(originalTarget, key);
        }
        return true;
    }
    deleteProperty(shadowTarget, key) {
        const { originalTarget, membrane: { valueMutated }, } = this;
        delete originalTarget[key];
        valueMutated(originalTarget, key);
        return true;
    }
    setPrototypeOf(shadowTarget, prototype) {
        /* istanbul ignore else */
        if (process.env.NODE_ENV !== 'production') {
            throw new Error(`Invalid setPrototypeOf invocation for reactive proxy ${toString(this.originalTarget)}. Prototype of reactive objects cannot be changed.`);
        }
    }
    preventExtensions(shadowTarget) {
        if (isExtensible(shadowTarget)) {
            const { originalTarget } = this;
            preventExtensions(originalTarget);
            // if the originalTarget is a proxy itself, it might reject
            // the preventExtension call, in which case we should not attempt to lock down
            // the shadow target.
            // TODO: It should not actually be possible to reach this `if` statement.
            // If a proxy rejects extensions, then calling preventExtensions will throw an error:
            // https://codepen.io/nolanlawson-the-selector/pen/QWMOjbY
            /* istanbul ignore if */
            if (isExtensible(originalTarget)) {
                return false;
            }
            this.lockShadowTarget(shadowTarget);
        }
        return true;
    }
    defineProperty(shadowTarget, key, descriptor) {
        const { originalTarget, membrane: { valueMutated, tagPropertyKey }, } = this;
        if (key === tagPropertyKey && !hasOwnProperty.call(originalTarget, key)) {
            // To avoid leaking the membrane tag property into the original target, we must
            // be sure that the original target doesn't have yet.
            // NOTE: we do not return false here because Object.freeze and equivalent operations
            // will attempt to set the descriptor to the same value, and expect no to throw. This
            // is an small compromise for the sake of not having to diff the descriptors.
            return true;
        }
        ObjectDefineProperty(originalTarget, key, this.unwrapDescriptor(descriptor));
        // intentionally testing if false since it could be undefined as well
        if (descriptor.configurable === false) {
            this.copyDescriptorIntoShadowTarget(shadowTarget, key);
        }
        valueMutated(originalTarget, key);
        return true;
    }
}

const getterMap = new WeakMap();
const setterMap = new WeakMap();
class ReadOnlyHandler extends BaseProxyHandler {
    wrapValue(value) {
        return this.membrane.getReadOnlyProxy(value);
    }
    wrapGetter(originalGet) {
        const wrappedGetter = getterMap.get(originalGet);
        if (!isUndefined(wrappedGetter)) {
            return wrappedGetter;
        }
        const handler = this;
        const get = function () {
            // invoking the original getter with the original target
            return handler.wrapValue(originalGet.call(unwrap$1(this)));
        };
        getterMap.set(originalGet, get);
        return get;
    }
    wrapSetter(originalSet) {
        const wrappedSetter = setterMap.get(originalSet);
        if (!isUndefined(wrappedSetter)) {
            return wrappedSetter;
        }
        const handler = this;
        const set = function (v) {
            /* istanbul ignore else */
            if (process.env.NODE_ENV !== 'production') {
                const { originalTarget } = handler;
                throw new Error(`Invalid mutation: Cannot invoke a setter on "${originalTarget}". "${originalTarget}" is read-only.`);
            }
        };
        setterMap.set(originalSet, set);
        return set;
    }
    set(shadowTarget, key, value) {
        /* istanbul ignore else */
        if (process.env.NODE_ENV !== 'production') {
            const { originalTarget } = this;
            const msg = isArray(originalTarget)
                ? `Invalid mutation: Cannot mutate array at index ${key.toString()}. Array is read-only.`
                : `Invalid mutation: Cannot set "${key.toString()}" on "${originalTarget}". "${originalTarget}" is read-only.`;
            throw new Error(msg);
        }
        /* istanbul ignore next */
        return false;
    }
    deleteProperty(shadowTarget, key) {
        /* istanbul ignore else */
        if (process.env.NODE_ENV !== 'production') {
            const { originalTarget } = this;
            throw new Error(`Invalid mutation: Cannot delete "${key.toString()}" on "${originalTarget}". "${originalTarget}" is read-only.`);
        }
        /* istanbul ignore next */
        return false;
    }
    setPrototypeOf(shadowTarget, prototype) {
        /* istanbul ignore else */
        if (process.env.NODE_ENV !== 'production') {
            const { originalTarget } = this;
            throw new Error(`Invalid prototype mutation: Cannot set prototype on "${originalTarget}". "${originalTarget}" prototype is read-only.`);
        }
    }
    preventExtensions(shadowTarget) {
        /* istanbul ignore else */
        if (process.env.NODE_ENV !== 'production') {
            const { originalTarget } = this;
            throw new Error(`Invalid mutation: Cannot preventExtensions on ${originalTarget}". "${originalTarget} is read-only.`);
        }
        /* istanbul ignore next */
        return false;
    }
    defineProperty(shadowTarget, key, descriptor) {
        /* istanbul ignore else */
        if (process.env.NODE_ENV !== 'production') {
            const { originalTarget } = this;
            throw new Error(`Invalid mutation: Cannot defineProperty "${key.toString()}" on "${originalTarget}". "${originalTarget}" is read-only.`);
        }
        /* istanbul ignore next */
        return false;
    }
}

function extract(objectOrArray) {
    if (isArray(objectOrArray)) {
        return objectOrArray.map((item) => {
            const original = unwrap$1(item);
            if (original !== item) {
                return extract(original);
            }
            return item;
        });
    }
    const obj = ObjectCreate(getPrototypeOf(objectOrArray));
    const names = getOwnPropertyNames(objectOrArray);
    return ArrayConcat.call(names, getOwnPropertySymbols(objectOrArray)).reduce((seed, key) => {
        const item = objectOrArray[key];
        const original = unwrap$1(item);
        if (original !== item) {
            seed[key] = extract(original);
        }
        else {
            seed[key] = item;
        }
        return seed;
    }, obj);
}
const formatter = {
    header: (plainOrProxy) => {
        const originalTarget = unwrap$1(plainOrProxy);
        // if originalTarget is falsy or not unwrappable, exit
        if (!originalTarget || originalTarget === plainOrProxy) {
            return null;
        }
        const obj = extract(plainOrProxy);
        return ['object', { object: obj }];
    },
    hasBody: () => {
        return false;
    },
    body: () => {
        return null;
    },
};
// Inspired from paulmillr/es6-shim
// https://github.com/paulmillr/es6-shim/blob/master/es6-shim.js#L176-L185
/* istanbul ignore next */
function getGlobal() {
    // the only reliable means to get the global object is `Function('return this')()`
    // However, this causes CSP violations in Chrome apps.
    if (typeof globalThis !== 'undefined') {
        return globalThis;
    }
    if (typeof self !== 'undefined') {
        return self;
    }
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    // Gracefully degrade if not able to locate the global object
    return {};
}
function init() {
    /* istanbul ignore if */
    if (process.env.NODE_ENV === 'production') {
        // this method should never leak to prod
        throw new ReferenceError();
    }
    const global = getGlobal();
    // Custom Formatter for Dev Tools. To enable this, open Chrome Dev Tools
    //  - Go to Settings,
    //  - Under console, select "Enable custom formatters"
    // For more information, https://docs.google.com/document/d/1FTascZXT9cxfetuPRT2eXPQKXui4nWFivUnS_335T3U/preview
    const devtoolsFormatters = global.devtoolsFormatters || [];
    ArrayPush.call(devtoolsFormatters, formatter);
    global.devtoolsFormatters = devtoolsFormatters;
}

/* istanbul ignore else */
if (process.env.NODE_ENV !== 'production') {
    init();
}
function defaultValueIsObservable(value) {
    // intentionally checking for null
    if (value === null) {
        return false;
    }
    // treat all non-object types, including undefined, as non-observable values
    if (typeof value !== 'object') {
        return false;
    }
    if (isArray(value)) {
        return true;
    }
    const proto = getPrototypeOf(value);
    return proto === ObjectDotPrototype || proto === null || getPrototypeOf(proto) === null;
}
const defaultValueObserved = (obj, key) => {
    /* do nothing */
};
const defaultValueMutated = (obj, key) => {
    /* do nothing */
};
function createShadowTarget(value) {
    return isArray(value) ? [] : {};
}
class ObservableMembrane {
    constructor(options = {}) {
        this.readOnlyObjectGraph = new WeakMap();
        this.reactiveObjectGraph = new WeakMap();
        const { valueMutated, valueObserved, valueIsObservable, tagPropertyKey } = options;
        this.valueMutated = isFunction(valueMutated) ? valueMutated : defaultValueMutated;
        this.valueObserved = isFunction(valueObserved) ? valueObserved : defaultValueObserved;
        this.valueIsObservable = isFunction(valueIsObservable)
            ? valueIsObservable
            : defaultValueIsObservable;
        this.tagPropertyKey = tagPropertyKey;
    }
    getProxy(value) {
        const unwrappedValue = unwrap$1(value);
        if (this.valueIsObservable(unwrappedValue)) {
            // When trying to extract the writable version of a readonly we return the readonly.
            if (this.readOnlyObjectGraph.get(unwrappedValue) === value) {
                return value;
            }
            return this.getReactiveHandler(unwrappedValue);
        }
        return unwrappedValue;
    }
    getReadOnlyProxy(value) {
        value = unwrap$1(value);
        if (this.valueIsObservable(value)) {
            return this.getReadOnlyHandler(value);
        }
        return value;
    }
    unwrapProxy(p) {
        return unwrap$1(p);
    }
    getReactiveHandler(value) {
        let proxy = this.reactiveObjectGraph.get(value);
        if (isUndefined(proxy)) {
            // caching the proxy after the first time it is accessed
            const handler = new ReactiveProxyHandler(this, value);
            proxy = new Proxy(createShadowTarget(value), handler);
            registerProxy(proxy, value);
            this.reactiveObjectGraph.set(value, proxy);
        }
        return proxy;
    }
    getReadOnlyHandler(value) {
        let proxy = this.readOnlyObjectGraph.get(value);
        if (isUndefined(proxy)) {
            // caching the proxy after the first time it is accessed
            const handler = new ReadOnlyHandler(this, value);
            proxy = new Proxy(createShadowTarget(value), handler);
            registerProxy(proxy, value);
            this.readOnlyObjectGraph.set(value, proxy);
        }
        return proxy;
    }
}
/** version: 2.0.0 */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const lockerLivePropertyKey = Symbol.for('@@lockerLiveValue');
const reactiveMembrane = new ObservableMembrane({
    valueObserved,
    valueMutated,
    tagPropertyKey: lockerLivePropertyKey,
});
/**
 * EXPERIMENTAL: This function implements an unwrap mechanism that
 * works for observable membrane objects. This API is subject to
 * change or being removed.
 */
function unwrap(value) {
    // On the server side, we don't need mutation tracking. Skipping it improves performance.
    return value;
}
function getReadOnlyProxy(value) {
    // We must return a frozen wrapper around the value, so that child components cannot mutate properties passed to
    // them from their parents. This applies to both the client and server.
    return reactiveMembrane.getReadOnlyProxy(value);
}
function getReactiveProxy(value) {
    // On the server side, we don't need mutation tracking. Skipping it improves performance.
    return value;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
/**
 * This operation is called with a descriptor of an standard html property
 * that a Custom Element can support (including AOM properties), which
 * determines what kind of capabilities the Base Lightning Element should support. When producing the new descriptors
 * for the Base Lightning Element, it also include the reactivity bit, so the standard property is reactive.
 */
function createBridgeToElementDescriptor(propName, descriptor) {
    const { get, set, enumerable, configurable } = descriptor;
    if (!isFunction$1(get)) {
        if (process.env.NODE_ENV !== 'production') {
            assert.fail(`Detected invalid public property descriptor for HTMLElement.prototype.${propName} definition. Missing the standard getter.`);
        }
        throw new TypeError();
    }
    if (!isFunction$1(set)) {
        if (process.env.NODE_ENV !== 'production') {
            assert.fail(`Detected invalid public property descriptor for HTMLElement.prototype.${propName} definition. Missing the standard setter.`);
        }
        throw new TypeError();
    }
    return {
        enumerable,
        configurable,
        get() {
            const vm = getAssociatedVM(this);
            if (isBeingConstructed(vm)) {
                if (process.env.NODE_ENV !== 'production') {
                    logError(`The value of property \`${propName}\` can't be read from the constructor because the owner component hasn't set the value yet. Instead, use the constructor to set a default value for the property.`, vm);
                }
                return;
            }
            return get.call(vm.elm);
        },
        set(newValue) {
            const vm = getAssociatedVM(this);
            if (process.env.NODE_ENV !== 'production') {
                const vmBeingRendered = getVMBeingRendered();
                assert.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm}.${propName}`);
                assert.invariant(!isUpdatingTemplate, `When updating the template of ${vmBeingRendered}, one of the accessors used by the template has side effects on the state of ${vm}.${propName}`);
                assert.isFalse(isBeingConstructed(vm), `Failed to construct '${getComponentTag(vm)}': The result must not have attributes.`);
                assert.invariant(!isObject(newValue) || isNull(newValue), `Invalid value "${newValue}" for "${propName}" of ${vm}. Value cannot be an object, must be a primitive value.`);
            }
            updateComponentValue(vm, propName, newValue);
            return set.call(vm.elm, newValue);
        },
    };
}
/**
 * This class is the base class for any LWC element.
 * Some elements directly extends this class, others implement it via inheritance.
 **/
// @ts-ignore
const LightningElement = function () {
    // This should be as performant as possible, while any initialization should be done lazily
    if (isNull(vmBeingConstructed)) {
        throw new ReferenceError('Illegal constructor');
    }
    const vm = vmBeingConstructed;
    const { def, elm } = vm;
    const { bridge } = def;
    if (process.env.NODE_ENV !== 'production') {
        const { assertInstanceOfHTMLElement } = vm.renderer;
        assertInstanceOfHTMLElement(vm.elm, `Component creation requires a DOM element to be associated to ${vm}.`);
    }
    const component = this;
    setPrototypeOf(elm, bridge.prototype);
    vm.component = this;
    // Locker hooks assignment. When the LWC engine run with Locker, Locker intercepts all the new
    // component creation and passes hooks to instrument all the component interactions with the
    // engine. We are intentionally hiding this argument from the formal API of LightningElement
    // because we don't want folks to know about it just yet.
    if (arguments.length === 1) {
        const { callHook, setHook, getHook } = arguments[0];
        vm.callHook = callHook;
        vm.setHook = setHook;
        vm.getHook = getHook;
    }
    // Linking elm, shadow root and component with the VM.
    associateVM(component, vm);
    associateVM(elm, vm);
    if (vm.renderMode === 1 /* RenderMode.Shadow */) {
        vm.renderRoot = doAttachShadow(vm);
    }
    else {
        vm.renderRoot = elm;
    }
    // Adding extra guard rails in DEV mode.
    if (process.env.NODE_ENV !== 'production') {
        patchCustomElementWithRestrictions(elm);
        patchComponentWithRestrictions(component);
    }
    return this;
};
function doAttachShadow(vm) {
    const { elm, mode, shadowMode, def: { ctor }, renderer: { attachShadow }, } = vm;
    const shadowRoot = attachShadow(elm, {
        [KEY__SYNTHETIC_MODE]: shadowMode === 1 /* ShadowMode.Synthetic */,
        delegatesFocus: Boolean(ctor.delegatesFocus),
        mode,
    });
    vm.shadowRoot = shadowRoot;
    associateVM(shadowRoot, vm);
    if (process.env.NODE_ENV !== 'production') {
        patchShadowRootWithRestrictions(shadowRoot);
    }
    return shadowRoot;
}
function warnIfInvokedDuringConstruction(vm, methodOrPropName) {
    if (isBeingConstructed(vm)) {
        logError(`this.${methodOrPropName} should not be called during the construction of the custom element for ${getComponentTag(vm)} because the element is not yet in the DOM or has no children yet.`);
    }
}
// @ts-ignore
LightningElement.prototype = {
    constructor: LightningElement,
    dispatchEvent(event) {
        const vm = getAssociatedVM(this);
        const { elm, renderer: { dispatchEvent }, } = vm;
        return dispatchEvent(elm, event);
    },
    addEventListener(type, listener, options) {
        const vm = getAssociatedVM(this);
        const { elm, renderer: { addEventListener }, } = vm;
        if (process.env.NODE_ENV !== 'production') {
            const vmBeingRendered = getVMBeingRendered();
            assert.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm} by adding an event listener for "${type}".`);
            assert.invariant(!isUpdatingTemplate, `Updating the template of ${vmBeingRendered} has side effects on the state of ${vm} by adding an event listener for "${type}".`);
            assert.invariant(isFunction$1(listener), `Invalid second argument for this.addEventListener() in ${vm} for event "${type}". Expected an EventListener but received ${listener}.`);
        }
        const wrappedListener = getWrappedComponentsListener(vm, listener);
        addEventListener(elm, type, wrappedListener, options);
    },
    removeEventListener(type, listener, options) {
        const vm = getAssociatedVM(this);
        const { elm, renderer: { removeEventListener }, } = vm;
        const wrappedListener = getWrappedComponentsListener(vm, listener);
        removeEventListener(elm, type, wrappedListener, options);
    },
    hasAttribute(name) {
        const vm = getAssociatedVM(this);
        const { elm, renderer: { getAttribute }, } = vm;
        return !isNull(getAttribute(elm, name));
    },
    hasAttributeNS(namespace, name) {
        const vm = getAssociatedVM(this);
        const { elm, renderer: { getAttribute }, } = vm;
        return !isNull(getAttribute(elm, name, namespace));
    },
    removeAttribute(name) {
        const vm = getAssociatedVM(this);
        const { elm, renderer: { removeAttribute }, } = vm;
        unlockAttribute(elm, name);
        removeAttribute(elm, name);
        lockAttribute();
    },
    removeAttributeNS(namespace, name) {
        const { elm, renderer: { removeAttribute }, } = getAssociatedVM(this);
        unlockAttribute(elm, name);
        removeAttribute(elm, name, namespace);
        lockAttribute();
    },
    getAttribute(name) {
        const vm = getAssociatedVM(this);
        const { elm } = vm;
        const { getAttribute } = vm.renderer;
        return getAttribute(elm, name);
    },
    getAttributeNS(namespace, name) {
        const vm = getAssociatedVM(this);
        const { elm } = vm;
        const { getAttribute } = vm.renderer;
        return getAttribute(elm, name, namespace);
    },
    setAttribute(name, value) {
        const vm = getAssociatedVM(this);
        const { elm, renderer: { setAttribute }, } = vm;
        if (process.env.NODE_ENV !== 'production') {
            assert.isFalse(isBeingConstructed(vm), `Failed to construct '${getComponentTag(vm)}': The result must not have attributes.`);
        }
        unlockAttribute(elm, name);
        setAttribute(elm, name, value);
        lockAttribute();
    },
    setAttributeNS(namespace, name, value) {
        const vm = getAssociatedVM(this);
        const { elm, renderer: { setAttribute }, } = vm;
        if (process.env.NODE_ENV !== 'production') {
            assert.isFalse(isBeingConstructed(vm), `Failed to construct '${getComponentTag(vm)}': The result must not have attributes.`);
        }
        unlockAttribute(elm, name);
        setAttribute(elm, name, value, namespace);
        lockAttribute();
    },
    getBoundingClientRect() {
        const vm = getAssociatedVM(this);
        const { elm, renderer: { getBoundingClientRect }, } = vm;
        if (process.env.NODE_ENV !== 'production') {
            warnIfInvokedDuringConstruction(vm, 'getBoundingClientRect()');
        }
        return getBoundingClientRect(elm);
    },
    get isConnected() {
        const vm = getAssociatedVM(this);
        const { elm, renderer: { isConnected }, } = vm;
        return isConnected(elm);
    },
    get classList() {
        const vm = getAssociatedVM(this);
        const { elm, renderer: { getClassList }, } = vm;
        if (process.env.NODE_ENV !== 'production') {
            // TODO [#1290]: this still fails in dev but works in production, eventually, we should
            // just throw in all modes
            assert.isFalse(isBeingConstructed(vm), `Failed to construct ${vm}: The result must not have attributes. Adding or tampering with classname in constructor is not allowed in a web component, use connectedCallback() instead.`);
        }
        return getClassList(elm);
    },
    get template() {
        const vm = getAssociatedVM(this);
        if (process.env.NODE_ENV !== 'production') {
            if (vm.renderMode === 0 /* RenderMode.Light */) {
                logError('`this.template` returns null for light DOM components. Since there is no shadow, the rendered content can be accessed via `this` itself. e.g. instead of `this.template.querySelector`, use `this.querySelector`.');
            }
        }
        return vm.shadowRoot;
    },
    get shadowRoot() {
        // From within the component instance, the shadowRoot is always reported as "closed".
        // Authors should rely on this.template instead.
        return null;
    },
    get children() {
        const vm = getAssociatedVM(this);
        const renderer = vm.renderer;
        if (process.env.NODE_ENV !== 'production') {
            warnIfInvokedDuringConstruction(vm, 'children');
        }
        return renderer.getChildren(vm.elm);
    },
    get childNodes() {
        const vm = getAssociatedVM(this);
        const renderer = vm.renderer;
        if (process.env.NODE_ENV !== 'production') {
            warnIfInvokedDuringConstruction(vm, 'childNodes');
        }
        return renderer.getChildNodes(vm.elm);
    },
    get firstChild() {
        const vm = getAssociatedVM(this);
        const renderer = vm.renderer;
        if (process.env.NODE_ENV !== 'production') {
            warnIfInvokedDuringConstruction(vm, 'firstChild');
        }
        return renderer.getFirstChild(vm.elm);
    },
    get firstElementChild() {
        const vm = getAssociatedVM(this);
        const renderer = vm.renderer;
        if (process.env.NODE_ENV !== 'production') {
            warnIfInvokedDuringConstruction(vm, 'firstElementChild');
        }
        return renderer.getFirstElementChild(vm.elm);
    },
    get lastChild() {
        const vm = getAssociatedVM(this);
        const renderer = vm.renderer;
        if (process.env.NODE_ENV !== 'production') {
            warnIfInvokedDuringConstruction(vm, 'lastChild');
        }
        return renderer.getLastChild(vm.elm);
    },
    get lastElementChild() {
        const vm = getAssociatedVM(this);
        const renderer = vm.renderer;
        if (process.env.NODE_ENV !== 'production') {
            warnIfInvokedDuringConstruction(vm, 'lastElementChild');
        }
        return renderer.getLastElementChild(vm.elm);
    },
    render() {
        const vm = getAssociatedVM(this);
        return vm.def.template;
    },
    toString() {
        const vm = getAssociatedVM(this);
        return `[object ${vm.def.name}]`;
    },
};
const queryAndChildGetterDescriptors = create(null);
const queryMethods = [
    'getElementsByClassName',
    'getElementsByTagName',
    'querySelector',
    'querySelectorAll',
];
// Generic passthrough for query APIs on HTMLElement to the relevant Renderer APIs
for (const queryMethod of queryMethods) {
    queryAndChildGetterDescriptors[queryMethod] = {
        value(arg) {
            const vm = getAssociatedVM(this);
            const { elm, renderer } = vm;
            if (process.env.NODE_ENV !== 'production') {
                warnIfInvokedDuringConstruction(vm, `${queryMethod}()`);
            }
            return renderer[queryMethod](elm, arg);
        },
        configurable: true,
        enumerable: true,
        writable: true,
    };
}
defineProperties(LightningElement.prototype, queryAndChildGetterDescriptors);
const lightningBasedDescriptors = create(null);
for (const propName in HTMLElementOriginalDescriptors) {
    lightningBasedDescriptors[propName] = createBridgeToElementDescriptor(propName, HTMLElementOriginalDescriptors[propName]);
}
defineProperties(LightningElement.prototype, lightningBasedDescriptors);
defineProperty(LightningElement, 'CustomElementConstructor', {
    get() {
        // If required, a runtime-specific implementation must be defined.
        throw new ReferenceError('The current runtime does not support CustomElementConstructor.');
    },
    configurable: true,
});
if (process.env.NODE_ENV !== 'production') {
    patchLightningElementPrototypeWithRestrictions(LightningElement.prototype);
}

function createObservedFieldPropertyDescriptor(key) {
    return {
        get() {
            const vm = getAssociatedVM(this);
            return vm.cmpFields[key];
        },
        set(newValue) {
            const vm = getAssociatedVM(this);
            updateComponentValue(vm, key, newValue);
        },
        enumerable: true,
        configurable: true,
    };
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const DUMMY_ACCESSOR_REACTIVE_OBSERVER = {
    observe(job) {
        job();
    },
    reset() { },
    link() { },
};
function createAccessorReactiveObserver(vm, set) {
    // On the server side, we don't need mutation tracking. Skipping it improves performance.
    return DUMMY_ACCESSOR_REACTIVE_OBSERVER;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function api$1() {
  if (process.env.NODE_ENV !== 'production') {
    assert.fail(`@api decorator can only be used as a decorator function.`);
  }

  throw new Error();
}
function createPublicPropertyDescriptor(key) {
  return {
    get() {
      const vm = getAssociatedVM(this);

      if (isBeingConstructed(vm)) {
        if (process.env.NODE_ENV !== 'production') {
          logError(`Can’t read the value of property \`${toString$1(key)}\` from the constructor because the owner component hasn’t set the value yet. Instead, use the constructor to set a default value for the property.`, vm);
        }

        return;
      }
      return vm.cmpProps[key];
    },

    set(newValue) {
      const vm = getAssociatedVM(this);

      if (process.env.NODE_ENV !== 'production') {
        const vmBeingRendered = getVMBeingRendered();
        assert.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm}.${toString$1(key)}`);
        assert.invariant(!isUpdatingTemplate, `Updating the template of ${vmBeingRendered} has side effects on the state of ${vm}.${toString$1(key)}`);
      }

      vm.cmpProps[key] = newValue;
    },

    enumerable: true,
    configurable: true
  };
}
function createPublicAccessorDescriptor(key, descriptor) {
  const {
    get,
    set,
    enumerable,
    configurable
  } = descriptor;

  if (!isFunction$1(get)) {
    if (process.env.NODE_ENV !== 'production') {
      assert.invariant(isFunction$1(get), `Invalid compiler output for public accessor ${toString$1(key)} decorated with @api`);
    }

    throw new Error();
  }

  return {
    get() {
      if (process.env.NODE_ENV !== 'production') {
        // Assert that the this value is an actual Component with an associated VM.
        getAssociatedVM(this);
      }

      return get.call(this);
    },

    set(newValue) {
      const vm = getAssociatedVM(this);

      if (process.env.NODE_ENV !== 'production') {
        const vmBeingRendered = getVMBeingRendered();
        assert.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm}.${toString$1(key)}`);
        assert.invariant(!isUpdatingTemplate, `Updating the template of ${vmBeingRendered} has side effects on the state of ${vm}.${toString$1(key)}`);
      }

      if (set) {
        if (runtimeFlags.ENABLE_REACTIVE_SETTER) {
          let ro = vm.oar[key];

          if (isUndefined$1(ro)) {
            ro = vm.oar[key] = createAccessorReactiveObserver();
          } // every time we invoke this setter from outside (through this wrapper setter)
          // we should reset the value and then debounce just in case there is a pending
          // invocation the next tick that is not longer relevant since the value is changing
          // from outside.


          ro.reset(newValue);
          ro.observe(() => {
            set.call(this, newValue);
          });
        } else {
          set.call(this, newValue);
        }
      } else if (process.env.NODE_ENV !== 'production') {
        assert.fail(`Invalid attempt to set a new value for property ${toString$1(key)} of ${vm} that does not has a setter decorated with @api.`);
      }
    },

    enumerable,
    configurable
  };
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function track(target) {
    if (arguments.length === 1) {
        return getReactiveProxy(target);
    }
    if (process.env.NODE_ENV !== 'production') {
        assert.fail(`@track decorator can only be used with one argument to return a trackable object, or as a decorator function.`);
    }
    throw new Error();
}
function internalTrackDecorator(key) {
    return {
        get() {
            const vm = getAssociatedVM(this);
            return vm.cmpFields[key];
        },
        set(newValue) {
            const vm = getAssociatedVM(this);
            if (process.env.NODE_ENV !== 'production') {
                const vmBeingRendered = getVMBeingRendered();
                assert.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm}.${toString$1(key)}`);
                assert.invariant(!isUpdatingTemplate, `Updating the template of ${vmBeingRendered} has side effects on the state of ${vm}.${toString$1(key)}`);
            }
            const reactiveOrAnyValue = getReactiveProxy(newValue);
            updateComponentValue(vm, key, reactiveOrAnyValue);
        },
        enumerable: true,
        configurable: true,
    };
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
/**
 * @wire decorator to wire fields and methods to a wire adapter in
 * LWC Components. This function implements the internals of this
 * decorator.
 */
function wire(_adapter, _config) {
    if (process.env.NODE_ENV !== 'production') {
        assert.fail('@wire(adapter, config?) may only be used as a decorator.');
    }
    throw new Error();
}
function internalWireFieldDecorator(key) {
    return {
        get() {
            const vm = getAssociatedVM(this);
            return vm.cmpFields[key];
        },
        set(value) {
            const vm = getAssociatedVM(this);
            /**
             * Reactivity for wired fields is provided in wiring.
             * We intentionally add reactivity here since this is just
             * letting the author to do the wrong thing, but it will keep our
             * system to be backward compatible.
             */
            updateComponentValue(vm, key, value);
        },
        enumerable: true,
        configurable: true,
    };
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function getClassDescriptorType(descriptor) {
    if (isFunction$1(descriptor.value)) {
        return "method" /* DescriptorType.Method */;
    }
    else if (isFunction$1(descriptor.set) || isFunction$1(descriptor.get)) {
        return "accessor" /* DescriptorType.Accessor */;
    }
    else {
        return "field" /* DescriptorType.Field */;
    }
}
function validateObservedField(Ctor, fieldName, descriptor) {
    if (!isUndefined$1(descriptor)) {
        const type = getClassDescriptorType(descriptor);
        const message = `Invalid observed ${fieldName} field. Found a duplicate ${type} with the same name.`;
        // [W-9927596] Ideally we always throw an error when detecting duplicate observed field.
        // This branch is only here for backward compatibility reasons.
        if (type === "accessor" /* DescriptorType.Accessor */) {
            logError(message);
        }
        else {
            assert.fail(message);
        }
    }
}
function validateFieldDecoratedWithTrack(Ctor, fieldName, descriptor) {
    if (!isUndefined$1(descriptor)) {
        const type = getClassDescriptorType(descriptor);
        assert.fail(`Invalid @track ${fieldName} field. Found a duplicate ${type} with the same name.`);
    }
}
function validateFieldDecoratedWithWire(Ctor, fieldName, descriptor) {
    if (!isUndefined$1(descriptor)) {
        const type = getClassDescriptorType(descriptor);
        assert.fail(`Invalid @wire ${fieldName} field. Found a duplicate ${type} with the same name.`);
    }
}
function validateMethodDecoratedWithWire(Ctor, methodName, descriptor) {
    if (isUndefined$1(descriptor) || !isFunction$1(descriptor.value) || isFalse(descriptor.writable)) {
        assert.fail(`Invalid @wire ${methodName} method.`);
    }
}
function validateFieldDecoratedWithApi(Ctor, fieldName, descriptor) {
    if (!isUndefined$1(descriptor)) {
        const type = getClassDescriptorType(descriptor);
        const message = `Invalid @api ${fieldName} field. Found a duplicate ${type} with the same name.`;
        // [W-9927596] Ideally we always throw an error when detecting duplicate public properties.
        // This branch is only here for backward compatibility reasons.
        if (type === "accessor" /* DescriptorType.Accessor */) {
            logError(message);
        }
        else {
            assert.fail(message);
        }
    }
}
function validateAccessorDecoratedWithApi(Ctor, fieldName, descriptor) {
    if (isUndefined$1(descriptor)) {
        assert.fail(`Invalid @api get ${fieldName} accessor.`);
    }
    else if (isFunction$1(descriptor.set)) {
        assert.isTrue(isFunction$1(descriptor.get), `Missing getter for property ${fieldName} decorated with @api in ${Ctor}. You cannot have a setter without the corresponding getter.`);
    }
    else if (!isFunction$1(descriptor.get)) {
        assert.fail(`Missing @api get ${fieldName} accessor.`);
    }
}
function validateMethodDecoratedWithApi(Ctor, methodName, descriptor) {
    if (isUndefined$1(descriptor) || !isFunction$1(descriptor.value) || isFalse(descriptor.writable)) {
        assert.fail(`Invalid @api ${methodName} method.`);
    }
}
/**
 * INTERNAL: This function can only be invoked by compiled code. The compiler
 * will prevent this function from being imported by user-land code.
 */
function registerDecorators(Ctor, meta) {
    const proto = Ctor.prototype;
    const { publicProps, publicMethods, wire, track, fields } = meta;
    const apiMethods = create(null);
    const apiFields = create(null);
    const wiredMethods = create(null);
    const wiredFields = create(null);
    const observedFields = create(null);
    const apiFieldsConfig = create(null);
    let descriptor;
    if (!isUndefined$1(publicProps)) {
        for (const fieldName in publicProps) {
            const propConfig = publicProps[fieldName];
            apiFieldsConfig[fieldName] = propConfig.config;
            descriptor = getOwnPropertyDescriptor$1(proto, fieldName);
            if (propConfig.config > 0) {
                // accessor declaration
                if (process.env.NODE_ENV !== 'production') {
                    validateAccessorDecoratedWithApi(Ctor, fieldName, descriptor);
                }
                if (isUndefined$1(descriptor)) {
                    throw new Error();
                }
                descriptor = createPublicAccessorDescriptor(fieldName, descriptor);
            }
            else {
                // field declaration
                if (process.env.NODE_ENV !== 'production') {
                    validateFieldDecoratedWithApi(Ctor, fieldName, descriptor);
                }
                // [W-9927596] If a component has both a public property and a private setter/getter
                // with the same name, the property is defined as a public accessor. This branch is
                // only here for backward compatibility reasons.
                if (!isUndefined$1(descriptor) && !isUndefined$1(descriptor.get)) {
                    descriptor = createPublicAccessorDescriptor(fieldName, descriptor);
                }
                else {
                    descriptor = createPublicPropertyDescriptor(fieldName);
                }
            }
            apiFields[fieldName] = descriptor;
            defineProperty(proto, fieldName, descriptor);
        }
    }
    if (!isUndefined$1(publicMethods)) {
        forEach.call(publicMethods, (methodName) => {
            descriptor = getOwnPropertyDescriptor$1(proto, methodName);
            if (process.env.NODE_ENV !== 'production') {
                validateMethodDecoratedWithApi(Ctor, methodName, descriptor);
            }
            if (isUndefined$1(descriptor)) {
                throw new Error();
            }
            apiMethods[methodName] = descriptor;
        });
    }
    if (!isUndefined$1(wire)) {
        for (const fieldOrMethodName in wire) {
            const { adapter, method, config: configCallback, dynamic = [], } = wire[fieldOrMethodName];
            descriptor = getOwnPropertyDescriptor$1(proto, fieldOrMethodName);
            if (method === 1) {
                if (process.env.NODE_ENV !== 'production') {
                    assert.isTrue(adapter, `@wire on method "${fieldOrMethodName}": adapter id must be truthy.`);
                    validateMethodDecoratedWithWire(Ctor, fieldOrMethodName, descriptor);
                }
                if (isUndefined$1(descriptor)) {
                    throw new Error();
                }
                wiredMethods[fieldOrMethodName] = descriptor;
                storeWiredMethodMeta(descriptor, adapter, configCallback, dynamic);
            }
            else {
                if (process.env.NODE_ENV !== 'production') {
                    assert.isTrue(adapter, `@wire on field "${fieldOrMethodName}": adapter id must be truthy.`);
                    validateFieldDecoratedWithWire(Ctor, fieldOrMethodName, descriptor);
                }
                descriptor = internalWireFieldDecorator(fieldOrMethodName);
                wiredFields[fieldOrMethodName] = descriptor;
                storeWiredFieldMeta(descriptor, adapter, configCallback, dynamic);
                defineProperty(proto, fieldOrMethodName, descriptor);
            }
        }
    }
    if (!isUndefined$1(track)) {
        for (const fieldName in track) {
            descriptor = getOwnPropertyDescriptor$1(proto, fieldName);
            if (process.env.NODE_ENV !== 'production') {
                validateFieldDecoratedWithTrack(Ctor, fieldName, descriptor);
            }
            descriptor = internalTrackDecorator(fieldName);
            defineProperty(proto, fieldName, descriptor);
        }
    }
    if (!isUndefined$1(fields)) {
        for (let i = 0, n = fields.length; i < n; i++) {
            const fieldName = fields[i];
            descriptor = getOwnPropertyDescriptor$1(proto, fieldName);
            if (process.env.NODE_ENV !== 'production') {
                validateObservedField(Ctor, fieldName, descriptor);
            }
            // [W-9927596] Only mark a field as observed whenever it isn't a duplicated public nor
            // tracked property. This is only here for backward compatibility purposes.
            const isDuplicatePublicProp = !isUndefined$1(publicProps) && fieldName in publicProps;
            const isDuplicateTrackedProp = !isUndefined$1(track) && fieldName in track;
            if (!isDuplicatePublicProp && !isDuplicateTrackedProp) {
                observedFields[fieldName] = createObservedFieldPropertyDescriptor(fieldName);
            }
        }
    }
    setDecoratorsMeta(Ctor, {
        apiMethods,
        apiFields,
        apiFieldsConfig,
        wiredMethods,
        wiredFields,
        observedFields,
    });
    return Ctor;
}
const signedDecoratorToMetaMap = new Map();
function setDecoratorsMeta(Ctor, meta) {
    signedDecoratorToMetaMap.set(Ctor, meta);
}
const defaultMeta = {
    apiMethods: EmptyObject,
    apiFields: EmptyObject,
    apiFieldsConfig: EmptyObject,
    wiredMethods: EmptyObject,
    wiredFields: EmptyObject,
    observedFields: EmptyObject,
};
function getDecoratorsMeta(Ctor) {
    const meta = signedDecoratorToMetaMap.get(Ctor);
    return isUndefined$1(meta) ? defaultMeta : meta;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
let warned = false;
// @ts-ignore
if (process.env.NODE_ENV !== 'production' && typeof __karma__ !== 'undefined') {
    // @ts-ignore
    window.__lwcResetWarnedOnVersionMismatch = () => {
        warned = false;
    };
}
function checkVersionMismatch(func, type) {
    const versionMatcher = func.toString().match(LWC_VERSION_COMMENT_REGEX);
    if (!isNull(versionMatcher) && !warned) {
        const version = versionMatcher[1];
        const [major, minor] = version.split('.');
        const [expectedMajor, expectedMinor] = LWC_VERSION.split('.');
        if (major !== expectedMajor || minor !== expectedMinor) {
            warned = true; // only warn once to avoid flooding the console
            // stylesheets and templates do not have user-meaningful names, but components do
            const friendlyName = type === 'component' ? `${type} ${func.name}` : type;
            logError(`LWC WARNING: current engine is v${LWC_VERSION}, but ${friendlyName} was compiled with v${version}.\nPlease update your compiled code or LWC engine so that the versions match.\nNo further warnings will appear.`);
        }
    }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const signedTemplateSet = new Set();
function defaultEmptyTemplate() {
    return [];
}
signedTemplateSet.add(defaultEmptyTemplate);
function isTemplateRegistered(tpl) {
    return signedTemplateSet.has(tpl);
}
/**
 * INTERNAL: This function can only be invoked by compiled code. The compiler
 * will prevent this function from being imported by userland code.
 */
function registerTemplate(tpl) {
    if (process.env.NODE_ENV !== 'production') {
        checkVersionMismatch(tpl, 'template');
    }
    signedTemplateSet.add(tpl);
    // FIXME[@W-10950976]: the template object should be frozen, and it should not be possible to set
    // the stylesheets or stylesheetToken(s). For backwards compat, though, we shim stylesheetTokens
    // on top of stylesheetToken for anyone who is accessing the old internal API.
    // Details: https://salesforce.quip.com/v1rmAFu2cKAr
    defineProperty(tpl, 'stylesheetTokens', {
        enumerable: true,
        configurable: true,
        get() {
            const { stylesheetToken } = this;
            if (isUndefined$1(stylesheetToken)) {
                return stylesheetToken;
            }
            // Shim for the old `stylesheetTokens` property
            // See https://github.com/salesforce/lwc/pull/2332/files#diff-7901555acef29969adaa6583185b3e9bce475cdc6f23e799a54e0018cb18abaa
            return {
                hostAttribute: `${stylesheetToken}-host`,
                shadowAttribute: stylesheetToken,
            };
        },
        set(value) {
            // If the value is null or some other exotic object, you would be broken anyway in the past
            // because the engine would try to access hostAttribute/shadowAttribute, which would throw an error.
            // However it may be undefined in newer versions of LWC, so we need to guard against that case.
            this.stylesheetToken = isUndefined$1(value) ? undefined : value.shadowAttribute;
        },
    });
    // chaining this method as a way to wrap existing
    // assignment of templates easily, without too much transformation
    return tpl;
}
/**
 * EXPERIMENTAL: This function acts like a hook for Lightning Locker Service and other similar
 * libraries to sanitize vulnerable attributes.
 */
function sanitizeAttribute(tagName, namespaceUri, attrName, attrValue) {
    // locker-service patches this function during runtime to sanitize vulnerable attributes. When
    // ran off-core this function becomes a noop and returns the user authored value.
    return attrValue;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// A bridge descriptor is a descriptor whose job is just to get the component instance
// from the element instance, and get the value or set a new value on the component.
// This means that across different elements, similar names can get the exact same
// descriptor, so we can cache them:
const cachedGetterByKey = create(null);
const cachedSetterByKey = create(null);
function createGetter(key) {
    let fn = cachedGetterByKey[key];
    if (isUndefined$1(fn)) {
        fn = cachedGetterByKey[key] = function () {
            const vm = getAssociatedVM(this);
            const { getHook } = vm;
            return getHook(vm.component, key);
        };
    }
    return fn;
}
function createSetter(key) {
    let fn = cachedSetterByKey[key];
    if (isUndefined$1(fn)) {
        fn = cachedSetterByKey[key] = function (newValue) {
            const vm = getAssociatedVM(this);
            const { setHook } = vm;
            newValue = getReadOnlyProxy(newValue);
            setHook(vm.component, key, newValue);
        };
    }
    return fn;
}
function createMethodCaller(methodName) {
    return function () {
        const vm = getAssociatedVM(this);
        const { callHook, component } = vm;
        const fn = component[methodName];
        return callHook(vm.component, fn, ArraySlice.call(arguments));
    };
}
function createAttributeChangedCallback(attributeToPropMap, superAttributeChangedCallback) {
    return function attributeChangedCallback(attrName, oldValue, newValue) {
        if (oldValue === newValue) {
            // Ignore same values.
            return;
        }
        const propName = attributeToPropMap[attrName];
        if (isUndefined$1(propName)) {
            if (!isUndefined$1(superAttributeChangedCallback)) {
                // delegate unknown attributes to the super.
                // Typescript does not like it when you treat the `arguments` object as an array
                // @ts-ignore type-mismatch
                superAttributeChangedCallback.apply(this, arguments);
            }
            return;
        }
        if (!isAttributeLocked(this, attrName)) {
            // Ignore changes triggered by the engine itself during:
            // * diffing when public props are attempting to reflect to the DOM
            // * component via `this.setAttribute()`, should never update the prop
            // Both cases, the setAttribute call is always wrapped by the unlocking of the
            // attribute to be changed
            return;
        }
        // Reflect attribute change to the corresponding property when changed from outside.
        this[propName] = newValue;
    };
}
function HTMLBridgeElementFactory(SuperClass, props, methods) {
    let HTMLBridgeElement;
    /**
     * Modern browsers will have all Native Constructors as regular Classes
     * and must be instantiated with the new keyword. In older browsers,
     * specifically IE11, those are objects with a prototype property defined,
     * since they are not supposed to be extended or instantiated with the
     * new keyword. This forking logic supports both cases, specifically because
     * wc.ts relies on the construction path of the bridges to create new
     * fully qualifying web components.
     */
    if (isFunction$1(SuperClass)) {
        HTMLBridgeElement = class extends SuperClass {
        };
    }
    else {
        HTMLBridgeElement = function () {
            // Bridge classes are not supposed to be instantiated directly in
            // browsers that do not support web components.
            throw new TypeError('Illegal constructor');
        };
        // prototype inheritance dance
        setPrototypeOf(HTMLBridgeElement, SuperClass);
        setPrototypeOf(HTMLBridgeElement.prototype, SuperClass.prototype);
        defineProperty(HTMLBridgeElement.prototype, 'constructor', {
            writable: true,
            configurable: true,
            value: HTMLBridgeElement,
        });
    }
    // generating the hash table for attributes to avoid duplicate fields and facilitate validation
    // and false positives in case of inheritance.
    const attributeToPropMap = create(null);
    const { attributeChangedCallback: superAttributeChangedCallback } = SuperClass.prototype;
    const { observedAttributes: superObservedAttributes = [] } = SuperClass;
    const descriptors = create(null);
    // expose getters and setters for each public props on the new Element Bridge
    for (let i = 0, len = props.length; i < len; i += 1) {
        const propName = props[i];
        attributeToPropMap[htmlPropertyToAttribute(propName)] = propName;
        descriptors[propName] = {
            get: createGetter(propName),
            set: createSetter(propName),
            enumerable: true,
            configurable: true,
        };
    }
    // expose public methods as props on the new Element Bridge
    for (let i = 0, len = methods.length; i < len; i += 1) {
        const methodName = methods[i];
        descriptors[methodName] = {
            value: createMethodCaller(methodName),
            writable: true,
            configurable: true,
        };
    }
    // creating a new attributeChangedCallback per bridge because they are bound to the corresponding
    // map of attributes to props. We do this after all other props and methods to avoid the possibility
    // of getting overrule by a class declaration in user-land, and we make it non-writable, non-configurable
    // to preserve this definition.
    descriptors.attributeChangedCallback = {
        value: createAttributeChangedCallback(attributeToPropMap, superAttributeChangedCallback),
    };
    // Specify attributes for which we want to reflect changes back to their corresponding
    // properties via attributeChangedCallback.
    defineProperty(HTMLBridgeElement, 'observedAttributes', {
        get() {
            return [...superObservedAttributes, ...keys(attributeToPropMap)];
        },
    });
    defineProperties(HTMLBridgeElement.prototype, descriptors);
    return HTMLBridgeElement;
}
const BaseBridgeElement = HTMLBridgeElementFactory(HTMLElementConstructor, getOwnPropertyNames$1(HTMLElementOriginalDescriptors), []);
freeze(BaseBridgeElement);
seal(BaseBridgeElement.prototype);

/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const swappedTemplateMap = new WeakMap();
const swappedComponentMap = new WeakMap();
const swappedStyleMap = new WeakMap();
const activeTemplates = new WeakMap();
const activeComponents = new WeakMap();
const activeStyles = new WeakMap();

function getTemplateOrSwappedTemplate(tpl) {
  if (process.env.NODE_ENV === 'production') {
    // this method should never leak to prod
    throw new ReferenceError();
  }

  if (runtimeFlags.ENABLE_HMR) {
    const visited = new Set();

    while (swappedTemplateMap.has(tpl) && !visited.has(tpl)) {
      visited.add(tpl);
      tpl = swappedTemplateMap.get(tpl);
    }
  }

  return tpl;
}
function getComponentOrSwappedComponent(Ctor) {
  if (process.env.NODE_ENV === 'production') {
    // this method should never leak to prod
    throw new ReferenceError();
  }

  if (runtimeFlags.ENABLE_HMR) {
    const visited = new Set();

    while (swappedComponentMap.has(Ctor) && !visited.has(Ctor)) {
      visited.add(Ctor);
      Ctor = swappedComponentMap.get(Ctor);
    }
  }

  return Ctor;
}
function getStyleOrSwappedStyle(style) {
  if (process.env.NODE_ENV === 'production') {
    // this method should never leak to prod
    throw new ReferenceError();
  }

  if (runtimeFlags.ENABLE_HMR) {
    const visited = new Set();

    while (swappedStyleMap.has(style) && !visited.has(style)) {
      visited.add(style);
      style = swappedStyleMap.get(style);
    }
  }

  return style;
}
function setActiveVM(vm) {
  if (process.env.NODE_ENV === 'production') {
    // this method should never leak to prod
    throw new ReferenceError();
  }

  if (runtimeFlags.ENABLE_HMR) {
    // tracking active component
    const Ctor = vm.def.ctor;
    let componentVMs = activeComponents.get(Ctor);

    if (isUndefined$1(componentVMs)) {
      componentVMs = new Set();
      activeComponents.set(Ctor, componentVMs);
    } // this will allow us to keep track of the hot components


    componentVMs.add(vm); // tracking active template

    const tpl = vm.cmpTemplate;

    if (tpl) {
      let templateVMs = activeTemplates.get(tpl);

      if (isUndefined$1(templateVMs)) {
        templateVMs = new Set();
        activeTemplates.set(tpl, templateVMs);
      } // this will allow us to keep track of the templates that are
      // being used by a hot component


      templateVMs.add(vm); // tracking active styles associated to template

      const stylesheets = tpl.stylesheets;

      if (!isUndefined$1(stylesheets)) {
        flattenStylesheets(stylesheets).forEach(stylesheet => {
          // this is necessary because we don't hold the list of styles
          // in the vm, we only hold the selected (already swapped template)
          // but the styles attached to the template might not be the actual
          // active ones, but the swapped versions of those.
          stylesheet = getStyleOrSwappedStyle(stylesheet);
          let stylesheetVMs = activeStyles.get(stylesheet);

          if (isUndefined$1(stylesheetVMs)) {
            stylesheetVMs = new Set();
            activeStyles.set(stylesheet, stylesheetVMs);
          } // this will allow us to keep track of the stylesheet that are
          // being used by a hot component


          stylesheetVMs.add(vm);
        });
      }
    }
  }
}
function removeActiveVM(vm) {
  if (process.env.NODE_ENV === 'production') {
    // this method should never leak to prod
    throw new ReferenceError();
  }

  if (runtimeFlags.ENABLE_HMR) {
    // tracking inactive component
    const Ctor = vm.def.ctor;
    let list = activeComponents.get(Ctor);

    if (!isUndefined$1(list)) {
      // deleting the vm from the set to avoid leaking memory
      list.delete(vm);
    } // removing inactive template


    const tpl = vm.cmpTemplate;

    if (tpl) {
      list = activeTemplates.get(tpl);

      if (!isUndefined$1(list)) {
        // deleting the vm from the set to avoid leaking memory
        list.delete(vm);
      } // removing active styles associated to template


      const styles = tpl.stylesheets;

      if (!isUndefined$1(styles)) {
        flattenStylesheets(styles).forEach(style => {
          list = activeStyles.get(style);

          if (!isUndefined$1(list)) {
            // deleting the vm from the set to avoid leaking memory
            list.delete(vm);
          }
        });
      }
    }
  }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const CtorToDefMap = new WeakMap();
function getCtorProto(Ctor) {
    let proto = getPrototypeOf$1(Ctor);
    if (isNull(proto)) {
        throw new ReferenceError(`Invalid prototype chain for ${Ctor.name}, you must extend LightningElement.`);
    }
    // covering the cases where the ref is circular in AMD
    if (isCircularModuleDependency(proto)) {
        const p = resolveCircularModuleDependency(proto);
        if (process.env.NODE_ENV !== 'production') {
            if (isNull(p)) {
                throw new ReferenceError(`Circular module dependency for ${Ctor.name}, must resolve to a constructor that extends LightningElement.`);
            }
        }
        // escape hatch for Locker and other abstractions to provide their own base class instead
        // of our Base class without having to leak it to user-land. If the circular function returns
        // itself, that's the signal that we have hit the end of the proto chain, which must always
        // be base.
        proto = p === proto ? LightningElement : p;
    }
    return proto;
}
function createComponentDef(Ctor) {
    const { shadowSupportMode: ctorShadowSupportMode, renderMode: ctorRenderMode } = Ctor;
    if (process.env.NODE_ENV !== 'production') {
        const ctorName = Ctor.name;
        // Removing the following assert until https://bugs.webkit.org/show_bug.cgi?id=190140 is fixed.
        // assert.isTrue(ctorName && isString(ctorName), `${toString(Ctor)} should have a "name" property with string value, but found ${ctorName}.`);
        assert.isTrue(Ctor.constructor, `Missing ${ctorName}.constructor, ${ctorName} should have a "constructor" property.`);
        if (!isUndefined$1(ctorShadowSupportMode)) {
            assert.invariant(ctorShadowSupportMode === "any" /* ShadowSupportMode.Any */ ||
                ctorShadowSupportMode === "reset" /* ShadowSupportMode.Default */, `Invalid value for static property shadowSupportMode: '${ctorShadowSupportMode}'`);
        }
        if (!isUndefined$1(ctorRenderMode)) {
            assert.invariant(ctorRenderMode === 'light' || ctorRenderMode === 'shadow', `Invalid value for static property renderMode: '${ctorRenderMode}'. renderMode must be either 'light' or 'shadow'.`);
        }
    }
    const decoratorsMeta = getDecoratorsMeta(Ctor);
    const { apiFields, apiFieldsConfig, apiMethods, wiredFields, wiredMethods, observedFields } = decoratorsMeta;
    const proto = Ctor.prototype;
    let { connectedCallback, disconnectedCallback, renderedCallback, errorCallback, render } = proto;
    const superProto = getCtorProto(Ctor);
    const superDef = superProto !== LightningElement ? getComponentInternalDef(superProto) : lightingElementDef;
    const bridge = HTMLBridgeElementFactory(superDef.bridge, keys(apiFields), keys(apiMethods));
    const props = assign(create(null), superDef.props, apiFields);
    const propsConfig = assign(create(null), superDef.propsConfig, apiFieldsConfig);
    const methods = assign(create(null), superDef.methods, apiMethods);
    const wire = assign(create(null), superDef.wire, wiredFields, wiredMethods);
    connectedCallback = connectedCallback || superDef.connectedCallback;
    disconnectedCallback = disconnectedCallback || superDef.disconnectedCallback;
    renderedCallback = renderedCallback || superDef.renderedCallback;
    errorCallback = errorCallback || superDef.errorCallback;
    render = render || superDef.render;
    let shadowSupportMode = superDef.shadowSupportMode;
    if (!isUndefined$1(ctorShadowSupportMode)) {
        shadowSupportMode = ctorShadowSupportMode;
    }
    let renderMode = superDef.renderMode;
    if (!isUndefined$1(ctorRenderMode)) {
        renderMode = ctorRenderMode === 'light' ? 0 /* RenderMode.Light */ : 1 /* RenderMode.Shadow */;
    }
    const template = getComponentRegisteredTemplate(Ctor) || superDef.template;
    const name = Ctor.name || superDef.name;
    // installing observed fields into the prototype.
    defineProperties(proto, observedFields);
    const def = {
        ctor: Ctor,
        name,
        wire,
        props,
        propsConfig,
        methods,
        bridge,
        template,
        renderMode,
        shadowSupportMode,
        connectedCallback,
        disconnectedCallback,
        renderedCallback,
        errorCallback,
        render,
    };
    if (process.env.NODE_ENV !== 'production') {
        freeze(Ctor.prototype);
    }
    return def;
}
/**
 * EXPERIMENTAL: This function allows for the identification of LWC constructors. This API is
 * subject to change or being removed.
 */
function isComponentConstructor(ctor) {
    if (!isFunction$1(ctor)) {
        return false;
    }
    // Fast path: LightningElement is part of the prototype chain of the constructor.
    if (ctor.prototype instanceof LightningElement) {
        return true;
    }
    // Slow path: LightningElement is not part of the prototype chain of the constructor, we need
    // climb up the constructor prototype chain to check in case there are circular dependencies
    // to resolve.
    let current = ctor;
    do {
        if (isCircularModuleDependency(current)) {
            const circularResolved = resolveCircularModuleDependency(current);
            // If the circular function returns itself, that's the signal that we have hit the end
            // of the proto chain, which must always be a valid base constructor.
            if (circularResolved === current) {
                return true;
            }
            current = circularResolved;
        }
        if (current === LightningElement) {
            return true;
        }
    } while (!isNull(current) && (current = getPrototypeOf$1(current)));
    // Finally return false if the LightningElement is not part of the prototype chain.
    return false;
}
function getComponentInternalDef(Ctor) {
    if (process.env.NODE_ENV !== 'production') {
        Ctor = getComponentOrSwappedComponent(Ctor);
    }
    let def = CtorToDefMap.get(Ctor);
    if (isUndefined$1(def)) {
        if (isCircularModuleDependency(Ctor)) {
            const resolvedCtor = resolveCircularModuleDependency(Ctor);
            def = getComponentInternalDef(resolvedCtor);
            // Cache the unresolved component ctor too. The next time if the same unresolved ctor is used,
            // look up the definition in cache instead of re-resolving and recreating the def.
            CtorToDefMap.set(Ctor, def);
            return def;
        }
        if (!isComponentConstructor(Ctor)) {
            throw new TypeError(`${Ctor} is not a valid component, or does not extends LightningElement from "lwc". You probably forgot to add the extend clause on the class declaration.`);
        }
        def = createComponentDef(Ctor);
        CtorToDefMap.set(Ctor, def);
    }
    return def;
}
const lightingElementDef = {
    ctor: LightningElement,
    name: LightningElement.name,
    props: lightningBasedDescriptors,
    propsConfig: EmptyObject,
    methods: EmptyObject,
    renderMode: 1 /* RenderMode.Shadow */,
    shadowSupportMode: "reset" /* ShadowSupportMode.Default */,
    wire: EmptyObject,
    bridge: BaseBridgeElement,
    template: defaultEmptyTemplate,
    render: LightningElement.prototype.render,
};
/**
 * EXPERIMENTAL: This function allows for the collection of internal component metadata. This API is
 * subject to change or being removed.
 */
function getComponentDef(Ctor) {
    const def = getComponentInternalDef(Ctor);
    // From the internal def object, we need to extract the info that is useful
    // for some external services, e.g.: Locker Service, usually, all they care
    // is about the shape of the constructor, the internals of it are not relevant
    // because they don't have a way to mess with that.
    const { ctor, name, props, propsConfig, methods } = def;
    const publicProps = {};
    for (const key in props) {
        // avoid leaking the reference to the public props descriptors
        publicProps[key] = {
            config: propsConfig[key] || 0,
            type: "any" /* PropDefType.any */,
            attr: htmlPropertyToAttribute(key),
        };
    }
    const publicMethods = {};
    for (const key in methods) {
        // avoid leaking the reference to the public method descriptors
        publicMethods[key] = methods[key].value;
    }
    return {
        ctor,
        name,
        props: publicProps,
        methods: publicMethods,
    };
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function makeHostToken(token) {
    return `${token}-host`;
}
function createInlineStyleVNode(content) {
    return api.h('style', {
        key: 'style',
        attrs: {
            type: 'text/css',
        },
    }, [api.t(content)]);
}
function updateStylesheetToken(vm, template) {
    const { elm, context, renderMode, shadowMode, renderer: { getClassList, removeAttribute, setAttribute }, } = vm;
    const { stylesheets: newStylesheets, stylesheetToken: newStylesheetToken } = template;
    const isSyntheticShadow = renderMode === 1 /* RenderMode.Shadow */ && shadowMode === 1 /* ShadowMode.Synthetic */;
    const { hasScopedStyles } = context;
    let newToken;
    let newHasTokenInClass;
    let newHasTokenInAttribute;
    // Reset the styling token applied to the host element.
    const { stylesheetToken: oldToken, hasTokenInClass: oldHasTokenInClass, hasTokenInAttribute: oldHasTokenInAttribute, } = context;
    if (!isUndefined$1(oldToken)) {
        if (oldHasTokenInClass) {
            getClassList(elm).remove(makeHostToken(oldToken));
        }
        if (oldHasTokenInAttribute) {
            removeAttribute(elm, makeHostToken(oldToken));
        }
    }
    // Apply the new template styling token to the host element, if the new template has any
    // associated stylesheets. In the case of light DOM, also ensure there is at least one scoped stylesheet.
    if (!isUndefined$1(newStylesheets) && newStylesheets.length !== 0) {
        newToken = newStylesheetToken;
    }
    // Set the new styling token on the host element
    if (!isUndefined$1(newToken)) {
        if (hasScopedStyles) {
            getClassList(elm).add(makeHostToken(newToken));
            newHasTokenInClass = true;
        }
        if (isSyntheticShadow) {
            setAttribute(elm, makeHostToken(newToken), '');
            newHasTokenInAttribute = true;
        }
    }
    // Update the styling tokens present on the context object.
    context.stylesheetToken = newToken;
    context.hasTokenInClass = newHasTokenInClass;
    context.hasTokenInAttribute = newHasTokenInAttribute;
}
function evaluateStylesheetsContent(stylesheets, stylesheetToken, vm) {
    const content = [];
    let root;
    for (let i = 0; i < stylesheets.length; i++) {
        let stylesheet = stylesheets[i];
        if (isArray$1(stylesheet)) {
            ArrayPush$1.apply(content, evaluateStylesheetsContent(stylesheet, stylesheetToken, vm));
        }
        else {
            if (process.env.NODE_ENV !== 'production') {
                // Check for compiler version mismatch in dev mode only
                checkVersionMismatch(stylesheet, 'stylesheet');
                // in dev-mode, we support hot swapping of stylesheet, which means that
                // the component instance might be attempting to use an old version of
                // the stylesheet, while internally, we have a replacement for it.
                stylesheet = getStyleOrSwappedStyle(stylesheet);
            }
            const isScopedCss = stylesheet[KEY__SCOPED_CSS];
            // Apply the scope token only if the stylesheet itself is scoped, or if we're rendering synthetic shadow.
            const scopeToken = isScopedCss ||
                (vm.shadowMode === 1 /* ShadowMode.Synthetic */ && vm.renderMode === 1 /* RenderMode.Shadow */)
                ? stylesheetToken
                : undefined;
            // Use the actual `:host` selector if we're rendering global CSS for light DOM, or if we're rendering
            // native shadow DOM. Synthetic shadow DOM never uses `:host`.
            const useActualHostSelector = vm.renderMode === 0 /* RenderMode.Light */
                ? !isScopedCss
                : vm.shadowMode === 0 /* ShadowMode.Native */;
            // Use the native :dir() pseudoclass only in native shadow DOM. Otherwise, in synthetic shadow,
            // we use an attribute selector on the host to simulate :dir().
            let useNativeDirPseudoclass;
            if (vm.renderMode === 1 /* RenderMode.Shadow */) {
                useNativeDirPseudoclass = vm.shadowMode === 0 /* ShadowMode.Native */;
            }
            else {
                // Light DOM components should only render `[dir]` if they're inside of a synthetic shadow root.
                // At the top level (root is null) or inside of a native shadow root, they should use `:dir()`.
                if (isUndefined$1(root)) {
                    // Only calculate the root once as necessary
                    root = getNearestShadowComponent(vm);
                }
                useNativeDirPseudoclass = isNull(root) || root.shadowMode === 0 /* ShadowMode.Native */;
            }
            ArrayPush$1.call(content, stylesheet(scopeToken, useActualHostSelector, useNativeDirPseudoclass));
        }
    }
    return content;
}
function getStylesheetsContent(vm, template) {
    const { stylesheets, stylesheetToken } = template;
    let content = [];
    if (!isUndefined$1(stylesheets) && stylesheets.length !== 0) {
        content = evaluateStylesheetsContent(stylesheets, stylesheetToken, vm);
    }
    return content;
}
// It might be worth caching this to avoid doing the lookup repeatedly, but
// perf testing has not shown it to be a huge improvement yet:
// https://github.com/salesforce/lwc/pull/2460#discussion_r691208892
function getNearestShadowComponent(vm) {
    let owner = vm;
    while (!isNull(owner)) {
        if (owner.renderMode === 1 /* RenderMode.Shadow */) {
            return owner;
        }
        owner = owner.owner;
    }
    return owner;
}
/**
 * If the component that is currently being rendered uses scoped styles,
 * this returns the unique token for that scoped stylesheet. Otherwise
 * it returns null.
 */
function getScopeTokenClass(owner) {
    const { cmpTemplate, context } = owner;
    return (context.hasScopedStyles && (cmpTemplate === null || cmpTemplate === void 0 ? void 0 : cmpTemplate.stylesheetToken)) || null;
}
function createStylesheet(vm, stylesheets) {
    const { renderMode, shadowMode, renderer: { insertStylesheet }, } = vm;
    if (renderMode === 1 /* RenderMode.Shadow */ && shadowMode === 1 /* ShadowMode.Synthetic */) {
        for (let i = 0; i < stylesheets.length; i++) {
            insertStylesheet(stylesheets[i]);
        }
    }
    else {
        // Note: We need to ensure that during hydration, the stylesheets method is the same as those in ssr.
        //       This works in the client, because the stylesheets are created, and cached in the VM
        //       the first time the VM renders.
        // native shadow or light DOM, SSR
        return ArrayMap.call(stylesheets, createInlineStyleVNode);
    }
    return null;
}

/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function getUpgradableConstructor(tagName, renderer) {
    const { getCustomElement, HTMLElementExported: RendererHTMLElement, defineCustomElement, } = renderer;
    // Should never get a tag with upper case letter at this point, the compiler should
    // produce only tags with lowercase letters
    // But, for backwards compatibility, we will lower case the tagName
    tagName = tagName.toLowerCase();
    let CE = getCustomElement(tagName);
    if (!isUndefined$1(CE)) {
        return CE;
    }
    /**
     * LWC Upgradable Element reference to an element that was created
     * via the scoped registry mechanism, and that is ready to be upgraded.
     */
    CE = class LWCUpgradableElement extends RendererHTMLElement {
        constructor(upgradeCallback) {
            super();
            if (isFunction$1(upgradeCallback)) {
                upgradeCallback(this); // nothing to do with the result for now
            }
        }
    };
    defineCustomElement(tagName, CE);
    return CE;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function isVBaseElement(vnode) {
    const { type } = vnode;
    return type === 2 /* VNodeType.Element */ || type === 3 /* VNodeType.CustomElement */;
}
function isSameVnode(vnode1, vnode2) {
    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const ColonCharCode = 58;
function patchAttributes(oldVnode, vnode, renderer) {
    const { attrs } = vnode.data;
    if (isUndefined$1(attrs)) {
        return;
    }
    const oldAttrs = isNull(oldVnode) ? EmptyObject : oldVnode.data.attrs;
    if (oldAttrs === attrs) {
        return;
    }
    const { elm } = vnode;
    const { setAttribute, removeAttribute } = renderer;
    for (const key in attrs) {
        const cur = attrs[key];
        const old = oldAttrs[key];
        if (old !== cur) {
            unlockAttribute(elm, key);
            if (StringCharCodeAt.call(key, 3) === ColonCharCode) {
                // Assume xml namespace
                setAttribute(elm, key, cur, XML_NAMESPACE);
            }
            else if (StringCharCodeAt.call(key, 5) === ColonCharCode) {
                // Assume xlink namespace
                setAttribute(elm, key, cur, XLINK_NAMESPACE);
            }
            else if (isNull(cur) || isUndefined$1(cur)) {
                removeAttribute(elm, key);
            }
            else {
                setAttribute(elm, key, cur);
            }
            lockAttribute();
        }
    }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function isLiveBindingProp(sel, key) {
    // For properties with live bindings, we read values from the DOM element
    // instead of relying on internally tracked values.
    return sel === 'input' && (key === 'value' || key === 'checked');
}
function patchProps(oldVnode, vnode, renderer) {
    const { props } = vnode.data;
    if (isUndefined$1(props)) {
        return;
    }
    const oldProps = isNull(oldVnode) ? EmptyObject : oldVnode.data.props;
    if (oldProps === props) {
        return;
    }
    const isFirstPatch = isNull(oldVnode);
    const { elm, sel } = vnode;
    const { getProperty, setProperty } = renderer;
    for (const key in props) {
        const cur = props[key];
        // Set the property if it's the first time is is patched or if the previous property is
        // different than the one previously set.
        if (isFirstPatch ||
            cur !== (isLiveBindingProp(sel, key) ? getProperty(elm, key) : oldProps[key])) {
            setProperty(elm, key, cur);
        }
    }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const classNameToClassMap = create(null);
function getMapFromClassName(className) {
    // Intentionally using == to match undefined and null values from computed style attribute
    if (className == null) {
        return EmptyObject;
    }
    // computed class names must be string
    className = isString(className) ? className : className + '';
    let map = classNameToClassMap[className];
    if (map) {
        return map;
    }
    map = create(null);
    let start = 0;
    let o;
    const len = className.length;
    for (o = 0; o < len; o++) {
        if (StringCharCodeAt.call(className, o) === SPACE_CHAR) {
            if (o > start) {
                map[StringSlice.call(className, start, o)] = true;
            }
            start = o + 1;
        }
    }
    if (o > start) {
        map[StringSlice.call(className, start, o)] = true;
    }
    classNameToClassMap[className] = map;
    if (process.env.NODE_ENV !== 'production') {
        // just to make sure that this object never changes as part of the diffing algo
        freeze(map);
    }
    return map;
}
function patchClassAttribute(oldVnode, vnode, renderer) {
    const { elm, data: { className: newClass }, } = vnode;
    const oldClass = isNull(oldVnode) ? undefined : oldVnode.data.className;
    if (oldClass === newClass) {
        return;
    }
    const { getClassList } = renderer;
    const classList = getClassList(elm);
    const newClassMap = getMapFromClassName(newClass);
    const oldClassMap = getMapFromClassName(oldClass);
    let name;
    for (name in oldClassMap) {
        // remove only if it is not in the new class collection and it is not set from within the instance
        if (isUndefined$1(newClassMap[name])) {
            classList.remove(name);
        }
    }
    for (name in newClassMap) {
        if (isUndefined$1(oldClassMap[name])) {
            classList.add(name);
        }
    }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// The style property is a string when defined via an expression in the template.
function patchStyleAttribute(oldVnode, vnode, renderer) {
    const { elm, data: { style: newStyle }, } = vnode;
    const oldStyle = isNull(oldVnode) ? undefined : oldVnode.data.style;
    if (oldStyle === newStyle) {
        return;
    }
    const { setAttribute, removeAttribute } = renderer;
    if (!isString(newStyle) || newStyle === '') {
        removeAttribute(elm, 'style');
    }
    else {
        setAttribute(elm, 'style', newStyle);
    }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function applyEventListeners(vnode, renderer) {
    const { elm, data: { on }, } = vnode;
    if (isUndefined$1(on)) {
        return;
    }
    const { addEventListener } = renderer;
    for (const name in on) {
        const handler = on[name];
        addEventListener(elm, name, handler);
    }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// The HTML class property becomes the vnode.data.classMap object when defined as a string in the template.
// The compiler takes care of transforming the inline classnames into an object. It's faster to set the
// different classnames properties individually instead of via a string.
function applyStaticClassAttribute(vnode, renderer) {
    const { elm, data: { classMap }, } = vnode;
    if (isUndefined$1(classMap)) {
        return;
    }
    const { getClassList } = renderer;
    const classList = getClassList(elm);
    for (const name in classMap) {
        classList.add(name);
    }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// The HTML style property becomes the vnode.data.styleDecls object when defined as a string in the template.
// The compiler takes care of transforming the inline style into an object. It's faster to set the
// different style properties individually instead of via a string.
function applyStaticStyleAttribute(vnode, renderer) {
    const { elm, data: { styleDecls }, } = vnode;
    if (isUndefined$1(styleDecls)) {
        return;
    }
    const { setCSSStyleProperty } = renderer;
    for (let i = 0; i < styleDecls.length; i++) {
        const [prop, value, important] = styleDecls[i];
        setCSSStyleProperty(elm, prop, value, important);
    }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function patchChildren(c1, c2, parent, renderer) {
    if (hasDynamicChildren(c2)) {
        updateDynamicChildren(c1, c2, parent, renderer);
    }
    else {
        updateStaticChildren(c1, c2, parent, renderer);
    }
}
function patch(n1, n2, parent, renderer) {
    var _a, _b;
    if (n1 === n2) {
        return;
    }
    if (process.env.NODE_ENV !== 'production') {
        if (!isSameVnode(n1, n2)) {
            throw new Error('Expected these VNodes to be the same: ' +
                JSON.stringify({ sel: n1.sel, key: n1.key }) +
                ', ' +
                JSON.stringify({ sel: n2.sel, key: n2.key }));
        }
    }
    switch (n2.type) {
        case 0 /* VNodeType.Text */:
            // VText has no special capability, fallback to the owner's renderer
            patchText(n1, n2, renderer);
            break;
        case 1 /* VNodeType.Comment */:
            // VComment has no special capability, fallback to the owner's renderer
            patchComment(n1, n2, renderer);
            break;
        case 4 /* VNodeType.Static */:
            n2.elm = n1.elm;
            break;
        case 2 /* VNodeType.Element */:
            patchElement(n1, n2, (_a = n2.data.renderer) !== null && _a !== void 0 ? _a : renderer);
            break;
        case 3 /* VNodeType.CustomElement */:
            patchCustomElement(n1, n2, parent, (_b = n2.data.renderer) !== null && _b !== void 0 ? _b : renderer);
            break;
    }
}
function mount(node, parent, renderer, anchor) {
    var _a, _b;
    switch (node.type) {
        case 0 /* VNodeType.Text */:
            // VText has no special capability, fallback to the owner's renderer
            mountText(node, parent, anchor, renderer);
            break;
        case 1 /* VNodeType.Comment */:
            // VComment has no special capability, fallback to the owner's renderer
            mountComment(node, parent, anchor, renderer);
            break;
        case 4 /* VNodeType.Static */:
            // VStatic cannot have a custom renderer associated to them, using owner's renderer
            mountStatic(node, parent, anchor, renderer);
            break;
        case 2 /* VNodeType.Element */:
            // If the vnode data has a renderer override use it, else fallback to owner's renderer
            mountElement(node, parent, anchor, (_a = node.data.renderer) !== null && _a !== void 0 ? _a : renderer);
            break;
        case 3 /* VNodeType.CustomElement */:
            // If the vnode data has a renderer override use it, else fallback to owner's renderer
            mountCustomElement(node, parent, anchor, (_b = node.data.renderer) !== null && _b !== void 0 ? _b : renderer);
            break;
    }
}
function patchText(n1, n2, renderer) {
    n2.elm = n1.elm;
    if (n2.text !== n1.text) {
        updateTextContent(n2, renderer);
    }
}
function mountText(vnode, parent, anchor, renderer) {
    const { owner } = vnode;
    const { createText } = renderer;
    const textNode = (vnode.elm = createText(vnode.text));
    linkNodeToShadow(textNode, owner, renderer);
    insertNode(textNode, parent, anchor, renderer);
}
function patchComment(n1, n2, renderer) {
    n2.elm = n1.elm;
    // FIXME: Comment nodes should be static, we shouldn't need to diff them together. However
    // it is the case today.
    if (n2.text !== n1.text) {
        updateTextContent(n2, renderer);
    }
}
function mountComment(vnode, parent, anchor, renderer) {
    const { owner } = vnode;
    const { createComment } = renderer;
    const commentNode = (vnode.elm = createComment(vnode.text));
    linkNodeToShadow(commentNode, owner, renderer);
    insertNode(commentNode, parent, anchor, renderer);
}
function mountElement(vnode, parent, anchor, renderer) {
    const { sel, owner, data: { svg }, } = vnode;
    const { createElement } = renderer;
    const namespace = isTrue(svg) ? SVG_NAMESPACE : undefined;
    const elm = (vnode.elm = createElement(sel, namespace));
    linkNodeToShadow(elm, owner, renderer);
    applyStyleScoping(elm, owner, renderer);
    applyDomManual(elm, vnode);
    applyElementRestrictions(elm, vnode);
    patchElementPropsAndAttrs$1(null, vnode, renderer);
    insertNode(elm, parent, anchor, renderer);
    mountVNodes(vnode.children, elm, renderer, null);
}
function patchElement(n1, n2, renderer) {
    const elm = (n2.elm = n1.elm);
    patchElementPropsAndAttrs$1(n1, n2, renderer);
    patchChildren(n1.children, n2.children, elm, renderer);
}
function mountStatic(vnode, parent, anchor, renderer) {
    const { owner } = vnode;
    const { cloneNode, isSyntheticShadowDefined } = renderer;
    const elm = (vnode.elm = cloneNode(vnode.fragment, true));
    linkNodeToShadow(elm, owner, renderer);
    applyElementRestrictions(elm, vnode);
    // Marks this node as Static to propagate the shadow resolver. must happen after elm is assigned to the proper shadow
    const { renderMode, shadowMode } = owner;
    if (isSyntheticShadowDefined) {
        if (shadowMode === 1 /* ShadowMode.Synthetic */ || renderMode === 0 /* RenderMode.Light */) {
            elm[KEY__SHADOW_STATIC] = true;
        }
    }
    insertNode(elm, parent, anchor, renderer);
}
function mountCustomElement(vnode, parent, anchor, renderer) {
    const { sel, owner } = vnode;
    const UpgradableConstructor = getUpgradableConstructor(sel, renderer);
    /**
     * Note: if the upgradable constructor does not expect, or throw when we new it
     * with a callback as the first argument, we could implement a more advanced
     * mechanism that only passes that argument if the constructor is known to be
     * an upgradable custom element.
     */
    let vm;
    const elm = new UpgradableConstructor((elm) => {
        // the custom element from the registry is expecting an upgrade callback
        vm = createViewModelHook(elm, vnode, renderer);
    });
    vnode.elm = elm;
    vnode.vm = vm;
    linkNodeToShadow(elm, owner, renderer);
    applyStyleScoping(elm, owner, renderer);
    if (vm) {
        allocateChildren(vnode, vm);
    }
    else if (vnode.ctor !== UpgradableConstructor) {
        throw new TypeError(`Incorrect Component Constructor`);
    }
    patchElementPropsAndAttrs$1(null, vnode, renderer);
    insertNode(elm, parent, anchor, renderer);
    if (vm) {
        if (process.env.NODE_ENV !== 'production') {
            assert.isTrue(vm.state === 0 /* VMState.created */, `${vm} cannot be recycled.`);
        }
        runConnectedCallback(vm);
    }
    mountVNodes(vnode.children, elm, renderer, null);
    if (vm) {
        appendVM(vm);
    }
}
function patchCustomElement(n1, n2, parent, renderer) {
    if (n1.ctor !== n2.ctor) {
        // If the constructor, unmount the current component and mount a new one using the new
        // constructor.
        const anchor = renderer.nextSibling(n1.elm);
        unmount(n1, parent, renderer, true);
        mountCustomElement(n2, parent, anchor, renderer);
    }
    else {
        // Otherwise patch the existing component with new props/attrs/etc.
        const elm = (n2.elm = n1.elm);
        const vm = (n2.vm = n1.vm);
        patchElementPropsAndAttrs$1(n1, n2, renderer);
        if (!isUndefined$1(vm)) {
            // in fallback mode, the allocation will always set children to
            // empty and delegate the real allocation to the slot elements
            allocateChildren(n2, vm);
        }
        // in fallback mode, the children will be always empty, so, nothing
        // will happen, but in native, it does allocate the light dom
        patchChildren(n1.children, n2.children, elm, renderer);
        if (!isUndefined$1(vm)) {
            // this will probably update the shadowRoot, but only if the vm is in a dirty state
            // this is important to preserve the top to bottom synchronous rendering phase.
            rerenderVM(vm);
        }
    }
}
function mountVNodes(vnodes, parent, renderer, anchor, start = 0, end = vnodes.length) {
    for (; start < end; ++start) {
        const vnode = vnodes[start];
        if (isVNode(vnode)) {
            mount(vnode, parent, renderer, anchor);
        }
    }
}
function unmount(vnode, parent, renderer, doRemove = false) {
    const { type, elm, sel } = vnode;
    // When unmounting a VNode subtree not all the elements have to removed from the DOM. The
    // subtree root, is the only element worth unmounting from the subtree.
    if (doRemove) {
        // The vnode might or might not have a data.renderer associated to it
        // but the removal used here is from the owner instead.
        removeNode(elm, parent, renderer);
    }
    switch (type) {
        case 2 /* VNodeType.Element */: {
            // Slot content is removed to trigger slotchange event when removing slot.
            // Only required for synthetic shadow.
            const shouldRemoveChildren = sel === 'slot' && vnode.owner.shadowMode === 1 /* ShadowMode.Synthetic */;
            unmountVNodes(vnode.children, elm, renderer, shouldRemoveChildren);
            break;
        }
        case 3 /* VNodeType.CustomElement */: {
            const { vm } = vnode;
            // No need to unmount the children here, `removeVM` will take care of removing the
            // children.
            if (!isUndefined$1(vm)) {
                removeVM(vm);
            }
        }
    }
}
function unmountVNodes(vnodes, parent, renderer, doRemove = false, start = 0, end = vnodes.length) {
    for (; start < end; ++start) {
        const ch = vnodes[start];
        if (isVNode(ch)) {
            unmount(ch, parent, renderer, doRemove);
        }
    }
}
function isVNode(vnode) {
    return vnode != null;
}
function linkNodeToShadow(elm, owner, renderer) {
    const { renderRoot, renderMode, shadowMode } = owner;
    const { isSyntheticShadowDefined } = renderer;
    // TODO [#1164]: this should eventually be done by the polyfill directly
    if (isSyntheticShadowDefined) {
        if (shadowMode === 1 /* ShadowMode.Synthetic */ || renderMode === 0 /* RenderMode.Light */) {
            elm[KEY__SHADOW_RESOLVER] = renderRoot[KEY__SHADOW_RESOLVER];
        }
    }
}
function updateTextContent(vnode, renderer) {
    const { elm, text } = vnode;
    const { setText } = renderer;
    if (process.env.NODE_ENV !== 'production') {
        unlockDomMutation();
    }
    setText(elm, text);
    if (process.env.NODE_ENV !== 'production') {
        lockDomMutation();
    }
}
function insertNode(node, parent, anchor, renderer) {
    if (process.env.NODE_ENV !== 'production') {
        unlockDomMutation();
    }
    renderer.insert(node, parent, anchor);
    if (process.env.NODE_ENV !== 'production') {
        lockDomMutation();
    }
}
function removeNode(node, parent, renderer) {
    if (process.env.NODE_ENV !== 'production') {
        unlockDomMutation();
    }
    renderer.remove(node, parent);
    if (process.env.NODE_ENV !== 'production') {
        lockDomMutation();
    }
}
function patchElementPropsAndAttrs$1(oldVnode, vnode, renderer) {
    if (isNull(oldVnode)) {
        applyEventListeners(vnode, renderer);
        applyStaticClassAttribute(vnode, renderer);
        applyStaticStyleAttribute(vnode, renderer);
    }
    // Attrs need to be applied to element before props IE11 will wipe out value on radio inputs if
    // value is set before type=radio.
    patchClassAttribute(oldVnode, vnode, renderer);
    patchStyleAttribute(oldVnode, vnode, renderer);
    patchAttributes(oldVnode, vnode, renderer);
    patchProps(oldVnode, vnode, renderer);
}
function applyStyleScoping(elm, owner, renderer) {
    // Set the class name for `*.scoped.css` style scoping.
    const scopeToken = getScopeTokenClass(owner);
    if (!isNull(scopeToken)) {
        const { getClassList } = renderer;
        // TODO [#2762]: this dot notation with add is probably problematic
        // probably we should have a renderer api for just the add operation
        getClassList(elm).add(scopeToken);
    }
    // Set property element for synthetic shadow DOM style scoping.
    const { stylesheetToken: syntheticToken } = owner.context;
    if (owner.shadowMode === 1 /* ShadowMode.Synthetic */ && !isUndefined$1(syntheticToken)) {
        elm.$shadowToken$ = syntheticToken;
    }
}
function applyDomManual(elm, vnode) {
    var _a;
    const { owner, data: { context }, } = vnode;
    if (owner.shadowMode === 1 /* ShadowMode.Synthetic */ && ((_a = context === null || context === void 0 ? void 0 : context.lwc) === null || _a === void 0 ? void 0 : _a.dom) === "manual" /* LwcDomMode.Manual */) {
        elm.$domManual$ = true;
    }
}
function applyElementRestrictions(elm, vnode) {
    var _a, _b;
    if (process.env.NODE_ENV !== 'production') {
        const isPortal = vnode.type === 2 /* VNodeType.Element */ && ((_b = (_a = vnode.data.context) === null || _a === void 0 ? void 0 : _a.lwc) === null || _b === void 0 ? void 0 : _b.dom) === "manual" /* LwcDomMode.Manual */;
        const isLight = vnode.owner.renderMode === 0 /* RenderMode.Light */;
        patchElementWithRestrictions(elm, {
            isPortal,
            isLight,
        });
    }
}
function allocateChildren(vnode, vm) {
    // A component with slots will re-render because:
    // 1- There is a change of the internal state.
    // 2- There is a change on the external api (ex: slots)
    //
    // In case #1, the vnodes in the cmpSlots will be reused since they didn't changed. This routine emptied the
    // slotted children when those VCustomElement were rendered and therefore in subsequent calls to allocate children
    // in a reused VCustomElement, there won't be any slotted children.
    // For those cases, we will use the reference for allocated children stored when rendering the fresh VCustomElement.
    //
    // In case #2, we will always get a fresh VCustomElement.
    const children = vnode.aChildren || vnode.children;
    vm.aChildren = children;
    const { renderMode, shadowMode } = vm;
    if (shadowMode === 1 /* ShadowMode.Synthetic */ || renderMode === 0 /* RenderMode.Light */) {
        // slow path
        allocateInSlot(vm, children);
        // save the allocated children in case this vnode is reused.
        vnode.aChildren = children;
        // every child vnode is now allocated, and the host should receive none directly, it receives them via the shadow!
        vnode.children = EmptyArray;
    }
}
function createViewModelHook(elm, vnode, renderer) {
    let vm = getAssociatedVMIfPresent(elm);
    // There is a possibility that a custom element is registered under tagName, in which case, the
    // initialization is already carry on, and there is nothing else to do here since this hook is
    // called right after invoking `document.createElement`.
    if (!isUndefined$1(vm)) {
        return vm;
    }
    const { sel, mode, ctor, owner } = vnode;
    vm = createVM(elm, ctor, renderer, {
        mode,
        owner,
        tagName: sel,
    });
    if (process.env.NODE_ENV !== 'production') {
        assert.isTrue(isArray$1(vnode.children), `Invalid vnode for a custom element, it must have children defined.`);
    }
    return vm;
}
function allocateInSlot(vm, children) {
    var _a;
    const { cmpSlots: oldSlots } = vm;
    const cmpSlots = (vm.cmpSlots = create(null));
    for (let i = 0, len = children.length; i < len; i += 1) {
        const vnode = children[i];
        if (isNull(vnode)) {
            continue;
        }
        let slotName = '';
        if (isVBaseElement(vnode)) {
            slotName = ((_a = vnode.data.attrs) === null || _a === void 0 ? void 0 : _a.slot) || '';
        }
        const vnodes = (cmpSlots[slotName] = cmpSlots[slotName] || []);
        ArrayPush$1.call(vnodes, vnode);
    }
    if (isFalse(vm.isDirty)) {
        // We need to determine if the old allocation is really different from the new one
        // and mark the vm as dirty
        const oldKeys = keys(oldSlots);
        if (oldKeys.length !== keys(cmpSlots).length) {
            markComponentAsDirty(vm);
            return;
        }
        for (let i = 0, len = oldKeys.length; i < len; i += 1) {
            const key = oldKeys[i];
            if (isUndefined$1(cmpSlots[key]) || oldSlots[key].length !== cmpSlots[key].length) {
                markComponentAsDirty(vm);
                return;
            }
            const oldVNodes = oldSlots[key];
            const vnodes = cmpSlots[key];
            for (let j = 0, a = cmpSlots[key].length; j < a; j += 1) {
                if (oldVNodes[j] !== vnodes[j]) {
                    markComponentAsDirty(vm);
                    return;
                }
            }
        }
    }
}
// Using a WeakMap instead of a WeakSet because this one works in IE11 :(
const FromIteration = new WeakMap();
// dynamic children means it was generated by an iteration
// in a template, and will require a more complex diffing algo.
function markAsDynamicChildren(children) {
    FromIteration.set(children, 1);
}
function hasDynamicChildren(children) {
    return FromIteration.has(children);
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
    const map = {};
    // TODO [#1637]: simplify this by assuming that all vnodes has keys
    for (let j = beginIdx; j <= endIdx; ++j) {
        const ch = children[j];
        if (isVNode(ch)) {
            const { key } = ch;
            if (key !== undefined) {
                map[key] = j;
            }
        }
    }
    return map;
}
function updateDynamicChildren(oldCh, newCh, parent, renderer) {
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    const newChEnd = newCh.length - 1;
    let newEndIdx = newChEnd;
    let newStartVnode = newCh[0];
    let newEndVnode = newCh[newEndIdx];
    let oldKeyToIdx;
    let idxInOld;
    let elmToMove;
    let before;
    let clonedOldCh = false;
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (!isVNode(oldStartVnode)) {
            oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
        }
        else if (!isVNode(oldEndVnode)) {
            oldEndVnode = oldCh[--oldEndIdx];
        }
        else if (!isVNode(newStartVnode)) {
            newStartVnode = newCh[++newStartIdx];
        }
        else if (!isVNode(newEndVnode)) {
            newEndVnode = newCh[--newEndIdx];
        }
        else if (isSameVnode(oldStartVnode, newStartVnode)) {
            patch(oldStartVnode, newStartVnode, parent, renderer);
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
        }
        else if (isSameVnode(oldEndVnode, newEndVnode)) {
            patch(oldEndVnode, newEndVnode, parent, renderer);
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (isSameVnode(oldStartVnode, newEndVnode)) {
            // Vnode moved right
            patch(oldStartVnode, newEndVnode, parent, renderer);
            insertNode(oldStartVnode.elm, parent, renderer.nextSibling(oldEndVnode.elm), renderer);
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (isSameVnode(oldEndVnode, newStartVnode)) {
            // Vnode moved left
            patch(oldEndVnode, newStartVnode, parent, renderer);
            insertNode(newStartVnode.elm, parent, oldStartVnode.elm, renderer);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
        }
        else {
            if (oldKeyToIdx === undefined) {
                oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
            }
            idxInOld = oldKeyToIdx[newStartVnode.key];
            if (isUndefined$1(idxInOld)) {
                // New element
                mount(newStartVnode, parent, renderer, oldStartVnode.elm);
                newStartVnode = newCh[++newStartIdx];
            }
            else {
                elmToMove = oldCh[idxInOld];
                if (isVNode(elmToMove)) {
                    if (elmToMove.sel !== newStartVnode.sel) {
                        // New element
                        mount(newStartVnode, parent, renderer, oldStartVnode.elm);
                    }
                    else {
                        patch(elmToMove, newStartVnode, parent, renderer);
                        // Delete the old child, but copy the array since it is read-only.
                        // The `oldCh` will be GC'ed after `updateDynamicChildren` is complete,
                        // so we only care about the `oldCh` object inside this function.
                        // To avoid cloning over and over again, we check `clonedOldCh`
                        // and only clone once.
                        if (!clonedOldCh) {
                            clonedOldCh = true;
                            oldCh = [...oldCh];
                        }
                        // We've already cloned at least once, so it's no longer read-only
                        oldCh[idxInOld] = undefined;
                        insertNode(elmToMove.elm, parent, oldStartVnode.elm, renderer);
                    }
                }
                newStartVnode = newCh[++newStartIdx];
            }
        }
    }
    if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
        if (oldStartIdx > oldEndIdx) {
            // There's some cases in which the sub array of vnodes to be inserted is followed by null(s) and an
            // already processed vnode, in such cases the vnodes to be inserted should be before that processed vnode.
            let i = newEndIdx;
            let n;
            do {
                n = newCh[++i];
            } while (!isVNode(n) && i < newChEnd);
            before = isVNode(n) ? n.elm : null;
            mountVNodes(newCh, parent, renderer, before, newStartIdx, newEndIdx + 1);
        }
        else {
            unmountVNodes(oldCh, parent, renderer, true, oldStartIdx, oldEndIdx + 1);
        }
    }
}
function updateStaticChildren(c1, c2, parent, renderer) {
    const c1Length = c1.length;
    const c2Length = c2.length;
    if (c1Length === 0) {
        // the old list is empty, we can directly insert anything new
        mountVNodes(c2, parent, renderer, null);
        return;
    }
    if (c2Length === 0) {
        // the old list is nonempty and the new list is empty so we can directly remove all old nodes
        // this is the case in which the dynamic children of an if-directive should be removed
        unmountVNodes(c1, parent, renderer, true);
        return;
    }
    // if the old list is not empty, the new list MUST have the same
    // amount of nodes, that's why we call this static children
    let anchor = null;
    for (let i = c2Length - 1; i >= 0; i -= 1) {
        const n1 = c1[i];
        const n2 = c2[i];
        if (n2 !== n1) {
            if (isVNode(n1)) {
                if (isVNode(n2)) {
                    // both vnodes are equivalent, and we just need to patch them
                    patch(n1, n2, parent, renderer);
                    anchor = n2.elm;
                }
                else {
                    // removing the old vnode since the new one is null
                    unmount(n1, parent, renderer, true);
                }
            }
            else if (isVNode(n2)) {
                mount(n2, parent, renderer, anchor);
                anchor = n2.elm;
            }
        }
    }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const SymbolIterator = Symbol.iterator;
function addVNodeToChildLWC(vnode) {
    ArrayPush$1.call(getVMBeingRendered().velements, vnode);
}
// [st]atic node
function st(fragment, key) {
    return {
        type: 4 /* VNodeType.Static */,
        sel: undefined,
        key,
        elm: undefined,
        fragment,
        owner: getVMBeingRendered(),
    };
}
// [h]tml node
function h(sel, data, children = EmptyArray) {
    const vmBeingRendered = getVMBeingRendered();
    if (process.env.NODE_ENV !== 'production') {
        assert.isTrue(isString(sel), `h() 1st argument sel must be a string.`);
        assert.isTrue(isObject(data), `h() 2nd argument data must be an object.`);
        assert.isTrue(isArray$1(children), `h() 3rd argument children must be an array.`);
        assert.isTrue('key' in data, ` <${sel}> "key" attribute is invalid or missing for ${vmBeingRendered}. Key inside iterator is either undefined or null.`);
        // checking reserved internal data properties
        assert.isFalse(data.className && data.classMap, `vnode.data.className and vnode.data.classMap ambiguous declaration.`);
        assert.isFalse(data.styleDecls && data.style, `vnode.data.styleDecls and vnode.data.style ambiguous declaration.`);
        if (data.style && !isString(data.style)) {
            logError(`Invalid 'style' attribute passed to <${sel}> is ignored. This attribute must be a string value.`, vmBeingRendered);
        }
        forEach.call(children, (childVnode) => {
            if (childVnode != null) {
                assert.isTrue('type' in childVnode &&
                    'sel' in childVnode &&
                    'elm' in childVnode &&
                    'key' in childVnode, `${childVnode} is not a vnode.`);
            }
        });
    }
    let elm;
    const { key } = data;
    return {
        type: 2 /* VNodeType.Element */,
        sel,
        data,
        children,
        elm,
        key,
        owner: vmBeingRendered,
    };
}
// [t]ab[i]ndex function
function ti(value) {
    // if value is greater than 0, we normalize to 0
    // If value is an invalid tabIndex value (null, undefined, string, etc), we let that value pass through
    // If value is less than -1, we don't care
    const shouldNormalize = value > 0 && !(isTrue(value) || isFalse(value));
    if (process.env.NODE_ENV !== 'production') {
        const vmBeingRendered = getVMBeingRendered();
        if (shouldNormalize) {
            logError(`Invalid tabindex value \`${toString$1(value)}\` in template for ${vmBeingRendered}. This attribute must be set to 0 or -1.`, vmBeingRendered);
        }
    }
    return shouldNormalize ? 0 : value;
}
// [s]lot element node
function s(slotName, data, children, slotset) {
    if (process.env.NODE_ENV !== 'production') {
        assert.isTrue(isString(slotName), `s() 1st argument slotName must be a string.`);
        assert.isTrue(isObject(data), `s() 2nd argument data must be an object.`);
        assert.isTrue(isArray$1(children), `h() 3rd argument children must be an array.`);
    }
    if (!isUndefined$1(slotset) &&
        !isUndefined$1(slotset[slotName]) &&
        slotset[slotName].length !== 0) {
        children = slotset[slotName];
    }
    const vmBeingRendered = getVMBeingRendered();
    const { renderMode, shadowMode } = vmBeingRendered;
    if (renderMode === 0 /* RenderMode.Light */) {
        sc(children);
        return children;
    }
    if (shadowMode === 1 /* ShadowMode.Synthetic */) {
        // TODO [#1276]: compiler should give us some sort of indicator when a vnodes collection is dynamic
        sc(children);
    }
    return h('slot', data, children);
}
// [c]ustom element node
function c(sel, Ctor, data, children = EmptyArray) {
    const vmBeingRendered = getVMBeingRendered();
    if (process.env.NODE_ENV !== 'production') {
        assert.isTrue(isString(sel), `c() 1st argument sel must be a string.`);
        assert.isTrue(isFunction$1(Ctor), `c() 2nd argument Ctor must be a function.`);
        assert.isTrue(isObject(data), `c() 3nd argument data must be an object.`);
        assert.isTrue(arguments.length === 3 || isArray$1(children), `c() 4nd argument data must be an array.`);
        // checking reserved internal data properties
        assert.isFalse(data.className && data.classMap, `vnode.data.className and vnode.data.classMap ambiguous declaration.`);
        assert.isFalse(data.styleDecls && data.style, `vnode.data.styleDecls and vnode.data.style ambiguous declaration.`);
        if (data.style && !isString(data.style)) {
            logError(`Invalid 'style' attribute passed to <${sel}> is ignored. This attribute must be a string value.`, vmBeingRendered);
        }
        if (arguments.length === 4) {
            forEach.call(children, (childVnode) => {
                if (childVnode != null) {
                    assert.isTrue('type' in childVnode &&
                        'sel' in childVnode &&
                        'elm' in childVnode &&
                        'key' in childVnode, `${childVnode} is not a vnode.`);
                }
            });
        }
    }
    const { key } = data;
    let elm, aChildren, vm;
    const vnode = {
        type: 3 /* VNodeType.CustomElement */,
        sel,
        data,
        children,
        elm,
        key,
        ctor: Ctor,
        owner: vmBeingRendered,
        mode: 'open',
        aChildren,
        vm,
    };
    addVNodeToChildLWC(vnode);
    return vnode;
}
// [i]terable node
function i(iterable, factory) {
    const list = [];
    // TODO [#1276]: compiler should give us some sort of indicator when a vnodes collection is dynamic
    sc(list);
    const vmBeingRendered = getVMBeingRendered();
    if (isUndefined$1(iterable) || iterable === null) {
        if (process.env.NODE_ENV !== 'production') {
            logError(`Invalid template iteration for value "${toString$1(iterable)}" in ${vmBeingRendered}. It must be an Array or an iterable Object.`, vmBeingRendered);
        }
        return list;
    }
    if (process.env.NODE_ENV !== 'production') {
        assert.isFalse(isUndefined$1(iterable[SymbolIterator]), `Invalid template iteration for value \`${toString$1(iterable)}\` in ${vmBeingRendered}. It must be an array-like object and not \`null\` nor \`undefined\`.`);
    }
    const iterator = iterable[SymbolIterator]();
    if (process.env.NODE_ENV !== 'production') {
        assert.isTrue(iterator && isFunction$1(iterator.next), `Invalid iterator function for "${toString$1(iterable)}" in ${vmBeingRendered}.`);
    }
    let next = iterator.next();
    let j = 0;
    let { value, done: last } = next;
    let keyMap;
    let iterationError;
    if (process.env.NODE_ENV !== 'production') {
        keyMap = create(null);
    }
    while (last === false) {
        // implementing a look-back-approach because we need to know if the element is the last
        next = iterator.next();
        last = next.done;
        // template factory logic based on the previous collected value
        const vnode = factory(value, j, j === 0, last === true);
        if (isArray$1(vnode)) {
            ArrayPush$1.apply(list, vnode);
        }
        else {
            ArrayPush$1.call(list, vnode);
        }
        if (process.env.NODE_ENV !== 'production') {
            const vnodes = isArray$1(vnode) ? vnode : [vnode];
            forEach.call(vnodes, (childVnode) => {
                if (!isNull(childVnode) && isObject(childVnode) && !isUndefined$1(childVnode.sel)) {
                    const { key } = childVnode;
                    if (isString(key) || isNumber(key)) {
                        if (keyMap[key] === 1 && isUndefined$1(iterationError)) {
                            iterationError = `Duplicated "key" attribute value for "<${childVnode.sel}>" in ${vmBeingRendered} for item number ${j}. A key with value "${childVnode.key}" appears more than once in the iteration. Key values must be unique numbers or strings.`;
                        }
                        keyMap[key] = 1;
                    }
                    else if (isUndefined$1(iterationError)) {
                        iterationError = `Invalid "key" attribute value in "<${childVnode.sel}>" in ${vmBeingRendered} for item number ${j}. Set a unique "key" value on all iterated child elements.`;
                    }
                }
            });
        }
        // preparing next value
        j += 1;
        value = next.value;
    }
    if (process.env.NODE_ENV !== 'production') {
        if (!isUndefined$1(iterationError)) {
            logError(iterationError, vmBeingRendered);
        }
    }
    return list;
}
/**
 * [f]lattening
 */
function f(items) {
    if (process.env.NODE_ENV !== 'production') {
        assert.isTrue(isArray$1(items), 'flattening api can only work with arrays.');
    }
    const len = items.length;
    const flattened = [];
    // TODO [#1276]: compiler should give us some sort of indicator when a vnodes collection is dynamic
    sc(flattened);
    for (let j = 0; j < len; j += 1) {
        const item = items[j];
        if (isArray$1(item)) {
            ArrayPush$1.apply(flattened, item);
        }
        else {
            ArrayPush$1.call(flattened, item);
        }
    }
    return flattened;
}
// [t]ext node
function t(text) {
    let sel, key, elm;
    return {
        type: 0 /* VNodeType.Text */,
        sel,
        text,
        elm,
        key,
        owner: getVMBeingRendered(),
    };
}
// [co]mment node
function co(text) {
    let sel, key, elm;
    return {
        type: 1 /* VNodeType.Comment */,
        sel,
        text,
        elm,
        key,
        owner: getVMBeingRendered(),
    };
}
// [d]ynamic text
function d(value) {
    return value == null ? '' : String(value);
}
// [b]ind function
function b(fn) {
    const vmBeingRendered = getVMBeingRendered();
    if (isNull(vmBeingRendered)) {
        throw new Error();
    }
    const vm = vmBeingRendered;
    return function (event) {
        invokeEventListener(vm, fn, vm.component, event);
    };
}
// [k]ey function
function k(compilerKey, obj) {
    switch (typeof obj) {
        case 'number':
        case 'string':
            return compilerKey + ':' + obj;
        case 'object':
            if (process.env.NODE_ENV !== 'production') {
                assert.fail(`Invalid key value "${obj}" in ${getVMBeingRendered()}. Key must be a string or number.`);
            }
    }
}
// [g]lobal [id] function
function gid(id) {
    const vmBeingRendered = getVMBeingRendered();
    if (isUndefined$1(id) || id === '') {
        if (process.env.NODE_ENV !== 'production') {
            logError(`Invalid id value "${id}". The id attribute must contain a non-empty string.`, vmBeingRendered);
        }
        return id;
    }
    // We remove attributes when they are assigned a value of null
    if (isNull(id)) {
        return null;
    }
    const { idx, shadowMode } = vmBeingRendered;
    if (shadowMode === 1 /* ShadowMode.Synthetic */) {
        return StringReplace.call(id, /\S+/g, (id) => `${id}-${idx}`);
    }
    return id;
}
// [f]ragment [id] function
function fid(url) {
    const vmBeingRendered = getVMBeingRendered();
    if (isUndefined$1(url) || url === '') {
        if (process.env.NODE_ENV !== 'production') {
            if (isUndefined$1(url)) {
                logError(`Undefined url value for "href" or "xlink:href" attribute. Expected a non-empty string.`, vmBeingRendered);
            }
        }
        return url;
    }
    // We remove attributes when they are assigned a value of null
    if (isNull(url)) {
        return null;
    }
    const { idx, shadowMode } = vmBeingRendered;
    // Apply transformation only for fragment-only-urls, and only in shadow DOM
    if (shadowMode === 1 /* ShadowMode.Synthetic */ && /^#/.test(url)) {
        return `${url}-${idx}`;
    }
    return url;
}
/**
 * create a dynamic component via `<x-foo lwc:dynamic={Ctor}>`
 */
function dc(sel, Ctor, data, children = EmptyArray) {
    if (process.env.NODE_ENV !== 'production') {
        assert.isTrue(isString(sel), `dc() 1st argument sel must be a string.`);
        assert.isTrue(isObject(data), `dc() 3nd argument data must be an object.`);
        assert.isTrue(arguments.length === 3 || isArray$1(children), `dc() 4nd argument data must be an array.`);
    }
    // null or undefined values should produce a null value in the VNodes
    if (Ctor == null) {
        return null;
    }
    if (!isComponentConstructor(Ctor)) {
        throw new Error(`Invalid LWC Constructor ${toString$1(Ctor)} for custom element <${sel}>.`);
    }
    return c(sel, Ctor, data, children);
}
/**
 * slow children collection marking mechanism. this API allows the compiler to signal
 * to the engine that a particular collection of children must be diffed using the slow
 * algo based on keys due to the nature of the list. E.g.:
 *
 *   - slot element's children: the content of the slot has to be dynamic when in synthetic
 *                              shadow mode because the `vnode.children` might be the slotted
 *                              content vs default content, in which case the size and the
 *                              keys are not matching.
 *   - children that contain dynamic components
 *   - children that are produced by iteration
 *
 */
function sc(vnodes) {
    if (process.env.NODE_ENV !== 'production') {
        assert.isTrue(isArray$1(vnodes), 'sc() api can only work with arrays.');
    }
    // We have to mark the vnodes collection as dynamic so we can later on
    // choose to use the snabbdom virtual dom diffing algo instead of our
    // static dummy algo.
    markAsDynamicChildren(vnodes);
    return vnodes;
}
/**
 * EXPERIMENTAL: This function acts like a hook for Lightning Locker Service and other similar
 * libraries to sanitize HTML content. This hook process the content passed via the template to
 * lwc:inner-html directive.
 * It is meant to be overridden with setSanitizeHtmlContentHook, it throws an error by default.
 */
let sanitizeHtmlContentHook = () => {
    // locker-service patches this function during runtime to sanitize HTML content.
    throw new Error('sanitizeHtmlContent hook must be implemented.');
};
/**
 * Sets the sanitizeHtmlContentHook.
 */
function setSanitizeHtmlContentHook(newHookImpl) {
    sanitizeHtmlContentHook = newHookImpl;
}
// [s]anitize [h]tml [c]ontent
function shc(content) {
    return sanitizeHtmlContentHook(content);
}
const api = freeze({
    s,
    h,
    c,
    i,
    f,
    t,
    d,
    b,
    k,
    co,
    dc,
    ti,
    st,
    gid,
    fid,
    shc,
});

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const operationIdNameMapping = [
    'constructor',
    'render',
    'patch',
    'connectedCallback',
    'renderedCallback',
    'disconnectedCallback',
    'errorCallback',
    'lwc-hydrate',
    'lwc-rehydrate',
];
// Even if all the browser the engine supports implements the UserTiming API, we need to guard the measure APIs.
// JSDom (used in Jest) for example doesn't implement the UserTiming APIs.
const isUserTimingSupported = typeof performance !== 'undefined' &&
    typeof performance.mark === 'function' &&
    typeof performance.clearMarks === 'function' &&
    typeof performance.measure === 'function' &&
    typeof performance.clearMeasures === 'function';
const start = !isUserTimingSupported
    ? noop
    : (markName) => {
        performance.mark(markName);
    };
const end = !isUserTimingSupported
    ? noop
    : (measureName, markName) => {
        performance.measure(measureName, markName);
        // Clear the created marks and measure to avoid filling the performance entries buffer.
        // Note: Even if the entries get deleted, existing PerformanceObservers preserve a copy of those entries.
        performance.clearMarks(markName);
        performance.clearMeasures(measureName);
    };
function getOperationName(opId) {
    return operationIdNameMapping[opId];
}
function getMeasureName(opId, vm) {
    return `${getComponentTag(vm)} - ${getOperationName(opId)}`;
}
function getMarkName(opId, vm) {
    // Adding the VM idx to the mark name creates a unique mark name component instance. This is necessary to produce
    // the right measures for components that are recursive.
    return `${getMeasureName(opId, vm)} - ${vm.idx}`;
}
/** Indicates if operations should be logged via the User Timing API. */
const isMeasureEnabled = process.env.NODE_ENV !== 'production';
function logOperationStart(opId, vm) {
    if (isMeasureEnabled) {
        const markName = getMarkName(opId, vm);
        start(markName);
    }
}
function logOperationEnd(opId, vm) {
    if (isMeasureEnabled) {
        const markName = getMarkName(opId, vm);
        const measureName = getMeasureName(opId, vm);
        end(measureName, markName);
    }
}
function logGlobalOperationStart(opId, vm) {
    if (isMeasureEnabled) {
        const opName = getOperationName(opId);
        const markName = isUndefined$1(vm) ? opName : getMarkName(opId, vm);
        start(markName);
    }
}
function logGlobalOperationEnd(opId, vm) {
    if (isMeasureEnabled) {
        const opName = getOperationName(opId);
        const markName = isUndefined$1(vm) ? opName : getMarkName(opId, vm);
        end(opName, markName);
    }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
let isUpdatingTemplate = false;
let vmBeingRendered = null;
function getVMBeingRendered() {
    return vmBeingRendered;
}
function setVMBeingRendered(vm) {
    vmBeingRendered = vm;
}
function validateSlots(vm, html) {
    if (process.env.NODE_ENV === 'production') {
        // this method should never leak to prod
        throw new ReferenceError();
    }
    const { cmpSlots } = vm;
    const { slots = EmptyArray } = html;
    for (const slotName in cmpSlots) {
        // eslint-disable-next-line @lwc/lwc-internal/no-production-assert
        assert.isTrue(isArray$1(cmpSlots[slotName]), `Slots can only be set to an array, instead received ${toString$1(cmpSlots[slotName])} for slot "${slotName}" in ${vm}.`);
        if (slotName !== '' && ArrayIndexOf.call(slots, slotName) === -1) {
            // TODO [#1297]: this should never really happen because the compiler should always validate
            // eslint-disable-next-line @lwc/lwc-internal/no-production-assert
            logError(`Ignoring unknown provided slot name "${slotName}" in ${vm}. Check for a typo on the slot attribute.`, vm);
        }
    }
}
function validateLightDomTemplate(template, vm) {
    if (template === defaultEmptyTemplate)
        return;
    if (vm.renderMode === 0 /* RenderMode.Light */) {
        assert.isTrue(template.renderMode === 'light', `Light DOM components can't render shadow DOM templates. Add an 'lwc:render-mode="light"' directive to the root template tag of ${getComponentTag(vm)}.`);
    }
    else {
        assert.isTrue(isUndefined$1(template.renderMode), `Shadow DOM components template can't render light DOM templates. Either remove the 'lwc:render-mode' directive from ${getComponentTag(vm)} or set it to 'lwc:render-mode="shadow"`);
    }
}
function buildParseFragmentFn(createFragmentFn) {
    return (strings, ...keys) => {
        const cache = create(null);
        return function () {
            const { context: { hasScopedStyles, stylesheetToken }, shadowMode, renderer, } = getVMBeingRendered();
            const hasStyleToken = !isUndefined$1(stylesheetToken);
            const isSyntheticShadow = shadowMode === 1 /* ShadowMode.Synthetic */;
            let cacheKey = 0;
            if (hasStyleToken && hasScopedStyles) {
                cacheKey |= 1 /* FragmentCache.HAS_SCOPED_STYLE */;
            }
            if (hasStyleToken && isSyntheticShadow) {
                cacheKey |= 2 /* FragmentCache.SHADOW_MODE_SYNTHETIC */;
            }
            if (!isUndefined$1(cache[cacheKey])) {
                return cache[cacheKey];
            }
            const classToken = hasScopedStyles && hasStyleToken ? ' ' + stylesheetToken : '';
            const classAttrToken = hasScopedStyles && hasStyleToken ? ` class="${stylesheetToken}"` : '';
            const attrToken = hasStyleToken && isSyntheticShadow ? ' ' + stylesheetToken : '';
            let htmlFragment = '';
            for (let i = 0, n = keys.length; i < n; i++) {
                switch (keys[i]) {
                    case 0: // styleToken in existing class attr
                        htmlFragment += strings[i] + classToken;
                        break;
                    case 1: // styleToken for added class attr
                        htmlFragment += strings[i] + classAttrToken;
                        break;
                    case 2: // styleToken as attr
                        htmlFragment += strings[i] + attrToken;
                        break;
                    case 3: // ${1}${2}
                        htmlFragment += strings[i] + classAttrToken + attrToken;
                        break;
                }
            }
            htmlFragment += strings[strings.length - 1];
            cache[cacheKey] = createFragmentFn(htmlFragment, renderer);
            return cache[cacheKey];
        };
    };
}
// Note: at the moment this code executes, we don't have a renderer yet.
const parseFragment = buildParseFragmentFn((html, renderer) => {
    const { createFragment } = renderer;
    return createFragment(html);
});
function evaluateTemplate(vm, html) {
    if (process.env.NODE_ENV !== 'production') {
        assert.isTrue(isFunction$1(html), `evaluateTemplate() second argument must be an imported template instead of ${toString$1(html)}`);
        // in dev-mode, we support hot swapping of templates, which means that
        // the component instance might be attempting to use an old version of
        // the template, while internally, we have a replacement for it.
        html = getTemplateOrSwappedTemplate(html);
    }
    const isUpdatingTemplateInception = isUpdatingTemplate;
    const vmOfTemplateBeingUpdatedInception = vmBeingRendered;
    let vnodes = [];
    runWithBoundaryProtection(vm, vm.owner, () => {
        // pre
        vmBeingRendered = vm;
        logOperationStart(1 /* OperationId.Render */, vm);
    }, () => {
        // job
        const { component, context, cmpSlots, cmpTemplate, tro } = vm;
        tro.observe(() => {
            // Reset the cache memoizer for template when needed.
            if (html !== cmpTemplate) {
                if (process.env.NODE_ENV !== 'production') {
                    validateLightDomTemplate(html, vm);
                }
                // Perf opt: do not reset the shadow root during the first rendering (there is
                // nothing to reset).
                if (!isNull(cmpTemplate)) {
                    // It is important to reset the content to avoid reusing similar elements
                    // generated from a different template, because they could have similar IDs,
                    // and snabbdom just rely on the IDs.
                    resetComponentRoot(vm);
                }
                // Check that the template was built by the compiler.
                if (!isTemplateRegistered(html)) {
                    throw new TypeError(`Invalid template returned by the render() method on ${vm}. It must return an imported template (e.g.: \`import html from "./${vm.def.name}.html"\`), instead, it has returned: ${toString$1(html)}.`);
                }
                vm.cmpTemplate = html;
                // Create a brand new template cache for the swapped templated.
                context.tplCache = create(null);
                // Set the computeHasScopedStyles property in the context, to avoid recomputing it repeatedly.
                context.hasScopedStyles = computeHasScopedStyles(html);
                // Update the scoping token on the host element.
                updateStylesheetToken(vm, html);
                // Evaluate, create stylesheet and cache the produced VNode for future
                // re-rendering.
                const stylesheetsContent = getStylesheetsContent(vm, html);
                context.styleVNodes =
                    stylesheetsContent.length === 0
                        ? null
                        : createStylesheet(vm, stylesheetsContent);
            }
            if (process.env.NODE_ENV !== 'production') {
                // validating slots in every rendering since the allocated content might change over time
                validateSlots(vm, html);
                // add the VM to the list of host VMs that can be re-rendered if html is swapped
                setActiveVM(vm);
            }
            // right before producing the vnodes, we clear up all internal references
            // to custom elements from the template.
            vm.velements = [];
            // Set the global flag that template is being updated
            isUpdatingTemplate = true;
            vnodes = html.call(undefined, api, component, cmpSlots, context.tplCache);
            const { styleVNodes } = context;
            if (!isNull(styleVNodes)) {
                ArrayUnshift.apply(vnodes, styleVNodes);
            }
        });
    }, () => {
        // post
        isUpdatingTemplate = isUpdatingTemplateInception;
        vmBeingRendered = vmOfTemplateBeingUpdatedInception;
        logOperationEnd(1 /* OperationId.Render */, vm);
    });
    if (process.env.NODE_ENV !== 'production') {
        assert.invariant(isArray$1(vnodes), `Compiler should produce html functions that always return an array.`);
    }
    return vnodes;
}
function computeHasScopedStyles(template) {
    const { stylesheets } = template;
    if (!isUndefined$1(stylesheets)) {
        for (let i = 0; i < stylesheets.length; i++) {
            if (isTrue(stylesheets[i][KEY__SCOPED_CSS])) {
                return true;
            }
        }
    }
    return false;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
let isInvokingRender = false;
let vmBeingConstructed = null;
function isBeingConstructed(vm) {
    return vmBeingConstructed === vm;
}
function invokeComponentCallback(vm, fn, args) {
    const { component, callHook, owner } = vm;
    runWithBoundaryProtection(vm, owner, noop, () => {
        callHook(component, fn, args);
    }, noop);
}
function invokeComponentConstructor(vm, Ctor) {
    const vmBeingConstructedInception = vmBeingConstructed;
    let error;
    logOperationStart(0 /* OperationId.Constructor */, vm);
    vmBeingConstructed = vm;
    /**
     * Constructors don't need to be wrapped with a boundary because for root elements
     * it should throw, while elements from template are already wrapped by a boundary
     * associated to the diffing algo.
     */
    try {
        // job
        const result = new Ctor();
        // Check indirectly if the constructor result is an instance of LightningElement. Using
        // the "instanceof" operator would not work here since Locker Service provides its own
        // implementation of LightningElement, so we indirectly check if the base constructor is
        // invoked by accessing the component on the vm.
        if (vmBeingConstructed.component !== result) {
            throw new TypeError('Invalid component constructor, the class should extend LightningElement.');
        }
    }
    catch (e) {
        error = Object(e);
    }
    finally {
        logOperationEnd(0 /* OperationId.Constructor */, vm);
        vmBeingConstructed = vmBeingConstructedInception;
        if (!isUndefined$1(error)) {
            addErrorComponentStack(vm, error);
            // re-throwing the original error annotated after restoring the context
            throw error; // eslint-disable-line no-unsafe-finally
        }
    }
}
function invokeComponentRenderMethod(vm) {
    const { def: { render }, callHook, component, owner, } = vm;
    const isRenderBeingInvokedInception = isInvokingRender;
    const vmBeingRenderedInception = getVMBeingRendered();
    let html;
    let renderInvocationSuccessful = false;
    runWithBoundaryProtection(vm, owner, () => {
        // pre
        isInvokingRender = true;
        setVMBeingRendered(vm);
    }, () => {
        // job
        vm.tro.observe(() => {
            html = callHook(component, render);
            renderInvocationSuccessful = true;
        });
    }, () => {
        // post
        isInvokingRender = isRenderBeingInvokedInception;
        setVMBeingRendered(vmBeingRenderedInception);
    });
    // If render() invocation failed, process errorCallback in boundary and return an empty template
    return renderInvocationSuccessful ? evaluateTemplate(vm, html) : [];
}
function invokeEventListener(vm, fn, thisValue, event) {
    const { callHook, owner } = vm;
    runWithBoundaryProtection(vm, owner, noop, () => {
        // job
        if (process.env.NODE_ENV !== 'production') {
            assert.isTrue(isFunction$1(fn), `Invalid event handler for event '${event.type}' on ${vm}.`);
        }
        callHook(thisValue, fn, [event]);
    }, noop);
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const signedTemplateMap = new Map();
/**
 * INTERNAL: This function can only be invoked by compiled code. The compiler
 * will prevent this function from being imported by userland code.
 */
function registerComponent(
// We typically expect a LightningElementConstructor, but technically you can call this with anything
Ctor, { tmpl }) {
    if (isFunction$1(Ctor)) {
        if (process.env.NODE_ENV !== 'production') {
            checkVersionMismatch(Ctor, 'component');
        }
        signedTemplateMap.set(Ctor, tmpl);
    }
    // chaining this method as a way to wrap existing assignment of component constructor easily,
    // without too much transformation
    return Ctor;
}
function getComponentRegisteredTemplate(Ctor) {
    return signedTemplateMap.get(Ctor);
}
function getTemplateReactiveObserver(vm) {
    return createReactiveObserver();
}
function renderComponent$1(vm) {
    if (process.env.NODE_ENV !== 'production') {
        assert.invariant(vm.isDirty, `${vm} is not dirty.`);
    }
    vm.tro.reset();
    const vnodes = invokeComponentRenderMethod(vm);
    vm.isDirty = false;
    vm.isScheduled = false;
    return vnodes;
}
function markComponentAsDirty(vm) {
    if (process.env.NODE_ENV !== 'production') {
        const vmBeingRendered = getVMBeingRendered();
        assert.isFalse(vm.isDirty, `markComponentAsDirty() for ${vm} should not be called when the component is already dirty.`);
        assert.isFalse(isInvokingRender, `markComponentAsDirty() for ${vm} cannot be called during rendering of ${vmBeingRendered}.`);
        assert.isFalse(isUpdatingTemplate, `markComponentAsDirty() for ${vm} cannot be called while updating template of ${vmBeingRendered}.`);
    }
    vm.isDirty = true;
}
const cmpEventListenerMap = new WeakMap();
function getWrappedComponentsListener(vm, listener) {
    if (!isFunction$1(listener)) {
        throw new TypeError(); // avoiding problems with non-valid listeners
    }
    let wrappedListener = cmpEventListenerMap.get(listener);
    if (isUndefined$1(wrappedListener)) {
        wrappedListener = function (event) {
            invokeEventListener(vm, listener, undefined, event);
        };
        cmpEventListenerMap.set(listener, wrappedListener);
    }
    return wrappedListener;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const Services = create(null);
const hooks = ['rendered', 'connected', 'disconnected'];
/**
 * EXPERIMENTAL: This function allows for the registration of "services"
 * in LWC by exposing hooks into the component life-cycle. This API is
 * subject to change or being removed.
 */
function register(service) {
    if (process.env.NODE_ENV !== 'production') {
        assert.isTrue(isObject(service), `Invalid service declaration, ${service}: service must be an object`);
    }
    for (let i = 0; i < hooks.length; ++i) {
        const hookName = hooks[i];
        if (hookName in service) {
            let l = Services[hookName];
            if (isUndefined$1(l)) {
                Services[hookName] = l = [];
            }
            ArrayPush$1.call(l, service[hookName]);
        }
    }
}
function invokeServiceHook(vm, cbs) {
    if (process.env.NODE_ENV !== 'production') {
        assert.isTrue(isArray$1(cbs) && cbs.length > 0, `Optimize invokeServiceHook() to be invoked only when needed`);
    }
    const { component, def, context } = vm;
    for (let i = 0, len = cbs.length; i < len; ++i) {
        cbs[i].call(undefined, component, {}, def, context);
    }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
let idx = 0;
/** The internal slot used to associate different objects the engine manipulates with the VM */

const ViewModelReflection = new WeakMap();

function callHook(cmp, fn, args = []) {
  return fn.apply(cmp, args);
}

function setHook(cmp, prop, newValue) {
  cmp[prop] = newValue;
}

function getHook(cmp, prop) {
  return cmp[prop];
}

function rerenderVM(vm) {
  rehydrate(vm);
}
function connectRootElement(elm) {
  const vm = getAssociatedVM(elm);
  logGlobalOperationStart(7
  /* OperationId.GlobalHydrate */
  , vm); // Usually means moving the element from one place to another, which is observable via
  // life-cycle hooks.

  if (vm.state === 1
  /* VMState.connected */
  ) {
    disconnectRootElement(elm);
  }

  runConnectedCallback(vm);
  rehydrate(vm);
  logGlobalOperationEnd(7
  /* OperationId.GlobalHydrate */
  , vm);
}
function disconnectRootElement(elm) {
  const vm = getAssociatedVM(elm);
  resetComponentStateWhenRemoved(vm);
}
function appendVM(vm) {
  rehydrate(vm);
} // just in case the component comes back, with this we guarantee re-rendering it
// while preventing any attempt to rehydration until after reinsertion.

function resetComponentStateWhenRemoved(vm) {
  const {
    state
  } = vm;

  if (state !== 2
  /* VMState.disconnected */
  ) {
    const {
      oar,
      tro
    } = vm; // Making sure that any observing record will not trigger the rehydrated on this vm

    tro.reset(); // Making sure that any observing accessor record will not trigger the setter to be reinvoked

    for (const key in oar) {
      oar[key].reset();
    }

    runDisconnectedCallback(vm); // Spec: https://dom.spec.whatwg.org/#concept-node-remove (step 14-15)

    runChildNodesDisconnectedCallback(vm);
    runLightChildNodesDisconnectedCallback(vm);
  }

  if (process.env.NODE_ENV !== 'production') {
    removeActiveVM(vm);
  }
} // this method is triggered by the diffing algo only when a vnode from the
// old vnode.children is removed from the DOM.


function removeVM(vm) {
  if (process.env.NODE_ENV !== 'production') {
    assert.isTrue(vm.state === 1
    /* VMState.connected */
    || vm.state === 2
    /* VMState.disconnected */
    , `${vm} must have been connected.`);
  }

  resetComponentStateWhenRemoved(vm);
}

function getNearestShadowAncestor(vm) {
  let ancestor = vm.owner;

  while (!isNull(ancestor) && ancestor.renderMode === 0
  /* RenderMode.Light */
  ) {
    ancestor = ancestor.owner;
  }

  return ancestor;
}

function createVM(elm, ctor, renderer, options) {
  const {
    mode,
    owner,
    tagName,
    hydrated
  } = options;
  const def = getComponentInternalDef(ctor);
  const vm = {
    elm,
    def,
    idx: idx++,
    state: 0
    /* VMState.created */
    ,
    isScheduled: false,
    isDirty: true,
    tagName,
    mode,
    owner,
    children: EmptyArray,
    aChildren: EmptyArray,
    velements: EmptyArray,
    cmpProps: create(null),
    cmpFields: create(null),
    cmpSlots: create(null),
    oar: create(null),
    cmpTemplate: null,
    hydrated: Boolean(hydrated),
    renderMode: def.renderMode,
    context: {
      stylesheetToken: undefined,
      hasTokenInClass: undefined,
      hasTokenInAttribute: undefined,
      hasScopedStyles: undefined,
      styleVNodes: null,
      tplCache: EmptyObject,
      wiredConnecting: EmptyArray,
      wiredDisconnecting: EmptyArray
    },
    // Properties set right after VM creation.
    tro: null,
    shadowMode: null,
    // Properties set by the LightningElement constructor.
    component: null,
    shadowRoot: null,
    renderRoot: null,
    callHook,
    setHook,
    getHook,
    renderer
  };
  vm.shadowMode = computeShadowMode(vm, renderer);
  vm.tro = getTemplateReactiveObserver();

  if (process.env.NODE_ENV !== 'production') {
    vm.toString = () => {
      return `[object:vm ${def.name} (${vm.idx})]`;
    };

    if (runtimeFlags.ENABLE_FORCE_NATIVE_SHADOW_MODE_FOR_TEST) {
      vm.shadowMode = 0
      /* ShadowMode.Native */
      ;
    }
  } // Create component instance associated to the vm and the element.


  invokeComponentConstructor(vm, def.ctor); // Initializing the wire decorator per instance only when really needed

  if (hasWireAdapters(vm)) {
    installWireAdapters(vm);
  }

  return vm;
}

function computeShadowMode(vm, renderer) {
  const {
    def
  } = vm;
  const {
    isSyntheticShadowDefined,
    isNativeShadowDefined
  } = renderer;
  let shadowMode;

  if (isSyntheticShadowDefined) {
    if (def.renderMode === 0
    /* RenderMode.Light */
    ) {
      // ShadowMode.Native implies "not synthetic shadow" which is consistent with how
      // everything defaults to native when the synthetic shadow polyfill is unavailable.
      shadowMode = 0
      /* ShadowMode.Native */
      ;
    } else if (isNativeShadowDefined) {
      // Not combined with above condition because @lwc/features only supports identifiers in
      // the if-condition.
      if (runtimeFlags.ENABLE_MIXED_SHADOW_MODE) {
        if (def.shadowSupportMode === "any"
        /* ShadowSupportMode.Any */
        ) {
          shadowMode = 0
          /* ShadowMode.Native */
          ;
        } else {
          const shadowAncestor = getNearestShadowAncestor(vm);

          if (!isNull(shadowAncestor) && shadowAncestor.shadowMode === 0
          /* ShadowMode.Native */
          ) {
            // Transitive support for native Shadow DOM. A component in native mode
            // transitively opts all of its descendants into native.
            shadowMode = 0
            /* ShadowMode.Native */
            ;
          } else {
            // Synthetic if neither this component nor any of its ancestors are configured
            // to be native.
            shadowMode = 1
            /* ShadowMode.Synthetic */
            ;
          }
        }
      } else {
        shadowMode = 1
        /* ShadowMode.Synthetic */
        ;
      }
    } else {
      // Synthetic if there is no native Shadow DOM support.
      shadowMode = 1
      /* ShadowMode.Synthetic */
      ;
    }
  } else {
    // Native if the synthetic shadow polyfill is unavailable.
    shadowMode = 0
    /* ShadowMode.Native */
    ;
  }

  return shadowMode;
}

function assertIsVM(obj) {
  if (isNull(obj) || !isObject(obj) || !('renderRoot' in obj)) {
    throw new TypeError(`${obj} is not a VM.`);
  }
}

function associateVM(obj, vm) {
  ViewModelReflection.set(obj, vm);
}
function getAssociatedVM(obj) {
  const vm = ViewModelReflection.get(obj);

  if (process.env.NODE_ENV !== 'production') {
    assertIsVM(vm);
  }

  return vm;
}
function getAssociatedVMIfPresent(obj) {
  const maybeVm = ViewModelReflection.get(obj);

  if (process.env.NODE_ENV !== 'production') {
    if (!isUndefined$1(maybeVm)) {
      assertIsVM(maybeVm);
    }
  }

  return maybeVm;
}

function rehydrate(vm) {
  if (isTrue(vm.isDirty)) {
    const children = renderComponent$1(vm);
    patchShadowRoot(vm, children);
  }
}

function patchShadowRoot(vm, newCh) {
  const {
    renderRoot,
    children: oldCh,
    renderer
  } = vm; // caching the new children collection

  vm.children = newCh;

  if (newCh.length > 0 || oldCh.length > 0) {
    // patch function mutates vnodes by adding the element reference,
    // however, if patching fails it contains partial changes.
    if (oldCh !== newCh) {
      runWithBoundaryProtection(vm, vm, () => {
        // pre
        logOperationStart(2
        /* OperationId.Patch */
        , vm);
      }, () => {
        // job
        patchChildren(oldCh, newCh, renderRoot, renderer);
      }, () => {
        // post
        logOperationEnd(2
        /* OperationId.Patch */
        , vm);
      });
    }
  }

  if (vm.state === 1
  /* VMState.connected */
  ) ;
}

function runConnectedCallback(vm) {
  const {
    state
  } = vm;

  if (state === 1
  /* VMState.connected */
  ) {
    return; // nothing to do since it was already connected
  }

  vm.state = 1
  /* VMState.connected */
  ; // reporting connection

  const {
    connected
  } = Services;

  if (connected) {
    invokeServiceHook(vm, connected);
  }

  if (hasWireAdapters(vm)) {
    connectWireAdapters(vm);
  }

  const {
    connectedCallback
  } = vm.def;

  if (!isUndefined$1(connectedCallback)) {
    logOperationStart(3
    /* OperationId.ConnectedCallback */
    , vm);
    invokeComponentCallback(vm, connectedCallback);
    logOperationEnd(3
    /* OperationId.ConnectedCallback */
    , vm);
  }
}

function hasWireAdapters(vm) {
  return getOwnPropertyNames$1(vm.def.wire).length > 0;
}

function runDisconnectedCallback(vm) {
  if (process.env.NODE_ENV !== 'production') {
    assert.isTrue(vm.state !== 2
    /* VMState.disconnected */
    , `${vm} must be inserted.`);
  }

  if (isFalse(vm.isDirty)) {
    // this guarantees that if the component is reused/reinserted,
    // it will be re-rendered because we are disconnecting the reactivity
    // linking, so mutations are not automatically reflected on the state
    // of disconnected components.
    vm.isDirty = true;
  }

  vm.state = 2
  /* VMState.disconnected */
  ; // reporting disconnection

  const {
    disconnected
  } = Services;

  if (disconnected) {
    invokeServiceHook(vm, disconnected);
  }

  if (hasWireAdapters(vm)) {
    disconnectWireAdapters(vm);
  }

  const {
    disconnectedCallback
  } = vm.def;

  if (!isUndefined$1(disconnectedCallback)) {
    logOperationStart(5
    /* OperationId.DisconnectedCallback */
    , vm);
    invokeComponentCallback(vm, disconnectedCallback);
    logOperationEnd(5
    /* OperationId.DisconnectedCallback */
    , vm);
  }
}

function runChildNodesDisconnectedCallback(vm) {
  const {
    velements: vCustomElementCollection
  } = vm; // Reporting disconnection for every child in inverse order since they are
  // inserted in reserved order.

  for (let i = vCustomElementCollection.length - 1; i >= 0; i -= 1) {
    const {
      elm
    } = vCustomElementCollection[i]; // There are two cases where the element could be undefined:
    // * when there is an error during the construction phase, and an error
    //   boundary picks it, there is a possibility that the VCustomElement
    //   is not properly initialized, and therefore is should be ignored.
    // * when slotted custom element is not used by the element where it is
    //   slotted into it, as  a result, the custom element was never
    //   initialized.

    if (!isUndefined$1(elm)) {
      const childVM = getAssociatedVMIfPresent(elm); // The VM associated with the element might be associated undefined
      // in the case where the VM failed in the middle of its creation,
      // eg: constructor throwing before invoking super().

      if (!isUndefined$1(childVM)) {
        resetComponentStateWhenRemoved(childVM);
      }
    }
  }
}

function runLightChildNodesDisconnectedCallback(vm) {
  const {
    aChildren: adoptedChildren
  } = vm;
  recursivelyDisconnectChildren(adoptedChildren);
}
/**
 * The recursion doesn't need to be a complete traversal of the vnode graph,
 * instead it can be partial, when a custom element vnode is found, we don't
 * need to continue into its children because by attempting to disconnect the
 * custom element itself will trigger the removal of anything slotted or anything
 * defined on its shadow.
 */


function recursivelyDisconnectChildren(vnodes) {
  for (let i = 0, len = vnodes.length; i < len; i += 1) {
    const vnode = vnodes[i];

    if (!isNull(vnode) && !isUndefined$1(vnode.elm)) {
      switch (vnode.type) {
        case 2
        /* VNodeType.Element */
        :
          recursivelyDisconnectChildren(vnode.children);
          break;

        case 3
        /* VNodeType.CustomElement */
        :
          {
            const vm = getAssociatedVM(vnode.elm);
            resetComponentStateWhenRemoved(vm);
            break;
          }
      }
    }
  }
} // This is a super optimized mechanism to remove the content of the root node (shadow root
// for shadow DOM components and the root element itself for light DOM) without having to go
// into snabbdom. Especially useful when the reset is a consequence of an error, in which case the
// children VNodes might not be representing the current state of the DOM.


function resetComponentRoot(vm) {
  const {
    children,
    renderRoot,
    renderer: {
      remove
    }
  } = vm;

  for (let i = 0, len = children.length; i < len; i++) {
    const child = children[i];

    if (!isNull(child) && !isUndefined$1(child.elm)) {
      remove(child.elm, renderRoot);
    }
  }

  vm.children = EmptyArray;
  runChildNodesDisconnectedCallback(vm);
  vm.velements = EmptyArray;
}

function getErrorBoundaryVM(vm) {
  let currentVm = vm;

  while (!isNull(currentVm)) {
    if (!isUndefined$1(currentVm.def.errorCallback)) {
      return currentVm;
    }

    currentVm = currentVm.owner;
  }
}

function runWithBoundaryProtection(vm, owner, pre, job, post) {
  let error;
  pre();

  try {
    job();
  } catch (e) {
    error = Object(e);
  } finally {
    post();

    if (!isUndefined$1(error)) {
      addErrorComponentStack(vm, error);
      const errorBoundaryVm = isNull(owner) ? undefined : getErrorBoundaryVM(owner);

      if (isUndefined$1(errorBoundaryVm)) {
        throw error; // eslint-disable-line no-unsafe-finally
      }

      resetComponentRoot(vm); // remove offenders

      logOperationStart(6
      /* OperationId.ErrorCallback */
      , vm); // error boundaries must have an ErrorCallback

      const errorCallback = errorBoundaryVm.def.errorCallback;
      invokeComponentCallback(errorBoundaryVm, errorCallback, [error, error.wcStack]);
      logOperationEnd(6
      /* OperationId.ErrorCallback */
      , vm);
    }
  }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const DeprecatedWiredElementHost = '$$DeprecatedWiredElementHostKey$$';
const DeprecatedWiredParamsMeta = '$$DeprecatedWiredParamsMetaKey$$';
const WireMetaMap = new Map();
class WireContextRegistrationEvent extends CustomEvent {
  constructor(adapterToken, {
    setNewContext,
    setDisconnectedCallback
  }) {
    super(adapterToken, {
      bubbles: true,
      composed: true
    });
    defineProperties(this, {
      setNewContext: {
        value: setNewContext
      },
      setDisconnectedCallback: {
        value: setDisconnectedCallback
      }
    });
  }

}

function createFieldDataCallback(vm, name) {
  return value => {
    updateComponentValue(vm, name, value);
  };
}

function createMethodDataCallback(vm, method) {
  return value => {
    // dispatching new value into the wired method
    runWithBoundaryProtection(vm, vm.owner, noop, () => {
      // job
      method.call(vm.component, value);
    }, noop);
  };
}

function createConfigWatcher(component, configCallback, callbackWhenConfigIsReady) {

  const ro = createReactiveObserver();

  const computeConfigAndUpdate = () => {
    let config;
    ro.observe(() => config = configCallback(component)); // eslint-disable-next-line @lwc/lwc-internal/no-invalid-todo
    // TODO: dev-mode validation of config based on the adapter.configSchema
    // @ts-ignore it is assigned in the observe() callback

    callbackWhenConfigIsReady(config);
  };

  return {
    computeConfigAndUpdate,
    ro
  };
}

function createContextWatcher(vm, wireDef, callbackWhenContextIsReady) {
  const {
    adapter
  } = wireDef;
  const adapterContextToken = getAdapterToken(adapter);

  if (isUndefined$1(adapterContextToken)) {
    return; // no provider found, nothing to be done
  }

  const {
    elm,
    context: {
      wiredConnecting,
      wiredDisconnecting
    },
    renderer: {
      dispatchEvent
    }
  } = vm; // waiting for the component to be connected to formally request the context via the token

  ArrayPush$1.call(wiredConnecting, () => {
    // This event is responsible for connecting the host element with another
    // element in the composed path that is providing contextual data. The provider
    // must be listening for a special dom event with the name corresponding to the value of
    // `adapterContextToken`, which will remain secret and internal to this file only to
    // guarantee that the linkage can be forged.
    const contextRegistrationEvent = new WireContextRegistrationEvent(adapterContextToken, {
      setNewContext(newContext) {
        // eslint-disable-next-line @lwc/lwc-internal/no-invalid-todo
        // TODO: dev-mode validation of config based on the adapter.contextSchema
        callbackWhenContextIsReady(newContext);
      },

      setDisconnectedCallback(disconnectCallback) {
        // adds this callback into the disconnect bucket so it gets disconnected from parent
        // the the element hosting the wire is disconnected
        ArrayPush$1.call(wiredDisconnecting, disconnectCallback);
      }

    });
    dispatchEvent(elm, contextRegistrationEvent);
  });
}

function createConnector(vm, name, wireDef) {
  const {
    method,
    adapter,
    configCallback,
    dynamic
  } = wireDef;
  const dataCallback = isUndefined$1(method) ? createFieldDataCallback(vm, name) : createMethodDataCallback(vm, method);
  let context;
  let connector; // Workaround to pass the component element associated to this wire adapter instance.

  defineProperty(dataCallback, DeprecatedWiredElementHost, {
    value: vm.elm
  });
  defineProperty(dataCallback, DeprecatedWiredParamsMeta, {
    value: dynamic
  });
  runWithBoundaryProtection(vm, vm, noop, () => {
    // job
    connector = new adapter(dataCallback);
  }, noop);

  const updateConnectorConfig = config => {
    // every time the config is recomputed due to tracking,
    // this callback will be invoked with the new computed config
    runWithBoundaryProtection(vm, vm, noop, () => {
      // job
      connector.update(config, context);
    }, noop);
  }; // Computes the current wire config and calls the update method on the wire adapter.
  // If it has params, we will need to observe changes in the next tick.


  const {
    computeConfigAndUpdate,
    ro
  } = createConfigWatcher(vm.component, configCallback, updateConnectorConfig); // if the adapter needs contextualization, we need to watch for new context and push it alongside the config

  if (!isUndefined$1(adapter.contextSchema)) {
    createContextWatcher(vm, wireDef, newContext => {
      // every time the context is pushed into this component,
      // this callback will be invoked with the new computed context
      if (context !== newContext) {
        context = newContext; // Note: when new context arrives, the config will be recomputed and pushed along side the new
        // context, this is to preserve the identity characteristics, config should not have identity
        // (ever), while context can have identity

        if (vm.state === 1
        /* VMState.connected */
        ) {
          computeConfigAndUpdate();
        }
      }
    });
  }

  return {
    // @ts-ignore the boundary protection executes sync, connector is always defined
    connector,
    computeConfigAndUpdate,
    resetConfigWatcher: () => ro.reset()
  };
}

const AdapterToTokenMap = new Map();
function getAdapterToken(adapter) {
  return AdapterToTokenMap.get(adapter);
}
function setAdapterToken(adapter, token) {
  AdapterToTokenMap.set(adapter, token);
}
function storeWiredMethodMeta(descriptor, adapter, configCallback, dynamic) {
  // support for callable adapters
  if (adapter.adapter) {
    adapter = adapter.adapter;
  }

  const method = descriptor.value;
  const def = {
    adapter,
    method,
    configCallback,
    dynamic
  };
  WireMetaMap.set(descriptor, def);
}
function storeWiredFieldMeta(descriptor, adapter, configCallback, dynamic) {
  // support for callable adapters
  if (adapter.adapter) {
    adapter = adapter.adapter;
  }

  const def = {
    adapter,
    configCallback,
    dynamic
  };
  WireMetaMap.set(descriptor, def);
}
function installWireAdapters(vm) {
  const {
    context,
    def: {
      wire
    }
  } = vm;
  const wiredConnecting = context.wiredConnecting = [];
  const wiredDisconnecting = context.wiredDisconnecting = [];

  for (const fieldNameOrMethod in wire) {
    const descriptor = wire[fieldNameOrMethod];
    const wireDef = WireMetaMap.get(descriptor);

    if (process.env.NODE_ENV !== 'production') {
      assert.invariant(wireDef, `Internal Error: invalid wire definition found.`);
    }

    if (!isUndefined$1(wireDef)) {
      const {
        connector,
        computeConfigAndUpdate,
        resetConfigWatcher
      } = createConnector(vm, fieldNameOrMethod, wireDef);
      const hasDynamicParams = wireDef.dynamic.length > 0;
      ArrayPush$1.call(wiredConnecting, () => {
        connector.connect();

        if (!runtimeFlags.ENABLE_WIRE_SYNC_EMIT) {
          if (hasDynamicParams) {
            Promise.resolve().then(computeConfigAndUpdate);
            return;
          }
        }

        computeConfigAndUpdate();
      });
      ArrayPush$1.call(wiredDisconnecting, () => {
        connector.disconnect();
        resetConfigWatcher();
      });
    }
  }
}
function connectWireAdapters(vm) {
  const {
    wiredConnecting
  } = vm.context;

  for (let i = 0, len = wiredConnecting.length; i < len; i += 1) {
    wiredConnecting[i]();
  }
}
function disconnectWireAdapters(vm) {
  const {
    wiredDisconnecting
  } = vm.context;
  runWithBoundaryProtection(vm, vm, noop, () => {
    // job
    for (let i = 0, len = wiredDisconnecting.length; i < len; i += 1) {
      wiredDisconnecting[i]();
    }
  }, noop);
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// this is lwc internal implementation
function createContextProvider(adapter) {
    let adapterContextToken = getAdapterToken(adapter);
    if (!isUndefined$1(adapterContextToken)) {
        throw new Error(`Adapter already has a context provider.`);
    }
    adapterContextToken = guid();
    setAdapterToken(adapter, adapterContextToken);
    const providers = new WeakSet();
    return (elm, options) => {
        if (providers.has(elm)) {
            throw new Error(`Adapter was already installed on ${elm}.`);
        }
        providers.add(elm);
        const { consumerConnectedCallback, consumerDisconnectedCallback } = options;
        elm.addEventListener(adapterContextToken, ((evt) => {
            const { setNewContext, setDisconnectedCallback } = evt;
            const consumer = {
                provide(newContext) {
                    setNewContext(newContext);
                },
            };
            const disconnectCallback = () => {
                if (!isUndefined$1(consumerDisconnectedCallback)) {
                    consumerDisconnectedCallback(consumer);
                }
            };
            setDisconnectedCallback(disconnectCallback);
            consumerConnectedCallback(consumer);
            evt.stopImmediatePropagation();
        }));
    };
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
/**
 * EXPERIMENTAL: This function allows you to create a reactive readonly
 * membrane around any object value. This API is subject to change or
 * being removed.
 */
function readonly(obj) {
    if (process.env.NODE_ENV !== 'production') {
        // TODO [#1292]: Remove the readonly decorator
        if (arguments.length !== 1) {
            assert.fail('@readonly cannot be used as a decorator just yet, use it as a function with one argument to produce a readonly version of the provided value.');
        }
    }
    return getReadOnlyProxy(obj);
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
let hooksAreSet = false;
function setHooks(hooks) {
    assert.isFalse(hooksAreSet, 'Hooks are already overridden, only one definition is allowed.');
    hooksAreSet = true;
    setSanitizeHtmlContentHook(hooks.sanitizeHtmlContent);
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// See @lwc/engine-core/src/framework/template.ts
const TEMPLATE_PROPS = ['slots', 'stylesheetToken', 'stylesheets', 'renderMode'];
// Via https://www.npmjs.com/package/object-observer
const ARRAY_MUTATION_METHODS = [
    'pop',
    'push',
    'shift',
    'unshift',
    'reverse',
    'sort',
    'fill',
    'splice',
    'copyWithin',
];
function getOriginalArrayMethod(prop) {
    switch (prop) {
        case 'pop':
            return ArrayPop;
        case 'push':
            return ArrayPush$1;
        case 'shift':
            return ArrayShift;
        case 'unshift':
            return ArrayUnshift;
        case 'reverse':
            return ArrayReverse;
        case 'sort':
            return ArraySort;
        case 'fill':
            return ArrayFill;
        case 'splice':
            return ArraySplice;
        case 'copyWithin':
            return ArrayCopyWithin;
    }
}
let mutationWarningsSilenced = false;
// Warn if the user tries to mutate tmpl.stylesheets, e.g.:
// `tmpl.stylesheets.push(someStylesheetFunction)`
function warnOnArrayMutation(stylesheets) {
    // We can't handle users calling Array.prototype.slice.call(tmpl.stylesheets), but
    // we can at least warn when they use the most common mutation methods.
    for (const prop of ARRAY_MUTATION_METHODS) {
        const originalArrayMethod = getOriginalArrayMethod(prop);
        stylesheets[prop] = function arrayMutationWarningWrapper() {
            logError(`Mutating the "stylesheets" array on a template function ` +
                `is deprecated and may be removed in a future version of LWC.`);
            // @ts-ignore
            return originalArrayMethod.apply(this, arguments);
        };
    }
}
// TODO [#2782]: eventually freezeTemplate() will _actually_ freeze the tmpl object. Today it
// just warns on mutation.
function freezeTemplate(tmpl) {
    if (process.env.NODE_ENV !== 'production') {
        if (!isUndefined$1(tmpl.stylesheets)) {
            warnOnArrayMutation(tmpl.stylesheets);
        }
        for (const prop of TEMPLATE_PROPS) {
            let value = tmpl[prop];
            defineProperty(tmpl, prop, {
                enumerable: true,
                configurable: true,
                get() {
                    return value;
                },
                set(newValue) {
                    if (!mutationWarningsSilenced) {
                        logError(`Dynamically setting the "${prop}" property on a template function ` +
                            `is deprecated and may be removed in a future version of LWC.`);
                    }
                    value = newValue;
                },
            });
        }
        const originalDescriptor = getOwnPropertyDescriptor$1(tmpl, 'stylesheetTokens');
        defineProperty(tmpl, 'stylesheetTokens', {
            enumerable: true,
            configurable: true,
            get: originalDescriptor.get,
            set(value) {
                logError(`Dynamically setting the "stylesheetTokens" property on a template function ` +
                    `is deprecated and may be removed in a future version of LWC.`);
                // Avoid logging twice (for both stylesheetToken and stylesheetTokens)
                mutationWarningsSilenced = true;
                originalDescriptor.set.call(this, value);
                mutationWarningsSilenced = false;
            },
        });
    }
}
/* version: 2.22.0 */

/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// We use Symbols as the keys for HostElement properties to avoid conflicting
// with public component properties defined by a component author.
const HostNamespaceKey = Symbol('namespace');
const HostTypeKey = Symbol('type');
const HostParentKey = Symbol('parent');
const HostShadowRootKey = Symbol('shadow-root');
const HostChildrenKey = Symbol('children');
const HostAttributesKey = Symbol('attributes');
const HostEventListenersKey = Symbol('event-listeners');
const HostValueKey = Symbol('value');
var HostNodeType;
(function (HostNodeType) {
    HostNodeType["Text"] = "text";
    HostNodeType["Comment"] = "comment";
    HostNodeType["Raw"] = "raw";
    HostNodeType["Element"] = "element";
    HostNodeType["ShadowRoot"] = "shadow-root";
})(HostNodeType || (HostNodeType = {}));

/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const CLASSNAMES_SEPARATOR = /\s+/g;
function classNameToTokenList(value) {
    return new Set(value.split(CLASSNAMES_SEPARATOR).filter((str) => str.length));
}
function tokenListToClassName(values) {
    return Array.from(values).join(' ');
}

/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function unsupportedMethod(name) {
    return function () {
        throw new TypeError(`"${name}" is not supported in this environment`);
    };
}
function createElement(tagName, namespace) {
    return {
        [HostTypeKey]: HostNodeType.Element,
        tagName,
        [HostNamespaceKey]: namespace !== null && namespace !== void 0 ? namespace : HTML_NAMESPACE,
        [HostParentKey]: null,
        [HostShadowRootKey]: null,
        [HostChildrenKey]: [],
        [HostAttributesKey]: [],
        [HostEventListenersKey]: {},
    };
}
const registry = create(null);
const reverseRegistry = new WeakMap();
function registerCustomElement(name, ctor) {
    if (name !== StringToLowerCase.call(name) || registry[name]) {
        throw new TypeError(`Invalid Registration`);
    }
    registry[name] = ctor;
    reverseRegistry.set(ctor, name);
}
class HTMLElementImpl {
    constructor() {
        const { constructor } = this;
        const tagName = reverseRegistry.get(constructor);
        if (!tagName) {
            throw new TypeError(`Invalid Construction`);
        }
        return createElement(tagName);
    }
}
const isNativeShadowDefined = false;
const isSyntheticShadowDefined = false;
function insert(node, parent, anchor) {
    const nodeParent = node[HostParentKey];
    if (nodeParent !== null && nodeParent !== parent) {
        const nodeIndex = nodeParent[HostChildrenKey].indexOf(node);
        nodeParent[HostChildrenKey].splice(nodeIndex, 1);
    }
    node[HostParentKey] = parent;
    const anchorIndex = isNull(anchor) ? -1 : parent[HostChildrenKey].indexOf(anchor);
    if (anchorIndex === -1) {
        parent[HostChildrenKey].push(node);
    }
    else {
        parent[HostChildrenKey].splice(anchorIndex, 0, node);
    }
}
function remove(node, parent) {
    const nodeIndex = parent[HostChildrenKey].indexOf(node);
    parent[HostChildrenKey].splice(nodeIndex, 1);
}
function cloneNode(node) {
    return node;
}
function createFragment(html) {
    return {
        [HostTypeKey]: HostNodeType.Raw,
        [HostParentKey]: null,
        [HostValueKey]: html,
    };
}
function createText(content) {
    return {
        [HostTypeKey]: HostNodeType.Text,
        [HostValueKey]: String(content),
        [HostParentKey]: null,
    };
}
function createComment(content) {
    return {
        [HostTypeKey]: HostNodeType.Comment,
        [HostValueKey]: content,
        [HostParentKey]: null,
    };
}
function nextSibling(node) {
    const parent = node[HostParentKey];
    if (isNull(parent)) {
        return null;
    }
    const nodeIndex = parent[HostChildrenKey].indexOf(node);
    return parent[HostChildrenKey][nodeIndex + 1] || null;
}
function attachShadow(element, config) {
    element[HostShadowRootKey] = {
        [HostTypeKey]: HostNodeType.ShadowRoot,
        [HostChildrenKey]: [],
        mode: config.mode,
        delegatesFocus: !!config.delegatesFocus,
    };
    return element[HostShadowRootKey];
}
function getProperty(node, key) {
    var _a, _b;
    if (key in node) {
        return node[key];
    }
    if (node[HostTypeKey] === HostNodeType.Element) {
        const attrName = htmlPropertyToAttribute(key);
        // Handle all the boolean properties.
        if (isBooleanAttribute(attrName, node.tagName)) {
            return (_a = getAttribute(node, attrName)) !== null && _a !== void 0 ? _a : false;
        }
        // Handle global html attributes and AOM.
        if (isGlobalHtmlAttribute(attrName) || isAriaAttribute(attrName)) {
            return getAttribute(node, attrName);
        }
        // Handle special elements live bindings. The checked property is already handled above
        // in the boolean case.
        if (node.tagName === 'input' && key === 'value') {
            return (_b = getAttribute(node, 'value')) !== null && _b !== void 0 ? _b : '';
        }
    }
    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error(`Unexpected "${key}" property access from the renderer`);
    }
}
function setProperty(node, key, value) {
    if (key in node) {
        return (node[key] = value);
    }
    if (node[HostTypeKey] === HostNodeType.Element) {
        const attrName = htmlPropertyToAttribute(key);
        if (key === 'innerHTML') {
            node[HostChildrenKey] = [
                {
                    [HostTypeKey]: HostNodeType.Raw,
                    [HostParentKey]: node,
                    [HostValueKey]: value,
                },
            ];
            return;
        }
        // Handle all the boolean properties.
        if (isBooleanAttribute(attrName, node.tagName)) {
            return value === true
                ? setAttribute(node, attrName, '')
                : removeAttribute(node, attrName);
        }
        // Handle global html attributes and AOM.
        if (isGlobalHtmlAttribute(attrName) || isAriaAttribute(attrName)) {
            return setAttribute(node, attrName, value);
        }
        // Handle special elements live bindings. The checked property is already handled above
        // in the boolean case.
        if (node.tagName === 'input' && attrName === 'value') {
            return isNull(value) || isUndefined$1(value)
                ? removeAttribute(node, 'value')
                : setAttribute(node, 'value', value);
        }
    }
    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error(`Unexpected attempt to set "${key}=${value}" property from the renderer`);
    }
}
function setText(node, content) {
    if (node[HostTypeKey] === HostNodeType.Text) {
        node[HostValueKey] = content;
    }
    else if (node[HostTypeKey] === HostNodeType.Element) {
        node[HostChildrenKey] = [
            {
                [HostTypeKey]: HostNodeType.Text,
                [HostParentKey]: node,
                [HostValueKey]: content,
            },
        ];
    }
}
function getAttribute(element, name, namespace = null) {
    const attribute = element[HostAttributesKey].find((attr) => attr.name === name && attr[HostNamespaceKey] === namespace);
    return attribute ? attribute.value : null;
}
function setAttribute(element, name, value, namespace = null) {
    const attribute = element[HostAttributesKey].find((attr) => attr.name === name && attr[HostNamespaceKey] === namespace);
    if (isUndefined$1(namespace)) {
        namespace = null;
    }
    if (isUndefined$1(attribute)) {
        element[HostAttributesKey].push({
            name,
            [HostNamespaceKey]: namespace,
            value: String(value),
        });
    }
    else {
        attribute.value = value;
    }
}
function removeAttribute(element, name, namespace) {
    element[HostAttributesKey] = element[HostAttributesKey].filter((attr) => attr.name !== name && attr[HostNamespaceKey] !== namespace);
}
function getClassList(element) {
    function getClassAttribute() {
        let classAttribute = element[HostAttributesKey].find((attr) => attr.name === 'class' && isNull(attr[HostNamespaceKey]));
        if (isUndefined$1(classAttribute)) {
            classAttribute = {
                name: 'class',
                [HostNamespaceKey]: null,
                value: '',
            };
            element[HostAttributesKey].push(classAttribute);
        }
        return classAttribute;
    }
    return {
        add(...names) {
            const classAttribute = getClassAttribute();
            const tokenList = classNameToTokenList(classAttribute.value);
            names.forEach((name) => tokenList.add(name));
            classAttribute.value = tokenListToClassName(tokenList);
        },
        remove(...names) {
            const classAttribute = getClassAttribute();
            const tokenList = classNameToTokenList(classAttribute.value);
            names.forEach((name) => tokenList.delete(name));
            classAttribute.value = tokenListToClassName(tokenList);
        },
    };
}
function setCSSStyleProperty(element, name, value, important) {
    const styleAttribute = element[HostAttributesKey].find((attr) => attr.name === 'style' && isNull(attr[HostNamespaceKey]));
    const serializedProperty = `${name}: ${value}${important ? ' !important' : ''}`;
    if (isUndefined$1(styleAttribute)) {
        element[HostAttributesKey].push({
            name: 'style',
            [HostNamespaceKey]: null,
            value: serializedProperty,
        });
    }
    else {
        styleAttribute.value += `; ${serializedProperty}`;
    }
}
function isConnected(node) {
    return !isNull(node[HostParentKey]);
}
// Noop on SSR (for now). This need to be reevaluated whenever we will implement support for
// synthetic shadow.
const insertStylesheet = noop;
// Noop on SSR.
const addEventListener = noop;
// Noop on SSR.
const removeEventListener = noop;
const dispatchEvent = unsupportedMethod('dispatchEvent');
const getBoundingClientRect = unsupportedMethod('getBoundingClientRect');
const querySelector = unsupportedMethod('querySelector');
const querySelectorAll = unsupportedMethod('querySelectorAll');
const getElementsByTagName = unsupportedMethod('getElementsByTagName');
const getElementsByClassName = unsupportedMethod('getElementsByClassName');
const getChildren = unsupportedMethod('getChildren');
const getChildNodes = unsupportedMethod('getChildNodes');
const getFirstChild = unsupportedMethod('getFirstChild');
const getFirstElementChild = unsupportedMethod('getFirstElementChild');
const getLastChild = unsupportedMethod('getLastChild');
const getLastElementChild = unsupportedMethod('getLastElementChild');
function defineCustomElement(name, constructor, _options) {
    registerCustomElement(name, constructor);
}
function getCustomElement(name) {
    return registry[name];
}
const HTMLElementExported = HTMLElementImpl;
/* noop */
const assertInstanceOfHTMLElement = noop;
const renderer = {
    isNativeShadowDefined,
    isSyntheticShadowDefined,
    HTMLElementExported,
    insert,
    remove,
    cloneNode,
    createFragment,
    createElement,
    createText,
    createComment,
    nextSibling,
    attachShadow,
    getProperty,
    setProperty,
    setText,
    getAttribute,
    setAttribute,
    removeAttribute,
    addEventListener,
    removeEventListener,
    dispatchEvent,
    getClassList,
    setCSSStyleProperty,
    getBoundingClientRect,
    querySelector,
    querySelectorAll,
    getElementsByTagName,
    getElementsByClassName,
    getChildren,
    getChildNodes,
    getFirstChild,
    getFirstElementChild,
    getLastChild,
    getLastElementChild,
    isConnected,
    insertStylesheet,
    assertInstanceOfHTMLElement,
    defineCustomElement,
    getCustomElement,
};

/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function serializeAttributes(attributes) {
    return attributes
        .map((attr) => attr.value.length ? `${attr.name}=${JSON.stringify(htmlEscape(attr.value))}` : attr.name)
        .join(' ');
}
function serializeChildNodes(children) {
    return children
        .map((child) => {
        switch (child[HostTypeKey]) {
            case HostNodeType.Text:
                return child[HostValueKey] === '' ? '\u200D' : htmlEscape(child[HostValueKey]);
            case HostNodeType.Comment:
                return `<!--${htmlEscape(child[HostValueKey])}-->`;
            case HostNodeType.Raw:
                return child[HostValueKey];
            case HostNodeType.Element:
                return serializeElement(child);
        }
    })
        .join('');
}
function serializeShadowRoot(shadowRoot) {
    const attrs = [`shadowroot="${shadowRoot.mode}"`];
    if (shadowRoot.delegatesFocus) {
        attrs.push('shadowrootdelegatesfocus');
    }
    return `<template ${attrs.join(' ')}>${serializeChildNodes(shadowRoot[HostChildrenKey])}</template>`;
}
function serializeElement(element) {
    let output = '';
    const tagName = element.tagName;
    const namespace = element[HostNamespaceKey];
    const isForeignElement = namespace !== HTML_NAMESPACE;
    const hasChildren = element[HostChildrenKey].length > 0;
    const attrs = element[HostAttributesKey].length
        ? ` ${serializeAttributes(element[HostAttributesKey])}`
        : '';
    output += `<${tagName}${attrs}`;
    // Note that foreign elements can have children but not shadow roots
    if (isForeignElement && !hasChildren) {
        output += '/>';
        return output;
    }
    output += '>';
    if (element[HostShadowRootKey]) {
        output += serializeShadowRoot(element[HostShadowRootKey]);
    }
    output += serializeChildNodes(element[HostChildrenKey]);
    if (!isVoidElement(tagName, namespace) || hasChildren) {
        output += `</${tagName}>`;
    }
    return output;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const FakeRootElement = {
    [HostTypeKey]: HostNodeType.Element,
    tagName: 'fake-root-element',
    [HostNamespaceKey]: HTML_NAMESPACE,
    [HostParentKey]: null,
    [HostShadowRootKey]: null,
    [HostChildrenKey]: [],
    [HostAttributesKey]: [],
    [HostEventListenersKey]: {},
};
function renderComponent(tagName, Ctor, props = {}) {
    if (!isString(tagName)) {
        throw new TypeError(`"renderComponent" expects a string as the first parameter but instead received ${tagName}.`);
    }
    if (!isFunction$1(Ctor)) {
        throw new TypeError(`"renderComponent" expects a valid component constructor as the second parameter but instead received ${Ctor}.`);
    }
    if (!isObject(props) || isNull(props)) {
        throw new TypeError(`"renderComponent" expects an object as the third parameter but instead received ${props}.`);
    }
    const element = renderer.createElement(tagName);
    createVM(element, Ctor, renderer, {
        mode: 'open',
        owner: null,
        tagName,
    });
    for (const [key, value] of Object.entries(props)) {
        element[key] = value;
    }
    element[HostParentKey] = FakeRootElement;
    connectRootElement(element);
    return serializeElement(element);
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
freeze(LightningElement);
seal(LightningElement.prototype);
/* version: 2.22.0 */

exports.LightningElement = LightningElement;
exports.api = api$1;
exports.createContextProvider = createContextProvider;
exports.freezeTemplate = freezeTemplate;
exports.getComponentDef = getComponentDef;
exports.isComponentConstructor = isComponentConstructor;
exports.parseFragment = parseFragment;
exports.parseSVGFragment = parseFragment;
exports.readonly = readonly;
exports.register = register;
exports.registerComponent = registerComponent;
exports.registerDecorators = registerDecorators;
exports.registerTemplate = registerTemplate;
exports.renderComponent = renderComponent;
exports.renderer = renderer;
exports.sanitizeAttribute = sanitizeAttribute;
exports.setFeatureFlag = setFeatureFlag;
exports.setFeatureFlagForTest = setFeatureFlagForTest;
exports.setHooks = setHooks;
exports.track = track;
exports.unwrap = unwrap;
exports.wire = wire;
