export interface StylesheetPrerenderer {
    register: (stylesheets: string[]) => void;
    flush: () => void;
}

let stylesheetPrerenderer: StylesheetPrerenderer | undefined;

export function setStylesheetPrerenderer(stylesheetPrerendererObj: StylesheetPrerenderer) {
    stylesheetPrerenderer = stylesheetPrerendererObj;
}

export function getStylesheetPrerenderer() {
    return stylesheetPrerenderer;
}
