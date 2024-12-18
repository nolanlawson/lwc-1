/*
 * Copyright (c) 2024, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

// reduced!!!!

    /*
     * Copyright (c) 2024, Salesforce, Inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    const {
        /** Detached {@linkcode Object.assign}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign MDN Reference}. */
        assign,
        /** Detached {@linkcode Object.create}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create MDN Reference}. */
        create,
        /** Detached {@linkcode Object.defineProperties}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties MDN Reference}. */
        defineProperties,
        /** Detached {@linkcode Object.defineProperty}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty MDN Reference}. */
        defineProperty,
        /** Detached {@linkcode Object.entries}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries MDN Reference}. */
        entries,
        /** Detached {@linkcode Object.freeze}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze MDN Reference}. */
        freeze,
        /** Detached {@linkcode Object.fromEntries}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries MDN Reference}. */
        fromEntries,
        /** Detached {@linkcode Object.getOwnPropertyDescriptor}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor MDN Reference}. */
        getOwnPropertyDescriptor,
        /** Detached {@linkcode Object.getOwnPropertyDescriptors}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors MDN Reference}. */
        getOwnPropertyDescriptors,
        /** Detached {@linkcode Object.getOwnPropertyNames}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames MDN Reference}. */
        getOwnPropertyNames,
        /** Detached {@linkcode Object.getOwnPropertySymbols}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols MDN Reference}. */
        getOwnPropertySymbols,
        /** Detached {@linkcode Object.getPrototypeOf}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf MDN Reference}. */
        getPrototypeOf,
        /** Detached {@linkcode Object.hasOwnProperty}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty MDN Reference}. */
        hasOwnProperty,
        /** Detached {@linkcode Object.isFrozen}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen MDN Reference}. */
        isFrozen,
        /** Detached {@linkcode Object.keys}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys MDN Reference}. */
        keys,
        /** Detached {@linkcode Object.seal}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal MDN Reference}. */
        seal,
        /** Detached {@linkcode Object.setPrototypeOf}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf MDN Reference}. */
        setPrototypeOf, } = Object;
    const {
        /** Detached {@linkcode Array.isArray}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray MDN Reference}. */
        isArray,
        /** Detached {@linkcode Array.from}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from MDN Reference}. */
        from: ArrayFrom, } = Array;
// For some reason, JSDoc don't get picked up for multiple renamed destructured constants (even
// though it works fine for one, e.g. isArray), so comments for these are added to the export
// statement, rather than this declaration.
    const { concat: ArrayConcat, copyWithin: ArrayCopyWithin, every: ArrayEvery, fill: ArrayFill, filter: ArrayFilter, find: ArrayFind, findIndex: ArrayFindIndex, includes: ArrayIncludes, indexOf: ArrayIndexOf, join: ArrayJoin, map: ArrayMap, pop: ArrayPop, push: ArrayPush, reduce: ArrayReduce, reverse: ArrayReverse, shift: ArrayShift, slice: ArraySlice, some: ArraySome, sort: ArraySort, splice: ArraySplice, unshift: ArrayUnshift, forEach, // Weird anomaly!
    } = Array.prototype;
    /**
     * Determines whether the argument is `undefined`.
     * @param obj Value to test
     * @returns `true` if the value is `undefined`.
     */
    function isUndefined(obj) {
        return obj === undefined;
    }
    /**
     * Determines whether the argument is `null`.
     * @param obj Value to test
     * @returns `true` if the value is `null`.
     */
    function isNull(obj) {
        return obj === null;
    }
    /**
     * Determines whether the argument is `true`.
     * @param obj Value to test
     * @returns `true` if the value is `true`.
     */
    function isTrue(obj) {
        return obj === true;
    }
    /**
     * Determines whether the argument is `false`.
     * @param obj Value to test
     * @returns `true` if the value is `false`.
     */
    function isFalse(obj) {
        return obj === false;
    }
    /**
     * Determines whether the argument is a function.
     * @param obj Value to test
     * @returns `true` if the value is a function.
     */
