/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
export type HostNode = any;
export type HostElement = any;

type N = HostNode;
type E = HostElement;

//
// Primitives
//

export let ssr: boolean;

export let isNativeShadowDefined: boolean;

export let isSyntheticShadowDefined: boolean;

type HTMLElementType = typeof HTMLElement;
let HTMLElementExported: HTMLElementType;
export { HTMLElementExported as HTMLElement };

//
// Functions
//

type isHydratingFunc = () => boolean;
export let isHydrating: isHydratingFunc;

type insertFunc = (node: N, parent: E, anchor: N | null) => void;
export let insert: insertFunc;

type removeFunc = (node: N, parent: E) => void;
export let remove: removeFunc;

type createElementFunc = (tagName: string, namespace?: string) => E;
export let createElement: createElementFunc;

type createTextFunc = (content: string) => N;
export let createText: createTextFunc;

type createCommentFunc = (content: string) => N;
export let createComment: createCommentFunc;

type nextSiblingFunc = (node: N) => N | null;
export let nextSibling: nextSiblingFunc;

type attachShadowFunc = (element: E, options: ShadowRootInit) => N;
export let attachShadow: attachShadowFunc;

type getPropertyFunc = (node: N, key: string) => any;
export let getProperty: getPropertyFunc;

type setPropertyFunc = (node: N, key: string, value: any) => void;
export let setProperty: setPropertyFunc;

type setTextFunc = (node: N, content: string) => void;
export let setText: setTextFunc;

type getAttributeFunc = (element: E, name: string, namespace?: string | null) => string | null;
export let getAttribute: getAttributeFunc;

type setAttributeFunc = (
    element: E,
    name: string,
    value: string,
    namespace?: string | null
) => void;
export let setAttribute: setAttributeFunc;

type removeAttributeFunc = (element: E, name: string, namespace?: string | null) => void;
export let removeAttribute: removeAttributeFunc;

type addEventListenerFunc = (
    target: N,
    type: string,
    callback: (event: Event) => any,
    options?: AddEventListenerOptions | boolean
) => void;
export let addEventListener: addEventListenerFunc;

type removeEventListenerFunc = (
    target: N,
    type: string,
    callback: (event: Event) => any,
    options?: EventListenerOptions | boolean
) => void;
export let removeEventListener: removeEventListenerFunc;

type dispatchEventFunc = (target: N, event: Event) => boolean;
export let dispatchEvent: dispatchEventFunc;

type getClassListFunc = (element: E) => DOMTokenList;
export let getClassList: getClassListFunc;

type setCSSStylePropertyFunc = (
    element: E,
    name: string,
    value: string,
    important: boolean
) => void;
export let setCSSStyleProperty: setCSSStylePropertyFunc;

type getBoundingClientRectFunc = (element: E) => ClientRect;
export let getBoundingClientRect: getBoundingClientRectFunc;

type querySelectorFunc = (element: E, selectors: string) => E | null;
export let querySelector: querySelectorFunc;

type querySelectorAllFunc = (element: E, selectors: string) => NodeList;
export let querySelectorAll: querySelectorAllFunc;

type getElementsByTagNameFunc = (element: E, tagNameOrWildCard: string) => HTMLCollection;
export let getElementsByTagName: getElementsByTagNameFunc;

type getElementsByClassNameFunc = (element: E, names: string) => HTMLCollection;
export let getElementsByClassName: getElementsByClassNameFunc;

type getChildrenFunc = (element: E) => HTMLCollection;
export let getChildren: getChildrenFunc;

type getChildNodesFunc = (element: E) => NodeList;
export let getChildNodes: getChildNodesFunc;

type getFirstChildFunc = (element: E) => N | null;
export let getFirstChild: getFirstChildFunc;

type getFirstElementChildFunc = (element: E) => E | null;
export let getFirstElementChild: getFirstElementChildFunc;

type getLastChildFunc = (element: E) => N | null;
export let getLastChild: getLastChildFunc;

type getLastElementChildFunc = (element: E) => E | null;
export let getLastElementChild: getLastElementChildFunc;

type isConnectedFunc = (node: N) => boolean;
export let isConnected: isConnectedFunc;

type insertGlobalStylesheetFunc = (content: string) => void;
export let insertGlobalStylesheet: insertGlobalStylesheetFunc;

type insertStylesheetFunc = (content: string, target: N) => void;
export let insertStylesheet: insertStylesheetFunc;

type assertInstanceOfHTMLElementFunc = (elm: any, msg: string) => void;
export let assertInstanceOfHTMLElement: assertInstanceOfHTMLElementFunc;

type defineCustomElementFunc = (
    name: string,
    constructor: CustomElementConstructor,
    options?: ElementDefinitionOptions
) => void;
export let defineCustomElement: defineCustomElementFunc;

type getCustomElementFunc = (name: string) => CustomElementConstructor | undefined;
export let getCustomElement: getCustomElementFunc;

//
// Renderer initialization
//

