/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import * as babel from '@babel/core';

import babelClassPropertiesPlugin from '@babel/plugin-proposal-class-properties';
import babelObjectRestSpreadPlugin from '@babel/plugin-proposal-object-rest-spread';
import lwcClassTransformPlugin from '@lwc/babel-plugin-component';

import { normalizeToCompilerError, TransformerErrors } from '@lwc/errors';

import { DynamicComponentConfig, NormalizedTransformOptions } from '../options';
import { TransformResult } from './transformer';

const memoizedPlugins = new Map();

const babelClassPropertiesPluginLoose = (api: any) =>
    babelClassPropertiesPlugin(api, { loose: true });

const memoizePlugins = (
    isExplicitImport: boolean,
    dynamicImports: DynamicComponentConfig | undefined
) => {
    const cacheKey = [
        isExplicitImport,
        dynamicImports?.strictSpecifier,
        dynamicImports?.loader,
    ].join('-');
    let cached = memoizedPlugins.get(cacheKey);
    if (!cached) {
        cached = [
            (api: any) => lwcClassTransformPlugin(api, { isExplicitImport, dynamicImports }),
            babelClassPropertiesPluginLoose,

            // This plugin should be removed in a future version. The object-rest-spread is
            // already a stage 4 feature. The LWC compile should leave this syntax untouched.
            babelObjectRestSpreadPlugin,
        ];
        memoizedPlugins.set(cacheKey, cached);
    }
    return cached;
};

export default function scriptTransform(
    code: string,
    filename: string,
    options: NormalizedTransformOptions
): TransformResult {
    const {
        isExplicitImport,
        experimentalDynamicComponent: dynamicImports,
        outputConfig: { sourcemap },
    } = options;

    let result;
    try {
        result = babel.transformSync(code, {
            filename,
            sourceMaps: sourcemap,

            // Prevent Babel from loading local configuration.
            babelrc: false,
            configFile: false,

            // Force Babel to generate new line and whitespaces. This prevent Babel from generating
            // an error when the generated code is over 500KB.
            compact: false,

            plugins: memoizePlugins(isExplicitImport, dynamicImports),
        })!;
    } catch (e) {
        throw normalizeToCompilerError(TransformerErrors.JS_TRANSFORMER_ERROR, e, { filename });
    }

    return {
        code: result.code!,
        map: result.map,
    };
}
