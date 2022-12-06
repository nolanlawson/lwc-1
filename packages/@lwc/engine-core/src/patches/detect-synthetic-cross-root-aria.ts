/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import {
    assign,
    globalThis,
    isTrue,
    KEY__NATIVE_GET_ELEMENT_BY_ID,
    KEY__NATIVE_QUERY_SELECTOR_ALL,
    isNull,
    isUndefined,
    getOwnPropertyDescriptor,
    defineProperty,
} from '@lwc/shared';
import { onReportingEnabled, report, ReportId } from '../framework/reporting';
import { getAssociatedVMIfPresent, VM } from '../framework/vm';

// These attributes take either an ID or a list of IDs as values.
export const ID_REFERENCING_ATTRIBUTES_SET: Set<string> = new Set([
    'aria-activedescendant',
    'aria-controls',
    'aria-describedby',
    'aria-details',
    'aria-errormessage',
    'aria-flowto',
    'aria-labelledby',
    'aria-owns',
    'for',
]);

// Use the unpatched native getElementById/querySelectorAll rather than the synthetic one
const getElementById = globalThis[KEY__NATIVE_GET_ELEMENT_BY_ID] as typeof document.getElementById;

const querySelectorAll = globalThis[
    KEY__NATIVE_QUERY_SELECTOR_ALL
] as typeof document.querySelectorAll;

function isSyntheticShadowRootInstance(rootNode: Node): rootNode is ShadowRoot {
    return rootNode !== document && isTrue((rootNode as any).synthetic);
}

function reportViolation(source: Element, target: Element, attrName: string) {
    let vm: VM | undefined = getAssociatedVMIfPresent((source.getRootNode() as ShadowRoot).host);
    if (isUndefined(vm)) {
        vm = getAssociatedVMIfPresent((target.getRootNode() as ShadowRoot).host);
    }
    report(ReportId.CrossRootAriaInSyntheticShadow, vm);
    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error(
            (isUndefined(vm) ? '' : `<${vm.elm.tagName.toLowerCase()}>: `) +
                `Element <${source.tagName.toLowerCase()}> uses attribute "${attrName}" to reference element ` +
                `<${target.tagName.toLowerCase()}>, which is not in the same shadow root. This will break in native shadow DOM.`
        );
    }
}

function parseIdRefAttributeValue(attrValue: string | null): string[] {
    // FIXME: special characters in the ID
    return !isNull(attrValue)
        ? attrValue.replace(/^\s+/g, '').replace(/\s+$/g, '').split(/\s+/)
        : [];
}

function detectSyntheticCrossRootAria(elm: Element, attrName: string, attrValue: string) {
    const root = elm.getRootNode();
    if (!isSyntheticShadowRootInstance(root)) {
        return;
    }

    if (attrName === 'id') {
        if (isNull(attrValue)) {
            // if our id is null, nobody can reference us
            return;
        }
        // elm is the target, find the source
        for (const attrName of ID_REFERENCING_ATTRIBUTES_SET) {
            const query = `[${attrName}]`;
            const candidates = querySelectorAll.call(document, query);
            for (let i = 0; i < candidates.length; i++) {
                const candidate = candidates[i];
                const ids = parseIdRefAttributeValue(candidate.getAttribute(attrName));
                if (ids.includes(attrValue)) {
                    reportViolation(candidate, elm, attrName);
                    break;
                }
            }
        }
    } else {
        // elm is the source, find the target
        const ids = parseIdRefAttributeValue(attrValue);
        for (const id of ids) {
            const target = getElementById.call(document, id);
            if (!isNull(target)) {
                const targetRoot = target.getRootNode();
                if (targetRoot !== root) {
                    // target element's shadow root is not the same as ours
                    reportViolation(elm, target, attrName);
                }
            }
        }
    }
}

let enabled = false;

// We want to avoid patching globals whenever possible, so this should be tree-shaken out in prod-mode and if
// reporting is not enabled. It should also only run once
function enableDetection() {
    if (enabled) {
        return; // don't double-apply the patches
    }
    enabled = true;

    const { setAttribute } = Element.prototype;

    // Detect calling `setAttribute` to set an idref or an id
    assign(Element.prototype, {
        setAttribute(this: Element, attrName: string, attrValue: any) {
            setAttribute.call(this, attrName, attrValue);
            if (ID_REFERENCING_ATTRIBUTES_SET.has(attrName) || attrName === 'id') {
                detectSyntheticCrossRootAria(this, attrName, attrValue);
            }
        },
    } as Pick<Element, 'setAttribute'>);

    // Detect `elm.id = 'foo'`
    const id = getOwnPropertyDescriptor(Element.prototype, 'id');
    defineProperty(Element.prototype, 'id', {
        get() {
            return id!.get!.call(this);
        },
        set(value: any) {
            id!.set!.call(this, value);
            detectSyntheticCrossRootAria(this, 'id', value);
        },
    });
}

// Detecting cross-root ARIA in synthetic shadow only makes sense for the browser
if (process.env.IS_BROWSER) {
    if (process.env.NODE_ENV !== 'production') {
        enableDetection();
    } else {
        // in prod mode, we only enable detection if reporting is enabled
        onReportingEnabled(enableDetection);
    }
}
