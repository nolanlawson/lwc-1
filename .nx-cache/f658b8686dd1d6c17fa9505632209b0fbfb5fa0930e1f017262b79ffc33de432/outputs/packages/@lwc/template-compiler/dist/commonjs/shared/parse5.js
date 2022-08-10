"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplateContent = exports.isTextNode = exports.isCommentNode = exports.isElementNode = void 0;
function isElementNode(node) {
    return 'tagName' in node;
}
exports.isElementNode = isElementNode;
function isCommentNode(node) {
    return node.nodeName === '#comment';
}
exports.isCommentNode = isCommentNode;
function isTextNode(node) {
    return node.nodeName === '#text';
}
exports.isTextNode = isTextNode;
function getTemplateContent(templateElement) {
    return templateElement.content;
}
exports.getTemplateContent = getTemplateContent;
//# sourceMappingURL=parse5.js.map