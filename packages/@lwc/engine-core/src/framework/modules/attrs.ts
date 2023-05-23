/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { isNull, isUndefined, StringCharCodeAt, XML_NAMESPACE, XLINK_NAMESPACE } from '@lwc/shared';
import { RendererAPI } from '../renderer';

const ColonCharCode = 58;

export function patchAttributes(
    elm: Element,
    attrs: Readonly<Record<string, string | number | boolean | null | undefined>> | undefined,
    oldAttrs: Readonly<Record<string, string | number | boolean | null | undefined>> | undefined,
    renderer: RendererAPI
) {
    if (isUndefined(attrs)) {
        return;
    }

    if (oldAttrs === attrs) {
        return;
    }

    const { setAttribute, removeAttribute } = renderer;
    for (const key in attrs) {
        const cur = attrs[key];
        const old = isUndefined(oldAttrs) ? undefined : oldAttrs[key];

        if (old !== cur) {
            if (StringCharCodeAt.call(key, 3) === ColonCharCode) {
                // Assume xml namespace
                setAttribute(elm, key, cur as string, XML_NAMESPACE);
            } else if (StringCharCodeAt.call(key, 5) === ColonCharCode) {
                // Assume xlink namespace
                setAttribute(elm, key, cur as string, XLINK_NAMESPACE);
            } else if (isNull(cur) || isUndefined(cur)) {
                removeAttribute(elm, key);
            } else {
                setAttribute(elm, key, cur as string);
            }
        }
    }
}
