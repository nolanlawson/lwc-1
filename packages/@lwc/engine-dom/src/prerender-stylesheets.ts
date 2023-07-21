import { setStylesheetPrerenderer } from '@lwc/engine-core';

const prerenderedStylesheets = new Set<string>();

export function isStylesheetPrerendered(stylesheet: string): boolean {
    return prerenderedStylesheets.has(stylesheet);
}

const queuedStylesheets: string[] = [];

export function flushPrerenderedStylesheets() {
    if (queuedStylesheets.length === 0) {
        return;
    }

    const style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = queuedStylesheets.join('\n');

    document.head.appendChild(style);

    for (const stylesheet of queuedStylesheets) {
        prerenderedStylesheets.add(stylesheet);
    }
    queuedStylesheets.length = 0;
}

export function clearPrerenderedStylesheets() {
    queuedStylesheets.length = 0;
    prerenderedStylesheets.clear();
}

function registerStylesheets(stylesheets: string[]) {
    queuedStylesheets.push(...stylesheets);
}

const stylesheetPrerenderer = {
    register: registerStylesheets,
    flush: flushPrerenderedStylesheets,
};

setStylesheetPrerenderer(stylesheetPrerenderer);
