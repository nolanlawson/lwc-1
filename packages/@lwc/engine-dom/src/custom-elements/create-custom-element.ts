/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import features from '@lwc/features';
import { setPrototypeOf } from '@lwc/shared';
import { createPivotConstructor } from './create-pivot-constructor';
import { hasCustomElements } from './has-custom-elements';
import type { LifecycleCallback } from '@lwc/engine-core';

export let createCustomElement: (
    tagName: string,
    upgradeCallback: LifecycleCallback,
    connectedCallback: LifecycleCallback,
    disconnectedCallback: LifecycleCallback
) => HTMLElement;

if (hasCustomElements) {
    // It's important to cache window.HTMLElement here. Otherwise, someone else could overwrite window.HTMLElement (e.g.
    // another copy of the engine, or another pivot implementation) and we would get "Illegal constructor" errors
    // because the HTMLElement prototypes are mixed up.
    //
    // The reason this happens is that the pivot implementation overwrites window.HTMLElement and expects to work
    // with that version of HTMLElement. So if you load two copies of the pivot implementation in the same environment,
    // the second one may accidentally grab window.HTMLElement from the first (when doing `class extends HTMLElement`).
    // Caching avoids this problem.
    const { HTMLElement } = window;

    const createUserConstructor = (
        upgradeCallback: LifecycleCallback,
        connectedCallback: LifecycleCallback,
        disconnectedCallback: LifecycleCallback
    ) => {
        // TODO [#2972]: this class should expose observedAttributes as necessary
        return class UserElement extends HTMLElement {
            constructor() {
                super();
                upgradeCallback(this);
            }
            connectedCallback() {
                connectedCallback(this);
            }
            disconnectedCallback() {
                disconnectedCallback(this);
            }
        };
    };

    createCustomElement = (
        tagName: string,
        upgradeCallback: LifecycleCallback,
        connectedCallback: LifecycleCallback,
        disconnectedCallback: LifecycleCallback
    ) => {
        const UserConstructor = createUserConstructor(
            upgradeCallback,
            connectedCallback,
            disconnectedCallback
        );
        if (features.ENABLE_GLOBAL_CUSTOM_ELEMENTS_REGISTRY) {
            if (!customElements.get(tagName)) {
                customElements.define(tagName, UserConstructor);
            }
            return new UserConstructor();
        } else {
            // use pivots
            const UpgradableConstructor = createPivotConstructor(tagName, UserConstructor);
            return new UpgradableConstructor(UserConstructor);
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
