/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { isNumber } from './language';

export const enum APIVersion {
    V58 = 58,
    V59 = 59,
}

export const LOWEST_API_VERSION = APIVersion.V58;
export const HIGHEST_API_VERSION = APIVersion.V59;

const allVersions = [APIVersion.V58, APIVersion.V59];
const allVersionsSet = new Set(allVersions);

export function getAPIVersionFromNumber(version: number | undefined): APIVersion {
    if (!isNumber(version)) {
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
    // If it's a number, and it's within the bounds of our known versions, then we should find the
    // highest version lower than the requested number.
    // For instance, if we know about versions 1, 2, 5, and 6, and the user requests 3, then we should return 2.
    for (let i = 1; i < allVersions.length; i++) {
        if (allVersions[i] > version) {
            return allVersions[i - 1];
        }
    }
    // We should never hit this condition, but if we do, default to the lowest version to be safe
    return LOWEST_API_VERSION;
}

export const enum APIFeature {
    ENABLE_NATIVE_CUSTOM_ELEMENT_LIFECYCLE,
    TREAT_ALL_PARSE5_ERRORS_AS_ERRORS,
}

export function isAPIFeatureEnabled(apiVersionFeature: APIFeature, apiVersion: APIVersion) {
    switch (apiVersionFeature) {
        case APIFeature.ENABLE_NATIVE_CUSTOM_ELEMENT_LIFECYCLE:
        case APIFeature.TREAT_ALL_PARSE5_ERRORS_AS_ERRORS:
            return apiVersion >= APIVersion.V59;
    }
}