// Replacing `Function` with a narrower type that works for all our use cases is tricky...
 
    function isFunction(obj) {
        return typeof obj === 'function';
    }
    /**
     * Determines whether the argument is an object or null.
     * @param obj Value to test
     * @returns `true` if the value is an object or null.
     */
    function isObject(obj) {
        return typeof obj === 'object';
    }
    const OtS = {}.toString;
    /**
     * Converts the argument to a string, safely accounting for objects with "null" prototype.
     * Note that `toString(null)` returns `"[object Null]"` rather than `"null"`.
     * @param obj Value to convert to a string.
     * @returns String representation of the value.
     */
    function toString(obj) {
        if (obj?.toString) {
            // Arrays might hold objects with "null" prototype So using
            // Array.prototype.toString directly will cause an error Iterate through
            // all the items and handle individually.
            if (isArray(obj)) {
                // This behavior is slightly different from Array#toString:
                // 1. Array#toString calls `this.join`, rather than Array#join
                // Ex: arr = []; arr.join = () => 1; arr.toString() === 1; toString(arr) === ''
                // 2. Array#toString delegates to Object#toString if `this.join` is not a function
                // Ex: arr = []; arr.join = 'no'; arr.toString() === '[object Array]; toString(arr) = ''
                // 3. Array#toString converts null/undefined to ''
                // Ex: arr = [null, undefined]; arr.toString() === ','; toString(arr) === '[object Null],undefined'
                // 4. Array#toString converts recursive references to arrays to ''
                // Ex: arr = [1]; arr.push(arr, 2); arr.toString() === '1,,2'; toString(arr) throws
                // Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString
                return ArrayJoin.call(ArrayMap.call(obj, toString), ',');
            }
            return obj.toString();
        }
        else if (typeof obj === 'object') {
            // This catches null and returns "[object Null]". Weird, but kept for backwards compatibility.
            return OtS.call(obj);
        }
        else {
            return String(obj);
        }
    }

    /*
     * Copyright (c) 2023, Salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    const KEY__SHADOW_RESOLVER = '$shadowResolver$';
    const KEY__SHADOW_RESOLVER_PRIVATE = '$$ShadowResolverKey$$';
    const KEY__SYNTHETIC_MODE = '$$lwc-synthetic-mode';
    const KEY__NATIVE_GET_ELEMENT_BY_ID = '$nativeGetElementById$';
    const KEY__NATIVE_QUERY_SELECTOR_ALL = '$nativeQuerySelectorAll$';
    /** version: 8.12.1 */

    /*
     * Copyright (c) 2023, Salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    const eventTargetPrototype = EventTarget.prototype;
    const { addEventListener, dispatchEvent, removeEventListener } = eventTargetPrototype;

    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    const DocumentPrototypeActiveElement = getOwnPropertyDescriptor(Document.prototype, 'activeElement').get;
    const elementFromPoint = Document.prototype.elementFromPoint;
    const elementsFromPoint = Document.prototype.elementsFromPoint;
// defaultView can be null when a document has no browsing context. For example, the owner document
// of a node in a template doesn't have a default view: https://jsfiddle.net/hv9z0q5a/
    getOwnPropertyDescriptor(Document.prototype, 'defaultView').get;
    const { querySelectorAll, getElementById, getElementsByClassName, getElementsByTagName, getElementsByTagNameNS, } = Document.prototype;

    /*
     * Copyright (c) 2023, Salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
// Capture the global `ShadowRoot` since synthetic shadow will override it later
    const NativeShadowRoot = ShadowRoot;
    const isInstanceOfNativeShadowRoot = (node) => node instanceof NativeShadowRoot;

    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
// TODO [#2472]: Remove this workaround when appropriate.
// eslint-disable-next-line @lwc/lwc-internal/no-global-node
    const _Node = Node;
    const nodePrototype = _Node.prototype;
    const { DOCUMENT_POSITION_CONTAINED_BY, DOCUMENT_POSITION_CONTAINS, DOCUMENT_POSITION_PRECEDING, DOCUMENT_POSITION_FOLLOWING, ELEMENT_NODE, TEXT_NODE, CDATA_SECTION_NODE, PROCESSING_INSTRUCTION_NODE, COMMENT_NODE, DOCUMENT_FRAGMENT_NODE, } = _Node;
    const { appendChild, cloneNode, compareDocumentPosition, insertBefore, removeChild, replaceChild, hasChildNodes, } = nodePrototype;
    const { contains } = HTMLElement.prototype;
    const firstChildGetter = getOwnPropertyDescriptor(nodePrototype, 'firstChild').get;
    const lastChildGetter = getOwnPropertyDescriptor(nodePrototype, 'lastChild').get;
    const textContentGetter = getOwnPropertyDescriptor(nodePrototype, 'textContent').get;
    const parentNodeGetter = getOwnPropertyDescriptor(nodePrototype, 'parentNode').get;
    const ownerDocumentGetter = getOwnPropertyDescriptor(nodePrototype, 'ownerDocument').get;
    const parentElementGetter = getOwnPropertyDescriptor(nodePrototype, 'parentElement').get;
    const textContextSetter = getOwnPropertyDescriptor(nodePrototype, 'textContent').set;
    const childNodesGetter = getOwnPropertyDescriptor(nodePrototype, 'childNodes').get;
    getOwnPropertyDescriptor(nodePrototype, 'nextSibling').get;
    const isConnected = hasOwnProperty.call(nodePrototype, 'isConnected')
        ? getOwnPropertyDescriptor(nodePrototype, 'isConnected').get
        : function () {
            const doc = ownerDocumentGetter.call(this);
            // IE11
            return (
                // if doc is null, it means `this` is actually a document instance which
                // is always connected
                doc === null ||
                (compareDocumentPosition.call(doc, this) & DOCUMENT_POSITION_CONTAINED_BY) !== 0);
        };

    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    function isSyntheticOrNativeShadowRoot(node) {
        return isSyntheticShadowRoot(node) || isInstanceOfNativeShadowRoot(node);
    }
// Helpful for tests running with jsdom
    function getOwnerDocument(node) {
        const doc = ownerDocumentGetter.call(node);
        // if doc is null, it means `this` is actually a document instance
        return doc === null ? node : doc;
    }
    let skipGlobalPatching;
// Note: we deviate from native shadow here, but are not fixing
// due to backwards compat: https://github.com/salesforce/lwc/pull/3103
    function isGlobalPatchingSkipped(node) {
        // we lazily compute this value instead of doing it during evaluation, this helps
        // for apps that are setting this after the engine code is evaluated.
        if (isUndefined(skipGlobalPatching)) {
            const ownerDocument = getOwnerDocument(node);
            skipGlobalPatching =
                ownerDocument.body &&
                getAttribute.call(ownerDocument.body, 'data-global-patching-bypass') ===
                'temporary-bypass';
        }
        return isTrue(skipGlobalPatching);
    }
    function arrayFromCollection(collection) {
        const size = collection.length;
        const cloned = [];
        if (size > 0) {
            for (let i = 0; i < size; i++) {
                cloned[i] = collection[i];
            }
        }
        return cloned;
    }

    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
// Used as a back reference to identify the host element
    const HostElementKey = '$$HostElementKey$$';
    const ShadowedNodeKey = '$$ShadowedNodeKey$$';
    function fastDefineProperty(node, propName, config) {
        const shadowedNode = node;
        if (process.env.NODE_ENV !== 'production') {
            // in dev, we are more restrictive
            defineProperty(shadowedNode, propName, config);
        }
        else {
            const { value } = config;
            // in prod, we prioritize performance
            shadowedNode[propName] = value;
        }
    }
    function setNodeOwnerKey(node, value) {
        fastDefineProperty(node, HostElementKey, { value, configurable: true });
    }
    function setNodeKey(node, value) {
        fastDefineProperty(node, ShadowedNodeKey, { value });
    }
    function getNodeOwnerKey(node) {
        return node[HostElementKey];
    }
    function getNodeNearestOwnerKey(node) {
        let host = node;
        let hostKey;
        // search for the first element with owner identity
        // in case of manually inserted elements and elements slotted from Light DOM
        while (!isNull(host)) {
            hostKey = getNodeOwnerKey(host);
            if (!isUndefined(hostKey)) {
                return hostKey;
            }
            host = parentNodeGetter.call(host);
            // Elements slotted from top level light DOM into synthetic shadow
            // reach the slot tag from the shadow element first
            if (!isNull(host) && isSyntheticSlotElement(host)) {
                return undefined;
            }
        }
    }
    function getNodeKey(node) {
        return node[ShadowedNodeKey];
    }
    /**
     * This function does not traverse up for performance reasons, but is sufficient for most use
     * cases. If we need to traverse up and verify those nodes that don't have owner key, use
     * isNodeDeepShadowed instead.
     * @param node
     */
    function isNodeShadowed(node) {
        return !isUndefined(getNodeOwnerKey(node));
    }

    /*
     * Copyright (c) 2024, Salesforce, Inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    function getNodeOwner(node) {
        if (!(node instanceof _Node)) {
            return null;
        }
        const ownerKey = getNodeNearestOwnerKey(node);
        if (isUndefined(ownerKey)) {
            return null;
        }
        let nodeOwner = node;
        // At this point, node is a valid node with owner identity, now we need to find the owner node
        // search for a custom element with a VM that owns the first element with owner identity attached to it
        while (!isNull(nodeOwner) && getNodeKey(nodeOwner) !== ownerKey) {
            nodeOwner = parentNodeGetter.call(nodeOwner);
        }
        if (isNull(nodeOwner)) {
            return null;
        }
        return nodeOwner;
    }
    function isSyntheticSlotElement(node) {
        return isSlotElement(node) && isNodeShadowed(node);
    }
    function isSlotElement(node) {
        return node instanceof HTMLSlotElement;
    }
    function isNodeOwnedBy(owner, node) {
        if (process.env.NODE_ENV !== 'production') {
            if (!(owner instanceof HTMLElement)) {
                // eslint-disable-next-line no-console
                console.error(`isNodeOwnedBy() should be called with an element as the first argument`);
            }
            if (!(node instanceof _Node)) {
                // eslint-disable-next-line no-console
                console.error(`isNodeOwnedBy() should be called with a node as the second argument`);
            }
            if (!(compareDocumentPosition.call(node, owner) & DOCUMENT_POSITION_CONTAINS)) {
                // eslint-disable-next-line no-console
                console.error(`isNodeOwnedBy() should never be called with a node that is not a child node of of the given owner`);
            }
        }
        const ownerKey = getNodeNearestOwnerKey(node);
        if (isUndefined(ownerKey)) {
            // in case of root level light DOM element slotting into a synthetic shadow
            const host = parentNodeGetter.call(node);
            if (!isNull(host) && isSyntheticSlotElement(host)) {
                return false;
            }
            // in case of manually inserted elements
            return true;
        }
        return getNodeKey(owner) === ownerKey;
    }
    function shadowRootChildNodes(root) {
        const elm = getHost(root);
        return getAllMatches(elm, arrayFromCollection(childNodesGetter.call(elm)));
    }
    function getAllMatches(owner, nodeList) {
        const filteredAndPatched = [];
        for (let i = 0, len = nodeList.length; i < len; i += 1) {
            const node = nodeList[i];
            const isOwned = isNodeOwnedBy(owner, node);
            if (isOwned) {
                // Patch querySelector, querySelectorAll, etc
                // if element is owned by VM
                ArrayPush.call(filteredAndPatched, node);
            }
        }
        return filteredAndPatched;
    }
    function getFirstMatch(owner, nodeList) {
        for (let i = 0, len = nodeList.length; i < len; i += 1) {
            if (isNodeOwnedBy(owner, nodeList[i])) {
                return nodeList[i];
            }
        }
        return null;
    }
    function shadowRootQuerySelector(root, selector) {
        const elm = getHost(root);
        const nodeList = arrayFromCollection(querySelectorAll$1.call(elm, selector));
        return getFirstMatch(elm, nodeList);
    }
    function shadowRootQuerySelectorAll(root, selector) {
        const elm = getHost(root);
        const nodeList = querySelectorAll$1.call(elm, selector);
        return getAllMatches(elm, arrayFromCollection(nodeList));
    }
    function getFilteredChildNodes(node) {
        if (!isSyntheticShadowHost(node) && !isSlotElement(node)) {
            // regular element - fast path
            const children = childNodesGetter.call(node);
            return arrayFromCollection(children);
        }
        if (isSyntheticShadowHost(node)) {
            // we need to get only the nodes that were slotted
            const slots = arrayFromCollection(querySelectorAll$1.call(node, 'slot'));
            const resolver = getShadowRootResolver(getShadowRoot(node));
            return ArrayReduce.call(slots,
                // @ts-expect-error Array#reduce has a generic that gets lost in our retyped ArrayReduce
                (seed, slot) => {
                    if (resolver === getShadowRootResolver(slot)) {
                        ArrayPush.apply(seed, getFilteredSlotAssignedNodes(slot));
                    }
                    return seed;
                }, []);
        }
        else {
            // slot element
            const children = arrayFromCollection(childNodesGetter.call(node));
            const resolver = getShadowRootResolver(node);
            return ArrayFilter.call(children, (child) => resolver === getShadowRootResolver(child));
        }
    }
    function getFilteredSlotAssignedNodes(slot) {
        const owner = getNodeOwner(slot);
        if (isNull(owner)) {
            return [];
        }
        const childNodes = arrayFromCollection(childNodesGetter.call(slot));
        return ArrayFilter.call(childNodes, (child) => !isNodeShadowed(child) || !isNodeOwnedBy(owner, child));
    }

    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    /**
     @license
     Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
     This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
     The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
     The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
     Code distributed by Google as part of the polymer project is also
     subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
     */
