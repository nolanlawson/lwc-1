/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { create, defineProperty, isBoolean, globalThis } from '@lwc/shared';
import { FeatureFlagMap, FeatureFlagName, FeatureFlagValue } from './types';

if (!globalThis.lwcRuntimeFlags) {
    defineProperty(globalThis, 'lwcRuntimeFlags', { value: create(null) });
}

export const lwcRuntimeFlags: Partial<FeatureFlagMap> = globalThis.lwcRuntimeFlags;

/**
 * Set the value at runtime of a given feature flag. This method only be invoked once per feature
 * flag. It is meant to be used during the app initialization.
 */
export function setFeatureFlag(name: FeatureFlagName, value: FeatureFlagValue): void {
    if (process.env.NODE_ENV !== 'production') {
        // Warn if the value is not a boolean
        if (!isBoolean(value)) {
            const message = `Incorrect value "${value}" for the runtime feature flag "${name}". Runtime feature flags should be set to a boolean value.`;
            // eslint-disable-next-line no-console
            console.error(message);
        }
    }
    lwcRuntimeFlags[name] = value;
}

/**
 * Set the value at runtime of a given feature flag. This method should only be used for testing
 * purposes. It is a no-op when invoked in production mode.
 */
export function setFeatureFlagForTest(name: FeatureFlagName, value: FeatureFlagValue): void {
    if (process.env.NODE_ENV !== 'production') {
        setFeatureFlag(name, value);
    }
}
