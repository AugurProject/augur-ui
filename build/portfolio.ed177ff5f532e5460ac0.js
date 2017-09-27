webpackJsonp([5],{

/***/ 1510:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_portfolio_view__ = __webpack_require__(1781);



// TODO -- no longer need global state passed...can refactor out container for portfolio

var mapStateToProps = function mapStateToProps(state) {
  return {
    activeView: state.activeView
  };
};

var Portfolio = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react_redux__["b" /* connect */])(mapStateToProps)(__WEBPACK_IMPORTED_MODULE_1__components_portfolio_view__["a" /* default */]);

/* harmony default export */ __webpack_exports__["default"] = (Portfolio);

/***/ }),

/***/ 1516:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_bignumber_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_bignumber_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_bignumber_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_debounce__ = __webpack_require__(94);
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

/***/ 1531:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


var Spinner = function Spinner() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "article",
    { className: "spinner-container" },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: "spinner" })
  );
};

/* harmony default export */ __webpack_exports__["a"] = (Spinner);

/***/ }),

/***/ 1532:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);




var ComponentNav = function ComponentNav(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'ul',
    {
      className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('component-nav', { 'full-width-nav': p.fullWidth })
    },
    Object.keys(p.navItems || {}).map(function (nav) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'button',
        {
          key: nav,
          className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('unstyled', { selected: p.selectedNav === nav, 'mobile-only': p.navItems[nav].isMobile }),
          onClick: function onClick() {
            p.updateSelectedNav(nav);
          }
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'li',
          { className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()({ selected: p.selectedNav === nav }) },
          p.navItems[nav].label
        )
      );
    })
  );
};

ComponentNav.propTypes = {
  fullWidth: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  navItems: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  selectedNav: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  updateSelectedNav: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (ComponentNav);

/***/ }),

/***/ 1533:
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

/***/ 1534:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_market_constants_share_denominations__ = __webpack_require__(1533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__add_commas_to_number__ = __webpack_require__(756);



// This helper method is very specific in scope
// It takes in the formatted shares in string format and returns a string denominated as specified
// The mutation of the shares is done this way so no actual re-calculation is done to the underlying
// values, just string manipulation for presentation
function setShareDenomination(value, denomination) {
  if (value == null) {
    return value;
  }

  switch (denomination) {
    case __WEBPACK_IMPORTED_MODULE_0__modules_market_constants_share_denominations__["a" /* MICRO_SHARE */]:
      return formatValue(value, 4);
    case __WEBPACK_IMPORTED_MODULE_0__modules_market_constants_share_denominations__["b" /* MILLI_SHARE */]:
      return formatValue(value, 1);
    default:
    case __WEBPACK_IMPORTED_MODULE_0__modules_market_constants_share_denominations__["c" /* SHARE */]:
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

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__add_commas_to_number__["a" /* default */])(valueArray.join('')); // return joined string w/ comma separating thousands
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

/***/ 1554:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(7);
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

/***/ 1571:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);




var ValueDate = function ValueDate(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'span',
    { className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('value-date', p.className) },
    p.formatted
  );
};

ValueDate.propTypes = {
  className: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  value: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  formatted: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
};

/* harmony default export */ __webpack_exports__["a"] = (ValueDate);

/***/ }),

/***/ 1572:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_filter_sort_view__ = __webpack_require__(1582);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_get_value__ = __webpack_require__(52);







var mapStateToProps = function mapStateToProps(state) {
  return {
    currentReportingPeriod: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_get_value__["a" /* default */])(state, 'branch.currentReportingWindowAddress')
  };
};

var FilterSort = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["b" /* withRouter */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react_redux__["b" /* connect */])(mapStateToProps)(__WEBPACK_IMPORTED_MODULE_2__components_filter_sort_view__["a" /* default */]));

/* harmony default export */ __webpack_exports__["a"] = (FilterSort);

/***/ }),

/***/ 1573:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return POSITION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ORDER; });
var POSITION = 'POSITION';
var ORDER = 'ORDER';

/***/ }),

/***/ 1580:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_components_dropdown__ = __webpack_require__(1554);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_helpers_parse_query__ = __webpack_require__(744);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_helpers_make_query__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_is_market_data_open__ = __webpack_require__(537);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash_isEqual__ = __webpack_require__(746);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash_isEqual___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_lodash_isEqual__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_constants_param_names__ = __webpack_require__(529);
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

/***/ 1581:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_components_input__ = __webpack_require__(1516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_helpers_parse_query__ = __webpack_require__(744);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_helpers_make_query__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_helpers_parse_string_to_array__ = __webpack_require__(751);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_debounce__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_get_value__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lodash_isEqual__ = __webpack_require__(746);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lodash_isEqual___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_lodash_isEqual__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_constants_param_names__ = __webpack_require__(529);
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

/***/ 1582:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_isEqual__ = __webpack_require__(746);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_isEqual___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash_isEqual__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__filter_market_state__ = __webpack_require__(1580);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sort_market_param__ = __webpack_require__(1583);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__filter_search__ = __webpack_require__(1581);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__helpers_filter_by_market_favorites__ = __webpack_require__(1584);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__helpers_filter_by_tags__ = __webpack_require__(1585);
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

/***/ 1583:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_components_dropdown__ = __webpack_require__(1554);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_helpers_parse_query__ = __webpack_require__(744);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_helpers_make_query__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_get_value__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash_isEqual__ = __webpack_require__(746);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash_isEqual___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_lodash_isEqual__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_constants_param_names__ = __webpack_require__(529);
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

/***/ 1584:
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

/***/ 1585:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = filterByTags;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_helpers_parse_query__ = __webpack_require__(744);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_helpers_parse_string_to_array__ = __webpack_require__(751);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_constants_param_names__ = __webpack_require__(529);
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

/***/ 1586:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_components_spinner__ = __webpack_require__(1531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_components_em_dash__ = __webpack_require__(749);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants_trade_close_type__ = __webpack_require__(1573);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__constants_close_dialog_status__ = __webpack_require__(311);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











var MarketTradeCloseDialog = function (_Component) {
  _inherits(MarketTradeCloseDialog, _Component);

  function MarketTradeCloseDialog(props) {
    _classCallCheck(this, MarketTradeCloseDialog);

    var _this = _possibleConstructorReturn(this, (MarketTradeCloseDialog.__proto__ || Object.getPrototypeOf(MarketTradeCloseDialog)).call(this, props));

    _this.state = {
      isConfirming: false,
      status: props.status
    };

    _this.renderCloseDialogContent = _this.renderCloseDialogContent.bind(_this);
    return _this;
  }

  _createClass(MarketTradeCloseDialog, [{
    key: 'renderCloseDialogContent',
    value: function renderCloseDialogContent(marketID, orderID, closeType, isClosable, quantityOfShares, isConfirming, closePosition, status, orderType, cancelOrder) {
      var _this2 = this;

      // Position -- No Available Actions
      if (closeType === __WEBPACK_IMPORTED_MODULE_5__constants_trade_close_type__["b" /* POSITION */] && !status && (!parseFloat(quantityOfShares, 10) || !isClosable)) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__common_components_em_dash__["a" /* default */], null);
      }

      if (isConfirming) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'confirming-dialog' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'button',
            {
              className: 'unstyled confirming-no',
              onClick: function onClick() {
                _this2.setState({ isConfirming: false });
              }
            },
            'No'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'button',
            {
              className: 'unstyled confirming-yes',
              onClick: function onClick(event) {
                if (closeType === __WEBPACK_IMPORTED_MODULE_5__constants_trade_close_type__["b" /* POSITION */]) {
                  closePosition(marketID, orderID);
                } else if (closeType === __WEBPACK_IMPORTED_MODULE_5__constants_trade_close_type__["a" /* ORDER */]) {
                  cancelOrder(orderID, marketID, orderType);
                }
                _this2.setState({ isConfirming: false });
              }
            },
            'Yes'
          )
        );
      }

      switch (status) {
        case __WEBPACK_IMPORTED_MODULE_6__constants_close_dialog_status__["c" /* CLOSE_DIALOG_CLOSING */]:
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__common_components_spinner__["a" /* default */], null);
        case __WEBPACK_IMPORTED_MODULE_6__constants_close_dialog_status__["a" /* CLOSE_DIALOG_NO_ORDERS */]:
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            null,
            'no orders'
          );
        case __WEBPACK_IMPORTED_MODULE_6__constants_close_dialog_status__["b" /* CLOSE_DIALOG_FAILED */]:
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            null,
            'failed'
          );
        case __WEBPACK_IMPORTED_MODULE_6__constants_close_dialog_status__["d" /* CLOSE_DIALOG_PARTIALLY_FAILED */]:
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            null,
            'partially failed'
          );
        case __WEBPACK_IMPORTED_MODULE_6__constants_close_dialog_status__["e" /* CLOSE_DIALOG_SUCCESS */]:
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            null,
            'success'
          );
        default:
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'button',
            {
              className: 'unstyled close-order-button',
              onClick: function onClick() {
                _this2.setState({ isConfirming: true });
              }
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              '\u2205'
            )
          );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var p = this.props;
      var s = this.state;

      var orderID = p.closeType === __WEBPACK_IMPORTED_MODULE_5__constants_trade_close_type__["b" /* POSITION */] ? p.outcomeID : p.orderID;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'article',
        {
          className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('close-dialog', {
            'action-disabled': p.closeType === __WEBPACK_IMPORTED_MODULE_5__constants_trade_close_type__["b" /* POSITION */],
            'action-running': p.status === __WEBPACK_IMPORTED_MODULE_6__constants_close_dialog_status__["c" /* CLOSE_DIALOG_CLOSING */],
            'action-failed': p.status === __WEBPACK_IMPORTED_MODULE_6__constants_close_dialog_status__["a" /* CLOSE_DIALOG_NO_ORDERS */] || p.status === __WEBPACK_IMPORTED_MODULE_6__constants_close_dialog_status__["b" /* CLOSE_DIALOG_FAILED */] || p.status === __WEBPACK_IMPORTED_MODULE_6__constants_close_dialog_status__["d" /* CLOSE_DIALOG_PARTIALLY_FAILED */],
            'action-succeeded': p.status === __WEBPACK_IMPORTED_MODULE_6__constants_close_dialog_status__["e" /* CLOSE_DIALOG_SUCCESS */]
          })
        },
        this.renderCloseDialogContent(p.marketID, orderID, p.closeType, p.isClosable, p.quantityOfShares, s.isConfirming, p.closePosition, p.status, p.orderType, p.cancelOrder)
      );
    }
  }]);

  return MarketTradeCloseDialog;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

