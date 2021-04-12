/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { StylesheetFactory, StylesheetFactoryResult } from './stylesheet-factory';

export function createCssGenerator(generateCss: StylesheetFactory): StylesheetFactory {
    let cachedStylesheet: CSSStyleSheet;

    return function generateStyles(
        hostSelector: string,
        shadowSelector: string,
        nativeShadow: boolean,
        hasAdoptedStyleSheets: boolean
    ): StylesheetFactoryResult {
        if (nativeShadow && hasAdoptedStyleSheets) {
            if (!cachedStylesheet) {
                cachedStylesheet = new CSSStyleSheet();
                // adoptedStyleSheets not in TypeScript yet: https://github.com/microsoft/TypeScript/issues/30022
                // @ts-ignore
                cachedStylesheet.replaceSync(
                    generateCss(hostSelector, shadowSelector, nativeShadow)
                );
            }
            return cachedStylesheet; // fast path
        }
        return generateCss(hostSelector, shadowSelector, nativeShadow, hasAdoptedStyleSheets);
    };
}
