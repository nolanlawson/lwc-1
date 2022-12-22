/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { setPrototypeOf } from '@lwc/shared';
import type { LifecycleCallback } from '@lwc/engine-core';

/* istanbul ignore next */
const reverseRegistry: WeakMap<CustomElementConstructor, string> = new WeakMap();

/* istanbul ignore next */
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
/* istanbul ignore next */
HTMLElementConstructor.prototype = HTMLElement.prototype;

// Creates a custom element for compat (legacy) browser environments
/* istanbul ignore next */
export const createCustomElementCompat = (tagName: string, upgradeCallback: LifecycleCallback) => {
    const elm = document.createElement(tagName);
    upgradeCallback(elm); // nothing to do with the result for now
    return elm;
};
