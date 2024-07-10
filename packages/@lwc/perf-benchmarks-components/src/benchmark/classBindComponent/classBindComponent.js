/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { LightningElement } from 'lwc';

export default class ClassBindComponent extends LightningElement {
    isUndefined = undefined;
    isNull = null;
    isEmptyString = '';
    isString = 'foo';
    isArray = ['foo', undefined, 'bar', 'baz'];
    isObject = {
        foo: 1,
        bar: 'not-empty',
        baz: {},
        buz: [],
        quux: 0,
        toto: '',
        haha: null,
        yolo: undefined,
        biz: NaN,
        fiz: -0,
    };
    isNested = ['foo', ['bar'], { baz: true }, 'foo', { foo: true, baz: true }, 'bar'];
}
