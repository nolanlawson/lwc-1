/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { createElement, __unstable__ProfilerControl } from 'lwc';

import Table from 'perf-benchmarks-components/dist/dom/benchmark/tableComponent/tableComponent.js';
import Store from 'perf-benchmarks-components/dist/dom/benchmark/store/store.js';
import { insertComponent, destroyComponent } from '../../../utils/utils.js';
import { benchmark, before, run, after } from '../../../utils/benchmark-framework.js';

const profile = new URLSearchParams(location.search).get('profile');
if (profile === 'noop') {
    __unstable__ProfilerControl.attachDispatcher(() => {
        // no-op
    });
} else if (profile === 'minimal') {
    const operations = [];
    __unstable__ProfilerControl.attachDispatcher((opId, phase, cmpName, vmIndex) => {
        operations.push(opId, phase, cmpName, vmIndex);
    });
    // keep the object alive
    setTimeout(() => {
        // eslint-disable-next-line no-console
        console.log({ operations });
    }, 1000000);
} else if (profile === 'newObject') {
    const operations = [];
    __unstable__ProfilerControl.attachDispatcher((opId, phase, cmpName, vmIndex) => {
        operations.push({ opId, phase, cmpName, vmIndex });
    });
    // keep the object alive
    setTimeout(() => {
        // eslint-disable-next-line no-console
        console.log({ operations });
    }, 1000000);
}

benchmark(`benchmark-table-component/create/10k`, () => {
    let tableElement;

    before(() => {
        tableElement = createElement('benchmark-table-component', { is: Table });
        return insertComponent(tableElement);
    });

    run(() => {
        const store = new Store();
        store.runLots();
        tableElement.rows = store.data;
    });

    after(() => {
        destroyComponent(tableElement);
    });
});