MarketTradeCloseDialog.propTypes = {
  status: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
};
/* harmony default export */ __webpack_exports__["a"] = (MarketTradeCloseDialog);

/***/ }),

/***/ 1587:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions_update_scalar_market_share_denomination__ = __webpack_require__(535);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_share_denominations__ = __webpack_require__(1533);





/* harmony default export */ __webpack_exports__["a"] = (function () {
  var _store$getState = __WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */].getState(),
      scalarMarketsShareDenomination = _store$getState.scalarMarketsShareDenomination;

  return {
    denominations: denominations,
    markets: scalarMarketsShareDenomination,
    updateSelectedShareDenomination: selectShareDenomination
  };
});

var denominations = [{
  label: 'Shares',
  value: __WEBPACK_IMPORTED_MODULE_2__constants_share_denominations__["c" /* SHARE */]
}, {
  label: 'mShares',
  value: __WEBPACK_IMPORTED_MODULE_2__constants_share_denominations__["b" /* MILLI_SHARE */]
}, {
  label: 'μShares',
  value: __WEBPACK_IMPORTED_MODULE_2__constants_share_denominations__["a" /* MICRO_SHARE */]
}];

function selectShareDenomination(marketID, denomination) {
  __WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */].dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__actions_update_scalar_market_share_denomination__["a" /* updateScalarMarketShareDenomination */])(marketID, denomination));
}

/***/ }),

/***/ 1588:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return triggerTransactionsExport; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth_actions_load_account_history__ = __webpack_require__(752);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__selectors_transactions__ = __webpack_require__(1644);



var triggerTransactionsExport = function triggerTransactionsExport() {
  return function (dispatch, getState) {
    var _getState = getState(),
        transactionsLoading = _getState.transactionsLoading,
        transactionsOldestLoadedBlock = _getState.transactionsOldestLoadedBlock,
        loginAccount = _getState.loginAccount;

    var loadedAllTransactions = transactionsOldestLoadedBlock === loginAccount.registerBlockNumber;

    if (!transactionsLoading && loadedAllTransactions) {
      // trigger download
      var transactions = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__selectors_transactions__["a" /* selectTransactions */])(getState());
      var transactionsDataString = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(transactions));
      var a = document.createElement('a');

      a.setAttribute('href', transactionsDataString);
      a.setAttribute('download', 'AugurTransactions.json');
      a.click();
    } else {
      // trigger load all transactions and give it this function as a callback.
      dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__auth_actions_load_account_history__["a" /* loadAccountHistory */])(true, triggerTransactionsExport));
    }
  };
};

/***/ }),

/***/ 1589:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_components_spinner__ = __webpack_require__(1531);





var TransactionsLoadingActions = function TransactionsLoadingActions(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'article',
    { className: 'transactions-loading-actions' },
    !p.transactionsLoading && !p.hasAllTransactionsLoaded && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'transactions-load-buttons' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'button',
        {
          className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('unstyled', { disabled: !p.registerBlockNumber }),
          onClick: function onClick() {
            if (!p.transactionsLoading) p.loadMoreTransactions();
          }
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          null,
          'Load More'
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'button',
        {
          className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('unstyled', { disabled: !p.registerBlockNumber }),
          onClick: function onClick() {
            if (!p.transactionsLoading) p.loadAllTransactions();
          }
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          null,
          'Load All'
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'button',
        {
          className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('unstyled', { disabled: !p.registerBlockNumber }, { hidden: !p.allowExport }),
          onClick: function onClick() {
            if (!p.transactionsLoading) {
              p.triggerTransactionsExport();
            }
          }
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          null,
          'Export All'
        )
      )
    ),
    p.transactionsLoading && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'transactions-loading-spinner' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        { className: 'transactions-loading-message' },
        'Loading More History'
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__common_components_spinner__["a" /* default */], null)
    ),
    !p.transactionsLoading && p.hasAllTransactionsLoaded && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'transactions-loaded' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        {
          className: 'transactions-all-loaded-message'
        },
        'All History Loaded'
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'button',
        {
          className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('unstyled', { disabled: p.transactionsLoading }, { hidden: !p.allowExport }),
          onClick: function onClick() {
            p.triggerTransactionsExport();
          }
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          null,
          'Export All'
        )
      )
    )
  );
};

TransactionsLoadingActions.propTypes = {
  loadMoreTransactions: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  loadAllTransactions: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  triggerTransactionsExport: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  transactionsLoading: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  hasAllTransactionsLoaded: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  registerBlockNumber: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  allowExport: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
};

/* harmony default export */ __webpack_exports__["a"] = (TransactionsLoadingActions);

/***/ }),

