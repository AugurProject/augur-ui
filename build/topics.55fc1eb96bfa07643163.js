webpackJsonp([1],{

/***/ 1471:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_topics_view__ = __webpack_require__(1747);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_selectors_login_account__ = __webpack_require__(738);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__selectors_topics__ = __webpack_require__(1750);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_get_value__ = __webpack_require__(52);









var mapStateToProps = function mapStateToProps(state) {
  return {
    branch: state.branch,
    topics: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__selectors_topics__["a" /* selectTopics */])(state),
    loginAccount: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__auth_selectors_login_account__["a" /* selectLoginAccount */])(state),
    isLogged: !!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_get_value__["a" /* default */])(state, 'loginAccount.address')
  };
};

var Topics = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["b" /* withRouter */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react_redux__["b" /* connect */])(mapStateToProps)(__WEBPACK_IMPORTED_MODULE_2__components_topics_view__["a" /* default */]));

/* harmony default export */ __webpack_exports__["default"] = (Topics);

/***/ }),

/***/ 1473:
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),

/***/ 1474:
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),

/***/ 1475:
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(1522)
  , defined = __webpack_require__(1499);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),

/***/ 1476:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_bignumber_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_bignumber_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_bignumber_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_debounce__ = __webpack_require__(92);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var Input = function (_Component) {
  _inherits(Input, _Component);

  function Input(props) {
    _classCallCheck(this, Input);

    var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

    _this.handleOnChange = function (e) {
      var newValue = e.target.value;

      _this.props.onChange(newValue);
      _this.setState({ value: newValue });
    };

    _this.handleOnBlur = function () {
      _this.props.onChange(_this.state.value);
      _this.props.onBlur && _this.props.onBlur();
    };

    _this.handleClear = function () {
      _this.setState({ value: '' });
      _this.props.onChange('');
    };

    _this.handleToggleVisibility = function () {
      _this.setState({ isHiddenContentVisible: !_this.state.isHiddenContentVisible });
    };

    _this.timeoutVisibleHiddenContent = function () {
      _this.setState({ isHiddenContentVisible: false });
    };

    _this.state = {
      value: _this.props.value || '',
      timeoutID: '',
      isHiddenContentVisible: false
    };

    _this.handleOnChange = _this.handleOnChange.bind(_this);
    _this.handleOnBlur = _this.handleOnBlur.bind(_this);
    _this.handleClear = _this.handleClear.bind(_this);
    _this.handleToggleVisibility = _this.handleToggleVisibility.bind(_this);
    _this.timeoutVisibleHiddenContent = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_debounce__["a" /* default */])(_this.timeoutVisibleHiddenContent.bind(_this), 1200);
    return _this;
  }
  // TODO -- Prop Validations


  _createClass(Input, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.value !== nextProps.value) {
        this.setState({ value: nextProps.value });
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (nextProps.canToggleVisibility && !nextState.value && nextState.isHiddenContentVisible) {
        this.setState({ isHiddenContentVisible: false });
      }

      if (this.state.isHiddenContentVisible !== nextState.isHiddenContentVisible && nextState.isHiddenContentVisible) {
        this.timeoutVisibleHiddenContent();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          debounceMS = _props.debounceMS,
          isClearable = _props.isClearable,
          isIncrementable = _props.isIncrementable,
          incrementAmount = _props.incrementAmount,
          updateValue = _props.updateValue,
          canToggleVisibility = _props.canToggleVisibility,
          shouldMatchValue = _props.shouldMatchValue,
          comparisonValue = _props.comparisonValue,
          isSearch = _props.isSearch,
          min = _props.min,
          max = _props.max,
          p = _objectWithoutProperties(_props, ['debounceMS', 'isClearable', 'isIncrementable', 'incrementAmount', 'updateValue', 'canToggleVisibility', 'shouldMatchValue', 'comparisonValue', 'isSearch', 'min', 'max']); // eslint-disable-line no-unused-vars


      var s = this.state;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('input', p.className, { 'is-incrementable': isIncrementable, 'can-toggle-visibility': canToggleVisibility }) },
        isSearch && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-search' }),
        !p.isMultiline && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', _extends({}, p, {
          className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('box', p.className, { 'search-input': p.isSearch }),
          type: p.type === 'password' && s.isHiddenContentVisible ? 'text' : p.type,
          value: s.value,
          onChange: this.handleOnChange,
          onBlur: this.handleOnBlur
        })),
        p.isMultiline && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('textarea', _extends({}, p, {
          className: 'box',
          value: s.value,
          onChange: this.handleOnChange,
          onBlur: this.handleOnBlur
        })),
        isClearable && !p.isMultiline && !!s.value && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'button',
          {
            type: 'button',
            className: 'button-text-only',
            onClick: this.handleClear
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-close' })
        ),
        canToggleVisibility && s.value && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'button',
          {
            type: 'button',
            className: 'button-text-only',
            onClick: this.handleToggleVisibility,
            tabIndex: '-1'
          },
          s.isHiddenContentVisible ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-eye-slash' }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-eye' })
        ),
        shouldMatchValue && s.value && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'input-value-comparison' },
          s.value === comparisonValue ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-check-circle input-does-match' }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-times-circle input-does-not-match' })
        ),
        isIncrementable && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'value-incrementers' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'button',
            {
              type: 'button',
              tabIndex: '-1',
              className: 'increment-value unstyled',
              onClick: function onClick(e) {
                e.currentTarget.blur();

                if (!isNaN(parseFloat(s.value)) && isFinite(s.value) || !s.value) {
                  var bnMax = sanitizeBound(max);
                  var bnMin = sanitizeBound(min);

                  var newValue = new __WEBPACK_IMPORTED_MODULE_3_bignumber_js___default.a(s.value || 0);

                  if (bnMax !== null && newValue.greaterThan(bnMax)) {
                    newValue = bnMax;
                  } else if (bnMin !== null && newValue.lessThan(bnMin)) {
                    newValue = bnMin.plus(new __WEBPACK_IMPORTED_MODULE_3_bignumber_js___default.a(incrementAmount));
                  } else {
                    newValue = newValue.plus(new __WEBPACK_IMPORTED_MODULE_3_bignumber_js___default.a(incrementAmount));
                    if (bnMax !== null && newValue.greaterThan(bnMax)) {
                      newValue = bnMax;
                    }
                  }

                  updateValue(newValue);
                }
              }
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-angle-up' })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'button',
            {
              type: 'button',
              tabIndex: '-1',
              className: 'decrement-value unstyled',
              onClick: function onClick(e) {
                e.currentTarget.blur();

                if (!isNaN(parseFloat(s.value)) && isFinite(s.value) || !s.value) {
                  var bnMax = sanitizeBound(max);
                  var bnMin = sanitizeBound(min);

                  var newValue = new __WEBPACK_IMPORTED_MODULE_3_bignumber_js___default.a(s.value || 0);

                  if (bnMax !== null && newValue.greaterThan(bnMax)) {
                    newValue = bnMax.minus(new __WEBPACK_IMPORTED_MODULE_3_bignumber_js___default.a(incrementAmount));
                  } else if (bnMin !== null && newValue.lessThan(bnMin)) {
                    newValue = bnMin;
                  } else {
                    newValue = newValue.minus(new __WEBPACK_IMPORTED_MODULE_3_bignumber_js___default.a(incrementAmount));
                    if (bnMin !== null && newValue.lessThan(bnMin)) {
                      newValue = bnMin;
                    }
                  }

                  updateValue(newValue);
                }
              }
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-angle-down' })
          )
        )
      );
    }
  }]);

  return Input;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

Input.propTypes = {
  type: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  // className: PropTypes.string,
  value: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any,
  max: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any,
  min: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any,
  // isMultiline: PropTypes.bool,
  isClearable: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  debounceMS: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  onChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  updateValue: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onBlur: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  isIncrementable: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  incrementAmount: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  canToggleVisibility: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  shouldMatchValue: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  comparisonValue: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  isSearch: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
};
/* harmony default export */ __webpack_exports__["a"] = (Input);


function sanitizeBound(value) {
  if (value == null) {
    return null;
  } else if (!(value instanceof __WEBPACK_IMPORTED_MODULE_3_bignumber_js___default.a)) {
    return new __WEBPACK_IMPORTED_MODULE_3_bignumber_js___default.a(value);
  }

  return value;
}

/***/ }),

/***/ 1477:
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(1481)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),

/***/ 1478:
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(1474)
  , core      = __webpack_require__(1473)
  , ctx       = __webpack_require__(1519)
  , hide      = __webpack_require__(1482)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),

/***/ 1479:
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),

/***/ 1480:
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(1484)
  , IE8_DOM_DEFINE = __webpack_require__(1521)
  , toPrimitive    = __webpack_require__(1511)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(1477) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),

/***/ 1481:
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),

/***/ 1482:
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(1480)
  , createDesc = __webpack_require__(1489);
module.exports = __webpack_require__(1477) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),

/***/ 1483:
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(1508)('wks')
  , uid        = __webpack_require__(1490)
  , Symbol     = __webpack_require__(1474).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),

/***/ 1484:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1485);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),

/***/ 1485:
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),

/***/ 1486:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(1526)
  , enumBugKeys = __webpack_require__(1500);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),

/***/ 1488:
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),

/***/ 1489:
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),

/***/ 1490:
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),

/***/ 1495:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),

/***/ 1496:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(1552);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),

/***/ 1497:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(1555);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(1551);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(1517);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),

/***/ 1498:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(1517);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),

/***/ 1499:
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),

/***/ 1500:
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),

/***/ 1501:
/***/ (function(module, exports) {

module.exports = {};

/***/ }),

/***/ 1502:
/***/ (function(module, exports) {

module.exports = true;

/***/ }),

/***/ 1503:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(1484)
  , dPs         = __webpack_require__(1578)
  , enumBugKeys = __webpack_require__(1500)
  , IE_PROTO    = __webpack_require__(1507)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(1520)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(1571).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ 1504:
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(1488)
  , createDesc     = __webpack_require__(1489)
  , toIObject      = __webpack_require__(1475)
  , toPrimitive    = __webpack_require__(1511)
  , has            = __webpack_require__(1479)
  , IE8_DOM_DEFINE = __webpack_require__(1521)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(1477) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),

/***/ 1505:
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),

/***/ 1506:
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(1480).f
  , has = __webpack_require__(1479)
  , TAG = __webpack_require__(1483)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),

/***/ 1507:
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(1508)('keys')
  , uid    = __webpack_require__(1490);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),

/***/ 1508:
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1474)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),

/***/ 1509:
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),

/***/ 1510:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(1499);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),

/***/ 1511:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(1485);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),

/***/ 1512:
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(1474)
  , core           = __webpack_require__(1473)
  , LIBRARY        = __webpack_require__(1502)
  , wksExt         = __webpack_require__(1513)
  , defineProperty = __webpack_require__(1480).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),

/***/ 1513:
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(1483);

/***/ }),

/***/ 1514:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);



