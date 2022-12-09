/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import {isString, isUndefined} from '@lwc/shared';

import { VM } from '../framework/vm';
import { getComponentStack } from './format';

type Loggable = string | (string | Element)[]

function log(method: 'warn' | 'error', message: Loggable, vm?: VM) {
    const messageToLog = [
        `[LWC ${method}]:`,
        ...(isString(message) ? [message] : message)
    ]

    if (!isUndefined(vm)) {
        messageToLog.push(`${messageToLog}\n${getComponentStack(vm)}`)
    }

    /* eslint-disable-next-line no-console */
    console[method](...messageToLog)
}

export function logError(message: Loggable, vm?: VM) {
    log('error', message, vm);
}

export function logWarn(message: Loggable, vm?: VM) {
    log('warn', message, vm);
}
