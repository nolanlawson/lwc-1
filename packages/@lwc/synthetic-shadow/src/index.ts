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
    /** Detached {@linkcode Object.setPrototypeOf}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf MDN Reference}. */
    setPrototypeOf,
} = Object;

/**
 * Determines whether the argument is `undefined`.
 * @param obj Value to test
 * @returns `true` if the value is `undefined`.
 */
function isUndefined(obj) {
    return obj === undefined;
}

/*
 * Copyright (c) 2023, Salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const KEY__SHADOW_RESOLVER = '$shadowResolver$';
const KEY__SHADOW_RESOLVER_PRIVATE = '$$ShadowResolverKey$$';
// defaultView can be null when a document has no browsing context. For example, the owner document
// of a node in a template doesn't have a default view: https://jsfiddle.net/hv9z0q5a/
// TODO [#2472]: Remove this workaround when appropriate.
// eslint-disable-next-line @lwc/lwc-internal/no-global-node
const _Node = Node;
const nodePrototype = _Node.prototype;
const {
    appendChild,
    insertBefore,
    removeChild,
    replaceChild,
} = nodePrototype;
const ownerDocumentGetter = Object.getOwnPropertyDescriptor(nodePrototype, 'ownerDocument').get;

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

function setNodeOwnerKey(node, value) {
    Object.defineProperty(node, HostElementKey, { value, configurable: true });
}

function setNodeKey(node, value) {
    Object.defineProperty(node, ShadowedNodeKey, { value });
}

function StaticHTMLCollection() {
    throw new TypeError('Illegal constructor');
}

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

let uid = 0;

function attachShadow(elm, options) {
    // creating a real fragment for shadowRoot instance
    const doc = getOwnerDocument(elm);
    const sr = createDocumentFragment.call(doc);
    // creating shadow internal record
    const record = {
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

const SyntheticShadowRootDescriptors = {};
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
Object.assign(SyntheticShadowRootDescriptors, NodePatchDescriptors);

function SyntheticShadowRoot() {
    throw new TypeError('Illegal constructor');
}

SyntheticShadowRoot.prototype = create(DocumentFragment.prototype, SyntheticShadowRootDescriptors);

function attachShadowPatched(options) {
    return attachShadow(this, options);
}

//
// Non-deep-traversing patches: this descriptor map includes all descriptors that
// do not five access to nodes beyond the immediate children.
Object.defineProperties(Element.prototype, {
    attachShadow: {
        value: attachShadowPatched,
        enumerable: true,
        writable: true,
        configurable: true,
    },
});
