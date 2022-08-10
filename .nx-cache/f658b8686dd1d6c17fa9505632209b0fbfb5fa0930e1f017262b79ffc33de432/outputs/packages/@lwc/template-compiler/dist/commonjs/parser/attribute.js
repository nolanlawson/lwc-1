"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParsedAttribute = exports.attributeToPropertyName = exports.isValidHTMLAttribute = exports.isAttribute = exports.isAriaOrDataOrFmkAttribute = exports.isValidTabIndexAttributeValue = exports.isTabIndexAttribute = exports.isProhibitedIsAttribute = exports.attributeName = exports.normalizeAttributeValue = exports.isFragmentOnlyUrl = exports.isSvgUseHref = exports.isAllowedFragOnlyUrlsXHTML = exports.isIdReferencingAttribute = void 0;
const errors_1 = require("@lwc/errors");
const shared_1 = require("@lwc/shared");
const ast_1 = require("../shared/ast");
const utils_1 = require("../shared/utils");
const constants_1 = require("../shared/constants");
const expression_1 = require("./expression");
const constants_2 = require("./constants");
function isQuotedAttribute(rawAttribute) {
    const [, value] = rawAttribute.split('=');
    return value && value.startsWith('"') && value.endsWith('"');
}
function isEscapedAttribute(rawAttribute) {
    const [, value] = rawAttribute.split('=');
    return !value || !(value.includes('{') && value.includes('}'));
}
function isIdReferencingAttribute(attrName) {
    return constants_2.ID_REFERENCING_ATTRIBUTES_SET.has(attrName);
}
exports.isIdReferencingAttribute = isIdReferencingAttribute;
// http://www.w3.org/1999/xhtml namespace idref elements for which we
// allow id references.
function isAllowedFragOnlyUrlsXHTML(tagName, attrName, namespaceURI) {
    const allowed = [constants_2.HTML_TAG.A, constants_2.HTML_TAG.AREA];
    return (attrName === constants_2.ATTR_NAME.HREF && allowed.includes(tagName) && namespaceURI === shared_1.HTML_NAMESPACE);
}
exports.isAllowedFragOnlyUrlsXHTML = isAllowedFragOnlyUrlsXHTML;
// Identifies `href/xlink:href` attributes on `use` elements in the
// http://www.w3.org/2000/svg namespace
function isSvgUseHref(tagName, attrName, namespaceURI) {
    return (
    // xlink:href is a deprecated attribute included for backwards compatibility
    [constants_2.ATTR_NAME.HREF, constants_2.ATTR_NAME.XLINK_HREF].includes(attrName) &&
        tagName === constants_2.HTML_TAG.USE &&
        namespaceURI === shared_1.SVG_NAMESPACE);
}
exports.isSvgUseHref = isSvgUseHref;
function isFragmentOnlyUrl(url) {
    return /^#/.test(url);
}
exports.isFragmentOnlyUrl = isFragmentOnlyUrl;
function normalizeAttributeValue(ctx, raw, tag, attr, location) {
    const { name, value } = attr;
    if ((0, shared_1.isBooleanAttribute)(name, tag)) {
        if (value === 'true') {
            ctx.throwAtLocation(errors_1.ParserDiagnostics.BOOLEAN_ATTRIBUTE_TRUE, location, [
                tag,
                name,
                value,
            ]);
        }
        else if (value === 'false') {
            ctx.throwAtLocation(errors_1.ParserDiagnostics.BOOLEAN_ATTRIBUTE_FALSE, location, [
                tag,
                name,
                value,
            ]);
        }
    }
    const isQuoted = isQuotedAttribute(raw);
    const isEscaped = isEscapedAttribute(raw);
    if (!isEscaped && (0, expression_1.isExpression)(value)) {
        if (isQuoted) {
            // <input value="{myValue}" />
            // -> ambiguity if the attribute value is a template identifier or a string literal.
            const unquoted = raw.replace(/"/g, '');
            const escaped = raw.replace('"{', '"\\{');
            ctx.throwAtLocation(errors_1.ParserDiagnostics.AMBIGUOUS_ATTRIBUTE_VALUE, location, [
                raw,
                unquoted,
                escaped,
            ]);
        }
        // <input value={myValue} />
        // -> Valid identifier.
        return { value, escapedExpression: false };
    }
    else if (!isEscaped && (0, expression_1.isPotentialExpression)(value)) {
        const isExpressionEscaped = value.startsWith(`\\${expression_1.EXPRESSION_SYMBOL_START}`);
        const isExpressionNextToSelfClosing = value.startsWith(expression_1.EXPRESSION_SYMBOL_START) &&
            value.endsWith(`${expression_1.EXPRESSION_SYMBOL_END}/`) &&
            !isQuoted;
        if (isExpressionNextToSelfClosing) {
            // <input value={myValue}/>
            // -> By design the html parser consider the / as the last character of the attribute value.
            //    Make sure to remove strip the trailing / for self closing elements.
            return { value: value.slice(0, -1), escapedExpression: false };
        }
        else if (isExpressionEscaped) {
            // <input value="\{myValue}"/>
            // -> Valid escaped string literal
            return { value: value.slice(1), escapedExpression: true };
        }
        let escaped = raw.replace(/="?/, '="\\');
        escaped += escaped.endsWith('"') ? '' : '"';
        // Throw if the attribute value looks like an expression, but it can't be resolved by the compiler.
        ctx.throwAtLocation(errors_1.ParserDiagnostics.AMBIGUOUS_ATTRIBUTE_VALUE_STRING, location, [
            raw,
            escaped,
        ]);
    }
    // <input value="myValue"/>
    // -> Valid string literal.
    return { value, escapedExpression: false };
}
exports.normalizeAttributeValue = normalizeAttributeValue;
function attributeName(attr) {
    const { prefix, name } = attr;
    return prefix ? `${prefix}:${name}` : name;
}
exports.attributeName = attributeName;
function isProhibitedIsAttribute(attrName) {
    return attrName === 'is';
}
exports.isProhibitedIsAttribute = isProhibitedIsAttribute;
function isTabIndexAttribute(attrName) {
    return attrName === 'tabindex';
}
exports.isTabIndexAttribute = isTabIndexAttribute;
function isValidTabIndexAttributeValue(value) {
    // object means it is a Node representing the expression
    return value === '0' || value === '-1';
}
exports.isValidTabIndexAttributeValue = isValidTabIndexAttributeValue;
function isAriaOrDataOrFmkAttribute(attrName) {
    return (0, shared_1.isAriaAttribute)(attrName) || isFmkAttribute(attrName) || isDataAttribute(attrName);
}
exports.isAriaOrDataOrFmkAttribute = isAriaOrDataOrFmkAttribute;
function isDataAttribute(attrName) {
    return !!attrName.match(constants_2.DATA_RE);
}
function isFmkAttribute(attrName) {
    return attrName === 'key' || attrName === 'slot';
}
function isAttribute(element, attrName) {
    if ((0, ast_1.isComponent)(element)) {
        return (attrName === 'style' ||
            attrName === 'class' ||
            attrName === 'key' ||
            attrName === 'slot' ||
            !!attrName.match(constants_2.DATA_RE));
    }
    // Handle input tag value="" and checked attributes that are only used for state initialization.
    // Because .setAttribute() won't update the value, those attributes should be considered as props.
    if (element.name === 'input' && (attrName === 'value' || attrName === 'checked')) {
        return false;
    }
    // Handle global attrs (common to all tags) and special attribute (role, aria, key, is, data-).
    // Handle general case where only standard element have attribute value.
    return true;
}
exports.isAttribute = isAttribute;
function isValidHTMLAttribute(tagName, attrName) {
    if ((0, shared_1.isGlobalHtmlAttribute)(attrName) ||
        isAriaOrDataOrFmkAttribute(attrName) ||
        isTemplateDirective(attrName) ||
        constants_2.SUPPORTED_SVG_TAGS.has(tagName) ||
        constants_1.DASHED_TAGNAME_ELEMENT_SET.has(tagName) ||
        !constants_2.KNOWN_HTML_AND_SVG_ELEMENTS.has(tagName)) {
        return true;
    }
    const validElements = constants_2.HTML_ATTRIBUTES_REVERSE_LOOKUP[attrName];
    return !!validElements && (!validElements.length || validElements.includes(tagName));
}
exports.isValidHTMLAttribute = isValidHTMLAttribute;
function isTemplateDirective(attrName) {
    return constants_2.TEMPLATE_DIRECTIVES.some((directive) => {
        return directive.test(attrName);
    });
}
/**
 * Convert attribute name from kebab case to camel case property name
 */
function attributeToPropertyName(attrName) {
    return constants_2.ATTRS_PROPS_TRANFORMS[attrName] || (0, utils_1.toPropertyName)(attrName);
}
exports.attributeToPropertyName = attributeToPropertyName;
class ParsedAttribute {
    constructor() {
        this.attributes = new Map();
    }
    append(attr) {
        this.attributes.set(attr.name, attr);
    }
    get(pattern) {
        const key = this.getKey(pattern);
        if (key) {
            return this.attributes.get(key);
        }
    }
    pick(pattern) {
        const attr = this.get(pattern);
        if (attr) {
            this.attributes.delete(attr.name);
        }
        return attr;
    }
    getKey(pattern) {
        let match;
        if (typeof pattern === 'string') {
            match = pattern;
        }
        else {
            match = Array.from(this.attributes.keys()).find((name) => !!name.match(pattern));
        }
        return match;
    }
    getAttributes() {
        return Array.from(this.attributes.values());
    }
}
exports.ParsedAttribute = ParsedAttribute;
//# sourceMappingURL=attribute.js.map