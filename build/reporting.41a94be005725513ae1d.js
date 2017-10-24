webpackJsonp([5],{

/***/ 1351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_routes_components_authenticated_route_authenticated_route__ = __webpack_require__(668);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_reporting_containers_reporting_open__ = __webpack_require__(2075);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_reporting_containers_reporting_closed__ = __webpack_require__(2081);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_routes_helpers_make_path__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_modules_routes_constants_views__ = __webpack_require__(63);












var ReportingView = function ReportingView(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'section',
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Switch */],
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_modules_routes_components_authenticated_route_authenticated_route__["a" /* default */], { path: Object(__WEBPACK_IMPORTED_MODULE_5_modules_routes_helpers_make_path__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_6_modules_routes_constants_views__["s" /* REPORTING_OPEN */]), component: __WEBPACK_IMPORTED_MODULE_3_modules_reporting_containers_reporting_open__["a" /* default */] }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_modules_routes_components_authenticated_route_authenticated_route__["a" /* default */], { path: Object(__WEBPACK_IMPORTED_MODULE_5_modules_routes_helpers_make_path__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_6_modules_routes_constants_views__["r" /* REPORTING_CLOSED */]), component: __WEBPACK_IMPORTED_MODULE_4_modules_reporting_containers_reporting_closed__["a" /* default */] })
    )
  );
};

/* harmony default export */ __webpack_exports__["default"] = (ReportingView);

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

/***/ 1865:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_reporting_components_reporting_header_reporting_header_styles__ = __webpack_require__(2077);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_reporting_components_reporting_header_reporting_header_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_modules_reporting_components_reporting_header_reporting_header_styles__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var ReportingHeader = function (_Component) {
  _inherits(ReportingHeader, _Component);

  function ReportingHeader(props) {
    _classCallCheck(this, ReportingHeader);

    var _this = _possibleConstructorReturn(this, (ReportingHeader.__proto__ || Object.getPrototypeOf(ReportingHeader)).call(this, props));

    _this.state = {
      daysLeft: 9,
      endDate: 'November 20, 2017',
      totalStake: 1
    };
    return _this;
  }

  _createClass(ReportingHeader, [{
    key: 'render',
    value: function render() {
      var s = this.state;
      var p = this.props;

      var currentPeriodStyle = {
        width: (27 - s.daysLeft) / 27 * 100 + '%'
      };

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'article',
        { className: __WEBPACK_IMPORTED_MODULE_2_modules_reporting_components_reporting_header_reporting_header_styles___default.a.ReportingHeader },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: __WEBPACK_IMPORTED_MODULE_2_modules_reporting_components_reporting_header_reporting_header_styles___default.a.ReportingHeader__header },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'h1',
              { className: __WEBPACK_IMPORTED_MODULE_2_modules_reporting_components_reporting_header_reporting_header_styles___default.a.ReportingHeader__heading },
              p.heading
            ),
            p.showReportingEndDate && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: __WEBPACK_IMPORTED_MODULE_2_modules_reporting_components_reporting_header_reporting_header_styles___default.a.ReportingHeader__endDate },
              'Reporting cycle ends ',
              s.endDate
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: __WEBPACK_IMPORTED_MODULE_2_modules_reporting_components_reporting_header_reporting_header_styles___default.a.ReportingHeader__stake },
              'Total Stake: ',
              s.totalStake,
              ' REP'
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: __WEBPACK_IMPORTED_MODULE_2_modules_reporting_components_reporting_header_reporting_header_styles___default.a['ReportingHeader__graph-wrapper'] },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_2_modules_reporting_components_reporting_header_reporting_header_styles___default.a.ReportingHeader__graph },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: __WEBPACK_IMPORTED_MODULE_2_modules_reporting_components_reporting_header_reporting_header_styles___default.a['ReportingHeader__graph-current'] },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { style: currentPeriodStyle },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  null,
                  s.daysLeft,
                  ' days left'
                )
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: __WEBPACK_IMPORTED_MODULE_2_modules_reporting_components_reporting_header_reporting_header_styles___default.a['ReportingHeader__graph-dispute'] })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_2_modules_reporting_components_reporting_header_reporting_header_styles___default.a.ReportingHeader__labels },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              'Current Cycle'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              'Dispute'
            )
          )
        )
      );
    }
  }]);

  return ReportingHeader;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

ReportingHeader.propTypes = {
  heading: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  showReportingEndDate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired
};
/* harmony default export */ __webpack_exports__["a"] = (ReportingHeader);

/***/ }),

/***/ 2075:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_reporting_components_reporting_open_reporting_open__ = __webpack_require__(2076);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_market_selectors_scalar_share_denomination__ = __webpack_require__(1497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_markets_actions_update_favorites__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_markets_actions_load_markets_info__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_utils_get_value__ = __webpack_require__(78);





// import getAllMarkets from 'modules/markets/selectors/markets-all'







var mapStateToProps = function mapStateToProps(state) {
  return {
    isLogged: state.isLogged,
    markets: markets, // getAllMarkets(),
    universe: state.universe,
    scalarShareDenomination: Object(__WEBPACK_IMPORTED_MODULE_3_modules_market_selectors_scalar_share_denomination__["a" /* default */])(),
    canLoadMarkets: !!Object(__WEBPACK_IMPORTED_MODULE_6_utils_get_value__["a" /* default */])(state, 'universe.id'),
    hasLoadedMarkets: state.hasLoadedMarkets
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    loadMarketsInfo: function loadMarketsInfo(marketIDs) {
      return dispatch(Object(__WEBPACK_IMPORTED_MODULE_5_modules_markets_actions_load_markets_info__["a" /* loadMarketsInfo */])(marketIDs));
    },
    toggleFavorite: function toggleFavorite(marketID) {
      return dispatch(Object(__WEBPACK_IMPORTED_MODULE_4_modules_markets_actions_update_favorites__["c" /* toggleFavorite */])(marketID));
    }
  };
};

var Reporting = Object(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["f" /* withRouter */])(Object(__WEBPACK_IMPORTED_MODULE_0_react_redux__["b" /* connect */])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_2_modules_reporting_components_reporting_open_reporting_open__["a" /* default */]));

