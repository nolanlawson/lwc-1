"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postcss_selector_parser_1 = __importDefault(require("postcss-selector-parser"));
const validate_1 = __importDefault(require("./no-id-selectors/validate"));
const transform_1 = __importDefault(require("./css-import/transform"));
const transform_2 = __importDefault(require("./selector-scoping/transform"));
const transform_3 = __importDefault(require("./custom-properties/transform"));
const transform_4 = __importDefault(require("./dir-pseudo-class/transform"));
const transform_5 = __importDefault(require("./scope-at-rules/transform"));
function shouldTransformSelector(rule) {
    var _a;
    // @keyframe at-rules are special, rules inside are not standard selectors and should not be
    // scoped like any other rules.
    return ((_a = rule.parent) === null || _a === void 0 ? void 0 : _a.type) !== 'atrule' || rule.parent.name !== 'keyframes';
}
function selectorProcessorFactory(transformConfig) {
    return (0, postcss_selector_parser_1.default)((root) => {
        (0, validate_1.default)(root);
        (0, transform_2.default)(root, transformConfig);
        (0, transform_4.default)(root);
    });
}
function postCssLwcPlugin(options) {
    // We need 2 types of selectors processors, since transforming the :host selector make the selector
    // unusable when used in the context of the native shadow and vice-versa.
    const nativeShadowSelectorProcessor = selectorProcessorFactory({
        transformHost: false,
    });
    const fakeShadowSelectorProcessor = selectorProcessorFactory({
        transformHost: true,
    });
    return (root, result) => {
        (0, transform_1.default)(root, result, options.scoped);
        (0, transform_3.default)(root, result);
        (0, transform_5.default)(root);
        root.walkRules((rule) => {
            if (!shouldTransformSelector(rule)) {
                return;
            }
            // Let transform the selector with the 2 processors.
            const fakeShadowSelector = fakeShadowSelectorProcessor.processSync(rule);
            const nativeShadowSelector = nativeShadowSelectorProcessor.processSync(rule);
            rule.selector = fakeShadowSelector;
            // If the resulting selector are different it means that the selector use the :host selector. In
            // this case we need to duplicate the CSS rule and assign the other selector.
            if (fakeShadowSelector !== nativeShadowSelector) {
                // The cloned selector is inserted before the currently processed selector to avoid processing
                // again the cloned selector.
                const currentRule = rule;
                const clonedRule = rule.cloneBefore();
                clonedRule.selector = nativeShadowSelector;
                // Safe a reference to each other
                clonedRule._isHostNative = true;
                currentRule._isFakeNative = true;
            }
        });
    };
}
exports.default = postCssLwcPlugin;
//# sourceMappingURL=postcss-lwc-plugin.js.map