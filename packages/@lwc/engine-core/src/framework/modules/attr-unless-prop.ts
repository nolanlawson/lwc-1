/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import {
    htmlAttributeToProperty,
    isNull,
    isUndefined,
    StringCharCodeAt,
    XML_NAMESPACE,
    XLINK_NAMESPACE,
} from '@lwc/shared';

import { RendererAPI } from '../renderer';

const ColonCharCode = 58;

export function patchAttrUnlessProp(
    elm: Element,
    attrs: Readonly<Record<string, string | number | boolean | null | undefined>> | undefined,
    oldAttrs: Readonly<Record<string, string | number | boolean | null | undefined>> | undefined,
    renderer: RendererAPI
) {
    if (isUndefined(attrs)) {
        return;
    }

    const { removeAttribute, setAttribute, setProperty } = renderer;

    for (const name in attrs) {
        const cur = attrs[name];
        const old = isUndefined(oldAttrs) ? undefined : oldAttrs[name];

        if (old !== cur) {
            const propName = htmlAttributeToProperty(name);
            if (propName in elm!) {
                setProperty(elm, name, cur);
            } else if (StringCharCodeAt.call(name, 3) === ColonCharCode) {
                // Assume xml namespace
                setAttribute(elm, name, cur as string, XML_NAMESPACE);
            } else if (StringCharCodeAt.call(name, 5) === ColonCharCode) {
                // Assume xlink namespace
                setAttribute(elm, name, cur as string, XLINK_NAMESPACE);
            } else if (isNull(cur) || isUndefined(cur)) {
                removeAttribute(elm, name);
            } else {
                setAttribute(elm, name, cur as string);
            }
        }
    }
}
