/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { isString } from '@lwc/shared';
import { RendererAPI } from '../renderer';

// The style property is a string when defined via an expression in the template.
export function patchStyleAttribute(
    elm: Element,
    style: string | undefined,
    oldStyle: string | undefined,
    renderer: RendererAPI
) {
    if (oldStyle === style) {
        return;
    }

    const { setAttribute, removeAttribute } = renderer;
    if (!isString(style) || style === '') {
        removeAttribute(elm, 'style');
    } else {
        setAttribute(elm, 'style', style);
    }
}
