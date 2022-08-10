"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVarFunctionMessage = exports.varFunctionMessage = exports.isImportMessage = exports.importMessage = void 0;
const PLUGIN_NAME = '@lwc/style-compiler';
const IMPORT_TYPE = 'import';
const VAR_FUNCTION_TYPE = 'var-function';
function importMessage(id) {
    return {
        plugin: PLUGIN_NAME,
        type: IMPORT_TYPE,
        id,
    };
}
exports.importMessage = importMessage;
function isImportMessage(message) {
    return message.type === IMPORT_TYPE && message.id;
}
exports.isImportMessage = isImportMessage;
function varFunctionMessage(original) {
    return {
        plugin: PLUGIN_NAME,
        type: VAR_FUNCTION_TYPE,
        original,
    };
}
exports.varFunctionMessage = varFunctionMessage;
function isVarFunctionMessage(message) {
    return message.type === VAR_FUNCTION_TYPE && message.original;
}
exports.isVarFunctionMessage = isVarFunctionMessage;
//# sourceMappingURL=message.js.map