/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { isUndefined } from '@lwc/shared';

const supportsWeakRefs =
    typeof WeakRef === 'function' && typeof FinalizationRegistry === 'function';

// A map where the keys are weakly held and the values are a Set that are also each weakly held.
// The goal is to avoid leaking the Values, which is what would happen with a WeakMap<T, Set<V>>.
export interface WeakMultiMap<T extends object, V extends object> {
    get(key: T): ReadonlySet<V>;
    add(key: T, vm: V): void;
    clear(key: T): void;
}

// In browsers that doesn't support WeakRefs, we just leak. We don't really expect anyone to be using non-modern
// browsers in dev mode anyway.
function createLegacyWeakVMMultiMap<K extends object, V extends object>(): WeakMultiMap<K, V> {
    // Legacy implementation. We'll do our best using a WeakMap, but this will still leak the values
    const map = new WeakMap<K, Set<V>>();

    function getValues(key: K): Set<V> {
        let values = map.get(key);
        if (isUndefined(values)) {
            values = new Set();
            map.set(key, values);
        }
        return values;
    }

    return {
        get(key: K): ReadonlySet<V> {
            return getValues(key);
        },
        add(key: K, vm: V) {
            const set = getValues(key);
            set.add(vm);
        },
        clear(key: K) {
            map.delete(key);
        },
    };
}

// This implementation relies on the WeakRef/FinalizationRegistry proposal.
// For some background, see: https://github.com/tc39/proposal-weakrefs
function createModernWeakVMMultiMap<K extends object, V extends object>(): WeakMultiMap<K, V> {
    const map = new WeakMap<K, WeakRef<V>[]>();

    const registry = new FinalizationRegistry((heldValue: K) => {
        // This should be considered an optional cleanup method to remove GC'ed values from their respective arrays.
        // JS VMs are not obligated to call FinalizationRegistry callbacks.
        const weakRefs = getWeakRefs(heldValue);

        // Work backwards, removing stale VMs
        for (let i = weakRefs.length; i--; i >= 0) {
            const vm = weakRefs[i].deref();
            if (isUndefined(vm)) {
                weakRefs.splice(i, 1); // remove
            }
        }
    });

    function getWeakRefs(key: K): WeakRef<V>[] {
        let weakRefs = map.get(key);
        if (isUndefined(weakRefs)) {
            weakRefs = [];
            map.set(key, weakRefs);
        }
        return weakRefs;
    }

    return {
        get(key: K): ReadonlySet<V> {
            const weakRefs = getWeakRefs(key);
            const result = new Set<V>();
            for (const weakRef of weakRefs) {
                const vm = weakRef.deref();
                if (!isUndefined(vm)) {
                    result.add(vm);
                }
            }
            return result;
        },
        add(key: K, value: V) {
            const weakRefs = getWeakRefs(key);
            // We could check for duplicate values here, but it doesn't seem worth it.
            // We transform the output into a Set anyway
            weakRefs.push(new WeakRef<V>(value));
            registry.register(value, key);
        },
        clear(key: K) {
            map.delete(key);
        },
    };
}

export function createWeakMultiMap<K extends object, V extends object>(): WeakMultiMap<K, V> {
    if (!supportsWeakRefs) {
        return createLegacyWeakVMMultiMap<K, V>();
    }
    return createModernWeakVMMultiMap<K, V>();
}
