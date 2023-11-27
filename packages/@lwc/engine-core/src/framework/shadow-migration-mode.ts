/*
 * Copyright (c) 20123, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
let globalStylesheet: CSSStyleSheet | undefined;

function initStylesheet() {
    const stylesheet = new CSSStyleSheet();
    const elmsToPromises = new Map();
    let lastUsedLength = 0;

    const headObserver = new MutationObserver(() => {
        const elms = document.head.querySelectorAll(
            'style:not([data-rendered-by-lwc]),link[rel="stylesheet"]'
        );
        if (elms.length === lastUsedLength) {
            return; // nothing to update
        }
        const promisesArray = [...(elms as unknown as Iterable<Element>)].map((elm) => {
            let cachedPromise = elmsToPromises.get(elm);
            if (!cachedPromise) {
                cachedPromise = (async () => {
                    if (elm.tagName === 'STYLE') {
                        return elm.textContent;
                    } else {
                        // <link>
                        return await (await fetch((elm as HTMLLinkElement).href)).text();
                    }
                })();
                elmsToPromises.set(elm, cachedPromise);
            }
            return cachedPromise;
        });
        Promise.all(promisesArray).then((textArray) => {
            lastUsedLength = textArray.length;
            stylesheet.replaceSync(textArray.join('\n'));
        });
    });
    headObserver.observe(document.head, {
        childList: true,
    });

    return stylesheet;
}

export function applyShadowMigrateMode(shadowRoot: ShadowRoot) {
    if (!globalStylesheet) {
        globalStylesheet = initStylesheet();
    }

    (shadowRoot as any).synthetic = true; // fake synthetic mode
    shadowRoot.adoptedStyleSheets.push(globalStylesheet);
}