export interface Renderer {
    HTMLElement: HTMLElementType;
    addEventListener: addEventListenerFunc;
    assertInstanceOfHTMLElement: assertInstanceOfHTMLElementFunc;
    attachShadow: attachShadowFunc;
    createComment: createCommentFunc;
    createElement: createElementFunc;
    createText: createTextFunc;
    defineCustomElement: defineCustomElementFunc;
    dispatchEvent: dispatchEventFunc;
    getAttribute: getAttributeFunc;
    getBoundingClientRect: getBoundingClientRectFunc;
    getChildNodes: getChildNodesFunc;
    getChildren: getChildrenFunc;
    getClassList: getClassListFunc;
    getCustomElement: getCustomElementFunc;
    getElementsByClassName: getElementsByClassNameFunc;
    getElementsByTagName: getElementsByTagNameFunc;
    getFirstChild: getFirstChildFunc;
    getFirstElementChild: getFirstElementChildFunc;
    getLastChild: getLastChildFunc;
    getLastElementChild: getLastElementChildFunc;
    getProperty: getPropertyFunc;
    insert: insertFunc;
    insertGlobalStylesheet: insertGlobalStylesheetFunc;
    insertStylesheet: insertStylesheetFunc;
    isConnected: isConnectedFunc;
    isHydrating: isHydratingFunc;
    isNativeShadowDefined: boolean;
    isSyntheticShadowDefined: boolean;
    nextSibling: nextSiblingFunc;
    querySelector: querySelectorFunc;
    querySelectorAll: querySelectorAllFunc;
    remove: removeFunc;
    removeAttribute: removeAttributeFunc;
    removeEventListener: removeEventListenerFunc;
    setAttribute: setAttributeFunc;
    setCSSStyleProperty: setCSSStylePropertyFunc;
    setProperty: setPropertyFunc;
    setText: setTextFunc;
    ssr: boolean;
}

export function setRenderer({
    HTMLElement: HTMLElementImpl,
    addEventListener: addEventListenerImpl,
    assertInstanceOfHTMLElement: assertInstanceOfHTMLElementImpl,
    attachShadow: attachShadowImpl,
    createComment: createCommentImpl,
    createElement: createElementImpl,
    createText: createTextImpl,
    defineCustomElement: defineCustomElementImpl,
    dispatchEvent: dispatchEventImpl,
    getAttribute: getAttributeImpl,
    getBoundingClientRect: getBoundingClientRectImpl,
    getChildNodes: getChildNodesImpl,
    getChildren: getChildrenImpl,
    getClassList: getClassListImpl,
    getCustomElement: getCustomElementImpl,
    getElementsByClassName: getElementsByClassNameImpl,
    getElementsByTagName: getElementsByTagNameImpl,
    getFirstChild: getFirstChildImpl,
    getFirstElementChild: getFirstElementChildImpl,
    getLastChild: getLastChildImpl,
    getLastElementChild: getLastElementChildImpl,
    getProperty: getPropertyImpl,
    insert: insertImpl,
    insertGlobalStylesheet: insertGlobalStylesheetImpl,
    insertStylesheet: insertStylesheetImpl,
    isConnected: isConnectedImpl,
    isHydrating: isHydratingImpl,
    isNativeShadowDefined: isNativeShadowDefinedImpl,
    isSyntheticShadowDefined: isSyntheticShadowDefinedImpl,
    nextSibling: nextSiblingImpl,
    querySelector: querySelectorImpl,
    querySelectorAll: querySelectorAllImpl,
    remove: removeImpl,
    removeAttribute: removeAttributeImpl,
    removeEventListener: removeEventListenerImpl,
    setAttribute: setAttributeImpl,
    setCSSStyleProperty: setCSSStylePropertyImpl,
    setProperty: setPropertyImpl,
    setText: setTextImpl,
    ssr: ssrImpl,
}: Renderer) {
    HTMLElementExported = HTMLElementImpl;
    addEventListener = addEventListenerImpl;
    assertInstanceOfHTMLElement = assertInstanceOfHTMLElementImpl;
    attachShadow = attachShadowImpl;
    createComment = createCommentImpl;
    createElement = createElementImpl;
    createText = createTextImpl;
    defineCustomElement = defineCustomElementImpl;
    dispatchEvent = dispatchEventImpl;
    getAttribute = getAttributeImpl;
    getBoundingClientRect = getBoundingClientRectImpl;
    getChildNodes = getChildNodesImpl;
    getChildren = getChildrenImpl;
    getClassList = getClassListImpl;
    getCustomElement = getCustomElementImpl;
    getElementsByClassName = getElementsByClassNameImpl;
    getElementsByTagName = getElementsByTagNameImpl;
    getFirstChild = getFirstChildImpl;
    getFirstElementChild = getFirstElementChildImpl;
    getLastChild = getLastChildImpl;
    getLastElementChild = getLastElementChildImpl;
    getProperty = getPropertyImpl;
    insert = insertImpl;
    insertGlobalStylesheet = insertGlobalStylesheetImpl;
    insertStylesheet = insertStylesheetImpl;
    isConnected = isConnectedImpl;
    isHydrating = isHydratingImpl;
    isNativeShadowDefined = isNativeShadowDefinedImpl;
    isSyntheticShadowDefined = isSyntheticShadowDefinedImpl;
    nextSibling = nextSiblingImpl;
    querySelector = querySelectorImpl;
    querySelectorAll = querySelectorAllImpl;
    remove = removeImpl;
    removeAttribute = removeAttributeImpl;
    removeEventListener = removeEventListenerImpl;
    setAttribute = setAttributeImpl;
    setCSSStyleProperty = setCSSStylePropertyImpl;
    setProperty = setPropertyImpl;
    setText = setTextImpl;
    ssr = ssrImpl;
}