/* harmony default export */ __webpack_exports__["a"] = (Reporting);

var markets = [{
  id: '0xcd7b177af7a12ec3be1c7f992ec7d608959630f2113227a2cdd9db562bd01eb4',
  branchID: '0xf69b5',
  tradingPeriod: 8947,
  tradingFee: '0.025',
  makerFee: '0.0125',
  takerFee: '0.025',
  creationTime: {
    value: '2017-10-16T14:36:38.000Z',
    formatted: 'Oct 16, 2017 2:36 PM',
    formattedLocal: 'Oct 16, 2017 7:36 AM (UTC -7)',
    full: 'Mon, 16 Oct 2017 14:36:38 GMT',
    timestamp: 1508164598000
  },
  volume: {
    value: 3000,
    formattedValue: 3000,
    formatted: '3,000',
    roundedValue: 3000,
    rounded: '3,000.00',
    minimized: '3,000',
    denomination: ' shares',
    full: '3,000 shares'
  },
  topic: 'Cryptocurrency',
  tags: ['Cryptocurrency', 'Bitcoin', 'Ethereum'],
  endDate: {
    value: '2018-12-30T08:00:00.000Z',
    formatted: 'Dec 30, 2018 8:00 AM',
    formattedLocal: 'Dec 30, 2018 12:00 AM (UTC -8)',
    full: 'Sun, 30 Dec 2018 08:00:00 GMT',
    timestamp: 1546156800000
  },
  eventID: '0xee03ff4923cb4fc8f2f2370e0f1d5cffd321342d304e221e566623616f676ba4',
  minValue: '1',
  maxValue: '2',
  numOutcomes: 2,
  type: 'binary',
  consensus: null,
  description: 'Will Bitcoin be surpassed by Ethereum by the end of 2018?',
  isLoadedMarketInfo: true,
  isLoading: false,
  network: '9000',
  cumulativeScale: '1',
  creationBlock: 422516,
  creationFee: '7.2',
  author: '0xa5f5cecbb1e1a1e784a975b4d019f50e06a95091',
  eventBond: '3.6',
  outcomes: [{
    id: '2',
    outstandingShares: '1000',
    price: '0',
    sharesPurchased: '0',
    name: 'Yes',
    marketID: '0xcd7b177af7a12ec3be1c7f992ec7d608959630f2113227a2cdd9db562bd01eb4',
    lastPrice: {
      value: 0,
      formattedValue: 0,
      formatted: '0',
      roundedValue: 0,
      rounded: '0.0000',
      minimized: '0',
      denomination: ' ETH Tokens',
      full: '0 ETH Tokens'
    },
    lastPricePercent: {
      value: 50,
      formattedValue: 50,
      formatted: '50.0',
      roundedValue: 50,
      rounded: '50',
      minimized: '50',
      denomination: '%',
      full: '50.0%'
    },
    trade: {
      side: 'buy',
      numShares: null,
      limitPrice: null,
      maxNumShares: {
        value: 0,
        formattedValue: 0,
        formatted: '0',
        roundedValue: 0,
        rounded: '0.00',
        minimized: '0',
        denomination: ' shares',
        full: '0 shares'
      },
      potentialEthProfit: null,
      potentialEthLoss: null,
      potentialLossPercent: null,
      potentialProfitPercent: null,
      totalFee: {
        value: 0,
        formattedValue: 0,
        formatted: '',
        roundedValue: 0,
        rounded: '',
        minimized: '',
        denomination: '',
        full: ''
      },
      gasFeesRealEth: {
        value: 0,
        formattedValue: 0,
        formatted: '',
        roundedValue: 0,
        rounded: '',
        minimized: '',
        denomination: '',
        full: ''
      },
      totalCost: {
        value: 0,
        formattedValue: 0,
        formatted: '0',
        roundedValue: 0,
        rounded: '0.0000',
        minimized: '0',
        denomination: ' ETH Tokens',
        full: '0 ETH Tokens'
      },
      tradeTypeOptions: [{
        label: 'buy',
        value: 'buy'
      }, {
        label: 'sell',
        value: 'sell'
      }],
      tradeSummary: {
        totalGas: {
          value: 0,
          formattedValue: 0,
          formatted: '0',
          roundedValue: 0,
          rounded: '0.0000',
          minimized: '0',
          denomination: ' ETH',
          full: '0 ETH'
        },
        tradeOrders: []
      }
    },
    orderBook: {
      bids: [],
      asks: []
    },
    orderBookSeries: {
      bids: [],
      asks: []
    },
    topBid: null,
    topAsk: null,
    position: null,
    userOpenOrders: []
  }],
  extraInfo: 'Will Ethereum value overpass Bitcoin by the end of 2018?',
  formattedDescription: 'will_bitcoin_be_surpassed_by_ethereum_by_the_end_of_2018',
  isBinary: true,
  isCategorical: false,
  isScalar: false,
  isMarketLoading: false,
  endDateLabel: 'ends',
  isOpen: true,
  isFavorite: false,
  takerFeePercent: {
    value: 2.5,
    formattedValue: 2.5,
    formatted: '2.5',
    roundedValue: 2,
    rounded: '2',
    minimized: '2.5',
    denomination: '%',
    full: '2.5%'
  },
  makerFeePercent: {
    value: 1.25,
    formattedValue: 1.2,
    formatted: '1.2',
    roundedValue: 1,
    rounded: '1',
    minimized: '1.2',
    denomination: '%',
    full: '1.2%'
  },
  isRequiredToReportByAccount: false,
  isPendingReport: true,
  isReportSubmitted: false,
  isReported: false,
  isMissedReport: false,
  isReportTabVisible: false,
  isSnitchTabVisible: false,
  report: {},
  outstandingShares: {
    value: 1000,
    formattedValue: 1000,
    formatted: '1,000',
    roundedValue: 1000,
    rounded: '1,000',
    minimized: '1,000',
    denomination: '',
    full: '1,000'
  },
  priceTimeSeries: [],
  reportableOutcomes: [{
    id: '1',
    name: 'No'
  }, {
    id: '2',
    name: 'Yes'
  }, {
    id: '1.5',
    name: 'Indeterminate'
  }],
  userOpenOrdersSummary: null,
  tradeSummary: {
    totalGas: {
      value: 0,
      formattedValue: 0,
      formatted: '0',
      roundedValue: 0,
      rounded: '0.0000',
      minimized: '0',
      denomination: ' ETH',
      full: '0 ETH'
    },
    tradeOrders: [],
    hasUserEnoughFunds: false
  }
}, {
  id: '0xbb8b7835162b95b6994013cd04d8f28125c3c11c8bae84c73772785a666ca272',
  branchID: '0xf69b5',
  tradingPeriod: 8738,
  tradingFee: '0.02',
  makerFee: '0.01',
  takerFee: '0.02',
  creationTime: {
    value: '2017-10-13T21:01:36.000Z',
    formatted: 'Oct 13, 2017 9:01 PM',
    formattedLocal: 'Oct 13, 2017 2:01 PM (UTC -7)',
    full: 'Fri, 13 Oct 2017 21:01:36 GMT',
    timestamp: 1507928496000
  },
  volume: {
    value: 30.5,
    formattedValue: 30.5,
    formatted: '30.5',
    roundedValue: 30.5,
    rounded: '30.50',
    minimized: '30.5',
    denomination: ' shares',
    full: '30.5 shares'
  },
  topic: 'MLB Baseball',
  tags: ['MLB Baseball', 'Baseball'],
  endDate: {
    value: '2017-11-05T07:00:00.000Z',
    formatted: 'Nov 5, 2017 7:00 AM',
    formattedLocal: 'Nov 5, 2017 12:00 AM (UTC -7)',
    full: 'Sun, 05 Nov 2017 07:00:00 GMT',
    timestamp: 1509865200000
  },
  eventID: '0x55c24b4a613d57869cfb42a640d744d2d646aaa1f30e0147c6a7da5a6a72eeb8',
  minValue: '1',
  maxValue: '2',
  numOutcomes: 2,
  type: 'binary',
  consensus: null,
  description: 'Will the Yankees win the 2017 world series?',
  isLoadedMarketInfo: true,
  isLoading: false,
  network: '9000',
  cumulativeScale: '1',
  creationBlock: 405426,
  creationFee: '9',
  author: '0x8e0a2a84b8dab1a441d6f8c68562dc8a1708455c',
  eventBond: '4.5',
  outcomes: [{
    id: '2',
    outstandingShares: '10',
    price: '0.3',
    sharesPurchased: '0',
    name: 'Yes',
    marketID: '0xbb8b7835162b95b6994013cd04d8f28125c3c11c8bae84c73772785a666ca272',
    lastPrice: {
      value: 0.3,
      formattedValue: 0.3,
      formatted: '0.3000',
      roundedValue: 0.3,
      rounded: '0.3000',
      minimized: '0.3',
      denomination: ' ETH Tokens',
      full: '0.3000 ETH Tokens'
    },
    lastPricePercent: {
      value: 30,
      formattedValue: 30,
      formatted: '30.0',
      roundedValue: 30,
      rounded: '30',
      minimized: '30',
      denomination: '%',
      full: '30.0%'
    },
    trade: {
      side: 'buy',
      numShares: null,
      limitPrice: null,
      maxNumShares: {
        value: 0,
        formattedValue: 0,
        formatted: '0',
        roundedValue: 0,
        rounded: '0.00',
        minimized: '0',
        denomination: ' shares',
        full: '0 shares'
      },
      potentialEthProfit: null,
      potentialEthLoss: null,
      potentialLossPercent: null,
      potentialProfitPercent: null,
      totalFee: {
        value: 0,
        formattedValue: 0,
        formatted: '',
        roundedValue: 0,
        rounded: '',
        minimized: '',
        denomination: '',
        full: ''
      },
      gasFeesRealEth: {
        value: 0,
        formattedValue: 0,
        formatted: '',
        roundedValue: 0,
        rounded: '',
        minimized: '',
        denomination: '',
        full: ''
      },
      totalCost: {
        value: 0,
        formattedValue: 0,
        formatted: '0',
        roundedValue: 0,
        rounded: '0.0000',
        minimized: '0',
        denomination: ' ETH Tokens',
        full: '0 ETH Tokens'
      },
      tradeTypeOptions: [{
        label: 'buy',
        value: 'buy'
      }, {
        label: 'sell',
        value: 'sell'
      }],
      tradeSummary: {
        totalGas: {
          value: 0,
          formattedValue: 0,
          formatted: '0',
          roundedValue: 0,
          rounded: '0.0000',
          minimized: '0',
          denomination: ' ETH',
          full: '0 ETH'
        },
        tradeOrders: []
      }
    },
    orderBook: {
      bids: [],
      asks: []
    },
    orderBookSeries: {
      bids: [],
      asks: []
    },
    topBid: null,
    topAsk: null,
    position: null,
    userOpenOrders: []
  }],
  formattedDescription: 'will_the_yankees_win_the_2017_world_series',
  isBinary: true,
  isCategorical: false,
  isScalar: false,
  isMarketLoading: false,
  endDateLabel: 'ends',
  isOpen: true,
  isFavorite: false,
  takerFeePercent: {
    value: 2,
    formattedValue: 2,
    formatted: '2.0',
    roundedValue: 2,
    rounded: '2',
    minimized: '2',
    denomination: '%',
    full: '2.0%'
  },
  makerFeePercent: {
    value: 1,
    formattedValue: 1,
    formatted: '1.0',
    roundedValue: 1,
    rounded: '1',
    minimized: '1',
    denomination: '%',
    full: '1.0%'
  },
  isRequiredToReportByAccount: false,
  isPendingReport: true,
  isReportSubmitted: false,
  isReported: false,
  isMissedReport: false,
  isReportTabVisible: false,
  isSnitchTabVisible: false,
  report: {},
  outstandingShares: {
    value: 10,
    formattedValue: 10,
    formatted: '10',
    roundedValue: 10,
    rounded: '10',
    minimized: '10',
    denomination: '',
    full: '10'
  },
  priceTimeSeries: [],
  reportableOutcomes: [{
    id: '1',
    name: 'No'
  }, {
    id: '2',
    name: 'Yes'
  }, {
    id: '1.5',
    name: 'Indeterminate'
  }],
  userOpenOrdersSummary: null,
  tradeSummary: {
    totalGas: {
      value: 0,
      formattedValue: 0,
      formatted: '0',
      roundedValue: 0,
      rounded: '0.0000',
      minimized: '0',
      denomination: ' ETH',
      full: '0 ETH'
    },
    tradeOrders: [],
    hasUserEnoughFunds: false
  }
}];

