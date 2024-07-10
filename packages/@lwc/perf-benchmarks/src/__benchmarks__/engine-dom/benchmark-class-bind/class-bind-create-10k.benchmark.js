/*
 * Copyright (c) 2024, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { createElement } from '@lwc/engine-dom';

import ClassBindComponent from '@lwc/perf-benchmarks-components/dist/dom/benchmark/classBindComponent/classBindComponent.js';
import { insertComponent, destroyComponent } from '../../../utils/utils.js';

benchmark(`dom/class-bind/create/10k`, () => {
    const elements = [];

    before(() => {
        for (let i = 0; i < 10000; i++) {
            elements.push(createElement('benchmark-class-bind', { is: ClassBindComponent }));
        }
    });

    run(async () => {
        await Promise.all(elements.map((element) => insertComponent(element)));
    });

    after(async () => {
        await Promise.all(elements.map((element) => destroyComponent(element)));
    });
});
