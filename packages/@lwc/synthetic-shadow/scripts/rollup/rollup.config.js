/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const path = require('path');
const MagicString = require('magic-string');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const typescript = require('../../../../../scripts/rollup/typescript');
const { version } = require('../../package.json');

const entry = path.resolve(__dirname, '../../src/index.ts');
const targetDirectory = path.resolve(__dirname, '../../dist/');
const targetName = 'synthetic-shadow.js';
const banner = `
/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
/* proxy-compat-disable */`.trim();
const footer = `/** version: ${version} */`;

// Wrap in an `lwcRuntimeFlags` check, since we can't do this:
//
//     if (!lwcRuntimeFlags.ENABLE_SYNTHETIC_SYNTHETIC_SHADOW) {
//       import './main'
//     }
function enableBasedOnRuntimeFlag() {
    return {
        renderChunk(code) {
            const magic = new MagicString(code);

            // The IIFE will contain the string `var renderer = `, which we don't actually need. We just need the
            // part after, which is the actual IIFE (e.g. `(function () { /* code */ })()`)
            magic.indent('  ');
            magic.prepend(`${banner}\nif (!lwcRuntimeFlags.ENABLE_SYNTHETIC_SYNTHETIC_SHADOW) {\n`);
            magic.append(`}\n${footer}\n`);

            return {
                code: magic.toString(),
                map: magic.generateMap(),
            };
        },
    };
}

module.exports = {
    input: entry,
    output: {
        sourcemap: true,
        file: path.join(targetDirectory, targetName),
        name: 'SyntheticShadow',
        format: 'es',
    },
    plugins: [
        enableBasedOnRuntimeFlag(),
        nodeResolve({
            only: [/^@lwc\//],
        }),
        typescript(),
    ].filter(Boolean),
    onwarn({ code, message }) {
        if (!process.env.ROLLUP_WATCH && code !== 'CIRCULAR_DEPENDENCY') {
            throw new Error(message);
        }
    },
};