/***/ }),

/***/ 2076:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet__ = __webpack_require__(658);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_reporting_components_reporting_header_reporting_header__ = __webpack_require__(1865);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_markets_components_markets_list__ = __webpack_require__(1495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_reporting_components_reporting_open_reporting_open_styles__ = __webpack_require__(2079);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_reporting_components_reporting_open_reporting_open_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_modules_reporting_components_reporting_open_reporting_open_styles__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var ReportingOpen = function (_Component) {
  _inherits(ReportingOpen, _Component);

  function ReportingOpen(props) {
    _classCallCheck(this, ReportingOpen);

    var _this = _possibleConstructorReturn(this, (ReportingOpen.__proto__ || Object.getPrototypeOf(ReportingOpen)).call(this, props));

    _this.state = {
      filteredMarketsReporting: [0, 1],
      filteredMarketsDispute: [0, 1]
    };
    return _this;
  }

  _createClass(ReportingOpen, [{
    key: 'render',
    value: function render() {
      var s = this.state;
      var p = this.props;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'section',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_react_helmet__["Helmet"],
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'title',
            null,
            'Reporting'
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_reporting_components_reporting_header_reporting_header__["a" /* default */], {
          heading: 'Reporting',
          showReportingEndDate: true
        }),
        s.filteredMarketsDispute.length && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h2',
          { className: __WEBPACK_IMPORTED_MODULE_5_modules_reporting_components_reporting_open_reporting_open_styles___default.a.ReportingOpen__heading },
          'In Dispute'
        ),
        s.filteredMarketsDispute.length && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_modules_markets_components_markets_list__["a" /* default */], {
          isLogged: p.isLogged,
          markets: p.markets,
          filteredMarkets: s.filteredMarketsDispute,
          location: p.location,
          history: p.history,
          scalarShareDenomination: p.scalarShareDenomination,
          toggleFavorite: p.toggleFavorite,
          loadMarketsInfo: p.loadMarketsInfo
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h2',
          { className: __WEBPACK_IMPORTED_MODULE_5_modules_reporting_components_reporting_open_reporting_open_styles___default.a.ReportingOpen__heading },
          'In Reporting'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_modules_markets_components_markets_list__["a" /* default */], {
          isLogged: p.isLogged,
          markets: p.markets,
          filteredMarkets: s.filteredMarketsReporting,
          location: p.location,
          history: p.history,
          scalarShareDenomination: p.scalarShareDenomination,
          toggleFavorite: p.toggleFavorite,
          loadMarketsInfo: p.loadMarketsInfo
        })
      );
    }
  }]);

  return ReportingOpen;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

