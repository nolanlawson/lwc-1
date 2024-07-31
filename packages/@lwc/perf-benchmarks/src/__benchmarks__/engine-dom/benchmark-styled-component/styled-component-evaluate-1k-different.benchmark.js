/*
 * Copyright (c) 2024, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

// Merely evaluate 1k components with different CSS in each component
benchmark(`dom/styled-component/shadow/create-different/1k`, () => {
    run(async () => {
        await import(
            '@lwc/perf-benchmarks-components/dist/dom/benchmark/shadow/styledComponents.js'
        );
    });
});
