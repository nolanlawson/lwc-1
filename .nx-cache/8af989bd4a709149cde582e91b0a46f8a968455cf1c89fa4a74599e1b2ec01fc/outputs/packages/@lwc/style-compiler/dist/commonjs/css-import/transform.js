"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postcss_value_parser_1 = __importDefault(require("postcss-value-parser"));
const message_1 = require("../utils/message");
function process(root, result, isScoped) {
    root.walkAtRules('import', (node) => {
        if (isScoped) {
            throw node.error(`Invalid import statement, imports are not allowed in *.scoped.css files.`);
        }
        // Ensure @import are at the top of the file
        let prev = node.prev();
        while (prev) {
            if (prev.type === 'comment' || (prev.type === 'atrule' && prev.name === 'import')) {
                prev = prev.prev();
            }
            else {
                throw prev.error('@import must precede all other statements');
            }
        }
        const { nodes: params } = (0, postcss_value_parser_1.default)(node.params);
        // Ensure import match the following syntax:
        //     @import "foo";
        //     @import "./foo.css";
        if (!params.length || params[0].type !== 'string' || !params[0].value) {
            throw node.error(`Invalid import statement, unable to find imported module.`);
        }
        if (params.length > 1) {
            throw node.error(`Invalid import statement, import statement only support a single parameter.`);
        }
        // Add the imported to results messages
        const message = (0, message_1.importMessage)(params[0].value);
        result.messages.push(message);
        // Remove the import from the generated css
        node.remove();
    });
}
exports.default = process;
//# sourceMappingURL=transform.js.map