ReportingOpen.propTypes = {
  markets: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired,
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  scalarShareDenomination: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  toggleFavorite: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  loadMarketsInfo: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  isLogged: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired
};
/* harmony default export */ __webpack_exports__["a"] = (ReportingOpen);

/***/ }),

/***/ 2077:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2078);
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
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./reporting-header.styles.less", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./reporting-header.styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 2078:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(657)(undefined);
// imports


// module
exports.push([module.i, "@font-face{font-family:FontAwesome;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1335) + ") format(\"woff\")}@font-face{font-family:icofont;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1336) + ") format(\"woff\")}._2hwpMUX8y38zRaOvP8FkrM{font-weight:500;text-transform:uppercase}._3Z9LhtByCrjq2iIfjUTHRP,._1gwDoQr-kr_PJ1YOPf6Ei,._3ZEwOwTCWdEEh6Klzxy4Nw{font-weight:500;letter-spacing:.3px;text-transform:uppercase}._1gwDoQr-kr_PJ1YOPf6Ei,._3ZEwOwTCWdEEh6Klzxy4Nw{font-size:.625rem;font-weight:400;line-height:.625rem}._3Z9LhtByCrjq2iIfjUTHRP{font-size:.75rem;font-weight:400;line-height:.75rem}._33_tTeNjgkmiWNw0_9sYPK{color:#fff;margin-bottom:3rem;padding:6rem 2rem 0}._3Z9LhtByCrjq2iIfjUTHRP{font-weight:500}._33lqvf4Q7_A380ePQMWwij{background-color:#44415a;border-radius:3px;display:flex;height:1.5rem;justify-content:space-between;overflow:hidden}._3UjMj0iuKvIkQhjI7JRM6m{width:78%}._3UjMj0iuKvIkQhjI7JRM6m>div{background-image:linear-gradient(-270deg,hsla(0,0%,85%,0) 6%,hsla(0,0%,93%,.5) 95%);border-right:2px solid #fff;height:100%;position:relative}._3UjMj0iuKvIkQhjI7JRM6m>div>span{-webkit-transform:translateY(-50%);font-size:.625rem;left:100%;line-height:.625rem;margin-left:.5rem;position:absolute;top:50%;transform:translateY(-50%);white-space:nowrap}._3lkiztv0x8oxlO3rmh9yod{background-color:#736e89;width:22%}._1vGb4g6KgE8NLqhlK--Dip{margin-top:1rem}._1o5IfewHuYT41Og4BfAHTh{align-items:center;display:flex;justify-content:space-between}._2hwpMUX8y38zRaOvP8FkrM{margin-bottom:0}._1gwDoQr-kr_PJ1YOPf6Ei{display:flex;font-weight:700;justify-content:space-between;margin-top:.5rem;text-align:left}._1gwDoQr-kr_PJ1YOPf6Ei>span:last-child{width:22%}._3ZEwOwTCWdEEh6Klzxy4Nw{font-weight:700}@media (max-width:600px){._33_tTeNjgkmiWNw0_9sYPK{padding-left:1rem;padding-right:1rem}}@media (max-width:450px){._1o5IfewHuYT41Og4BfAHTh{display:block}._3ZEwOwTCWdEEh6Klzxy4Nw{font-weight:500}}", ""]);

