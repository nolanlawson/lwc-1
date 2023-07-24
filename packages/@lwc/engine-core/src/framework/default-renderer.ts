import { RendererAPI } from './renderer';

let defaultRenderer: RendererAPI | undefined;

export function setDefaultRenderer(renderer: RendererAPI) {
    defaultRenderer = renderer;
}

export function getDefaultRenderer() {
    return defaultRenderer;
}
