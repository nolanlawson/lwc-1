/**
 * Copyright (C) 2018 salesforce.com, inc.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var shared = require('@lwc/shared');

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const features = {
    DUMMY_TEST_FLAG: null,
    ENABLE_ELEMENT_PATCH: null,
    ENABLE_FORCE_NATIVE_SHADOW_MODE_FOR_TEST: null,
    ENABLE_HMR: null,
    ENABLE_HTML_COLLECTIONS_PATCH: null,
    ENABLE_INNER_OUTER_TEXT_PATCH: null,
    ENABLE_MIXED_SHADOW_MODE: null,
    ENABLE_NODE_LIST_PATCH: null,
    ENABLE_NODE_PATCH: null,
    ENABLE_REACTIVE_SETTER: null,
    ENABLE_WIRE_SYNC_EMIT: null,
};
if (!shared.globalThis.lwcRuntimeFlags) {
    Object.defineProperty(shared.globalThis, 'lwcRuntimeFlags', { value: shared.create(null) });
}
const runtimeFlags = shared.globalThis.lwcRuntimeFlags;
/**
 * Set the value at runtime of a given feature flag. This method only be invoked once per feature
 * flag. It is meant to be used during the app initialization.
 */
function setFeatureFlag(name, value) {
    if (!shared.isBoolean(value)) {
        const message = `Failed to set the value "${value}" for the runtime feature flag "${name}". Runtime feature flags can only be set to a boolean value.`;
        if (process.env.NODE_ENV !== 'production') {
            throw new TypeError(message);
        }
        else {
            // eslint-disable-next-line no-console
            console.error(message);
            return;
        }
    }
    if (shared.isUndefined(features[name])) {
        const availableFlags = shared.keys(features)
            .map((name) => `"${name}"`)
            .join(', ');
        // eslint-disable-next-line no-console
        console.warn(`Failed to set the value "${value}" for the runtime feature flag "${name}" because it is undefined. Available flags: ${availableFlags}.`);
        return;
    }
    if (process.env.NODE_ENV !== 'production') {
        // Allow the same flag to be set more than once outside of production to enable testing
        runtimeFlags[name] = value;
    }
    else {
        // Disallow the same flag to be set more than once in production
        const runtimeValue = runtimeFlags[name];
        if (!shared.isUndefined(runtimeValue)) {
            // eslint-disable-next-line no-console
            console.error(`Failed to set the value "${value}" for the runtime feature flag "${name}". "${name}" has already been set with the value "${runtimeValue}".`);
            return;
        }
        shared.defineProperty(runtimeFlags, name, { value });
    }
}
/**
 * Set the value at runtime of a given feature flag. This method should only be used for testing
 * purposes. It is a no-op when invoked in production mode.
 */
function setFeatureFlagForTest(name, value) {
    if (process.env.NODE_ENV !== 'production') {
        setFeatureFlag(name, value);
    }
}

exports["default"] = features;
exports.runtimeFlags = runtimeFlags;
exports.setFeatureFlag = setFeatureFlag;
exports.setFeatureFlagForTest = setFeatureFlagForTest;
/** version: 2.22.0 */
