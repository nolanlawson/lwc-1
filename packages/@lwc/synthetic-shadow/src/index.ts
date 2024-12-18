/*
 * Copyright (c) 2024, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
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
    /** Detached {@linkcode Object.create}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create MDN Reference}. */
    create,
    /** Detached {@linkcode Object.defineProperties}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties MDN Reference}. */
    defineProperties,
    /** Detached {@linkcode Object.defineProperty}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty MDN Reference}. */
    defineProperty,
    /** Detached {@linkcode Object.getOwnPropertyDescriptor}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor MDN Reference}. */
    getOwnPropertyDescriptor,
    /** Detached {@linkcode Object.getPrototypeOf}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf MDN Reference}. */
    getPrototypeOf,
    /** Detached {@linkcode Object.hasOwnProperty}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty MDN Reference}. */
    hasOwnProperty,
    /** Detached {@linkcode Object.setPrototypeOf}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf MDN Reference}. */
    setPrototypeOf,
} = Object;
// For some reason, JSDoc don't get picked up for multiple renamed destructured constants (even
// though it works fine for one, e.g. isArray), so comments for these are added to the export
// statement, rather than this declaration.
const {
    indexOf: ArrayIndexOf,
    push: ArrayPush,
    forEach, // Weird anomaly!
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
 * Determines whether the argument is an object or null.
 * @param obj Value to test
 * @returns `true` if the value is an object or null.
 */
function isObject(obj) {
    return typeof obj === 'object';
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
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const DocumentPrototypeActiveElement = getOwnPropertyDescriptor(Document.prototype, 'activeElement').get;
// defaultView can be null when a document has no browsing context. For example, the owner document
// of a node in a template doesn't have a default view: https://jsfiddle.net/hv9z0q5a/
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
const {
    DOCUMENT_POSITION_CONTAINED_BY,
    DOCUMENT_POSITION_CONTAINS,
    TEXT_NODE,
} = _Node;
const {
    appendChild,
    cloneNode,
    compareDocumentPosition,
    insertBefore,
    removeChild,
    replaceChild,
} = nodePrototype;
const parentNodeGetter = getOwnPropertyDescriptor(nodePrototype, 'parentNode').get;
const ownerDocumentGetter = getOwnPropertyDescriptor(nodePrototype, 'ownerDocument').get;
const parentElementGetter = getOwnPropertyDescriptor(nodePrototype, 'parentElement').get;

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
    } else {
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

/*
 * Copyright (c) 2024, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function StaticNodeList() {
    throw new TypeError('Illegal constructor');
}

StaticNodeList.prototype = create(NodeList.prototype, {});
// prototype inheritance dance
setPrototypeOf(StaticNodeList, NodeList);

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
// Non-deep-traversing patches: this descriptor map includes all descriptors that
// do not give access to nodes beyond the immediate children.
defineProperties(_Node.prototype, {});
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

function setShadowRootResolver(node, fn) {
    node[KEY__SHADOW_RESOLVER] = fn;
}

function getHost(root) {
    return getInternalSlot(root).host;
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
};
const ElementPatchDescriptors = {};
const ParentNodePatchDescriptors = {};
Object.assign(SyntheticShadowRootDescriptors, NodePatchDescriptors, ParentNodePatchDescriptors, ElementPatchDescriptors, ShadowRootDescriptors);

function SyntheticShadowRoot() {
    throw new TypeError('Illegal constructor');
}

SyntheticShadowRoot.prototype = create(DocumentFragment.prototype, SyntheticShadowRootDescriptors);
// `this.shadowRoot instanceof ShadowRoot` should evaluate to true even for synthetic shadow
defineProperty(SyntheticShadowRoot, Symbol.hasInstance, {
    value: function(object) {
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
Object.defineProperty(Element.prototype, '$shadowToken$', {
    value: undefined,
    configurable: true,
});
/** version: 8.12.1 */
