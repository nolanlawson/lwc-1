/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { isFunction, isNull, isObject, noop } from '@lwc/shared';
import { Signal } from '@lwc/signals';
import {
    CallbackFunction,
    instantiateNewReactiveObserver,
    isObserving,
    notify,
    ReactiveObserver,
    valueMutated,
    valueObserved,
} from '../libs/mutation-tracker';
import { subscribeToSignal } from '../libs/signal-tracker';
import { VM } from './vm';
import { EmptyArray } from './utils';

const DUMMY_REACTIVE_OBSERVER: ReactiveObserver = {
    callback: noop,
    listeners: EmptyArray,
};

export function componentValueMutated(vm: VM, key: PropertyKey) {
    // On the server side, we don't need mutation tracking. Skipping it improves performance.
    if (process.env.IS_BROWSER) {
        valueMutated(vm.component, key);
    }
}

export function componentValueObserved(vm: VM, key: PropertyKey, target: any = {}) {
    const { component, tro } = vm;
    // On the server side, we don't need mutation tracking. Skipping it improves performance.
    if (process.env.IS_BROWSER) {
        valueObserved(component, key);
    }

    // The portion of reactivity that's exposed to signals is to subscribe a callback to re-render the VM (templates).
    // We check check the following to ensure re-render is subscribed at the correct time.
    //  1. The template is currently being rendered (there is a template reactive observer)
    //  2. There was a call to a getter to access the signal (happens during vnode generation)
    if (
        lwcRuntimeFlags.ENABLE_EXPERIMENTAL_SIGNALS &&
        isObject(target) &&
        !isNull(target) &&
        'value' in target &&
        'subscribe' in target &&
        isFunction(target.subscribe) &&
        // Only subscribe if a template is being rendered by the engine
        isObserving(tro)
    ) {
        // Subscribe the template reactive observer's notify method, which will mark the vm as dirty and schedule hydration.
        subscribeToSignal(component, target as Signal<any>, () => {
            notify(tro);
        });
    }
}

export function createReactiveObserver(callback: CallbackFunction): ReactiveObserver {
    // On the server side, we don't need mutation tracking. Skipping it improves performance.
    return process.env.IS_BROWSER
        ? instantiateNewReactiveObserver(callback)
        : DUMMY_REACTIVE_OBSERVER;
}

export * from '../libs/mutation-tracker';
export * from '../libs/signal-tracker';
