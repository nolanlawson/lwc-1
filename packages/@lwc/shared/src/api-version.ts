/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { isUndefined } from './language';

export const enum APIVersion {
    V58 = 58,
    V59 = 59,
}

export const LOWEST_API_VERSION = APIVersion.V58;
export const HIGHEST_API_VERSION = APIVersion.V59;

const allVersionsSet = new Set([APIVersion.V58, APIVersion.V59]);

export function getAPIVersionFromNumber(version: number | undefined): APIVersion {
    if (isUndefined(version)) {
        return LOWEST_API_VERSION;
    }
    if (version < LOWEST_API_VERSION) {
        return LOWEST_API_VERSION;
    }
    if (version > HIGHEST_API_VERSION) {
        return HIGHEST_API_VERSION;
    }
    if (allVersionsSet.has(version)) {
        return version;
    }
    throw new Error('Could not find APIVersion matching: ' + version);
}

export const enum APIFeature {
    ENABLE_NATIVE_CUSTOM_ELEMENT_LIFECYCLE,
}

export function isAPIFeatureEnabled(apiVersionFeature: APIFeature, apiVersion: APIVersion) {
    switch (apiVersionFeature) {
        case APIFeature.ENABLE_NATIVE_CUSTOM_ELEMENT_LIFECYCLE:
            return apiVersion >= APIVersion.V59;
    }
}
