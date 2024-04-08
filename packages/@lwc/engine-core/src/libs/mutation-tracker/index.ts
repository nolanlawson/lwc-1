/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { create, isUndefined, ArraySplice, ArrayIndexOf, ArrayPush } from '@lwc/shared';

const TargetToReactiveRecordMap: WeakMap<object, ReactiveRecord> = new WeakMap();

/**
 * An Observed MemberProperty Record represents the list of all Reactive Observers,
 * if any, where the member property was observed.
 */
type ObservedMemberPropertyRecords = ReactiveObserver[];

/**
 * A Reactive Record is a meta representation of an arbitrary object and its member
 * properties that were accessed while a Reactive Observer was observing.
 */
type ReactiveRecord = Record<PropertyKey, ObservedMemberPropertyRecords>;

export interface ReactiveObserver {
    listeners: ObservedMemberPropertyRecords[];
    callback: CallbackFunction;
}

function getReactiveRecord(target: object): ReactiveRecord {
    let reactiveRecord = TargetToReactiveRecordMap.get(target);
    if (isUndefined(reactiveRecord)) {
        const newRecord: ReactiveRecord = create(null);
        reactiveRecord = newRecord;
        TargetToReactiveRecordMap.set(target, newRecord);
    }
    return reactiveRecord;
}

let currentReactiveObserver: ReactiveObserver | null = null;

export function valueMutated(target: object, key: PropertyKey) {
    const reactiveRecord = TargetToReactiveRecordMap.get(target);
    if (!isUndefined(reactiveRecord)) {
        const reactiveObservers = reactiveRecord[key as any];
        if (!isUndefined(reactiveObservers)) {
            for (let i = 0, len = reactiveObservers.length; i < len; i += 1) {
                const ro = reactiveObservers[i];
                notify(ro);
            }
        }
    }
}

export function valueObserved(target: object, key: PropertyKey) {
    // We should determine if an active Observing Record is present to track mutations.
    if (currentReactiveObserver === null) {
        return;
    }
    const ro = currentReactiveObserver;
    const reactiveRecord = getReactiveRecord(target);
    let reactiveObservers = reactiveRecord[key as any];
    if (isUndefined(reactiveObservers)) {
        reactiveObservers = [];
        reactiveRecord[key as any] = reactiveObservers;
    } else if (reactiveObservers[0] === ro) {
        return; // perf optimization considering that most subscriptions will come from the same record
    }
    if (ArrayIndexOf.call(reactiveObservers, ro) === -1) {
        link(ro, reactiveObservers);
    }
}

export type CallbackFunction = (rp: ReactiveObserver) => void;
export type JobFunction = () => void;

/**
 * Run a job while observing it.
 * @param reactiveObserver
 * @param job job to run
 */
export function observe(reactiveObserver: ReactiveObserver, job: JobFunction) {
    // On the server side, we don't need mutation tracking. Skipping it improves performance.
    if (!process.env.IS_BROWSER) {
        job();
        return;
    }
    const inceptionReactiveRecord = currentReactiveObserver;
    currentReactiveObserver = reactiveObserver;
    let error;
    try {
        job();
    } catch (e) {
        error = Object(e);
    } finally {
        currentReactiveObserver = inceptionReactiveRecord;
        if (error !== undefined) {
            throw error; // eslint-disable-line no-unsafe-finally
        }
    }
}

/**
 * This method is responsible for disconnecting the Reactive Observer
 * from any Reactive Record that has a reference to it, to prevent future
 * notifications about previously recorded access.
 * @param reactiveObserver
 */
export function reset(reactiveObserver: ReactiveObserver) {
    // On the server side, we don't need mutation tracking. Skipping it improves performance.
    if (!process.env.IS_BROWSER) {
        return;
    }
    const { listeners } = reactiveObserver;
    const len = listeners.length;
    if (len > 0) {
        for (let i = 0; i < len; i++) {
            const set = listeners[i];
            if (set.length === 1) {
                // Perf optimization for the common case - the length is usually 1, so avoid the indexOf+splice.
                // If the length is 1, we can also be sure that `this` is the first item in the array.
                set.length = 0;
            } else {
                // Slow case
                const pos = ArrayIndexOf.call(set, reactiveObserver);
                ArraySplice.call(set, pos, 1);
            }
        }
        listeners.length = 0;
    }
}

/**
 * Call the callback on the reactive observer
 * @param reactiveObserver
 */
export function notify(reactiveObserver: ReactiveObserver) {
    reactiveObserver.callback.call(undefined, reactiveObserver);
}

/**
 * Link one reactive observer to others in the graph
 * @param reactiveObserver
 * @param reactiveObservers
 */
function link(reactiveObserver: ReactiveObserver, reactiveObservers: ReactiveObserver[]) {
    // On the server side, we don't need mutation tracking. Skipping it improves performance.
    if (!process.env.IS_BROWSER) {
        return;
    }
    ArrayPush.call(reactiveObservers, reactiveObserver);
    // we keep track of observing records where the observing record was added to so we can do some clean up later on
    ArrayPush.call(reactiveObserver.listeners, reactiveObservers);
}

/**
 * Return true if the reactive observer is the current global one
 * @param reactiveObserver
 */
export function isObserving(reactiveObserver: ReactiveObserver) {
    return currentReactiveObserver === reactiveObserver;
}