/***/ 1644:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return selectTransactions; });
/* unused harmony export formatTransaction */
/* unused harmony export formatGroupedTransactions */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_reselect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bignumber_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bignumber_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_bignumber_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__select_state__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants_types__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants_statuses__ = __webpack_require__(533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_get_value__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_format_number__ = __webpack_require__(39);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };












/* unused harmony default export */ var _unused_webpack_default_export = (function () {
  return selectTransactions(__WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */].getState());
});

var selectTransactions = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(__WEBPACK_IMPORTED_MODULE_3__select_state__["u" /* selectTransactionsDataState */], function (transactionsData) {
  var tradeGroups = [];
  var formattedTransactions = Object.keys(transactionsData || {}).reduce(function (p, id) {
    var tradeGroupID = transactionsData[id].tradeGroupID;
    if (tradeGroupID) {
      if (tradeGroups.indexOf(tradeGroupID) === -1) {
        tradeGroups.push(tradeGroupID);
        var filteredTransactions = Object.keys(transactionsData).filter(function (id) {
          return transactionsData[id].tradeGroupID === tradeGroupID;
        }).map(function (id) {
          return transactionsData[id];
        });

        if (filteredTransactions.length === 1) {
          p.push(formatTransaction(filteredTransactions[0]));
        } else {
          p.push(formatGroupedTransactions(filteredTransactions));
        }
      }

      return p;
    }

    p.push(formatTransaction(transactionsData[id]));
    return p;
  }, []).sort(function (a, b) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_get_value__["a" /* default */])(b, 'timestamp.timestamp') - __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_get_value__["a" /* default */])(a, 'timestamp.timestamp');
  });

  return formattedTransactions;
});

function formatTransaction(transaction) {
  return _extends({}, transaction, {
    data: transaction.data,
    gas: transaction.gas && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_format_number__["f" /* formatEther */])(transaction.gas),
    ethTokens: transaction.etherWithoutGas && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_format_number__["b" /* formatEtherTokens */])(transaction.etherWithoutGas),
    shares: transaction.sharesChange && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_format_number__["e" /* formatShares */])(transaction.sharesChange),
    rep: transaction.repChange && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_format_number__["c" /* formatRep */])(transaction.repChange)
  });
}

function formatGroupedTransactions(transactions) {
  var formattedTransactions = transactions.map(function (transaction) {
    return formatTransaction(transaction);
  }).sort(function (a, b) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_get_value__["a" /* default */])(b, 'timestamp.timestamp') - __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_get_value__["a" /* default */])(a, 'timestamp.timestamp');
  });

  var status = formattedTransactions.reduce(function (p, transaction) {
    if (p === __WEBPACK_IMPORTED_MODULE_5__constants_statuses__["b" /* FAILED */] || transaction.status === __WEBPACK_IMPORTED_MODULE_5__constants_statuses__["b" /* FAILED */]) return __WEBPACK_IMPORTED_MODULE_5__constants_statuses__["b" /* FAILED */];
    if (p === __WEBPACK_IMPORTED_MODULE_5__constants_statuses__["c" /* INTERRUPTED */] || transaction.status === __WEBPACK_IMPORTED_MODULE_5__constants_statuses__["c" /* INTERRUPTED */]) return __WEBPACK_IMPORTED_MODULE_5__constants_statuses__["c" /* INTERRUPTED */];
    if (p === __WEBPACK_IMPORTED_MODULE_5__constants_statuses__["d" /* PENDING */] || transaction.status === __WEBPACK_IMPORTED_MODULE_5__constants_statuses__["d" /* PENDING */]) return __WEBPACK_IMPORTED_MODULE_5__constants_statuses__["d" /* PENDING */];
    if (p === __WEBPACK_IMPORTED_MODULE_5__constants_statuses__["e" /* SUBMITTED */] || transaction.status === __WEBPACK_IMPORTED_MODULE_5__constants_statuses__["e" /* SUBMITTED */]) return __WEBPACK_IMPORTED_MODULE_5__constants_statuses__["e" /* SUBMITTED */];
    if (transaction.status === __WEBPACK_IMPORTED_MODULE_5__constants_statuses__["a" /* SUCCESS */]) return __WEBPACK_IMPORTED_MODULE_5__constants_statuses__["a" /* SUCCESS */];

    return p;
  }, null);

  var totalShares = formattedTransactions.reduce(function (p, transaction) {
    return p.plus(new __WEBPACK_IMPORTED_MODULE_1_bignumber_js___default.a(transaction.numShares.value));
  }, new __WEBPACK_IMPORTED_MODULE_1_bignumber_js___default.a(0));

  return {
    status: status,
    message: (formattedTransactions[0].type === __WEBPACK_IMPORTED_MODULE_4__constants_types__["BUY"] ? 'Buy' : 'Sell') + ' ' + totalShares.toNumber() + ' shares of ' + formattedTransactions[0].data.outcomeName,
    description: formattedTransactions[0].description,
    timestamp: formattedTransactions[formattedTransactions.length - 1].timestamp,
    transactions: formattedTransactions
  };
}

/***/ }),

/***/ 1654:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions_cancel_order__ = __webpack_require__(758);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




/* harmony default export */ __webpack_exports__["a"] = (function () {
  var _store$getState = __WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */].getState(),
      orderCancellation = _store$getState.orderCancellation;

  return _extends({}, orderCancellation, {
    cancelOrder: function cancelOrder(orderID, marketID, type) {
      __WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */].dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__actions_cancel_order__["a" /* cancelOrder */])(orderID, marketID, type));
    }
  });
});

/***/ }),

/***/ 1657:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__market_open_orders_row__ = __webpack_require__(1658);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





var MarketOpenOrdersGroup = function MarketOpenOrdersGroup(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'article',
    { className: 'market-open-orders-group' },
    (p.userOpenOrders || []).map(function (order, i) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__market_open_orders_row__["a" /* default */], _extends({
        key: order.id,
        isFirst: i === 0
      }, order, {
        name: p.name,
        marketType: p.marketType,
        lastPricePercent: p.lastPricePercent,
        status: p.orderCancellation[order.id],
        cancellationStatuses: p.orderCancellation.cancellationStatuses,
        cancelOrder: p.orderCancellation.cancelOrder,
        abortCancelOrderConfirmation: p.orderCancellation.abortCancelOrderConfirmation,
        showCancelOrderConfirmation: p.orderCancellation.showCancelOrderConfirmation,
        selectedShareDenomination: p.selectedShareDenomination
      }));
    })
  );
};

/* harmony default export */ __webpack_exports__["a"] = (MarketOpenOrdersGroup);

/***/ }),

/***/ 1658:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_components_value_denomination__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__market_trade_close_dialog__ = __webpack_require__(1586);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__markets_constants_market_types__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants_trade_close_type__ = __webpack_require__(1573);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_get_value__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_set_share_denomination__ = __webpack_require__(1534);











var MarketOpenOrdersRow = function MarketOpenOrdersRow(p) {
  var unmatchedShares = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_set_share_denomination__["a" /* default */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_get_value__["a" /* default */])(p, 'unmatchedShares.formatted'), p.selectedShareDenomination);

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'article',
    { className: 'market-open-orders-row not-selectable ' + (p.isFirst ? 'isFirst' : '') },
    p.isFirst ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'span',
      null,
      p.marketType === __WEBPACK_IMPORTED_MODULE_3__markets_constants_market_types__["a" /* SCALAR */] ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__common_components_value_denomination__["a" /* default */], { formatted: p.lastPricePercent }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        null,
        p.name
      )
    ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', null),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'span',
      null,
      p.type
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__common_components_value_denomination__["a" /* default */], { formatted: unmatchedShares }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__common_components_value_denomination__["a" /* default */], p.avgPrice),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__market_trade_close_dialog__["a" /* default */], {
      closeType: __WEBPACK_IMPORTED_MODULE_4__constants_trade_close_type__["a" /* ORDER */],
      marketID: p.marketID,
      orderID: p.id,
      status: p.status,
      orderType: p.type,
      cancelOrder: p.cancelOrder
    })
  );
};

