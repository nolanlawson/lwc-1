/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import path from 'path';
import { promisify } from 'util';
import resolve from 'resolve';

import {
    createRegistryEntry,
    findFirstUpwardConfigPath,
    isAliasModuleRecord,
    isDirModuleRecord,
    isNpmModuleRecord,
    getLwcConfig,
    getModuleEntry,
    normalizeConfig,
    validateNpmConfig,
    mergeModules,
    remapList,
    transposeObject,
    validateNpmAlias,
    exists,
} from './utils';
import { NoLwcModuleFound, LwcConfigError } from './errors';

import {
    RegistryEntry,
    AliasModuleRecord,
    InnerResolverOptions,
    ModuleRecord,
    DirModuleRecord,
    ModuleResolverConfig,
    NpmModuleRecord,
} from './types';

const resolveAsync = promisify(resolve) as unknown as (
    id: string,
    opts?: resolve.SyncOpts
) => Promise<string>;

async function resolveModuleFromAlias(
    specifier: string,
    moduleRecord: AliasModuleRecord,
    opts: InnerResolverOptions
): Promise<RegistryEntry | undefined> {
    const { name, path: modulePath } = moduleRecord;

    if (specifier !== name) {
        return;
    }

    const entry = path.resolve(opts.rootDir, modulePath);
    if (!(await exists(entry))) {
        throw new LwcConfigError(
            `Invalid alias module record "${JSON.stringify(
                moduleRecord
            )}", file "${entry}" does not exist`,
            { scope: opts.rootDir }
        );
    }

    return createRegistryEntry(entry, specifier, opts);
}

async function resolveModuleFromDir(
    specifier: string,
    moduleRecord: DirModuleRecord,
    opts: InnerResolverOptions
): Promise<RegistryEntry | undefined> {
    const { dir } = moduleRecord;

    const absModuleDir = path.isAbsolute(dir) ? dir : path.join(opts.rootDir, dir);

    if (!(await exists(absModuleDir))) {
        throw new LwcConfigError(
            `Invalid dir module record "${JSON.stringify(
                moduleRecord
            )}", directory ${absModuleDir} doesn't exists`,
            { scope: opts.rootDir }
        );
    }

    // A module dir record can only resolve module specifier with the following form "[ns]/[name]".
    // We can early exit if the required specifier doesn't match.
    const parts = specifier.split('/');
    if (parts.length !== 2) {
        return;
    }

    const [ns, name] = parts;
    const moduleDir = path.join(absModuleDir, ns, name);

    // Exit if the expected module directory doesn't exists.
    if (!(await exists(moduleDir))) {
        return;
    }

    const entry = await getModuleEntry(moduleDir, name, opts);
    return createRegistryEntry(entry, specifier, opts);
}

async function resolveModuleFromNpm(
    specifier: string,
    npmModuleRecord: NpmModuleRecord,
    opts: InnerResolverOptions
): Promise<RegistryEntry | undefined> {
    const { npm, map: aliasMapping } = npmModuleRecord;

    let pkgJsonPath;
    try {
        pkgJsonPath = await resolveAsync(`${npm}/package.json`, {
            basedir: opts.rootDir,
            preserveSymlinks: true,
        });
    } catch (error: any) {
        // If the module "package.json" can't be found, throw an an invalid config error. Otherwise
        // rethrow the original error.
        if (error.code === 'MODULE_NOT_FOUND') {
            throw new LwcConfigError(
                `Invalid npm module record "${JSON.stringify(
                    npmModuleRecord
                )}", "${npm}" npm module can't be resolved`,
                { scope: opts.rootDir }
            );
        }

        throw error;
    }

    const packageDir = path.dirname(pkgJsonPath);
    const lwcConfig = await getLwcConfig(packageDir);

    validateNpmConfig(lwcConfig, { rootDir: packageDir });
    let exposedModules = lwcConfig.expose;
    let reverseMapping;

    if (aliasMapping) {
        validateNpmAlias(lwcConfig.expose, aliasMapping, { rootDir: packageDir });
        exposedModules = remapList(lwcConfig.expose, aliasMapping);
        reverseMapping = transposeObject(aliasMapping);
    }

    if (exposedModules.includes(specifier)) {
        for (const moduleRecord of lwcConfig.modules) {
            const aliasedSpecifier = reverseMapping && reverseMapping[specifier];
            const registryEntry = await resolveModuleRecordType(
                aliasedSpecifier || specifier,
                moduleRecord,
                {
                    rootDir: packageDir,
                }
            );

            if (registryEntry) {
                if (aliasedSpecifier) {
                    registryEntry.specifier = specifier;
                }
                return registryEntry;
            }
        }

        throw new LwcConfigError(
            `Unable to find "${specifier}" under npm package "${npmModuleRecord.npm}"`,
            { scope: packageDir }
        );
    }
}

async function resolveModuleRecordType(
    specifier: string,
    moduleRecord: ModuleRecord,
    opts: InnerResolverOptions
): Promise<RegistryEntry | undefined> {
    const { rootDir } = opts;

    if (isAliasModuleRecord(moduleRecord)) {
        return resolveModuleFromAlias(specifier, moduleRecord, { rootDir });
    } else if (isDirModuleRecord(moduleRecord)) {
        return resolveModuleFromDir(specifier, moduleRecord, { rootDir });
    } else if (isNpmModuleRecord(moduleRecord)) {
        return resolveModuleFromNpm(specifier, moduleRecord, opts);
    }

    throw new LwcConfigError(`Unknown module record "${JSON.stringify(moduleRecord)}"`, {
        scope: rootDir,
    });
}

export async function resolveModule(
    importee: string,
    dirname: string,
    config?: Partial<ModuleResolverConfig>
): Promise<RegistryEntry> {
    if (typeof importee !== 'string') {
        throw new TypeError(
            `The importee argument must be a string. Received type ${typeof importee}`
        );
    }

    if (typeof dirname !== 'string') {
        throw new TypeError(
            `The dirname argument must be a string. Received type ${typeof dirname}`
        );
    }

    if (importee.startsWith('.') || importee.startsWith('/')) {
        throw new TypeError(
            `The importee argument must be a valid LWC module name. Received "${importee}"`
        );
    }

    const rootDir = await findFirstUpwardConfigPath(path.resolve(dirname));
    const lwcConfig = await getLwcConfig(rootDir);

    let modules = lwcConfig.modules || [];
    if (config) {
        const userConfig = normalizeConfig(config, rootDir);
        modules = mergeModules(userConfig.modules, modules);
    }

    for (const moduleRecord of modules) {
        const registryEntry = await resolveModuleRecordType(importee, moduleRecord, { rootDir });
        if (registryEntry) {
            return registryEntry;
        }
    }

    throw new NoLwcModuleFound(importee, dirname);
}
