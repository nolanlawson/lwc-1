/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { globalThis, isFunction, isUndefined, setPrototypeOf } from '@lwc/shared';
import features from '@lwc/features';
import { hasCustomElements } from './has-custom-elements';
import { CreateScopedConstructor, createScopedRegistry } from './create-scoped-registry';
import type { LifecycleCallback } from '@lwc/engine-core';

export let createCustomElement: (
    tagName: string,
    upgradeCallback: LifecycleCallback,
    connectedCallback: LifecycleCallback,
    disconnectedCallback: LifecycleCallback
) => HTMLElement;

if (hasCustomElements) {
    const cachedConstructors = new Map<string, CustomElementConstructor>();
    let CachedHTMLElement: typeof HTMLElement | undefined;
    let createScopedConstructor: CreateScopedConstructor | undefined;

    // If ENABLE_NATIVE_CUSTOM_ELEMENT_LIFECYCLE is enabled, then we add connectedCallback/disconnectedCallback
    // to the prototype of the custom element.
    const addConnectedDisconnectedCallbacks = (
        Ctor: CustomElementConstructor,
        connectedCallback: LifecycleCallback,
        disconnectedCallback: LifecycleCallback
    ) => {
        if (features.ENABLE_NATIVE_CUSTOM_ELEMENT_LIFECYCLE) {
            Ctor.prototype.connectedCallback = function () {
                connectedCallback(this);
            };
            Ctor.prototype.disconnectedCallback = function () {
                disconnectedCallback(this);
            };
        }
    };

    // Creates a constructor that is intended to be used as the UserConstructor in a scoped (pivots) registry.
    // In this case, the upgradeCallback only needs to be defined once because we create these on-demand,
    // multiple times per tag name.
    const createUserConstructor = (upgradeCallback: LifecycleCallback) => {
        // TODO [#2972]: this class should expose observedAttributes as necessary
        class UserConstructor extends (CachedHTMLElement!) {
            constructor() {
                super();
                upgradeCallback(this);
            }
        }
        return UserConstructor;
    };

    // Creates a constructor that is intended to be used as a vanilla custom element, except that the upgradeCallback is
    // passed in to the constructor so LWC can reuse the same custom element constructor for multiple components.
    // This should be created once per tag name.
    const createLwcElementConstructor = () => {
        // TODO [#2972]: this class should expose observedAttributes as necessary
        class LwcElementConstructor extends HTMLElement {
            constructor(upgradeCallback: LifecycleCallback) {
                super();
                // The upgradeCallback will be undefined in cases where LWC is not creating the element,
                // e.g. `document.createElement('x-foo')`
                if (isFunction(upgradeCallback)) {
                    upgradeCallback(this);
                }
            }
        }
        return LwcElementConstructor;
    };

    // Lazily initialize the scoped registry so we don't patch unnecessarily if the flag is disabled
    const initializeScopedRegistry = () => {
        if (isUndefined(createScopedConstructor)) {
            createScopedConstructor = createScopedRegistry();

            // It's important to cache window.HTMLElement here. Otherwise, someone else could overwrite window.HTMLElement (e.g.
            // another copy of the engine, or another scoping implementation) and we would get "Illegal constructor" errors
            // because the HTMLElement prototypes are mixed up.
            //
            // The reason this happens is that the scoping implementation overwrites window.HTMLElement and expects to work
            // with that version of HTMLElement. So if you load two copies of the scoping implementation in the same environment,
            // the second one may accidentally grab window.HTMLElement from the first (when doing `class extends HTMLElement`).
            // Caching avoids this problem.
            CachedHTMLElement = globalThis.HTMLElement;
        }
    };

    createCustomElement = (
        tagName: string,
        upgradeCallback: LifecycleCallback,
        connectedCallback: LifecycleCallback,
        disconnectedCallback: LifecycleCallback
    ) => {
        if (features.ENABLE_SCOPED_CUSTOM_ELEMENT_REGISTRY) {
            initializeScopedRegistry();
            const UserConstructor = createUserConstructor(upgradeCallback);
            addConnectedDisconnectedCallbacks(
                UserConstructor,
                connectedCallback,
                disconnectedCallback
            );
            const UpgradableConstructor = createScopedConstructor!(tagName, UserConstructor);
            return new UpgradableConstructor(UserConstructor);
        } else {
            // use global custom elements registry
            let UserConstructor = cachedConstructors.get(tagName);
            if (isUndefined(UserConstructor)) {
                if (!isUndefined(customElements.get(tagName))) {
                    throw new Error(
                        `Unexpected tag name "${tagName}". This name is a registered custom element, preventing LWC to upgrade the element.`
                    );
                }
                UserConstructor = createLwcElementConstructor();
                addConnectedDisconnectedCallbacks(
                    UserConstructor,
                    connectedCallback,
                    disconnectedCallback
                );
                customElements.define(tagName, UserConstructor);
                cachedConstructors.set(tagName, UserConstructor);
            }
            return new UserConstructor(upgradeCallback);
        }
    };
} else {
    // no registry available here
    const reverseRegistry: WeakMap<CustomElementConstructor, string> = new WeakMap();

    const HTMLElementConstructor = function HTMLElement(this: HTMLElement) {
        if (!(this instanceof HTMLElement)) {
            throw new TypeError(`Invalid Invocation`);
        }
        const { constructor } = this;
        const tagName = reverseRegistry.get(constructor as CustomElementConstructor);
        if (!tagName) {
            throw new TypeError(`Invalid Construction`);
        }
        const elm = document.createElement(tagName);
        setPrototypeOf(elm, constructor.prototype);
        return elm;
    };
    HTMLElementConstructor.prototype = HTMLElement.prototype;

    createCustomElement = (tagName: string, upgradeCallback: LifecycleCallback) => {
        const elm = document.createElement(tagName);
        upgradeCallback(elm); // nothing to do with the result for now
        return elm;
    };
}
