/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { isNull, isUndefined, assert, ArrayShift, ArrayUnshift } from '@lwc/shared';
import {VStatic, VStaticPart } from '../vnodes';
import { RendererAPI } from '../renderer';
import { applyEventListeners } from './events';
import { applyRefs } from './refs';

function calculateElmParts(root: Element, parts: VStaticPart[], renderer: RendererAPI): Map<number, Element> {
    const numParts = parts.length;
    const result = new Map<number, Element>();

    // Optimization given that, in most cases, there will be one part, and it's just the root
    if (numParts === 1) {
        const firstPart = parts[0];
        if (firstPart.partId === 0) {
            // 0 means the root node
            result.set(0, root)
            return result
        }
    }

    const knownPartIds = new Set()
    for (const part of parts) {
        knownPartIds.add(part.partId)
    }

    const { previousSibling, getLastChild } = renderer;
    const stack = [root];
    let partId = -1;

    // Depth-first traversal. We assign a partId to each element, which is an integer based on traversal order.
    while (stack.length > 0) {
        const elm = ArrayShift.call(stack)!;
        partId++;

        if (knownPartIds.has(partId)) {
            result.set(partId, elm)
            if (result.size === numParts) {
                break; // perf optimization - stop traversing once we've found everything we need
            }
        }

        // For depth-first traversal, prepend to the stack in reverse order
        // Note that we traverse using `*Child`/`*Sibling` rather than `children` because the browser uses a linked
        // list under the hood to represent the DOM tree, so it's faster to do this than to create an underlying array
        // by calling `children`.
        let child = getLastChild(elm);
        while (!isNull(child)) {
            ArrayUnshift.call(stack, child);
            child = previousSibling(child);
        }
    }

    if (process.env.NODE_ENV !== 'production') {
        assert.isTrue(
            result.size === numParts,
            `Should have found all parts by now. Found ${result.size}, needed ${numParts}.`
        );
    }

    return result
}

/**
 * Given an array of static parts, do all the mounting required for these parts.
 *
 * @param root - the root element
 * @param vnode - the parent VStatic
 * @param renderer - the renderer to use
 * @param mount - true this is a first (mount) render as opposed to a subsequent (patch) render
 */
export function applyStaticParts(
    root: Element,
    vnode: VStatic,
    renderer: RendererAPI,
    mount: boolean
): void {
    // On the server, we don't support ref (because it relies on renderedCallback), nor do we
    // support event listeners (no interactivity), so traversing parts makes no sense
    if (!process.env.IS_BROWSER) {
        return;
    }
    const { parts, owner } = vnode;
    if (isUndefined(parts)) {
        return;
    }

    // This only needs to be calculated once, because the parts/elements never change for a given vnode
    if (mount) {
        vnode.elmParts = calculateElmParts(root, parts, renderer);
    }

    // Currently only event listeners and refs are supported for static vnodes
    for (const part of parts) {
        if (mount) {
            // Event listeners only need to be applied once when mounting
            applyEventListeners(part, renderer);
        }
        // Refs must be updated after every render due to refVNodes getting reset before every render
        applyRefs(part, owner);
    }
}