// This code is inspired by Polymer ShadyDOM Polyfill
    function getInnerHTML(node) {
        let s = '';
        const childNodes = getFilteredChildNodes(node);
        for (let i = 0, len = childNodes.length; i < len; i += 1) {
            s += getOuterHTML(childNodes[i]);
        }
        return s;
    }

    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    /**
     @license
     Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
     This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
     The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
     The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
     Code distributed by Google as part of the polymer project is also
     subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
     */
// This code is inspired by Polymer ShadyDOM Polyfill
// http://www.whatwg.org/specs/web-apps/current-work/multipage/the-end.html#escapingString
    const escapeAttrRegExp = /[&\u00A0"]/g;
    const escapeDataRegExp = /[&\u00A0<>]/g;
    const { replace, toLowerCase } = String.prototype;
    function escapeReplace(c) {
        switch (c) {
            case '&':
                return '&amp;';
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '"':
                return '&quot;';
            case '\u00A0':
                return '&nbsp;';
            default:
                return '';
        }
    }
    function escapeAttr(s) {
        return replace.call(s, escapeAttrRegExp, escapeReplace);
    }
    function escapeData(s) {
        return replace.call(s, escapeDataRegExp, escapeReplace);
    }
// http://www.whatwg.org/specs/web-apps/current-work/#void-elements
    const voidElements = new Set([
        'AREA',
        'BASE',
        'BR',
        'COL',
        'COMMAND',
        'EMBED',
        'HR',
        'IMG',
        'INPUT',
        'KEYGEN',
        'LINK',
        'META',
        'PARAM',
        'SOURCE',
        'TRACK',
        'WBR',
    ]);
    const plaintextParents = new Set([
        'STYLE',
        'SCRIPT',
        'XMP',
        'IFRAME',
        'NOEMBED',
        'NOFRAMES',
        'PLAINTEXT',
        'NOSCRIPT',
    ]);
    function getOuterHTML(node) {
        switch (node.nodeType) {
            case ELEMENT_NODE: {
                const { attributes: attrs } = node;
                const tagName = tagNameGetter.call(node);
                let s = '<' + toLowerCase.call(tagName);
                for (let i = 0, attr; (attr = attrs[i]); i++) {
                    s += ' ' + attr.name + '="' + escapeAttr(attr.value) + '"';
                }
                s += '>';
                if (voidElements.has(tagName)) {
                    return s;
                }
                return s + getInnerHTML(node) + '</' + toLowerCase.call(tagName) + '>';
            }
            case TEXT_NODE: {
                const { data, parentNode } = node;
                if (parentNode instanceof Element &&
                    plaintextParents.has(tagNameGetter.call(parentNode))) {
                    return data;
                }
                return escapeData(data);
            }
            case CDATA_SECTION_NODE: {
                return `<!CDATA[[${node.data}]]>`;
            }
            case PROCESSING_INSTRUCTION_NODE: {
                return `<?${node.target} ${node.data}?>`;
            }
            case COMMENT_NODE: {
                return `<!--${node.data}-->`;
            }
            default: {
                // intentionally ignoring unknown node types
                // Note: since this routine is always invoked for childNodes
                // we can safety ignore type 9, 10 and 99 (document, fragment and doctype)
                return '';
            }
        }
    }

    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    /**
     @license
     Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
     This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
     The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
     The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
     Code distributed by Google as part of the polymer project is also
     subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
     */
// This code is inspired by Polymer ShadyDOM Polyfill
    function getTextContent(node) {
        switch (node.nodeType) {
            case ELEMENT_NODE: {
                const childNodes = getFilteredChildNodes(node);
                let content = '';
                for (let i = 0, len = childNodes.length; i < len; i += 1) {
                    const currentNode = childNodes[i];
                    if (currentNode.nodeType !== COMMENT_NODE) {
                        content += getTextContent(currentNode);
                    }
                }
                return content;
            }
            default:
                return node.nodeValue;
        }
    }

    /*
     * Copyright (c) 2024, Salesforce, Inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    const Items$1 = new WeakMap();
    function StaticNodeList() {
        throw new TypeError('Illegal constructor');
    }
    StaticNodeList.prototype = create(NodeList.prototype, {
        constructor: {
            writable: true,
            configurable: true,
            value: StaticNodeList,
        },
        item: {
            writable: true,
            enumerable: true,
            configurable: true,
            value(index) {
                return this[index];
            },
        },
        length: {
            enumerable: true,
            configurable: true,
            get() {
                return Items$1.get(this).length;
            },
        },
        // Iterator protocol
        forEach: {
            writable: true,
            enumerable: true,
            configurable: true,
            value(cb, thisArg) {
                forEach.call(Items$1.get(this), cb, thisArg);
            },
        },
        entries: {
            writable: true,
            enumerable: true,
            configurable: true,
            value() {
                return ArrayMap.call(Items$1.get(this), (v, i) => [i, v]);
            },
        },
        keys: {
            writable: true,
            enumerable: true,
            configurable: true,
            value() {
                return ArrayMap.call(Items$1.get(this), (_v, i) => i);
            },
        },
        values: {
            writable: true,
            enumerable: true,
            configurable: true,
            value() {
                return Items$1.get(this);
            },
        },
        [Symbol.iterator]: {
            writable: true,
            configurable: true,
            value() {
                let nextIndex = 0;
                return {
                    next: () => {
                        const items = Items$1.get(this);
                        return nextIndex < items.length
                            ? {
                                value: items[nextIndex++],
                                done: false,
                            }
                            : {
                                done: true,
                            };
                    },
                };
            },
        },
        [Symbol.toStringTag]: {
            configurable: true,
            get() {
                return 'NodeList';
            },
        },
        // IE11 doesn't support Symbol.toStringTag, in which case we
        // provide the regular toString method.
        toString: {
            writable: true,
            configurable: true,
            value() {
                return '[object NodeList]';
            },
        },
    });
// prototype inheritance dance
    setPrototypeOf(StaticNodeList, NodeList);
    function createStaticNodeList(items) {
        const nodeList = create(StaticNodeList.prototype);
        Items$1.set(nodeList, items);
        // setting static indexes
        forEach.call(items, (item, index) => {
            defineProperty(nodeList, index, {
                value: item,
                enumerable: true,
                configurable: true,
            });
        });
        return nodeList;
    }

    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    /**
     @license
     Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
     This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
     The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
     The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
     Code distributed by Google as part of the polymer project is also
     subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
     */
    function pathComposer(startNode, composed) {
        const composedPath = [];
        if (startNode instanceof Window) ;
        else if (startNode instanceof _Node) {
            startNode.getRootNode();
        }
        else {
            return composedPath;
        }
        let current = startNode;
        while (!isNull(current)) {
            composedPath.push(current);
            if (current instanceof Element || current instanceof Text) {
                const assignedSlot = current.assignedSlot;
                if (!isNull(assignedSlot)) {
                    current = assignedSlot;
                }
                else {
                    current = current.parentNode;
                }
            }
            else if (isSyntheticOrNativeShadowRoot(current) && (composed)) {
                current = current.host;
            }
            else if (current instanceof _Node) {
                current = current.parentNode;
            }
            else {
                // could be Window
                current = null;
            }
        }
        let doc;
        if (startNode instanceof Window) {
            doc = startNode.document;
        }
        else {
            doc = getOwnerDocument(startNode);
        }
        // event composedPath includes window when startNode's ownerRoot is document
        if (composedPath[composedPath.length - 1] === doc) {
            composedPath.push(window);
        }
        return composedPath;
    }

    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    /**
     @license
     Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
     This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
     The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
     The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
     Code distributed by Google as part of the polymer project is also
     subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
     */
    function retarget(refNode, path) {
        if (isNull(refNode)) {
            return null;
        }
        // If ANCESTOR's root is not a shadow root or ANCESTOR's root is BASE's
        // shadow-including inclusive ancestor, return ANCESTOR.
        const refNodePath = pathComposer(refNode, true);
        const p$ = path;
        for (let i = 0, ancestor, lastRoot, root, rootIdx; i < p$.length; i++) {
            ancestor = p$[i];
            root = ancestor instanceof Window ? ancestor : ancestor.getRootNode();
            // Retarget to ancestor if ancestor is not shadowed
            if (!isSyntheticOrNativeShadowRoot(root)) {
                return ancestor;
            }
            if (root !== lastRoot) {
                rootIdx = refNodePath.indexOf(root);
                lastRoot = root;
            }
            // Retarget to ancestor if ancestor is shadowed by refNode's shadow root
            if (!isUndefined(rootIdx) && rootIdx > -1) {
                return ancestor;
            }
        }
        return null;
    }

    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    function fauxElementFromPoint(context, doc, left, top) {
        const element = elementFromPoint.call(doc, left, top);
        if (isNull(element)) {
            return element;
        }
        return retarget(context, pathComposer(element, true));
    }

    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
// Walk up the DOM tree, collecting all shadow roots plus the document root
    function getAllRootNodes(node) {
        const rootNodes = [];
        let currentRootNode = node.getRootNode();
        while (!isUndefined(currentRootNode)) {
            rootNodes.push(currentRootNode);
            currentRootNode = currentRootNode.host?.getRootNode();
        }
        return rootNodes;
    }
// Keep searching up the host tree until we find an element that is within the immediate shadow root
    const findAncestorHostInImmediateShadowRoot = (rootNode, targetRootNode) => {
        let host;
        while (!isUndefined((host = rootNode.host))) {
            const thisRootNode = host.getRootNode();
            if (thisRootNode === targetRootNode) {
                return host;
            }
            rootNode = thisRootNode;
        }
    };
    function fauxElementsFromPoint(context, doc, left, top) {
        const elements = elementsFromPoint.call(doc, left, top);
        const result = [];
        const rootNodes = getAllRootNodes(context);
        // Filter the elements array to only include those elements that are in this shadow root or in one of its
        // ancestor roots. This matches Chrome and Safari's implementation (but not Firefox's, which only includes
        // elements in the immediate shadow root: https://crbug.com/1207863#c4).
        if (!isNull(elements)) {
            // can be null in IE https://developer.mozilla.org/en-US/docs/Web/API/Document/elementsFromPoint#browser_compatibility
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];
                if (isSyntheticSlotElement(element)) {
                    continue;
                }
                const elementRootNode = element.getRootNode();
                if (ArrayIndexOf.call(rootNodes, elementRootNode) !== -1) {
                    ArrayPush.call(result, element);
                    continue;
                }
                // In cases where the host element is not visible but its shadow descendants are, then
                // we may get the shadow descendant instead of the host element here. (The
                // browser doesn't know the difference in synthetic shadow DOM.)
                // In native shadow DOM, however, elementsFromPoint would return the host but not
                // the child. So we need to detect if this shadow element's host is accessible from
                // the context's shadow root. Note we also need to be careful not to add the host
                // multiple times.
                const ancestorHost = findAncestorHostInImmediateShadowRoot(elementRootNode, rootNodes[0]);
                if (!isUndefined(ancestorHost) &&
                    ArrayIndexOf.call(elements, ancestorHost) === -1 &&
                    ArrayIndexOf.call(result, ancestorHost) === -1) {
                    ArrayPush.call(result, ancestorHost);
                }
            }
        }
        return result;
    }

    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    const Items = new WeakMap();
    function StaticHTMLCollection() {
        throw new TypeError('Illegal constructor');
    }
    StaticHTMLCollection.prototype = create(HTMLCollection.prototype, {
        constructor: {
            writable: true,
            configurable: true,
            value: StaticHTMLCollection,
        },
        item: {
            writable: true,
            enumerable: true,
            configurable: true,
            value(index) {
                return this[index];
            },
        },
        length: {
            enumerable: true,
            configurable: true,
            get() {
                return Items.get(this).length;
            },
        },
        // https://dom.spec.whatwg.org/#dom-htmlcollection-nameditem-key
        namedItem: {
            writable: true,
            enumerable: true,
            configurable: true,
            value(name) {
                if (name === '') {
                    return null;
                }
                const items = Items.get(this);
                for (let i = 0, len = items.length; i < len; i++) {
                    const item = items[len];
                    if (name === getAttribute.call(item, 'id') ||
                        name === getAttribute.call(item, 'name')) {
                        return item;
                    }
                }
                return null;
            },
        },
        [Symbol.toStringTag]: {
            configurable: true,
            get() {
                return 'HTMLCollection';
            },
        },
        // IE11 doesn't support Symbol.toStringTag, in which case we
        // provide the regular toString method.
        toString: {
            writable: true,
            configurable: true,
            value() {
                return '[object HTMLCollection]';
            },
        },
    });
