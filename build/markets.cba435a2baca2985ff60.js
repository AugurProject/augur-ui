webpackJsonp([3],{

/***/ 1343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_markets_components_markets_view__ = __webpack_require__(1876);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_markets_selectors_markets_all__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_market_selectors_scalar_share_denomination__ = __webpack_require__(1497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_markets_actions_update_markets_filtered_sorted__ = __webpack_require__(673);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_modules_markets_actions_update_favorites__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_modules_markets_actions_load_markets__ = __webpack_require__(1899);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_modules_markets_actions_load_markets_by_topic__ = __webpack_require__(1900);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_modules_markets_actions_load_markets_info__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_utils_get_value__ = __webpack_require__(78);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };


















var mapStateToProps = function mapStateToProps(state) {
  return {
    isLogged: state.isLogged,
    loginAccount: state.loginAccount,
    markets: Object(__WEBPACK_IMPORTED_MODULE_3_modules_markets_selectors_markets_all__["a" /* default */])(),
    universe: state.universe,
    canLoadMarkets: !!Object(__WEBPACK_IMPORTED_MODULE_10_utils_get_value__["a" /* default */])(state, 'universe.id'),
    scalarShareDenomination: Object(__WEBPACK_IMPORTED_MODULE_4_modules_market_selectors_scalar_share_denomination__["a" /* default */])(),
    hasLoadedMarkets: state.hasLoadedMarkets,
    hasLoadedTopic: state.hasLoadedTopic
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    loadMarkets: function loadMarkets() {
      return dispatch(Object(__WEBPACK_IMPORTED_MODULE_7_modules_markets_actions_load_markets__["a" /* default */])());
    },
    loadMarketsByTopic: function loadMarketsByTopic(topic) {
      return dispatch(Object(__WEBPACK_IMPORTED_MODULE_8_modules_markets_actions_load_markets_by_topic__["a" /* loadMarketsByTopic */])(topic));
    },
    updateMarketsFilteredSorted: function updateMarketsFilteredSorted(filteredMarkets) {
      return dispatch(Object(__WEBPACK_IMPORTED_MODULE_5_modules_markets_actions_update_markets_filtered_sorted__["d" /* updateMarketsFilteredSorted */])(filteredMarkets));
    },
    clearMarketsFilteredSorted: function clearMarketsFilteredSorted() {
      return dispatch(Object(__WEBPACK_IMPORTED_MODULE_5_modules_markets_actions_update_markets_filtered_sorted__["c" /* clearMarketsFilteredSorted */])());
    },
    toggleFavorite: function toggleFavorite(marketID) {
      return dispatch(Object(__WEBPACK_IMPORTED_MODULE_6_modules_markets_actions_update_favorites__["c" /* toggleFavorite */])(marketID));
    },
    loadMarketsInfo: function loadMarketsInfo(marketIDs) {
      return dispatch(Object(__WEBPACK_IMPORTED_MODULE_9_modules_markets_actions_load_markets_info__["a" /* loadMarketsInfo */])(marketIDs));
    }
  };
};

var mergeProps = function mergeProps(stateProps, dispatchProps, ownProps) {
  var _loadMarkets2 = dispatchProps.loadMarkets,
      _loadMarketsByTopic2 = dispatchProps.loadMarketsByTopic;


  return _extends({}, stateProps, dispatchProps, ownProps, {
    loadMarkets: function loadMarkets() {
      return _loadMarkets2();
    },
    loadMarketsByTopic: function loadMarketsByTopic(topic) {
      return _loadMarketsByTopic2(topic);
    }
  });
};

var Markets = Object(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["f" /* withRouter */])(Object(__WEBPACK_IMPORTED_MODULE_0_react_redux__["b" /* connect */])(mapStateToProps, mapDispatchToProps, mergeProps)(__WEBPACK_IMPORTED_MODULE_2_modules_markets_components_markets_view__["a" /* default */]));

/* harmony default export */ __webpack_exports__["default"] = (Markets);

/***/ }),

/***/ 1355:
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(1403);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ 1356:
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.0' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ 1357:
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ 1358:
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(1467);
var defined = __webpack_require__(1406);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ 1360:
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1357);
var core = __webpack_require__(1356);
var ctx = __webpack_require__(1463);
var hide = __webpack_require__(1367);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
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
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
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

/***/ 1361:
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1375);
var IE8_DOM_DEFINE = __webpack_require__(1464);
var toPrimitive = __webpack_require__(1405);
var dP = Object.defineProperty;

exports.f = __webpack_require__(1362) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 1362:
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(1368)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ 1363:
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ 1366:
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(1541),
    getValue = __webpack_require__(1544);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),

/***/ 1367:
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(1361);
var createDesc = __webpack_require__(1387);
module.exports = __webpack_require__(1362) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 1368:
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ 1369:
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(1409)('wks');
var uid = __webpack_require__(1388);
var Symbol = __webpack_require__(1357).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ 1373:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(1380),
    getRawTag = __webpack_require__(1454),
    objectToString = __webpack_require__(1455);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ 1374:
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ 1375:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1376);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ 1376:
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ 1377:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(1466);
var enumBugKeys = __webpack_require__(1410);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ 1380:
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(1355);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ 1381:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1399);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1334)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./market-common.styles.less", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./market-common.styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1382:
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(1531),
    listCacheDelete = __webpack_require__(1532),
    listCacheGet = __webpack_require__(1533),
    listCacheHas = __webpack_require__(1534),
    listCacheSet = __webpack_require__(1535);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),

/***/ 1383:
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(1452);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),

/***/ 1384:
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ 1385:
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(1366);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),

/***/ 1386:
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(1553);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),

/***/ 1387:
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 1388:
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ 1389:
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ 1391:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {

  GLOBAL: {
    HIDE: '__react_tooltip_hide_event',
    REBUILD: '__react_tooltip_rebuild_event',
    SHOW: '__react_tooltip_show_event'
  }
};

/***/ }),

/***/ 1393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_common_components_paginator_paginator_styles__ = __webpack_require__(1394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_common_components_paginator_paginator_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_modules_common_components_paginator_paginator_styles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_routes_helpers_parse_query__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_routes_helpers_make_query__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_modules_routes_constants_param_names__ = __webpack_require__(659);
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

      var currentPage = parseInt(Object(__WEBPACK_IMPORTED_MODULE_4_modules_routes_helpers_parse_query__["a" /* default */])(options.location.search)[__WEBPACK_IMPORTED_MODULE_6_modules_routes_constants_param_names__["e" /* PAGINATION_PARAM_NAME */]] || 1, 10);
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
        var updatedSearch = Object(__WEBPACK_IMPORTED_MODULE_4_modules_routes_helpers_parse_query__["a" /* default */])(options.location.search);
        delete updatedSearch[__WEBPACK_IMPORTED_MODULE_6_modules_routes_constants_param_names__["e" /* PAGINATION_PARAM_NAME */]];
        updatedSearch = Object(__WEBPACK_IMPORTED_MODULE_5_modules_routes_helpers_make_query__["a" /* default */])(updatedSearch);

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
        var queryParams = Object(__WEBPACK_IMPORTED_MODULE_4_modules_routes_helpers_parse_query__["a" /* default */])(options.location.search);
        delete queryParams[__WEBPACK_IMPORTED_MODULE_6_modules_routes_constants_param_names__["e" /* PAGINATION_PARAM_NAME */]];
        backQuery = Object(__WEBPACK_IMPORTED_MODULE_5_modules_routes_helpers_make_query__["a" /* default */])(queryParams);
      } else {
        var _queryParams = Object(__WEBPACK_IMPORTED_MODULE_4_modules_routes_helpers_parse_query__["a" /* default */])(options.location.search);
        _queryParams[__WEBPACK_IMPORTED_MODULE_6_modules_routes_constants_param_names__["e" /* PAGINATION_PARAM_NAME */]] = currentPage - 1;
        backQuery = Object(__WEBPACK_IMPORTED_MODULE_5_modules_routes_helpers_make_query__["a" /* default */])(_queryParams);
      }
      //    Forward
      var forwardQuery = void 0;
      if (currentPage * options.itemsPerPage >= totalItems) {
        var _queryParams2 = Object(__WEBPACK_IMPORTED_MODULE_4_modules_routes_helpers_parse_query__["a" /* default */])(options.location.search);
        _queryParams2[__WEBPACK_IMPORTED_MODULE_6_modules_routes_constants_param_names__["e" /* PAGINATION_PARAM_NAME */]] = currentPage;
        forwardQuery = Object(__WEBPACK_IMPORTED_MODULE_5_modules_routes_helpers_make_query__["a" /* default */])(_queryParams2);
      } else {
        var _queryParams3 = Object(__WEBPACK_IMPORTED_MODULE_4_modules_routes_helpers_parse_query__["a" /* default */])(options.location.search);
        _queryParams3[__WEBPACK_IMPORTED_MODULE_6_modules_routes_constants_param_names__["e" /* PAGINATION_PARAM_NAME */]] = currentPage + 1;
        forwardQuery = Object(__WEBPACK_IMPORTED_MODULE_5_modules_routes_helpers_make_query__["a" /* default */])(_queryParams3);
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
        { className: __WEBPACK_IMPORTED_MODULE_3_modules_common_components_paginator_paginator_styles___default.a.Paginator },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: __WEBPACK_IMPORTED_MODULE_3_modules_common_components_paginator_paginator_styles___default.a.Paginator__controls },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_3_modules_common_components_paginator_paginator_styles___default.a.Paginator__back },
            s.currentPage !== 1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["b" /* Link */],
              {
                className: __WEBPACK_IMPORTED_MODULE_3_modules_common_components_paginator_paginator_styles___default.a.Paginator__button,
                to: _extends({}, p.location, {
                  search: s.backQuery
                })
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-angle-left' })
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_3_modules_common_components_paginator_paginator_styles___default.a.Paginator__location },
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
            { className: __WEBPACK_IMPORTED_MODULE_3_modules_common_components_paginator_paginator_styles___default.a.Paginator__forward },
            s.currentPage !== s.lastPage && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["b" /* Link */],
              {
                className: __WEBPACK_IMPORTED_MODULE_3_modules_common_components_paginator_paginator_styles___default.a.Paginator__button,
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

/***/ 1394:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1395);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1334)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./paginator.styles.less", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./paginator.styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1395:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(657)(undefined);
// imports


// module
exports.push([module.i, "@font-face{font-family:FontAwesome;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1335) + ") format(\"woff\")}@font-face{font-family:icofont;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1336) + ") format(\"woff\")}._1aaCDu6XLdi_Ak7yNr6CJP{height:3.125rem;margin-top:2.5rem}._2B3djmBGFoEaIKUHdnbOoo{display:flex;height:100%}.ePKM089xNEZyD44eqT0KE,.Ludq-bMZEAt8yqoqVy-3l,._2L8dKwTWSN5jukiFNqDQeI{flex:1;height:100%}._2L8dKwTWSN5jukiFNqDQeI{align-items:center;display:flex;justify-content:center}._2y6agFjMoopFus78edRHHx{background:none;display:flex;height:100%;padding:0;text-decoration:none}._2b9ijnPl0mB_F3PgH3ZFsv ._2y6agFjMoopFus78edRHHx{align-items:center;display:flex;justify-content:initial;padding-left:1.25rem;text-align:left}.izR1fOhRlE0YZMV7aAc4b ._2y6agFjMoopFus78edRHHx{align-items:center;display:flex;justify-content:flex-end;padding-right:1.25rem;text-align:right}", ""]);

// exports
exports.locals = {
	"Paginator": "_1aaCDu6XLdi_Ak7yNr6CJP",
	"Paginator__controls": "_2B3djmBGFoEaIKUHdnbOoo",
	"Paginator__back": "ePKM089xNEZyD44eqT0KE",
	"Paginator__forward": "Ludq-bMZEAt8yqoqVy-3l",
	"Paginator__location": "_2L8dKwTWSN5jukiFNqDQeI",
	"Paginator__button": "_2y6agFjMoopFus78edRHHx",
	"Paginator_back": "_2b9ijnPl0mB_F3PgH3ZFsv",
	"Paginator_forward": "izR1fOhRlE0YZMV7aAc4b"
};

/***/ }),

/***/ 1396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_common_components_icons_icons__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_status_icon_market_status_icon_styles__ = __webpack_require__(1397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_status_icon_market_status_icon_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_status_icon_market_status_icon_styles__);








var MarketStatusIcon = function MarketStatusIcon(p) {
  var marketStatusIcon = void 0;

  switch (true) {
    case p.isOpen && p.isReported:
      marketStatusIcon = __WEBPACK_IMPORTED_MODULE_3_modules_common_components_icons_icons__["s" /* MarketStatusReported */];
      break;
    case p.isOpen:
      marketStatusIcon = __WEBPACK_IMPORTED_MODULE_3_modules_common_components_icons_icons__["r" /* MarketStatusOpen */];
      break;
    default:
      marketStatusIcon = __WEBPACK_IMPORTED_MODULE_3_modules_common_components_icons_icons__["q" /* MarketStatusClosed */];
  }
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'span',
    { className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(__WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_status_icon_market_status_icon_styles___default.a.MarketStatusIcon, p.className) },
    marketStatusIcon
  );
};

MarketStatusIcon.propTypes = {
  isOpen: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool,
  isReported: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool
};

/* harmony default export */ __webpack_exports__["a"] = (MarketStatusIcon);

/***/ }),

/***/ 1397:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1398);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1334)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./market-status-icon.styles.less", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./market-status-icon.styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1398:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(657)(undefined);
// imports


// module
exports.push([module.i, "._20GRmaAnRZbsPmDzkSNSlx{display:block;height:1.5rem;width:1.5rem}._20GRmaAnRZbsPmDzkSNSlx>svg{height:100%;width:100%}", ""]);

// exports
exports.locals = {
	"MarketStatusIcon": "_20GRmaAnRZbsPmDzkSNSlx"
};

/***/ }),

/***/ 1399:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(657)(undefined);
// imports


// module
exports.push([module.i, "@font-face{font-family:FontAwesome;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1335) + ") format(\"woff\")}@font-face{font-family:icofont;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1336) + ") format(\"woff\")}._2aN0wvcqh4BF5k9hZMIrq0{background-color:#fff;border:1px solid #736e89;margin:2em 0}._2PSAIjg4nOarNIY2AJdwEo{display:flex;justify-content:space-between}._3qs2PaY-cOw1Elaw91P_Cv{color:#a7a2b2;font-size:.75rem;font-weight:400;margin-right:2.16em;text-transform:uppercase}.tUfo_xuqfUVthoZLZQKE{position:relative}._2BWa9CrKAp7VBczIqZ_V9s{padding:1.5rem 2rem}._6DFkLyC5CHk7v3euGxTzD{padding:1.5rem 1.5rem 1.0625rem}@media (max-width:600px){._1OA5d756B0FCXvauoQiCrw{padding-left:1rem;padding-right:1rem}}", ""]);

// exports
exports.locals = {
	"MarketCommon__container": "_2aN0wvcqh4BF5k9hZMIrq0",
	"MarketCommon__header": "_2PSAIjg4nOarNIY2AJdwEo",
	"MarketCommon__small-label": "_3qs2PaY-cOw1Elaw91P_Cv",
	"MarketCommon_description": "tUfo_xuqfUVthoZLZQKE",
	"MarketCommon__topcontent": "_2BWa9CrKAp7VBczIqZ_V9s",
	"MarketCommon__maincontent": "_6DFkLyC5CHk7v3euGxTzD",
	"MarketCommon__content": "_1OA5d756B0FCXvauoQiCrw"
};

/***/ }),

/***/ 1400:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp;

/* Decoraters */


/* Utils */


/* CSS */


var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(10);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(294);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = __webpack_require__(51);

var _classnames2 = _interopRequireDefault(_classnames);

var _staticMethods = __webpack_require__(1439);

var _staticMethods2 = _interopRequireDefault(_staticMethods);

var _windowListener = __webpack_require__(1440);

var _windowListener2 = _interopRequireDefault(_windowListener);

var _customEvent = __webpack_require__(1441);

var _customEvent2 = _interopRequireDefault(_customEvent);

var _isCapture = __webpack_require__(1442);

var _isCapture2 = _interopRequireDefault(_isCapture);

var _getEffect = __webpack_require__(1443);

var _getEffect2 = _interopRequireDefault(_getEffect);

var _trackRemoval = __webpack_require__(1444);

var _trackRemoval2 = _interopRequireDefault(_trackRemoval);

var _getPosition = __webpack_require__(1445);

var _getPosition2 = _interopRequireDefault(_getPosition);

var _getTipContent = __webpack_require__(1446);

var _getTipContent2 = _interopRequireDefault(_getTipContent);

var _aria = __webpack_require__(1447);

var _nodeListToArray = __webpack_require__(1448);

var _nodeListToArray2 = _interopRequireDefault(_nodeListToArray);

