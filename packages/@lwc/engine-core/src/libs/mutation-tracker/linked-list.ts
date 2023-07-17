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
        let previousNode: Node<T> | undefined;
        let node: Node<T> | undefined = this.root;
        while (!isUndefined(node)) {
            if (node.curr === item) {
                // already exists in linked list, duplicates not allowed
                return;
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
