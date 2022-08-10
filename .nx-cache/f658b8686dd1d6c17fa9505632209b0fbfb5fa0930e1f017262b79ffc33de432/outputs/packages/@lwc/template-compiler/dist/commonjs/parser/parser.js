"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const errors_1 = require("@lwc/errors");
const ast_1 = require("../shared/ast");
const types_1 = require("../shared/types");
function normalizeLocation(location) {
    let line = 0;
    let column = 0;
    let length = 0;
    let start = 0;
    if (location) {
        line = location.startLine;
        column = location.startColumn;
        length = location.end - location.start;
        start = location.start;
    }
    return { line, column, start, length };
}
class ParserCtx {
    constructor(source, config) {
        this.warnings = [];
        this.seenIds = new Set();
        this.seenSlots = new Set();
        /**
         * Scopes keep track of the hierarchy of ParentNodes as the parser traverses the parse5 AST.
         * Each scope is represented by an array where each node in the array correspond to either
         * a ForEach, ForOf, If, Element, Component, or Slot.
         *
         * Currently, each scope has a hierarchy of ForBlock > IfBlock > Element | Component | Slot.
         * Note: Not all scopes will have all three, but when they do, they will appear in this order.
         * We do not keep track of template nodes.
         *
         * Each scope corresponds to the original parse5.Element node.
         */
        this.scopes = [];
        this.source = source;
        this.config = config;
        this.renderMode = types_1.LWCDirectiveRenderMode.shadow;
        this.preserveComments = config.preserveHtmlComments;
    }
    getSource(start, end) {
        return this.source.slice(start, end);
    }
    setRootDirective(root) {
        var _a, _b, _c;
        this.renderMode =
            (_b = (_a = root.directives.find(ast_1.isRenderModeDirective)) === null || _a === void 0 ? void 0 : _a.value.value) !== null && _b !== void 0 ? _b : this.renderMode;
        this.preserveComments =
            ((_c = root.directives.find(ast_1.isPreserveCommentsDirective)) === null || _c === void 0 ? void 0 : _c.value.value) || this.preserveComments;
    }
    /**
     * This method flattens the scopes into a single array for traversal.
     */
    *ancestors(element) {
        const ancestors = [].concat(...this.scopes);
        const start = element ? ancestors.indexOf(element) : ancestors.length - 1;
        for (let i = start; i >= 0; i--) {
            yield { current: ancestors[i], parent: ancestors[i - 1] };
        }
    }
    /**
     * This method returns an iterator over ancestor nodes, starting at the parent and ending at the root node.
     *
     * Note: There are instances when we want to terminate the traversal early, such as searching for a ForBlock parent.
     *
     * @param {ParentNode} startNode - Starting node to begin search, defaults to the tail of the current scope.
     * @param {function} predicate - This callback is called once for each ancestor until it finds one where predicate returns true.
     * @param {function} traversalCond - This callback is called after predicate and will terminate the traversal if it returns false.
     * traversalCond is ignored if no value is provided.
     */
    findAncestor(predicate, traversalCond = () => true, startNode) {
        for (const { current, parent } of this.ancestors(startNode)) {
            if (predicate(current)) {
                return current;
            }
            if (!traversalCond({ current, parent })) {
                break;
            }
        }
        return null;
    }
    /**
     * This method searchs the current scope and returns the value that satisfies the predicate.
     *
     * @param {function} predicate - This callback is called once for each sibling in the current scope
     * until it finds one where predicate returns true.
     */
    findSibling(predicate) {
        const currentScope = this.currentScope() || [];
        const sibling = currentScope.find(predicate);
        return sibling || null;
    }
    beginScope() {
        this.scopes.push([]);
    }
    endScope() {
        this.scopes.pop();
    }
    addNodeCurrentScope(node) {
        const currentScope = this.currentScope();
        /* istanbul ignore if */
        if (!currentScope) {
            throw new Error("Can't invoke addNodeCurrentScope if there is no current scope");
        }
        currentScope.push(node);
    }
    currentScope() {
        return this.scopes[this.scopes.length - 1];
    }
    /**
     * This method recovers from diagnostic errors that are encountered when fn is invoked.
     * All other errors are considered compiler errors and can not be recovered from.
     *
     * @param fn - method to be invoked.
     */
    withErrorRecovery(fn) {
        try {
            return fn();
        }
        catch (error) {
            /* istanbul ignore else */
            if (error instanceof errors_1.CompilerError) {
                // Diagnostic error
                this.addDiagnostic(error.toDiagnostic());
            }
            else {
                // Compiler error
                throw error;
            }
        }
    }
    withErrorWrapping(fn, errorInfo, location, msgFormatter) {
        try {
            return fn();
        }
        catch (error) {
            if (msgFormatter) {
                error.message = msgFormatter(error);
            }
            this.throwOnError(errorInfo, error, location);
        }
    }
    throwOnError(errorInfo, error, location) {
        const diagnostic = (0, errors_1.normalizeToDiagnostic)(errorInfo, error, {
            location: normalizeLocation(location),
        });
        throw errors_1.CompilerError.from(diagnostic);
    }
    /**
     * This method throws a diagnostic error with the node's location.
     */
    throwOnNode(errorInfo, node, messageArgs) {
        this.throw(errorInfo, messageArgs, node.location);
    }
    /**
     * This method throws a diagnostic error with location information.
     */
    throwAtLocation(errorInfo, location, messageArgs) {
        this.throw(errorInfo, messageArgs, location);
    }
    /**
     * This method throws a diagnostic error and will immediately exit the current routine.
     */
    throw(errorInfo, messageArgs, location) {
        throw (0, errors_1.generateCompilerError)(errorInfo, {
            messageArgs,
            origin: {
                location: normalizeLocation(location),
            },
        });
    }
    /**
     * This method logs a diagnostic warning with the node's location.
     */
    warnOnNode(errorInfo, node, messageArgs) {
        this.warn(errorInfo, messageArgs, node.location);
    }
    /**
     * This method logs a diagnostic warning with location information.
     */
    warnAtLocation(errorInfo, location, messageArgs) {
        this.warn(errorInfo, messageArgs, location);
    }
    /**
     * This method logs a diagnostic warning and will continue execution of the current routine.
     */
    warn(errorInfo, messageArgs, location) {
        this.addDiagnostic((0, errors_1.generateCompilerDiagnostic)(errorInfo, {
            messageArgs,
            origin: {
                location: normalizeLocation(location),
            },
        }));
    }
    addDiagnostic(diagnostic) {
        this.warnings.push(diagnostic);
    }
}
exports.default = ParserCtx;
//# sourceMappingURL=parser.js.map