var Dropdown = function Dropdown(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'dropdown' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'select',
      {
        onChange: function onChange(event) {
          p.onChange(event.target.value);
        },
        defaultValue: p.default
      },
      p.options.map(function (option) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'option',
          {
            key: option.value,
            value: option.value
          },
          option.label
        );
      })
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-angle-down' })
  );
};

Dropdown.propTypes = {
  onChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  default: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  options: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (Dropdown);

/***/ }),

/***/ 1515:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(1550);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),

/***/ 1516:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

/***/ }),

/***/ 1517:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(1557);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(1556);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),

/***/ 1518:
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),

/***/ 1519:
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(1567);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),

/***/ 1520:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1485)
  , document = __webpack_require__(1474).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),

/***/ 1521:
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(1477) && !__webpack_require__(1481)(function(){
  return Object.defineProperty(__webpack_require__(1520)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),

/***/ 1522:
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(1518);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),

/***/ 1523:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(1502)
  , $export        = __webpack_require__(1478)
  , redefine       = __webpack_require__(1528)
  , hide           = __webpack_require__(1482)
  , has            = __webpack_require__(1479)
  , Iterators      = __webpack_require__(1501)
  , $iterCreate    = __webpack_require__(1573)
  , setToStringTag = __webpack_require__(1506)
  , getPrototypeOf = __webpack_require__(1525)
  , ITERATOR       = __webpack_require__(1483)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),

/***/ 1524:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(1526)
  , hiddenKeys = __webpack_require__(1500).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),

/***/ 1525:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(1479)
  , toObject    = __webpack_require__(1510)
  , IE_PROTO    = __webpack_require__(1507)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),

/***/ 1526:
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(1479)
  , toIObject    = __webpack_require__(1475)
  , arrayIndexOf = __webpack_require__(1569)(false)
  , IE_PROTO     = __webpack_require__(1507)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),

/***/ 1527:
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(1478)
  , core    = __webpack_require__(1473)
  , fails   = __webpack_require__(1481);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),

/***/ 1528:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1482);

/***/ }),

/***/ 1529:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(1498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_get__ = __webpack_require__(1558);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(1497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);





var enhancer = function enhancer(WrappedComponent) {
  return function (_WrappedComponent) {
    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Progress, _WrappedComponent);

    function Progress() {
      __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Progress);

      return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Progress.__proto__ || Object.getPrototypeOf(Progress)).apply(this, arguments));
    }

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Progress, [{
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        var now = Date.now();
        this.path.style.transitionDuration = '0.3s, 0.3s';
        if (this.prevTimeStamp && now - this.prevTimeStamp < 100) {
          this.path.style.transitionDuration = '0s, 0s';
        }
        this.prevTimeStamp = Date.now();
      }
    }, {
      key: 'render',
      value: function render() {
        return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_get___default()(Progress.prototype.__proto__ || Object.getPrototypeOf(Progress.prototype), 'render', this).call(this);
      }
    }]);

    return Progress;
  }(WrappedComponent);
};

/* harmony default export */ __webpack_exports__["a"] = (enhancer);

/***/ }),

/***/ 1530:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return defaultProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return propTypes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);


var defaultProps = {
  className: '',
  percent: 0,
  prefixCls: 'rc-progress',
  strokeColor: '#2db7f5',
  strokeLinecap: 'round',
  strokeWidth: 1,
  style: {},
  trailColor: '#D9D9D9',
  trailWidth: 1
};

var propTypes = {
  className: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  percent: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.number, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string]),
  prefixCls: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  strokeColor: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  strokeLinecap: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOf(['butt', 'round', 'square']),
  strokeWidth: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.number, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string]),
  style: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.object,
  trailColor: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  trailWidth: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.number, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string])
};

/***/ }),

/***/ 1532:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_filter_sort_view__ = __webpack_require__(1542);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_get_value__ = __webpack_require__(52);







var mapStateToProps = function mapStateToProps(state) {
  return {
    currentReportingPeriod: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_get_value__["a" /* default */])(state, 'branch.currentReportingWindowAddress')
  };
};

var FilterSort = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["b" /* withRouter */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react_redux__["b" /* connect */])(mapStateToProps)(__WEBPACK_IMPORTED_MODULE_2__components_filter_sort_view__["a" /* default */]));

/* harmony default export */ __webpack_exports__["a"] = (FilterSort);

/***/ }),

/***/ 1537:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_tooltip__ = __webpack_require__(730);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rc_progress__ = __webpack_require__(1600);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_components_bullet__ = __webpack_require__(1538);







var Branch = function Branch(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'article',
    { className: 'branch-info' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_rc_progress__["a" /* Line */], {
      percent: p.currentReportingPeriodPercentComplete,
      strokeWidth: '1',
      strokeColor: '#5c2634'
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'span',
      { className: 'reporting-cycle-info' },
      'Reporting Period ',
      p.currentReportingWindowAddress,
      ' ',
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__common_components_bullet__["a" /* default */], null),
      ' ',
      Math.round(p.currentReportingPeriodPercentComplete),
      '% complete ',
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__common_components_bullet__["a" /* default */], null),
      ' period ends ',
      p.reportingCycleTimeRemaining
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'span',
      {
        'data-tip': true,
        'data-for': 'branch-id-tooltip',
        'data-event': 'click focus',
        className: 'branch-description pointer'
      },
      p.description,
      ' ',
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__common_components_bullet__["a" /* default */], null),
      ' ',
      p.reportingPeriodDurationInSeconds / 3600,
      ' hours per period'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_2_react_tooltip___default.a,
      {
        id: 'branch-id-tooltip',
        type: 'light',
        effect: 'float',
        place: 'top',
        globalEventOff: 'click'
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        { className: 'tooltip-text' },
        'Branch ID: ',
        p.id
      )
    )
  );
};

Branch.propTypes = {
  className: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  description: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  reportingPeriodDurationInSeconds: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  reportingCycleTimeRemaining: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  currentReportingPeriodPercentComplete: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number
};

/* harmony default export */ __webpack_exports__["a"] = (Branch);

/***/ }),

/***/ 1538:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


var Bullet = function Bullet() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'span',
    null,
    '\xB7'
  );
};

/* harmony default export */ __webpack_exports__["a"] = (Bullet);

/***/ }),

/***/ 1539:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_helpers_parse_query__ = __webpack_require__(727);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_helpers_make_query__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_constants_param_names__ = __webpack_require__(523);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var Paginator = function (_Component) {
  _inherits(Paginator, _Component);

  function Paginator(props) {
    _classCallCheck(this, Paginator);

    var _this = _possibleConstructorReturn(this, (Paginator.__proto__ || Object.getPrototypeOf(Paginator)).call(this, props));

    _this.state = {
      currentPage: null,
      lastPage: null,
      lowerBound: null,
      upperBound: null,
      backQuery: null,
      forwardQuery: null,
      totalItems: null
    };

    _this.setCurrentSegment = _this.setCurrentSegment.bind(_this);
    return _this;
  }

  _createClass(Paginator, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setCurrentSegment({
        lastPage: this.state.currentPage,
        lastLowerBound: this.state.lowerBound,
        lastUpperBound: this.state.upperBound,
        itemsLength: this.props.itemsLength,
        itemsPerPage: this.props.itemsPerPage,
        location: this.props.location,
        history: this.props.history,
        setSegment: this.props.setSegment
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.itemsLength !== nextProps.itemsLength || this.props.itemsPerPage !== nextProps.itemsPerPage || this.props.location !== nextProps.location) {
        this.setCurrentSegment({
          lastPage: this.state.currentPage,
          lastLowerBound: this.state.lowerBound,
          lastUpperBound: this.state.upperBound,
          itemsLength: nextProps.itemsLength,
          itemsPerPage: nextProps.itemsPerPage,
          location: nextProps.location,
          history: nextProps.history,
          setSegment: nextProps.setSegment
        });
      }
    }
  }, {
    key: 'setCurrentSegment',
    value: function setCurrentSegment(options) {
      if (!options.itemsLength) return options.setSegment([]);

      var currentPage = parseInt(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__app_helpers_parse_query__["a" /* default */])(options.location.search)[__WEBPACK_IMPORTED_MODULE_5__app_constants_param_names__["h" /* PAGINATION_PARAM_NAME */]] || 1, 10);
      var lastPage = Math.ceil(options.itemsLength / options.itemsPerPage);

      // Pagination Direction
      // NOTE --  By deriving pagination direction, we can accomodate pages of results with varying length
      //          Example: First page has a 'hero' row of results
      //  -1 === Moving Down
      //  0 === No Movement
      //  1 === Moving Up
      var direction = void 0;
      if (options.lastPage === currentPage || options.lastPage == null) {
        direction = 0;
      } else if (options.lastPage < currentPage) {
        direction = 1;
      } else {
        direction = -1;
      }

      //  Segment Bounds (Blech, first round reasoning through)
      //  NOTE -- Bounds are one based
      //          Bounds are established thusly to accomodate deep linking + asymetric page lengths
      //    Rough Bounds Establishment
      //      Lower Bound
      var lowerBound = void 0;
      // If no last, do a simple check against itemsPerPage
      if (options.lastLowerBound === null) {
        if (currentPage === 1) {
          lowerBound = 1;
        } else {
          lowerBound = (currentPage - 1) * options.itemsPerPage + 1;
        }
        // If last, derive from previous bounds
      } else if (currentPage === 1) {
        lowerBound = 1;
      } else if (direction === 0) {
        lowerBound = options.lastLowerBound;
      } else if (direction === 1) {
        lowerBound = options.lastUpperBound + 1;
      } else {
        lowerBound = options.lastLowerBound - options.itemsPerPage;
      }

      // In case page is out of bounds, redirect
      if (currentPage !== 1 && lowerBound > options.itemsLength) {
        var updatedSearch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__app_helpers_parse_query__["a" /* default */])(options.location.search);
        delete updatedSearch[__WEBPACK_IMPORTED_MODULE_5__app_constants_param_names__["h" /* PAGINATION_PARAM_NAME */]];
        updatedSearch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__app_helpers_make_query__["a" /* default */])(updatedSearch);

        options.history.replace(_extends({}, options.location, {
          search: updatedSearch
        }));
        return;
      }

      //      Upper Bound
      var upperBound = void 0;
      // If no last, do a simple check against itemsPerPage
      if (options.lastUpperBound === null) {
        if (options.itemsLength < options.itemsPerPage || currentPage * options.itemsPerPage > options.itemsLength) {
          upperBound = options.itemsLength;
        } else {
          upperBound = currentPage * options.itemsPerPage;
        }
        // If last, derive from previous bounds
      } else if (options.itemsLength < options.itemsPerPage || currentPage * options.itemsPerPage > options.itemsLength) {
        upperBound = options.itemsLength;
      } else if (direction === 0) {
        upperBound = options.lastUpperBound;
      } else if (direction === 1) {
        upperBound = options.lastUpperBound + options.itemsPerPage;
      } else {
        upperBound = options.lastLowerBound - 1;
      }

      //    Precise Bounds Establishment (refinment of bounds)
      //      Lower Bound
      if (lowerBound <= 0) lowerBound = 1;
      //      Upper Bound
      if (upperBound - lowerBound !== options.itemsPerPage) {
        upperBound = lowerBound - 1 + options.itemsPerPage;
      }
      if (upperBound > options.itemsLength) {
        upperBound = options.itemsLength;
      }

      //  Link Query Params
      //    Back
      var backQuery = void 0;
      if (currentPage === 1 || currentPage - 1 === 1) {
        var queryParams = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__app_helpers_parse_query__["a" /* default */])(options.location.search);
        delete queryParams[__WEBPACK_IMPORTED_MODULE_5__app_constants_param_names__["h" /* PAGINATION_PARAM_NAME */]];
        backQuery = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__app_helpers_make_query__["a" /* default */])(queryParams);
      } else {
        var _queryParams = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__app_helpers_parse_query__["a" /* default */])(options.location.search);
        _queryParams[__WEBPACK_IMPORTED_MODULE_5__app_constants_param_names__["h" /* PAGINATION_PARAM_NAME */]] = currentPage - 1;
        backQuery = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__app_helpers_make_query__["a" /* default */])(_queryParams);
      }
      //    Forward
      var forwardQuery = void 0;
      if (currentPage * options.itemsPerPage >= totalItems) {
        var _queryParams2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__app_helpers_parse_query__["a" /* default */])(options.location.search);
        _queryParams2[__WEBPACK_IMPORTED_MODULE_5__app_constants_param_names__["h" /* PAGINATION_PARAM_NAME */]] = currentPage;
        forwardQuery = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__app_helpers_make_query__["a" /* default */])(_queryParams2);
      } else {
        var _queryParams3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__app_helpers_parse_query__["a" /* default */])(options.location.search);
        _queryParams3[__WEBPACK_IMPORTED_MODULE_5__app_constants_param_names__["h" /* PAGINATION_PARAM_NAME */]] = currentPage + 1;
        forwardQuery = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__app_helpers_make_query__["a" /* default */])(_queryParams3);
      }

      var totalItems = options.itemsLength;
      var boundedLength = upperBound - lowerBound + 1;

      this.setState({
        currentPage: currentPage,
        lowerBound: lowerBound,
        upperBound: upperBound,
        backQuery: backQuery,
        forwardQuery: forwardQuery,
        totalItems: totalItems,
        lastPage: lastPage
      });

      options.setSegment(lowerBound, upperBound, boundedLength);
    }
  }, {
    key: 'render',
    value: function render() {
      var p = this.props;
      var s = this.state;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'article',
        { className: 'paginator' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'paginator-controls' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'paginator-back' },
            s.currentPage !== 1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["c" /* Link */],
              {
                className: 'button',
                to: _extends({}, p.location, {
                  search: s.backQuery
                })
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-angle-left' })
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'paginator-location' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              s.lowerBound,
              !!s.upperBound && s.upperBound > 1 && ' - ' + s.upperBound,
              ' ',
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'strong',
                null,
                'of'
              ),
              ' ',
              s.totalItems
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'paginator-forward' },
            s.currentPage !== s.lastPage && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["c" /* Link */],
              {
                className: 'button',
                to: _extends({}, p.location, {
                  search: s.forwardQuery
                })
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-angle-right' })
            )
          )
        )
      );
    }
  }]);

  return Paginator;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