/* harmony default export */ __webpack_exports__["a"] = (MarketOpenOrdersRow);

/***/ }),

/***/ 1659:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return selectClosePositionStatus; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_reselect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__select_state__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions_clear_close_position_outcome__ = __webpack_require__(540);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__market_constants_close_dialog_status__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__transactions_constants_statuses__ = __webpack_require__(533);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }









/* harmony default export */ __webpack_exports__["a"] = (function () {
  return selectClosePositionStatus(__WEBPACK_IMPORTED_MODULE_1__store__["a" /* default */].getState());
});

var selectClosePositionStatus = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(__WEBPACK_IMPORTED_MODULE_2__select_state__["x" /* selectClosePositionTradeGroupsState */], __WEBPACK_IMPORTED_MODULE_2__select_state__["u" /* selectTransactionsDataState */], function (closePositionTradeGroups, transactionsData) {
  var statuses = Object.keys(closePositionTradeGroups).reduce(function (p, marketID) {
    var outcomeStatuses = Object.keys(closePositionTradeGroups[marketID]).reduce(function (p, outcomeID) {
      var closePositionTransactionIDs = closePositionTradeGroups[marketID][outcomeID].reduce(function (p, tradeGroupID) {
        var transactionIDs = Object.keys(transactionsData).filter(function (transactionID) {
          return transactionsData[transactionID].tradeGroupID === tradeGroupID;
        });

        if (transactionIDs.length !== 0) {
          return [].concat(_toConsumableArray(p), _toConsumableArray(transactionIDs));
        }

        return p;
      }, []);

      // closing failed further up in the call chain to close position
      if (closePositionTradeGroups[marketID][outcomeID][0] === __WEBPACK_IMPORTED_MODULE_4__market_constants_close_dialog_status__["b" /* CLOSE_DIALOG_FAILED */]) {
        delayClearTradeGroupIDs(marketID, outcomeID);

        return _extends({}, p, _defineProperty({}, outcomeID, __WEBPACK_IMPORTED_MODULE_4__market_constants_close_dialog_status__["b" /* CLOSE_DIALOG_FAILED */]));
      }

      // no orders are available within the outcome's order book
      if (closePositionTradeGroups[marketID][outcomeID][0] === __WEBPACK_IMPORTED_MODULE_4__market_constants_close_dialog_status__["a" /* CLOSE_DIALOG_NO_ORDERS */]) {
        delayClearTradeGroupIDs(marketID, outcomeID);

        return _extends({}, p, _defineProperty({}, outcomeID, __WEBPACK_IMPORTED_MODULE_4__market_constants_close_dialog_status__["a" /* CLOSE_DIALOG_NO_ORDERS */]));
      }

      // Short Circuit until transactionsData is updated with the tradeGroupID
      if (closePositionTransactionIDs.length === 0 && closePositionTradeGroups[marketID][outcomeID]) {
        return _extends({}, p, _defineProperty({}, outcomeID, __WEBPACK_IMPORTED_MODULE_4__market_constants_close_dialog_status__["c" /* CLOSE_DIALOG_CLOSING */]));
      }

      var numberOfFailedTransactions = closePositionTransactionIDs.filter(function (transactionID) {
        return transactionsData[transactionID].status === __WEBPACK_IMPORTED_MODULE_5__transactions_constants_statuses__["b" /* FAILED */];
      }).length;

      // Close Position Completely Failed
      if (numberOfFailedTransactions === closePositionTransactionIDs.length) {
        delayClearTradeGroupIDs(marketID, outcomeID);

        return _extends({}, p, _defineProperty({}, outcomeID, __WEBPACK_IMPORTED_MODULE_4__market_constants_close_dialog_status__["b" /* CLOSE_DIALOG_FAILED */]));
      }

      // Close Position Completely Succeeded
      var numberOfSuccessfulTransactions = closePositionTransactionIDs.filter(function (transactionID) {
        return transactionsData[transactionID].status === __WEBPACK_IMPORTED_MODULE_5__transactions_constants_statuses__["a" /* SUCCESS */];
      }).length;

      if (numberOfSuccessfulTransactions === closePositionTransactionIDs.length) {
        delayClearTradeGroupIDs(marketID, outcomeID);

        return _extends({}, p, _defineProperty({}, outcomeID, __WEBPACK_IMPORTED_MODULE_4__market_constants_close_dialog_status__["e" /* CLOSE_DIALOG_SUCCESS */]));
      }

      // Close Position Partially Failed
      if (numberOfFailedTransactions && numberOfFailedTransactions !== closePositionTransactionIDs.length && numberOfSuccessfulTransactions === 0) {

        return _extends({}, p, _defineProperty({}, outcomeID, __WEBPACK_IMPORTED_MODULE_4__market_constants_close_dialog_status__["d" /* CLOSE_DIALOG_PARTIALLY_FAILED */]));
      } else if (numberOfFailedTransactions && numberOfFailedTransactions + numberOfSuccessfulTransactions === closePositionTransactionIDs.length) {
        delayClearTradeGroupIDs(marketID, outcomeID);

        return _extends({}, p, _defineProperty({}, outcomeID, __WEBPACK_IMPORTED_MODULE_4__market_constants_close_dialog_status__["d" /* CLOSE_DIALOG_PARTIALLY_FAILED */]));
      }

      // Close Position In-Process without Failures
      return _extends({}, p, _defineProperty({}, outcomeID, __WEBPACK_IMPORTED_MODULE_4__market_constants_close_dialog_status__["c" /* CLOSE_DIALOG_CLOSING */]));
    }, {});

    if (Object.keys(outcomeStatuses).length !== 0) {
      return _extends({}, p, _defineProperty({}, marketID, outcomeStatuses));
    }

    return p;
  }, {});

  return statuses;
});

// waits, then clears orderIds from closePositionTradeGroups
// This will ultimately clear the outcome status and allow for the
// user to try again if an action is available
function delayClearTradeGroupIDs(marketID, outcomeID) {
  setTimeout(function () {
    return __WEBPACK_IMPORTED_MODULE_1__store__["a" /* default */].dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__actions_clear_close_position_outcome__["a" /* clearClosePositionOutcome */])(marketID, outcomeID));
  }, 3000);
}

/***/ }),

/***/ 1756:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_components_value_denomination__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_components_value_date__ = __webpack_require__(1571);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };






var Market = function Market(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'article',
    {
      className: 'my-market portfolio-detail'
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      {
        className: 'portfolio-group portfolio-main-group'
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        {
          className: 'main-group-title'
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          null,
          'ends: '
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__common_components_value_date__["a" /* default */], p.endDate)
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'portfolio-group' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'portfolio-pair total-value' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'title' },
          'fees collected'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__common_components_value_denomination__["a" /* default */], _extends({
          className: 'colorize'
        }, p.fees))
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'portfolio-pair' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'title' },
          'open volume'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__common_components_value_denomination__["a" /* default */], p.openVolume)
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'portfolio-pair' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'title' },
          'volume'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__common_components_value_denomination__["a" /* default */], p.volume)
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'portfolio-pair total-cost' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'title' },
          '# of trades'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__common_components_value_denomination__["a" /* default */], p.numberOfTrades)
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'portfolio-pair total-value' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'title' },
          'avg trade size'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__common_components_value_denomination__["a" /* default */], p.averageTradeSize)
      )
    )
  );
};

