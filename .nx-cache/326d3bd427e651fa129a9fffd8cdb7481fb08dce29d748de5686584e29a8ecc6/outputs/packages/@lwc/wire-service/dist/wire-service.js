/**
 * Copyright (C) 2018 salesforce.com, inc.
 */
/**
 * Copyright (C) 2018 salesforce.com, inc.
 */
function isUndefined(obj) {
    return obj === undefined;
}
/** version: 2.22.0 */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const ValueChangedEventType = 'ValueChangedEvent';
/**
 * Event fired by wire adapters to emit a new value.
 */
class ValueChangedEvent {
    constructor(value) {
        this.type = ValueChangedEventType;
        this.value = value;
    }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const { freeze, defineProperty, isExtensible } = Object;
// This value needs to be in sync with wiring.ts from @lwc/engine-core
const DeprecatedWiredElementHost = '$$DeprecatedWiredElementHostKey$$';
const DeprecatedWiredParamsMeta = '$$DeprecatedWiredParamsMetaKey$$';
/**
 * Registers a wire adapter factory for Lightning Platform.
 * @deprecated
 */
function register(adapterId, adapterEventTargetCallback) {
    if (adapterId == null || !isExtensible(adapterId)) {
        throw new TypeError('adapter id must be extensible');
    }
    if (typeof adapterEventTargetCallback !== 'function') {
        throw new TypeError('adapter factory must be a callable');
    }
    if ('adapter' in adapterId) {
        throw new TypeError('adapter id is already associated to an adapter factory');
    }
    const AdapterClass = class extends LegacyWireAdapterBridge {
        constructor(dataCallback) {
            super(dataCallback);
            adapterEventTargetCallback(this.eventTarget);
        }
    };
    freeze(AdapterClass);
    freeze(AdapterClass.prototype);
    defineProperty(adapterId, 'adapter', {
        writable: false,
        configurable: false,
        value: AdapterClass,
    });
}
/**
 * Registers the wire service. noop
 * @deprecated
 */
function registerWireService() { }
const { forEach, splice: ArraySplice, indexOf: ArrayIndexOf } = Array.prototype;
// wire event target life cycle connectedCallback hook event type
const CONNECT = 'connect';
// wire event target life cycle disconnectedCallback hook event type
const DISCONNECT = 'disconnect';
// wire event target life cycle config changed hook event type
const CONFIG = 'config';
function removeListener(listeners, toRemove) {
    const idx = ArrayIndexOf.call(listeners, toRemove);
    if (idx > -1) {
        ArraySplice.call(listeners, idx, 1);
    }
}
function isEmptyConfig(config) {
    return Object.keys(config).length === 0;
}
function isValidConfig(config, params) {
    // The config is valid if there is no params, or if exist a param for which config[param] !== undefined.
    return params.length === 0 || params.some((param) => !isUndefined(config[param]));
}
function isDifferentConfig(newConfig, oldConfig, params) {
    return params.some((param) => newConfig[param] !== oldConfig[param]);
}
class LegacyWireAdapterBridge {
    constructor(callback) {
        this.connecting = [];
        this.disconnecting = [];
        this.configuring = [];
        this.isFirstUpdate = true;
        this.callback = callback;
        this.wiredElementHost = callback[DeprecatedWiredElementHost];
        this.dynamicParamsNames = callback[DeprecatedWiredParamsMeta];
        this.eventTarget = {
            addEventListener: (type, listener) => {
                switch (type) {
                    case CONNECT: {
                        this.connecting.push(listener);
                        break;
                    }
                    case DISCONNECT: {
                        this.disconnecting.push(listener);
                        break;
                    }
                    case CONFIG: {
                        this.configuring.push(listener);
                        if (this.currentConfig !== undefined) {
                            listener.call(undefined, this.currentConfig);
                        }
                        break;
                    }
                    default:
                        throw new Error(`Invalid event type ${type}.`);
                }
            },
            removeEventListener: (type, listener) => {
                switch (type) {
                    case CONNECT: {
                        removeListener(this.connecting, listener);
                        break;
                    }
                    case DISCONNECT: {
                        removeListener(this.disconnecting, listener);
                        break;
                    }
                    case CONFIG: {
                        removeListener(this.configuring, listener);
                        break;
                    }
                    default:
                        throw new Error(`Invalid event type ${type}.`);
                }
            },
            dispatchEvent: (evt) => {
                if (evt instanceof ValueChangedEvent) {
                    const value = evt.value;
                    this.callback(value);
                }
                else if (evt.type === 'wirecontextevent') {
                    // TODO [#1357]: remove this branch
                    return this.wiredElementHost.dispatchEvent(evt);
                }
                else {
                    throw new Error(`Invalid event type ${evt.type}.`);
                }
                return false; // canceling signal since we don't want this to propagate
            },
        };
    }
    update(config) {
        if (this.isFirstUpdate) {
            // this is a special case for legacy wire adapters: when all the config params are undefined,
            // the config on the wire adapter should not be called until one of them changes.
            this.isFirstUpdate = false;
            if (!isEmptyConfig(config) && !isValidConfig(config, this.dynamicParamsNames)) {
                return;
            }
        }
        if (isUndefined(this.currentConfig) ||
            isDifferentConfig(config, this.currentConfig, this.dynamicParamsNames)) {
            this.currentConfig = config;
            forEach.call(this.configuring, (listener) => {
                listener.call(undefined, config);
            });
        }
    }
    connect() {
        forEach.call(this.connecting, (listener) => listener.call(undefined));
    }
    disconnect() {
        forEach.call(this.disconnecting, (listener) => listener.call(undefined));
    }
}

export { ValueChangedEvent, register, registerWireService };
/** version: 2.22.0 */