Paginator.propTypes = {
  itemsLength: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
  itemsPerPage: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  setSegment: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};


/* harmony default export */ __webpack_exports__["a"] = (Paginator);

/***/ }),

/***/ 1540:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_components_dropdown__ = __webpack_require__(1514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_helpers_parse_query__ = __webpack_require__(727);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_helpers_make_query__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_is_market_data_open__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash_isEqual__ = __webpack_require__(729);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash_isEqual___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_lodash_isEqual__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_constants_param_names__ = __webpack_require__(523);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }













var FilterMarketState = function (_Component) {
  _inherits(FilterMarketState, _Component);

  function FilterMarketState(props) {
    _classCallCheck(this, FilterMarketState);

    var _this = _possibleConstructorReturn(this, (FilterMarketState.__proto__ || Object.getPrototypeOf(FilterMarketState)).call(this, props));

    _this.marketStateOptions = [{
      label: 'Open',
      value: 'open'
    }, {
      label: 'Reporting',
      value: 'reporting'
    }, {
      label: 'Closed',
      value: 'closed'
    }];

    _this.defaultMarketState = _this.marketStateOptions[0].value;

    _this.state = {
      selectedMarketState: _this.defaultMarketState
    };

    _this.filterByMarketState = _this.filterByMarketState.bind(_this);
    _this.updateQuery = _this.updateQuery.bind(_this);
    return _this;
  }

  _createClass(FilterMarketState, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var selectedMarketState = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__app_helpers_parse_query__["a" /* default */])(this.props.location.search)[__WEBPACK_IMPORTED_MODULE_7__app_constants_param_names__["g" /* FILTER_MARKET_STATE_PARAM */]];
      if (selectedMarketState) this.setState({ selectedMarketState: selectedMarketState });
      this.filterByMarketState(selectedMarketState || this.state.selectedMarketState, this.props.currentReportingPeriod, this.props.items, this.props.location);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (this.state.selectedMarketState !== nextState.selectedMarketState || !__WEBPACK_IMPORTED_MODULE_6_lodash_isEqual___default()(this.props.items, nextProps.items)) {
        this.filterByMarketState(nextState.selectedMarketState, nextProps.currentReportingPeriod, nextProps.items, nextProps.location);
      }

      if (this.state.selectedMarketState !== nextState.selectedMarketState) {
        this.updateQuery(nextState.selectedMarketState, nextProps.location);
      }
    }
  }, {
    key: 'filterByMarketState',
    value: function filterByMarketState(selectedMarketState, currentReportingPeriod, items, location) {
      var matchedItems = items.reduce(function (p, market, i) {
        switch (selectedMarketState) {
          case 'open':
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_is_market_data_open__["a" /* isMarketDataOpen */])(market)) return [].concat(_toConsumableArray(p), [i]);
            break;
          case 'reporting':
            if (market.tradingPeriod === currentReportingPeriod) return [].concat(_toConsumableArray(p), [i]);
            break;
          case 'closed':
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_is_market_data_open__["a" /* isMarketDataOpen */])(market)) return [].concat(_toConsumableArray(p), [i]);
            break;
          default:
            return p;
        }

        return p;
      }, []);

      this.props.updateFilter(matchedItems);
    }
  }, {
    key: 'updateQuery',
    value: function updateQuery(selectedMarketState, location) {
      var updatedSearch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__app_helpers_parse_query__["a" /* default */])(location.search);

      if (selectedMarketState === this.defaultMarketState) {
        delete updatedSearch[__WEBPACK_IMPORTED_MODULE_7__app_constants_param_names__["g" /* FILTER_MARKET_STATE_PARAM */]];
      } else {
        updatedSearch[__WEBPACK_IMPORTED_MODULE_7__app_constants_param_names__["g" /* FILTER_MARKET_STATE_PARAM */]] = selectedMarketState;
      }

      updatedSearch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__app_helpers_make_query__["a" /* default */])(updatedSearch);

      this.props.history.push(_extends({}, location, {
        search: updatedSearch
      }));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'article',
        { className: 'filter-market-state' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__common_components_dropdown__["a" /* default */], {
          'default': this.state.selectedMarketState,
          options: this.marketStateOptions,
          onChange: function onChange(selectedMarketState) {
            return _this2.setState({ selectedMarketState: selectedMarketState });
          }
        })
      );
    }
  }]);

  return FilterMarketState;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

FilterMarketState.propTypes = {
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  items: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired,
  currentReportingPeriod: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
  updateFilter: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["a"] = (FilterMarketState);

/***/ }),

/***/ 1541:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_components_input__ = __webpack_require__(1476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_helpers_parse_query__ = __webpack_require__(727);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_helpers_make_query__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_helpers_parse_string_to_array__ = __webpack_require__(734);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_debounce__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_get_value__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lodash_isEqual__ = __webpack_require__(729);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lodash_isEqual___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_lodash_isEqual__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_constants_param_names__ = __webpack_require__(523);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }














// NOTE --  Currently the searchKeys can accomodate target's of type string and array

var FilterSearch = function (_Component) {
  _inherits(FilterSearch, _Component);

  function FilterSearch(props) {
    _classCallCheck(this, FilterSearch);

    var _this = _possibleConstructorReturn(this, (FilterSearch.__proto__ || Object.getPrototypeOf(FilterSearch)).call(this, props));

    _this.state = {
      search: ''
    };

    _this.onChangeSearch = _this.onChangeSearch.bind(_this);
    _this.debouncedOnChangeSearch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_debounce__["a" /* default */])(_this.onChangeSearch.bind(_this));
    _this.filterBySearch = _this.filterBySearch.bind(_this);
    return _this;
  }

  _createClass(FilterSearch, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var search = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__app_helpers_parse_query__["a" /* default */])(this.props.location.search)[__WEBPACK_IMPORTED_MODULE_9__app_constants_param_names__["d" /* FILTER_SEARCH_PARAM */]];
      this.onChangeSearch(search, this.props.items);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!__WEBPACK_IMPORTED_MODULE_8_lodash_isEqual___default()(this.props.items, nextProps.items)) this.onChangeSearch(this.state.search, nextProps.items);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (this.state.search !== nextState.search) this.updateQuery(nextState.search, nextProps.location);
    }
  }, {
    key: 'onChangeSearch',
    value: function onChangeSearch(search, items, debounce) {
      this.setState({ search: search });

      if (debounce) return this.debouncedOnChangeSearch(search, items);

      if (search && search.length && items && items.length) {
        this.filterBySearch(search, items);
      } else {
        this.props.updateFilter(null);
      }
    }
  }, {
    key: 'filterBySearch',
    value: function filterBySearch(search, items) {
      var _this2 = this;

      // If ANY match is found, the item is included in the returned array
      var searchArray = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__app_helpers_parse_string_to_array__["a" /* default */])(decodeURIComponent(search));

      var checkStringMatch = function checkStringMatch(value, search) {
        return value.toLowerCase().indexOf(search) !== -1;
      };

      var checkArrayMatch = function checkArrayMatch(item, keys, search) {
        // Accomodates n-1 key's value of either array or object && final key's value of type string or array
        var parentValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_get_value__["a" /* default */])(item, keys.reduce(function (p, key, i) {
          return i + 1 !== keys.length ? '' + p + (i !== 0 ? '.' : '') + key : p;
        }, '')); // eslint-disable-line no-confusing-arrow

        if (parentValue === null) return false;

        if (Array.isArray(parentValue) && parentValue.length) {
          return parentValue.some(function (value) {
            return (value[keys[keys.length - 1]] || '').toLowerCase().indexOf(search) !== -1;
          });
        } else if ((typeof parentValue === 'undefined' ? 'undefined' : _typeof(parentValue)) === 'object' && Object.keys(parentValue).length) {
          return (parentValue[keys[keys.length - 1]] || '').toLowerCase().indexOf(search) !== -1;
        }

        return false; // Just in case
      };

      var matchedItems = items.reduce(function (p, item, i) {
        var matchedSearch = searchArray.some(function (search) {
          return _this2.props.keys.some(function (key) {
            if (typeof key === 'string') return checkStringMatch(item[key] || '', search);

            return checkArrayMatch(item, key, search);
          });
        });

        if (matchedSearch) {
          return [].concat(_toConsumableArray(p), [i]);
        }

        return p;
      }, []);

      this.props.updateFilter(matchedItems);
    }
  }, {
    key: 'updateQuery',
    value: function updateQuery(search, location) {
      var updatedSearch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__app_helpers_parse_query__["a" /* default */])(location.search);

      if (search === '') {
        delete updatedSearch[__WEBPACK_IMPORTED_MODULE_9__app_constants_param_names__["d" /* FILTER_SEARCH_PARAM */]];
      } else {
        updatedSearch[__WEBPACK_IMPORTED_MODULE_9__app_constants_param_names__["d" /* FILTER_SEARCH_PARAM */]] = search;
      }

      updatedSearch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__app_helpers_make_query__["a" /* default */])(updatedSearch);

      this.props.history.push(_extends({}, location, {
        search: updatedSearch
      }));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var p = this.props;
      var s = this.state;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'article',
        { className: 'filter-search' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__common_components_input__["a" /* default */], {
          isSearch: true,
          isClearable: true,
          placeholder: p.searchPlaceholder || 'Search',
          value: s.search,
          onChange: function onChange(value) {
            return _this3.onChangeSearch(value, p.items, true);
          }
        })
      );
    }
  }]);

  return FilterSearch;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