// exports
exports.locals = {
	"ReportingHeader__heading": "_2hwpMUX8y38zRaOvP8FkrM",
	"ReportingHeader__endDate": "_3Z9LhtByCrjq2iIfjUTHRP",
	"ReportingHeader__labels": "_1gwDoQr-kr_PJ1YOPf6Ei",
	"ReportingHeader__stake": "_3ZEwOwTCWdEEh6Klzxy4Nw",
	"ReportingHeader": "_33_tTeNjgkmiWNw0_9sYPK",
	"ReportingHeader__graph": "_33lqvf4Q7_A380ePQMWwij",
	"ReportingHeader__graph-current": "_3UjMj0iuKvIkQhjI7JRM6m",
	"ReportingHeader__graph-dispute": "_3lkiztv0x8oxlO3rmh9yod",
	"ReportingHeader__graph-wrapper": "_1vGb4g6KgE8NLqhlK--Dip",
	"ReportingHeader__header": "_1o5IfewHuYT41Og4BfAHTh"
};

/***/ }),

/***/ 2079:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2080);
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
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./reporting-open.styles.less", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./reporting-open.styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 2080:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(657)(undefined);
// imports


// module
exports.push([module.i, "@font-face{font-family:FontAwesome;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1335) + ") format(\"woff\")}@font-face{font-family:icofont;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1336) + ") format(\"woff\")}._2XZKvtAIR1PAoLSazNUO1I{color:#fff;font-size:1.125rem;font-weight:500;letter-spacing:.3px;line-height:1.125rem;margin-top:3rem;padding:0 2rem;text-transform:uppercase}@media (max-width:600px){._2XZKvtAIR1PAoLSazNUO1I{padding-left:1rem;padding-right:1rem}}", ""]);

// exports
exports.locals = {
	"ReportingOpen__heading": "_2XZKvtAIR1PAoLSazNUO1I"
};

/***/ }),

