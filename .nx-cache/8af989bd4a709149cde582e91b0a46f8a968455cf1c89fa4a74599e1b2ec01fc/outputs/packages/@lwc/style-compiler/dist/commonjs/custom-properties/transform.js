"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postcss_value_parser_1 = __importDefault(require("postcss-value-parser"));
const message_1 = require("../utils/message");
function process(root, result) {
    root.walkDecls((decl) => {
        const valueRoot = (0, postcss_value_parser_1.default)(decl.value);
        let varFound = false;
        valueRoot.walk(({ type, value }) => {
            if (!varFound && type === 'function' && value === 'var') {
                // Add the imported to results messages
                const message = (0, message_1.varFunctionMessage)(value);
                result.messages.push(message);
                varFound = true;
            }
        });
    });
}
exports.default = process;
//# sourceMappingURL=transform.js.map