Market.propTypes = {
  endDate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  fees: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  openVolume: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  volume: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  numberOfTrades: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  averageTradeSize: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (Market);

/***/ }),

/***/ 1757:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_helmet__ = __webpack_require__(748);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_components_null_state_message__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__my_market__ = __webpack_require__(1756);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__transactions_components_transactions_loading_actions__ = __webpack_require__(1589);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__filter_sort_container__ = __webpack_require__(1572);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_helpers_make_path__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_helpers_make_query__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__utils_get_value__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_constants_views__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_constants_param_names__ = __webpack_require__(529);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


















var MyMarkets = function (_Component) {
  _inherits(MyMarkets, _Component);

  function MyMarkets(props) {
    _classCallCheck(this, MyMarkets);

    var _this = _possibleConstructorReturn(this, (MyMarkets.__proto__ || Object.getPrototypeOf(MyMarkets)).call(this, props));

    _this.searchKeys = ['description', ['outcomes', 'name'], ['tags', 'name']];

    _this.state = {
      filteredMarkets: []
    };
    return _this;
  }

  _createClass(MyMarkets, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var p = this.props;
      var s = this.state;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'article',
        { className: 'my-markets' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_3_react_helmet__["Helmet"],
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'title',
            null,
            'My Markets'
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'view-header' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'view-header-group' }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'view-header-group' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__transactions_components_transactions_loading_actions__["a" /* default */], {
              loadMoreTransactions: p.loadMoreTransactions,
              loadAllTransactions: p.loadAllTransactions,
              transactionsLoading: p.transactionsLoading,
              hasAllTransactionsLoaded: p.hasAllTransactionsLoaded,
              triggerTransactionsExport: p.triggerTransactionsExport,
              registerBlockNumber: p.registerBlockNumber
            })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__filter_sort_container__["a" /* default */], {
          locaiton: p.location,
          history: p.history,
          items: p.myMarkets,
          updateFilteredItems: function updateFilteredItems(filteredMarkets) {
            return _this2.setState({ filteredMarkets: filteredMarkets });
          },
          searchPlaceholder: 'Search Created Markets',
          searchKeys: this.searchKeys,
          filterBySearch: true,
          filterByMarketState: true,
          sortByMarketParam: true
        }),
        s.filteredMarkets && s.filteredMarkets.length ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          null,
          s.filteredMarkets.map(function (marketIndex) {
            var _makeQuery;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              {
                key: p.myMarkets[marketIndex].id,
                className: 'portfolio-market'
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                {
                  className: 'my-market-overview portfolio-market-overview'
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["c" /* Link */],
                  {
                    to: {
                      pathname: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__app_helpers_make_path__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_11__app_constants_views__["k" /* MARKET */]),
                      search: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__app_helpers_make_query__["a" /* default */])((_makeQuery = {}, _defineProperty(_makeQuery, __WEBPACK_IMPORTED_MODULE_12__app_constants_param_names__["b" /* MARKET_DESCRIPTION_PARAM_NAME */], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__utils_get_value__["a" /* default */])(p, 'myMarkets[' + marketIndex + '].formattedDescription')), _defineProperty(_makeQuery, __WEBPACK_IMPORTED_MODULE_12__app_constants_param_names__["c" /* MARKET_ID_PARAM_NAME */], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__utils_get_value__["a" /* default */])(p, 'myMarkets[' + marketIndex + '].id')), _makeQuery))
                    }
                  },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'span',
                    null,
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__utils_get_value__["a" /* default */])(p, 'myMarkets[' + marketIndex + '].description')
                  )
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__my_market__["a" /* default */], p.myMarkets[marketIndex])
            );
          })
        ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__common_components_null_state_message__["a" /* default */], { message: 'No Markets Created' })
      );
    }
  }]);

  return MyMarkets;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

MyMarkets.propTypes = {
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  myMarkets: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired
};
/* harmony default export */ __webpack_exports__["a"] = (MyMarkets);

/***/ }),

/***/ 1758:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_my_markets__ = __webpack_require__(1757);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__selectors_my_markets__ = __webpack_require__(775);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_actions_load_account_history__ = __webpack_require__(752);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__transactions_actions_trigger_transactions_export__ = __webpack_require__(1588);








var mapStateToProps = function mapStateToProps(state) {
  return {
    myMarkets: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__selectors_my_markets__["a" /* default */])(),
    transactionsLoading: state.transactionsLoading,
    hasAllTransactionsLoaded: state.transactionsOldestLoadedBlock === state.loginAccount.registerBlockNumber,
    registerBlockNumber: state.loginAccount.registerBlockNumber
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    loadMoreTransactions: function loadMoreTransactions() {
      return dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__auth_actions_load_account_history__["a" /* loadAccountHistory */])());
    },
    loadAllTransactions: function loadAllTransactions() {
      return dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__auth_actions_load_account_history__["a" /* loadAccountHistory */])(true));
    },
    triggerTransactionsExport: function triggerTransactionsExport() {
      return dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__transactions_actions_trigger_transactions_export__["a" /* triggerTransactionsExport */])());
    }
  };
};

var MyMarketsContainer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["b" /* withRouter */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react_redux__["b" /* connect */])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_2__components_my_markets__["a" /* default */]));

/* harmony default export */ __webpack_exports__["a"] = (MyMarketsContainer);

/***/ }),

/***/ 1759:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__market_components_market_open_orders_group__ = __webpack_require__(1657);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__markets_constants_market_types__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_get_value__ = __webpack_require__(52);









var MyOrders = function MyOrders(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'article',
    { className: 'my-orders market-open-orders' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'market-open-orders-header' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        null,
        !p.marketType === __WEBPACK_IMPORTED_MODULE_3__markets_constants_market_types__["a" /* SCALAR */] ? 'Outcomes' : 'Outcome'
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        null,
        'Type'
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        null,
        'Shares'
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        null,
        'Price'
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        null,
        'Action'
      )
    ),
    (p.outcomes || []).map(function (outcome, index) {
      var lastPricePercent = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_get_value__["a" /* default */])(outcome, 'lastPricePercent.rounded');

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__market_components_market_open_orders_group__["a" /* default */], {
        key: outcome.name,
        id: outcome.id,
        name: outcome.name,
        marketType: p.marketType,
        lastPricePercent: lastPricePercent,
        userOpenOrders: outcome.userOpenOrders,
        orderCancellation: p.orderCancellation,
        selectedShareDenomination: p.selectedShareDenomination
      });
    })
  );
};

MyOrders.propTypes = {
  outcomes: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired,
  marketType: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  orderCancellation: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (MyOrders);

/***/ }),

/***/ 1760:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_my_orders__ = __webpack_require__(1759);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_open_orders_selectors_open_orders__ = __webpack_require__(761);






var mapStateToProps = function mapStateToProps(state) {
  return {
    orders: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__user_open_orders_selectors_open_orders__["default"])()
  };
};

var Orders = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react_redux__["b" /* connect */])(mapStateToProps)(__WEBPACK_IMPORTED_MODULE_1__components_my_orders__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Orders);

/***/ }),

/***/ 1761:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_helpers_make_path__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_helpers_make_query__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_constants_views__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_constants_param_names__ = __webpack_require__(529);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











