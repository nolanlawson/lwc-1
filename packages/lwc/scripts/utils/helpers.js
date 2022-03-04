/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const fs = require('fs');
const path = require('path');

const DEBUG_SUFFIX = '_debug';
const PROD_SUFFIX = '.min';

function getEs6ModuleEntry(pkg) {
    const pkgFilePath = require.resolve(`${pkg}/package.json`);
    const pkgDir = path.dirname(pkgFilePath);
    const pkgJson = JSON.parse(fs.readFileSync(pkgFilePath, 'utf8'));
    return path.join(pkgDir, pkgJson.module);
}

function generateTargetName({ target, prod, debug }) {
    return [target, debug ? DEBUG_SUFFIX : prod ? PROD_SUFFIX : '', '.js'].join('');
}

function buildBundleConfig(defaultConfig, { format, target, prod, debug }) {
    return {
        ...defaultConfig,
        targetDirectory: path.join(defaultConfig.dir, format),
        format,
        target,
        prod,
        debug,
    };
}

module.exports = {
    getEs6ModuleEntry,
    buildBundleConfig,
    generateTargetName,
};
