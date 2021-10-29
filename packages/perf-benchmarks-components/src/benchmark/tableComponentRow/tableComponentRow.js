/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { LightningElement, api, track } from 'lwc';

export default class TableComponentRow extends LightningElement {
    // Does nothing, just used to test @track
    @track rowCopy = {};

    _row;

    @api
    set row(row) {
        Object.assign(this.rowCopy, row); // copy data over
        this._row = row;
    }

    get row() {
        return this._row;
    }

    handleSelect() {
        this.dispatchEvent(new CustomEvent('select'));
    }

    handleRemove() {
        this.dispatchEvent(new CustomEvent('remove'));
    }
}
