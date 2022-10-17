/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import type { PluginObj } from '@babel/core';

export interface DynamicComponentConfig {
    loader?: string;
    strictSpecifier?: boolean;
}

export interface LwcBabelPluginOptions {
    dynamicImports?: DynamicComponentConfig;
    isExplicitImport?: boolean;
}

// This `api` should be PluginAPI, but Babel doesn't seem to export it
// https://github.com/babel/babel/blob/eec9574/packages/babel-core/src/config/helpers/config-api.ts#L43-L45
export default function babelPluginComponent(api: any, options?: LwcBabelPluginOptions): PluginObj;