var _style = __webpack_require__(1449);

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactTooltip = (0, _staticMethods2.default)(_class = (0, _windowListener2.default)(_class = (0, _customEvent2.default)(_class = (0, _isCapture2.default)(_class = (0, _getEffect2.default)(_class = (0, _trackRemoval2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(ReactTooltip, _Component);

  function ReactTooltip(props) {
    _classCallCheck(this, ReactTooltip);

    var _this = _possibleConstructorReturn(this, (ReactTooltip.__proto__ || Object.getPrototypeOf(ReactTooltip)).call(this, props));

    _this.state = {
      place: 'top', // Direction of tooltip
      type: 'dark', // Color theme of tooltip
      effect: 'float', // float or fixed
      show: false,
      border: false,
      placeholder: '',
      offset: {},
      extraClass: '',
      html: false,
      delayHide: 0,
      delayShow: 0,
      event: props.event || null,
      eventOff: props.eventOff || null,
      currentEvent: null, // Current mouse event
      currentTarget: null, // Current target of mouse event
      ariaProps: (0, _aria.parseAria)(props), // aria- and role attributes
      isEmptyTip: false,
      disable: false
    };

    _this.bind(['showTooltip', 'updateTooltip', 'hideTooltip', 'globalRebuild', 'globalShow', 'globalHide', 'onWindowResize']);

    _this.mount = true;
    _this.delayShowLoop = null;
    _this.delayHideLoop = null;
    _this.intervalUpdateContent = null;
    return _this;
  }

  /**
   * For unify the bind and unbind listener
   */


  _createClass(ReactTooltip, [{
    key: 'bind',
    value: function bind(methodArray) {
      var _this2 = this;

      methodArray.forEach(function (method) {
        _this2[method] = _this2[method].bind(_this2);
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          insecure = _props.insecure,
          resizeHide = _props.resizeHide;

      if (insecure) {
        this.setStyleHeader(); // Set the style to the <link>
      }
      this.bindListener(); // Bind listener for tooltip
      this.bindWindowEvents(resizeHide); // Bind global event for static method
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var ariaProps = this.state.ariaProps;

      var newAriaProps = (0, _aria.parseAria)(props);

      var isChanged = Object.keys(newAriaProps).some(function (props) {
        return newAriaProps[props] !== ariaProps[props];
      });
      if (isChanged) {
        this.setState({ ariaProps: newAriaProps });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mount = false;

      this.clearTimer();

      this.unbindListener();
      this.removeScrollListener();
      this.unbindWindowEvents();
    }

    /**
     * Pick out corresponded target elements
     */

  }, {
    key: 'getTargetArray',
    value: function getTargetArray(id) {
      var targetArray = void 0;
      if (!id) {
        targetArray = document.querySelectorAll('[data-tip]:not([data-for])');
      } else {
        var escaped = id.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
        targetArray = document.querySelectorAll('[data-tip][data-for="' + escaped + '"]');
      }
      // targetArray is a NodeList, convert it to a real array
      return (0, _nodeListToArray2.default)(targetArray);
    }

    /**
     * Bind listener to the target elements
     * These listeners used to trigger showing or hiding the tooltip
     */

  }, {
    key: 'bindListener',
    value: function bindListener() {
      var _this3 = this;

      var _props2 = this.props,
          id = _props2.id,
          globalEventOff = _props2.globalEventOff;

      var targetArray = this.getTargetArray(id);

      targetArray.forEach(function (target) {
        var isCaptureMode = _this3.isCapture(target);
        var effect = _this3.getEffect(target);
        if (target.getAttribute('currentItem') === null) {
          target.setAttribute('currentItem', 'false');
        }
        _this3.unbindBasicListener(target);

        if (_this3.isCustomEvent(target)) {
          _this3.customBindListener(target);
          return;
        }

        target.addEventListener('mouseenter', _this3.showTooltip, isCaptureMode);
        if (effect === 'float') {
          target.addEventListener('mousemove', _this3.updateTooltip, isCaptureMode);
        }
        target.addEventListener('mouseleave', _this3.hideTooltip, isCaptureMode);
      });

      // Global event to hide tooltip
      if (globalEventOff) {
        window.removeEventListener(globalEventOff, this.hideTooltip);
        window.addEventListener(globalEventOff, this.hideTooltip, false);
      }

      // Track removal of targetArray elements from DOM
      this.bindRemovalTracker();
    }

    /**
     * Unbind listeners on target elements
     */

  }, {
    key: 'unbindListener',
    value: function unbindListener() {
      var _this4 = this;

      var _props3 = this.props,
          id = _props3.id,
          globalEventOff = _props3.globalEventOff;

      var targetArray = this.getTargetArray(id);
      targetArray.forEach(function (target) {
        _this4.unbindBasicListener(target);
        if (_this4.isCustomEvent(target)) _this4.customUnbindListener(target);
      });

      if (globalEventOff) window.removeEventListener(globalEventOff, this.hideTooltip);
      this.unbindRemovalTracker();
    }

    /**
     * Invoke this before bind listener and ummount the compont
     * it is necessary to invloke this even when binding custom event
     * so that the tooltip can switch between custom and default listener
     */

  }, {
    key: 'unbindBasicListener',
    value: function unbindBasicListener(target) {
      var isCaptureMode = this.isCapture(target);
      target.removeEventListener('mouseenter', this.showTooltip, isCaptureMode);
      target.removeEventListener('mousemove', this.updateTooltip, isCaptureMode);
      target.removeEventListener('mouseleave', this.hideTooltip, isCaptureMode);
    }

    /**
     * When mouse enter, show the tooltip
     */

  }, {
    key: 'showTooltip',
    value: function showTooltip(e, isGlobalCall) {
      var _this5 = this;

      if (isGlobalCall) {
        // Don't trigger other elements belongs to other ReactTooltip
        var targetArray = this.getTargetArray(this.props.id);
        var isMyElement = targetArray.some(function (ele) {
          return ele === e.currentTarget;
        });
        if (!isMyElement || this.state.show) return;
      }
      // Get the tooltip content
      // calculate in this phrase so that tip width height can be detected
      var _props4 = this.props,
          children = _props4.children,
          multiline = _props4.multiline,
          getContent = _props4.getContent;

      var originTooltip = e.currentTarget.getAttribute('data-tip');
      var isMultiline = e.currentTarget.getAttribute('data-multiline') || multiline || false;

      // Generate tootlip content
      var content = void 0;
      if (getContent) {
        if (Array.isArray(getContent)) {
          content = getContent[0] && getContent[0]();
        } else {
          content = getContent();
        }
      }
      var placeholder = (0, _getTipContent2.default)(originTooltip, children, content, isMultiline);
      var isEmptyTip = typeof placeholder === 'string' && placeholder === '' || placeholder === null;

      // If it is focus event or called by ReactTooltip.show, switch to `solid` effect
      var switchToSolid = e instanceof window.FocusEvent || isGlobalCall;

      // if it need to skip adding hide listener to scroll
      var scrollHide = true;
      if (e.currentTarget.getAttribute('data-scroll-hide')) {
        scrollHide = e.currentTarget.getAttribute('data-scroll-hide') === 'true';
      } else if (this.props.scrollHide != null) {
        scrollHide = this.props.scrollHide;
      }

      // To prevent previously created timers from triggering
      this.clearTimer();

      this.setState({
        placeholder: placeholder,
        isEmptyTip: isEmptyTip,
        place: e.currentTarget.getAttribute('data-place') || this.props.place || 'top',
        type: e.currentTarget.getAttribute('data-type') || this.props.type || 'dark',
        effect: switchToSolid && 'solid' || this.getEffect(e.currentTarget),
        offset: e.currentTarget.getAttribute('data-offset') || this.props.offset || {},
        html: e.currentTarget.getAttribute('data-html') ? e.currentTarget.getAttribute('data-html') === 'true' : this.props.html || false,
        delayShow: e.currentTarget.getAttribute('data-delay-show') || this.props.delayShow || 0,
        delayHide: e.currentTarget.getAttribute('data-delay-hide') || this.props.delayHide || 0,
        border: e.currentTarget.getAttribute('data-border') ? e.currentTarget.getAttribute('data-border') === 'true' : this.props.border || false,
        extraClass: e.currentTarget.getAttribute('data-class') || this.props.class || this.props.className || '',
        disable: e.currentTarget.getAttribute('data-tip-disable') ? e.currentTarget.getAttribute('data-tip-disable') === 'true' : this.props.disable || false
      }, function () {
        if (scrollHide) _this5.addScrollListener(e);
        _this5.updateTooltip(e);

        if (getContent && Array.isArray(getContent)) {
          _this5.intervalUpdateContent = setInterval(function () {
            if (_this5.mount) {
              var _getContent = _this5.props.getContent;

              var _placeholder = (0, _getTipContent2.default)(originTooltip, _getContent[0](), isMultiline);
              var _isEmptyTip = typeof _placeholder === 'string' && _placeholder === '';
              _this5.setState({
                placeholder: _placeholder,
                isEmptyTip: _isEmptyTip
              });
            }
          }, getContent[1]);
        }
      });
    }

    /**
     * When mouse hover, updatetooltip
     */

  }, {
    key: 'updateTooltip',
    value: function updateTooltip(e) {
      var _this6 = this;

      var _state = this.state,
          delayShow = _state.delayShow,
          show = _state.show,
          isEmptyTip = _state.isEmptyTip,
          disable = _state.disable;
      var afterShow = this.props.afterShow;
      var placeholder = this.state.placeholder;

      var delayTime = show ? 0 : parseInt(delayShow, 10);
      var eventTarget = e.currentTarget;

      if (isEmptyTip || disable) return; // if the tooltip is empty, disable the tooltip
      var updateState = function updateState() {
        if (Array.isArray(placeholder) && placeholder.length > 0 || placeholder) {
          (function () {
            var isInvisible = !_this6.state.show;
            _this6.setState({
              currentEvent: e,
              currentTarget: eventTarget,
              show: true
            }, function () {
              _this6.updatePosition();
              if (isInvisible && afterShow) afterShow();
            });
          })();
        }
      };

      clearTimeout(this.delayShowLoop);
      if (delayShow) {
        this.delayShowLoop = setTimeout(updateState, delayTime);
      } else {
        updateState();
      }
    }

    /**
     * When mouse leave, hide tooltip
     */

  }, {
    key: 'hideTooltip',
    value: function hideTooltip(e, hasTarget) {
      var _this7 = this;

      var _state2 = this.state,
          delayHide = _state2.delayHide,
          isEmptyTip = _state2.isEmptyTip,
          disable = _state2.disable;
      var afterHide = this.props.afterHide;

      if (!this.mount) return;
      if (isEmptyTip || disable) return; // if the tooltip is empty, disable the tooltip
      if (hasTarget) {
        // Don't trigger other elements belongs to other ReactTooltip
        var targetArray = this.getTargetArray(this.props.id);
        var isMyElement = targetArray.some(function (ele) {
          return ele === e.currentTarget;
        });
        if (!isMyElement || !this.state.show) return;
      }
      var resetState = function resetState() {
        var isVisible = _this7.state.show;
        _this7.setState({
          show: false
        }, function () {
          _this7.removeScrollListener();
          if (isVisible && afterHide) afterHide();
        });
      };

      this.clearTimer();
      if (delayHide) {
        this.delayHideLoop = setTimeout(resetState, parseInt(delayHide, 10));
      } else {
        resetState();
      }
    }

    /**
     * Add scroll eventlistener when tooltip show
     * automatically hide the tooltip when scrolling
     */

  }, {
    key: 'addScrollListener',
    value: function addScrollListener(e) {
      var isCaptureMode = this.isCapture(e.currentTarget);
      window.addEventListener('scroll', this.hideTooltip, isCaptureMode);
    }
  }, {
    key: 'removeScrollListener',
    value: function removeScrollListener() {
      window.removeEventListener('scroll', this.hideTooltip);
    }

    // Calculation the position

  }, {
    key: 'updatePosition',
    value: function updatePosition() {
      var _this8 = this;

      var _state3 = this.state,
          currentEvent = _state3.currentEvent,
          currentTarget = _state3.currentTarget,
          place = _state3.place,
          effect = _state3.effect,
          offset = _state3.offset;

      var node = _reactDom2.default.findDOMNode(this);
      var result = (0, _getPosition2.default)(currentEvent, currentTarget, node, place, effect, offset);

      if (result.isNewState) {
        // Switch to reverse placement
        return this.setState(result.newState, function () {
          _this8.updatePosition();
        });
      }
      // Set tooltip position
      node.style.left = result.position.left + 'px';
      node.style.top = result.position.top + 'px';
    }

    /**
     * Set style tag in header
     * in this way we can insert default css
     */

  }, {
    key: 'setStyleHeader',
    value: function setStyleHeader() {
      if (!document.getElementsByTagName('head')[0].querySelector('style[id="react-tooltip"]')) {
        var tag = document.createElement('style');
        tag.id = 'react-tooltip';
        tag.innerHTML = _style2.default;
        document.getElementsByTagName('head')[0].appendChild(tag);
      }
    }

    /**
     * CLear all kinds of timeout of interval
     */

  }, {
    key: 'clearTimer',
    value: function clearTimer() {
      clearTimeout(this.delayShowLoop);
      clearTimeout(this.delayHideLoop);
      clearInterval(this.intervalUpdateContent);
    }
  }, {
    key: 'render',
    value: function render() {
      var _state4 = this.state,
          placeholder = _state4.placeholder,
          extraClass = _state4.extraClass,
          html = _state4.html,
          ariaProps = _state4.ariaProps,
          disable = _state4.disable,
          isEmptyTip = _state4.isEmptyTip;

      var tooltipClass = (0, _classnames2.default)('__react_component_tooltip', { 'show': this.state.show && !disable && !isEmptyTip }, { 'border': this.state.border }, { 'place-top': this.state.place === 'top' }, { 'place-bottom': this.state.place === 'bottom' }, { 'place-left': this.state.place === 'left' }, { 'place-right': this.state.place === 'right' }, { 'type-dark': this.state.type === 'dark' }, { 'type-success': this.state.type === 'success' }, { 'type-warning': this.state.type === 'warning' }, { 'type-error': this.state.type === 'error' }, { 'type-info': this.state.type === 'info' }, { 'type-light': this.state.type === 'light' });

      var Wrapper = this.props.wrapper;
      if (ReactTooltip.supportedWrappers.indexOf(Wrapper) < 0) {
        Wrapper = ReactTooltip.defaultProps.wrapper;
      }

      if (html) {
        return _react2.default.createElement(Wrapper, _extends({ className: tooltipClass + ' ' + extraClass
        }, ariaProps, {
          'data-id': 'tooltip',
          dangerouslySetInnerHTML: { __html: placeholder } }));
      } else {
        return _react2.default.createElement(
          Wrapper,
          _extends({ className: tooltipClass + ' ' + extraClass
          }, ariaProps, {
            'data-id': 'tooltip' }),
          placeholder
        );
      }
    }
  }]);

  return ReactTooltip;
}(_react.Component), _class2.propTypes = {
  children: _propTypes2.default.any,
  place: _propTypes2.default.string,
  type: _propTypes2.default.string,
  effect: _propTypes2.default.string,
  offset: _propTypes2.default.object,
  multiline: _propTypes2.default.bool,
  border: _propTypes2.default.bool,
  insecure: _propTypes2.default.bool,
  class: _propTypes2.default.string,
  className: _propTypes2.default.string,
  id: _propTypes2.default.string,
  html: _propTypes2.default.bool,
  delayHide: _propTypes2.default.number,
  delayShow: _propTypes2.default.number,
  event: _propTypes2.default.string,
  eventOff: _propTypes2.default.string,
  watchWindow: _propTypes2.default.bool,
  isCapture: _propTypes2.default.bool,
  globalEventOff: _propTypes2.default.string,
  getContent: _propTypes2.default.any,
  afterShow: _propTypes2.default.func,
  afterHide: _propTypes2.default.func,
  disable: _propTypes2.default.bool,
  scrollHide: _propTypes2.default.bool,
  resizeHide: _propTypes2.default.bool,
  wrapper: _propTypes2.default.string
}, _class2.defaultProps = {
  insecure: true,
  resizeHide: true,
  wrapper: 'div'
}, _class2.supportedWrappers = ['div', 'span'], _temp)) || _class) || _class) || _class) || _class) || _class) || _class;

/* export default not fit for standalone, it will exports {default:...} */


module.exports = ReactTooltip;

/***/ }),

/***/ 1401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SHARE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MILLI_SHARE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MICRO_SHARE; });
/* unused harmony export DENOMINATIONS */
var SHARE = 'share';
var MILLI_SHARE = 'milli-share';
var MICRO_SHARE = 'micro-share';

var DENOMINATIONS = [{
  label: 'Shares',
  value: SHARE
}, {
  label: 'mShares',
  value: MILLI_SHARE
}, {
  label: 'μShares',
  value: MICRO_SHARE
}];

/***/ }),

/***/ 1402:
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(1366),
    root = __webpack_require__(1355);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),

/***/ 1403:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ }),

/***/ 1404:
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),

/***/ 1405:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(1376);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 1406:
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ 1407:
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ 1408:
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(1409)('keys');
var uid = __webpack_require__(1388);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ 1409:
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1357);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),

/***/ 1410:
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ 1411:
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 1412:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(1406);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ 1413:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),

/***/ 1414:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(1604);

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

/***/ 1415:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(1470);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),

/***/ 1416:
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ 1417:
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ 1418:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(1375);
var dPs = __webpack_require__(1612);
var enumBugKeys = __webpack_require__(1410);
var IE_PROTO = __webpack_require__(1408)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(1465)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(1613).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ 1419:
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(1361).f;
var has = __webpack_require__(1363);
var TAG = __webpack_require__(1369)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ 1420:
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(1369);


/***/ }),

/***/ 1421:
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1357);
var core = __webpack_require__(1356);
var LIBRARY = __webpack_require__(1416);
var wksExt = __webpack_require__(1420);
var defineProperty = __webpack_require__(1361).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ 1422:
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(1389);
var createDesc = __webpack_require__(1387);
var toIObject = __webpack_require__(1358);
var toPrimitive = __webpack_require__(1405);
var has = __webpack_require__(1363);
var IE8_DOM_DEFINE = __webpack_require__(1464);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(1362) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ 1423:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(1629);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(1633);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(1470);

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

/***/ 1431:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_tooltip__ = __webpack_require__(1400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_common_components_value_denomination_value_denomination_styles__ = __webpack_require__(1450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_common_components_value_denomination_value_denomination_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_modules_common_components_value_denomination_value_denomination_styles__);






var ValueDenomination = function ValueDenomination(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'span',
    {
      className: __WEBPACK_IMPORTED_MODULE_3_modules_common_components_value_denomination_value_denomination_styles___default.a[p.className]
    },
    p.prefix && !p.hidePrefix && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'span',
      { className: __WEBPACK_IMPORTED_MODULE_3_modules_common_components_value_denomination_value_denomination_styles___default.a.ValueDenomination__prefix },
      p.prefix
    ),
    p.formatted && p.fullPrecision && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'span',
      {
        'data-tip': p.fullPrecision,
        'data-event': 'click focus'
      },
      p.formatted
    ),
    p.formatted && !p.fullPrecision && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'span',
      null,
      p.formatted
    ),
    p.denomination && !p.hideDenomination && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'span',
      { className: __WEBPACK_IMPORTED_MODULE_3_modules_common_components_value_denomination_value_denomination_styles___default.a.ValueDenomination__denomination },
      p.denomination
    ),
    p.postfix && !p.hidePostfix && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'span',
      { className: __WEBPACK_IMPORTED_MODULE_3_modules_common_components_value_denomination_value_denomination_styles___default.a.ValueDenomimntion__postfix },
      p.postfix
    ),
    !p.value && p.value !== 0 && !p.formatted && p.formatted !== '0' && // null/undefined state handler
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'span',
      null,
      '\u2014'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_tooltip___default.a, { type: 'light', effect: 'solid', place: 'top' })
  );
};

ValueDenomination.propTypes = {
  className: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  value: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  formattedValue: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  formatted: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  fullPrecision: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  denomination: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  hidePrefix: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  hidePostfix: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  prefix: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  postfix: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  hideDenomination: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
};

/* harmony default export */ __webpack_exports__["a"] = (ValueDenomination);

/***/ }),

/***/ 1438:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_routes_helpers_make_path__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_routes_helpers_make_query__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_routes_constants_views__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_modules_routes_constants_param_names__ = __webpack_require__(659);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











var MarketLink = function MarketLink(p) {
  var _makeQuery;

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'span',
    null,
    p.id && p.formattedDescription ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["b" /* Link */],
      {
        className: p.className,
        to: {
          pathname: Object(__WEBPACK_IMPORTED_MODULE_3_modules_routes_helpers_make_path__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_5_modules_routes_constants_views__["l" /* MARKET */]),
          search: Object(__WEBPACK_IMPORTED_MODULE_4_modules_routes_helpers_make_query__["a" /* default */])((_makeQuery = {}, _defineProperty(_makeQuery, __WEBPACK_IMPORTED_MODULE_6_modules_routes_constants_param_names__["c" /* MARKET_DESCRIPTION_PARAM_NAME */], p.formattedDescription), _defineProperty(_makeQuery, __WEBPACK_IMPORTED_MODULE_6_modules_routes_constants_param_names__["d" /* MARKET_ID_PARAM_NAME */], p.id), _makeQuery))
        }
      },
      p.children
    ) : p.children
  );
};

MarketLink.propTypes = {
  id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  formattedDescription: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  className: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
};

/* harmony default export */ __webpack_exports__["a"] = (MarketLink);

/***/ }),

/***/ 1439:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (target) {
  /**
   * Hide all tooltip
   * @trigger ReactTooltip.hide()
   */
  target.hide = function (target) {
    dispatchGlobalEvent(_constant2.default.GLOBAL.HIDE, { target: target });
  };

  /**
   * Rebuild all tooltip
   * @trigger ReactTooltip.rebuild()
   */
  target.rebuild = function () {
    dispatchGlobalEvent(_constant2.default.GLOBAL.REBUILD);
  };

  /**
   * Show specific tooltip
   * @trigger ReactTooltip.show()
   */
  target.show = function (target) {
    dispatchGlobalEvent(_constant2.default.GLOBAL.SHOW, { target: target });
  };

  target.prototype.globalRebuild = function () {
    if (this.mount) {
      this.unbindListener();
      this.bindListener();
    }
  };

  target.prototype.globalShow = function (event) {
    if (this.mount) {
      // Create a fake event, specific show will limit the type to `solid`
      // only `float` type cares e.clientX e.clientY
      var e = { currentTarget: event.detail.target };
      this.showTooltip(e, true);
    }
  };

  target.prototype.globalHide = function (event) {
    if (this.mount) {
      var hasTarget = event && event.detail && event.detail.target && true || false;
      this.hideTooltip({ currentTarget: hasTarget && event.detail.target }, hasTarget);
    }
  };
};

var _constant = __webpack_require__(1391);

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dispatchGlobalEvent = function dispatchGlobalEvent(eventName, opts) {
  // Compatibale with IE
  // @see http://stackoverflow.com/questions/26596123/internet-explorer-9-10-11-event-constructor-doesnt-work
  var event = void 0;

  if (typeof window.CustomEvent === 'function') {
    event = new window.CustomEvent(eventName, { detail: opts });
  } else {
    event = document.createEvent('Event');
    event.initEvent(eventName, false, true);
    event.detail = opts;
  }

  window.dispatchEvent(event);
}; /**
    * Static methods for react-tooltip
    */

/***/ }),

/***/ 1440:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (target) {
  target.prototype.bindWindowEvents = function (resizeHide) {
    // ReactTooltip.hide
    window.removeEventListener(_constant2.default.GLOBAL.HIDE, this.globalHide);
    window.addEventListener(_constant2.default.GLOBAL.HIDE, this.globalHide, false);

    // ReactTooltip.rebuild
    window.removeEventListener(_constant2.default.GLOBAL.REBUILD, this.globalRebuild);
    window.addEventListener(_constant2.default.GLOBAL.REBUILD, this.globalRebuild, false);

    // ReactTooltip.show
    window.removeEventListener(_constant2.default.GLOBAL.SHOW, this.globalShow);
    window.addEventListener(_constant2.default.GLOBAL.SHOW, this.globalShow, false);

    // Resize
    if (resizeHide) {
      window.removeEventListener('resize', this.onWindowResize);
      window.addEventListener('resize', this.onWindowResize, false);
    }
  };

  target.prototype.unbindWindowEvents = function () {
    window.removeEventListener(_constant2.default.GLOBAL.HIDE, this.globalHide);
    window.removeEventListener(_constant2.default.GLOBAL.REBUILD, this.globalRebuild);
    window.removeEventListener(_constant2.default.GLOBAL.SHOW, this.globalShow);
    window.removeEventListener('resize', this.onWindowResize);
  };

  /**
   * invoked by resize event of window
   */
  target.prototype.onWindowResize = function () {
    if (!this.mount) return;
    this.hideTooltip();
  };
};

var _constant = __webpack_require__(1391);

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 1441:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (target) {
  target.prototype.isCustomEvent = function (ele) {
    var event = this.state.event;

    return event || !!ele.getAttribute('data-event');
  };

  /* Bind listener for custom event */
  target.prototype.customBindListener = function (ele) {
    var _this = this;

    var _state = this.state,
        event = _state.event,
        eventOff = _state.eventOff;

    var dataEvent = ele.getAttribute('data-event') || event;
    var dataEventOff = ele.getAttribute('data-event-off') || eventOff;

    dataEvent.split(' ').forEach(function (event) {
      ele.removeEventListener(event, customListener);
      customListener = checkStatus.bind(_this, dataEventOff);
      ele.addEventListener(event, customListener, false);
    });
    if (dataEventOff) {
      dataEventOff.split(' ').forEach(function (event) {
        ele.removeEventListener(event, _this.hideTooltip);
        ele.addEventListener(event, _this.hideTooltip, false);
      });
    }
  };

  /* Unbind listener for custom event */
  target.prototype.customUnbindListener = function (ele) {
    var _state2 = this.state,
        event = _state2.event,
        eventOff = _state2.eventOff;

    var dataEvent = event || ele.getAttribute('data-event');
    var dataEventOff = eventOff || ele.getAttribute('data-event-off');

    ele.removeEventListener(dataEvent, customListener);
    if (dataEventOff) ele.removeEventListener(dataEventOff, this.hideTooltip);
  };
};

/**
 * Custom events to control showing and hiding of tooltip
 *
 * @attributes
 * - `event` {String}
 * - `eventOff` {String}
 */

var checkStatus = function checkStatus(dataEventOff, e) {
  var show = this.state.show;
  var id = this.props.id;

  var dataIsCapture = e.currentTarget.getAttribute('data-iscapture');
  var isCapture = dataIsCapture && dataIsCapture === 'true' || this.props.isCapture;
  var currentItem = e.currentTarget.getAttribute('currentItem');

  if (!isCapture) e.stopPropagation();
  if (show && currentItem === 'true') {
    if (!dataEventOff) this.hideTooltip(e);
  } else {
    e.currentTarget.setAttribute('currentItem', 'true');
    setUntargetItems(e.currentTarget, this.getTargetArray(id));
    this.showTooltip(e);
  }
};

var setUntargetItems = function setUntargetItems(currentTarget, targetArray) {
  for (var i = 0; i < targetArray.length; i++) {
    if (currentTarget !== targetArray[i]) {
      targetArray[i].setAttribute('currentItem', 'false');
    } else {
      targetArray[i].setAttribute('currentItem', 'true');
    }
  }
};

var customListener = void 0;

/***/ }),

/***/ 1442:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (target) {
  target.prototype.isCapture = function (currentTarget) {
    var dataIsCapture = currentTarget.getAttribute('data-iscapture');
    return dataIsCapture && dataIsCapture === 'true' || this.props.isCapture || false;
  };
};

/***/ }),

/***/ 1443:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (target) {
  target.prototype.getEffect = function (currentTarget) {
    var dataEffect = currentTarget.getAttribute('data-effect');
    return dataEffect || this.props.effect || 'float';
  };
};

/***/ }),

/***/ 1444:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (target) {
  target.prototype.bindRemovalTracker = function () {
    var _this = this;

    var MutationObserver = getMutationObserverClass();
    if (MutationObserver == null) return;

    var observer = new MutationObserver(function (mutations) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = mutations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var mutation = _step.value;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = mutation.removedNodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var element = _step2.value;

              if (element === _this.state.currentTarget) {
                _this.hideTooltip();
                return;
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    });

    observer.observe(window.document, { childList: true, subtree: true });

    this.removalTracker = observer;
  };

  target.prototype.unbindRemovalTracker = function () {
    if (this.removalTracker) {
      this.removalTracker.disconnect();
      this.removalTracker = null;
    }
  };
};

/**
 * Tracking target removing from DOM.
 * It's nessesary to hide tooltip when it's target disappears.
 * Otherwise, the tooltip would be shown forever until another target
 * is triggered.
 *
 * If MutationObserver is not available, this feature just doesn't work.
 */

// https://hacks.mozilla.org/2012/05/dom-mutationobserver-reacting-to-dom-changes-without-killing-browser-performance/
var getMutationObserverClass = function getMutationObserverClass() {
  return window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
};

/***/ }),