/***/ 2081:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_reporting_components_reporting_closed_reporting_closed__ = __webpack_require__(2082);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_market_selectors_scalar_share_denomination__ = __webpack_require__(1497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_markets_actions_update_favorites__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_markets_actions_load_markets_info__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_utils_get_value__ = __webpack_require__(78);





// import getAllMarkets from 'modules/markets/selectors/markets-all'







var mapStateToProps = function mapStateToProps(state) {
  return {
    isLogged: state.isLogged,
    markets: markets, // getAllMarkets(),
    universe: state.universe,
    scalarShareDenomination: Object(__WEBPACK_IMPORTED_MODULE_3_modules_market_selectors_scalar_share_denomination__["a" /* default */])(),
    canLoadMarkets: !!Object(__WEBPACK_IMPORTED_MODULE_6_utils_get_value__["a" /* default */])(state, 'universe.id'),
    hasLoadedMarkets: state.hasLoadedMarkets
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    loadMarketsInfo: function loadMarketsInfo(marketIDs) {
      return dispatch(Object(__WEBPACK_IMPORTED_MODULE_5_modules_markets_actions_load_markets_info__["a" /* loadMarketsInfo */])(marketIDs));
    },
    toggleFavorite: function toggleFavorite(marketID) {
      return dispatch(Object(__WEBPACK_IMPORTED_MODULE_4_modules_markets_actions_update_favorites__["c" /* toggleFavorite */])(marketID));
    }
  };
};

var Closed = Object(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["f" /* withRouter */])(Object(__WEBPACK_IMPORTED_MODULE_0_react_redux__["b" /* connect */])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_2_modules_reporting_components_reporting_closed_reporting_closed__["a" /* default */]));

/* harmony default export */ __webpack_exports__["a"] = (Closed);

