/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { isUndefined } from './language';

export const enum APIVersion {
    FIFTY_EIGHT = 58,
    FIFTY_NINE = 59,
}

export const LOWEST_API_VERSION = APIVersion.FIFTY_EIGHT;
export const HIGHEST_API_VERSION = APIVersion.FIFTY_NINE;

const allVersions = new Set([APIVersion.FIFTY_EIGHT, APIVersion.FIFTY_NINE]);

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
    if (allVersions.has(version)) {
        return version;
    }
    throw new Error('Could not find APIVersion matching: ' + version);
}