// prototype inheritance dance
    setPrototypeOf(StaticHTMLCollection, HTMLCollection);
    function createStaticHTMLCollection(items) {
        const collection = create(StaticHTMLCollection.prototype);
        Items.set(collection, items);
        // setting static indexes
        forEach.call(items, (item, index) => {
            defineProperty(collection, index, {
                value: item,
                enumerable: true,
                configurable: true,
            });
        });
        return collection;
    }

    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    /**
     * This method checks whether or not the content of the node is computed
     * based on the light-dom slotting mechanism. This applies to synthetic slot elements
     * and elements with shadow dom attached to them. It doesn't apply to native slot elements
     * because we don't want to patch the children getters for those elements.
     * @param node
     */
    function hasMountedChildren(node) {
        return isSyntheticSlotElement(node) || isSyntheticShadowHost(node);
    }
    function getShadowParent(node, value) {
        const owner = getNodeOwner(node);
        if (value === owner) {
            // walking up via parent chain might end up in the shadow root element
            return getShadowRoot(owner);
        }
        else if (value instanceof Element) {
            if (getNodeNearestOwnerKey(node) === getNodeNearestOwnerKey(value)) {
                // the element and its parent node belong to the same shadow root
                return value;
            }
            else if (!isNull(owner) && isSlotElement(value)) {
                // slotted elements must be top level childNodes of the slot element
                // where they slotted into, but its shadowed parent is always the
                // owner of the slot.
                const slotOwner = getNodeOwner(value);
                if (!isNull(slotOwner) && isNodeOwnedBy(owner, slotOwner)) {
                    // it is a slotted element, and therefore its parent is always going to be the host of the slot
                    return slotOwner;
                }
            }
        }
        return null;
    }
    function hasChildNodesPatched() {
        return getInternalChildNodes(this).length > 0;
    }
    function firstChildGetterPatched() {
        const childNodes = getInternalChildNodes(this);
        return childNodes[0] || null;
    }
    function lastChildGetterPatched() {
        const childNodes = getInternalChildNodes(this);
        return childNodes[childNodes.length - 1] || null;
    }
    function textContentGetterPatched() {
        return getTextContent(this);
    }
    function textContentSetterPatched(value) {
        textContextSetter.call(this, value);
    }
    function parentNodeGetterPatched() {
        const value = parentNodeGetter.call(this);
        if (isNull(value)) {
            return value;
        }
        // TODO [#1635]: this needs optimization, maybe implementing it based on this.assignedSlot
        return getShadowParent(this, value);
    }
    function parentElementGetterPatched() {
        const value = parentNodeGetter.call(this);
        if (isNull(value)) {
            return null;
        }
        const parentNode = getShadowParent(this, value);
        // it could be that the parentNode is the shadowRoot, in which case
        // we need to return null.
        // TODO [#1635]: this needs optimization, maybe implementing it based on this.assignedSlot
        return parentNode instanceof Element ? parentNode : null;
    }
    function compareDocumentPositionPatched(otherNode) {
        if (this === otherNode) {
            return 0;
        }
        else if (this.getRootNode() === otherNode) {
            // "this" is in a shadow tree where the shadow root is the "otherNode".
            return 10; // Node.DOCUMENT_POSITION_CONTAINS | Node.DOCUMENT_POSITION_PRECEDING
        }
        else if (getNodeOwnerKey(this) !== getNodeOwnerKey(otherNode)) {
            // "this" and "otherNode" belongs to 2 different shadow tree.
            return 35; // Node.DOCUMENT_POSITION_DISCONNECTED | Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC | Node.DOCUMENT_POSITION_PRECEDING
        }
        // Since "this" and "otherNode" are part of the same shadow tree we can safely rely to the native
        // Node.compareDocumentPosition implementation.
        return compareDocumentPosition.call(this, otherNode);
    }
    function containsPatched(otherNode) {
        if (otherNode == null || getNodeOwnerKey(this) !== getNodeOwnerKey(otherNode)) {
            // it is from another shadow
            return false;
        }
        return (compareDocumentPosition.call(this, otherNode) & DOCUMENT_POSITION_CONTAINED_BY) !== 0;
    }
    function cloneNodePatched(deep) {
        const clone = cloneNode.call(this, false);
        // Per spec, browsers only care about truthy values
        // Not strict true or false
        if (!deep) {
            return clone;
        }
        const childNodes = getInternalChildNodes(this);
        for (let i = 0, len = childNodes.length; i < len; i += 1) {
            clone.appendChild(childNodes[i].cloneNode(true));
        }
        return clone;
    }
    /**
     * This method only applies to elements with a shadow or slots
     */
    function childNodesGetterPatched() {
        if (isSyntheticShadowHost(this)) {
            const owner = getNodeOwner(this);
            const filteredChildNodes = getFilteredChildNodes(this);
            // No need to filter by owner for non-shadowed nodes
            const childNodes = isNull(owner)
                ? filteredChildNodes
                : getAllMatches(owner, filteredChildNodes);
            return createStaticNodeList(childNodes);
        }
        // nothing to do here since this does not have a synthetic shadow attached to it
        // TODO [#1636]: what about slot elements?
        return childNodesGetter.call(this);
    }
    const nativeGetRootNode = _Node.prototype.getRootNode;
    /**
     * Get the root by climbing up the dom tree, beyond the shadow root
     * If Node.prototype.getRootNode is supported, use it
     * else, assume we are working in non-native shadow mode and climb using parentNode
     */
    const getDocumentOrRootNode = !isUndefined(nativeGetRootNode)
        ? nativeGetRootNode
        : function () {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            let node = this;
            let nodeParent;
            while (!isNull((nodeParent = parentNodeGetter.call(node)))) {
                node = nodeParent;
            }
            return node;
        };
    /**
     * Get the shadow root
     * getNodeOwner() returns the host element that owns the given node
     * Note: getNodeOwner() returns null when running in native-shadow mode.
     * Fallback to using the native getRootNode() to discover the root node.
     * This is because, it is not possible to inspect the node and decide if it is part
     * of a native shadow or the synthetic shadow.
     * @param node
     */
    function getNearestRoot(node) {
        const ownerNode = getNodeOwner(node);
        if (isNull(ownerNode)) {
            // we hit a wall, either we are in native shadow mode or the node is not in lwc boundary.
            return getDocumentOrRootNode.call(node);
        }
        return getShadowRoot(ownerNode);
    }
    /**
     * If looking for a root node beyond shadow root by calling `node.getRootNode({composed: true})`, use the original `Node.prototype.getRootNode` method
     * to return the root of the dom tree. In IE11 and Edge, Node.prototype.getRootNode is
     * [not supported](https://developer.mozilla.org/en-US/docs/Web/API/Node/getRootNode#Browser_compatibility). The root node is discovered by manually
     * climbing up the dom tree.
     *
     * If looking for a shadow root of a node by calling `node.getRootNode({composed: false})` or `node.getRootNode()`,
     *
     * 1. Try to identify the host element that owns the give node.
     * i. Identify the shadow tree that the node belongs to
     * ii. If the node belongs to a shadow tree created by engine, return the shadowRoot of the host element that owns the shadow tree
     * 2. The host identification logic returns null in two cases:
     * i. The node does not belong to a shadow tree created by engine
     * ii. The engine is running in native shadow dom mode
     * If so, use the original Node.prototype.getRootNode to fetch the root node(or manually climb up the dom tree where getRootNode() is unsupported)
     *
     * _Spec_: https://dom.spec.whatwg.org/#dom-node-getrootnode
     * @param options
     */
    function getRootNodePatched(options) {
        const composed = isUndefined(options) ? false : !!options.composed;
        return isTrue(composed) ? getDocumentOrRootNode.call(this, options) : getNearestRoot(this);
    }
