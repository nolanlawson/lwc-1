"use strict";
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
class State {
    constructor(config) {
        var _a;
        this.config = config;
        this.crElmToConfigMap = config.customRendererConfig
            ? Object.fromEntries(config.customRendererConfig.elements.map((element) => {
                const { tagName, attributes, namespace } = element;
                return [tagName, { namespace, attributes: new Set(attributes) }];
            }))
            : {};
        this.crDirectives = new Set((_a = config.customRendererConfig) === null || _a === void 0 ? void 0 : _a.directives);
        this.crCheckedElements = new Map();
    }
}
exports.default = State;
//# sourceMappingURL=state.js.map