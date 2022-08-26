/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

const path = require('path');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const typescript = require('../../../../scripts/rollup/typescript');
const writeDistAndTypes = require('../../../../scripts/rollup/writeDistAndTypes');

module.exports = {
    input: path.resolve(__dirname, '../src/renderer/index.ts'),

    output: {
        name: 'renderer',
        file: 'renderer.js',
        format: 'iife',
    },

    plugins: [
        nodeResolve({
            resolveOnly: ['@lwc/shared'],
        }),
        typescript(),
        writeDistAndTypes(),
        replace({
            values: {
                'process.env.IS_BROWSER': 'true',
            },
            preventAssignment: true,
        }),
    ],
};
