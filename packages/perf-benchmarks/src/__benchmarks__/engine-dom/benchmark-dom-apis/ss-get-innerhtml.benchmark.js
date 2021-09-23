/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { createElement } from 'lwc';
import StyledComponent from 'perf-benchmarks-components/dist/dom/benchmark/shadow/styledComponent.js';
import { benchmark, before, run, after } from '../../../utils/benchmark-framework.js';

const DOM_DEPTH = 1000;

benchmark(`benchmark-dom-apis/synthetic-shadow-get-innerhtml`, () => {
    let root;

    before(() => {
        root = document.createElement('div');
        document.body.appendChild(root);
        let element = root;
        for (let i = 0; i < DOM_DEPTH - 1; i++) {
            const child = document.createElement('div');
            element.appendChild(child);
            element = child;
        }
        // The component can be anything; the point is just to have a synthetic shadow
        // deep inside of a vanilla light DOM structure.
        element.appendChild(
            createElement('styled-component', {
                is: StyledComponent,
            })
        );
    });

    run(() => {
        root.innerHTML.toString(); // toString() to force the JS engine not to dead-code eliminate this
    });

    after(() => {
        document.body.removeChild(root);
    });
});
