/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { noop } from '@lwc/shared';
import { VM } from './vm';

export const enum ReportId {
    CrossRootAriaInSyntheticShadow,
}

type ReportingDispatcher = (reportId: ReportId, tagName?: string, vmIndex?: number) => void;

type OnReportingEnabledCallback = () => void;

/** Callbacks to invoke when reporting is enabled **/
const onReportingEnabledCallbacks: OnReportingEnabledCallback[] = [];

/** The currently assigned reporting dispatcher. */
let currentDispatcher: ReportingDispatcher = noop;

/**
 * Whether reporting is enabled.
 *
 * Note that this may seem redundant, given you can just check if the currentDispatcher is undefined,
 * but it turns out that Terser only strips out unused code if we use this explicit boolean.
 */
let enabled = false;

export const reportingControl = {
    /**
     * Attach a new reporting control (aka dispatcher).
     *
     * @param dispatcher - reporting control
     */
    attachDispatcher(dispatcher: ReportingDispatcher): void {
        enabled = true;
        currentDispatcher = dispatcher;
        for (const callback of onReportingEnabledCallbacks) {
            try {
                callback();
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error('Could not call OnReportingEnabled callback', err);
            }
        }
        onReportingEnabledCallbacks.length = 0; // clear the array
    },

    /**
     * Detach the current reporting control (aka dispatcher).
     */
    detachDispatcher(): void {
        enabled = false;
        currentDispatcher = noop;
    },
};

/**
 * Call a callback when reporting is enabled, or immediately if reporting is already enabled.
 * Will only ever be called once.
 * @param callback
 */
export function onReportingEnabled(callback: OnReportingEnabledCallback) {
    if (enabled) {
        // call immediately
        callback();
    } else {
        // call later
        onReportingEnabledCallbacks.push(callback);
    }
}

/**
 * Report to the current dispatcher, if there is one.
 * @param reportId
 * @param vm
 */
export function report(reportId: any, vm?: VM) {
    if (enabled) {
        currentDispatcher(reportId, vm?.tagName, vm?.idx);
    }
}
