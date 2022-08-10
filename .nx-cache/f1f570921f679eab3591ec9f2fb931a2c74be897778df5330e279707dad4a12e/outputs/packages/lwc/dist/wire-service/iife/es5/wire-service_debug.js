var WireService = (function (exports) {
    'use strict';

    function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

    function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

    function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

    function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

    function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

    function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

    function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

    function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

    function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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


    var ValueChangedEventType = 'ValueChangedEvent';
    /**
     * Event fired by wire adapters to emit a new value.
     */

    var ValueChangedEvent = /*#__PURE__*/_createClass(function ValueChangedEvent(value) {
      _classCallCheck(this, ValueChangedEvent);

      this.type = ValueChangedEventType;
      this.value = value;
    });
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    var freeze = Object.freeze,
        defineProperty = Object.defineProperty,
        isExtensible = Object.isExtensible; // This value needs to be in sync with wiring.ts from @lwc/engine-core

    var DeprecatedWiredElementHost = '$$DeprecatedWiredElementHostKey$$';
    var DeprecatedWiredParamsMeta = '$$DeprecatedWiredParamsMetaKey$$';
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

      var AdapterClass = /*#__PURE__*/function (_LegacyWireAdapterBri) {
        _inherits(AdapterClass, _LegacyWireAdapterBri);

        var _super = _createSuper(AdapterClass);

        function AdapterClass(dataCallback) {
          var _this;

          _classCallCheck(this, AdapterClass);

          _this = _super.call(this, dataCallback);
          adapterEventTargetCallback(_this.eventTarget);
          return _this;
        }

        return _createClass(AdapterClass);
      }(LegacyWireAdapterBridge);

      freeze(AdapterClass);
      freeze(AdapterClass.prototype);
      defineProperty(adapterId, 'adapter', {
        writable: false,
        configurable: false,
        value: AdapterClass
      });
    }
    /**
     * Registers the wire service. noop
     * @deprecated
     */


    function registerWireService() {}

    var _Array$prototype = Array.prototype,
        forEach = _Array$prototype.forEach,
        ArraySplice = _Array$prototype.splice,
        ArrayIndexOf = _Array$prototype.indexOf; // wire event target life cycle connectedCallback hook event type

    var CONNECT = 'connect'; // wire event target life cycle disconnectedCallback hook event type

    var DISCONNECT = 'disconnect'; // wire event target life cycle config changed hook event type

    var CONFIG = 'config';

    function removeListener(listeners, toRemove) {
      var idx = ArrayIndexOf.call(listeners, toRemove);

      if (idx > -1) {
        ArraySplice.call(listeners, idx, 1);
      }
    }

    function isEmptyConfig(config) {
      return Object.keys(config).length === 0;
    }

    function isValidConfig(config, params) {
      // The config is valid if there is no params, or if exist a param for which config[param] !== undefined.
      return params.length === 0 || params.some(function (param) {
        return !isUndefined(config[param]);
      });
    }

    function isDifferentConfig(newConfig, oldConfig, params) {
      return params.some(function (param) {
        return newConfig[param] !== oldConfig[param];
      });
    }

    var LegacyWireAdapterBridge = /*#__PURE__*/function () {
      function LegacyWireAdapterBridge(callback) {
        var _this2 = this;

        _classCallCheck(this, LegacyWireAdapterBridge);

        this.connecting = [];
        this.disconnecting = [];
        this.configuring = [];
        this.isFirstUpdate = true;
        this.callback = callback;
        this.wiredElementHost = callback[DeprecatedWiredElementHost];
        this.dynamicParamsNames = callback[DeprecatedWiredParamsMeta];
        this.eventTarget = {
          addEventListener: function addEventListener(type, listener) {
            switch (type) {
              case CONNECT:
                {
                  _this2.connecting.push(listener);

                  break;
                }

              case DISCONNECT:
                {
                  _this2.disconnecting.push(listener);

                  break;
                }

              case CONFIG:
                {
                  _this2.configuring.push(listener);

                  if (_this2.currentConfig !== undefined) {
                    listener.call(undefined, _this2.currentConfig);
                  }

                  break;
                }

              default:
                throw new Error("Invalid event type ".concat(type, "."));
            }
          },
          removeEventListener: function removeEventListener(type, listener) {
            switch (type) {
              case CONNECT:
                {
                  removeListener(_this2.connecting, listener);
                  break;
                }

              case DISCONNECT:
                {
                  removeListener(_this2.disconnecting, listener);
                  break;
                }

              case CONFIG:
                {
                  removeListener(_this2.configuring, listener);
                  break;
                }

              default:
                throw new Error("Invalid event type ".concat(type, "."));
            }
          },
          dispatchEvent: function dispatchEvent(evt) {
            if (evt instanceof ValueChangedEvent) {
              var value = evt.value;

              _this2.callback(value);
            } else if (evt.type === 'wirecontextevent') {
              // TODO [#1357]: remove this branch
              return _this2.wiredElementHost.dispatchEvent(evt);
            } else {
              throw new Error("Invalid event type ".concat(evt.type, "."));
            }

            return false; // canceling signal since we don't want this to propagate
          }
        };
      }

      _createClass(LegacyWireAdapterBridge, [{
        key: "update",
        value: function update(config) {
          if (this.isFirstUpdate) {
            // this is a special case for legacy wire adapters: when all the config params are undefined,
            // the config on the wire adapter should not be called until one of them changes.
            this.isFirstUpdate = false;

            if (!isEmptyConfig(config) && !isValidConfig(config, this.dynamicParamsNames)) {
              return;
            }
          }

          if (isUndefined(this.currentConfig) || isDifferentConfig(config, this.currentConfig, this.dynamicParamsNames)) {
            this.currentConfig = config;
            forEach.call(this.configuring, function (listener) {
              listener.call(undefined, config);
            });
          }
        }
      }, {
        key: "connect",
        value: function connect() {
          forEach.call(this.connecting, function (listener) {
            return listener.call(undefined);
          });
        }
      }, {
        key: "disconnect",
        value: function disconnect() {
          forEach.call(this.disconnecting, function (listener) {
            return listener.call(undefined);
          });
        }
      }]);

      return LegacyWireAdapterBridge;
    }();
    /** version: 2.22.0 */

    exports.ValueChangedEvent = ValueChangedEvent;
    exports.register = register;
    exports.registerWireService = registerWireService;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