var markets = [{
  id: '0xcd7b177af7a12ec3be1c7f992ec7d608959630f2113227a2cdd9db562bd01eb4',
  branchID: '0xf69b5',
  tradingPeriod: 8947,
  tradingFee: '0.025',
  makerFee: '0.0125',
  takerFee: '0.025',
  creationTime: {
    value: '2017-10-16T14:36:38.000Z',
    formatted: 'Oct 16, 2017 2:36 PM',
    formattedLocal: 'Oct 16, 2017 7:36 AM (UTC -7)',
    full: 'Mon, 16 Oct 2017 14:36:38 GMT',
    timestamp: 1508164598000
  },
  volume: {
    value: 3000,
    formattedValue: 3000,
    formatted: '3,000',
    roundedValue: 3000,
    rounded: '3,000.00',
    minimized: '3,000',
    denomination: ' shares',
    full: '3,000 shares'
  },
  topic: 'Cryptocurrency',
  tags: ['Cryptocurrency', 'Bitcoin', 'Ethereum'],
  endDate: {
    value: '2018-12-30T08:00:00.000Z',
    formatted: 'Dec 30, 2018 8:00 AM',
    formattedLocal: 'Dec 30, 2018 12:00 AM (UTC -8)',
    full: 'Sun, 30 Dec 2018 08:00:00 GMT',
    timestamp: 1546156800000
  },
  eventID: '0xee03ff4923cb4fc8f2f2370e0f1d5cffd321342d304e221e566623616f676ba4',
  minValue: '1',
  maxValue: '2',
  numOutcomes: 2,
  type: 'binary',
  consensus: null,
  description: 'Will Bitcoin be surpassed by Ethereum by the end of 2018?',
  isLoadedMarketInfo: true,
  isLoading: false,
  network: '9000',
  cumulativeScale: '1',
  creationBlock: 422516,
  creationFee: '7.2',
  author: '0xa5f5cecbb1e1a1e784a975b4d019f50e06a95091',
  eventBond: '3.6',
  outcomes: [{
    id: '2',
    outstandingShares: '1000',
    price: '0',
    sharesPurchased: '0',
    name: 'Yes',
    marketID: '0xcd7b177af7a12ec3be1c7f992ec7d608959630f2113227a2cdd9db562bd01eb4',
    lastPrice: {
      value: 0,
      formattedValue: 0,
      formatted: '0',
      roundedValue: 0,
      rounded: '0.0000',
      minimized: '0',
      denomination: ' ETH Tokens',
      full: '0 ETH Tokens'
    },
    lastPricePercent: {
      value: 50,
      formattedValue: 50,
      formatted: '50.0',
      roundedValue: 50,
      rounded: '50',
      minimized: '50',
      denomination: '%',
      full: '50.0%'
    },
    trade: {
      side: 'buy',
      numShares: null,
      limitPrice: null,
      maxNumShares: {
        value: 0,
        formattedValue: 0,
        formatted: '0',
        roundedValue: 0,
        rounded: '0.00',
        minimized: '0',
        denomination: ' shares',
        full: '0 shares'
      },
      potentialEthProfit: null,
      potentialEthLoss: null,
      potentialLossPercent: null,
      potentialProfitPercent: null,
      totalFee: {
        value: 0,
        formattedValue: 0,
        formatted: '',
        roundedValue: 0,
        rounded: '',
        minimized: '',
        denomination: '',
        full: ''
      },
      gasFeesRealEth: {
        value: 0,
        formattedValue: 0,
        formatted: '',
        roundedValue: 0,
        rounded: '',
        minimized: '',
        denomination: '',
        full: ''
      },
      totalCost: {
        value: 0,
        formattedValue: 0,
        formatted: '0',
        roundedValue: 0,
        rounded: '0.0000',
        minimized: '0',
        denomination: ' ETH Tokens',
        full: '0 ETH Tokens'
      },
      tradeTypeOptions: [{
        label: 'buy',
        value: 'buy'
      }, {
        label: 'sell',
        value: 'sell'
      }],
      tradeSummary: {
        totalGas: {
          value: 0,
          formattedValue: 0,
          formatted: '0',
          roundedValue: 0,
          rounded: '0.0000',
          minimized: '0',
          denomination: ' ETH',
          full: '0 ETH'
        },
        tradeOrders: []
      }
    },
    orderBook: {
      bids: [],
      asks: []
    },
    orderBookSeries: {
      bids: [],
      asks: []
    },
    topBid: null,
    topAsk: null,
    position: null,
    userOpenOrders: []
  }],
  extraInfo: 'Will Ethereum value overpass Bitcoin by the end of 2018?',
  formattedDescription: 'will_bitcoin_be_surpassed_by_ethereum_by_the_end_of_2018',
  isBinary: true,
  isCategorical: false,
  isScalar: false,
  isMarketLoading: false,
  endDateLabel: 'ends',
  isOpen: true,
  isFavorite: false,
  takerFeePercent: {
    value: 2.5,
    formattedValue: 2.5,
    formatted: '2.5',
    roundedValue: 2,
    rounded: '2',
    minimized: '2.5',
    denomination: '%',
    full: '2.5%'
  },
  makerFeePercent: {
    value: 1.25,
    formattedValue: 1.2,
    formatted: '1.2',
    roundedValue: 1,
    rounded: '1',
    minimized: '1.2',
    denomination: '%',
    full: '1.2%'
  },
  isRequiredToReportByAccount: false,
  isPendingReport: true,
  isReportSubmitted: false,
  isReported: false,
  isMissedReport: false,
  isReportTabVisible: false,
  isSnitchTabVisible: false,
  report: {},
  outstandingShares: {
    value: 1000,
    formattedValue: 1000,
    formatted: '1,000',
    roundedValue: 1000,
    rounded: '1,000',
    minimized: '1,000',
    denomination: '',
    full: '1,000'
  },
  priceTimeSeries: [],
  reportableOutcomes: [{
    id: '1',
    name: 'No'
  }, {
    id: '2',
    name: 'Yes'
  }, {
    id: '1.5',
    name: 'Indeterminate'
  }],
  userOpenOrdersSummary: null,
  tradeSummary: {
    totalGas: {
      value: 0,
      formattedValue: 0,
      formatted: '0',
      roundedValue: 0,
      rounded: '0.0000',
      minimized: '0',
      denomination: ' ETH',
      full: '0 ETH'
    },
    tradeOrders: [],
    hasUserEnoughFunds: false
  }
}, {
  id: '0xbb8b7835162b95b6994013cd04d8f28125c3c11c8bae84c73772785a666ca272',
  branchID: '0xf69b5',
  tradingPeriod: 8738,
  tradingFee: '0.02',
  makerFee: '0.01',
  takerFee: '0.02',
  creationTime: {
    value: '2017-10-13T21:01:36.000Z',
    formatted: 'Oct 13, 2017 9:01 PM',
    formattedLocal: 'Oct 13, 2017 2:01 PM (UTC -7)',
    full: 'Fri, 13 Oct 2017 21:01:36 GMT',
    timestamp: 1507928496000
  },
  volume: {
    value: 30.5,
    formattedValue: 30.5,
    formatted: '30.5',
    roundedValue: 30.5,
    rounded: '30.50',
    minimized: '30.5',
    denomination: ' shares',
    full: '30.5 shares'
  },
  topic: 'MLB Baseball',
  tags: ['MLB Baseball', 'Baseball'],
  endDate: {
    value: '2017-11-05T07:00:00.000Z',
    formatted: 'Nov 5, 2017 7:00 AM',
    formattedLocal: 'Nov 5, 2017 12:00 AM (UTC -7)',
    full: 'Sun, 05 Nov 2017 07:00:00 GMT',
    timestamp: 1509865200000
  },
  eventID: '0x55c24b4a613d57869cfb42a640d744d2d646aaa1f30e0147c6a7da5a6a72eeb8',
  minValue: '1',
  maxValue: '2',
  numOutcomes: 2,
  type: 'binary',
  consensus: null,
  description: 'Will the Yankees win the 2017 world series?',
  isLoadedMarketInfo: true,
  isLoading: false,
  network: '9000',
  cumulativeScale: '1',
  creationBlock: 405426,
  creationFee: '9',
  author: '0x8e0a2a84b8dab1a441d6f8c68562dc8a1708455c',
  eventBond: '4.5',
  outcomes: [{
    id: '2',
    outstandingShares: '10',
    price: '0.3',
    sharesPurchased: '0',
    name: 'Yes',
    marketID: '0xbb8b7835162b95b6994013cd04d8f28125c3c11c8bae84c73772785a666ca272',
    lastPrice: {
      value: 0.3,
      formattedValue: 0.3,
      formatted: '0.3000',
      roundedValue: 0.3,
      rounded: '0.3000',
      minimized: '0.3',
      denomination: ' ETH Tokens',
      full: '0.3000 ETH Tokens'
    },
    lastPricePercent: {
      value: 30,
      formattedValue: 30,
      formatted: '30.0',
      roundedValue: 30,
      rounded: '30',
      minimized: '30',
      denomination: '%',
      full: '30.0%'
    },
    trade: {
      side: 'buy',
      numShares: null,
      limitPrice: null,
      maxNumShares: {
        value: 0,
        formattedValue: 0,
        formatted: '0',
        roundedValue: 0,
        rounded: '0.00',
        minimized: '0',
        denomination: ' shares',
        full: '0 shares'
      },
      potentialEthProfit: null,
      potentialEthLoss: null,
      potentialLossPercent: null,
      potentialProfitPercent: null,
      totalFee: {
        value: 0,
        formattedValue: 0,
        formatted: '',
        roundedValue: 0,
        rounded: '',
        minimized: '',
        denomination: '',
        full: ''
      },
      gasFeesRealEth: {
        value: 0,
        formattedValue: 0,
        formatted: '',
        roundedValue: 0,
        rounded: '',
        minimized: '',
        denomination: '',
        full: ''
      },
      totalCost: {
        value: 0,
        formattedValue: 0,
        formatted: '0',
        roundedValue: 0,
        rounded: '0.0000',
        minimized: '0',
        denomination: ' ETH Tokens',
        full: '0 ETH Tokens'
      },
      tradeTypeOptions: [{
        label: 'buy',
        value: 'buy'
      }, {
        label: 'sell',
        value: 'sell'
      }],
      tradeSummary: {
        totalGas: {
          value: 0,
          formattedValue: 0,
          formatted: '0',
          roundedValue: 0,
          rounded: '0.0000',
          minimized: '0',
          denomination: ' ETH',
          full: '0 ETH'
        },
        tradeOrders: []
      }
    },
    orderBook: {
      bids: [],
      asks: []
    },
    orderBookSeries: {
      bids: [],
      asks: []
    },
    topBid: null,
    topAsk: null,
    position: null,
    userOpenOrders: []
  }],
  formattedDescription: 'will_the_yankees_win_the_2017_world_series',
  isBinary: true,
  isCategorical: false,
  isScalar: false,
  isMarketLoading: false,
  endDateLabel: 'ends',
  isOpen: true,
  isFavorite: false,
  takerFeePercent: {
    value: 2,
    formattedValue: 2,
    formatted: '2.0',
    roundedValue: 2,
    rounded: '2',
    minimized: '2',
    denomination: '%',
    full: '2.0%'
  },
  makerFeePercent: {
    value: 1,
    formattedValue: 1,
    formatted: '1.0',
    roundedValue: 1,
    rounded: '1',
    minimized: '1',
    denomination: '%',
    full: '1.0%'
  },
  isRequiredToReportByAccount: false,
  isPendingReport: true,
  isReportSubmitted: false,
  isReported: false,
  isMissedReport: false,
  isReportTabVisible: false,
  isSnitchTabVisible: false,
  report: {},
  outstandingShares: {
    value: 10,
    formattedValue: 10,
    formatted: '10',
    roundedValue: 10,
    rounded: '10',
    minimized: '10',
    denomination: '',
    full: '10'
  },
  priceTimeSeries: [],
  reportableOutcomes: [{
    id: '1',
    name: 'No'
  }, {
    id: '2',
    name: 'Yes'
  }, {
    id: '1.5',
    name: 'Indeterminate'
  }],
  userOpenOrdersSummary: null,
  tradeSummary: {
    totalGas: {
      value: 0,
      formattedValue: 0,
      formatted: '0',
      roundedValue: 0,
      rounded: '0.0000',
      minimized: '0',
      denomination: ' ETH',
      full: '0 ETH'
    },
    tradeOrders: [],
    hasUserEnoughFunds: false
  }
}];