/***/ 1445:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (e, target, node, place, effect, offset) {
  var tipWidth = node.clientWidth;
  var tipHeight = node.clientHeight;

  var _getCurrentOffset = getCurrentOffset(e, target, effect),
      mouseX = _getCurrentOffset.mouseX,
      mouseY = _getCurrentOffset.mouseY;

  var defaultOffset = getDefaultPosition(effect, target.clientWidth, target.clientHeight, tipWidth, tipHeight);

  var _calculateOffset = calculateOffset(offset),
      extraOffset_X = _calculateOffset.extraOffset_X,
      extraOffset_Y = _calculateOffset.extraOffset_Y;

  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;

  var _getParent = getParent(node),
      parentTop = _getParent.parentTop,
      parentLeft = _getParent.parentLeft;

  // Get the edge offset of the tooltip


  var getTipOffsetLeft = function getTipOffsetLeft(place) {
    var offset_X = defaultOffset[place].l;
    return mouseX + offset_X + extraOffset_X;
  };
  var getTipOffsetRight = function getTipOffsetRight(place) {
    var offset_X = defaultOffset[place].r;
    return mouseX + offset_X + extraOffset_X;
  };
  var getTipOffsetTop = function getTipOffsetTop(place) {
    var offset_Y = defaultOffset[place].t;
    return mouseY + offset_Y + extraOffset_Y;
  };
  var getTipOffsetBottom = function getTipOffsetBottom(place) {
    var offset_Y = defaultOffset[place].b;
    return mouseY + offset_Y + extraOffset_Y;
  };

  // Judge if the tooltip has over the window(screen)
  var outsideVertical = function outsideVertical() {
    var result = false;
    var newPlace = void 0;
    if (getTipOffsetTop('left') < 0 && getTipOffsetBottom('left') <= windowHeight && getTipOffsetBottom('bottom') <= windowHeight) {
      result = true;
      newPlace = 'bottom';
    } else if (getTipOffsetBottom('left') > windowHeight && getTipOffsetTop('left') >= 0 && getTipOffsetTop('top') >= 0) {
      result = true;
      newPlace = 'top';
    }
    return { result: result, newPlace: newPlace };
  };
  var outsideLeft = function outsideLeft() {
    var _outsideVertical = outsideVertical(),
        result = _outsideVertical.result,
        newPlace = _outsideVertical.newPlace; // Deal with vertical as first priority


    if (result && outsideHorizontal().result) {
      return { result: false }; // No need to change, if change to vertical will out of space
    }
    if (!result && getTipOffsetLeft('left') < 0 && getTipOffsetRight('right') <= windowWidth) {
      result = true; // If vertical ok, but let out of side and right won't out of side
      newPlace = 'right';
    }
    return { result: result, newPlace: newPlace };
  };
  var outsideRight = function outsideRight() {
    var _outsideVertical2 = outsideVertical(),
        result = _outsideVertical2.result,
        newPlace = _outsideVertical2.newPlace;

    if (result && outsideHorizontal().result) {
      return { result: false }; // No need to change, if change to vertical will out of space
    }
    if (!result && getTipOffsetRight('right') > windowWidth && getTipOffsetLeft('left') >= 0) {
      result = true;
      newPlace = 'left';
    }
    return { result: result, newPlace: newPlace };
  };

  var outsideHorizontal = function outsideHorizontal() {
    var result = false;
    var newPlace = void 0;
    if (getTipOffsetLeft('top') < 0 && getTipOffsetRight('top') <= windowWidth && getTipOffsetRight('right') <= windowWidth) {
      result = true;
      newPlace = 'right';
    } else if (getTipOffsetRight('top') > windowWidth && getTipOffsetLeft('top') >= 0 && getTipOffsetLeft('left') >= 0) {
      result = true;
      newPlace = 'left';
    }
    return { result: result, newPlace: newPlace };
  };
  var outsideTop = function outsideTop() {
    var _outsideHorizontal = outsideHorizontal(),
        result = _outsideHorizontal.result,
        newPlace = _outsideHorizontal.newPlace;

    if (result && outsideVertical().result) {
      return { result: false };
    }
    if (!result && getTipOffsetTop('top') < 0 && getTipOffsetBottom('bottom') <= windowHeight) {
      result = true;
      newPlace = 'bottom';
    }
    return { result: result, newPlace: newPlace };
  };
  var outsideBottom = function outsideBottom() {
    var _outsideHorizontal2 = outsideHorizontal(),
        result = _outsideHorizontal2.result,
        newPlace = _outsideHorizontal2.newPlace;

    if (result && outsideVertical().result) {
      return { result: false };
    }
    if (!result && getTipOffsetBottom('bottom') > windowHeight && getTipOffsetTop('top') >= 0) {
      result = true;
      newPlace = 'top';
    }
    return { result: result, newPlace: newPlace };
  };

  // Return new state to change the placement to the reverse if possible
  var outsideLeftResult = outsideLeft();
  var outsideRightResult = outsideRight();
  var outsideTopResult = outsideTop();
  var outsideBottomResult = outsideBottom();

  if (place === 'left' && outsideLeftResult.result) {
    return {
      isNewState: true,
      newState: { place: outsideLeftResult.newPlace }
    };
  } else if (place === 'right' && outsideRightResult.result) {
    return {
      isNewState: true,
      newState: { place: outsideRightResult.newPlace }
    };
  } else if (place === 'top' && outsideTopResult.result) {
    return {
      isNewState: true,
      newState: { place: outsideTopResult.newPlace }
    };
  } else if (place === 'bottom' && outsideBottomResult.result) {
    return {
      isNewState: true,
      newState: { place: outsideBottomResult.newPlace }
    };
  }

  // Return tooltip offset position
  return {
    isNewState: false,
    position: {
      left: parseInt(getTipOffsetLeft(place) - parentLeft, 10),
      top: parseInt(getTipOffsetTop(place) - parentTop, 10)
    }
  };
};

// Get current mouse offset
var getCurrentOffset = function getCurrentOffset(e, currentTarget, effect) {
  var boundingClientRect = currentTarget.getBoundingClientRect();
  var targetTop = boundingClientRect.top;
  var targetLeft = boundingClientRect.left;
  var targetWidth = currentTarget.clientWidth;
  var targetHeight = currentTarget.clientHeight;

  if (effect === 'float') {
    return {
      mouseX: e.clientX,
      mouseY: e.clientY
    };
  }
  return {
    mouseX: targetLeft + targetWidth / 2,
    mouseY: targetTop + targetHeight / 2
  };
};

// List all possibility of tooltip final offset
// This is useful in judging if it is necessary for tooltip to switch position when out of window
/**
 * Calculate the position of tooltip
 *
 * @params
 * - `e` {Event} the event of current mouse
 * - `target` {Element} the currentTarget of the event
 * - `node` {DOM} the react-tooltip object
 * - `place` {String} top / right / bottom / left
 * - `effect` {String} float / solid
 * - `offset` {Object} the offset to default position
 *
 * @return {Object
 * - `isNewState` {Bool} required
 * - `newState` {Object}
 * - `position` {OBject} {left: {Number}, top: {Number}}
 */
var getDefaultPosition = function getDefaultPosition(effect, targetWidth, targetHeight, tipWidth, tipHeight) {
  var top = void 0;
  var right = void 0;
  var bottom = void 0;
  var left = void 0;
  var disToMouse = 3;
  var triangleHeight = 2;
  var cursorHeight = 12; // Optimize for float bottom only, cause the cursor will hide the tooltip

  if (effect === 'float') {
    top = {
      l: -(tipWidth / 2),
      r: tipWidth / 2,
      t: -(tipHeight + disToMouse + triangleHeight),
      b: -disToMouse
    };
    bottom = {
      l: -(tipWidth / 2),
      r: tipWidth / 2,
      t: disToMouse + cursorHeight,
      b: tipHeight + disToMouse + triangleHeight + cursorHeight
    };
    left = {
      l: -(tipWidth + disToMouse + triangleHeight),
      r: -disToMouse,
      t: -(tipHeight / 2),
      b: tipHeight / 2
    };
    right = {
      l: disToMouse,
      r: tipWidth + disToMouse + triangleHeight,
      t: -(tipHeight / 2),
      b: tipHeight / 2
    };
  } else if (effect === 'solid') {
    top = {
      l: -(tipWidth / 2),
      r: tipWidth / 2,
      t: -(targetHeight / 2 + tipHeight + triangleHeight),
      b: -(targetHeight / 2)
    };
    bottom = {
      l: -(tipWidth / 2),
      r: tipWidth / 2,
      t: targetHeight / 2,
      b: targetHeight / 2 + tipHeight + triangleHeight
    };
    left = {
      l: -(tipWidth + targetWidth / 2 + triangleHeight),
      r: -(targetWidth / 2),
      t: -(tipHeight / 2),
      b: tipHeight / 2
    };
    right = {
      l: targetWidth / 2,
      r: tipWidth + targetWidth / 2 + triangleHeight,
      t: -(tipHeight / 2),
      b: tipHeight / 2
    };
  }

  return { top: top, bottom: bottom, left: left, right: right };
};

// Consider additional offset into position calculation
var calculateOffset = function calculateOffset(offset) {
  var extraOffset_X = 0;
  var extraOffset_Y = 0;

  if (Object.prototype.toString.apply(offset) === '[object String]') {
    offset = JSON.parse(offset.toString().replace(/\'/g, '\"'));
  }
  for (var key in offset) {
    if (key === 'top') {
      extraOffset_Y -= parseInt(offset[key], 10);
    } else if (key === 'bottom') {
      extraOffset_Y += parseInt(offset[key], 10);
    } else if (key === 'left') {
      extraOffset_X -= parseInt(offset[key], 10);
    } else if (key === 'right') {
      extraOffset_X += parseInt(offset[key], 10);
    }
  }

  return { extraOffset_X: extraOffset_X, extraOffset_Y: extraOffset_Y };
};

// Get the offset of the parent elements
var getParent = function getParent(currentTarget) {
  var currentParent = currentTarget;
  while (currentParent) {
    if (window.getComputedStyle(currentParent).getPropertyValue('transform') !== 'none') break;
    currentParent = currentParent.parentElement;
  }

  var parentTop = currentParent && currentParent.getBoundingClientRect().top || 0;
  var parentLeft = currentParent && currentParent.getBoundingClientRect().left || 0;

  return { parentTop: parentTop, parentLeft: parentLeft };
};

/***/ }),

/***/ 1446:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (tip, children, getContent, multiline) {
  if (children) return children;
  if (getContent !== undefined && getContent !== null) return getContent; // getContent can be 0, '', etc.
  if (getContent === null) return null; // Tip not exist and childern is null or undefined

  var regexp = /<br\s*\/?>/;
  if (!multiline || multiline === 'false' || !regexp.test(tip)) {
    // No trim(), so that user can keep their input
    return tip;
  }

  // Multiline tooltip content
  return tip.split(regexp).map(function (d, i) {
    return _react2.default.createElement(
      'span',
      { key: i, className: 'multi-line' },
      d
    );
  });
};

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 1447:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseAria = parseAria;
/**
 * Support aria- and role in ReactTooltip
 *
 * @params props {Object}
 * @return {Object}
 */
function parseAria(props) {
  var ariaObj = {};
  Object.keys(props).filter(function (prop) {
    // aria-xxx and role is acceptable
    return (/(^aria-\w+$|^role$)/.test(prop)
    );
  }).forEach(function (prop) {
    ariaObj[prop] = props[prop];
  });

  return ariaObj;
}

/***/ }),

/***/ 1448:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (nodeList) {
  var length = nodeList.length;
  if (nodeList.hasOwnProperty) {
    return Array.prototype.slice.call(nodeList);
  }
  return new Array(length).fill().map(function (index) {
    return nodeList[index];
  });
};

/***/ }),

/***/ 1449:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = '.__react_component_tooltip{border-radius:3px;display:inline-block;font-size:13px;left:-999em;opacity:0;padding:8px 21px;position:fixed;pointer-events:none;transition:opacity 0.3s ease-out;top:-999em;visibility:hidden;z-index:999}.__react_component_tooltip:before,.__react_component_tooltip:after{content:"";width:0;height:0;position:absolute}.__react_component_tooltip.show{opacity:0.9;margin-top:0px;margin-left:0px;visibility:visible}.__react_component_tooltip.type-dark{color:#fff;background-color:#222}.__react_component_tooltip.type-dark.place-top:after{border-top-color:#222;border-top-style:solid;border-top-width:6px}.__react_component_tooltip.type-dark.place-bottom:after{border-bottom-color:#222;border-bottom-style:solid;border-bottom-width:6px}.__react_component_tooltip.type-dark.place-left:after{border-left-color:#222;border-left-style:solid;border-left-width:6px}.__react_component_tooltip.type-dark.place-right:after{border-right-color:#222;border-right-style:solid;border-right-width:6px}.__react_component_tooltip.type-dark.border{border:1px solid #fff}.__react_component_tooltip.type-dark.border.place-top:before{border-top:8px solid #fff}.__react_component_tooltip.type-dark.border.place-bottom:before{border-bottom:8px solid #fff}.__react_component_tooltip.type-dark.border.place-left:before{border-left:8px solid #fff}.__react_component_tooltip.type-dark.border.place-right:before{border-right:8px solid #fff}.__react_component_tooltip.type-success{color:#fff;background-color:#8DC572}.__react_component_tooltip.type-success.place-top:after{border-top-color:#8DC572;border-top-style:solid;border-top-width:6px}.__react_component_tooltip.type-success.place-bottom:after{border-bottom-color:#8DC572;border-bottom-style:solid;border-bottom-width:6px}.__react_component_tooltip.type-success.place-left:after{border-left-color:#8DC572;border-left-style:solid;border-left-width:6px}.__react_component_tooltip.type-success.place-right:after{border-right-color:#8DC572;border-right-style:solid;border-right-width:6px}.__react_component_tooltip.type-success.border{border:1px solid #fff}.__react_component_tooltip.type-success.border.place-top:before{border-top:8px solid #fff}.__react_component_tooltip.type-success.border.place-bottom:before{border-bottom:8px solid #fff}.__react_component_tooltip.type-success.border.place-left:before{border-left:8px solid #fff}.__react_component_tooltip.type-success.border.place-right:before{border-right:8px solid #fff}.__react_component_tooltip.type-warning{color:#fff;background-color:#F0AD4E}.__react_component_tooltip.type-warning.place-top:after{border-top-color:#F0AD4E;border-top-style:solid;border-top-width:6px}.__react_component_tooltip.type-warning.place-bottom:after{border-bottom-color:#F0AD4E;border-bottom-style:solid;border-bottom-width:6px}.__react_component_tooltip.type-warning.place-left:after{border-left-color:#F0AD4E;border-left-style:solid;border-left-width:6px}.__react_component_tooltip.type-warning.place-right:after{border-right-color:#F0AD4E;border-right-style:solid;border-right-width:6px}.__react_component_tooltip.type-warning.border{border:1px solid #fff}.__react_component_tooltip.type-warning.border.place-top:before{border-top:8px solid #fff}.__react_component_tooltip.type-warning.border.place-bottom:before{border-bottom:8px solid #fff}.__react_component_tooltip.type-warning.border.place-left:before{border-left:8px solid #fff}.__react_component_tooltip.type-warning.border.place-right:before{border-right:8px solid #fff}.__react_component_tooltip.type-error{color:#fff;background-color:#BE6464}.__react_component_tooltip.type-error.place-top:after{border-top-color:#BE6464;border-top-style:solid;border-top-width:6px}.__react_component_tooltip.type-error.place-bottom:after{border-bottom-color:#BE6464;border-bottom-style:solid;border-bottom-width:6px}.__react_component_tooltip.type-error.place-left:after{border-left-color:#BE6464;border-left-style:solid;border-left-width:6px}.__react_component_tooltip.type-error.place-right:after{border-right-color:#BE6464;border-right-style:solid;border-right-width:6px}.__react_component_tooltip.type-error.border{border:1px solid #fff}.__react_component_tooltip.type-error.border.place-top:before{border-top:8px solid #fff}.__react_component_tooltip.type-error.border.place-bottom:before{border-bottom:8px solid #fff}.__react_component_tooltip.type-error.border.place-left:before{border-left:8px solid #fff}.__react_component_tooltip.type-error.border.place-right:before{border-right:8px solid #fff}.__react_component_tooltip.type-info{color:#fff;background-color:#337AB7}.__react_component_tooltip.type-info.place-top:after{border-top-color:#337AB7;border-top-style:solid;border-top-width:6px}.__react_component_tooltip.type-info.place-bottom:after{border-bottom-color:#337AB7;border-bottom-style:solid;border-bottom-width:6px}.__react_component_tooltip.type-info.place-left:after{border-left-color:#337AB7;border-left-style:solid;border-left-width:6px}.__react_component_tooltip.type-info.place-right:after{border-right-color:#337AB7;border-right-style:solid;border-right-width:6px}.__react_component_tooltip.type-info.border{border:1px solid #fff}.__react_component_tooltip.type-info.border.place-top:before{border-top:8px solid #fff}.__react_component_tooltip.type-info.border.place-bottom:before{border-bottom:8px solid #fff}.__react_component_tooltip.type-info.border.place-left:before{border-left:8px solid #fff}.__react_component_tooltip.type-info.border.place-right:before{border-right:8px solid #fff}.__react_component_tooltip.type-light{color:#222;background-color:#fff}.__react_component_tooltip.type-light.place-top:after{border-top-color:#fff;border-top-style:solid;border-top-width:6px}.__react_component_tooltip.type-light.place-bottom:after{border-bottom-color:#fff;border-bottom-style:solid;border-bottom-width:6px}.__react_component_tooltip.type-light.place-left:after{border-left-color:#fff;border-left-style:solid;border-left-width:6px}.__react_component_tooltip.type-light.place-right:after{border-right-color:#fff;border-right-style:solid;border-right-width:6px}.__react_component_tooltip.type-light.border{border:1px solid #222}.__react_component_tooltip.type-light.border.place-top:before{border-top:8px solid #222}.__react_component_tooltip.type-light.border.place-bottom:before{border-bottom:8px solid #222}.__react_component_tooltip.type-light.border.place-left:before{border-left:8px solid #222}.__react_component_tooltip.type-light.border.place-right:before{border-right:8px solid #222}.__react_component_tooltip.place-top{margin-top:-10px}.__react_component_tooltip.place-top:before{border-left:10px solid transparent;border-right:10px solid transparent;bottom:-8px;left:50%;margin-left:-10px}.__react_component_tooltip.place-top:after{border-left:8px solid transparent;border-right:8px solid transparent;bottom:-6px;left:50%;margin-left:-8px}.__react_component_tooltip.place-bottom{margin-top:10px}.__react_component_tooltip.place-bottom:before{border-left:10px solid transparent;border-right:10px solid transparent;top:-8px;left:50%;margin-left:-10px}.__react_component_tooltip.place-bottom:after{border-left:8px solid transparent;border-right:8px solid transparent;top:-6px;left:50%;margin-left:-8px}.__react_component_tooltip.place-left{margin-left:-10px}.__react_component_tooltip.place-left:before{border-top:6px solid transparent;border-bottom:6px solid transparent;right:-8px;top:50%;margin-top:-5px}.__react_component_tooltip.place-left:after{border-top:5px solid transparent;border-bottom:5px solid transparent;right:-6px;top:50%;margin-top:-4px}.__react_component_tooltip.place-right{margin-left:10px}.__react_component_tooltip.place-right:before{border-top:6px solid transparent;border-bottom:6px solid transparent;left:-8px;top:50%;margin-top:-5px}.__react_component_tooltip.place-right:after{border-top:5px solid transparent;border-bottom:5px solid transparent;left:-6px;top:50%;margin-top:-4px}.__react_component_tooltip .multi-line{display:block;padding:2px 0px;text-align:center}';

/***/ }),

/***/ 1450:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1451);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1334)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./value-denomination.styles.less", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./value-denomination.styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1451:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(657)(undefined);
// imports


// module
exports.push([module.i, "._1WwoeSzWL2O-l5F96R_3kC{margin-left:.2em}._1VXZlgmCAOmK6P6Qq9vmUs{margin-left:.3em}.TTWXFin1Bp6rJRu8mkJrE{margin-right:.3em}", ""]);

// exports
exports.locals = {
	"ValueDenomination__denomination": "_1WwoeSzWL2O-l5F96R_3kC",
	"ValueDenomination__postfix": "_1VXZlgmCAOmK6P6Qq9vmUs",
	"ValueDenomination__prefix": "TTWXFin1Bp6rJRu8mkJrE"
};

/***/ }),

/***/ 1452:
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),

/***/ 1453:
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(1373),
    isObject = __webpack_require__(1384);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),

/***/ 1454:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(1380);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ 1455:
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ 1456:
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),

/***/ 1457:
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(1545),
    mapCacheDelete = __webpack_require__(1552),
    mapCacheGet = __webpack_require__(1554),
    mapCacheHas = __webpack_require__(1555),
    mapCacheSet = __webpack_require__(1556);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),

/***/ 1458:
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(1557),
    arraySome = __webpack_require__(1560),
    cacheHas = __webpack_require__(1561);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;


/***/ }),

/***/ 1459:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(1355),
    stubFalse = __webpack_require__(1578);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(65)(module)))

/***/ }),

/***/ 1460:
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(1580),
    baseUnary = __webpack_require__(1581),
    nodeUtil = __webpack_require__(1582);

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),

/***/ 1461:
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),

/***/ 1462:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(1596);

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

/***/ 1463:
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(1599);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ 1464:
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(1362) && !__webpack_require__(1368)(function () {
  return Object.defineProperty(__webpack_require__(1465)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ 1465:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1376);
var document = __webpack_require__(1357).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ 1466:
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(1363);
var toIObject = __webpack_require__(1358);
var arrayIndexOf = __webpack_require__(1601)(false);
var IE_PROTO = __webpack_require__(1408)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ 1467:
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(1468);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ 1468:
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ 1469:
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

/***/ 1470:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(1607);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(1618);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),

/***/ 1471:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(1416);
var $export = __webpack_require__(1360);
var redefine = __webpack_require__(1472);
var hide = __webpack_require__(1367);
var has = __webpack_require__(1363);
var Iterators = __webpack_require__(1417);
var $iterCreate = __webpack_require__(1611);
var setToStringTag = __webpack_require__(1419);
var getPrototypeOf = __webpack_require__(1473);
var ITERATOR = __webpack_require__(1369)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ 1472:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1367);


/***/ }),

/***/ 1473:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(1363);
var toObject = __webpack_require__(1412);
var IE_PROTO = __webpack_require__(1408)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ 1474:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(1466);
var hiddenKeys = __webpack_require__(1410).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ 1475:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(1415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_get__ = __webpack_require__(1636);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(1423);
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

/***/ 1476:
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(1360);
var core = __webpack_require__(1356);
var fails = __webpack_require__(1368);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ 1477:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return defaultProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return propTypes; });
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

