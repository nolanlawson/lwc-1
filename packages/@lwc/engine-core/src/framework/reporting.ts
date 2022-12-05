/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { noop } from '@lwc/shared';
import { VM } from './vm';

type ReportingDispatcher = (reportId: any, tagName?: string, vmIndex?: number) => void;

type OnReportingEnabledCallback = () => void;

/** Indicates if reporting is enabled or not */
let enabled = false;

const onReportingEnabledCallbacks: OnReportingEnabledCallback[] = [];

/** The currently assigned reporting dispatcher. */
let currentDispatcher: ReportingDispatcher = noop;

export const reportingControl = {
    /**
     * Attach a new reporting control (aka dispatcher).
     *
     * @param dispatcher - reporting control
     */
    attachReportingControl(dispatcher: ReportingDispatcher): void {
        currentDispatcher = dispatcher;
        enabled = true;
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
    detachReportingControl(): void {
        currentDispatcher = noop;
        enabled = false;
    },
};

/**
 * True if a reporting dispatcher is currently attached.
 */
export function isReportingEnabled(): boolean {
    return enabled;
}

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
