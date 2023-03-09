/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const path = require('path');
const { rollup } = require('rollup');
const virtual = require('@rollup/plugin-virtual');
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
        async renderChunk(chunkCode) {
            const magic = new MagicString(chunkCode);

            // @lwc/features must be injected here, so that the `lwcRuntimeFlags` global is available
            // This is why we run Rollup inside Rollup
            const bundle = await rollup({
                input: '__virtual_entry__',

                plugins: [
                    virtual({
                        __virtual_entry__: `import '@lwc/features'`,
                    }),
                    nodeResolve({
                        only: [/^@lwc\//],
                    }),
                    typescript(),
                ],
            });
            const { output } = await bundle.generate({
                format: 'iife',
                esModule: false, // no need for `Object.defineProperty(exports, '__esModule', { value: true })`
            });
            const { code: lwcFeaturesCode } = output[0];

            magic.indent('  ');
            magic.prepend(
                `${banner}\n${lwcFeaturesCode}\nif (!lwcRuntimeFlags.ENABLE_SYNTHETIC_SYNTHETIC_SHADOW) {\n`
            );
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
