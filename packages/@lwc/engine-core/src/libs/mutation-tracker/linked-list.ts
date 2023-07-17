/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

// Simple doubly-linked list implementation. Does not allow duplicates

import { isUndefined } from '@lwc/shared';

interface Node<T> {
    prev: Node<T> | undefined;
    next: Node<T> | undefined;
    curr: T;
}

function createNode<T>(item: T, previousItem?: Node<T>): Node<T> {
    return {
        curr: item,
        prev: previousItem,
        next: undefined,
    };
}

export type RemoveCallback = () => void;

export class LinkedList<T> {
    root: Node<T> | undefined;

    add(item: T): RemoveCallback {
        let previousNode: Node<T> | undefined;
        let node: Node<T> | undefined = this.root;
        while (!isUndefined(node)) {
            if (node.curr === item) {
                const thisNode = node;
                // already exists in linked list, duplicates not allowed
                return () => this._remove(thisNode);
            }
            previousNode = node;
            node = node.next;
        }
        const newNode = createNode(item, previousNode);
        if (isUndefined(previousNode)) {
            this.root = newNode;
        } else {
            previousNode.next = newNode;
        }
        return () => this._remove(newNode);
    }

    _remove(node: Node<T>) {
        const { prev, next } = node;
        if (!isUndefined(prev)) {
            prev.next = next;
        }
        if (!isUndefined(next)) {
            next.prev = prev;
        }
        if (node === this.root) {
            this.root = next;
        }
    }

    forEach(callback: (item: T) => void) {
        let node: Node<T> | undefined = this.root;
        while (!isUndefined(node)) {
            callback(node.curr);
            node = node.next;
        }
    }
}
