/*
 * Copyright (c) 2024, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { createElement } from '@lwc/engine-dom';

import LightDomComponentWithIds from '@lwc/perf-benchmarks-components/dist/dom/benchmark/lightDomComponentWithIds/lightDomComponentWithIds.js';
import { insertComponent, destroyComponent } from '../../../utils/utils.js';

benchmark(`dom/expressions`, () => {
    const components = [];

    before(() => {
        for (let i = 0; i < 1000; i++) {
            components.push(
                createElement('x-light-dom-component-with-ids', { is: LightDomComponentWithIds })
            );
        }
    });

    run(async () => {
        await Promise.all(components.map((_) => insertComponent(_)));
    });

    after(async () => {
        await Promise.all(components.map((_) => destroyComponent(_)));
    });
});
