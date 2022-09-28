/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import 'lwc';
import { benchmark, before, run } from '../../../utils/benchmark-framework.js';

benchmark(`benchmark-custom-element/create-custom-element`, () => {
    const NUM_COMPONENTS = 10000;

    before(() => {
        for (let i = 0; i < NUM_COMPONENTS; i++) {
            customElements.define(`my-element-${i}`, class extends HTMLElement {});
        }
    });

    run(() => {
        for (let i = 0; i < NUM_COMPONENTS; i++) {
            document.createElement(`my-element-${i}`);
        }
    });
});