FilterSearch.propTypes = {
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  items: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired, // Raw items to filter against, assumes array of objects
  keys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired, // Keys w/in each item's object to apply filter
  updateFilter: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  searchPlaceholder: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
};
/* harmony default export */ __webpack_exports__["a"] = (FilterSearch);

/***/ }),

/***/ 1542:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_isEqual__ = __webpack_require__(729);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_isEqual___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash_isEqual__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__filter_market_state__ = __webpack_require__(1540);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sort_market_param__ = __webpack_require__(1543);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__filter_search__ = __webpack_require__(1541);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__helpers_filter_by_market_favorites__ = __webpack_require__(1544);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__helpers_filter_by_tags__ = __webpack_require__(1545);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }












var FilterSortView = function (_Component) {
  _inherits(FilterSortView, _Component);

  function FilterSortView(props) {
    _classCallCheck(this, FilterSortView);

    var _this = _possibleConstructorReturn(this, (FilterSortView.__proto__ || Object.getPrototypeOf(FilterSortView)).call(this, props));

    _this.state = {
      // Filters
      searchItems: null,
      marketStateItems: null,
      marketTagItems: null,
      marketFavoriteItems: null,
      // Sorts
      marketParamItems: null,
      // Aggregated
      combinedFiltered: null
    };
    return _this;
  }

  _createClass(FilterSortView, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.updateFilteredItems(this.props.items.map(function (_, i) {
        return i;
      })); // Initialize List

      this.updateCombinedFilters({
        filters: {
          searchItems: this.state.searchItems,
          marketStateItems: this.state.marketStateItems,
          marketTagItems: this.state.marketTagItems,
          marketFavoriteItems: this.state.marketFavoriteItems
        },
        items: this.props.items
      });

      if (this.props.filterByTags) this.setState({ marketTagItems: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__helpers_filter_by_tags__["a" /* default */])(this.props.location, this.props.items) });
      if (this.props.filterByMarketFavorites) this.setState({ marketFavoriteItems: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__helpers_filter_by_market_favorites__["a" /* default */])(this.props.items) });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.filterByTags && (!__WEBPACK_IMPORTED_MODULE_2_lodash_isEqual___default()(this.props.items, nextProps.items) || !__WEBPACK_IMPORTED_MODULE_2_lodash_isEqual___default()(this.props.location.search, nextProps.location.search))) {
        this.setState({ marketTagItems: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__helpers_filter_by_tags__["a" /* default */])(nextProps.location, nextProps.items) });
      }

      if (nextProps.filterByMarketFavorites && (!__WEBPACK_IMPORTED_MODULE_2_lodash_isEqual___default()(this.props.items, nextProps.items) || !__WEBPACK_IMPORTED_MODULE_2_lodash_isEqual___default()(this.props.location.search, nextProps.location.search))) {
        this.setState({ marketFavoriteItems: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__helpers_filter_by_market_favorites__["a" /* default */])(nextProps.items) });
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (!__WEBPACK_IMPORTED_MODULE_2_lodash_isEqual___default()(this.state.searchItems, nextState.searchItems) || !__WEBPACK_IMPORTED_MODULE_2_lodash_isEqual___default()(this.state.marketStateItems, nextState.marketStateItems) || !__WEBPACK_IMPORTED_MODULE_2_lodash_isEqual___default()(this.state.marketTagItems, nextState.marketTagItems) || !__WEBPACK_IMPORTED_MODULE_2_lodash_isEqual___default()(this.state.marketFavoriteItems, nextState.marketFavoriteItems) || !__WEBPACK_IMPORTED_MODULE_2_lodash_isEqual___default()(this.props.items, nextProps.items)) {
        this.updateCombinedFilters({
          filters: {
            searchItems: nextState.searchItems,
            marketStateItems: nextState.marketStateItems,
            marketTagItems: nextState.marketTagItems,
            marketFavoriteItems: nextState.marketFavoriteItems
          },
          items: nextProps.items
        });
      }

      if (!__WEBPACK_IMPORTED_MODULE_2_lodash_isEqual___default()(this.state.marketParamItems, nextState.marketParamItems) || !__WEBPACK_IMPORTED_MODULE_2_lodash_isEqual___default()(this.state.combinedFiltered, nextState.combinedFiltered)) {
        this.updateSortedFiltered({
          sorts: {
            marketParamItems: nextState.marketParamItems
          },
          combinedFiltered: nextState.combinedFiltered
        });
      }
    }
  }, {
    key: 'updateCombinedFilters',
    value: function updateCombinedFilters(options) {
      var combinedFiltered = Object.keys(options.filters).reduce(function (p, filterType) {
        if (p.length === 0 || options.filters[filterType] !== null && options.filters[filterType].length === 0) return [];
        if (options.filters[filterType] === null) return p;

        return options.filters[filterType].filter(function (item) {
          return p.includes(item);
        });
      }, options.items.map(function (_, i) {
        return i;
      }));

      this.setState({ combinedFiltered: combinedFiltered });
    }
  }, {
    key: 'updateSortedFiltered',
    value: function updateSortedFiltered(options) {
      // If we want to accomodate more than one sorting mechanism across a filtered list, we'll need to re-architect things a bit
      this.props.updateFilteredItems(options.sorts.marketParamItems !== null ? options.sorts.marketParamItems : options.combinedFiltered);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var p = this.props;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'article',
        { className: 'view-header filter-sort' },
        (!!p.filterByMarketState && !!p.currentReportingPeriod || !!p.sortByMarketParam) && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'view-header-group' },
          !!p.filterByMarketState && !!p.currentReportingPeriod && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__filter_market_state__["a" /* default */], {
            location: p.location,
            history: p.history,
            items: p.items,
            currentReportingPeriod: p.currentReportingPeriod,
            updateFilter: function updateFilter(marketStateItems) {
              return _this2.setState({ marketStateItems: marketStateItems });
            }
          }),
          !!p.sortByMarketParam && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__sort_market_param__["a" /* default */], {
            location: p.location,
            history: p.history,
            items: p.items,
            combinedFiltered: this.state.combinedFiltered,
            updateSort: function updateSort(marketParamItems) {
              return _this2.setState({ marketParamItems: marketParamItems });
            }
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'view-header-group' },
          !!p.filterBySearch && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__filter_search__["a" /* default */], {
            location: p.location,
            history: p.history,
            items: p.items,
            keys: p.searchKeys,
            searchPlaceholder: p.searchPlaceholder,
            updateFilter: function updateFilter(searchItems) {
              return _this2.setState({ searchItems: searchItems });
            }
          })
        )
      );
    }
  }]);

  return FilterSortView;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

FilterSortView.propTypes = {
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  items: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired,
  updateFilteredItems: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  currentReportingPeriod: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  //  Optional Filters + Sorts
  filterByTags: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  filterByMarketFavorites: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  filterByMarketState: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  sortByMarketParam: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  searchPlaceholder: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  searchKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array,
  filterBySearch: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
};
/* harmony default export */ __webpack_exports__["a"] = (FilterSortView);

/***/ }),

/***/ 1543:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_components_dropdown__ = __webpack_require__(1514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_helpers_parse_query__ = __webpack_require__(727);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_helpers_make_query__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_get_value__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash_isEqual__ = __webpack_require__(729);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash_isEqual___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_lodash_isEqual__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_constants_param_names__ = __webpack_require__(523);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }













