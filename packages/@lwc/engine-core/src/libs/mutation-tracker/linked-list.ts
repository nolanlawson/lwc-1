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

export class LinkedList<T> {
    root: Node<T> | undefined;

    add(item: T) {
        let node: Node<T> | undefined = this.root;
        if (isUndefined(node)) {
            this.root = createNode(item);
            return;
        }
        // eslint-disable-next-line no-constant-condition
        while (true) {
            if (node!.curr === item) {
                // already exists in linked list, duplicates not allowed
                return;
            }
            const nextNode: Node<T> | undefined = node!.next;
            if (isUndefined(nextNode)) {
                node.next = createNode(item, node);
                return;
            }
            node = nextNode;
        }
    }

    remove(item: T) {
        let node: Node<T> | undefined = this.root;
        while (!isUndefined(node)) {
            if (node.curr === item) {
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
                return;
            }
            node = node.next;
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
