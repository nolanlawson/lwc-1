/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { ElementDirective, LwcDirective } from './types';

// The whole point of this function is just to typecheck to confirm that all directives are accounted for
// in our enums. The function is intentionally unused.
export function typecheckDirectives(directive: ElementDirective): LwcDirective {
    switch (directive.name) {
        case 'Dom':
        case 'Dynamic':
        case 'InnerHTML':
        case 'Key':
        case 'Ref':
        case 'Spread': {
            return LwcDirective[directive.name];
        }
        default: {
            const exhaustiveCheck: never = directive;
            throw new Error(`Unknown directive ${exhaustiveCheck}`);
        }
    }
}