// Non-deep-traversing patches: this descriptor map includes all descriptors that
// do not give access to nodes beyond the immediate children.
    defineProperties(_Node.prototype, {
        firstChild: {
            get() {
                if (hasMountedChildren(this)) {
                    return firstChildGetterPatched.call(this);
                }
                return firstChildGetter.call(this);
            },
            enumerable: true,
            configurable: true,
        },
        lastChild: {
            get() {
                if (hasMountedChildren(this)) {
                    return lastChildGetterPatched.call(this);
                }
                return lastChildGetter.call(this);
            },
            enumerable: true,
            configurable: true,
        },
        textContent: {
            get() {
                // Note: we deviate from native shadow here, but are not fixing
                // due to backwards compat: https://github.com/salesforce/lwc/pull/3103
                if (isNodeShadowed(this) || isSyntheticShadowHost(this)) {
                    return textContentGetterPatched.call(this);
                }
                return textContentGetter.call(this);
            },
            set: textContentSetterPatched,
            enumerable: true,
            configurable: true,
        },
        parentNode: {
            get() {
                if (isNodeShadowed(this)) {
                    return parentNodeGetterPatched.call(this);
                }
                const parentNode = parentNodeGetter.call(this);
                // Handle the case where a top level light DOM element is slotted into a synthetic
                // shadow slot.
                if (!isNull(parentNode) && isSyntheticSlotElement(parentNode)) {
                    return getNodeOwner(parentNode);
                }
                return parentNode;
            },
            enumerable: true,
            configurable: true,
        },
        parentElement: {
            get() {
                if (isNodeShadowed(this)) {
                    return parentElementGetterPatched.call(this);
                }
                const parentElement = parentElementGetter.call(this);
                // Handle the case where a top level light DOM element is slotted into a synthetic
                // shadow slot.
                if (!isNull(parentElement) && isSyntheticSlotElement(parentElement)) {
                    return getNodeOwner(parentElement);
                }
                return parentElement;
            },
            enumerable: true,
            configurable: true,
        },
        childNodes: {
            get() {
                if (hasMountedChildren(this)) {
                    return childNodesGetterPatched.call(this);
                }
                return childNodesGetter.call(this);
            },
            enumerable: true,
            configurable: true,
        },
        hasChildNodes: {
            value() {
                if (hasMountedChildren(this)) {
                    return hasChildNodesPatched.call(this);
                }
                return hasChildNodes.call(this);
            },
            enumerable: true,
            writable: true,
            configurable: true,
        },
        compareDocumentPosition: {
            value(otherNode) {
                // Note: we deviate from native shadow here, but are not fixing
                // due to backwards compat: https://github.com/salesforce/lwc/pull/3103
                if (isGlobalPatchingSkipped(this)) {
                    return compareDocumentPosition.call(this, otherNode);
                }
                return compareDocumentPositionPatched.call(this, otherNode);
            },
            enumerable: true,
            writable: true,
            configurable: true,
        },
        contains: {
            value(otherNode) {
                // 1. Node.prototype.contains() returns true if otherNode is an inclusive descendant
                //    spec: https://dom.spec.whatwg.org/#dom-node-contains
                // 2. This normalizes the behavior of this api across all browsers.
                //    In IE11, a disconnected dom element without children invoking contains() on self, returns false
                if (this === otherNode) {
                    return true;
                }
                // Note: we deviate from native shadow here, but are not fixing
                // due to backwards compat: https://github.com/salesforce/lwc/pull/3103
                if (otherNode == null) {
                    return false;
                }
                if (isNodeShadowed(this) || isSyntheticShadowHost(this)) {
                    return containsPatched.call(this, otherNode);
                }
                return contains.call(this, otherNode);
            },
            enumerable: true,
            writable: true,
            configurable: true,
        },
        cloneNode: {
            value(deep) {
                // Note: we deviate from native shadow here, but are not fixing
                // due to backwards compat: https://github.com/salesforce/lwc/pull/3103
                if (isNodeShadowed(this) || isSyntheticShadowHost(this)) {
                    return cloneNodePatched.call(this, deep);
                }
                return cloneNode.call(this, deep);
            },
            enumerable: true,
            writable: true,
            configurable: true,
        },
        getRootNode: {
            value: getRootNodePatched,
            enumerable: true,
            configurable: true,
            writable: true,
        },
        isConnected: {
            enumerable: true,
            configurable: true,
            get() {
                return isConnected.call(this);
            },
        },
    });
    const getInternalChildNodes = function (node) {
        return node.childNodes;
    };
