/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { isUndefined } from '@lwc/shared';
import { RendererAPI } from '../renderer';

export function applyEventListeners(
    elm: Element,
    on: Readonly<Record<string, (event: Event) => any>> | undefined,
    renderer: RendererAPI
) {
    if (isUndefined(on)) {
        return;
    }
    const { addEventListener } = renderer;
    for (const name in on) {
        const handler = on[name];
        addEventListener(elm, name, handler);
    }
}
