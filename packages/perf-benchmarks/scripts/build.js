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

const {
    BENCHMARK_HORIZON = '1%', // how much difference we want to determine between A and B
} = process.env;
let {
    BENCHMARK_SAMPLE_SIZE = 100, // minimum number of samples to run
    BENCHMARK_TIMEOUT = 20, // timeout in minutes during auto-sampling (after the minimum samples). If 0, no auto-sampling
} = process.env;

const toInt = (num) => (typeof num === 'number' ? num : parseInt(num, 10));

BENCHMARK_SAMPLE_SIZE = toInt(BENCHMARK_SAMPLE_SIZE);
BENCHMARK_TIMEOUT = toInt(BENCHMARK_TIMEOUT);

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

async function createTachometerJson(htmlFilename, benchmarkName) {
    return {
        $schema: 'https://raw.githubusercontent.com/Polymer/tachometer/master/config.schema.json',
        sampleSize: BENCHMARK_SAMPLE_SIZE,
        horizons: [BENCHMARK_HORIZON],
        timeout: BENCHMARK_TIMEOUT,
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
                        name: `${benchmarkName}`,
                    },
                    {
                        name: `${benchmarkName}-profile-noop`,
                        url: htmlFilename + '?profile=noop',
                    },
                    {
                        name: `${benchmarkName}-profile-minimal`,
                        url: htmlFilename + '?profile=minimal',
                    },
                    {
                        name: `${benchmarkName}-profile-newObject`,
                        url: htmlFilename + '?profile=newObject',
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
        const tachometerJson = await createTachometerJson(htmlFilename, benchmarkName);
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
