/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

/**
 * Builds the HTML and tachometer.json files necessary to run the benchmarks.
 */

const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const glob = promisify(require('glob'));

const writeFile = promisify(fs.writeFile);

// lwc packages that need to be swapped in when comparing the current code to the latest tip-of-tree code.
const swappablePackages = [
    '@lwc/engine-dom',
    '@lwc/engine-server',
    '@lwc/synthetic-shadow',
    'perf-benchmarks-components',
];

function createHtml(benchmarkFile) {
    return `
    <!doctype html>
    <html>
      <head>
        <title>Benchmark</title>
      </head>
      <body>
        <script type="module">
          // Always test performance in production mode.
          // Note this is needed for modules like @lwc/synthetic-shadow, since we can't run it through
          // @rollup/plugin-replace since Tachometer will serve it.
          window.process = { env: { NODE_ENV: 'production' } };
        </script>
        <script type="module" src="./${path.basename(benchmarkFile)}"></script>
      </body>
    </html>
  `.trim();
}

function createTachometerJson(htmlFilename, benchmarkName) {
    return {
        $schema: 'https://raw.githubusercontent.com/Polymer/tachometer/master/config.schema.json',
        sampleSize: 50, // minimum number of samples to run
        timeout: 0, // timeout in minutes during auto-sampling (after the first minimum samples). If 0, no auto-sampling
        benchmarks: [
            {
                url: htmlFilename,
                name: benchmarkName,
                browser: {
                    name: 'chrome',
                    headless: true,
                },
                measurement: {
                    mode: 'performance',
                    entryName: 'benchmark-run',
                },
                expand: [
                    {
                        name: `${benchmarkName}-this-change`,
                    },
                    {
                        name: `${benchmarkName}-tip-of-tree`,
                        packageVersions: {
                            label: 'tip-of-tree',
                            dependencies: Object.fromEntries(
                                swappablePackages.map((pkg) => [
                                    pkg,
                                    {
                                        kind: 'git',
                                        repo: 'https://github.com/salesforce/lwc.git',
                                        ref: 'master',
                                        subdir: `packages/${pkg}`,
                                        setupCommands: [
                                            'yarn --immutable',
                                            'yarn build:performance:components',
                                        ],
                                    },
                                ])
                            ),
                        },
                    },
                ],
            },
        ],
    };
}

// Given a benchmark source file, create the necessary HTML file and Tachometer JSON
// file for running it.
async function processBenchmarkFile(benchmarkFile) {
    const targetDir = path.dirname(benchmarkFile);
    const benchmarkFileBasename = path.basename(benchmarkFile);
    const htmlFilename = path.join(targetDir, benchmarkFileBasename.replace('.js', '.html'));

    async function writeHtmlFile() {
        const html = createHtml(benchmarkFile);
        await writeFile(htmlFilename, html, 'utf8');
    }

    async function writeTachometerJsonFile() {
        const engineType = benchmarkFile.includes('/engine-server/') ? 'server' : 'dom';
        const benchmarkName = `${engineType}-${benchmarkFileBasename.split('.')[0]}`;
        const tachometerJson = createTachometerJson(htmlFilename, benchmarkName);
        const jsonFilename = path.join(
            targetDir,
            `${benchmarkFileBasename.split('.')[0]}.tachometer.json`
        );
        await writeFile(jsonFilename, JSON.stringify(tachometerJson, null, 2), 'utf8');
    }

    await Promise.all([writeHtmlFile(), writeTachometerJsonFile()]);
}

async function main() {
    const benchmarkFiles = await glob(
        path.join(__dirname, '../dist/__benchmarks__/**/*.benchmark.js')
    );
    await Promise.all(benchmarkFiles.map((file) => processBenchmarkFile(file)));
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