/***/ 1495:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_market_components_market_preview_market_preview__ = __webpack_require__(1510);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_common_components_paginator_paginator__ = __webpack_require__(1393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_common_components_null_state_message__ = __webpack_require__(664);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_utils_get_value__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash_isEqual__ = __webpack_require__(1496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash_isEqual___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_lodash_isEqual__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_utils_debounce__ = __webpack_require__(326);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }













var MarketsList = function (_Component) {
  _inherits(MarketsList, _Component);

  function MarketsList(props) {
    _classCallCheck(this, MarketsList);

    var _this = _possibleConstructorReturn(this, (MarketsList.__proto__ || Object.getPrototypeOf(MarketsList)).call(this, props));

    _this.state = {
      lowerBound: null,
      boundedLength: null,
      marketIDsMissingInfo: [] // This is ONLY the currently displayed markets that are missing info
    };

    _this.setSegment = _this.setSegment.bind(_this);
    _this.setMarketIDsMissingInfo = _this.setMarketIDsMissingInfo.bind(_this);
    _this.loadMarketsInfo = Object(__WEBPACK_IMPORTED_MODULE_7_utils_debounce__["a" /* default */])(_this.loadMarketsInfo.bind(_this));
    return _this;
  }

  _createClass(MarketsList, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (this.state.lowerBound !== nextState.lowerBound || this.state.boundedLength !== nextState.boundedLength || !__WEBPACK_IMPORTED_MODULE_6_lodash_isEqual___default()(this.props.filteredMarkets, nextProps.filteredMarkets)) {
        this.setMarketIDsMissingInfo(nextProps.markets, nextProps.filteredMarkets, nextState.lowerBound, nextState.boundedLength);
      }

      if (!__WEBPACK_IMPORTED_MODULE_6_lodash_isEqual___default()(this.state.marketIDsMissingInfo, nextState.marketIDsMissingInfo)) this.loadMarketsInfo(nextState.marketIDsMissingInfo);
    }
  }, {
    key: 'setSegment',
    value: function setSegment(lowerBound, upperBound, boundedLength) {
      this.setState({ lowerBound: lowerBound, boundedLength: boundedLength });
    }
  }, {
    key: 'setMarketIDsMissingInfo',
    value: function setMarketIDsMissingInfo(markets, filteredMarkets, lowerBound, boundedLength) {
      var marketIDsMissingInfo = [];
      if (filteredMarkets.length && boundedLength) {
        [].concat(_toConsumableArray(Array(boundedLength))).forEach(function (unused, i) {
          var item = filteredMarkets[lowerBound - 1 + i];
          var market = markets[item];
          if (market && !market.isLoadedMarketInfo && !market.isMarketLoading) marketIDsMissingInfo.push(market.id);
        });
      }

      this.setState({ marketIDsMissingInfo: marketIDsMissingInfo });
    }
  }, {
    key: 'loadMarketsInfo',
    value: function loadMarketsInfo(marketIDs) {
      this.props.loadMarketsInfo(marketIDs);
    }

    // NOTE -- You'll notice the odd method used for rendering the previews, this is done for optimization reasons

  }, {
    key: 'render',
    value: function render() {
      var p = this.props;
      var s = this.state;

      var marketsLength = p.filteredMarkets.length;
      var shareDenominations = Object(__WEBPACK_IMPORTED_MODULE_5_utils_get_value__["a" /* default */])(p, 'scalarShareDenomination.denominations');

      // console.log('filteredMarkets -- ', p.filteredMarkets)

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'article',
        { className: 'markets-list' },
        marketsLength && s.boundedLength ? [].concat(_toConsumableArray(Array(s.boundedLength))).map(function (unused, i) {
          var item = p.filteredMarkets[s.lowerBound - 1 + i];
          var market = p.markets[item];
          var selectedShareDenomination = market ? Object(__WEBPACK_IMPORTED_MODULE_5_utils_get_value__["a" /* default */])(p, 'scalarShareDenomination.markets.' + market.id) : null;

          if (market && market.id) {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_modules_market_components_market_preview_market_preview__["a" /* default */], _extends({}, market, {
              key: market.id + ' - ' + market.outcomes,
              isLogged: p.isLogged,
              selectedShareDenomination: selectedShareDenomination,
              shareDenominations: shareDenominations,
              toggleFavorite: p.toggleFavorite,
              location: p.location,
              history: p.history
            }));
          }

          return null;
        }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_modules_common_components_null_state_message__["a" /* default */], { message: 'No Markets Available' }),
        !!marketsLength && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_common_components_paginator_paginator__["a" /* default */], {
          itemsLength: marketsLength,
          itemsPerPage: 10,
          location: p.location,
          history: p.history,
          setSegment: this.setSegment
        })
      );
    }
  }]);

  return MarketsList;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

MarketsList.propTypes = {
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  isLogged: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  markets: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired,
  filteredMarkets: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired,
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  scalarShareDenomination: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  toggleFavorite: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  loadMarketsInfo: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["a"] = (MarketsList);

/***/ }),

/***/ 1496:
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqual = __webpack_require__(1528);

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

module.exports = isEqual;


/***/ }),

/***/ 1497:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_src_store__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_market_actions_update_scalar_market_share_denomination__ = __webpack_require__(502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_market_constants_share_denominations__ = __webpack_require__(1401);





/* harmony default export */ __webpack_exports__["a"] = (function () {
  var _store$getState = __WEBPACK_IMPORTED_MODULE_0_src_store__["a" /* default */].getState(),
      scalarMarketsShareDenomination = _store$getState.scalarMarketsShareDenomination;

  return {
    denominations: denominations,
    markets: scalarMarketsShareDenomination,
    updateSelectedShareDenomination: selectShareDenomination
  };
});

var denominations = [{
  label: 'Shares',
  value: __WEBPACK_IMPORTED_MODULE_2_modules_market_constants_share_denominations__["c" /* SHARE */]
}, {
  label: 'mShares',
  value: __WEBPACK_IMPORTED_MODULE_2_modules_market_constants_share_denominations__["b" /* MILLI_SHARE */]
}, {
  label: 'μShares',
  value: __WEBPACK_IMPORTED_MODULE_2_modules_market_constants_share_denominations__["a" /* MICRO_SHARE */]
}];

function selectShareDenomination(marketID, denomination) {
  __WEBPACK_IMPORTED_MODULE_0_src_store__["a" /* default */].dispatch(Object(__WEBPACK_IMPORTED_MODULE_1_modules_market_actions_update_scalar_market_share_denomination__["b" /* updateScalarMarketShareDenomination */])(marketID, denomination));
}

/***/ }),

/***/ 1507:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_bignumber_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_bignumber_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_bignumber_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_common_components_icons_icons__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_utils_debounce__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_modules_common_components_input_input_styles__ = __webpack_require__(1508);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_modules_common_components_input_input_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_modules_common_components_input_input_styles__);
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
    _this.timeoutVisibleHiddenContent = Object(__WEBPACK_IMPORTED_MODULE_5_utils_debounce__["a" /* default */])(_this.timeoutVisibleHiddenContent.bind(_this), 1200);
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
        isSearch && __WEBPACK_IMPORTED_MODULE_4_modules_common_components_icons_icons__["n" /* IconSearch */],
        !p.isMultiline && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', _extends({}, p, {
          className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('box', p.className, { 'search-input': p.isSearch }),
          type: p.type === 'password' && s.isHiddenContentVisible ? 'text' : p.type,
          value: s.value,
          onChange: this.handleOnChange,
          onBlur: this.handleOnBlur,
          placeholder: p.placeholder
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
            className: 'button--text-only',
            onClick: this.handleClear
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-close' })
        ),
        canToggleVisibility && s.value && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'button',
          {
            type: 'button',
            className: 'button--text-only',
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
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()(__WEBPACK_IMPORTED_MODULE_6_modules_common_components_input_input_styles___default.a.fa, __WEBPACK_IMPORTED_MODULE_6_modules_common_components_input_input_styles___default.a['fa-angle-up']) })
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
  isSearch: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  placeholder: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
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

/***/ 1508:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1509);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1334)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./input.styles.less", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./input.styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1509:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(657)(undefined);
// imports


// module
exports.push([module.i, "@font-face{font-family:FontAwesome;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1335) + ") format(\"woff\")}@font-face{font-family:icofont;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1336) + ") format(\"woff\")}._2PtPpisHoL2nH0_FsIG_1h{border:1px solid #736e89;display:flex}._2PtPpisHoL2nH0_FsIG_1h,._2PtPpisHoL2nH0_FsIG_1h ._1q3aLfNZLFNFZSaOzhjH8g,._2PtPpisHoL2nH0_FsIG_1h button{background-color:#f6f6f8}._2PtPpisHoL2nH0_FsIG_1h input{border:none;display:flex;flex:1}._2PtPpisHoL2nH0_FsIG_1h .um18Ie9ntxm5ZOfiG7SEK{align-items:center;background-color:initial;display:flex;padding:0 1em}._2PtPpisHoL2nH0_FsIG_1h._29qBWWBIH9VsfclQwSDrwo ._3QOVCQY7woa2ZcUx6HqYwA{padding-right:2em}._2PtPpisHoL2nH0_FsIG_1h._9d3w_lgFLLzYZxDCkltfD{border-color:#fd223c}._2PtPpisHoL2nH0_FsIG_1h._3aPrNFSyeUpiORPma1vGy2{display:flex}._2PtPpisHoL2nH0_FsIG_1h._3aPrNFSyeUpiORPma1vGy2 ._3QOVCQY7woa2ZcUx6HqYwA{width:80%}._2PtPpisHoL2nH0_FsIG_1h._3aPrNFSyeUpiORPma1vGy2 input[type=number]{-moz-appearance:textfield;-webkit-appearance:textfield;appearance:textfield}._2PtPpisHoL2nH0_FsIG_1h._3aPrNFSyeUpiORPma1vGy2 input[type=number]::-webkit-inner-spin-button,._2PtPpisHoL2nH0_FsIG_1h._3aPrNFSyeUpiORPma1vGy2 input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;appearance:none;margin:0}._2PtPpisHoL2nH0_FsIG_1h._3aPrNFSyeUpiORPma1vGy2 input{flex:1 1 auto}._2PtPpisHoL2nH0_FsIG_1h._3aPrNFSyeUpiORPma1vGy2 ._2RfwXP1mLu2Kj_jYaICmgt{border-left:1px solid #736e89;display:flex;flex-direction:column}._2PtPpisHoL2nH0_FsIG_1h._3aPrNFSyeUpiORPma1vGy2 ._2RfwXP1mLu2Kj_jYaICmgt button{cursor:default;flex:1;padding:0 .2em}._2PtPpisHoL2nH0_FsIG_1h._3aPrNFSyeUpiORPma1vGy2 ._2RfwXP1mLu2Kj_jYaICmgt button:active{background-color:#736e89}._2PtPpisHoL2nH0_FsIG_1h ._1q3aLfNZLFNFZSaOzhjH8g{padding:1em 1.5em}._2PtPpisHoL2nH0_FsIG_1h ._1q3aLfNZLFNFZSaOzhjH8g ._10NKTc1-PGXsoP13zdKgcs{color:#28e071}._2PtPpisHoL2nH0_FsIG_1h ._1q3aLfNZLFNFZSaOzhjH8g ._2X-FI05kgx6IR5zqibFSmV{color:#d0021b}._2PtPpisHoL2nH0_FsIG_1h ._3QOVCQY7woa2ZcUx6HqYwA{font-size:inherit;padding:1em;width:100%}._2PtPpisHoL2nH0_FsIG_1h ._3QOVCQY7woa2ZcUx6HqYwA._1jUs9ldDe5DeB_hn7T5vSV{padding-left:0}", ""]);

// exports
exports.locals = {
	"input": "_2PtPpisHoL2nH0_FsIG_1h",
	"input-value-comparison": "_1q3aLfNZLFNFZSaOzhjH8g",
	"fa-search": "um18Ie9ntxm5ZOfiG7SEK",
	"clearable": "_29qBWWBIH9VsfclQwSDrwo",
	"box": "_3QOVCQY7woa2ZcUx6HqYwA",
	"input-error": "_9d3w_lgFLLzYZxDCkltfD",
	"is-incrementable": "_3aPrNFSyeUpiORPma1vGy2",
	"value-incrementers": "_2RfwXP1mLu2Kj_jYaICmgt",
	"input-does-match": "_10NKTc1-PGXsoP13zdKgcs",
	"input-does-not-match": "_2X-FI05kgx6IR5zqibFSmV",
	"search-input": "_1jUs9ldDe5DeB_hn7T5vSV"
};

/***/ }),

/***/ 1510:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_market_components_market_basics_market_basics__ = __webpack_require__(1511);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_market_components_market_properties_market_properties__ = __webpack_require__(1521);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_market_components_common_market_common_styles__ = __webpack_require__(1381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_market_components_common_market_common_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_modules_market_components_common_market_common_styles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_market_components_market_preview_market_preview_styles__ = __webpack_require__(1526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_market_components_market_preview_market_preview_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_modules_market_components_market_preview_market_preview_styles__);









var MarketPreview = function MarketPreview(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'article',
    { className: __WEBPACK_IMPORTED_MODULE_4_modules_market_components_common_market_common_styles___default.a.MarketCommon__container },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_modules_market_components_market_basics_market_basics__["a" /* default */], p),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: __WEBPACK_IMPORTED_MODULE_5_modules_market_components_market_preview_market_preview_styles___default.a.MarketPreview__footer },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_market_components_market_properties_market_properties__["a" /* default */], p)
    )
  );
};

MarketPreview.propTypes = {
  isLogged: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  toggleFavorite: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

MarketPreview.propTypes = {
  className: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  description: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  outcomes: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array,
  isOpen: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  isFavorite: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  isPendingReport: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  endDate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  tradingFeePercent: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  volume: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  tags: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array,
  onClickToggleFavorite: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

/* harmony default export */ __webpack_exports__["a"] = (MarketPreview);

/***/ }),

/***/ 1511:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_market_components_market_outcomes_binary_scalar_market_outcomes_binary_scalar__ = __webpack_require__(1512);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_market_components_market_outcomes_categorical_market_outcomes_categorical__ = __webpack_require__(1515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_link_market_link__ = __webpack_require__(1438);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_market_components_market_status_icon_market_status_icon__ = __webpack_require__(1396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_modules_routes_helpers_toggle_tag__ = __webpack_require__(1518);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_modules_markets_constants_market_types__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_modules_market_components_common_market_common_styles__ = __webpack_require__(1381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_modules_market_components_common_market_common_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_modules_market_components_common_market_common_styles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_modules_market_components_market_basics_market_basics_styles__ = __webpack_require__(1519);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_modules_market_components_market_basics_market_basics_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_modules_market_components_market_basics_market_basics_styles__);
/* eslint react/no-array-index-key: 0 */ // It's OK in this specific instance as order remains the same
















var MarketBasics = function MarketBasics(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'article',
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: __WEBPACK_IMPORTED_MODULE_8_modules_market_components_common_market_common_styles___default.a.MarketCommon__topcontent },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_8_modules_market_components_common_market_common_styles___default.a.MarketCommon__header },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'ul',
          { className: __WEBPACK_IMPORTED_MODULE_9_modules_market_components_market_basics_market_basics_styles___default.a.MarketBasics__tags },
          p.tags.length > 1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'li',
            null,
            'Tags'
          ),
          (p.tags || []).map(function (tag, i) {
            return i !== 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'li',
              { key: i },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'button',
                { onClick: function onClick() {
                    return Object(__WEBPACK_IMPORTED_MODULE_6_modules_routes_helpers_toggle_tag__["a" /* default */])(tag, p.location, p.history);
                  } },
                tag
              )
            );
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_modules_market_components_market_status_icon_market_status_icon__["a" /* default */], { isOpen: p.isOpen, isReported: p.isReported })
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'h1',
        { className: __WEBPACK_IMPORTED_MODULE_8_modules_market_components_common_market_common_styles___default.a.MarketCommon__description },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_link_market_link__["a" /* default */],
          {
            id: p.id,
            formattedDescription: p.formattedDescription
          },
          p.description
        )
      ),
      (p.type === __WEBPACK_IMPORTED_MODULE_7_modules_markets_constants_market_types__["a" /* BINARY */] || p.type === __WEBPACK_IMPORTED_MODULE_7_modules_markets_constants_market_types__["c" /* SCALAR */]) && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_modules_market_components_market_outcomes_binary_scalar_market_outcomes_binary_scalar__["a" /* default */], { outcomes: p.outcomes, min: p.minValue, max: p.maxValue, type: p.type }),
      p.type === 'categorical' && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_market_components_market_outcomes_categorical_market_outcomes_categorical__["a" /* default */], { outcomes: p.outcomes })
    )
  );
};

MarketBasics.propTypes = {
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  isLogged: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  toggleFavorite: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

/* harmony default export */ __webpack_exports__["a"] = (MarketBasics);

/***/ }),

/***/ 1512:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_markets_constants_market_types__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_utils_get_value__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_outcomes_binary_scalar_market_outcomes_binary_scalar_styles__ = __webpack_require__(1513);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_outcomes_binary_scalar_market_outcomes_binary_scalar_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_outcomes_binary_scalar_market_outcomes_binary_scalar_styles__);









var MarketOutcomes = function MarketOutcomes(p) {
  var calculatePosition = function calculatePosition() {
    var lastPrice = Object(__WEBPACK_IMPORTED_MODULE_3_utils_get_value__["a" /* default */])(p.outcomes[0], 'lastPricePercent.full');

    if (p.type === __WEBPACK_IMPORTED_MODULE_2_modules_markets_constants_market_types__["a" /* BINARY */]) {
      return lastPrice;
    }

    return lastPrice / (p.max - p.min) * 100 + '%';
  };

  var currentValuePosition = {
    left: calculatePosition()
  };

  var minValue = p.min && p.type !== __WEBPACK_IMPORTED_MODULE_2_modules_markets_constants_market_types__["a" /* BINARY */] ? p.min : '0%';
  var maxValue = p.min && p.type !== __WEBPACK_IMPORTED_MODULE_2_modules_markets_constants_market_types__["a" /* BINARY */] ? p.max : '100%';

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_outcomes_binary_scalar_market_outcomes_binary_scalar_styles___default.a.MarketOutcomes },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_outcomes_binary_scalar_market_outcomes_binary_scalar_styles___default.a.MarketOutcomes__range }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'span',
      { className: __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_outcomes_binary_scalar_market_outcomes_binary_scalar_styles___default.a.MarketOutcomes__min },
      minValue
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'span',
      { className: __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_outcomes_binary_scalar_market_outcomes_binary_scalar_styles___default.a.MarketOutcomes__max },
      maxValue
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'span',
      {
        className: __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_outcomes_binary_scalar_market_outcomes_binary_scalar_styles___default.a.MarketOutcomes__current,
        style: currentValuePosition
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        { className: __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_outcomes_binary_scalar_market_outcomes_binary_scalar_styles___default.a['MarketOutcomes__current-value'] },
        Object(__WEBPACK_IMPORTED_MODULE_3_utils_get_value__["a" /* default */])(p.outcomes[0], 'lastPricePercent.formatted')
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        { className: __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_outcomes_binary_scalar_market_outcomes_binary_scalar_styles___default.a['MarketOutcomes__current-denomination'] },
        Object(__WEBPACK_IMPORTED_MODULE_3_utils_get_value__["a" /* default */])(p.outcomes[0], 'lastPricePercent.denomination')
      )
    )
  );
};

MarketOutcomes.propTypes = {
  outcomes: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired,
  max: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  min: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  type: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
};

/* harmony default export */ __webpack_exports__["a"] = (MarketOutcomes);

/***/ }),

/***/ 1513:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1514);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1334)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./market-outcomes-binary-scalar.styles.less", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./market-outcomes-binary-scalar.styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1514:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(657)(undefined);
// imports


// module
exports.push([module.i, "@font-face{font-family:FontAwesome;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1335) + ") format(\"woff\")}@font-face{font-family:icofont;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1336) + ") format(\"woff\")}._1AZDmTLtuOZO2tP6wp9_Pr,._2qMgRI3ASueGIFWaf8o37t{font-size:.875rem;font-weight:400;line-height:.875rem}.ILmNmk9CuwTp8K6vOsIqZ{font-size:1.5rem;line-height:1.5rem}._2nl45Ul8sQJUS6GlMy3ULQ{padding-bottom:1.7rem;position:relative}.ILmNmk9CuwTp8K6vOsIqZ{-webkit-transform:translateX(-50%);left:50%;padding-top:1.1em;position:absolute;top:0;transform:translateX(-50%)}._2Chfwx0c4dAUF60y_RyLlC{position:absolute}._2GiF3gy_G8yRHc88nONDPP:before{background-color:#412468;content:\"\";height:.9375rem;left:0;margin:auto;position:absolute;right:0;top:0;width:1px}._1AZDmTLtuOZO2tP6wp9_Pr,._2qMgRI3ASueGIFWaf8o37t{color:#a7a2b2;left:0;padding-top:1px;position:absolute}._1AZDmTLtuOZO2tP6wp9_Pr{left:auto;right:0}.zosR7T3aPFaV8gZbt9smw{border-bottom:1px solid #412468;padding-top:.875rem;position:relative}.zosR7T3aPFaV8gZbt9smw:after,.zosR7T3aPFaV8gZbt9smw:before{background-color:#412468;bottom:0;content:\"\";height:.5rem;left:0;position:absolute;width:1px}.zosR7T3aPFaV8gZbt9smw:after{left:auto;right:0}", ""]);

// exports
exports.locals = {
	"MarketOutcomes__max": "_1AZDmTLtuOZO2tP6wp9_Pr",
	"MarketOutcomes__min": "_2qMgRI3ASueGIFWaf8o37t",
	"MarketOutcomes__current": "ILmNmk9CuwTp8K6vOsIqZ",
	"MarketOutcomes": "_2nl45Ul8sQJUS6GlMy3ULQ",
	"MarketOutcomes__current-denomination": "_2Chfwx0c4dAUF60y_RyLlC",
	"MarketOutcomes__current-value": "_2GiF3gy_G8yRHc88nONDPP",
	"MarketOutcomes__range": "zosR7T3aPFaV8gZbt9smw"
};

/***/ }),

/***/ 1515:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_utils_get_value__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_outcomes_categorical_market_outcomes_categorical_styles__ = __webpack_require__(1516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_outcomes_categorical_market_outcomes_categorical_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_outcomes_categorical_market_outcomes_categorical_styles__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var CategoricalOutcome = function CategoricalOutcome(_ref) {
  var className = _ref.className,
      outcome = _ref.outcome;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: className || __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_outcomes_categorical_market_outcomes_categorical_styles___default.a.MarketOutcomesCategorical__outcome },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'span',
      { className: __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_outcomes_categorical_market_outcomes_categorical_styles___default.a['MarketOutcomesCategorical__outcome-name'] },
      outcome.name
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'span',
      { className: __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_outcomes_categorical_market_outcomes_categorical_styles___default.a['MarketOutcomesCategorical__outcome-value'] },
      Object(__WEBPACK_IMPORTED_MODULE_3_utils_get_value__["a" /* default */])(outcome, 'lastPricePercent.full')
    )
  );
};

var MarketOutcomesCategorical = function (_Component) {
  _inherits(MarketOutcomesCategorical, _Component);

  function MarketOutcomesCategorical(props) {
    _classCallCheck(this, MarketOutcomesCategorical);

    var _this = _possibleConstructorReturn(this, (MarketOutcomesCategorical.__proto__ || Object.getPrototypeOf(MarketOutcomesCategorical)).call(this, props));

    _this.state = {
      outcomeWrapperHeight: 0,
      isOpen: false
    };

    _this.showMore = _this.showMore.bind(_this);
    return _this;
  }

  _createClass(MarketOutcomesCategorical, [{
    key: 'showMore',
    value: function showMore() {
      var outcomeWrapperHeight = this.state.isOpen ? 0 : this.outcomeTable.clientHeight + 'px';

      this.setState({
        outcomeWrapperHeight: outcomeWrapperHeight,
        isOpen: !this.state.isOpen
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var outcomes = this.props.outcomes;

      var totalOutcomes = outcomes.length;

      var displayShowMore = totalOutcomes > 3;
      var showMoreText = this.state.isOpen ? '- ' + (totalOutcomes - 3) + ' less' : '+ ' + (totalOutcomes - 3) + ' more';

      var outcomeWrapperStyle = {
        minHeight: this.state.outcomeWrapperHeight
      };

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        {
          className: __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_outcomes_categorical_market_outcomes_categorical_styles___default.a.MarketOutcomesCategorical,
          style: outcomeWrapperStyle
        },
        outcomes.length > 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(CategoricalOutcome, {
          className: __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_outcomes_categorical_market_outcomes_categorical_styles___default.a['MarketOutcomesCategorical__height-sentinel'],
          outcome: outcomes[0]
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          {
            className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()(__WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_outcomes_categorical_market_outcomes_categorical_styles___default.a['MarketOutcomesCategorical__outcomes-container'], _defineProperty({}, '' + __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_outcomes_categorical_market_outcomes_categorical_styles___default.a['show-more'], displayShowMore))
          },
          displayShowMore && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'button',
            {
              className: __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_outcomes_categorical_market_outcomes_categorical_styles___default.a['MarketOutcomesCategorical__show-more'],
              onClick: this.showMore
            },
            showMoreText
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            {
              ref: function ref(outcomeTable) {
                _this2.outcomeTable = outcomeTable;
              },
              className: __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_outcomes_categorical_market_outcomes_categorical_styles___default.a.MarketOutcomesCategorical__outcomes
            },
            outcomes.length > 0 && outcomes.map(function (outcome) {
              return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(CategoricalOutcome, {
                key: outcome.id,
                outcome: outcome
              });
            })
          )
        )
      );
    }
  }]);

  return MarketOutcomesCategorical;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

MarketOutcomesCategorical.propTypes = {
  outcomes: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired
};

CategoricalOutcome.propTypes = {
  outcome: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  className: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
};

/* harmony default export */ __webpack_exports__["a"] = (MarketOutcomesCategorical);

/***/ }),