var SortMarketParam = function (_Component) {
  _inherits(SortMarketParam, _Component);

  function SortMarketParam(props) {
    _classCallCheck(this, SortMarketParam);

    var _this = _possibleConstructorReturn(this, (SortMarketParam.__proto__ || Object.getPrototypeOf(SortMarketParam)).call(this, props));

    _this.defaultMarketParam = 'volume';
    _this.defaultSort = true; // true = descending, false = ascending

    _this.marketSortParams = [{
      label: 'Volume',
      value: 'volume'
    }, {
      label: 'Newest',
      value: 'creationTime'
    }, {
      label: 'Expiration',
      value: 'endDate'
    }, {
      label: 'Settlement Fee',
      value: 'settlementFeePercent'
    }];

    _this.state = {
      selectedMarketParam: _this.defaultMarketParam,
      selectedSort: _this.defaultSort
    };
    return _this;
  }

  _createClass(SortMarketParam, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var queryParams = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__app_helpers_parse_query__["a" /* default */])(this.props.location.search);

      var selectedMarketParam = queryParams[__WEBPACK_IMPORTED_MODULE_7__app_constants_param_names__["e" /* SORT_MARKET_PARAM */]];
      if (selectedMarketParam) this.setState({ selectedMarketParam: selectedMarketParam });

      var selectedSort = queryParams[__WEBPACK_IMPORTED_MODULE_7__app_constants_param_names__["f" /* SORT_MARKET_ORDER_PARAM */]];
      if (selectedSort) this.setState({ selectedSort: selectedSort !== 'false' });
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      // call respective methods
      if (this.state.selectedMarketParam !== nextState.selectedMarketParam || this.state.selectedSort !== nextState.selectedSort || !__WEBPACK_IMPORTED_MODULE_6_lodash_isEqual___default()(this.props.items, nextProps.items) || !__WEBPACK_IMPORTED_MODULE_6_lodash_isEqual___default()(this.props.combinedFiltered, nextProps.combinedFiltered)) {
        this.sortByMarketParam(nextState.selectedMarketParam, nextState.selectedSort, nextProps.items, nextProps.combinedFiltered, nextProps.location);
      }

      if (this.state.selectedMarketParam !== nextState.selectedMarketParam || this.state.selectedSort !== nextState.selectedSort) {
        this.updateQuery(nextState.selectedMarketParam, nextState.selectedSort, nextProps.location);
      }
    }
  }, {
    key: 'sortByMarketParam',
    value: function sortByMarketParam(selectedMarketParam, selectedSort, items, combinedFiltered, location) {
      var sortedItems = combinedFiltered.slice().sort(function (a, b) {
        switch (selectedMarketParam) {
          case 'creationTime':
          case 'endDate':
            {
              if (selectedSort) {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_get_value__["a" /* default */])(items, b + '.' + selectedMarketParam + '.timestamp') - __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_get_value__["a" /* default */])(items, a + '.' + selectedMarketParam + '.timestamp');
              }

              return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_get_value__["a" /* default */])(items, a + '.' + selectedMarketParam + '.timestamp') - __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_get_value__["a" /* default */])(items, b + '.' + selectedMarketParam + '.timestamp');
            }
          case 'volume':
          case 'settlementFeePercent':
          case 'makerFeePercent':
            {
              if (selectedSort) {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_get_value__["a" /* default */])(items, b + '.' + selectedMarketParam + '.value') - __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_get_value__["a" /* default */])(items, a + '.' + selectedMarketParam + '.value');
              }

              return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_get_value__["a" /* default */])(items, a + '.' + selectedMarketParam + '.value') - __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_get_value__["a" /* default */])(items, b + '.' + selectedMarketParam + '.value');
            }
          default:
            return 0; // No sorting
        }
      });

      this.props.updateSort(sortedItems);
    }
  }, {
    key: 'updateQuery',
    value: function updateQuery(selectedMarketParam, selectedSort, location) {
      var updatedSearch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__app_helpers_parse_query__["a" /* default */])(location.search);

      if (selectedMarketParam === this.defaultMarketParam) {
        delete updatedSearch[__WEBPACK_IMPORTED_MODULE_7__app_constants_param_names__["e" /* SORT_MARKET_PARAM */]];
      } else {
        updatedSearch[__WEBPACK_IMPORTED_MODULE_7__app_constants_param_names__["e" /* SORT_MARKET_PARAM */]] = selectedMarketParam;
      }

      if (selectedSort === this.defaultSort) {
        delete updatedSearch[__WEBPACK_IMPORTED_MODULE_7__app_constants_param_names__["f" /* SORT_MARKET_ORDER_PARAM */]];
      } else {
        updatedSearch[__WEBPACK_IMPORTED_MODULE_7__app_constants_param_names__["f" /* SORT_MARKET_ORDER_PARAM */]] = selectedSort;
      }

      updatedSearch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__app_helpers_make_query__["a" /* default */])(updatedSearch);

      this.props.history.push(_extends({}, location, {
        search: updatedSearch
      }));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var s = this.state;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'article',
        { className: 'market-sort-param companion-fields' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__common_components_dropdown__["a" /* default */], {
          className: 'companion-field',
          'default': s.selectedMarketParam,
          options: this.marketSortParams,
          onChange: function onChange(selectedMarketParam) {
            return _this2.setState({ selectedMarketParam: selectedMarketParam });
          }
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'button',
          {
            className: 'unstyled',
            onClick: function onClick() {
              return _this2.setState({ selectedSort: !s.selectedSort });
            }
          },
          s.selectedSort ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-sort-amount-desc' }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-sort-amount-asc' })
        )
      );
    }
  }]);

  return SortMarketParam;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

SortMarketParam.propTypes = {
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  items: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired,
  combinedFiltered: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired,
  updateSort: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["a"] = (SortMarketParam);

/***/ }),

/***/ 1544:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = filterByMarketFavorites;
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function filterByMarketFavorites(items) {
  if (items == null || !items.length) return null;

  return items.reduce(function (p, item, i) {
    if (item.isFavorite) return [].concat(_toConsumableArray(p), [i]);
    return p;
  }, []);
}

/***/ }),

/***/ 1545:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = filterByTags;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_helpers_parse_query__ = __webpack_require__(727);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_helpers_parse_string_to_array__ = __webpack_require__(734);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_constants_param_names__ = __webpack_require__(523);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }






function filterByTags(location, items) {
  // NOTE -- tag filtering is case sensitive

  var selectedTags = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__app_helpers_parse_query__["a" /* default */])(location.search)[__WEBPACK_IMPORTED_MODULE_2__app_constants_param_names__["a" /* TAGS_PARAM_NAME */]];

  if (selectedTags == null || !selectedTags.length) return null;

  var tagsArray = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__app_helpers_parse_string_to_array__["a" /* default */])(decodeURIComponent(selectedTags), '+');

  var filteredItems = items.reduce(function (p, item, i) {
    if (tagsArray.every(function (filterTag) {
      return item.tags.some(function (tag) {
        return tag.indexOf(filterTag) !== -1;
      });
    })) return [].concat(_toConsumableArray(p), [i]);

    return p;
  }, []);

  return filteredItems;
}

/***/ }),

/***/ 1550:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(1559), __esModule: true };

/***/ }),

/***/ 1551:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(1560), __esModule: true };

/***/ }),

/***/ 1552:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(1561), __esModule: true };

/***/ }),

/***/ 1553:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(1562), __esModule: true };

/***/ }),

/***/ 1554:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(1563), __esModule: true };

/***/ }),

/***/ 1555:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(1564), __esModule: true };

/***/ }),

/***/ 1556:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(1565), __esModule: true };

/***/ }),

/***/ 1557:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(1566), __esModule: true };

/***/ }),

/***/ 1558:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _getPrototypeOf = __webpack_require__(1554);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = __webpack_require__(1553);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

/***/ }),

/***/ 1559:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1585);
module.exports = __webpack_require__(1473).Object.assign;

/***/ }),

/***/ 1560:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1586);
var $Object = __webpack_require__(1473).Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};

/***/ }),

/***/ 1561:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1587);
var $Object = __webpack_require__(1473).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),

/***/ 1562:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1588);
var $Object = __webpack_require__(1473).Object;
module.exports = function getOwnPropertyDescriptor(it, key){
  return $Object.getOwnPropertyDescriptor(it, key);
};

/***/ }),

/***/ 1563:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1589);
module.exports = __webpack_require__(1473).Object.getPrototypeOf;

/***/ }),

/***/ 1564:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1590);
module.exports = __webpack_require__(1473).Object.setPrototypeOf;

/***/ }),

/***/ 1565:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1593);
__webpack_require__(1591);
__webpack_require__(1594);
__webpack_require__(1595);
module.exports = __webpack_require__(1473).Symbol;

/***/ }),

/***/ 1566:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1592);
__webpack_require__(1596);
module.exports = __webpack_require__(1513).f('iterator');

/***/ }),

/***/ 1567:
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),

/***/ 1568:
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),

/***/ 1569:
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(1475)
  , toLength  = __webpack_require__(1583)
  , toIndex   = __webpack_require__(1582);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),

/***/ 1570:
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(1486)
  , gOPS    = __webpack_require__(1505)
  , pIE     = __webpack_require__(1488);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),

/***/ 1571:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1474).document && document.documentElement;

/***/ }),

/***/ 1572:
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(1518);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),

/***/ 1573:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(1503)
  , descriptor     = __webpack_require__(1489)
  , setToStringTag = __webpack_require__(1506)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(1482)(IteratorPrototype, __webpack_require__(1483)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),

/***/ 1574:
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),

/***/ 1575:
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(1486)
  , toIObject = __webpack_require__(1475);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),

/***/ 1576:
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(1490)('meta')
  , isObject = __webpack_require__(1485)
  , has      = __webpack_require__(1479)
  , setDesc  = __webpack_require__(1480).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(1481)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),

/***/ 1577:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(1486)
  , gOPS     = __webpack_require__(1505)
  , pIE      = __webpack_require__(1488)
  , toObject = __webpack_require__(1510)
  , IObject  = __webpack_require__(1522)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(1481)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),

/***/ 1578:
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(1480)
  , anObject = __webpack_require__(1484)
  , getKeys  = __webpack_require__(1486);

module.exports = __webpack_require__(1477) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),

/***/ 1579:
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(1475)
  , gOPN      = __webpack_require__(1524).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ 1580:
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(1485)
  , anObject = __webpack_require__(1484);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(1519)(Function.call, __webpack_require__(1504).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),

/***/ 1581:
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(1509)
  , defined   = __webpack_require__(1499);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),

/***/ 1582:
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(1509)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),

/***/ 1583:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(1509)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),

/***/ 1584:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(1568)
  , step             = __webpack_require__(1574)
  , Iterators        = __webpack_require__(1501)
  , toIObject        = __webpack_require__(1475);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(1523)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),

/***/ 1585:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(1478);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(1577)});

/***/ }),

/***/ 1586:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1478)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(1503)});

/***/ }),

/***/ 1587:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1478);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(1477), 'Object', {defineProperty: __webpack_require__(1480).f});

/***/ }),

/***/ 1588:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = __webpack_require__(1475)
  , $getOwnPropertyDescriptor = __webpack_require__(1504).f;

__webpack_require__(1527)('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

/***/ }),

/***/ 1589:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = __webpack_require__(1510)
  , $getPrototypeOf = __webpack_require__(1525);

__webpack_require__(1527)('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),

/***/ 1590:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(1478);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(1580).set});

/***/ }),

/***/ 1591:
/***/ (function(module, exports) {



/***/ }),

/***/ 1592:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(1581)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(1523)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),

/***/ 1593:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(1474)
  , has            = __webpack_require__(1479)
  , DESCRIPTORS    = __webpack_require__(1477)
  , $export        = __webpack_require__(1478)
  , redefine       = __webpack_require__(1528)
  , META           = __webpack_require__(1576).KEY
  , $fails         = __webpack_require__(1481)
  , shared         = __webpack_require__(1508)
  , setToStringTag = __webpack_require__(1506)
  , uid            = __webpack_require__(1490)
  , wks            = __webpack_require__(1483)
  , wksExt         = __webpack_require__(1513)
  , wksDefine      = __webpack_require__(1512)
  , keyOf          = __webpack_require__(1575)
  , enumKeys       = __webpack_require__(1570)
  , isArray        = __webpack_require__(1572)
  , anObject       = __webpack_require__(1484)
  , toIObject      = __webpack_require__(1475)
  , toPrimitive    = __webpack_require__(1511)
  , createDesc     = __webpack_require__(1489)
  , _create        = __webpack_require__(1503)
  , gOPNExt        = __webpack_require__(1579)
  , $GOPD          = __webpack_require__(1504)
  , $DP            = __webpack_require__(1480)
  , $keys          = __webpack_require__(1486)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(1524).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(1488).f  = $propertyIsEnumerable;
  __webpack_require__(1505).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(1502)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(1482)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),

