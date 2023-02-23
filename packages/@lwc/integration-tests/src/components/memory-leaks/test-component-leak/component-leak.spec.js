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
            const protoResult = await browser.cdp('Runtime', 'evaluate', { expression: 'LWC.LightningElement' });
            const protoObjectId = protoResult.result.objectId;

            // Query all objects for Object.prototype
            const queryObjectsResult = await browser.cdp('Runtime', 'queryObjects', { prototypeObjectId: protoObjectId });

            const queriedObjectsObjectId = queryObjectsResult.objects.objectId;

            // Call .length on the returned array
            const functionDeclaration = (function () {
                return this.length
            }).toString();

            const callFunctionOnResult = await browser.cp('Runtime', 'callFunctionOn', {
                objectId: queriedObjectsObjectId,
                functionDeclaration,
                returnByValue: true,
            });
            const length = callFunctionOnResult.result.value;

            // cleanup so we don't leak memory ourselves
            await Promise.all([
                browser.cdp('Runtime', 'releaseObject', { objectId: protoObjectId }),
                browser.cdp('Runtime', 'releaseObject', { objectId: queriedObjectsObjectId })
            ]);

            return length
        }

        before(async () => {
            await browser.url(URL);
        });

        it('should not leak', async () => {

            console.log(await getObjectsCount())

            const addChild = await browser.shadowDeep$(
              'integration-component-leak',
              '.add-child'
            )

            await addChild.click(); // click into input

            console.log(await getObjectsCount())
        });
    });
}