var PositionsMarketOverview = function PositionsMarketOverview(p) {
  var _makeQuery;

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'article',
    { className: 'my-positions-overview portfolio-market-overview' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["c" /* Link */],
      {
        to: {
          pathname: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__app_helpers_make_path__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_5__app_constants_views__["k" /* MARKET */]),
          search: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__app_helpers_make_query__["a" /* default */])((_makeQuery = {}, _defineProperty(_makeQuery, __WEBPACK_IMPORTED_MODULE_6__app_constants_param_names__["b" /* MARKET_DESCRIPTION_PARAM_NAME */], p.formattedDescription), _defineProperty(_makeQuery, __WEBPACK_IMPORTED_MODULE_6__app_constants_param_names__["c" /* MARKET_ID_PARAM_NAME */], p.id), _makeQuery))
        }
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        { className: 'my-positions-market-description' },
        p.description
      )
    )
  );
};

PositionsMarketOverview.propTypes = {
  description: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (PositionsMarketOverview);

/***/ }),

/***/ 1762:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_components_value_denomination__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__market_components_market_trade_close_dialog__ = __webpack_require__(1586);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__markets_constants_market_types__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__market_constants_trade_close_type__ = __webpack_require__(1573);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_get_value__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_set_share_denomination__ = __webpack_require__(1534);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };













var MyPosition = function MyPosition(p) {
  var marketID = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_get_value__["a" /* default */])(p, 'marketID');
  var outcomeID = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_get_value__["a" /* default */])(p, 'id');

  var selectedShareDenomination = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_get_value__["a" /* default */])(p, 'scalarShareDenomination.markets.' + marketID);
  var quantityOfShares = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_set_share_denomination__["a" /* default */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_get_value__["a" /* default */])(p, 'position.qtyShares.formatted'), selectedShareDenomination);

  var isClosable = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_get_value__["a" /* default */])(p, 'position.isClosable');
  var closePosition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_get_value__["a" /* default */])(p, 'position.closePosition');

  var status = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_get_value__["a" /* default */])(p, 'closePositionStatus.' + marketID + '.' + outcomeID);

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'my-position portfolio-detail' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'portfolio-group main-group' },
      p.type === __WEBPACK_IMPORTED_MODULE_4__markets_constants_market_types__["a" /* SCALAR */] ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        { className: 'main-group-title' },
        p.lastPricePercent.rounded
      ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        { className: 'main-group-title' },
        p.name
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'portfolio-pair realized-net' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'title' },
          'shares'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__common_components_value_denomination__["a" /* default */], _extends({}, p.qtyShares, {
          denomination: ''
        }))
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'portfolio-group' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'portfolio-pair purchase-price' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'title' },
          'average price of open position'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__common_components_value_denomination__["a" /* default */], p.purchasePrice)
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'portfolio-pair last-price' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'title' },
          'last trade price'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__common_components_value_denomination__["a" /* default */], p.lastPrice)
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'portfolio-group' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'portfolio-pair realized-net' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'title' },
          'realized P/L'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__common_components_value_denomination__["a" /* default */], p.realizedNet)
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'portfolio-pair unrealized-net' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'title' },
          'unrealized P/L'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__common_components_value_denomination__["a" /* default */], p.unrealizedNet)
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'portfolio-pair total-net' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'title' },
          'total P/L'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__common_components_value_denomination__["a" /* default */], p.totalNet)
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'close-trades' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__market_components_market_trade_close_dialog__["a" /* default */], {
        closeType: __WEBPACK_IMPORTED_MODULE_5__market_constants_trade_close_type__["b" /* POSITION */],
        marketID: marketID,
        outcomeID: outcomeID,
        quantityOfShares: quantityOfShares,
        closePosition: closePosition,
        isClosable: isClosable,
        status: status
      })
    )
  );
};

MyPosition.propTypes = {
  marketID: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  scalarShareDenomination: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  position: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  closePositionStatus: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  lastPricePercent: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  name: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  qtyShares: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  purchasePrice: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  lastPrice: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  realizedNet: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  unrealizedNet: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  totalNet: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (MyPosition);

/***/ }),

/***/ 1763:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_components_component_nav__ = __webpack_require__(1532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_components_value_denomination__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_components_null_state_message__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__my_position__ = __webpack_require__(1762);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__my_position_overview__ = __webpack_require__(1761);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__my_orders_container__ = __webpack_require__(1760);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__constants_internal_views__ = __webpack_require__(1765);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__utils_get_value__ = __webpack_require__(52);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
















var MyPositionsMarket = function (_Component) {
  _inherits(MyPositionsMarket, _Component);

  function MyPositionsMarket(props) {
    var _this$navItems;

    _classCallCheck(this, MyPositionsMarket);

    var _this = _possibleConstructorReturn(this, (MyPositionsMarket.__proto__ || Object.getPrototypeOf(MyPositionsMarket)).call(this, props));

    _this.navItems = (_this$navItems = {}, _defineProperty(_this$navItems, __WEBPACK_IMPORTED_MODULE_8__constants_internal_views__["a" /* POSITIONS_POSITIONS */], {
      label: 'Positions'
    }), _defineProperty(_this$navItems, __WEBPACK_IMPORTED_MODULE_8__constants_internal_views__["b" /* POSITIONS_ORDERS */], {
      label: 'Orders'
    }), _this$navItems);

    _this.state = {
      selectedNav: __WEBPACK_IMPORTED_MODULE_8__constants_internal_views__["a" /* POSITIONS_POSITIONS */]
    };
    return _this;
  }

  _createClass(MyPositionsMarket, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var p = this.props;
      var s = this.state;

      var myPositionOutcomes = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__utils_get_value__["a" /* default */])(p, 'market.myPositionOutcomes');
      var myPositionsSummary = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__utils_get_value__["a" /* default */])(p, 'market.myPositionsSummary');

      var userOpenOrdersCount = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__utils_get_value__["a" /* default */])(p, 'market.userOpenOrdersSummary.openOrdersCount.value');
      var outcomes = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__utils_get_value__["a" /* default */])(p, 'market.outcomes');

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'article',
        {
          className: 'my-positions-market portfolio-market'
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__my_position_overview__["a" /* default */], {
          id: p.market.id,
          description: p.market.description,
          formattedDescription: p.market.formattedDescription
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__common_components_component_nav__["a" /* default */], {
          navItems: this.navItems,
          selectedNav: s.selectedNav,
          updateSelectedNav: function updateSelectedNav(selectedNav) {
            return _this2.setState({ selectedNav: selectedNav });
          }
        }),
        s.selectedNav === __WEBPACK_IMPORTED_MODULE_8__constants_internal_views__["a" /* POSITIONS_POSITIONS */] && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          null,
          myPositionOutcomes && myPositionOutcomes.length ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'my-position portfolio-detail' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'portfolio-group main-group' }),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'portfolio-group' }),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'portfolio-group' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'portfolio-pair realized-net' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'span',
                    { className: 'title' },
                    'total realized P/L'
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__common_components_value_denomination__["a" /* default */], myPositionsSummary.realizedNet)
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'portfolio-pair unrealized-net' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'span',
                    { className: 'title' },
                    'total unrealized P/L'
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__common_components_value_denomination__["a" /* default */], myPositionsSummary.unrealizedNet)
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'portfolio-pair total-net' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'span',
                    { className: 'title' },
                    'total P/L'
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__common_components_value_denomination__["a" /* default */], myPositionsSummary.totalNet)
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'close-trades' })
            ),
            (myPositionOutcomes || []).map(function (outcome) {
              return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__my_position__["a" /* default */], _extends({}, outcome, outcome.position, {
                key: p.market.id + '-' + outcome.id,
                type: p.market.type,
                closePositionStatus: p.closePositionStatus,
                scalarShareDenomination: p.scalarShareDenomination
              }));
            })
          ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__common_components_null_state_message__["a" /* default */], { message: 'No Positions Held' })
        ),
        s.selectedNav === __WEBPACK_IMPORTED_MODULE_8__constants_internal_views__["b" /* POSITIONS_ORDERS */] && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          null,
          userOpenOrdersCount ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__my_orders_container__["a" /* default */], {
            outcomes: outcomes,
            marketType: p.market.type,
            orderCancellation: p.orderCancellation
          }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__common_components_null_state_message__["a" /* default */], { message: 'No Open Orders' })
        )
      );
    }
  }]);

  return MyPositionsMarket;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