/***/ 1516:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1517);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1334)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./market-outcomes-categorical.styles.less", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./market-outcomes-categorical.styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1517:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(657)(undefined);
// imports


// module
exports.push([module.i, "@font-face{font-family:FontAwesome;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1335) + ") format(\"woff\")}@font-face{font-family:icofont;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1336) + ") format(\"woff\")}._2PZqNhcMFdRqcqGJRVHVlV{font-size:.875rem;font-weight:400;line-height:.875rem}._3oJbN49951yJzQ81ACalRH{font-size:1.5rem;line-height:1.5rem}._1OctR82uY5XTiDswe2DqCL{min-height:0;overflow:hidden;position:relative;transition:min-height .3s ease}.tEgpZeJWqog4Fyan6asnb{display:inline-block;visibility:hidden}._3tAmliKIBijtyVRSUDaF8Y{display:grid;grid-gap:.75rem 3.75rem;grid-template-columns:repeat(3,auto)}.upOv0q_UF80xQLm5wUUbj{display:inline-block;left:0;max-width:100%;position:absolute;top:0}.upOv0q_UF80xQLm5wUUbj._2a5YahvOddZpnDxt584zj0{padding-right:7.5rem}._1YXk7FwZ61J_-RwKMC71ir{align-items:center;display:flex;justify-content:space-between;min-width:0}._1R1uFbMxwieNR1b4sblNDn{line-height:1.3rem;max-width:9.5rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}._3oJbN49951yJzQ81ACalRH{margin-left:1.75rem}._2PZqNhcMFdRqcqGJRVHVlV{color:#a7a2b2;cursor:pointer;position:absolute;right:0;top:.3rem}@media (max-width:900px){.upOv0q_UF80xQLm5wUUbj._2a5YahvOddZpnDxt584zj0{padding-right:6rem}._3oJbN49951yJzQ81ACalRH{margin-left:3vw}._3tAmliKIBijtyVRSUDaF8Y{grid-gap:.75rem 7vw}}@media (max-width:600px){._1YXk7FwZ61J_-RwKMC71ir{align-items:flex-start;flex-direction:column}._1YXk7FwZ61J_-RwKMC71ir>span{margin-left:0;margin-top:.7rem;width:100%}._1YXk7FwZ61J_-RwKMC71ir>span:first-child{margin-top:0;order:2}._1YXk7FwZ61J_-RwKMC71ir>span:last-child{order:1}.tEgpZeJWqog4Fyan6asnb>span{display:block}.tEgpZeJWqog4Fyan6asnb>span:first-child{margin-top:.7rem}._2PZqNhcMFdRqcqGJRVHVlV{top:.75rem}}", ""]);

// exports
exports.locals = {
	"MarketOutcomesCategorical__show-more": "_2PZqNhcMFdRqcqGJRVHVlV",
	"MarketOutcomesCategorical__outcome-value": "_3oJbN49951yJzQ81ACalRH",
	"MarketOutcomesCategorical": "_1OctR82uY5XTiDswe2DqCL",
	"MarketOutcomesCategorical__height-sentinel": "tEgpZeJWqog4Fyan6asnb",
	"MarketOutcomesCategorical__outcomes": "_3tAmliKIBijtyVRSUDaF8Y",
	"MarketOutcomesCategorical__outcomes-container": "upOv0q_UF80xQLm5wUUbj",
	"show-more": "_2a5YahvOddZpnDxt584zj0",
	"MarketOutcomesCategorical__outcome": "_1YXk7FwZ61J_-RwKMC71ir",
	"MarketOutcomesCategorical__outcome-name": "_1R1uFbMxwieNR1b4sblNDn"
};

/***/ }),

/***/ 1518:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_modules_routes_helpers_parse_query__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_routes_helpers_make_query__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_routes_helpers_parse_string_to_array__ = __webpack_require__(661);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_filter_sort_constants_param_names__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_routes_constants_query_value_delimiter__ = __webpack_require__(665);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };








/* harmony default export */ __webpack_exports__["a"] = (function (tag, location, history) {
  var searchParams = Object(__WEBPACK_IMPORTED_MODULE_0_modules_routes_helpers_parse_query__["a" /* default */])(location.search);

  if (searchParams[__WEBPACK_IMPORTED_MODULE_3_modules_filter_sort_constants_param_names__["e" /* TAGS_PARAM_NAME */]] == null || !searchParams[__WEBPACK_IMPORTED_MODULE_3_modules_filter_sort_constants_param_names__["e" /* TAGS_PARAM_NAME */]].length) {
    searchParams[__WEBPACK_IMPORTED_MODULE_3_modules_filter_sort_constants_param_names__["e" /* TAGS_PARAM_NAME */]] = tag;
    searchParams = Object(__WEBPACK_IMPORTED_MODULE_1_modules_routes_helpers_make_query__["a" /* default */])(searchParams);

    return history.push(_extends({}, location, {
      search: searchParams
    }));
  }

  var tags = Object(__WEBPACK_IMPORTED_MODULE_2_modules_routes_helpers_parse_string_to_array__["a" /* default */])(decodeURIComponent(searchParams[__WEBPACK_IMPORTED_MODULE_3_modules_filter_sort_constants_param_names__["e" /* TAGS_PARAM_NAME */]]), __WEBPACK_IMPORTED_MODULE_4_modules_routes_constants_query_value_delimiter__["a" /* QUERY_VALUE_DELIMITER */]);

  if (tags.indexOf(tag) !== -1) {
    // Remove Tag
    tags.splice(tags.indexOf(tag), 1);
  } else {
    // add tag
    tags.push(tag);
  }

  if (tags.length) {
    searchParams[__WEBPACK_IMPORTED_MODULE_3_modules_filter_sort_constants_param_names__["e" /* TAGS_PARAM_NAME */]] = tags.join(__WEBPACK_IMPORTED_MODULE_4_modules_routes_constants_query_value_delimiter__["a" /* QUERY_VALUE_DELIMITER */]);
  } else {
    delete searchParams[__WEBPACK_IMPORTED_MODULE_3_modules_filter_sort_constants_param_names__["e" /* TAGS_PARAM_NAME */]];
  }

  searchParams = Object(__WEBPACK_IMPORTED_MODULE_1_modules_routes_helpers_make_query__["a" /* default */])(searchParams);

  history.push(_extends({}, location, {
    search: searchParams
  }));
});

/***/ }),

/***/ 1519:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1520);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1334)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./market-basics.styles.less", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./market-basics.styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1520:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(657)(undefined);
// imports


// module
exports.push([module.i, "@font-face{font-family:FontAwesome;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1335) + ") format(\"woff\")}@font-face{font-family:icofont;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1336) + ") format(\"woff\")}._3q51sifzvmGGrYvy_weByI{font-size:.875rem;font-weight:400;line-height:.875rem;margin-bottom:1.625rem}._3q51sifzvmGGrYvy_weByI>li{display:inline-block}._3q51sifzvmGGrYvy_weByI>li:before{content:\"/\";margin:0 4px}._3q51sifzvmGGrYvy_weByI>li:first-child{color:#a7a2b2}._3q51sifzvmGGrYvy_weByI>li:first-child:before{display:none}._3q51sifzvmGGrYvy_weByI>li>button{text-transform:uppercase}", ""]);

// exports
exports.locals = {
	"MarketBasics__tags": "_3q51sifzvmGGrYvy_weByI"
};

/***/ }),

/***/ 1521:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_market_components_market_link_market_link__ = __webpack_require__(1438);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_common_components_value_denomination_value_denomination__ = __webpack_require__(1431);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_utils_get_value__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_utils_set_share_denomination__ = __webpack_require__(1522);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_utils_share_denomination_label__ = __webpack_require__(1523);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_modules_market_components_market_properties_market_properties_styles__ = __webpack_require__(1524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_modules_market_components_market_properties_market_properties_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_modules_market_components_market_properties_market_properties_styles__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













var MarketProperties = function MarketProperties(p) {
  var shareVolumeRounded = Object(__WEBPACK_IMPORTED_MODULE_5_utils_set_share_denomination__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_4_utils_get_value__["a" /* default */])(p, 'volume.rounded'), p.selectedShareDenomination);
  var shareDenomination = Object(__WEBPACK_IMPORTED_MODULE_6_utils_share_denomination_label__["a" /* default */])(p.selectedShareDenomination, p.shareDenominations);

  var buttonText = void 0;

  switch (true) {
    case p.isReported:
      buttonText = 'Reported';
      break;
    case p.isMissedReport:
      buttonText = 'Missed Report';
      break;
    case p.isPendingReport:
      buttonText = 'Report';
      break;
    case !p.isOpen:
      buttonText = 'View';
      break;
    default:
      buttonText = 'Trade';
  }

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'article',
    { className: __WEBPACK_IMPORTED_MODULE_7_modules_market_components_market_properties_market_properties_styles___default.a.MarketProperties },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'ul',
      { className: __WEBPACK_IMPORTED_MODULE_7_modules_market_components_market_properties_market_properties_styles___default.a.MarketProperties__meta },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'li',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          null,
          'Volume'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_common_components_value_denomination_value_denomination__["a" /* default */], { formatted: shareVolumeRounded, denomination: shareDenomination })
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'li',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          null,
          'Fee'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_common_components_value_denomination_value_denomination__["a" /* default */], p.takerFeePercent)
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'li',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          null,
          'Expires'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          null,
          p.endDate.formatted
        )
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: __WEBPACK_IMPORTED_MODULE_7_modules_market_components_market_properties_market_properties_styles___default.a.MarketProperties__actions },
      p.isLogged && p.toggleFavorite && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'button',
        {
          className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(__WEBPACK_IMPORTED_MODULE_7_modules_market_components_market_properties_market_properties_styles___default.a.MarketProperties__favorite, _defineProperty({}, __WEBPACK_IMPORTED_MODULE_7_modules_market_components_market_properties_market_properties_styles___default.a.favorite, p.isFavorite)),
          onClick: function onClick() {
            return p.toggleFavorite(p.id);
          }
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', null)
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_modules_market_components_market_link_market_link__["a" /* default */],
        {
          className: __WEBPACK_IMPORTED_MODULE_7_modules_market_components_market_properties_market_properties_styles___default.a.MarketProperties__trade,
          id: p.id,
          formattedDescription: p.formattedDescription
        },
        buttonText
      )
    )
  );
};

/* harmony default export */ __webpack_exports__["a"] = (MarketProperties);

/***/ }),

/***/ 1522:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_modules_market_constants_share_denominations__ = __webpack_require__(1401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_utils_add_commas_to_number__ = __webpack_require__(667);



// This helper method is very specific in scope
// It takes in the formatted shares in string format and returns a string denominated as specified
// The mutation of the shares is done this way so no actual re-calculation is done to the underlying
// values, just string manipulation for presentation
function setShareDenomination(value, denomination) {
  if (value == null) {
    return value;
  }

  switch (denomination) {
    case __WEBPACK_IMPORTED_MODULE_0_modules_market_constants_share_denominations__["a" /* MICRO_SHARE */]:
      return formatValue(value, 4);
    case __WEBPACK_IMPORTED_MODULE_0_modules_market_constants_share_denominations__["b" /* MILLI_SHARE */]:
      return formatValue(value, 1);
    default:
    case __WEBPACK_IMPORTED_MODULE_0_modules_market_constants_share_denominations__["c" /* SHARE */]:
      return value;
  }
}

// The value is assumed to *always* be in 'SHARES' denomination
function formatValue(value, amount) {
  var valueArray = value.split('');

  // remove dot + determine 0 pad amount
  var dotIndex = valueArray.indexOf('.');
  var zeroPadAmount = amount;
  if (dotIndex !== -1) {
    valueArray.splice(dotIndex, 1);
  } else {
    zeroPadAmount += 2;
  }

  // Strip leading 0's OR returns original value if no values are positive
  var firstPositiveValue = -1;
  valueArray.some(function (value, i) {
    if (parseInt(value, 10)) {
      firstPositiveValue = i;
      return true;
    }

    return false;
  });
  if (firstPositiveValue !== -1) {
    valueArray.splice(0, firstPositiveValue);
  } else {
    return value; // Returns original value
  }

  // Strip Commas (added back in at the end)
  valueArray.forEach(function (value, i) {
    if (value === ',') {
      valueArray.splice(i, 1);
    }
  });

  // Handle postFixed denominations (part of the format-number method)
  valueArray = handlePostfixedUnit(valueArray, zeroPadAmount);

  return Object(__WEBPACK_IMPORTED_MODULE_1_utils_add_commas_to_number__["a" /* default */])(valueArray.join('')); // return joined string w/ comma separating thousands
}

function handlePostfixedUnit(valueArray, zeroPadAmount) {
  var step = zeroPadAmount < 4;
  var gtTrillion = '> 1T'.split('');
  var newValueArray = valueArray;

  switch (valueArray[newValueArray.length - 1]) {
    // Handle existing > 10000 values
    case 'K':
      {
        newValueArray[newValueArray.length - 1] = step ? 'M' : 'B';
        return newValueArray;
      }
    case 'M':
      {
        if (step) {
          newValueArray[newValueArray.length - 1] = 'B';
        } else {
          newValueArray = gtTrillion;
        }
        return newValueArray;
      }
    case 'B':
    case 'T':
      {
        newValueArray = gtTrillion;
        return newValueArray;
      }

    // Handle values that become greater than 10000
    default:
      {
        // Append 0's
        for (var i = 0; i < zeroPadAmount; i++) {
          newValueArray.push('0');
        }

        // Mirrors logic present in format-number
        if (newValueArray.length >= 13) {
          newValueArray = gtTrillion;
        } else if (newValueArray.length >= 11) {
          newValueArray.splice(newValueArray.length - 9);
          newValueArray.push('B');
        } else if (newValueArray.length >= 8) {
          newValueArray.splice(newValueArray.length - 6);
          newValueArray.push('M');
        } else if (newValueArray.length >= 5) {
          newValueArray.splice(newValueArray.length - 3);
          newValueArray.push('K');
        }

        return newValueArray;
      }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (setShareDenomination);

/***/ }),

/***/ 1523:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_modules_market_constants_share_denominations__ = __webpack_require__(1401);


/* harmony default export */ __webpack_exports__["a"] = (function (selectedDenomination, shareDenominations) {
  switch (selectedDenomination) {
    case __WEBPACK_IMPORTED_MODULE_0_modules_market_constants_share_denominations__["a" /* MICRO_SHARE */]:
      {
        var value = shareDenominations && shareDenominations.find(function (denomination) {
          return denomination.value === __WEBPACK_IMPORTED_MODULE_0_modules_market_constants_share_denominations__["a" /* MICRO_SHARE */];
        });
        return value && value.label || 'μShares';
      }
    case __WEBPACK_IMPORTED_MODULE_0_modules_market_constants_share_denominations__["b" /* MILLI_SHARE */]:
      {
        var _value = shareDenominations && shareDenominations.find(function (denomination) {
          return denomination.value === __WEBPACK_IMPORTED_MODULE_0_modules_market_constants_share_denominations__["b" /* MILLI_SHARE */];
        });
        return _value && _value.label || 'mShares';
      }
    default:
    case __WEBPACK_IMPORTED_MODULE_0_modules_market_constants_share_denominations__["c" /* SHARE */]:
      {
        var _value2 = shareDenominations && shareDenominations.find(function (denomination) {
          return denomination.value === __WEBPACK_IMPORTED_MODULE_0_modules_market_constants_share_denominations__["c" /* SHARE */];
        });
        return _value2 && _value2.label || 'Shares';
      }
  }
});

/***/ }),

/***/ 1524:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1525);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1334)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./market-properties.styles.less", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./market-properties.styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1525:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(657)(undefined);
// imports


// module
exports.push([module.i, "@font-face{font-family:FontAwesome;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1335) + ") format(\"woff\")}.MarketProperties__favorite>i{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto}.MarketProperties__favorite>i.fa-pull-left{margin-right:.3em}.MarketProperties__favorite>i.fa-pull-right{margin-left:.3em}.MarketProperties__favorite>i.pull-left{margin-right:.3em}.MarketProperties__favorite>i.pull-right{margin-left:.3em}.MarketProperties__favorite.favorite>i:before{content:\"\\F005\"}.MarketProperties__favorite>i:before{content:\"\\F006\"}@font-face{font-family:icofont;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1336) + ") format(\"woff\")}._3vt8f2Avr7JmylYx7eFR-g>li>span:first-child{font-size:.75rem;font-weight:400;line-height:.75rem}._3vt8f2Avr7JmylYx7eFR-g>li>span{font-size:.875rem;font-weight:400;line-height:.875rem}.QOsvvHT_gkzQp-yigruGV{background-color:#412468;color:#fff}.QOsvvHT_gkzQp-yigruGV:hover{background-color:#553580}.QOsvvHT_gkzQp-yigruGV:disabled,.QOsvvHT_gkzQp-yigruGV:disabled:hover{background-color:#a7a2b2;color:#dbdae1;cursor:auto}.UAY5fVdJOrg84WkazpdTO{align-items:center;display:flex;justify-content:space-between}.X_pqXXQZjaGxkbB4UCZ-G{display:flex;justify-content:flex-end}._1f7FG-sFnuTA7aQ9Zlc9xY{color:#a7a2b2;cursor:pointer;font-size:1.2rem;margin-right:1rem;position:relative;transition:color .15s ease}._1f7FG-sFnuTA7aQ9Zlc9xY._F2m9Sq2uKjS06hUrwYc1>i{color:#9b8bf5}._3vt8f2Avr7JmylYx7eFR-g>li{display:inline-block;margin-left:2em}._3vt8f2Avr7JmylYx7eFR-g>li:first-child{margin-left:0}._3vt8f2Avr7JmylYx7eFR-g>li>span{color:#412468;display:block}._3vt8f2Avr7JmylYx7eFR-g>li>span:first-child{color:#a7a2b2;margin-bottom:.625rem}@media (max-width:600px){.UAY5fVdJOrg84WkazpdTO{display:block}.X_pqXXQZjaGxkbB4UCZ-G{margin-top:1.5rem}}@media (max-width:450px){._3vt8f2Avr7JmylYx7eFR-g{display:flex;justify-content:space-between}}", ""]);

// exports
exports.locals = {
	"MarketProperties__meta": "_3vt8f2Avr7JmylYx7eFR-g",
	"MarketProperties__trade": "QOsvvHT_gkzQp-yigruGV",
	"MarketProperties": "UAY5fVdJOrg84WkazpdTO",
	"MarketProperties__actions": "X_pqXXQZjaGxkbB4UCZ-G",
	"MarketProperties__favorite": "_1f7FG-sFnuTA7aQ9Zlc9xY",
	"favorite": "_F2m9Sq2uKjS06hUrwYc1"
};

/***/ }),

/***/ 1526:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1527);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1334)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./market-preview.styles.less", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./market-preview.styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1527:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(657)(undefined);
// imports


// module
exports.push([module.i, "@font-face{font-family:FontAwesome;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1335) + ") format(\"woff\")}@font-face{font-family:icofont;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1336) + ") format(\"woff\")}._2GmgTfvle4axaj5DPuuzWm{background-color:#fff;border:1px solid #736e89;margin:2em 0}._2GmgTfvle4axaj5DPuuzWm:first-child{margin-top:0}._21PWmXoGNqJ_bkRrGsQwNS{display:flex;flex:4;flex-direction:column}._34H_nRc0QbOiwpBHdRBgOF{border-top:1px solid #dfdfdf;padding:1rem 2rem}._2jXhsURqSyPqKMIvPqDMzc{border-left:1px solid #736e89;display:flex;flex:1;padding-left:2em}._2jXhsURqSyPqKMIvPqDMzc ._2GQTxeqk60hoi-FVBpwDlk ._2dHjCGTbofLhUsDg3x4CL1{color:#3299ff}@media (max-width:600px){._34H_nRc0QbOiwpBHdRBgOF{padding-left:1rem;padding-right:1rem}}", ""]);

// exports
exports.locals = {
	"MarketPreview": "_2GmgTfvle4axaj5DPuuzWm",
	"MarketPreview__details": "_21PWmXoGNqJ_bkRrGsQwNS",
	"MarketPreview__footer": "_34H_nRc0QbOiwpBHdRBgOF",
	"MarketPreview__outcomes": "_2jXhsURqSyPqKMIvPqDMzc",
	"outcome": "_2GQTxeqk60hoi-FVBpwDlk",
	"outcome-price": "_2dHjCGTbofLhUsDg3x4CL1"
};

/***/ }),

/***/ 1528:
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqualDeep = __webpack_require__(1529),
    isObjectLike = __webpack_require__(1374);

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;


/***/ }),

/***/ 1529:
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(1530),
    equalArrays = __webpack_require__(1458),
    equalByTag = __webpack_require__(1562),
    equalObjects = __webpack_require__(1566),
    getTag = __webpack_require__(1588),
    isArray = __webpack_require__(1404),
    isBuffer = __webpack_require__(1459),
    isTypedArray = __webpack_require__(1460);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;


/***/ }),

/***/ 1530:
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(1382),
    stackClear = __webpack_require__(1536),
    stackDelete = __webpack_require__(1537),
    stackGet = __webpack_require__(1538),
    stackHas = __webpack_require__(1539),
    stackSet = __webpack_require__(1540);

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ }),

/***/ 1531:
/***/ (function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),

/***/ 1532:
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(1383);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),

/***/ 1533:
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(1383);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),

/***/ 1534:
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(1383);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),

/***/ 1535:
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(1383);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),

/***/ 1536:
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(1382);

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ }),

/***/ 1537:
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ }),

/***/ 1538:
/***/ (function(module, exports) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ }),

/***/ 1539:
/***/ (function(module, exports) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ }),

/***/ 1540:
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(1382),
    Map = __webpack_require__(1402),
    MapCache = __webpack_require__(1457);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ }),

/***/ 1541:
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(1453),
    isMasked = __webpack_require__(1542),
    isObject = __webpack_require__(1384),
    toSource = __webpack_require__(1456);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),

/***/ 1542:
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(1543);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),

/***/ 1543:
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(1355);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),

/***/ 1544:
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),

/***/ 1545:
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(1546),
    ListCache = __webpack_require__(1382),
    Map = __webpack_require__(1402);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),

/***/ 1546:
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(1547),
    hashDelete = __webpack_require__(1548),
    hashGet = __webpack_require__(1549),
    hashHas = __webpack_require__(1550),
    hashSet = __webpack_require__(1551);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),

/***/ 1547:
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(1385);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),

/***/ 1548:
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),

/***/ 1549:
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(1385);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),

/***/ 1550:
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(1385);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),

/***/ 1551:
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(1385);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),

/***/ 1552:
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(1386);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),

/***/ 1553:
/***/ (function(module, exports) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),

/***/ 1554:
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(1386);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),

/***/ 1555:
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(1386);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),

/***/ 1556:
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(1386);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),

/***/ 1557:
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(1457),
    setCacheAdd = __webpack_require__(1558),
    setCacheHas = __webpack_require__(1559);

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;


/***/ }),

/***/ 1558:
/***/ (function(module, exports) {

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;


/***/ }),

/***/ 1559:
/***/ (function(module, exports) {

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;


/***/ }),

/***/ 1560:
/***/ (function(module, exports) {

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;


/***/ }),

