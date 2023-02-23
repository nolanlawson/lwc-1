/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const assert = require('assert');

// CDP only works in Chrome, not IE11
if (!/compat/.test(process.env.MODE)) {
    describe('Component does not leak', () => {
        const URL = '/component-leak';

        // Count the number of Object.prototype objects using queryObjects(). Based on:
        // https://media-codings.com/articles/automatically-detect-memory-leaks-with-puppeteer
        async function getObjectsCount () {
            const protoResult = await browser.cdp('Runtime', 'evaluate', { expression: 'Object.prototype' });
            const protoObjectId = protoResult.result.objectId;

            // Query all objects for Object.prototype
            const queryObjectsResult = await browser.cdp('Runtime', 'queryObjects', { prototypeObjectId: protoObjectId });

            const queriedObjectsObjectId = queryObjectsResult.objects.objectId;

            // Call .length on the returned array
            const functionDeclaration = (/* istanbul ignore next */ function () {
                const descriptions = this.map(_ => `${_.constructor.name}::${typeof _}`);
                const counts = {};
                for (const description of descriptions) {
                    counts[description] = (counts[description] || 0) + 1;
                }
                // sort by count (descending) then name (ascending)
                return Object.fromEntries(Object.entries(counts).sort((a, b) => {
                    const [aName, aCount] = a;
                    const [bName, bCount] = b;
                    // eslint-disable-next-line no-nested-ternary
                    return aCount > bCount ? -1 : bCount > aCount ? 1 : aName < bName ? -1 : 1;
                }));
            }).toString();

            const callFunctionOnResult = await browser.cdp('Runtime', 'callFunctionOn', {
                objectId: queriedObjectsObjectId,
                functionDeclaration,
                returnByValue: true,
            });
            const res = callFunctionOnResult.result.value;

            // cleanup so we don't leak memory ourselves
            await Promise.all([
                browser.cdp('Runtime', 'releaseObject', { objectId: protoObjectId }),
                browser.cdp('Runtime', 'releaseObject', { objectId: queriedObjectsObjectId })
            ]);

            return res
        }

        before(async () => {
            await browser.url(URL);
        });

        it('should not leak', async () => {

            console.log(await getObjectsCount())

            const getNumChildren = () => {
                return document.querySelector('integration-component-leak')
                    .shadowRoot.querySelectorAll('integration-child').length
            }
            console.log('childCount', await browser.execute(getNumChildren))
            const addChild = await browser.shadowDeep$(
              'integration-component-leak',
              '.add-child'
            )
            const removeChild = await browser.shadowDeep$(
                'integration-component-leak',
                '.remove-child'
            )

            await addChild.click();
            await removeChild.click();

            await browser.cdp('HeapProfiler', 'collectGarbage')
            await new Promise(resolve => setTimeout(resolve, 3000))

            console.log('childCount', await browser.execute(getNumChildren))
            console.log(await getObjectsCount())
        });
    });
}
