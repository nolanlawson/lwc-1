/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { isTrue } from '@lwc/shared';
import features from '@lwc/features';

export default function detect(): boolean {
    if (features.DISABLE_LEGACY_BROWSER_SUPPORT) {
        return false;
    }

    // Note: when using this in mobile apps, we might have a DOM that does not support iframes.
    const hasIframe = typeof HTMLIFrameElement !== 'undefined';

    // This polyfill should only apply in compat mode; see https://github.com/salesforce/lwc/issues/1513
    const isCompat = typeof Proxy !== 'undefined' && isTrue((Proxy as any).isCompat);

    return hasIframe && isCompat;
}