/***/ 1594:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1512)('asyncIterator');

/***/ }),

/***/ 1595:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1512)('observable');

/***/ }),

/***/ 1596:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1584);
var global        = __webpack_require__(1474)
  , hide          = __webpack_require__(1482)
  , Iterators     = __webpack_require__(1501)
  , TO_STRING_TAG = __webpack_require__(1483)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),

/***/ 1598:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(1515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(1516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(1496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(1498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(1497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__enhancer__ = __webpack_require__(1529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__types__ = __webpack_require__(1530);






/* eslint react/prop-types: 0 */





var Circle = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(Circle, _Component);

  function Circle() {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Circle);

    return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Circle, [{
    key: 'getPathStyles',
    value: function getPathStyles() {
      var _props = this.props,
          percent = _props.percent,
          strokeWidth = _props.strokeWidth,
          _props$gapDegree = _props.gapDegree,
          gapDegree = _props$gapDegree === undefined ? 0 : _props$gapDegree,
          gapPosition = _props.gapPosition;

      var radius = 50 - strokeWidth / 2;
      var beginPositionX = 0;
      var beginPositionY = -radius;
      var endPositionX = 0;
      var endPositionY = -2 * radius;
      switch (gapPosition) {
        case 'left':
          beginPositionX = -radius;
          beginPositionY = 0;
          endPositionX = 2 * radius;
          endPositionY = 0;
          break;
        case 'right':
          beginPositionX = radius;
          beginPositionY = 0;
          endPositionX = -2 * radius;
          endPositionY = 0;
          break;
        case 'bottom':
          beginPositionY = radius;
          endPositionY = 2 * radius;
          break;
        default:
      }
      var pathString = 'M 50,50 m ' + beginPositionX + ',' + beginPositionY + '\n     a ' + radius + ',' + radius + ' 0 1 1 ' + endPositionX + ',' + -endPositionY + '\n     a ' + radius + ',' + radius + ' 0 1 1 ' + -endPositionX + ',' + endPositionY;
      var len = Math.PI * 2 * radius;
      var trailPathStyle = {
        strokeDasharray: len - gapDegree + 'px ' + len + 'px',
        strokeDashoffset: '-' + gapDegree / 2 + 'px',
        transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
      };
      var strokePathStyle = {
        strokeDasharray: percent / 100 * (len - gapDegree) + 'px ' + len + 'px',
        strokeDashoffset: '-' + gapDegree / 2 + 'px',
        transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
      };
      return { pathString: pathString, trailPathStyle: trailPathStyle, strokePathStyle: strokePathStyle };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          prefixCls = _props2.prefixCls,
          strokeWidth = _props2.strokeWidth,
          trailWidth = _props2.trailWidth,
          strokeColor = _props2.strokeColor,
          trailColor = _props2.trailColor,
          strokeLinecap = _props2.strokeLinecap,
          style = _props2.style,
          className = _props2.className,
          restProps = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default()(_props2, ['prefixCls', 'strokeWidth', 'trailWidth', 'strokeColor', 'trailColor', 'strokeLinecap', 'style', 'className']);

      var _getPathStyles = this.getPathStyles(),
          pathString = _getPathStyles.pathString,
          trailPathStyle = _getPathStyles.trailPathStyle,
          strokePathStyle = _getPathStyles.strokePathStyle;

      delete restProps.percent;
      delete restProps.gapDegree;
      delete restProps.gapPosition;
      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        'svg',
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
          className: prefixCls + '-circle ' + className,
          viewBox: '0 0 100 100',
          style: style
        }, restProps),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('path', {
          className: prefixCls + '-circle-trail',
          d: pathString,
          stroke: trailColor,
          strokeWidth: trailWidth || strokeWidth,
          fillOpacity: '0',
          style: trailPathStyle
        }),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('path', {
          className: prefixCls + '-circle-path',
          d: pathString,
          strokeLinecap: strokeLinecap,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          fillOpacity: '0',
          ref: function ref(path) {
            _this2.path = path;
          },
          style: strokePathStyle
        })
      );
    }
  }]);

  return Circle;
}(__WEBPACK_IMPORTED_MODULE_6_react__["Component"]);

Circle.propTypes = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_9__types__["a" /* propTypes */], {
  gapPosition: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.oneOf(['top', 'bottom', 'left', 'right'])
});

Circle.defaultProps = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_9__types__["b" /* defaultProps */], {
  gapPosition: 'top'
});

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__enhancer__["a" /* default */])(Circle));

/***/ }),

/***/ 1599:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(1515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(1516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(1496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(1498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(1497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__enhancer__ = __webpack_require__(1529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__types__ = __webpack_require__(1530);










var Line = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(Line, _Component);

  function Line() {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Line);

    return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Line.__proto__ || Object.getPrototypeOf(Line)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Line, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          percent = _props.percent,
          prefixCls = _props.prefixCls,
          strokeColor = _props.strokeColor,
          strokeLinecap = _props.strokeLinecap,
          strokeWidth = _props.strokeWidth,
          style = _props.style,
          trailColor = _props.trailColor,
          trailWidth = _props.trailWidth,
          restProps = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default()(_props, ['className', 'percent', 'prefixCls', 'strokeColor', 'strokeLinecap', 'strokeWidth', 'style', 'trailColor', 'trailWidth']);

      delete restProps.gapPosition;

      var pathStyle = {
        strokeDasharray: '100px, 100px',
        strokeDashoffset: 100 - percent + 'px',
        transition: 'stroke-dashoffset 0.3s ease 0s, stroke 0.3s linear'
      };

      var center = strokeWidth / 2;
      var right = 100 - strokeWidth / 2;
      var pathString = 'M ' + (strokeLinecap === 'round' ? center : 0) + ',' + center + '\n           L ' + (strokeLinecap === 'round' ? right : 100) + ',' + center;
      var viewBoxString = '0 0 100 ' + strokeWidth;

      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        'svg',
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
          className: prefixCls + '-line ' + className,
          viewBox: viewBoxString,
          preserveAspectRatio: 'none',
          style: style
        }, restProps),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('path', {
          className: prefixCls + '-line-trail',
          d: pathString,
          strokeLinecap: strokeLinecap,
          stroke: trailColor,
          strokeWidth: trailWidth || strokeWidth,
          fillOpacity: '0'
        }),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('path', {
          className: prefixCls + '-line-path',
          d: pathString,
          strokeLinecap: strokeLinecap,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          fillOpacity: '0',
          ref: function ref(path) {
            _this2.path = path;
          },
          style: pathStyle
        })
      );
    }
  }]);

  return Line;
}(__WEBPACK_IMPORTED_MODULE_6_react__["Component"]);

Line.propTypes = __WEBPACK_IMPORTED_MODULE_8__types__["a" /* propTypes */];

Line.defaultProps = __WEBPACK_IMPORTED_MODULE_8__types__["b" /* defaultProps */];

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__enhancer__["a" /* default */])(Line));

/***/ }),

/***/ 1600:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Line__ = __webpack_require__(1599);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Circle__ = __webpack_require__(1598);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Line__["a"]; });
/* unused harmony reexport Circle */





/* unused harmony default export */ var _unused_webpack_default_export = ({
  Line: __WEBPACK_IMPORTED_MODULE_0__Line__["a" /* default */],
  Circle: __WEBPACK_IMPORTED_MODULE_1__Circle__["a" /* default */]
});

/***/ }),

/***/ 1622:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fitText;
/**
 * Fit Text to Containing Element's Width
 * @param container - The containing element with constraining width
 * @param target - The target element to fit to width constraint
 * @param shouldScaleUp - Allow for the text to scale up even if the container width isn't exceeded
 */
function fitText(container, target, shouldScaleUp) {
  if (container && target) {
    var containerWidth = container.clientWidth;
    var targetWidth = target.clientWidth;

    target.style.transform = null; // Reset

    if (shouldScaleUp || targetWidth > containerWidth) {
      var newWidth = containerWidth * targetWidth / targetWidth;
      var newScale = newWidth / targetWidth;

      target.style.transform = "scale(" + newScale + ", " + newScale + ")";
    }
  }
}

/***/ }),

/***/ 1744:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_components_augur_logo_icon__ = __webpack_require__(742);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants_icon_topics__ = __webpack_require__(1748);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var TopicIcon = function (_Component) {
  _inherits(TopicIcon, _Component);

  function TopicIcon(props) {
    _classCallCheck(this, TopicIcon);

    var _this = _possibleConstructorReturn(this, (TopicIcon.__proto__ || Object.getPrototypeOf(TopicIcon)).call(this, props));

    _this.state = {
      hasIcon: false,
      className: null
    };

    _this.determineAppropriateIcon = _this.determineAppropriateIcon.bind(_this);
    return _this;
  }

  _createClass(TopicIcon, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.determineAppropriateIcon();
    }
  }, {
    key: 'determineAppropriateIcon',
    value: function determineAppropriateIcon() {
      var _this2 = this;

      // NOTE --  The icon selection is as follows:
      //  > If a topic matches an existing Font Awesome classname, use that; otherwise,
      //  > If a topic matches an existing Icofont classname, use that; otherwise,
      //  > If a topic matches a pre-defined mapping, use that; otherwise,
      //  > use Augur logo

      // Font Awesome match
      var faClass = this.props.fontAwesomeClasses.find(function (faClass) {
        return faClass === 'fa-' + _this2.props.topic.toLowerCase();
      });
      if (faClass) {
        this.setState({
          hasIcon: true,
          className: 'fa ' + faClass
        });
        return;
      }

      // Icofont match
      var icoClass = this.props.icoFontClasses.find(function (icoClass) {
        return icoClass === 'icofont-' + _this2.props.topic.toLowerCase();
      });
      if (icoClass) {
        this.setState({
          hasIcon: true,
          className: 'icofont ' + icoClass
        });
        return;
      }

      // Predefined match
      var matchedTopic = Object.keys(__WEBPACK_IMPORTED_MODULE_4__constants_icon_topics__["a" /* default */]).find(function (icon) {
        if (typeof __WEBPACK_IMPORTED_MODULE_4__constants_icon_topics__["a" /* default */][icon] === 'string') {
          if (__WEBPACK_IMPORTED_MODULE_4__constants_icon_topics__["a" /* default */][icon] === _this2.props.topic.toLowerCase()) {
            return true;
          }
          return false;
        }

        var arrayIconCheck = __WEBPACK_IMPORTED_MODULE_4__constants_icon_topics__["a" /* default */][icon].indexOf(_this2.props.topic.toLowerCase());

        if (arrayIconCheck > -1) {
          return icon;
        }

        return false;
      });

      if (matchedTopic) {
        if (matchedTopic.indexOf('fa-') !== -1) {
          this.setState({
            hasIcon: true,
            className: 'fa ' + matchedTopic
          });
        }
        if (matchedTopic.indexOf('icofont-') !== -1) {
          this.setState({
            hasIcon: true,
            className: 'icofont ' + matchedTopic
          });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var s = this.state;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'article',
        { className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('topic-icon', { 'augur-logo': !s.hasIcon }) },
        s.hasIcon ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', {
          ref: function ref(topicIcon) {
            _this3.topicIcon = topicIcon;
          },
          className: s.className
        }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__common_components_augur_logo_icon__["a" /* default */], null)
      );
    }
  }]);

  return TopicIcon;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