/***/ 1561:
/***/ (function(module, exports) {

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;


/***/ }),

/***/ 1562:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(1380),
    Uint8Array = __webpack_require__(1563),
    eq = __webpack_require__(1452),
    equalArrays = __webpack_require__(1458),
    mapToArray = __webpack_require__(1564),
    setToArray = __webpack_require__(1565);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;


/***/ }),

/***/ 1563:
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(1355);

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),

/***/ 1564:
/***/ (function(module, exports) {

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;


/***/ }),

/***/ 1565:
/***/ (function(module, exports) {

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;


/***/ }),

/***/ 1566:
/***/ (function(module, exports, __webpack_require__) {

var getAllKeys = __webpack_require__(1567);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;


/***/ }),

/***/ 1567:
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(1568),
    getSymbols = __webpack_require__(1570),
    keys = __webpack_require__(1573);

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;


/***/ }),

/***/ 1568:
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(1569),
    isArray = __webpack_require__(1404);

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;


/***/ }),

/***/ 1569:
/***/ (function(module, exports) {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ }),

/***/ 1570:
/***/ (function(module, exports, __webpack_require__) {

var arrayFilter = __webpack_require__(1571),
    stubArray = __webpack_require__(1572);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;


/***/ }),

/***/ 1571:
/***/ (function(module, exports) {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;


/***/ }),

/***/ 1572:
/***/ (function(module, exports) {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;


/***/ }),

/***/ 1573:
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(1574),
    baseKeys = __webpack_require__(1583),
    isArrayLike = __webpack_require__(1587);

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ }),

/***/ 1574:
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(1575),
    isArguments = __webpack_require__(1576),
    isArray = __webpack_require__(1404),
    isBuffer = __webpack_require__(1459),
    isIndex = __webpack_require__(1579),
    isTypedArray = __webpack_require__(1460);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),

/***/ 1575:
/***/ (function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),

/***/ 1576:
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(1577),
    isObjectLike = __webpack_require__(1374);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),

/***/ 1577:
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(1373),
    isObjectLike = __webpack_require__(1374);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),

/***/ 1578:
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),

/***/ 1579:
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),

/***/ 1580:
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(1373),
    isLength = __webpack_require__(1461),
    isObjectLike = __webpack_require__(1374);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),

/***/ 1581:
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),

/***/ 1582:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(1403);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(65)(module)))

/***/ }),

/***/ 1583:
/***/ (function(module, exports, __webpack_require__) {

var isPrototype = __webpack_require__(1584),
    nativeKeys = __webpack_require__(1585);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ }),

/***/ 1584:
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),

/***/ 1585:
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(1586);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),

/***/ 1586:
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),

/***/ 1587:
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(1453),
    isLength = __webpack_require__(1461);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),

/***/ 1588:
/***/ (function(module, exports, __webpack_require__) {

var DataView = __webpack_require__(1589),
    Map = __webpack_require__(1402),
    Promise = __webpack_require__(1590),
    Set = __webpack_require__(1591),
    WeakMap = __webpack_require__(1592),
    baseGetTag = __webpack_require__(1373),
    toSource = __webpack_require__(1456);

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;


/***/ }),

/***/ 1589:
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(1366),
    root = __webpack_require__(1355);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),

/***/ 1590:
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(1366),
    root = __webpack_require__(1355);

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),

/***/ 1591:
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(1366),
    root = __webpack_require__(1355);

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),

/***/ 1592:
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(1366),
    root = __webpack_require__(1355);

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),

/***/ 1593:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_tooltip__ = __webpack_require__(1400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rc_progress__ = __webpack_require__(1594);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_common_components_bullet__ = __webpack_require__(1644);







var Universe = function Universe(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'article',
    { className: 'universe-info' },
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
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_modules_common_components_bullet__["a" /* default */], null),
      ' ',
      Math.round(p.currentReportingPeriodPercentComplete),
      '% complete ',
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_modules_common_components_bullet__["a" /* default */], null),
      ' period ends ',
      p.reportingCycleTimeRemaining
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'span',
      {
        'data-tip': true,
        'data-for': 'universe-id-tooltip',
        'data-event': 'click focus',
        className: 'universe-description pointer'
      },
      p.description,
      ' ',
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_modules_common_components_bullet__["a" /* default */], null),
      ' ',
      p.reportingPeriodDurationInSeconds / 3600,
      ' hours per period'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_2_react_tooltip___default.a,
      {
        id: 'universe-id-tooltip',
        type: 'light',
        effect: 'float',
        place: 'top',
        globalEventOff: 'click'
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        { className: 'tooltip-text' },
        'Universe ID: ',
        p.id
      )
    )
  );
};

Universe.propTypes = {
  className: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  description: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  reportingPeriodDurationInSeconds: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  reportingCycleTimeRemaining: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  currentReportingPeriodPercentComplete: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number
};

/* harmony default export */ __webpack_exports__["a"] = (Universe);

/***/ }),

/***/ 1594:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Line__ = __webpack_require__(1595);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Circle__ = __webpack_require__(1643);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Line__["a"]; });
/* unused harmony reexport Circle */





/* unused harmony default export */ var _unused_webpack_default_export = ({
  Line: __WEBPACK_IMPORTED_MODULE_0__Line__["a" /* default */],
  Circle: __WEBPACK_IMPORTED_MODULE_1__Circle__["a" /* default */]
});

/***/ }),

/***/ 1595:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(1462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(1469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(1414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(1415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(1423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__enhancer__ = __webpack_require__(1475);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__types__ = __webpack_require__(1477);










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

Line.propTypes = __WEBPACK_IMPORTED_MODULE_8__types__["b" /* propTypes */];

Line.defaultProps = __WEBPACK_IMPORTED_MODULE_8__types__["a" /* defaultProps */];

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_7__enhancer__["a" /* default */])(Line));

/***/ }),

/***/ 1596:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(1597), __esModule: true };

/***/ }),

/***/ 1597:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1598);
module.exports = __webpack_require__(1356).Object.assign;


/***/ }),

/***/ 1598:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(1360);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(1600) });


/***/ }),

/***/ 1599:
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ 1600:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(1377);
var gOPS = __webpack_require__(1411);
var pIE = __webpack_require__(1389);
var toObject = __webpack_require__(1412);
var IObject = __webpack_require__(1467);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(1368)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),

/***/ 1601:
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(1358);
var toLength = __webpack_require__(1602);
var toAbsoluteIndex = __webpack_require__(1603);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ 1602:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(1407);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ 1603:
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(1407);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ 1604:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(1605), __esModule: true };

/***/ }),

/***/ 1605:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1606);
var $Object = __webpack_require__(1356).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ 1606:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1360);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(1362), 'Object', { defineProperty: __webpack_require__(1361).f });


/***/ }),

/***/ 1607:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(1608), __esModule: true };

/***/ }),

/***/ 1608:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1609);
__webpack_require__(1614);
module.exports = __webpack_require__(1420).f('iterator');


/***/ }),

/***/ 1609:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(1610)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(1471)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ 1610:
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(1407);
var defined = __webpack_require__(1406);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ 1611:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(1418);
var descriptor = __webpack_require__(1387);
var setToStringTag = __webpack_require__(1419);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(1367)(IteratorPrototype, __webpack_require__(1369)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ 1612:
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(1361);
var anObject = __webpack_require__(1375);
var getKeys = __webpack_require__(1377);

module.exports = __webpack_require__(1362) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ 1613:
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(1357).document;
module.exports = document && document.documentElement;


/***/ }),

/***/ 1614:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1615);
var global = __webpack_require__(1357);
var hide = __webpack_require__(1367);
var Iterators = __webpack_require__(1417);
var TO_STRING_TAG = __webpack_require__(1369)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),

/***/ 1615:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(1616);
var step = __webpack_require__(1617);
var Iterators = __webpack_require__(1417);
var toIObject = __webpack_require__(1358);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(1471)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ 1616:
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),

/***/ 1617:
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ 1618:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(1619), __esModule: true };

/***/ }),

/***/ 1619:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1620);
__webpack_require__(1626);
__webpack_require__(1627);
__webpack_require__(1628);
module.exports = __webpack_require__(1356).Symbol;


/***/ }),

/***/ 1620:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(1357);
var has = __webpack_require__(1363);
var DESCRIPTORS = __webpack_require__(1362);
var $export = __webpack_require__(1360);
var redefine = __webpack_require__(1472);
var META = __webpack_require__(1621).KEY;
var $fails = __webpack_require__(1368);
var shared = __webpack_require__(1409);
var setToStringTag = __webpack_require__(1419);
var uid = __webpack_require__(1388);
var wks = __webpack_require__(1369);
var wksExt = __webpack_require__(1420);
var wksDefine = __webpack_require__(1421);
var keyOf = __webpack_require__(1622);
var enumKeys = __webpack_require__(1623);
var isArray = __webpack_require__(1624);
var anObject = __webpack_require__(1375);
var toIObject = __webpack_require__(1358);
var toPrimitive = __webpack_require__(1405);
var createDesc = __webpack_require__(1387);
var _create = __webpack_require__(1418);
var gOPNExt = __webpack_require__(1625);
var $GOPD = __webpack_require__(1422);
var $DP = __webpack_require__(1361);
var $keys = __webpack_require__(1377);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(1474).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(1389).f = $propertyIsEnumerable;
  __webpack_require__(1411).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(1416)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key) {
    if (isSymbol(key)) return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
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
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(1367)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ 1621:
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(1388)('meta');
var isObject = __webpack_require__(1376);
var has = __webpack_require__(1363);
var setDesc = __webpack_require__(1361).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(1368)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ 1622:
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(1377);
var toIObject = __webpack_require__(1358);
module.exports = function (object, el) {
  var O = toIObject(object);
  var keys = getKeys(O);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) if (O[key = keys[index++]] === el) return key;
};


/***/ }),

/***/ 1623:
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(1377);
var gOPS = __webpack_require__(1411);
var pIE = __webpack_require__(1389);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ 1624:
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(1468);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ 1625:
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(1358);
var gOPN = __webpack_require__(1474).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ 1626:
/***/ (function(module, exports) {



/***/ }),

/***/ 1627:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1421)('asyncIterator');


/***/ }),

/***/ 1628:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1421)('observable');


/***/ }),

/***/ 1629:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(1630), __esModule: true };

/***/ }),

/***/ 1630:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1631);
module.exports = __webpack_require__(1356).Object.setPrototypeOf;


/***/ }),

/***/ 1631:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(1360);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(1632).set });


/***/ }),

/***/ 1632:
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(1376);
var anObject = __webpack_require__(1375);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(1463)(Function.call, __webpack_require__(1422).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ 1633:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(1634), __esModule: true };

/***/ }),

/***/ 1634:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1635);
var $Object = __webpack_require__(1356).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),

/***/ 1635:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1360);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(1418) });


/***/ }),

/***/ 1636:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _getPrototypeOf = __webpack_require__(1637);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = __webpack_require__(1640);

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

/***/ 1637:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(1638), __esModule: true };

/***/ }),

/***/ 1638:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1639);
module.exports = __webpack_require__(1356).Object.getPrototypeOf;


/***/ }),

/***/ 1639:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(1412);
var $getPrototypeOf = __webpack_require__(1473);

__webpack_require__(1476)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),

/***/ 1640:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(1641), __esModule: true };

/***/ }),

/***/ 1641:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1642);
var $Object = __webpack_require__(1356).Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),

/***/ 1642:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(1358);
var $getOwnPropertyDescriptor = __webpack_require__(1422).f;

__webpack_require__(1476)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),

/***/ 1643:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(1462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(1469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(1414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(1415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(1423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__enhancer__ = __webpack_require__(1475);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__types__ = __webpack_require__(1477);






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

Circle.propTypes = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_9__types__["b" /* propTypes */], {
  gapPosition: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.oneOf(['top', 'bottom', 'left', 'right'])
});

Circle.defaultProps = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_9__types__["a" /* defaultProps */], {
  gapPosition: 'top'
});

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_8__enhancer__["a" /* default */])(Circle));

/***/ }),

/***/ 1644:
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

/***/ 1700:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_common_components_dropdown_dropdown_styles__ = __webpack_require__(1889);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_common_components_dropdown_dropdown_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_modules_common_components_dropdown_dropdown_styles__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var Dropdown = function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

    var defaultOption = props.options.find(function (option) {
      return option.value === props.default;
    }) || false;

    _this.state = {
      label: defaultOption && defaultOption.label || props.options[0].label,
      value: defaultOption && defaultOption.value || props.options[0].value,
      showList: false
    };

    _this.dropdownSelect = _this.dropdownSelect.bind(_this);
    _this.toggleList = _this.toggleList.bind(_this);
    _this.handleWindowOnClick = _this.handleWindowOnClick.bind(_this);
    return _this;
  }

  _createClass(Dropdown, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('click', this.handleWindowOnClick);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('click', this.handleWindowOnClick);
    }
  }, {
    key: 'dropdownSelect',
    value: function dropdownSelect(label, value) {
      if (value !== this.state.value) {
        this.setState({
          label: label,
          value: value
        });
        this.props.onChange(value);
        this.toggleList();
      }
    }
  }, {
    key: 'toggleList',
    value: function toggleList() {
      this.setState({ showList: !this.state.showList });
    }
  }, {
    key: 'handleWindowOnClick',
    value: function handleWindowOnClick(event) {
      if (this.refDropdown && !this.refDropdown.contains(event.target)) {
        this.setState({ showList: false });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var p = this.props;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_3_modules_common_components_dropdown_dropdown_styles___default.a.Dropdown, ref: function ref(dropdown) {
            _this2.refDropdown = dropdown;
          } },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'button',
          {
            className: __WEBPACK_IMPORTED_MODULE_3_modules_common_components_dropdown_dropdown_styles___default.a.Dropdown__label,
            onClick: this.toggleList
          },
          this.state.label
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()(__WEBPACK_IMPORTED_MODULE_3_modules_common_components_dropdown_dropdown_styles___default.a.Dropdown__list, _defineProperty({}, '' + __WEBPACK_IMPORTED_MODULE_3_modules_common_components_dropdown_dropdown_styles___default.a.active, this.state.showList)) },
          p.options.map(function (option) {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'button',
              {
                className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()(_defineProperty({}, '' + __WEBPACK_IMPORTED_MODULE_3_modules_common_components_dropdown_dropdown_styles___default.a.active, option.value === _this2.state.value)),
                key: option.value,
                value: option.value,
                onClick: function onClick() {
                  return _this2.dropdownSelect(option.label, option.value);
                }
              },
              option.label
            );
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'select',
          {
            className: __WEBPACK_IMPORTED_MODULE_3_modules_common_components_dropdown_dropdown_styles___default.a.Dropdown__select,
            onChange: function onChange(e) {
              _this2.dropdownSelect(e.target.options[e.target.selectedIndex].text, e.target.value);
            },
            value: this.state.value
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
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()(__WEBPACK_IMPORTED_MODULE_3_modules_common_components_dropdown_dropdown_styles___default.a['Dropdown__angle-down'], __WEBPACK_IMPORTED_MODULE_3_modules_common_components_dropdown_dropdown_styles___default.a.fa, __WEBPACK_IMPORTED_MODULE_3_modules_common_components_dropdown_dropdown_styles___default.a['fa-angle-down']) })
      );
    }
  }]);

  return Dropdown;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

Dropdown.propTypes = {
  onChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  default: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  options: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (Dropdown);

/***/ }),

/***/ 1701:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MARKET_OPEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MARKET_REPORTING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MARKET_CLOSED; });
var MARKET_OPEN = 'open';
var MARKET_REPORTING = 'reporting';
var MARKET_CLOSED = 'closed';

/***/ }),

/***/ 1702:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return MARKET_VOLUME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MARKET_CREATION_TIME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MARKET_END_DATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return MARKET_TAKER_FEE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MARKET_MAKER_FEE; });
var MARKET_VOLUME = 'volume';
var MARKET_CREATION_TIME = 'creationTime';
var MARKET_END_DATE = 'endDate';
var MARKET_TAKER_FEE = 'takerFeePercent';
var MARKET_MAKER_FEE = 'makerFeePercent';

/***/ }),

/***/ 1876:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet__ = __webpack_require__(658);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_markets_components_markets_header_markets_header__ = __webpack_require__(1877);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_markets_components_markets_list__ = __webpack_require__(1495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_universe_components_universe__ = __webpack_require__(1593);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_utils_get_value__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_modules_routes_helpers_parse_query__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lodash_isEqual__ = __webpack_require__(1496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lodash_isEqual___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_lodash_isEqual__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_modules_routes_helpers_parse_path__ = __webpack_require__(670);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_modules_routes_helpers_make_path__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_modules_routes_constants_views__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_modules_filter_sort_constants_param_names__ = __webpack_require__(497);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



















var MarketsView = function (_Component) {
  _inherits(MarketsView, _Component);

  function MarketsView(props) {
    _classCallCheck(this, MarketsView);

    var _this = _possibleConstructorReturn(this, (MarketsView.__proto__ || Object.getPrototypeOf(MarketsView)).call(this, props));

    _this.state = {
      shouldDisplayUniverseInfo: !!(Object(__WEBPACK_IMPORTED_MODULE_6_utils_get_value__["a" /* default */])(props, 'loginAccount.rep.value') && Object(__WEBPACK_IMPORTED_MODULE_6_utils_get_value__["a" /* default */])(props, 'universe.id')),
      filteredMarkets: []
    };
    return _this;
  }

  _createClass(MarketsView, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.loadMarkets({
        canLoadMarkets: this.props.canLoadMarkets,
        location: this.props.location,
        hasLoadedTopic: this.props.hasLoadedTopic,
        hasLoadedMarkets: this.props.hasLoadedMarkets,
        loadMarkets: this.props.loadMarkets,
        loadMarketsByTopic: this.props.loadMarketsByTopic
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.canLoadMarkets !== nextProps.canLoadMarkets && nextProps.canLoadMarkets || this.props.location !== nextProps.location || this.props.hasLoadedTopic !== nextProps.hasLoadedTopic || this.props.hasLoadedMarkets !== nextProps.hasLoadedMarkets && !nextProps.hasLoadedMarkets) {
        this.loadMarkets({
          canLoadMarkets: nextProps.canLoadMarkets,
          location: nextProps.location,
          hasLoadedTopic: nextProps.hasLoadedTopic,
          hasLoadedMarkets: nextProps.hasLoadedMarkets,
          loadMarkets: nextProps.loadMarkets,
          loadMarketsByTopic: nextProps.loadMarketsByTopic
        });
      }

      if (Object(__WEBPACK_IMPORTED_MODULE_6_utils_get_value__["a" /* default */])(this.props, 'loginAccount.rep.value') !== Object(__WEBPACK_IMPORTED_MODULE_6_utils_get_value__["a" /* default */])(nextProps, 'loginAccount.rep.value') || Object(__WEBPACK_IMPORTED_MODULE_6_utils_get_value__["a" /* default */])(this.props, 'universe.id') !== Object(__WEBPACK_IMPORTED_MODULE_6_utils_get_value__["a" /* default */])(nextProps, 'universe.id')) {
        this.setState({
          canDisplayUniverseInfo: !!(Object(__WEBPACK_IMPORTED_MODULE_6_utils_get_value__["a" /* default */])(nextProps, 'loginAccount.rep.value') && Object(__WEBPACK_IMPORTED_MODULE_6_utils_get_value__["a" /* default */])(nextProps, 'universe.id'))
        });
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (!__WEBPACK_IMPORTED_MODULE_8_lodash_isEqual___default()(this.state.filteredMarkets, nextState.filteredMarkets)) {
        this.props.updateMarketsFilteredSorted(nextState.filteredMarkets);
        checkFavoriteMarketsCount(nextState.filteredMarkets, nextProps.location, nextProps.history);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.clearMarketsFilteredSorted();
    }
  }, {
    key: 'loadMarkets',
    value: function loadMarkets(options) {
      if (options.canLoadMarkets) {
        var topic = Object(__WEBPACK_IMPORTED_MODULE_7_modules_routes_helpers_parse_query__["a" /* default */])(options.location.search)[__WEBPACK_IMPORTED_MODULE_12_modules_filter_sort_constants_param_names__["f" /* TOPIC_PARAM_NAME */]];

        if (topic && !this.props.hasLoadedTopic[topic]) {
          options.loadMarketsByTopic(topic);
        } else if (!topic && !this.props.hasLoadedMarkets) {
          options.loadMarkets();
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var p = this.props;
      var s = this.state;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'section',
        { id: 'markets_view' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_react_helmet__["Helmet"],
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'title',
            null,
            'Markets'
          )
        ),
        this.state.shouldDisplayUniverseInfo && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_modules_universe_components_universe__["a" /* default */], p.universe),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_markets_components_markets_header_markets_header__["a" /* default */], {
          isLogged: p.isLogged,
          location: p.location,
          markets: p.markets,
          updateFilteredItems: function updateFilteredItems(filteredMarkets) {
            return _this2.setState({ filteredMarkets: filteredMarkets });
          }
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_modules_markets_components_markets_list__["a" /* default */], {
          isLogged: p.isLogged,
          markets: p.markets,
          filteredMarkets: s.filteredMarkets,
          location: p.location,
          history: p.history,
          scalarShareDenomination: p.scalarShareDenomination,
          toggleFavorite: p.toggleFavorite,
          loadMarketsInfo: p.loadMarketsInfo
        })
      );
    }
  }]);

  return MarketsView;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

MarketsView.propTypes = {
  isLogged: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  loginAccount: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  markets: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired,
  canLoadMarkets: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  hasLoadedMarkets: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  hasLoadedTopic: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  loadMarkets: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  loadMarketsByTopic: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  updateMarketsFilteredSorted: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  clearMarketsFilteredSorted: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  toggleFavorite: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  loadMarketsInfo: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
  // filterSort: PropTypes.object,
  // marketsHeader: PropTypes.object,
  // pagination: PropTypes.object,
  // keywords: PropTypes.string,
  // onChangeKeywords: PropTypes.func,
  // universe: PropTypes.object,
  // scalarShareDenomination: PropTypes.object,
  // location: PropTypes.object.isRequired,
};
/* harmony default export */ __webpack_exports__["a"] = (MarketsView);


function checkFavoriteMarketsCount(filteredMarkets, location, history) {
  var path = Object(__WEBPACK_IMPORTED_MODULE_9_modules_routes_helpers_parse_path__["a" /* default */])(location.pathname)[0];

  if (path === __WEBPACK_IMPORTED_MODULE_11_modules_routes_constants_views__["k" /* FAVORITES */] && !filteredMarkets.length) {
    history.push(Object(__WEBPACK_IMPORTED_MODULE_10_modules_routes_helpers_make_path__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_11_modules_routes_constants_views__["m" /* MARKETS */]));
  }
}

/***/ }),

/***/ 1877:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_filter_sort_containers_filter_sort_controller__ = __webpack_require__(1878);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_filter_sort_containers_filter_search__ = __webpack_require__(1882);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_filter_sort_containers_filter_market_state__ = __webpack_require__(1887);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_filter_sort_containers_sort_market_param__ = __webpack_require__(1892);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_modules_routes_helpers_parse_query__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_modules_routes_helpers_parse_path__ = __webpack_require__(670);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_modules_routes_constants_views__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_modules_filter_sort_constants_param_names__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_modules_markets_components_markets_header_markets_header_styles__ = __webpack_require__(1897);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_modules_markets_components_markets_header_markets_header_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_modules_markets_components_markets_header_markets_header_styles__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

















