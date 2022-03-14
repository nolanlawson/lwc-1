/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const babel = require('@babel/core');
const { LWC_VERSION } = require('@lwc/shared');
const { stripIndents } = require('common-tags');
const prettier = require('prettier');
const fs = require('fs');
const path = require('path');

const BASE_CONFIG = { babelrc: false, configFile: false, filename: 'test.js' };

function transform(plugin, pluginOpts = {}, opts = {}) {
    const testConfig = Object.assign(
        {},
        BASE_CONFIG,
        {
            plugins: [[plugin, pluginOpts]],
        },
        opts
    );

    return function (source) {
        return babel.transform(prettify(source), testConfig);
    };
}

function prettify(str) {
    return str
        .toString()
        .replace(/^\s+|\s+$/, '')
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length)
        .join('\n');
}

function stripComments(str) {
    return str.replace(/\/\*LWC compiler v[\d.]+\*\//g, '');
}

function pluginTest(plugin, pluginOpts, opts = {}) {
    const testTransform = transform(plugin, pluginOpts, opts);

    const transformTest = function (actual, expected) {
        if (expected.error) {
            let transformError;

            try {
                testTransform(actual);
            } catch (error) {
                transformError = error;
            }

            expect(transformError.toString()).toContain(expected.error.message);
            expect(transformError.loc).toEqual(expected.error.loc);
        } else if (expected.output) {
            const output = testTransform(actual);
            if (expected.output.code !== undefined) {
                const normalizedActual =
                    output && output.code && stripIndents(stripComments(output.code));
                const normalizedExpected = stripIndents(expected.output.code);

                if (normalizedActual !== normalizedExpected) {
                    // we should fail, but with style
                    expect(prettier.format(normalizedActual, { parser: 'babel' })).toBe(
                        prettier.format(normalizedExpected, { parser: 'babel' })
                    );
                } else {
                    expect(normalizedActual).toBe(normalizedExpected);
                }
            }
        } else {
            throw new TypeError(`Transform test expect an object with either error or output.`);
        }
    };

    const write = (name, actual, expected) => {
        fs.mkdirSync('/tmp/snapshots', {
            recursive: true,
        });

        name = name
            .replace(/ /g, '-')
            .replace(/"/g, '')
            .replace(/[/[\]]/g, '-')
            .replace(/-{2,}/g, '-')
            .replace(/^-/, '')
            .toLowerCase();
        let folder = path.join('/tmp/snapshots', name);
        let count = 1;
        while (fs.existsSync(folder)) {
            folder = path.join('/tmp/snapshots', name + '-' + ++count);
        }
        fs.mkdirSync(folder);

        actual = prettier.format(actual, { parser: 'babel' });

        fs.writeFileSync(path.join(folder, 'actual.js'), actual, 'utf8');
        if (pluginOpts) {
            fs.writeFileSync(
                path.join(folder, 'config.json'),
                JSON.stringify(pluginOpts, null, 4, 'utf8')
            );
        }
        if (expected.output?.code) {
            const code = prettier
                .format(expected.output.code, { parser: 'babel' })
                .replace(new RegExp(LWC_VERSION.replace(/\./g, '\\.'), 'g'), 'X.X.X');
            fs.writeFileSync(path.join(folder, 'expected.js'), code, 'utf8');
        } else {
            fs.writeFileSync(
                path.join(folder, 'error.json'),
                JSON.stringify(expected.error, null, 4),
                'utf8'
            );
        }
    };

    const pluginTester = (name, actual, expected) => {
        write(name, actual, expected);
        test(name, () => transformTest(actual, expected));
    };
    pluginTester.skip = (name) => test.skip(name);
    pluginTester.only = (name, actual, expected) => {
        write(name, actual, expected);
        // eslint-disable-next-line jest/no-focused-tests
        test.only(name, () => transformTest(actual, expected));
    };

    return pluginTester;
}

module.exports.pluginTest = pluginTest;
module.exports.transform = transform;
