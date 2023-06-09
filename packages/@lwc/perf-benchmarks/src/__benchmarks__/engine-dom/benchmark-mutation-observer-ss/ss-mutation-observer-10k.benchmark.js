/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import '@lwc/synthetic-shadow';
import { createElement } from '@lwc/engine-dom';

import TableComponent from '@lwc/perf-benchmarks-components/dist/dom/benchmark/tableComponent/tableComponent.js';
import Store from '@lwc/perf-benchmarks-components/dist/dom/benchmark/store/store.js';
import { insertComponent, destroyComponent } from '../../../utils/utils.js';

benchmark(`dom/synthetic-shadow/mutation-observer/10k`, () => {
    let tableElement;
    let tableRows;
    let elementsToMutate;

    before(async () => {
        tableElement = createElement('benchmark-table-component', { is: TableComponent });
        const store = new Store();
        store.runLots();
        tableElement.rows = store.data;
        await insertComponent(tableElement);
        tableRows = [...tableElement.shadowRoot.querySelectorAll('benchmark-table-component-row')];
        elementsToMutate = [];
        for (const tableRow of tableRows) {
            elementsToMutate.push(tableRow);
            elementsToMutate.push(...tableRow.shadowRoot.querySelectorAll('*'));
        }
    });

    run(async () => {
        const mutationObserverPromises = tableRows.map((node) => {
            return new Promise((resolve) => {
                const observer = new MutationObserver(() => {
                    observer.disconnect();
                    resolve();
                });
                observer.observe(node, {
                    attributes: true,
                    characterData: true,
                    childList: true,
                    subtree: true,
                });
            });
        });

        // trigger various mutations
        for (const elm of elementsToMutate) {
            elm.setAttribute('data-changed', 'true');
        }

        await Promise.all(mutationObserverPromises);
    });

    after(() => {
        destroyComponent(tableElement);
    });
});