TopicIcon.propTypes = {
  topic: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  fontAwesomeClasses: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array,
  icoFontClasses: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array
};
/* harmony default export */ __webpack_exports__["a"] = (TopicIcon);

/***/ }),

/***/ 1745:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__topic__ = __webpack_require__(1746);
/* eslint react/no-array-index-key: 0 */ // Trying to accomodate the data structure






var TopicRows = function TopicRows(p) {
  var rows = [];
  var offset = 0;

  for (var row = 0; row < p.numberOfRows; row++) {
    rows[row] = [];

    var rowBound = p.hasHeroRow && row === 0 && !p.hasKeywords ? p.topicsPerHeroRow : p.topicsPerRow;

    for (var item = 0; item < rowBound; item++) {
      if (offset < p.boundedLength) {
        rows[row].push(p.filteredTopics[p.lowerBound - 1 + offset]);
      } else {
        rows[row].push(null);
      }

      offset += 1;
    }
  }

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'topic-rows' },
    rows.map(function (row, rowIndex) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        {
          key: '' + JSON.stringify(row) + rowIndex,
          className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()('topic-row', { 'hero-row': p.hasHeroRow && rowIndex === 0, 'search-result': p.hasKeywords })
        },
        rows[rowIndex].map(function (topic, topicIndex) {
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__topic__["a" /* default */], {
            key: topic !== null && p.topics && p.topics[topic] ? JSON.stringify(p.topics[topic]) : '' + JSON.stringify(row) + rowIndex + topicIndex,
            isSpacer: topic === null,
            isHero: p.hasHeroRow && rowIndex === 0,
            topic: topic !== null && p.topics && p.topics[topic] ? p.topics[topic].topic : '',
            popularity: topic !== null && p.topics && p.topics[topic] ? p.topics[topic].popularity : 0,
            hasKeywords: p.hasKeywords,
            fontAwesomeClasses: p.fontAwesomeClasses,
            icoFontClasses: p.icoFontClasses
          });
        })
      );
    })
  );
};

/* harmony default export */ __webpack_exports__["a"] = (TopicRows);

/***/ }),

/***/ 1746:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_tooltip__ = __webpack_require__(730);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__topic_icon__ = __webpack_require__(1744);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_debounce__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_fit_text__ = __webpack_require__(1622);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_helpers_make_path__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__constants_topic_popularity_change__ = __webpack_require__(1749);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_constants_views__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_constants_param_names__ = __webpack_require__(523);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

















var Topic = function (_Component) {
  _inherits(Topic, _Component);

  function Topic(props) {
    _classCallCheck(this, Topic);

    var _this = _possibleConstructorReturn(this, (Topic.__proto__ || Object.getPrototypeOf(Topic)).call(this, props));

    _this.state = {
      popularityChange: null
    };

    _this.handleFitText = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_debounce__["a" /* default */])(_this.handleFitText.bind(_this));
    return _this;
  }

  _createClass(Topic, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_fit_text__["a" /* default */])(this.topicNameContainer, this.topicName);

      window.addEventListener('resize', this.handleFitText);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (this.props.popularity !== nextProps.popularity) {
        var popularityChange = nextProps.popularity > this.props.popularity ? __WEBPACK_IMPORTED_MODULE_9__constants_topic_popularity_change__["a" /* TOPIC_VOLUME_INCREASED */] : __WEBPACK_IMPORTED_MODULE_9__constants_topic_popularity_change__["b" /* TOPIC_VOLUME_DECREASED */];

        this.setState({ popularityChange: popularityChange });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_fit_text__["a" /* default */])(this.topicNameContainer, this.topicName);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.handleFitText);
    }
  }, {
    key: 'handleFitText',
    value: function handleFitText() {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_fit_text__["a" /* default */])(this.topicNameContainer, this.topicName);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var p = this.props;
      var s = this.state;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["c" /* Link */],
        {
          to: {
            pathname: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__app_helpers_make_path__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_10__app_constants_views__["a" /* MARKETS */]),
            search: '?' + __WEBPACK_IMPORTED_MODULE_11__app_constants_param_names__["i" /* TOPIC_PARAM_NAME */] + '=' + encodeURIComponent(p.topic)
          },
          key: p.topic + '-' + p.popularity,
          className: __WEBPACK_IMPORTED_MODULE_4_classnames___default()('unstyled button topic-button', { isHero: p.isHero, 'is-spacer-topic': p.isSpacer, 'search-result': p.isSearchResult })
        },
        !p.isSpacer && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          {
            className: 'topic-content',
            ref: function ref(topicNameContainer) {
              _this2.topicNameContainer = topicNameContainer;
            }
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__topic_icon__["a" /* default */], {
            topic: p.topic,
            fontAwesomeClasses: p.fontAwesomeClasses,
            icoFontClasses: p.icoFontClasses
          }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'topic-popularity' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              {
                className: __WEBPACK_IMPORTED_MODULE_4_classnames___default()({
                  'bounce-up-and-flash': s.popularityChange === __WEBPACK_IMPORTED_MODULE_9__constants_topic_popularity_change__["a" /* TOPIC_VOLUME_INCREASED */],
                  'bounce-down-and-flash': s.popularityChange === __WEBPACK_IMPORTED_MODULE_9__constants_topic_popularity_change__["b" /* TOPIC_VOLUME_DECREASED */]
                }),
                'data-tip': true, 'data-for': 'topic-volume-tooltip'
              },
              Math.floor(p.popularity).toLocaleString()
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'topic-name' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { ref: function ref(topicName) {
                  _this2.topicName = topicName;
                } },
              p.topic.toUpperCase()
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_3_react_tooltip___default.a,
          { id: 'topic-volume-tooltip', type: 'light', effect: 'solid', place: 'top' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'tooltip-text' },
            'Total Market Volume'
          )
        )
      );
    }
  }]);

  return Topic;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

Topic.propTypes = {
  popularity: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number
};
/* harmony default export */ __webpack_exports__["a"] = (Topic);

/***/ }),

/***/ 1747:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_dom__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_components_null_state_message__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__topic_rows__ = __webpack_require__(1745);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_components_paginator__ = __webpack_require__(1539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__branch_components_branch__ = __webpack_require__(1537);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__filter_sort_container__ = __webpack_require__(1532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_helpers_parse_query__ = __webpack_require__(727);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_helpers_make_path__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__utils_get_value__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_constants_param_names__ = __webpack_require__(523);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_constants_views__ = __webpack_require__(66);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



















var TopicsView = function (_Component) {
  _inherits(TopicsView, _Component);

  function TopicsView(props) {
    _classCallCheck(this, TopicsView);

    // Adjust these to change topic layout
    var _this = _possibleConstructorReturn(this, (TopicsView.__proto__ || Object.getPrototypeOf(TopicsView)).call(this, props));

    _this.topicsConfig = {
      numberOfRows: 3,
      topicsPerHeroRow: 2,
      topicsPerRow: 4
    };

    _this.searchKeys = ['topic'];

    _this.state = {
      lowerBound: null,
      upperBound: null,
      boundedLength: null,
      currentPage: null,
      itemsPerPage: 0,
      filteredTopics: [],
      filteredTopicsLength: 0,
      hasKeywords: false,
      paginatedTopics: [],
      pagination: {},
      fontAwesomeClasses: [],
      icoFontClasses: []
    };

    _this.setCurrentPage = _this.setCurrentPage.bind(_this);
    _this.setItemsPerPage = _this.setItemsPerPage.bind(_this);
    _this.setSegment = _this.setSegment.bind(_this);
    _this.filterOutIconClassesFromStylesheets = _this.filterOutIconClassesFromStylesheets.bind(_this);
    _this.updateFilteredItems = _this.updateFilteredItems.bind(_this);
    return _this;
  }

  _createClass(TopicsView, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setCurrentPage(this.props.location);
      this.setItemsPerPage(this.state.currentPage, this.state.hasKeywords);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.filterOutIconClassesFromStylesheets();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.location !== nextProps.location) this.setCurrentPage(nextProps.location);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (this.state.currentPage !== nextState.currentPage || this.state.hasKeywords !== nextState.hasKeywords) {
        this.setItemsPerPage(nextState.currentPage, nextState.hasKeywords);
      }
    }
  }, {
    key: 'setCurrentPage',
    value: function setCurrentPage(location) {
      var currentPage = parseInt(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__app_helpers_parse_query__["a" /* default */])(location.search)[__WEBPACK_IMPORTED_MODULE_12__app_constants_param_names__["h" /* PAGINATION_PARAM_NAME */]] || 1, 10);

      this.setState({ currentPage: currentPage });
    }
  }, {
    key: 'setItemsPerPage',
    value: function setItemsPerPage(currentPage, hasKeywords) {
      var itemsPerPage = void 0;
      if ((currentPage === null || currentPage === 1) && !hasKeywords) {
        itemsPerPage = (this.topicsConfig.numberOfRows - 1) * this.topicsConfig.topicsPerRow + this.topicsConfig.topicsPerHeroRow;
      } else {
        itemsPerPage = this.topicsConfig.numberOfRows * this.topicsConfig.topicsPerRow;
      }

      this.setState({ itemsPerPage: itemsPerPage });
    }
  }, {
    key: 'setSegment',
    value: function setSegment(lowerBound, upperBound, boundedLength) {
      this.setState({ lowerBound: lowerBound, upperBound: upperBound, boundedLength: boundedLength });
    }
  }, {
    key: 'filterOutIconClassesFromStylesheets',
    value: function filterOutIconClassesFromStylesheets() {
      // Get all classes from stylesheets for Font Awesome + Icofont
      var fontAwesomeClasses = [];
      var icoFontClasses = [];

      var styleSheets = window.document.styleSheets;

      for (var sI = 0; sI < styleSheets.length; sI++) {
        try {
          var sheet = styleSheets[sI];
          var ruleLength = sheet.cssRules ? sheet.cssRules.length : 0;
          for (var rI = 0; rI < ruleLength; rI++) {
            var rule = sheet.cssRules[rI];

            // Filter out Font Awesome icon classes
            if (rule.selectorText && rule.selectorText.indexOf('fa-') !== -1) {
              var selectors = rule.selectorText.split(/([: ,.])/);
              selectors.forEach(function (selector) {
                if (selector.indexOf('fa-') !== -1) {
                  fontAwesomeClasses.push(selector);
                }
              });
            }

            // Filter out Icofont icon classes
            if (rule.selectorText && rule.selectorText.indexOf('icofont-') !== -1) {
              var _selectors = rule.selectorText.split(/([: ,.])/);
              _selectors.forEach(function (selector) {
                if (selector.indexOf('icofont-') !== -1) {
                  icoFontClasses.push(selector);
                }
              });
            }
          }
        } catch (e) {
          // Silently Fail --
          //  Mixed protocols can cause 'cssRules' to be inaccesible
          //  Stylesheets pulled remotely are not needed for our purposes here, so silently failing
        }
      }

      this.setState({ fontAwesomeClasses: fontAwesomeClasses, icoFontClasses: icoFontClasses });
    }
  }, {
    key: 'updateFilteredItems',
    value: function updateFilteredItems(filteredTopics) {
      this.setState({
        filteredTopics: filteredTopics,
        filteredTopicsLength: filteredTopics.length,
        hasKeywords: filteredTopics.length !== __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__utils_get_value__["a" /* default */])(this.props, 'topics.length') // Inferred
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var p = this.props;
      var s = this.state;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'section',
        { id: 'topics_view' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { id: 'topics_container' },
          !!p.loginAccount && !!p.loginAccount.rep && !!p.loginAccount.rep.value && !!p.branch.id && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__branch_components_branch__["a" /* default */], p.branch),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'topics-header' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('topics-search', { 'only-search': !p.isLogged }) },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__filter_sort_container__["a" /* default */], {
                items: p.topics,
                updateFilteredItems: this.updateFilteredItems,
                searchPlaceholder: 'Search Topics',
                searchKeys: this.searchKeys,
                filterBySearch: true
              })
            ),
            p.loginAccount && p.loginAccount.address && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_3_react_router_dom__["c" /* Link */],
              {
                to: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__app_helpers_make_path__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_13__app_constants_views__["c" /* CREATE_MARKET */]),
                className: 'link button imperative navigational',
                disabled: !p.loginAccount.address
              },
              '+ Create New Market'
            )
          ),
          s.filteredTopicsLength && s.boundedLength ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'topics' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__topic_rows__["a" /* default */], {
              topics: p.topics,
              filteredTopics: s.filteredTopics,
              numberOfRows: this.topicsConfig.numberOfRows,
              topicsPerRow: this.topicsConfig.topicsPerRow,
              topicsPerHeroRow: this.topicsConfig.topicsPerHeroRow,
              hasHeroRow: s.currentPage === 1,
              lowerBound: s.lowerBound,
              boundedLength: s.boundedLength,
              hasKeywords: s.hasKeywords,
              fontAwesomeClasses: s.fontAwesomeClasses,
              icoFontClasses: s.icoFontClasses
            })
          ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__common_components_null_state_message__["a" /* default */], { message: 'No Topics Available' }),
          !!s.filteredTopicsLength && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__common_components_paginator__["a" /* default */], {
            itemsLength: s.filteredTopicsLength,
            itemsPerPage: s.itemsPerPage,
            location: p.location,
            history: p.history,
            setSegment: this.setSegment
          })
        )
      );
    }
  }]);

  return TopicsView;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