MyPositionsMarket.propTypes = {
  market: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  closePositionStatus: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  scalarShareDenomination: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  orderCancellation: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
};
/* harmony default export */ __webpack_exports__["a"] = (MyPositionsMarket);

/***/ }),

/***/ 1764:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet__ = __webpack_require__(748);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_components_null_state_message__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__my_positions_market__ = __webpack_require__(1763);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__transactions_components_transactions_loading_actions__ = __webpack_require__(1589);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__filter_sort_container__ = __webpack_require__(1572);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var MyPositions = function (_Component) {
  _inherits(MyPositions, _Component);

  function MyPositions(props) {
    _classCallCheck(this, MyPositions);

    var _this = _possibleConstructorReturn(this, (MyPositions.__proto__ || Object.getPrototypeOf(MyPositions)).call(this, props));

    _this.searchKeys = ['description', ['outcomes', 'name'], ['tags', 'name']];

    _this.state = {
      filteredMarkets: []
    };
    return _this;
  }

  _createClass(MyPositions, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var p = this.props;
      var s = this.state;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'article',
        { className: 'my-positions' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_react_helmet__["Helmet"],
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'title',
            null,
            'My Positions'
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'view-header' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'view-header-group' }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'view-header-group' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__transactions_components_transactions_loading_actions__["a" /* default */], {
              loadMoreTransactions: p.loadMoreTransactions,
              loadAllTransactions: p.loadAllTransactions,
              transactionsLoading: p.transactionsLoading,
              hasAllTransactionsLoaded: p.hasAllTransactionsLoaded,
              triggerTransactionsExport: p.triggerTransactionsExport,
              registerBlockNumber: p.registerBlockNumber
            })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__filter_sort_container__["a" /* default */], {
          locaiton: p.location,
          history: p.history,
          items: p.markets,
          updateFilteredItems: function updateFilteredItems(filteredMarkets) {
            return _this2.setState({ filteredMarkets: filteredMarkets });
          },
          searchPlaceholder: 'Search Traded Markets',
          searchKeys: this.searchKeys,
          filterBySearch: true,
          filterByMarketState: true,
          sortByMarketParam: true
        }),
        s.filteredMarkets && s.filteredMarkets.length ? s.filteredMarkets.map(function (marketIndex) {
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__my_positions_market__["a" /* default */], {
            key: p.markets[marketIndex].id,
            market: p.markets[marketIndex],
            closePositionStatus: p.closePositionStatus,
            scalarShareDenomination: p.scalarShareDenomination,
            orderCancellation: p.orderCancellation,
            location: p.location,
            history: p.history
          });
        }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__common_components_null_state_message__["a" /* default */], {
          message: 'No Positions Held'
        })
      );
    }
  }]);

  return MyPositions;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

MyPositions.propTypes = {
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  markets: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired,
  closePositionStatus: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  scalarShareDenomination: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  orderCancellation: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  registerBlockNumber: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number
};
/* harmony default export */ __webpack_exports__["a"] = (MyPositions);

/***/ }),

/***/ 1765:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return POSITIONS_POSITIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return POSITIONS_ORDERS; });
var POSITIONS_POSITIONS = 'POSITIONS_POSITIONS';
var POSITIONS_ORDERS = 'POSITIONS_ORDERS';

/***/ }),

/***/ 1766:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_memoizee__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_memoizee___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_memoizee__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_my_positions__ = __webpack_require__(1764);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__selectors_login_account_positions__ = __webpack_require__(543);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__user_open_orders_selectors_open_orders__ = __webpack_require__(761);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__selectors_close_position_status__ = __webpack_require__(1659);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__market_selectors_scalar_share_denomination__ = __webpack_require__(1587);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__bids_asks_selectors_order_cancellation__ = __webpack_require__(1654);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__auth_actions_load_account_history__ = __webpack_require__(752);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__transactions_actions_trigger_transactions_export__ = __webpack_require__(1588);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }















var mapStateToProps = function mapStateToProps(state) {
  var positions = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__selectors_login_account_positions__["a" /* default */])();
  var openOrders = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__user_open_orders_selectors_open_orders__["default"])();

  return {
    markets: getPositionsMarkets(positions, openOrders),
    closePositionStatus: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__selectors_close_position_status__["a" /* default */])(),
    scalarShareDenomination: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__market_selectors_scalar_share_denomination__["a" /* default */])(),
    orderCancellation: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__bids_asks_selectors_order_cancellation__["a" /* default */])(),
    transactionsLoading: state.transactionsLoading,
    hasAllTransactionsLoaded: state.transactionsOldestLoadedBlock === state.loginAccount.registerBlockNumber,
    registerBlockNumber: state.loginAccount.registerBlockNumber
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    loadMoreTransactions: function loadMoreTransactions() {
      return dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__auth_actions_load_account_history__["a" /* loadAccountHistory */])());
    },
    loadAllTransactions: function loadAllTransactions() {
      return dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__auth_actions_load_account_history__["a" /* loadAccountHistory */])(true));
    },
    triggerTransactionsExport: function triggerTransactionsExport() {
      return dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__transactions_actions_trigger_transactions_export__["a" /* triggerTransactionsExport */])());
    }
  };
};

var getPositionsMarkets = __WEBPACK_IMPORTED_MODULE_2_memoizee___default()(function (positions, openOrders) {
  return Array.from(new Set([].concat(_toConsumableArray(positions.markets), _toConsumableArray(openOrders))));
}, { max: 1 });

var MyPositionsContainer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["b" /* withRouter */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react_redux__["b" /* connect */])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_3__components_my_positions__["a" /* default */]));

/* harmony default export */ __webpack_exports__["a"] = (MyPositionsContainer);

/***/ }),

/***/ 1767:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_tooltip__ = __webpack_require__(747);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_components_value_denomination__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_components_value_date__ = __webpack_require__(1571);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_components_em_dash__ = __webpack_require__(749);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };









var MyReport = function MyReport(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'article',
    {
      className: 'my-report portfolio-detail'
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'portfolio-group portfolio-main-group' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'portfolio-pair' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'main-group-title' },
          'outcome: '
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'report-main-group-title-outcome' },
          p.outcome && p.outcomePercentage && p.outcomePercentage.value && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            null,
            p.outcome,
            '  (',
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__common_components_value_denomination__["a" /* default */], p.outcomePercentage),
            ')'
          ),
          p.outcome && !p.outcomePercentage && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            null,
            p.outcome
          ),
          !p.outcome && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__common_components_em_dash__["a" /* default */], null)
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'portfolio-pair' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'report-main-group-title' },
          'reported: '
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'report-main-group-title-outcome' },
          !!p.isSubmitted && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'report-revealed' },
            p.reported || __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__common_components_em_dash__["a" /* default */], null)
          ),
          !p.isSubmitted && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            null,
            p.reported || __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__common_components_em_dash__["a" /* default */], null)
          ),
          !!p.outcome && p.isReportEqual && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', {
            className: 'fa fa-check-circle report-equal',
            'data-tip': 'Your report matches the consensus outcome'
          }),
          !!p.outcome && !p.isReportEqual && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', {
            className: 'fa fa-times-circle report-unequal',
            'data-tip': 'Your report does not match the consensus outcome'
          })
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'portfolio-pair' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'report-main-group-title' },
          'cycle: '
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'report-main-group-title-outcome' },
          p.period ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            null,
            p.period
          ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__common_components_em_dash__["a" /* default */], null)
        )
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'portfolio-group' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'portfolio-pair' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'title' },
          'rep gain/loss'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__common_components_value_denomination__["a" /* default */], _extends({
          className: 'colorize'
        }, p.repEarned))
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'portfolio-pair' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'title' },
          'ended'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__common_components_value_date__["a" /* default */], p.endDate)
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_tooltip___default.a, { type: 'light', effect: 'solid', place: 'top' })
  );
};