/***/ }),

/***/ 2082:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet__ = __webpack_require__(658);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_reporting_components_reporting_header_reporting_header__ = __webpack_require__(1865);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_markets_components_markets_list__ = __webpack_require__(1495);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var ReportingClosed = function (_Component) {
  _inherits(ReportingClosed, _Component);

  function ReportingClosed(props) {
    _classCallCheck(this, ReportingClosed);

    var _this = _possibleConstructorReturn(this, (ReportingClosed.__proto__ || Object.getPrototypeOf(ReportingClosed)).call(this, props));

    _this.state = {
      filteredMarketsClosed: [0, 1]
    };
    return _this;
  }

  _createClass(ReportingClosed, [{
    key: 'render',
    value: function render() {
      var s = this.state;
      var p = this.props;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'section',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_react_helmet__["Helmet"],
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'title',
            null,
            'Reporting: Closed'
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_reporting_components_reporting_header_reporting_header__["a" /* default */], {
          heading: 'Reporting: Closed',
          showReportingEndDate: false
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_modules_markets_components_markets_list__["a" /* default */], {
          isLogged: p.isLogged,
          markets: p.markets,
          filteredMarkets: s.filteredMarketsClosed,
          location: p.location,
          history: p.history,
          scalarShareDenomination: p.scalarShareDenomination,
          toggleFavorite: p.toggleFavorite,
          loadMarketsInfo: p.loadMarketsInfo
        })
      );
    }
  }]);

  return ReportingClosed;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

ReportingClosed.propTypes = {
  markets: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired,
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  scalarShareDenomination: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  toggleFavorite: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  loadMarketsInfo: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  isLogged: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired
};
/* harmony default export */ __webpack_exports__["a"] = (ReportingClosed);

/***/ })

});
//# sourceMappingURL=reporting.41a94be005725513ae1d.js.map