// IE11 extra patches for wrong prototypes
    if (hasOwnProperty.call(HTMLElement.prototype, 'contains')) {
        defineProperty(HTMLElement.prototype, 'contains', getOwnPropertyDescriptor(_Node.prototype, 'contains'));
    }
    if (hasOwnProperty.call(HTMLElement.prototype, 'parentElement')) {
        defineProperty(HTMLElement.prototype, 'parentElement', getOwnPropertyDescriptor(_Node.prototype, 'parentElement'));
    }

    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    const eventTargetGetter = getOwnPropertyDescriptor(Event.prototype, 'target').get;
    const eventCurrentTargetGetter = getOwnPropertyDescriptor(Event.prototype, 'currentTarget').get;
    getOwnPropertyDescriptor(FocusEvent.prototype, 'relatedTarget').get;
// IE does not implement composedPath() but that's ok because we only use this instead of our
// composedPath() polyfill when dealing with native shadow DOM components in mixed mode. Defaulting
// to a NOOP just to be safe, even though this is almost guaranteed to be defined such a scenario.
    hasOwnProperty.call(Event.prototype, 'composedPath')
        ? Event.prototype.composedPath
        : () => [];

    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    const ComposedPathMap = new WeakMap();
    function shouldInvokeListener(event, target, currentTarget) {
        // Subsequent logic assumes that `currentTarget` must be contained in the composed path for the listener to be
        // invoked, but this is not always the case. `composedPath()` will sometimes return an empty array, even when the
        // listener should be invoked (e.g., a disconnected instance of EventTarget, an instance of XMLHttpRequest, etc).
        if (target === currentTarget) {
            return true;
        }
        let composedPath = ComposedPathMap.get(event);
        if (isUndefined(composedPath)) {
            composedPath = event.composedPath();
            ComposedPathMap.set(event, composedPath);
        }
        return composedPath.includes(currentTarget);
    }

    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    const eventToContextMap = new WeakMap();
    function getEventHandler(listener) {
        if (isFunction(listener)) {
            return listener;
        }
        else {
            return listener.handleEvent;
        }
    }
    function isEventListenerOrEventListenerObject(listener) {
        return isFunction(listener) || isFunction(listener?.handleEvent);
    }
    const customElementToWrappedListeners = new WeakMap();
    function getEventMap(elm) {
        let listenerInfo = customElementToWrappedListeners.get(elm);
        if (isUndefined(listenerInfo)) {
            listenerInfo = create(null);
            customElementToWrappedListeners.set(elm, listenerInfo);
        }
        return listenerInfo;
    }
    /**
     * Events dispatched on shadow roots actually end up being dispatched on their hosts. This means that the event.target
     * property of events dispatched on shadow roots always resolve to their host. This function understands this
     * abstraction and properly returns a reference to the shadow root when appropriate.
     * @param event
     */
    function getActualTarget(event) {
        return eventToShadowRootMap.get(event) ?? eventTargetGetter.call(event);
    }
    const shadowRootEventListenerMap = new WeakMap();
    function getManagedShadowRootListener(listener) {
        if (!isEventListenerOrEventListenerObject(listener)) {
            throw new TypeError(); // avoiding problems with non-valid listeners
        }
        let managedListener = shadowRootEventListenerMap.get(listener);
        if (isUndefined(managedListener)) {
            managedListener = {
                identity: listener,
                placement: 1 /* EventListenerContext.SHADOW_ROOT_LISTENER */,
                handleEvent(event) {
                    // currentTarget is always defined inside an event listener
                    let currentTarget = eventCurrentTargetGetter.call(event);
                    // If currentTarget is not an instance of a native shadow root then we're dealing with a
                    // host element whose synthetic shadow root must be accessed via getShadowRoot().
                    if (!isInstanceOfNativeShadowRoot(currentTarget)) {
                        currentTarget = getShadowRoot(currentTarget);
                    }
                    const actualTarget = getActualTarget(event);
                    if (shouldInvokeListener(event, actualTarget, currentTarget)) {
                        getEventHandler(listener).call(currentTarget, event);
                    }
                },
            };
            shadowRootEventListenerMap.set(listener, managedListener);
        }
        return managedListener;
    }
    function indexOfManagedListener(listeners, listener) {
        return ArrayFindIndex.call(listeners, (l) => l.identity === listener.identity);
    }
    function domListener(evt) {
        let immediatePropagationStopped = false;
        let propagationStopped = false;
        const { type, stopImmediatePropagation, stopPropagation } = evt;
        // currentTarget is always defined
        const currentTarget = eventCurrentTargetGetter.call(evt);
        const listenerMap = getEventMap(currentTarget);
        const listeners = listenerMap[type]; // it must have listeners at this point
        defineProperty(evt, 'stopImmediatePropagation', {
            value() {
                immediatePropagationStopped = true;
                stopImmediatePropagation.call(evt);
            },
            writable: true,
            enumerable: true,
            configurable: true,
        });
        defineProperty(evt, 'stopPropagation', {
            value() {
                propagationStopped = true;
                stopPropagation.call(evt);
            },
            writable: true,
            enumerable: true,
            configurable: true,
        });
        // in case a listener adds or removes other listeners during invocation
        const bookkeeping = ArraySlice.call(listeners);
        function invokeListenersByPlacement(placement) {
            forEach.call(bookkeeping, (listener) => {
                if (isFalse(immediatePropagationStopped) && listener.placement === placement) {
                    // making sure that the listener was not removed from the original listener queue
                    if (indexOfManagedListener(listeners, listener) !== -1) {
                        // all handlers on the custom element should be called with undefined 'this'
                        listener.handleEvent.call(undefined, evt);
                    }
                }
            });
        }
        eventToContextMap.set(evt, 1 /* EventListenerContext.SHADOW_ROOT_LISTENER */);
        invokeListenersByPlacement(1 /* EventListenerContext.SHADOW_ROOT_LISTENER */);
        if (isFalse(immediatePropagationStopped) && isFalse(propagationStopped)) {
            // doing the second iteration only if the first one didn't interrupt the event propagation
            eventToContextMap.set(evt, 0 /* EventListenerContext.CUSTOM_ELEMENT_LISTENER */);
            invokeListenersByPlacement(0 /* EventListenerContext.CUSTOM_ELEMENT_LISTENER */);
        }
        eventToContextMap.set(evt, 2 /* EventListenerContext.UNKNOWN_LISTENER */);
    }
    function attachDOMListener(elm, type, managedListener) {
        const listenerMap = getEventMap(elm);
        let listeners = listenerMap[type];
        if (isUndefined(listeners)) {
            listeners = listenerMap[type] = [];
        }
        // Prevent identical listeners from subscribing to the same event type.
        // TODO [#1824]: Options will also play a factor in deduping if we introduce options support
        if (indexOfManagedListener(listeners, managedListener) !== -1) {
            return;
        }
        // only add to DOM if there is no other listener on the same placement yet
        if (listeners.length === 0) {
            addEventListener.call(elm, type, domListener);
        }
        ArrayPush.call(listeners, managedListener);
    }
    function detachDOMListener(elm, type, managedListener) {
        const listenerMap = getEventMap(elm);
        let index;
        let listeners;
        if (!isUndefined((listeners = listenerMap[type])) &&
            (index = indexOfManagedListener(listeners, managedListener)) !== -1) {
            ArraySplice.call(listeners, index, 1);
            // only remove from DOM if there is no other listener on the same placement
            if (listeners.length === 0) {
                removeEventListener.call(elm, type, domListener);
            }
        }
    }
    function addShadowRootEventListener(sr, type, listener, _options) {
        if (process.env.NODE_ENV !== 'production') {
            if (!isEventListenerOrEventListenerObject(listener)) {
                throw new TypeError(`Invalid second argument for ShadowRoot.addEventListener() in ${toString(sr)} for event "${type}". Expected EventListener or EventListenerObject but received ${toString(listener)}.`);
            }
        }
        if (isEventListenerOrEventListenerObject(listener)) {
            const elm = getHost(sr);
            const managedListener = getManagedShadowRootListener(listener);
            attachDOMListener(elm, type, managedListener);
        }
    }
    function removeShadowRootEventListener(sr, type, listener, _options) {
        if (isEventListenerOrEventListenerObject(listener)) {
            const elm = getHost(sr);
            const managedListener = getManagedShadowRootListener(listener);
            detachDOMListener(elm, type, managedListener);
        }
    }

    /*
     * Copyright (c) 2023, Salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    const InternalSlot = new WeakMap();
    const { createDocumentFragment } = document;
    function getInternalSlot(root) {
        const record = InternalSlot.get(root);
        if (isUndefined(record)) {
            throw new TypeError();
        }
        return record;
    }
    defineProperty(_Node.prototype, KEY__SHADOW_RESOLVER, {
        set(fn) {
            if (isUndefined(fn))
                return;
            this[KEY__SHADOW_RESOLVER_PRIVATE] = fn;
            // TODO [#1164]: temporary propagation of the key
            setNodeOwnerKey(this, fn.nodeKey);
        },
        get() {
            return this[KEY__SHADOW_RESOLVER_PRIVATE];
        },
        configurable: true,
        enumerable: true,
    });
    function getShadowRootResolver(node) {
        return node[KEY__SHADOW_RESOLVER];
    }
    function setShadowRootResolver(node, fn) {
        node[KEY__SHADOW_RESOLVER] = fn;
    }
    function getHost(root) {
        return getInternalSlot(root).host;
    }
    function getShadowRoot(elm) {
        return getInternalSlot(elm).shadowRoot;
    }
// Intentionally adding `Node` here in addition to `Element` since this check is harmless for nodes
// and we can avoid having to cast the type before calling this method in a few places.
    function isSyntheticShadowHost(node) {
        const shadowRootRecord = InternalSlot.get(node);
        return !isUndefined(shadowRootRecord) && node === shadowRootRecord.host;
    }
    function isSyntheticShadowRoot(node) {
        const shadowRootRecord = InternalSlot.get(node);
        return !isUndefined(shadowRootRecord) && node === shadowRootRecord.shadowRoot;
    }
    let uid = 0;
    function attachShadow(elm, options) {
        if (InternalSlot.has(elm)) {
            throw new Error(`Failed to execute 'attachShadow' on 'Element': Shadow root cannot be created on a host which already hosts a shadow tree.`);
        }
        const { mode, delegatesFocus } = options;
        // creating a real fragment for shadowRoot instance
        const doc = getOwnerDocument(elm);
        const sr = createDocumentFragment.call(doc);
        // creating shadow internal record
        const record = {
            mode,
            delegatesFocus: !!delegatesFocus,
            host: elm,
            shadowRoot: sr,
        };
        InternalSlot.set(sr, record);
        InternalSlot.set(elm, record);
        const shadowResolver = () => sr;
        const x = (shadowResolver.nodeKey = uid++);
        setNodeKey(elm, x);
        setShadowRootResolver(sr, shadowResolver);
        // correcting the proto chain
        setPrototypeOf(sr, SyntheticShadowRoot.prototype);
        return sr;
    }
    const SyntheticShadowRootDescriptors = {
        constructor: {
            writable: true,
            configurable: true,
            value: SyntheticShadowRoot,
        },
        toString: {
            writable: true,
            configurable: true,
            value() {
                return `[object ShadowRoot]`;
            },
        },
        synthetic: {
            writable: false,
            enumerable: false,
            configurable: false,
            value: true,
        },
    };
    const ShadowRootDescriptors = {
        activeElement: {
            enumerable: true,
            configurable: true,
            get() {
                const host = getHost(this);
                const doc = getOwnerDocument(host);
                const activeElement = DocumentPrototypeActiveElement.call(doc);
                if (isNull(activeElement)) {
                    return activeElement;
                }
                if ((compareDocumentPosition.call(host, activeElement) &
                        DOCUMENT_POSITION_CONTAINED_BY) ===
                    0) {
                    return null;
                }
                // activeElement must be child of the host and owned by it
                let node = activeElement;
                while (!isNodeOwnedBy(host, node)) {
                    // parentElement is always an element because we are talking up the tree knowing
                    // that it is a child of the host.
                    node = parentElementGetter.call(node);
                }
                // If we have a slot element here that means that we were dealing
                // with an element that was passed to one of our slots. In this
                // case, activeElement returns null.
                if (isSlotElement(node)) {
                    return null;
                }
                return node;
            },
        },
        delegatesFocus: {
            configurable: true,
            get() {
                return getInternalSlot(this).delegatesFocus;
            },
        },
        elementFromPoint: {
            writable: true,
            enumerable: true,
            configurable: true,
            value(left, top) {
                const host = getHost(this);
                const doc = getOwnerDocument(host);
                return fauxElementFromPoint(this, doc, left, top);
            },
        },
        elementsFromPoint: {
            writable: true,
            enumerable: true,
            configurable: true,
            value(left, top) {
                const host = getHost(this);
                const doc = getOwnerDocument(host);
                return fauxElementsFromPoint(this, doc, left, top);
            },
        },
        getSelection: {
            writable: true,
            enumerable: true,
            configurable: true,
            value() {
                throw new Error('Disallowed method "getSelection" on ShadowRoot.');
            },
        },
        host: {
            enumerable: true,
            configurable: true,
            get() {
                return getHost(this);
            },
        },
        mode: {
            configurable: true,
            get() {
                return getInternalSlot(this).mode;
            },
        },
        styleSheets: {
            enumerable: true,
            configurable: true,
            get() {
                throw new Error();
            },
        },
    };
    const eventToShadowRootMap = new WeakMap();
    const NodePatchDescriptors = {
        insertBefore: {
            writable: true,
            enumerable: true,
            configurable: true,
            value(newChild, refChild) {
                insertBefore.call(getHost(this), newChild, refChild);
                return newChild;
            },
        },
        removeChild: {
            writable: true,
            enumerable: true,
            configurable: true,
            value(oldChild) {
                removeChild.call(getHost(this), oldChild);
                return oldChild;
            },
        },
        appendChild: {
            writable: true,
            enumerable: true,
            configurable: true,
            value(newChild) {
                appendChild.call(getHost(this), newChild);
                return newChild;
            },
        },
        replaceChild: {
            writable: true,
            enumerable: true,
            configurable: true,
            value(newChild, oldChild) {
                replaceChild.call(getHost(this), newChild, oldChild);
                return oldChild;
            },
        },
        // Since the synthetic shadow root is a detached DocumentFragment, short-circuit the getRootNode behavior
        getRootNode: {
            writable: true,
            enumerable: true,
            configurable: true,
            value(options) {
                return !isUndefined(options) && isTrue(options.composed)
                    ? getHost(this).getRootNode(options)
                    : this;
            },
        },
    };
    const ElementPatchDescriptors = {
    };
    const ParentNodePatchDescriptors = {
    };
    Object.assign(SyntheticShadowRootDescriptors, NodePatchDescriptors, ParentNodePatchDescriptors, ElementPatchDescriptors, ShadowRootDescriptors);
    function SyntheticShadowRoot() {
        throw new TypeError('Illegal constructor');
    }
    SyntheticShadowRoot.prototype = create(DocumentFragment.prototype, SyntheticShadowRootDescriptors);
// `this.shadowRoot instanceof ShadowRoot` should evaluate to true even for synthetic shadow
    defineProperty(SyntheticShadowRoot, Symbol.hasInstance, {
        value: function (object) {
            // Technically we should walk up the entire prototype chain, but with SyntheticShadowRoot
            // it's reasonable to assume that no one is doing any deep subclasses here.
            return (isObject(object) &&
                !isNull(object) &&
                (isInstanceOfNativeShadowRoot(object) ||
                    getPrototypeOf(object) === SyntheticShadowRoot.prototype));
        },
    });

    function attachShadowPatched(options) {
        // To retain native behavior of the API, provide synthetic shadowRoot only when specified
        if (options[KEY__SYNTHETIC_MODE]) {
            return attachShadow(this, options);
        }
        return attachShadow$1.call(this, options);
    }
//
// Non-deep-traversing patches: this descriptor map includes all descriptors that
// do not five access to nodes beyond the immediate children.
    defineProperties(Element.prototype, {
        attachShadow: {
            value: attachShadowPatched,
            enumerable: true,
            writable: true,
            configurable: true,
        },
    });
    /**
     * Patching Element.prototype.$shadowToken$ to mark elements a portal:
     * - we use a property to allow engines to set a custom attribute that should be
     * placed into the element to sandbox the css rules defined for the template.
     * - this custom attribute must be unique.
     */
    Object.defineProperty(Element.prototype, "$shadowToken$", {
        value: undefined,
        configurable: true,
    });