MyReport.propTypes = {
  outcome: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  outcomePercentage: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  reported: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  repEarned: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  period: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  isSubmitted: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  isReportEqual: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  branch: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  endDate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (MyReport);

/***/ }),

/***/ 1768:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_tooltip__ = __webpack_require__(747);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_helmet__ = __webpack_require__(748);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_components_null_state_message__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__my_report__ = __webpack_require__(1767);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__transactions_components_transactions_loading_actions__ = __webpack_require__(1589);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__filter_sort_container__ = __webpack_require__(1572);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_helpers_make_path__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_helpers_make_query__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__utils_get_value__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_constants_views__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_constants_param_names__ = __webpack_require__(529);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



















var MyReports = function (_Component) {
  _inherits(MyReports, _Component);

  function MyReports(props) {
    _classCallCheck(this, MyReports);

    var _this = _possibleConstructorReturn(this, (MyReports.__proto__ || Object.getPrototypeOf(MyReports)).call(this, props));

    _this.searchKeys = ['description', ['outcomes', 'name'], ['tags', 'name']];

    _this.state = {
      filteredMarkets: []
    };
    return _this;
  }

  _createClass(MyReports, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var p = this.props;
      var s = this.state;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'article',
        { className: 'my-reports' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_4_react_helmet__["Helmet"],
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'title',
            null,
            'My Reports'
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'view-header' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'view-header-group' }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'view-header-group' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__transactions_components_transactions_loading_actions__["a" /* default */], {
              loadMoreTransactions: p.loadMoreTransactions,
              loadAllTransactions: p.loadAllTransactions,
              transactionsLoading: p.transactionsLoading,
              hasAllTransactionsLoaded: p.hasAllTransactionsLoaded,
              triggerTransactionsExport: p.triggerTransactionsExport,
              registerBlockNumber: p.registerBlockNumber
            })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__filter_sort_container__["a" /* default */], {
          locaiton: p.location,
          history: p.history,
          items: p.reports,
          updateFilteredItems: function updateFilteredItems(filteredMarkets) {
            return _this2.setState({ filteredMarkets: filteredMarkets });
          },
          searchPlaceholder: 'Search Created Markets',
          searchKeys: this.searchKeys,
          filterBySearch: true,
          filterByMarketState: true,
          sortByMarketParam: true
        }),
        s.filteredMarkets && s.filteredMarkets.length ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          null,
          s.filteredMarkets.map(function (marketIndex) {
            var _makeQuery;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              {
                key: p.reports[marketIndex].marketID,
                className: 'portfolio-market'
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                {
                  className: 'portfolio-market-overview'
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["c" /* Link */],
                  {
                    to: {
                      pathname: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__app_helpers_make_path__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_12__app_constants_views__["k" /* MARKET */]),
                      search: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__app_helpers_make_query__["a" /* default */])((_makeQuery = {}, _defineProperty(_makeQuery, __WEBPACK_IMPORTED_MODULE_13__app_constants_param_names__["b" /* MARKET_DESCRIPTION_PARAM_NAME */], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__utils_get_value__["a" /* default */])(p, 'reports[' + marketIndex + '].formattedDescription')), _defineProperty(_makeQuery, __WEBPACK_IMPORTED_MODULE_13__app_constants_param_names__["c" /* MARKET_ID_PARAM_NAME */], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__utils_get_value__["a" /* default */])(p, 'reports[' + marketIndex + '].id')), _makeQuery))
                    }
                  },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'span',
                    { className: 'description' },
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__utils_get_value__["a" /* default */])(p, 'reports[' + marketIndex + '].description')
                  )
                ),
                p.reports[marketIndex].isChallenged && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', {
                  className: 'fa fa-gavel outcome-challenged',
                  'data-tip': 'This outcome is currently being challenged'
                }),
                !p.reports[marketIndex].isChallenged && p.reports[marketIndex].isChallengeable && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', {
                  className: 'fa fa-exclamation-circle outcome-challengeable',
                  'data-tip': 'This outcome is eligible to be challenged'
                })
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__my_report__["a" /* default */], _extends({}, p.reports[marketIndex], {
                branch: p.branch
              }))
            );
          })
        ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__common_components_null_state_message__["a" /* default */], { message: 'No Reports Made' }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_tooltip___default.a, { type: 'light', effect: 'solid', place: 'top' })
      );
    }
  }]);

  return MyReports;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

MyReports.propTypes = {
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  branch: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  reports: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired,
  registerBlockNumber: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number
};
/* harmony default export */ __webpack_exports__["a"] = (MyReports);

/***/ }),

/***/ 1769:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_my_reports__ = __webpack_require__(1768);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__selectors_my_reports__ = __webpack_require__(776);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_actions_load_account_history__ = __webpack_require__(752);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__transactions_actions_trigger_transactions_export__ = __webpack_require__(1588);








var mapStateToProps = function mapStateToProps(state) {
  return {
    branch: state.branch,
    reports: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__selectors_my_reports__["a" /* default */])(),
    transactionsLoading: state.transactionsLoading,
    hasAllTransactionsLoaded: state.transactionsOldestLoadedBlock === state.loginAccount.registerBlockNumber,
    registerBlockNumber: state.loginAccount.registerBlockNumber
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    loadMoreTransactions: function loadMoreTransactions() {
      return dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__auth_actions_load_account_history__["a" /* loadAccountHistory */])());
    },
    loadAllTransactions: function loadAllTransactions() {
      return dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__auth_actions_load_account_history__["a" /* loadAccountHistory */])(true));
    },
    triggerTransactionsExport: function triggerTransactionsExport() {
      return dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__transactions_actions_trigger_transactions_export__["a" /* triggerTransactionsExport */])());
    }
  };
};

var MyReportsContainer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["b" /* withRouter */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react_redux__["b" /* connect */])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_2__components_my_reports__["a" /* default */]));

/* harmony default export */ __webpack_exports__["a"] = (MyReportsContainer);

/***/ }),

/***/ 1781:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__my_positions_container__ = __webpack_require__(1766);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__my_markets_container__ = __webpack_require__(1758);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__my_reports_container__ = __webpack_require__(1769);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_helpers_make_path__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_constants_views__ = __webpack_require__(68);











var PortfolioView = function PortfolioView(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'section',
    { id: 'portfolio_view' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["f" /* Route */], { path: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__app_helpers_make_path__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_6__app_constants_views__["f" /* MY_POSITIONS */]), component: __WEBPACK_IMPORTED_MODULE_2__my_positions_container__["a" /* default */] }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["f" /* Route */], { path: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__app_helpers_make_path__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_6__app_constants_views__["g" /* MY_MARKETS */]), component: __WEBPACK_IMPORTED_MODULE_3__my_markets_container__["a" /* default */] }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["f" /* Route */], { path: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__app_helpers_make_path__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_6__app_constants_views__["e" /* MY_REPORTS */]), component: __WEBPACK_IMPORTED_MODULE_4__my_reports_container__["a" /* default */] })
  );
};

/* harmony default export */ __webpack_exports__["a"] = (PortfolioView);

/***/ })

});
//# sourceMappingURL=portfolio.ed177ff5f532e5460ac0.js.map