TopicsView.propTypes = {
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  isLogged: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  topics: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array,
  branch: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  loginAccount: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object
};
/* harmony default export */ __webpack_exports__["a"] = (TopicsView);

/***/ }),

/***/ 1748:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// NOTE --  Each topic must be uniquely mapped to an icon
//          Each icon can have multiple topics via an array of strings
//          Two icon font sets are availble:
//            All Font Awesome icons (v4.7.0) are available -- http://fontawesome.io/cheatsheet/
//            Icons from the following Icofont (v1.0.0b) groups are available: Business, Currency, Payment, Sport, Transport, Travel, and Weather -- http://icofont.com/

var fontAwesomeIcons = {
  'fa-copy': ['reporting', 'testing', 'beta', 'policy'],
  'fa-snowflake-o': 'snow',
  'fa-bolt': 'lightning',
  'fa-cloud': ['weather', 'rain', 'precipitation'],
  'fa-sun-o': ['climate', 'sunspot', 'sunspots'],
  'fa-thermometer': ['temperature', 'heat'],
  'fa-line-chart': ['finance', 'financial', 'financials', 'dow jones', 'to the moon', 'stock', 'stocks', 'derivative', 'derivatives', 'option', 'options', 'future', 'futures'],
  'fa-bug': ['antibiotic', 'antibiotics', 'bacteria', 'infection', 'infections', 'epidemic', 'epidemics'],
  'fa-ambulance': ['mortality', 'hospital', 'hospitals', 'medicine'],
  'fa-home': ['housing', 'home', 'realty'],
  'fa-industry': ['climate change', 'pollution', 'global warming', 'eraserhead'],
  'fa-newspaper-o': ['news', 'events', 'newspaper', 'newspapers', 'fake news', 'media'],
  'fa-ship': ['international trade', 'shipping'],
  'fa-music': ['music', 'songs', 'pop', 'rock', 'rap', 'dancing', 'dance', 'techno'],
  'fa-laptop': ['computers', 'computing', 'laptops'],
  'fa-lock': ['crypto', 'cryptography', 'encryption', 'security'],
  'fa-money': ['trading', 'cryptocurrency', 'currency', 'currencies', 'money', 'value', 'fiat', 'debt', 'forex', 'lottery', 'daily lottery'],
  'fa-chain': ['blockchain', 'blockchains', 'block chain', 'block chains'],
  'fa-btc': ['bitcoin', 'btc', 'bitcoins'],
  'fa-usd': ['dollar', 'dollars', 'usd'],
  'fa-yen': ['yen', 'jpy', 'rmb', 'cny'],
  'fa-eur': ['euro', 'eur', 'euros'],
  'fa-rub': ['ruble', 'rubles', 'rub'],
  'fa-inr': ['inr', 'rupee', 'rupees'],
  'fa-superscript': ['math', 'mathematics', 'maths'],
  'fa-apple': ['apple', 'mac', 'osx', 'ios', 'ipad', 'steve jobs', 'tim cook'],
  'fa-futbol-o': ['futbol', 'soccer', 'world cup', 'sports'],
  'fa-shield': ['defense', 'national defense', 'military'],
  'fa-motorcycle': ['travel', 'traveling', 'motorcycles'],
  'fa-pie-chart': ['data', 'big data', 'analytics', 'statistics'],
  'fa-phone': ['phones', 'telephone', 'telephones'],
  'fa-mobile': ['smartphone', 'smartphones', 'smart phone', 'smart phones', 'android', 'iphone'],
  'fa-plug': ['electricity', 'electrical', 'power', 'power grid', 'electric'],
  'fa-plane': ['planes', 'airplane', 'airplanes', 'flying', 'flight', 'airport', 'airports', 'airline', 'airliner', 'jet'],
  'fa-flask': ['science', 'scientists', 'physics', 'chemistry', 'biology', 'genetics', 'chemical', 'chemicals'],
  'fa-cogs': ['engineering', 'engineers', 'manufacturing', 'manufacturers', 'steampunk', 'makers'],
  'fa-copyright': ['ip', 'intellectual property', 'copyleft', 'patents'],
  'fa-automobile': ['cars', 'automobiles', 'self-driving cars', 'accidents', 'crashes', 'driving', 'drivers', 'road rage'],
  'fa-beer': ['alcohol', 'alcoholics', 'drinking', 'beers'],
  'fa-briefcase': ['law', 'legal', 'laws', 'lawyers', 'legalese'],
  'fa-shopping-cart': ['e-commerce', 'commerce', 'shopping', 'consumers', 'customers'],
  'fa-university': ['banks', 'schools', 'universities', 'institutions', 'government', 'state', 'federal', 'bureaucracy', 'college', 'colleges', 'uni', 'college football'],
  'fa-truck': ['cargo', 'transport', 'transportation', 'trucks'],
  'fa-wrench': ['reliability', 'durability'],
  'fa-gavel': ['justice', 'courts', 'court system', 'judicial', 'supreme court', 'appeals court', 'superior court', 'trial', 'trials'],
  'fa-globe': ['earth', 'world', 'planet', 'planets', 'planetary'],
  'fa-key': ['vulnerability', 'vulnerabilities', 'backdoor', 'backdoors'],
  'fa-recycle': ['environment', 'environmental', 'environmentalism', 'recycling', 'green'],
  'fa-share-alt': ['network', 'networks', 'networking'],
  'fa-checkered': ['race', 'racing', 'races', 'horseracing', 'horserace', 'nascar'],
  'fa-at': ['email', 'emails', 'e-mail', 'e-mails', 'identity', 'names'],
  'fa-code': ['coding', 'programming', 'programmers', 'software', 'development', 'developers'],
  'fa-eye': ['surveillance', 'big brother', 'nsa', 'national security agency', 'snowden'],
  'fa-font-awesome': ['capture the flag', 'ctf', 'flag football', 'frisbee golf'],
  'fa-compress': ['debates', 'arguments', 'conflicts', 'fights', 'war', 'wars', 'fighting', 'calexit'],
  'fa-flag-o': ['France', 'USA', 'United States', 'UK', 'United Kingdom', 'Spain', 'Portugal', 'China', 'Russia', 'Australia', 'Canada', 'New Zealand', 'Japan'],
  'fa-smile-o': ['happy', 'pleasure']
};

var icofontIcons = {
  'icofont-people': ['elections', 'politics'],
  'icofont-rocket-alt-2': ['space', 'space program', 'rocket', 'nasa', 'spacex'],
  'icofont-tractor': ['agriculture', 'farming', 'GMO'],
  'icofont-growth': ['market', 'markets', 'exchange'],
  'icofont-excavator': ['construction'],
  'icofont-bull-dozer': ['demolition'],
  'icofont-basketball': ['basketball'],
  'icofont-rugby': ['rugby', 'football', 'american football'],
  'icofont-baseball': ['baseball'],
  'icofont-motor-bike': ['motorcycles', 'motorcycling', 'bikers']
};

var iconTopics = _extends({}, fontAwesomeIcons, icofontIcons);

/* harmony default export */ __webpack_exports__["a"] = (iconTopics);

/***/ }),

/***/ 1749:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TOPIC_VOLUME_INCREASED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TOPIC_VOLUME_DECREASED; });
var TOPIC_VOLUME_INCREASED = 'TOPIC_VOLUME_INCREASED';
var TOPIC_VOLUME_DECREASED = 'TOPIC_VOLUME_DECREASE';

/***/ }),

/***/ 1750:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return selectTopics; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_reselect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__select_state__ = __webpack_require__(61);




/* unused harmony default export */ var _unused_webpack_default_export = (function () {
  return selectTopics(__WEBPACK_IMPORTED_MODULE_1__store__["a" /* default */].getState());
});

var selectTopics = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(__WEBPACK_IMPORTED_MODULE_2__select_state__["y" /* selectTopicsState */], function (topics) {
  return Object.keys(topics || {}).map(function (topic) {
    return { topic: topic, popularity: topics[topic] };
  }).sort(popularityDifference);
});

var popularityDifference = function popularityDifference(topic1, topic2) {
  return topic2.popularity - topic1.popularity;
};

/***/ })

});
//# sourceMappingURL=topics.55fc1eb96bfa07643163.js.map