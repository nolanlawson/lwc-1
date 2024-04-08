/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { create, isUndefined, isNull } from '@lwc/shared';

const TargetToReactiveRecordMap: WeakMap<object, ReactiveRecord> = new WeakMap();

/**
 * A Reactive Record is a meta representation of an arbitrary object and its member
 * properties that were accessed while a Reactive Observer was observing.
 */
type ReactiveRecord = Record<PropertyKey, ReactiveObserver>;

export interface ReactiveObserver {
    callback: CallbackFunction;
    nextSibling: ReactiveObserver | null;
    previousSibling: ReactiveObserver | null;
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
        const firstReactiveObserver = reactiveRecord[key as any];
        if (!isUndefined(firstReactiveObserver)) {
            let currentObserver: ReactiveObserver | null = firstReactiveObserver;
            while (!isNull(currentObserver)) {
                notify(currentObserver);
                currentObserver = currentObserver.nextSibling;
            }
        }
    }
}

export function valueObserved(target: object, key: PropertyKey) {
    // We should determine if an active Observing Record is present to track mutations.
    if (isNull(currentReactiveObserver)) {
        return;
    }
    const childReactiveObserver = currentReactiveObserver;
    const reactiveRecord = getReactiveRecord(target);
    const firstReactiveObserver = reactiveRecord[key as any];
    if (isUndefined(firstReactiveObserver)) {
        // linked list is empty
        reactiveRecord[key as any] = childReactiveObserver;
    } else {
        // linked list already has an element
        let previousSibling: ReactiveObserver | null = null;
        let currentSibling: ReactiveObserver | null = firstReactiveObserver;
        while (!isNull(currentSibling)) {
            previousSibling = currentSibling;
            currentSibling = previousSibling!.nextSibling;
            if (currentSibling === childReactiveObserver) {
                return; // already exists in the list
            }
        }
        // end of the list, append our child
        previousSibling!.nextSibling = childReactiveObserver;
        childReactiveObserver.previousSibling = previousSibling;
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
    const { previousSibling, nextSibling } = reactiveObserver;
    if (!isNull(previousSibling)) {
        previousSibling.nextSibling = nextSibling;
    }
    if (!isNull(nextSibling)) {
        nextSibling.previousSibling = previousSibling;
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
 * Return true if the reactive observer is the current global one
 * @param reactiveObserver
 */
export function isObserving(reactiveObserver: ReactiveObserver) {
    return currentReactiveObserver === reactiveObserver;
}

export function instantiateNewReactiveObserver(callback: CallbackFunction): ReactiveObserver {
    return {
        callback,
        nextSibling: null,
        previousSibling: null,
    };
}
