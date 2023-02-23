/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { isFalse, isUndefined, isNull } from '@lwc/shared';
import { VM, scheduleRehydration, forceRehydration } from './vm';
import { isComponentConstructor } from './def';
import { LightningElementConstructor } from './base-lightning-element';
import { Template } from './template';
import { markComponentAsDirty } from './component';
import { isTemplateRegistered } from './secure-template';
import { StylesheetFactory } from './stylesheet';
import { assertNotProd, flattenStylesheets } from './utils';
import { createWeakMultiMap, WeakMultiMap } from './weak-multimap';

const swappedTemplateMap = new WeakMap<Template, Template>();
const swappedComponentMap = new WeakMap<LightningElementConstructor, LightningElementConstructor>();
const swappedStyleMap = new WeakMap<StylesheetFactory, StylesheetFactory>();

const activeTemplates: WeakMultiMap<Template, VM> = createWeakMultiMap();
const activeComponents: WeakMultiMap<LightningElementConstructor, VM> = createWeakMultiMap();
const activeStyles: WeakMultiMap<StylesheetFactory, VM> = createWeakMultiMap();

function rehydrateHotTemplate(tpl: Template): boolean {
    const list = activeTemplates.get(tpl);
    if (!isUndefined(list)) {
        list.forEach((vm) => {
            if (isFalse(vm.isDirty)) {
                // forcing the vm to rehydrate in the micro-task:
                markComponentAsDirty(vm);
                scheduleRehydration(vm);
            }
        });
    }
    return true;
}

function rehydrateHotStyle(style: StylesheetFactory): boolean {
    const list = activeStyles.get(style);
    if (!isUndefined(list)) {
        list.forEach((vm) => {
            // if a style definition is swapped, we must reset
            // vm's template content in the next micro-task:
            forceRehydration(vm);
        });
    }
    return true;
}

function rehydrateHotComponent(Ctor: LightningElementConstructor): boolean {
    const list = activeComponents.get(Ctor);
    let canRefreshAllInstances = true;
    if (!isUndefined(list)) {
        list.forEach((vm) => {
            const { owner } = vm;
            if (!isNull(owner)) {
                // if a component class definition is swapped, we must reset
                // owner's template content in the next micro-task:
                forceRehydration(owner);
            } else {
                // the hot swapping for components only work for instances of components
                // created from a template, root elements can't be swapped because we
                // don't have a way to force the creation of the element with the same state
                // of the current element.
                // Instead, we can report the problem to the caller so it can take action,
                // for example: reload the entire page.
                canRefreshAllInstances = false;
            }
        });
    }
    return canRefreshAllInstances;
}

export function getTemplateOrSwappedTemplate(tpl: Template): Template {
    assertNotProd(); // this method should never leak to prod

    const visited: Set<Template> = new Set();
    while (swappedTemplateMap.has(tpl) && !visited.has(tpl)) {
        visited.add(tpl);
        tpl = swappedTemplateMap.get(tpl)!;
    }

    return tpl;
}

export function getComponentOrSwappedComponent(
    Ctor: LightningElementConstructor
): LightningElementConstructor {
    assertNotProd(); // this method should never leak to prod

    const visited: Set<LightningElementConstructor> = new Set();
    while (swappedComponentMap.has(Ctor) && !visited.has(Ctor)) {
        visited.add(Ctor);
        Ctor = swappedComponentMap.get(Ctor)!;
    }

    return Ctor;
}

export function getStyleOrSwappedStyle(style: StylesheetFactory): StylesheetFactory {
    assertNotProd(); // this method should never leak to prod

    const visited: Set<StylesheetFactory> = new Set();
    while (swappedStyleMap.has(style) && !visited.has(style)) {
        visited.add(style);
        style = swappedStyleMap.get(style)!;
    }

    return style;
}

export function setActiveVM(vm: VM) {
    assertNotProd(); // this method should never leak to prod

    // tracking active component
    const Ctor = vm.def.ctor;
    // this will allow us to keep track of the hot components
    activeComponents.add(Ctor, vm);

    // tracking active template
    const tpl = vm.cmpTemplate;
    if (tpl) {
        // this will allow us to keep track of the templates that are
        // being used by a hot component
        activeTemplates.add(tpl, vm);

        // tracking active styles associated to template
        const stylesheets = tpl.stylesheets;
        if (!isUndefined(stylesheets)) {
            flattenStylesheets(stylesheets).forEach((stylesheet) => {
                // this is necessary because we don't hold the list of styles
                // in the vm, we only hold the selected (already swapped template)
                // but the styles attached to the template might not be the actual
                // active ones, but the swapped versions of those.
                stylesheet = getStyleOrSwappedStyle(stylesheet);
                // this will allow us to keep track of the stylesheet that are
                // being used by a hot component
                activeStyles.add(stylesheet, vm);
            });
        }
    }
}

export function swapTemplate(oldTpl: Template, newTpl: Template): boolean {
    if (process.env.NODE_ENV !== 'production') {
        if (isTemplateRegistered(oldTpl) && isTemplateRegistered(newTpl)) {
            swappedTemplateMap.set(oldTpl, newTpl);
            return rehydrateHotTemplate(oldTpl);
        } else {
            throw new TypeError(`Invalid Template`);
        }
    }

    return false;
}

export function swapComponent(
    oldComponent: LightningElementConstructor,
    newComponent: LightningElementConstructor
): boolean {
    if (process.env.NODE_ENV !== 'production') {
        if (isComponentConstructor(oldComponent) && isComponentConstructor(newComponent)) {
            swappedComponentMap.set(oldComponent, newComponent);
            return rehydrateHotComponent(oldComponent);
        } else {
            throw new TypeError(`Invalid Component`);
        }
    }

    return false;
}

export function swapStyle(oldStyle: StylesheetFactory, newStyle: StylesheetFactory): boolean {
    if (process.env.NODE_ENV !== 'production') {
        // TODO [#1887]: once the support for registering styles is implemented
        // we can add the validation of both styles around this block.
        swappedStyleMap.set(oldStyle, newStyle);
        return rehydrateHotStyle(oldStyle);
    }

    return false;
}
