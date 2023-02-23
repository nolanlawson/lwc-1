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
            return queryObjectsResult.objects.length
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
