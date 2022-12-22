/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import features from '@lwc/features';

export default function () {
    if (features.DISABLE_LEGACY_BROWSER_SUPPORT) {
        return false;
    }
    return typeof HTMLSlotElement === 'undefined';
}
