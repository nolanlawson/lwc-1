"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comment = exports.program = exports.exportDefaultDeclaration = exports.importSpecifier = exports.importDefaultSpecifier = exports.importDeclaration = exports.variableDeclaration = exports.variableDeclarator = exports.returnStatement = exports.blockStatement = exports.functionDeclaration = exports.functionExpression = exports.templateLiteral = exports.taggedTemplateExpression = exports.expressionStatement = exports.arrayExpression = exports.objectPattern = exports.objectExpression = exports.assignmentProperty = exports.property = exports.assignmentExpression = exports.logicalExpression = exports.binaryExpression = exports.unaryExpression = exports.conditionalExpression = exports.literal = exports.callExpression = exports.memberExpression = exports.isLiteral = exports.identifier = exports.isProperty = exports.isObjectExpression = exports.isArrayExpression = exports.isMemberExpression = exports.isIdentifier = void 0;
function isIdentifier(node) {
    return node.type === 'Identifier';
}
exports.isIdentifier = isIdentifier;
function isMemberExpression(node) {
    return node.type === 'MemberExpression';
}
exports.isMemberExpression = isMemberExpression;
function isArrayExpression(node) {
    return node.type === 'ArrayExpression';
}
exports.isArrayExpression = isArrayExpression;
function isObjectExpression(node) {
    return node.type === 'ObjectExpression';
}
exports.isObjectExpression = isObjectExpression;
function isProperty(node) {
    return node.type === 'Property';
}
exports.isProperty = isProperty;
function identifier(name, config) {
    return {
        type: 'Identifier',
        name,
        ...config,
    };
}
exports.identifier = identifier;
function isLiteral(node) {
    return node.type === 'Literal';
}
exports.isLiteral = isLiteral;
function memberExpression(object, property, config) {
    return {
        type: 'MemberExpression',
        object,
        property,
        computed: false,
        optional: false,
        ...config,
    };
}
exports.memberExpression = memberExpression;
function callExpression(callee, args, config) {
    return {
        type: 'CallExpression',
        callee,
        arguments: args,
        optional: false,
        ...config,
    };
}
exports.callExpression = callExpression;
function literal(value, config) {
    return {
        type: 'Literal',
        value,
        ...config,
    };
}
exports.literal = literal;
function conditionalExpression(test, consequent, alternate, config) {
    return {
        type: 'ConditionalExpression',
        test,
        consequent,
        alternate,
        ...config,
    };
}
exports.conditionalExpression = conditionalExpression;
function unaryExpression(operator, argument, config) {
    return {
        type: 'UnaryExpression',
        argument,
        operator,
        prefix: true,
        ...config,
    };
}
exports.unaryExpression = unaryExpression;
function binaryExpression(operator, left, right, config) {
    return {
        type: 'BinaryExpression',
        left,
        operator,
        right,
        ...config,
    };
}
exports.binaryExpression = binaryExpression;
function logicalExpression(operator, left, right, config) {
    return {
        type: 'LogicalExpression',
        operator,
        left,
        right,
        ...config,
    };
}
exports.logicalExpression = logicalExpression;
function assignmentExpression(operator, left, right, config) {
    return {
        type: 'AssignmentExpression',
        operator,
        left,
        right,
        ...config,
    };
}
exports.assignmentExpression = assignmentExpression;
function property(key, value, config) {
    return {
        type: 'Property',
        key,
        value,
        kind: 'init',
        computed: false,
        method: false,
        shorthand: false,
        ...config,
    };
}
exports.property = property;
function assignmentProperty(key, value, config) {
    return {
        type: 'Property',
        key,
        value,
        kind: 'init',
        computed: false,
        method: false,
        shorthand: false,
        ...config,
    };
}
exports.assignmentProperty = assignmentProperty;
function objectExpression(properties, config) {
    return {
        type: 'ObjectExpression',
        properties,
        ...config,
    };
}
exports.objectExpression = objectExpression;
function objectPattern(properties, config) {
    return {
        type: 'ObjectPattern',
        properties,
        ...config,
    };
}
exports.objectPattern = objectPattern;
function arrayExpression(elements, config) {
    return {
        type: 'ArrayExpression',
        elements,
        ...config,
    };
}
exports.arrayExpression = arrayExpression;
function expressionStatement(expression, config) {
    return {
        type: 'ExpressionStatement',
        expression,
        ...config,
    };
}
exports.expressionStatement = expressionStatement;
function taggedTemplateExpression(tag, quasi) {
    return {
        type: 'TaggedTemplateExpression',
        tag,
        quasi,
    };
}
exports.taggedTemplateExpression = taggedTemplateExpression;
function templateLiteral(quasis, expressions) {
    return {
        type: 'TemplateLiteral',
        quasis,
        expressions,
    };
}
exports.templateLiteral = templateLiteral;
function functionExpression(id, params, body, config) {
    return {
        type: 'FunctionExpression',
        id,
        params,
        body,
        ...config,
    };
}
exports.functionExpression = functionExpression;
function functionDeclaration(id, params, body, config) {
    return {
        type: 'FunctionDeclaration',
        id,
        params,
        body,
        ...config,
    };
}
exports.functionDeclaration = functionDeclaration;
function blockStatement(body, config) {
    return {
        type: 'BlockStatement',
        body,
        ...config,
    };
}
exports.blockStatement = blockStatement;
function returnStatement(argument, config) {
    return {
        type: 'ReturnStatement',
        argument,
        ...config,
    };
}
exports.returnStatement = returnStatement;
function variableDeclarator(id, init, config) {
    return {
        type: 'VariableDeclarator',
        id,
        init,
        ...config,
    };
}
exports.variableDeclarator = variableDeclarator;
function variableDeclaration(kind, declarations, config) {
    return {
        type: 'VariableDeclaration',
        kind,
        declarations,
        ...config,
    };
}
exports.variableDeclaration = variableDeclaration;
function importDeclaration(specifiers, source, config) {
    return {
        type: 'ImportDeclaration',
        specifiers,
        source,
        ...config,
    };
}
exports.importDeclaration = importDeclaration;
function importDefaultSpecifier(local, config) {
    return {
        type: 'ImportDefaultSpecifier',
        local,
        ...config,
    };
}
exports.importDefaultSpecifier = importDefaultSpecifier;
function importSpecifier(imported, local, config) {
    return {
        type: 'ImportSpecifier',
        imported,
        local,
        ...config,
    };
}
exports.importSpecifier = importSpecifier;
function exportDefaultDeclaration(declaration, config) {
    return {
        type: 'ExportDefaultDeclaration',
        declaration,
        ...config,
    };
}
exports.exportDefaultDeclaration = exportDefaultDeclaration;
function program(body, config) {
    return {
        type: 'Program',
        sourceType: 'module',
        body,
        ...config,
    };
}
exports.program = program;
function comment(content) {
    return {
        type: 'Block',
        value: content,
    };
}
exports.comment = comment;
//# sourceMappingURL=estree.js.map