var MarketsHeader = function (_Component) {
  _inherits(MarketsHeader, _Component);

  function MarketsHeader(props) {
    _classCallCheck(this, MarketsHeader);

    var _this = _possibleConstructorReturn(this, (MarketsHeader.__proto__ || Object.getPrototypeOf(MarketsHeader)).call(this, props));

    _this.state = {
      headerTitle: null,
      capitalizeTitle: false,
      filterByMarketFavorites: false
    };

    _this.setHeaderTitle = _this.setHeaderTitle.bind(_this);
    _this.setPathDependentFilters = _this.setPathDependentFilters.bind(_this);
    return _this;
  }

  _createClass(MarketsHeader, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setHeaderTitle(this.props.location);
      this.setPathDependentFilters(this.props.location);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.location !== nextProps.location) {
        this.setHeaderTitle(nextProps.location);
        this.setPathDependentFilters(nextProps.location);
      }
    }
  }, {
    key: 'setHeaderTitle',
    value: function setHeaderTitle(location) {
      var searchParams = Object(__WEBPACK_IMPORTED_MODULE_6_modules_routes_helpers_parse_query__["a" /* default */])(location.search);

      if (searchParams[__WEBPACK_IMPORTED_MODULE_9_modules_filter_sort_constants_param_names__["f" /* TOPIC_PARAM_NAME */]]) {
        this.setState({
          headerTitle: searchParams[__WEBPACK_IMPORTED_MODULE_9_modules_filter_sort_constants_param_names__["f" /* TOPIC_PARAM_NAME */]],
          capitalizeTitle: false
        });
      } else {
        var path = Object(__WEBPACK_IMPORTED_MODULE_7_modules_routes_helpers_parse_path__["a" /* default */])(location.pathname);

        if (path[0] === __WEBPACK_IMPORTED_MODULE_8_modules_routes_constants_views__["m" /* MARKETS */]) {
          this.setState({
            headerTitle: path[0],
            capitalizeTitle: true
          });
        }
      }
    }
  }, {
    key: 'setPathDependentFilters',
    value: function setPathDependentFilters(location) {
      var path = Object(__WEBPACK_IMPORTED_MODULE_7_modules_routes_helpers_parse_path__["a" /* default */])(location.pathname)[0];

      var filterByMarketFavorites = path === __WEBPACK_IMPORTED_MODULE_8_modules_routes_constants_views__["k" /* FAVORITES */];
      this.setState({ filterByMarketFavorites: filterByMarketFavorites });
    }
  }, {
    key: 'render',
    value: function render() {
      var p = this.props;
      var s = this.state;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'article',
        { className: __WEBPACK_IMPORTED_MODULE_10_modules_markets_components_markets_header_markets_header_styles___default.a.MarketsHeader },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_modules_filter_sort_containers_filter_sort_controller__["a" /* default */],
          {
            items: p.markets,
            updateFilteredItems: p.updateFilteredItems
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_10_modules_markets_components_markets_header_markets_header_styles___default.a.MarketsHeader__search },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_filter_sort_containers_filter_search__["a" /* default */], {
              searchPlaceholder: 'Search',
              searchKeys: ['description', ['outcomes', 'name'], ['tags', 'name']]
            })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_10_modules_markets_components_markets_header_markets_header_styles___default.a.MarketsHeader__wrapper },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'h1',
              { className: __WEBPACK_IMPORTED_MODULE_10_modules_markets_components_markets_header_markets_header_styles___default.a.MarketsHeader__heading },
              s.headerTitle
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: __WEBPACK_IMPORTED_MODULE_10_modules_markets_components_markets_header_markets_header_styles___default.a.MarketsHeader__filters },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_modules_filter_sort_containers_sort_market_param__["a" /* default */], null),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_modules_filter_sort_containers_filter_market_state__["a" /* default */], null)
            )
          )
        )
      );
    }
  }]);

  return MarketsHeader;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

// <FilterSort
//   items={p.markets}
//   updateFilteredItems={p.updateFilteredItems}
//   filterByMarketFavorites={s.filterByMarketFavorites}
//   searchPlaceholder="Search"
//   searchKeys={this.searchKeys}
//   filterBySearch
//   filterByTags
// />


MarketsHeader.propTypes = {
  isLogged: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  updateFilteredItems: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["a"] = (MarketsHeader);

/***/ }),

/***/ 1878:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_filter_sort_components_filter_sort_controller_filter_sort_controller__ = __webpack_require__(1879);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_utils_get_value__ = __webpack_require__(78);







var mapStateToProps = function mapStateToProps(state) {
  return {
    currentReportingPeriod: Object(__WEBPACK_IMPORTED_MODULE_3_utils_get_value__["a" /* default */])(state, 'universe.currentReportingWindowAddress')
  };
};

var FilterSort = Object(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["f" /* withRouter */])(Object(__WEBPACK_IMPORTED_MODULE_0_react_redux__["b" /* connect */])(mapStateToProps)(__WEBPACK_IMPORTED_MODULE_2_modules_filter_sort_components_filter_sort_controller_filter_sort_controller__["a" /* default */]));

/* harmony default export */ __webpack_exports__["a"] = (FilterSort);

/***/ }),

/***/ 1879:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__(499);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_filter_sort_helpers_filter_by_tags__ = __webpack_require__(1880);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_filter_sort_helpers_filter_by_category__ = __webpack_require__(1881);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_routes_helpers_parse_string_to_array__ = __webpack_require__(661);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_modules_routes_helpers_parse_query__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_utils_get_value__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_modules_filter_sort_constants_param_names__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_modules_routes_constants_query_value_delimiter__ = __webpack_require__(665);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }














var FilterSortController = function (_Component) {
  _inherits(FilterSortController, _Component);

  function FilterSortController(props) {
    _classCallCheck(this, FilterSortController);

    // NOTE -- any filter or sort that is `null` will be ignored when combining arrays
    var _this = _possibleConstructorReturn(this, (FilterSortController.__proto__ || Object.getPrototypeOf(FilterSortController)).call(this, props));

    _this.state = {
      // Filters are dynamically added
      // Aggregated Items
      combinedFiltered: null,
      // Children Components
      children: null
    };

    _this.injectChildren = _this.injectChildren.bind(_this);
    _this.updateIndices = _this.updateIndices.bind(_this);
    _this.callFilterByCategory = _this.callFilterByCategory.bind(_this);
    _this.callFilterByKeywords = _this.callFilterByKeywords.bind(_this);
    return _this;
  }

  _createClass(FilterSortController, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.updateFilteredItems(this.props.items.map(function (_, i) {
        return i;
      })); // Initialize indices

      this.injectChildren(this.props.children, this.state.combinedFiltered);

      var search = Object(__WEBPACK_IMPORTED_MODULE_6_modules_routes_helpers_parse_query__["a" /* default */])(this.props.location.search);
      this.callFilterByCategory(search, this.props.items);
      this.callFilterByKeywords(search, this.props.items);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      var _this2 = this;

      var oldResults = Object.keys(this.state).filter(function (key) {
        return key.indexOf('filter-sort-results--') !== -1;
      }).reduce(function (p, key) {
        return _extends({}, p, _defineProperty({}, key, _this2.state[key]));
      }, {});
      var newResults = Object.keys(nextState).filter(function (key) {
        return key.indexOf('filter-sort-results--') !== -1;
      }).reduce(function (p, key) {
        return _extends({}, p, _defineProperty({}, key, nextState[key]));
      }, {});

      if (!Object(__WEBPACK_IMPORTED_MODULE_2_lodash__["isEqual"])(this.props.items, nextProps.items) || !Object(__WEBPACK_IMPORTED_MODULE_2_lodash__["isEqual"])(oldResults, newResults)) {
        this.updateCombinedFilters(nextProps.items, newResults);
      }

      if (!Object(__WEBPACK_IMPORTED_MODULE_2_lodash__["isEqual"])(this.props.items, nextProps.items) || !Object(__WEBPACK_IMPORTED_MODULE_2_lodash__["isEqual"])(this.state.combinedFiltered, nextState.combinedFiltered)) {
        this.injectChildren(nextProps.children, nextState.combinedFiltered);
      }

      // Helper Function Filters ONLY via query string params (no components directly associated with filter/sort)
      var oldSearch = Object(__WEBPACK_IMPORTED_MODULE_6_modules_routes_helpers_parse_query__["a" /* default */])(this.props.location.search);
      var newSearch = Object(__WEBPACK_IMPORTED_MODULE_6_modules_routes_helpers_parse_query__["a" /* default */])(nextProps.location.search);

      // Catgories
      if (!Object(__WEBPACK_IMPORTED_MODULE_2_lodash__["isEqual"])(this.props.items, nextProps.items) || !Object(__WEBPACK_IMPORTED_MODULE_2_lodash__["isEqual"])(oldSearch[__WEBPACK_IMPORTED_MODULE_8_modules_filter_sort_constants_param_names__["f" /* TOPIC_PARAM_NAME */]], newSearch[__WEBPACK_IMPORTED_MODULE_8_modules_filter_sort_constants_param_names__["f" /* TOPIC_PARAM_NAME */]])) {
        this.callFilterByCategory(newSearch, nextProps.items);
      }

      // Keywords
      if (!Object(__WEBPACK_IMPORTED_MODULE_2_lodash__["isEqual"])(this.props.items, nextProps.items) || !Object(__WEBPACK_IMPORTED_MODULE_2_lodash__["isEqual"])(oldSearch[__WEBPACK_IMPORTED_MODULE_8_modules_filter_sort_constants_param_names__["e" /* TAGS_PARAM_NAME */]], newSearch[__WEBPACK_IMPORTED_MODULE_8_modules_filter_sort_constants_param_names__["e" /* TAGS_PARAM_NAME */]])) {
        this.callFilterByKeywords(newSearch, nextProps.items);
      }
    }
  }, {
    key: 'callFilterByCategory',
    value: function callFilterByCategory(query, items) {
      var category = query[__WEBPACK_IMPORTED_MODULE_8_modules_filter_sort_constants_param_names__["f" /* TOPIC_PARAM_NAME */]] != null ? decodeURIComponent(query[__WEBPACK_IMPORTED_MODULE_8_modules_filter_sort_constants_param_names__["f" /* TOPIC_PARAM_NAME */]]) : null;

      this.updateIndices({
        type: __WEBPACK_IMPORTED_MODULE_8_modules_filter_sort_constants_param_names__["f" /* TOPIC_PARAM_NAME */],
        indices: Object(__WEBPACK_IMPORTED_MODULE_4_modules_filter_sort_helpers_filter_by_category__["a" /* default */])(category, items)
      });
    }
  }, {
    key: 'callFilterByKeywords',
    value: function callFilterByKeywords(query, items) {
      var keywordsArray = Object(__WEBPACK_IMPORTED_MODULE_5_modules_routes_helpers_parse_string_to_array__["a" /* default */])(decodeURIComponent(query[__WEBPACK_IMPORTED_MODULE_8_modules_filter_sort_constants_param_names__["e" /* TAGS_PARAM_NAME */]] || ''), __WEBPACK_IMPORTED_MODULE_9_modules_routes_constants_query_value_delimiter__["a" /* QUERY_VALUE_DELIMITER */]);

      this.updateIndices({
        type: __WEBPACK_IMPORTED_MODULE_8_modules_filter_sort_constants_param_names__["e" /* TAGS_PARAM_NAME */],
        indices: Object(__WEBPACK_IMPORTED_MODULE_3_modules_filter_sort_helpers_filter_by_tags__["a" /* default */])(keywordsArray, items)
      });
    }
  }, {
    key: 'updateCombinedFilters',
    value: function updateCombinedFilters(items, results) {
      var combinedFiltered = Object.keys(results).reduce(function (p, filterType) {
        if (filterType === 'filter-sort-results--' + __WEBPACK_IMPORTED_MODULE_8_modules_filter_sort_constants_param_names__["d" /* SORT_MARKET_PARAM */]) return p; // Don't include sorted array
        if (p.length === 0 || results[filterType] !== null && results[filterType].length === 0) return [];
        if (results[filterType] === null) return p;

        return results[filterType].filter(function (item) {
          return p.includes(item);
        });
      }, items.map(function (_, i) {
        return i;
      }));

      this.updateSortedFiltered(results['filter-sort-results--' + __WEBPACK_IMPORTED_MODULE_8_modules_filter_sort_constants_param_names__["d" /* SORT_MARKET_PARAM */]] || null, combinedFiltered);

      this.setState({
        combinedFiltered: combinedFiltered
      });
    }
  }, {
    key: 'updateSortedFiltered',
    value: function updateSortedFiltered(rawSorted, combined) {
      // If we want to accomodate more than one sorting mechanism across a filtered list, we'll need to re-architect things a bit
      this.props.updateFilteredItems(rawSorted !== null ? (rawSorted || []).filter(function (itemIndex) {
        return combined.indexOf(itemIndex) !== -1;
      }) : combined);
    }
  }, {
    key: 'updateIndices',
    value: function updateIndices(options) {
      this.setState(_defineProperty({}, 'filter-sort-results--' + options.type, options.indices));
    }
  }, {
    key: 'injectChildren',
    value: function injectChildren(children, combinedFiltered) {
      var _this3 = this;

      // NOTE --  keep an eye on this...might be a performance bottleneck if goes too deep
      //          Ideally the children of the controller are fairly shallow
      //          This method name also sounds terrible

      var traverseChildren = function traverseChildren(child) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.map(child, function (subChild) {
          var subChildProps = {};

          var name = Object(__WEBPACK_IMPORTED_MODULE_7_utils_get_value__["a" /* default */])(subChild, 'type.displayName');

          if (__WEBPACK_IMPORTED_MODULE_0_react___default.a.isValidElement(subChild)) {
            if (name && (name.toLowerCase().indexOf('filter') !== -1 || name.toLowerCase().indexOf('sort') !== -1)) {
              subChildProps = {
                updateIndices: _this3.updateIndices,
                items: _this3.props.items
              };
            }

            if (name && name.indexOf('SortMarketParam') !== -1) {
              subChildProps = _extends({}, subChildProps, {
                combinedFiltered: combinedFiltered
              });
            }
          }
          if (subChild.props) {
            if (Object(__WEBPACK_IMPORTED_MODULE_7_utils_get_value__["a" /* default */])(subChild, 'props.children')) {
              subChildProps.children = traverseChildren(subChild.props.children);
            }
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.cloneElement(subChild, subChildProps);
          }
          return subChild;
        });
      };

      var updatedChildren = __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.map(children, traverseChildren);

      this.setState({
        children: updatedChildren
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'section',
        null,
        this.state.children
      );
    }
  }]);

  return FilterSortController;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

FilterSortController.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired,
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  items: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired,
  updateFilteredItems: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["a"] = (FilterSortController);

/***/ }),

/***/ 1880:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = filterByTags;
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function filterByTags(tags, items) {
  // NOTE -- tag filtering is case sensitive

  if (tags == null || !tags.length) return null;

  return items.reduce(function (p, item, i) {
    if (tags.every(function (filterTag) {
      return item.tags.some(function (tag, tagIndex) {
        return tagIndex !== 0 && tag === filterTag;
      });
    })) {
      return [].concat(_toConsumableArray(p), [i]);
    }

    return p;
  }, []);
}

/***/ }),

/***/ 1881:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = filterByCategory;
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function filterByCategory(category, items) {
  // NOTE -- category filtering is case sensitive

  if (category == null) return null;

  return items.reduce(function (p, item, i) {
    if (item.topic === category) return [].concat(_toConsumableArray(p), [i]);

    return p;
  }, []);
}

/***/ }),

/***/ 1882:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_dom__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_filter_sort_components_filter_search_filter_search__ = __webpack_require__(1883);




/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_react_router_dom__["f" /* withRouter */])(__WEBPACK_IMPORTED_MODULE_1_modules_filter_sort_components_filter_search_filter_search__["a" /* default */]));

/***/ }),

/***/ 1883:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_common_components_input_input__ = __webpack_require__(1507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_routes_helpers_parse_query__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_routes_helpers_make_query__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_filter_sort_helpers_filter_by_search__ = __webpack_require__(1884);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash__ = __webpack_require__(499);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_modules_filter_sort_constants_param_names__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_modules_filter_sort_components_filter_search_filter_search_styles__ = __webpack_require__(1885);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_modules_filter_sort_components_filter_search_filter_search_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_modules_filter_sort_components_filter_search_filter_search_styles__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }















var FilterSearch = function (_Component) {
  _inherits(FilterSearch, _Component);

  function FilterSearch(props) {
    _classCallCheck(this, FilterSearch);

    var _this = _possibleConstructorReturn(this, (FilterSearch.__proto__ || Object.getPrototypeOf(FilterSearch)).call(this, props));

    _this.state = {
      search: ''
    };

    _this.updateQuery = _this.updateQuery.bind(_this);
    return _this;
  }

  _createClass(FilterSearch, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var search = Object(__WEBPACK_IMPORTED_MODULE_3_modules_routes_helpers_parse_query__["a" /* default */])(this.props.location.search)[__WEBPACK_IMPORTED_MODULE_7_modules_filter_sort_constants_param_names__["b" /* FILTER_SEARCH_PARAM */]];
      if (search) this.setState({ search: search });
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (this.state.search !== nextState.search) {
        this.updateQuery(nextState.search, nextProps.location);

        nextProps.updateIndices({
          indices: Object(__WEBPACK_IMPORTED_MODULE_5_modules_filter_sort_helpers_filter_by_search__["a" /* default */])(nextState.search, nextProps.searchKeys, nextProps.items),
          type: __WEBPACK_IMPORTED_MODULE_7_modules_filter_sort_constants_param_names__["b" /* FILTER_SEARCH_PARAM */]
        });
      }

      if (!Object(__WEBPACK_IMPORTED_MODULE_6_lodash__["isEqual"])(this.props.items, nextProps.items)) {
        nextProps.updateIndices({
          indices: Object(__WEBPACK_IMPORTED_MODULE_5_modules_filter_sort_helpers_filter_by_search__["a" /* default */])(nextState.search, nextProps.searchKeys, nextProps.items),
          type: __WEBPACK_IMPORTED_MODULE_7_modules_filter_sort_constants_param_names__["b" /* FILTER_SEARCH_PARAM */]
        });
      }
    }
  }, {
    key: 'updateQuery',
    value: function updateQuery(search, location) {
      var updatedSearch = Object(__WEBPACK_IMPORTED_MODULE_3_modules_routes_helpers_parse_query__["a" /* default */])(location.search);

      if (search === '') {
        delete updatedSearch[__WEBPACK_IMPORTED_MODULE_7_modules_filter_sort_constants_param_names__["b" /* FILTER_SEARCH_PARAM */]];
      } else {
        updatedSearch[__WEBPACK_IMPORTED_MODULE_7_modules_filter_sort_constants_param_names__["b" /* FILTER_SEARCH_PARAM */]] = search;
      }

      updatedSearch = Object(__WEBPACK_IMPORTED_MODULE_4_modules_routes_helpers_make_query__["a" /* default */])(updatedSearch);

      this.props.history.push(_extends({}, location, {
        search: updatedSearch
      }));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var p = this.props;
      var s = this.state;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'article',
        { className: __WEBPACK_IMPORTED_MODULE_8_modules_filter_sort_components_filter_search_filter_search_styles___default.a.FilterSearch },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_modules_common_components_input_input__["a" /* default */], {
          className: __WEBPACK_IMPORTED_MODULE_8_modules_filter_sort_components_filter_search_filter_search_styles___default.a.FilterSearch__input,
          isSearch: true,
          isClearable: true,
          placeholder: p.searchPlaceholder || 'Search',
          value: s.search,
          onChange: function onChange(search) {
            return _this2.setState({ search: search });
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
  items: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired,
  updateIndices: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  searchKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired,
  searchPlaceholder: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
};
/* harmony default export */ __webpack_exports__["a"] = (FilterSearch);

/***/ }),

/***/ 1884:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_modules_routes_helpers_parse_string_to_array__ = __webpack_require__(661);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_utils_get_value__ = __webpack_require__(78);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }




// NOTE --  Currently `keys` can accomodate target's of type string and array
// If ANY match is found, the item is included in the returned array
/* harmony default export */ __webpack_exports__["a"] = (function (search, keys, items) {
  if (search == null || search === '') return null;

  var searchArray = Object(__WEBPACK_IMPORTED_MODULE_0_modules_routes_helpers_parse_string_to_array__["a" /* default */])(decodeURIComponent(search));

  var checkStringMatch = function checkStringMatch(value, search) {
    return value.toLowerCase().indexOf(search) !== -1;
  };

  var checkArrayMatch = function checkArrayMatch(item, keys, search) {
    // Accomodates n-1 key's value of either array or object && final key's value of type string or array
    var parentValue = Object(__WEBPACK_IMPORTED_MODULE_1_utils_get_value__["a" /* default */])(item, keys.reduce(function (p, key, i) {
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

    return false;
  };

  var matchedItems = items.reduce(function (p, item, i) {
    var matchedSearch = searchArray.some(function (search) {
      return keys.some(function (key) {
        if (typeof key === 'string') return checkStringMatch(item[key] || '', search);

        return checkArrayMatch(item, key, search);
      });
    });

    if (matchedSearch) {
      return [].concat(_toConsumableArray(p), [i]);
    }

    return p;
  }, []);

  return matchedItems;
});

/***/ }),

/***/ 1885:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1886);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1334)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./filter-search.styles.less", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./filter-search.styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1886:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(657)(undefined);
// imports


// module
exports.push([module.i, "@font-face{font-family:FontAwesome;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1335) + ") format(\"woff\")}@font-face{font-family:icofont;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1336) + ") format(\"woff\")}._2_hCd0RRMpW-e-B7aoap7I{font-weight:500;letter-spacing:.3px;text-transform:uppercase}._28zVXvSkN4syMSkL_qDNmV{width:100%}._2_hCd0RRMpW-e-B7aoap7I{align-items:center;color:#a7a2b2;display:flex;font-size:.875rem;font-weight:400;line-height:.875rem}._2_hCd0RRMpW-e-B7aoap7I>svg{height:.75rem;margin:1px .75rem 0 0;width:.75rem}._2_hCd0RRMpW-e-B7aoap7I>input{background:none;border:none;color:inherit;font-size:inherit;line-height:inherit;text-transform:none}._2_hCd0RRMpW-e-B7aoap7I>input::-webkit-input-placeholder{color:#a7a2b2;text-transform:uppercase}._2_hCd0RRMpW-e-B7aoap7I>input:-ms-input-placeholder{color:#a7a2b2;text-transform:uppercase}._2_hCd0RRMpW-e-B7aoap7I>input::placeholder{color:#a7a2b2;text-transform:uppercase}._2_hCd0RRMpW-e-B7aoap7I>input:focus{border:none}", ""]);

// exports
exports.locals = {
	"FilterSearch__input": "_2_hCd0RRMpW-e-B7aoap7I",
	"FilterSearch": "_28zVXvSkN4syMSkL_qDNmV"
};

/***/ }),

/***/ 1887:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_filter_sort_components_filter_market_state_filter_market_state__ = __webpack_require__(1888);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_utils_get_value__ = __webpack_require__(78);







var mapStateToProps = function mapStateToProps(state) {
  return {
    currentReportingPeriod: Object(__WEBPACK_IMPORTED_MODULE_3_utils_get_value__["a" /* default */])(state, 'universe.reportPeriod')
  };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["f" /* withRouter */])(Object(__WEBPACK_IMPORTED_MODULE_0_react_redux__["b" /* connect */])(mapStateToProps)(__WEBPACK_IMPORTED_MODULE_2_modules_filter_sort_components_filter_market_state_filter_market_state__["a" /* default */])));

/***/ }),

