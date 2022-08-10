"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEMPLATE_DIRECTIVES = exports.ATTR_NAME = exports.HTML_TAG = exports.KNOWN_HTML_AND_SVG_ELEMENTS = exports.HTML_ATTRIBUTES_REVERSE_LOOKUP = exports.DISALLOWED_HTML_TAGS = exports.ATTRS_PROPS_TRANFORMS = exports.DISALLOWED_MATHML_TAGS = exports.SUPPORTED_SVG_TAGS = exports.DATA_RE = exports.ID_REFERENCING_ATTRIBUTES_SET = exports.ROOT_TEMPLATE_DIRECTIVES = exports.LWC_DIRECTIVE_SET = exports.LWC_DIRECTIVES = exports.EVENT_HANDLER_NAME_RE = exports.EVENT_HANDLER_RE = exports.ITERATOR_RE = exports.VALID_IF_MODIFIER = exports.LWC_RE = exports.IF_RE = exports.EXPRESSION_RE = void 0;
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const shared_1 = require("@lwc/shared");
const html_element_attributes_1 = require("./utils/html-element-attributes");
const html_elements_1 = require("./utils/html-elements");
const svg_elements_1 = require("./utils/svg-elements");
exports.EXPRESSION_RE = /(\{(?:.)+?\})/g;
exports.IF_RE = /^if:/;
exports.LWC_RE = /^lwc:/;
exports.VALID_IF_MODIFIER = new Set(['true', 'false', 'strict-true']);
exports.ITERATOR_RE = /^iterator:.*$/;
exports.EVENT_HANDLER_RE = /^on/;
exports.EVENT_HANDLER_NAME_RE = /^on[a-z][a-z0-9_]*$/;
exports.LWC_DIRECTIVES = {
    DOM: 'lwc:dom',
    DYNAMIC: 'lwc:dynamic',
    INNER_HTML: 'lwc:inner-html',
};
exports.LWC_DIRECTIVE_SET = new Set(Object.values(exports.LWC_DIRECTIVES));
exports.ROOT_TEMPLATE_DIRECTIVES = {
    PRESERVE_COMMENTS: 'lwc:preserve-comments',
    RENDER_MODE: 'lwc:render-mode',
};
// These attributes take either an ID or a list of IDs as values.
exports.ID_REFERENCING_ATTRIBUTES_SET = new Set([
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
const ATTRIBUTE_NAME_CHAR = [
    ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-',
    '\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD',
    '\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040',
].join('');
exports.DATA_RE = new RegExp('^(data)-[' + ATTRIBUTE_NAME_CHAR + ']*$');
exports.SUPPORTED_SVG_TAGS = new Set([
    'svg',
    'a',
    'altGlyph',
    'altglyphDef',
    'altGlyphItem',
    'animate',
    'animateColor',
    'animateMotion',
    'animateTransform',
    'audio',
    'canvas',
    'circle',
    'clipPath',
    'defs',
    'desc',
    'ellipse',
    'feBlend',
    'feColorMatrix',
    'feComponentTransfer',
    'feFuncR',
    'feFuncG',
    'feFuncB',
    'feFuncA',
    'feComposite',
    'feConvolveMatrix',
    'feDiffuseLighting',
    'feDisplacementMap',
    'feDropShadow',
    'feFlood',
    'feGaussianBlur',
    'feMerge',
    'feMergeNode',
    'feMorphology',
    'feOffset',
    'feSpecularLighting',
    'feTile',
    'feTurbulence',
    'fePointLight',
    'filter',
    'font',
    'foreignObject',
    'g',
    'glyph',
    'glyphRef',
    'hkern',
    'image',
    'line',
    'linearGradient',
    'marker',
    'mask',
    'mpath',
    'path',
    'pattern',
    'polygon',
    'polyline',
    'radialGradient',
    'rect',
    'stop',
    'switch',
    'symbol',
    'text',
    'textPath',
    'title',
    'tref',
    'tspan',
    'video',
    'view',
    'vkern',
    'use',
]);
exports.DISALLOWED_MATHML_TAGS = new Set([
    'script',
    'link',
    'base',
    'object',
    'embed',
    'meta',
]);
exports.ATTRS_PROPS_TRANFORMS = {
    accesskey: 'accessKey',
    readonly: 'readOnly',
    tabindex: 'tabIndex',
    bgcolor: 'bgColor',
    colspan: 'colSpan',
    rowspan: 'rowSpan',
    contenteditable: 'contentEditable',
    crossorigin: 'crossOrigin',
    datetime: 'dateTime',
    formaction: 'formAction',
    ismap: 'isMap',
    maxlength: 'maxLength',
    minlength: 'minLength',
    novalidate: 'noValidate',
    usemap: 'useMap',
    for: 'htmlFor',
    ...shared_1.AriaAttrNameToPropNameMap,
};
exports.DISALLOWED_HTML_TAGS = new Set(['base', 'link', 'meta', 'script', 'title']);
exports.HTML_ATTRIBUTES_REVERSE_LOOKUP = html_element_attributes_1.HTML_ATTRIBUTE_ELEMENT_MAP;
exports.KNOWN_HTML_AND_SVG_ELEMENTS = new Set([...html_elements_1.HTML_ELEMENTS, ...svg_elements_1.SVG_ELEMENTS]);
exports.HTML_TAG = {
    A: 'a',
    AREA: 'area',
    BODY: 'body',
    CAPTION: 'caption',
    COL: 'col',
    COLGROUP: 'colgroup',
    HEAD: 'head',
    HTML: 'html',
    TBODY: 'tbody',
    TD: 'td',
    TFOOT: 'tfoot',
    TH: 'th',
    THEAD: 'thead',
    TR: 'tr',
    USE: 'use',
};
exports.ATTR_NAME = {
    HREF: 'href',
    XLINK_HREF: 'xlink:href',
};
exports.TEMPLATE_DIRECTIVES = [/^key$/, /^lwc:*/, /^if:*/, /^for:*/, /^iterator:*/];
//# sourceMappingURL=constants.js.map