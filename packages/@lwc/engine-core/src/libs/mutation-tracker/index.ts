/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { create, isUndefined, ArrayPush } from '@lwc/shared';

const TargetToReactiveRecordMap: WeakMap<object, ReactiveRecord> = new WeakMap();

interface ReactiveObserverLinkedNode {
    prev: ReactiveObserverLinkedNode | undefined;
    next: ReactiveObserverLinkedNode | undefined;
    curr: ReactiveObserver;
}

/**
 * An Observed MemberProperty Record represents the list of all Reactive Observers,
 * if any, where the member property was observed.
 */
type ObservedMemberPropertyRecords = ReactiveObserverLinkedNode;

/**
 * A Reactive Record is a meta representation of an arbitrary object and its member
 * properties that were accessed while a Reactive Observer was observing.
 */
type ReactiveRecord = Record<PropertyKey, ObservedMemberPropertyRecords>;

function createReactiveObserverLinkedNode(
    reactiveObserver: ReactiveObserver,
    prev?: ReactiveObserverLinkedNode
): ReactiveObserverLinkedNode {
    return {
        curr: reactiveObserver,
        prev: prev,
        next: undefined,
    };
}

function appendReactiveObserverLinkedNodeIfDoesNotExist(
    reactiveObserverLinkedNode: ReactiveObserverLinkedNode,
    reactiveObserver: ReactiveObserver
) {
    let node: ReactiveObserverLinkedNode | undefined = reactiveObserverLinkedNode;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        if (node.curr === reactiveObserver) {
            // already exists in linked list
            return;
        }
        const nextNode: ReactiveObserverLinkedNode | undefined = node!.next;
        if (isUndefined(nextNode)) {
            reactiveObserverLinkedNode.next = createReactiveObserverLinkedNode(
                reactiveObserver,
                reactiveObserverLinkedNode
            );
            return;
        }
        node = nextNode;
    }
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

function notifyAll(reactiveObserverLinkedNode: ReactiveObserverLinkedNode) {
    let node: ReactiveObserverLinkedNode | undefined = reactiveObserverLinkedNode;
    while (!isUndefined(node)) {
        node.curr.notify();
        node = node.next;
    }
}

export function valueMutated(target: object, key: PropertyKey) {
    const reactiveRecord = TargetToReactiveRecordMap.get(target);
    if (!isUndefined(reactiveRecord)) {
        const reactiveObservers = reactiveRecord[key as any];
        if (!isUndefined(reactiveObservers)) {
            notifyAll(reactiveObservers);
        }
    }
}

export function valueObserved(target: object, key: PropertyKey) {
    // We should determine if an active Observing Record is present to track mutations.
    if (currentReactiveObserver === null) {
        return;
    }
    const reactiveObserver = currentReactiveObserver;
    const reactiveRecord = getReactiveRecord(target);
    const reactiveObservers = reactiveRecord[key as any];
    if (isUndefined(reactiveObservers)) {
        reactiveRecord[key as any] = createReactiveObserverLinkedNode(reactiveObserver);
    } else {
        appendReactiveObserverLinkedNodeIfDoesNotExist(reactiveObservers, reactiveObserver);
    }
    reactiveObserver.link(reactiveObservers);
}

export type CallbackFunction = (rp: ReactiveObserver) => void;
export type JobFunction = () => void;

function removeLinkedNode(reactiveObserverLinkedNode: ReactiveObserverLinkedNode) {
    const { prev, next } = reactiveObserverLinkedNode;
    if (!isUndefined(prev)) {
        prev.next = next;
    }
    if (!isUndefined(next)) {
        next.prev = prev;
    }
}

export class ReactiveObserver {
    private listeners: ReactiveObserverLinkedNode[] = [];
    private callback: CallbackFunction;

    constructor(callback: CallbackFunction) {
        this.callback = callback;
    }

    observe(job: JobFunction) {
        const inceptionReactiveRecord = currentReactiveObserver;
        currentReactiveObserver = this;
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
     */
    reset() {
        const { listeners } = this;
        const len = listeners.length;
        if (len > 0) {
            for (let i = 0; i < len; i++) {
                const reactiveObserverLinkedNode = listeners[i];
                removeLinkedNode(reactiveObserverLinkedNode);
            }
            listeners.length = 0;
        }
    }

    // friend methods
    notify() {
        this.callback.call(undefined, this);
    }

    link(reactiveObserverLinkedNode: ReactiveObserverLinkedNode) {
        // we keep track of observing records where the observing record was added to so we can do some clean up later on
        ArrayPush.call(this.listeners, reactiveObserverLinkedNode);
    }
}