/***/ 1888:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_common_components_dropdown_dropdown__ = __webpack_require__(1700);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_routes_helpers_parse_query__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_routes_helpers_make_query__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_filter_sort_helpers_filter_by_market_state__ = __webpack_require__(1891);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash__ = __webpack_require__(499);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_modules_filter_sort_constants_param_names__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_modules_filter_sort_constants_market_states__ = __webpack_require__(1701);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
      value: __WEBPACK_IMPORTED_MODULE_8_modules_filter_sort_constants_market_states__["b" /* MARKET_OPEN */]
    }, {
      label: 'Reporting',
      value: __WEBPACK_IMPORTED_MODULE_8_modules_filter_sort_constants_market_states__["c" /* MARKET_REPORTING */]
    }, {
      label: 'Closed',
      value: __WEBPACK_IMPORTED_MODULE_8_modules_filter_sort_constants_market_states__["a" /* MARKET_CLOSED */]
    }];

    _this.defaultMarketState = _this.marketStateOptions[0].value;

    _this.state = {
      selectedMarketState: _this.defaultMarketState
    };

    _this.updateQuery = _this.updateQuery.bind(_this);
    return _this;
  }

  _createClass(FilterMarketState, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var selectedMarketState = Object(__WEBPACK_IMPORTED_MODULE_3_modules_routes_helpers_parse_query__["a" /* default */])(this.props.location.search)[__WEBPACK_IMPORTED_MODULE_7_modules_filter_sort_constants_param_names__["a" /* FILTER_MARKET_STATE_PARAM */]];
      if (selectedMarketState) {
        this.setState({ selectedMarketState: selectedMarketState });
      } else {
        this.props.updateIndices({
          indices: Object(__WEBPACK_IMPORTED_MODULE_5_modules_filter_sort_helpers_filter_by_market_state__["a" /* default */])(this.state.selectedMarketState, this.props.currentReportingPeriod, this.props.items),
          type: __WEBPACK_IMPORTED_MODULE_7_modules_filter_sort_constants_param_names__["a" /* FILTER_MARKET_STATE_PARAM */]
        });
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (this.state.selectedMarketState !== nextState.selectedMarketState) {
        this.updateQuery(nextState.selectedMarketState, nextProps.location);
        this.props.updateIndices({
          indices: Object(__WEBPACK_IMPORTED_MODULE_5_modules_filter_sort_helpers_filter_by_market_state__["a" /* default */])(nextState.selectedMarketState, nextProps.currentReportingPeriod, nextProps.items),
          type: __WEBPACK_IMPORTED_MODULE_7_modules_filter_sort_constants_param_names__["a" /* FILTER_MARKET_STATE_PARAM */]
        });
      }

      if (!Object(__WEBPACK_IMPORTED_MODULE_6_lodash__["isEqual"])(this.props.items, nextProps.items)) {
        this.props.updateIndices({
          indices: Object(__WEBPACK_IMPORTED_MODULE_5_modules_filter_sort_helpers_filter_by_market_state__["a" /* default */])(nextState.selectedMarketState, nextProps.currentReportingPeriod, nextProps.items),
          type: __WEBPACK_IMPORTED_MODULE_7_modules_filter_sort_constants_param_names__["a" /* FILTER_MARKET_STATE_PARAM */]
        });
      }
    }
  }, {
    key: 'updateQuery',
    value: function updateQuery(selectedMarketState, location) {
      var updatedSearch = Object(__WEBPACK_IMPORTED_MODULE_3_modules_routes_helpers_parse_query__["a" /* default */])(location.search);

      if (selectedMarketState === this.defaultMarketState) {
        delete updatedSearch[__WEBPACK_IMPORTED_MODULE_7_modules_filter_sort_constants_param_names__["a" /* FILTER_MARKET_STATE_PARAM */]];
      } else {
        updatedSearch[__WEBPACK_IMPORTED_MODULE_7_modules_filter_sort_constants_param_names__["a" /* FILTER_MARKET_STATE_PARAM */]] = selectedMarketState;
      }

      updatedSearch = Object(__WEBPACK_IMPORTED_MODULE_4_modules_routes_helpers_make_query__["a" /* default */])(updatedSearch);

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
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_modules_common_components_dropdown_dropdown__["a" /* default */], {
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
  updateIndices: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  currentReportingPeriod: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number
};
/* harmony default export */ __webpack_exports__["a"] = (FilterMarketState);

/***/ }),

/***/ 1889:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1890);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1334)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./dropdown.styles.less", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./dropdown.styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1890:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(657)(undefined);
// imports


// module
exports.push([module.i, "@font-face{font-family:FontAwesome;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1335) + ") format(\"woff\")}@font-face{font-family:icofont;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1336) + ") format(\"woff\")}.uM8M3uvppCiZxUCVk_JGV{font-size:.875rem;font-weight:400;line-height:.875rem}._3GRgfde5Yid_PDZamtGULS{color:#a7a2b2;cursor:pointer;display:flex;margin-right:1em;position:relative;z-index:1}._3PGLbI91c0SDzH_HyPvUyN{-webkit-transform:translateY(-50%);position:absolute;right:0;top:50%;transform:translateY(-50%);z-index:-1}.uM8M3uvppCiZxUCVk_JGV{padding:.5rem 1rem .5rem 0}.AJWmu2VgHeFFVTmN2IGuz{background-color:#fff;box-shadow:0 2px 4px rgba(0,0,0,.5);color:#372e4b;display:none;font-size:.75rem;line-height:.75rem;padding:.5rem 0;position:absolute;right:0;top:100%}.AJWmu2VgHeFFVTmN2IGuz._3e2PX0GaXya-qbQCaRA7-d{display:block}.AJWmu2VgHeFFVTmN2IGuz>button{background-color:inherit;cursor:pointer;padding:.25rem 1rem;text-align:left;transition:background-color .15s ease;white-space:nowrap;width:100%}.AJWmu2VgHeFFVTmN2IGuz>button._3e2PX0GaXya-qbQCaRA7-d,.AJWmu2VgHeFFVTmN2IGuz>button:hover{background-color:#dbdae1}._2oXu7u08Rb1t1atu8cEgP5{display:none;padding:.5rem 1rem .5rem 0}@media (max-width:600px){.uM8M3uvppCiZxUCVk_JGV,.AJWmu2VgHeFFVTmN2IGuz,.AJWmu2VgHeFFVTmN2IGuz._3e2PX0GaXya-qbQCaRA7-d{display:none}._2oXu7u08Rb1t1atu8cEgP5{display:block}}", ""]);

// exports
exports.locals = {
	"Dropdown__label": "uM8M3uvppCiZxUCVk_JGV",
	"Dropdown": "_3GRgfde5Yid_PDZamtGULS",
	"Dropdown__angle-down": "_3PGLbI91c0SDzH_HyPvUyN",
	"Dropdown__list": "AJWmu2VgHeFFVTmN2IGuz",
	"active": "_3e2PX0GaXya-qbQCaRA7-d",
	"Dropdown__select": "_2oXu7u08Rb1t1atu8cEgP5"
};

/***/ }),

/***/ 1891:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_utils_is_market_data_open__ = __webpack_require__(505);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_filter_sort_constants_market_states__ = __webpack_require__(1701);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }





/* harmony default export */ __webpack_exports__["a"] = (function (selectedMarketState, currentReportingPeriod, items) {
  if (selectedMarketState == null) return null;

  return items.reduce(function (p, market, i) {
    switch (selectedMarketState) {
      case __WEBPACK_IMPORTED_MODULE_1_modules_filter_sort_constants_market_states__["b" /* MARKET_OPEN */]:
        if (Object(__WEBPACK_IMPORTED_MODULE_0_utils_is_market_data_open__["b" /* isMarketDataOpen */])(market)) return [].concat(_toConsumableArray(p), [i]);
        break;
      case __WEBPACK_IMPORTED_MODULE_1_modules_filter_sort_constants_market_states__["c" /* MARKET_REPORTING */]:
        if (market.reportingWindow === currentReportingPeriod) return [].concat(_toConsumableArray(p), [i]);
        break;
      case __WEBPACK_IMPORTED_MODULE_1_modules_filter_sort_constants_market_states__["a" /* MARKET_CLOSED */]:
        if (!Object(__WEBPACK_IMPORTED_MODULE_0_utils_is_market_data_open__["b" /* isMarketDataOpen */])(market)) return [].concat(_toConsumableArray(p), [i]);
        break;
      default:
        return p;
    }

    return p;
  }, []);
});

/***/ }),

/***/ 1892:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_dom__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_filter_sort_components_sort_market_param_sort_market_param__ = __webpack_require__(1893);




/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_react_router_dom__["f" /* withRouter */])(__WEBPACK_IMPORTED_MODULE_1_modules_filter_sort_components_sort_market_param_sort_market_param__["a" /* default */]));

/***/ }),

/***/ 1893:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_common_components_dropdown_dropdown__ = __webpack_require__(1700);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_routes_helpers_parse_query__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_routes_helpers_make_query__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_modules_filter_sort_helpers_sort_by_market_param__ = __webpack_require__(1894);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lodash__ = __webpack_require__(499);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_modules_filter_sort_constants_param_names__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_modules_filter_sort_constants_market_sort_params__ = __webpack_require__(1702);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_modules_filter_sort_components_sort_market_param_sort_market_param_styles__ = __webpack_require__(1895);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_modules_filter_sort_components_sort_market_param_sort_market_param_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_modules_filter_sort_components_sort_market_param_sort_market_param_styles__);
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
      value: __WEBPACK_IMPORTED_MODULE_9_modules_filter_sort_constants_market_sort_params__["e" /* MARKET_VOLUME */]
    }, {
      label: 'Newest',
      value: __WEBPACK_IMPORTED_MODULE_9_modules_filter_sort_constants_market_sort_params__["a" /* MARKET_CREATION_TIME */]
    }, {
      label: 'Expiration',
      value: __WEBPACK_IMPORTED_MODULE_9_modules_filter_sort_constants_market_sort_params__["b" /* MARKET_END_DATE */]
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
      var queryParams = Object(__WEBPACK_IMPORTED_MODULE_4_modules_routes_helpers_parse_query__["a" /* default */])(this.props.location.search);

      var selectedMarketParam = queryParams[__WEBPACK_IMPORTED_MODULE_8_modules_filter_sort_constants_param_names__["d" /* SORT_MARKET_PARAM */]];
      if (selectedMarketParam) this.setState({ selectedMarketParam: selectedMarketParam });

      var selectedSort = queryParams[__WEBPACK_IMPORTED_MODULE_8_modules_filter_sort_constants_param_names__["c" /* SORT_MARKET_ORDER_PARAM */]];
      if (selectedSort) this.setState({ selectedSort: selectedSort !== 'false' });

      if (!selectedMarketParam || !selectedSort) {
        this.props.updateIndices({
          indices: Object(__WEBPACK_IMPORTED_MODULE_6_modules_filter_sort_helpers_sort_by_market_param__["a" /* default */])(this.state.selectedMarketParam, this.state.selectedSort, this.props.items, this.props.combinedFiltered),
          type: __WEBPACK_IMPORTED_MODULE_8_modules_filter_sort_constants_param_names__["d" /* SORT_MARKET_PARAM */]
        });
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (this.state.selectedMarketParam !== nextState.selectedMarketParam || this.state.selectedSort !== nextState.selectedSort) {
        this.updateQuery(nextState.selectedMarketParam, nextState.selectedSort, nextProps.location);
      }

      if (!Object(__WEBPACK_IMPORTED_MODULE_7_lodash__["isEqual"])(this.props.combinedFiltered, nextProps.combinedFiltered) || !Object(__WEBPACK_IMPORTED_MODULE_7_lodash__["isEqual"])(this.props.items, nextProps.items) || this.state.selectedMarketParam !== nextState.selectedMarketParam || this.state.selectedSort !== nextState.selectedSort) {
        this.props.updateIndices({
          indices: Object(__WEBPACK_IMPORTED_MODULE_6_modules_filter_sort_helpers_sort_by_market_param__["a" /* default */])(nextState.selectedMarketParam, nextState.selectedSort, nextProps.items, nextProps.combinedFiltered),
          type: __WEBPACK_IMPORTED_MODULE_8_modules_filter_sort_constants_param_names__["d" /* SORT_MARKET_PARAM */]
        });
      }
    }
  }, {
    key: 'updateQuery',
    value: function updateQuery(selectedMarketParam, selectedSort, location) {
      var updatedSearch = Object(__WEBPACK_IMPORTED_MODULE_4_modules_routes_helpers_parse_query__["a" /* default */])(location.search);

      if (selectedMarketParam === this.defaultMarketParam) {
        delete updatedSearch[__WEBPACK_IMPORTED_MODULE_8_modules_filter_sort_constants_param_names__["d" /* SORT_MARKET_PARAM */]];
      } else {
        updatedSearch[__WEBPACK_IMPORTED_MODULE_8_modules_filter_sort_constants_param_names__["d" /* SORT_MARKET_PARAM */]] = selectedMarketParam;
      }

      if (selectedSort === this.defaultSort) {
        delete updatedSearch[__WEBPACK_IMPORTED_MODULE_8_modules_filter_sort_constants_param_names__["c" /* SORT_MARKET_ORDER_PARAM */]];
      } else {
        updatedSearch[__WEBPACK_IMPORTED_MODULE_8_modules_filter_sort_constants_param_names__["c" /* SORT_MARKET_ORDER_PARAM */]] = selectedSort;
      }

      updatedSearch = Object(__WEBPACK_IMPORTED_MODULE_5_modules_routes_helpers_make_query__["a" /* default */])(updatedSearch);

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
        { className: __WEBPACK_IMPORTED_MODULE_10_modules_filter_sort_components_sort_market_param_sort_market_param_styles___default.a.SortMarketParam },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'button',
          {
            className: __WEBPACK_IMPORTED_MODULE_10_modules_filter_sort_components_sort_market_param_sort_market_param_styles___default.a.SortMarketParam__order,
            onClick: function onClick() {
              return _this2.setState({ selectedSort: !s.selectedSort });
            }
          },
          s.selectedSort ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()(__WEBPACK_IMPORTED_MODULE_10_modules_filter_sort_components_sort_market_param_sort_market_param_styles___default.a.fa, __WEBPACK_IMPORTED_MODULE_10_modules_filter_sort_components_sort_market_param_sort_market_param_styles___default.a['fa-sort-amount-desc']) }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()(__WEBPACK_IMPORTED_MODULE_10_modules_filter_sort_components_sort_market_param_sort_market_param_styles___default.a.fa, __WEBPACK_IMPORTED_MODULE_10_modules_filter_sort_components_sort_market_param_sort_market_param_styles___default.a['fa-sort-amount-asc']) })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_common_components_dropdown_dropdown__["a" /* default */], {
          className: 'companion-field',
          'default': s.selectedMarketParam,
          options: this.marketSortParams,
          onChange: function onChange(selectedMarketParam) {
            return _this2.setState({ selectedMarketParam: selectedMarketParam });
          }
        })
      );
    }
  }]);

  return SortMarketParam;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

SortMarketParam.propTypes = {
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  items: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired,
  updateIndices: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  combinedFiltered: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array
};
/* harmony default export */ __webpack_exports__["a"] = (SortMarketParam);

/***/ }),

/***/ 1894:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_modules_filter_sort_constants_market_sort_params__ = __webpack_require__(1702);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_utils_get_value__ = __webpack_require__(78);




/* harmony default export */ __webpack_exports__["a"] = (function (selectedMarketParam, selectedSort, items, combinedFiltered) {
  if (selectedMarketParam == null || selectedSort == null || combinedFiltered == null) return null;

  return combinedFiltered.slice().sort(function (a, b) {
    switch (selectedMarketParam) {
      case __WEBPACK_IMPORTED_MODULE_0_modules_filter_sort_constants_market_sort_params__["a" /* MARKET_CREATION_TIME */]:
      case __WEBPACK_IMPORTED_MODULE_0_modules_filter_sort_constants_market_sort_params__["b" /* MARKET_END_DATE */]:
        {
          if (selectedSort) {
            return Object(__WEBPACK_IMPORTED_MODULE_1_utils_get_value__["a" /* default */])(items, b + '.' + selectedMarketParam + '.timestamp') - Object(__WEBPACK_IMPORTED_MODULE_1_utils_get_value__["a" /* default */])(items, a + '.' + selectedMarketParam + '.timestamp');
          }

          return Object(__WEBPACK_IMPORTED_MODULE_1_utils_get_value__["a" /* default */])(items, a + '.' + selectedMarketParam + '.timestamp') - Object(__WEBPACK_IMPORTED_MODULE_1_utils_get_value__["a" /* default */])(items, b + '.' + selectedMarketParam + '.timestamp');
        }
      case __WEBPACK_IMPORTED_MODULE_0_modules_filter_sort_constants_market_sort_params__["e" /* MARKET_VOLUME */]:
      case __WEBPACK_IMPORTED_MODULE_0_modules_filter_sort_constants_market_sort_params__["d" /* MARKET_TAKER_FEE */]:
      case __WEBPACK_IMPORTED_MODULE_0_modules_filter_sort_constants_market_sort_params__["c" /* MARKET_MAKER_FEE */]:
        {
          if (selectedSort) {
            return Object(__WEBPACK_IMPORTED_MODULE_1_utils_get_value__["a" /* default */])(items, b + '.' + selectedMarketParam + '.value') - Object(__WEBPACK_IMPORTED_MODULE_1_utils_get_value__["a" /* default */])(items, a + '.' + selectedMarketParam + '.value');
          }

          return Object(__WEBPACK_IMPORTED_MODULE_1_utils_get_value__["a" /* default */])(items, a + '.' + selectedMarketParam + '.value') - Object(__WEBPACK_IMPORTED_MODULE_1_utils_get_value__["a" /* default */])(items, b + '.' + selectedMarketParam + '.value');
        }
      default:
        return 0; // No sorting
    }
  });
});

/***/ }),

/***/ 1895:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1896);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1334)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./sort-market-param.styles.less", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./sort-market-param.styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1896:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(657)(undefined);
// imports


// module
exports.push([module.i, "@font-face{font-family:FontAwesome;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1335) + ") format(\"woff\")}@font-face{font-family:icofont;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1336) + ") format(\"woff\")}._3pz4QBPMUeRL-ATWAOqJmw{align-items:center;display:flex;flex-wrap:nowrap}._3kprgzEk31_Od_ej6-tCQq{align-items:center;color:#a7a2b2;cursor:pointer;font-size:.7rem;line-height:.7rem;margin-right:1rem;padding-top:3px}", ""]);

// exports
exports.locals = {
	"SortMarketParam": "_3pz4QBPMUeRL-ATWAOqJmw",
	"SortMarketParam__order": "_3kprgzEk31_Od_ej6-tCQq"
};

/***/ }),

/***/ 1897:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1898);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1334)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./markets-header.styles.less", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./markets-header.styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1898:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(657)(undefined);
// imports


// module
exports.push([module.i, "@font-face{font-family:FontAwesome;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1335) + ") format(\"woff\")}@font-face{font-family:icofont;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1336) + ") format(\"woff\")}._3dekkWOmjf2bIxGTls4B65{font-weight:500;text-transform:uppercase}._1sfcLnCkswC-My_LN5GlDt{font-size:1rem;padding:2.5rem 2rem 2rem}._3dekkWOmjf2bIxGTls4B65{color:#fff;flex:1;margin-bottom:0}._2NKY4frq6okfIiAausFkQ6{margin-bottom:3.875em}.wW0lqp5FjWZcMPqxhEZ9z{align-self:flex-end;display:flex}._7nKmHhWVS0KLwCqOjIxNW{align-items:center;display:flex;width:100%}@media (max-width:600px){._1sfcLnCkswC-My_LN5GlDt{padding-left:1rem;padding-right:1rem}}@media (max-width:450px){._7nKmHhWVS0KLwCqOjIxNW{display:block}._3dekkWOmjf2bIxGTls4B65{margin-bottom:1rem}}", ""]);

// exports
exports.locals = {
	"MarketsHeader__heading": "_3dekkWOmjf2bIxGTls4B65",
	"MarketsHeader": "_1sfcLnCkswC-My_LN5GlDt",
	"MarketsHeader__search": "_2NKY4frq6okfIiAausFkQ6",
	"MarketsHeader__filters": "wW0lqp5FjWZcMPqxhEZ9z",
	"MarketsHeader__wrapper": "_7nKmHhWVS0KLwCqOjIxNW"
};

/***/ }),

/***/ 1899:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_services_augurjs__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_markets_actions_update_has_loaded_markets__ = __webpack_require__(672);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_markets_actions_update_markets_data__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_utils_is_object__ = __webpack_require__(679);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_utils_log_error__ = __webpack_require__(22);






var loadMarkets = function loadMarkets() {
  var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : __WEBPACK_IMPORTED_MODULE_4_utils_log_error__["a" /* default */];
  return function (dispatch, getState) {
    var _getState = getState(),
        universe = _getState.universe;

    __WEBPACK_IMPORTED_MODULE_0_services_augurjs__["a" /* augur */].markets.getMarketsInfo({ universe: universe.id }, function (err, marketsData) {
      if (err) return callback(err);
      if (marketsData == null || !Object(__WEBPACK_IMPORTED_MODULE_3_utils_is_object__["a" /* default */])(marketsData)) {
        dispatch(Object(__WEBPACK_IMPORTED_MODULE_1_modules_markets_actions_update_has_loaded_markets__["b" /* updateHasLoadedMarkets */])(false));
        return callback('no markets data received');
      }
      if (!Object.keys(marketsData).length) return callback(null);
      dispatch(Object(__WEBPACK_IMPORTED_MODULE_2_modules_markets_actions_update_markets_data__["e" /* clearMarketsData */])());
      dispatch(Object(__WEBPACK_IMPORTED_MODULE_2_modules_markets_actions_update_markets_data__["g" /* updateMarketsData */])(marketsData));
      dispatch(Object(__WEBPACK_IMPORTED_MODULE_1_modules_markets_actions_update_has_loaded_markets__["b" /* updateHasLoadedMarkets */])(true));
      callback(null, marketsData);
    });
  };
};

/* harmony default export */ __webpack_exports__["a"] = (loadMarkets);

/***/ }),

/***/ 1900:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return loadMarketsByTopic; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_services_augurjs__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_topics_actions_update_has_loaded_topic__ = __webpack_require__(678);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_markets_actions_load_markets_info__ = __webpack_require__(327);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var loadMarketsByTopic = function loadMarketsByTopic(category) {
  return function (dispatch, getState) {
    var _getState = getState(),
        universe = _getState.universe;

    dispatch(Object(__WEBPACK_IMPORTED_MODULE_1_modules_topics_actions_update_has_loaded_topic__["b" /* updateHasLoadedTopic */])(_defineProperty({}, category, true)));
    __WEBPACK_IMPORTED_MODULE_0_services_augurjs__["a" /* augur */].markets.getMarketsInCategory({ category: category, universe: universe.id }, function (err, marketIDs) {
      if (err) {
        console.error('ERROR findMarketsWithTopic()', err);
        dispatch(Object(__WEBPACK_IMPORTED_MODULE_1_modules_topics_actions_update_has_loaded_topic__["b" /* updateHasLoadedTopic */])(_defineProperty({}, category, false)));
      } else if (!marketIDs) {
        console.warn('WARN findMarketsWithTopic()', 'no market id\'s returned');
        dispatch(Object(__WEBPACK_IMPORTED_MODULE_1_modules_topics_actions_update_has_loaded_topic__["b" /* updateHasLoadedTopic */])(_defineProperty({}, category, false)));
      } else if (marketIDs.length) {
        dispatch(Object(__WEBPACK_IMPORTED_MODULE_2_modules_markets_actions_load_markets_info__["a" /* loadMarketsInfo */])(marketIDs));
      }
    });
  };
};

/***/ })

});
//# sourceMappingURL=markets.cba435a2baca2985ff60.js.map