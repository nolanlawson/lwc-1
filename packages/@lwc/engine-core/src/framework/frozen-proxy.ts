/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { isFunction, isNull, isObject, isUndefined } from '@lwc/shared';

const proxyCache: WeakMap<any, any> = new WeakMap();

// See https://developer.mozilla.org/en-US/docs/Glossary/Primitive
function isPrimitive(value: any) {
    return isNull(value) || (!isFunction(value) && !isObject(value));
}

// Create a proxy of an object that disallows modifications, either deep or shallow
export function createFrozenProxy(value: any): any {
    if (isPrimitive(value)) {
        return value;
    }

    let proxy = proxyCache.get(value);
    if (isUndefined(proxy)) {
        proxy = new Proxy(value, {
            get(target, property, receiver) {
                const result = Reflect.get(target, property, receiver);
                return createFrozenProxy(result);
            },
            set() {
                throw new Error('Cannot modify read-only proxy');
            },
            deleteProperty() {
                throw new Error('Cannot modify read-only proxy');
            },
        });
        proxyCache.set(value, proxy);
    }
    return proxy;
}
