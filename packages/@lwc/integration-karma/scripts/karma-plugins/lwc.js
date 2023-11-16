/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

/**
 * This transformation is inspired from the karma-rollup-transform:
 * https://github.com/jlmakes/karma-rollup-preprocessor/blob/master/lib/index.js
 */
'use strict';

const path = require('node:path');

const {
    DISABLE_SYNTHETIC_SHADOW_SUPPORT_IN_COMPILER,
    API_VERSION,
    DISABLE_STATIC_CONTENT_OPTIMIZATION,
} = require('../shared/options');
const Watcher = require('./Watcher');
const { runRollupFromKarma } = require('./run-rollup-from-karma.js');

function createPreprocessor(config, emitter, logger) {
    const { basePath } = config;

    const log = logger.create('preprocessor-lwc');
    const watcher = new Watcher(config, emitter, log);

    return async (content, file, done) => {
        const input = file.path;

        const suiteDir = path.dirname(input);

        // Wrap all the tests into a describe block with the file stricture name
        const ancestorDirectories = path.relative(basePath, suiteDir).split(path.sep);
        const intro = ancestorDirectories
            .map((tag) => `describe("${tag}", function () {`)
            .join('\n');
        const outro = ancestorDirectories.map(() => `});`).join('\n');

        // TODO [#3370]: remove experimental template expression flag
        const experimentalComplexExpressions = suiteDir.includes('template-expressions');

        const plugins = [
            [
                '@lwc/rollup-plugin',
                {
                    sourcemap: true,
                    experimentalDynamicComponent: {
                        loader: 'test-utils',
                        strict: true,
                    },
                    enableDynamicComponents: true,
                    experimentalComplexExpressions,
                    enableStaticContentOptimization: !DISABLE_STATIC_CONTENT_OPTIMIZATION,
                    disableSyntheticShadowSupport: DISABLE_SYNTHETIC_SHADOW_SUPPORT_IN_COMPILER,
                    apiVersion: API_VERSION,
                },
            ],
        ];

        // The engine and the test-utils is injected as UMD. This mapping defines how those modules can be
        // referenced from the window object.
        const globals = {
            lwc: 'LWC',
            'wire-service': 'WireService',
            'test-utils': 'TestUtils',
        };

        // Rollup should not attempt to resolve the engine and the test utils, Karma takes care of injecting it
        // globally in the page before running the tests.
        const external = ['lwc', 'wire-service', 'test-utils', '@test/loader'];

        await runRollupFromKarma({
            basePath,
            suiteDir,
            input,
            plugins,
            log,
            watcher,
            file,
            content,
            globals,
            intro,
            outro,
            external,
            done,
        });
    };
}

createPreprocessor.$inject = ['config', 'emitter', 'logger'];

module.exports = { 'preprocessor:lwc': ['factory', createPreprocessor] };
