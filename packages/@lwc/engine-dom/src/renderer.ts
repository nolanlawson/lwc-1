/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import {
    globalThis,
    assign,
    hasOwnProperty,
    KEY__IS_NATIVE_SHADOW_ROOT_DEFINED,
    KEY__SHADOW_TOKEN,
} from '@lwc/shared';
import features from '@lwc/features';
import { insertStylesheet } from './styles';
import { createCustomElement } from './custom-elements/create-custom-element';
import { rendererFactory } from './renderer-factory';

import type { RendererAPI } from '@lwc/engine-core';

let isSyntheticShadowDefined;
if (features.DISABLE_SYNTHETIC_SHADOW_SUPPORT) {
    isSyntheticShadowDefined = false;
} else {
    isSyntheticShadowDefined = hasOwnProperty.call(Element.prototype, KEY__SHADOW_TOKEN);
}

/**
 * The base renderer that will be used by engine-core.
 * This will be used for DOM operations when lwc is running in a browser environment.
 */
export const renderer: RendererAPI = assign(
    // The base renderer will invoke the factory with null and assign additional properties that are
    // shared across renderers
    rendererFactory(null),
    // Properties that are either not required to be sandboxed or rely on a globally shared information
    {
        // insertStyleSheet implementation shares a global cache of stylesheet data
        insertStylesheet,
        // relies on a shared global cache
        createCustomElement,
        isNativeShadowDefined: globalThis[KEY__IS_NATIVE_SHADOW_ROOT_DEFINED],
        isSyntheticShadowDefined,
    }
);
