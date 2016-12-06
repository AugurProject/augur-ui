webpackJsonp([2],{

/***/ 1192:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_markets_components_markets_headers__ = __webpack_require__(1251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_markets_components_markets_list__ = __webpack_require__(1252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_branch_components_branch__ = __webpack_require__(1227);






var MarketsView = function MarketsView(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'section',
		{ id: 'markets_view' },
		!!p.loginAccount.rep && !!p.loginAccount.rep.value && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_branch_components_branch__["a" /* default */], p.branch),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_markets_components_markets_headers__["a" /* default */], {
			createMarketLink: p.createMarketLink,
			loginAccount: p.loginAccount,
			marketsHeader: p.marketsHeader,
			filterSort: p.filterSort,
			keywords: p.keywords
		}),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_modules_markets_components_markets_list__["a" /* default */], {
			loginAccount: p.loginAccount,
			markets: p.markets,
			pagination: p.pagination,
			scalarShareDenomination: p.scalarShareDenomination
		})
	);
};

MarketsView.propTypes = {
	className: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
	filterSort: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object,
	marketsHeader: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object,
	markets: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].array,
	pagination: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object,
	keywords: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object,
	branch: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object
};

var _default = MarketsView;
/* harmony default export */ exports["default"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(MarketsView, 'MarketsView', '/Users/li/augur/dev/augur/src/modules/markets/components/markets-view.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/markets/components/markets-view.jsx');
}();

;

/***/ },

/***/ 1195:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_utils_should_component_update_pure__ = __webpack_require__(237);
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

		_this.handleOnChange = function () {
			return _this.__handleOnChange__REACT_HOT_LOADER__.apply(_this, arguments);
		};

		_this.handleOnBlur = function () {
			return _this.__handleOnBlur__REACT_HOT_LOADER__.apply(_this, arguments);
		};

		_this.handleClear = function () {
			return _this.__handleClear__REACT_HOT_LOADER__.apply(_this, arguments);
		};

		_this.finalDebounceMS = _this.props.debounceMS > 0 || _this.props.debounceMS === 0 ? _this.props.debounceMS : 500;
		_this.state = {
			value: _this.props.value || '',
			timeoutID: ''
		};
		_this.shouldComponentUpdate = __WEBPACK_IMPORTED_MODULE_2_utils_should_component_update_pure__["b" /* default */];
		_this.componentWillReceiveProps = function (nextProps) {
			if ((nextProps.value || nextProps.value === 0) && nextProps.value !== _this.state.value && nextProps.value !== _this.props.value) {
				_this.setState({ value: nextProps.value });
			}
		};
		_this.handleOnChange = _this.handleOnChange.bind(_this);
		_this.handleOnBlur = _this.handleOnBlur.bind(_this);
		_this.handleClear = _this.handleClear.bind(_this);
		return _this;
	}
	// TODO -- Prop Validations


	_createClass(Input, [{
		key: '__handleOnChange__REACT_HOT_LOADER__',
		value: function __handleOnChange__REACT_HOT_LOADER__(e) {
			var _this2 = this;

			var newValue = e.target.value;
			if (this.finalDebounceMS) {
				clearTimeout(this.state.timeoutID);
				if (newValue !== this.props.value) {
					this.setState({ timeoutID: setTimeout(function () {
							return _this2.props.onChange(newValue);
						}, this.finalDebounceMS) });
				}
			} else if (newValue !== this.props.value) {
				this.props.onChange(newValue);
			}
			this.setState({ value: newValue });
		}
	}, {
		key: '__handleOnBlur__REACT_HOT_LOADER__',
		value: function __handleOnBlur__REACT_HOT_LOADER__() {
			if (this.finalDebounceMS) {
				clearTimeout(this.state.timeoutID);
				if (this.state.value !== this.props.value) {
					this.props.onChange(this.state.value);
				}
			}
			this.props.onBlur && this.props.onBlur();
		}
	}, {
		key: '__handleClear__REACT_HOT_LOADER__',
		value: function __handleClear__REACT_HOT_LOADER__() {
			this.setState({ value: '' });
			this.props.onChange('');
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    isClearable = _props.isClearable,
			    p = _objectWithoutProperties(_props, ['isClearable']);

			var s = this.state;

			return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()('input', p.className) },
				!p.isMultiline && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', _extends({}, p, {
					className: 'box',
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
					{ type: 'button', className: 'button-text-only', onClick: this.handleClear },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'i',
						null,
						'\uF00D'
					)
				)
			);
		}
	}]);

	return Input;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

Input.propTypes = {
	// type: PropTypes.string,
	// className: PropTypes.string,
	value: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].any,
	// isMultiline: PropTypes.bool,
	isClearable: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool,
	debounceMS: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number,
	onChange: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func,
	onBlur: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func
};
var _default = Input;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(Input, 'Input', '/Users/li/augur/dev/augur/src/modules/common/components/input.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/common/components/input.jsx');
}();

;

/***/ },

/***/ 1196:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_modules_market_constants_share_denominations__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_utils_add_commas_to_number__ = __webpack_require__(518);



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

	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_utils_add_commas_to_number__["a" /* default */])(valueArray.join('')); // return joined string w/ comma separating thousands
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

var _default = setShareDenomination;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(setShareDenomination, 'setShareDenomination', '/Users/li/augur/dev/augur/src/utils/set-share-denomination.js');

	__REACT_HOT_LOADER__.register(formatValue, 'formatValue', '/Users/li/augur/dev/augur/src/utils/set-share-denomination.js');

	__REACT_HOT_LOADER__.register(handlePostfixedUnit, 'handlePostfixedUnit', '/Users/li/augur/dev/augur/src/utils/set-share-denomination.js');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/utils/set-share-denomination.js');
}();

;

/***/ },

/***/ 1197:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);



var ValueDate = function ValueDate(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'span',
		{ className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()('value-date', p.className) },
		p.formatted
	);
};

ValueDate.propTypes = {
	className: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
	value: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object,
	formatted: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string
};

var _default = ValueDate;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(ValueDate, 'ValueDate', '/Users/li/augur/dev/augur/src/modules/common/components/value-date.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/common/components/value-date.jsx');
}();

;

/***/ },

/***/ 1198:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_tooltip__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_common_components_value_date__ = __webpack_require__(1197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_common_components_value_denomination__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_utils_get_value__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_utils_set_share_denomination__ = __webpack_require__(1196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_utils_share_denomination_label__ = __webpack_require__(1199);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };











var MarketProperties = function MarketProperties(p) {
	var shareVolumeRounded = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_utils_set_share_denomination__["a" /* default */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_utils_get_value__["a" /* default */])(p, 'volume.rounded'), p.selectedShareDenomination);
	var shareVolumeFormatted = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_utils_get_value__["a" /* default */])(p, 'volume.formatted');
	var shareDenomination = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_utils_share_denomination_label__["a" /* default */])(p.selectedShareDenomination, p.shareDenominations);

	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'ul',
		{ className: 'market-properties' },
		p.endDate && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'li',
			{ className: 'property end-date' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'a',
				{
					'data-tip': true,
					'data-for': p.id + '-end-date-tooltip',
					'data-event': 'click focus'
				},
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'property-label' },
					p.isOpen && !p.isPendingReport ? p.endDateLabel || 'End Date' : 'Ended',
					':'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_modules_common_components_value_date__["a" /* default */], _extends({ className: 'property-value' }, p.endDate))
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				__WEBPACK_IMPORTED_MODULE_1_react_tooltip___default.a,
				{
					id: p.id + '-end-date-tooltip',
					type: 'light',
					effect: 'solid',
					place: 'top',
					globalEventOff: 'click'
				},
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'tooltip-text' },
					'The outcome of this event will be known on or before ',
					p.endDate.full,
					'.'
				)
			)
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'li',
			{ className: 'property fee' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'a',
				{
					'data-tip': true,
					'data-for': p.id + '-maker-fee-tooltip',
					'data-event': 'click focus'
				},
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'property-label' },
					'Maker Fee:'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_common_components_value_denomination__["a" /* default */], _extends({ className: 'property-value' }, p.makerFeePercent))
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				__WEBPACK_IMPORTED_MODULE_1_react_tooltip___default.a,
				{
					id: p.id + '-maker-fee-tooltip',
					type: 'light',
					effect: 'solid',
					place: 'top',
					globalEventOff: 'click'
				},
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'tooltip-text' },
					p.makerFeePercent.full,
					' discounted fee for placing bids or asks on the books'
				)
			)
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'li',
			{ className: 'property fee' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'a',
				{
					'data-tip': true,
					'data-for': p.id + '-taker-fee-tooltip',
					'data-event': 'click focus'
				},
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'property-label' },
					'Taker Fee:'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_common_components_value_denomination__["a" /* default */], _extends({ className: 'property-value' }, p.takerFeePercent))
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				__WEBPACK_IMPORTED_MODULE_1_react_tooltip___default.a,
				{
					id: p.id + '-taker-fee-tooltip',
					type: 'light',
					effect: 'solid',
					place: 'top',
					globalEventOff: 'click'
				},
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'tooltip-text' },
					p.takerFeePercent.full,
					' fee for taking bids or asks from the books'
				)
			)
		),
		shareVolumeRounded && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'li',
			{ className: 'property volume' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'a',
				{
					'data-tip': true,
					'data-for': p.id + '-volume-tooltip',
					'data-event': 'click focus'
				},
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'property-label' },
					'Volume:'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_common_components_value_denomination__["a" /* default */], { className: 'property-value', formatted: shareVolumeRounded, denomination: shareDenomination })
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				__WEBPACK_IMPORTED_MODULE_1_react_tooltip___default.a,
				{
					id: p.id + '-volume-tooltip',
					type: 'light',
					effect: 'solid',
					place: 'top',
					globalEventOff: 'click'
				},
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'tooltip-text' },
					shareVolumeFormatted,
					' total ',
					p.volume.denomination,
					' traded'
				)
			)
		),
		p.numPendingReports && p.isPendingReport && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'li',
			{ className: 'property pending-reports' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'a',
				{
					'data-tip': true,
					'data-for': p.id + '-pending-reports-tooltip',
					'data-event': 'click focus'
				},
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'property-label' },
					'Pending Reports:'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					null,
					' ',
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'strong',
						null,
						p.numPendingReports
					)
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				__WEBPACK_IMPORTED_MODULE_1_react_tooltip___default.a,
				{
					id: p.id + '-pending-reports-tooltip',
					type: 'light',
					effect: 'solid',
					place: 'top',
					globalEventOff: 'click'
				},
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'tooltip-text' },
					p.numPendingReports,
					' reports submitted on this market thus far'
				)
			)
		)
	);
};

var _default = MarketProperties;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(MarketProperties, 'MarketProperties', '/Users/li/augur/dev/augur/src/modules/market/components/market-properties.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/market/components/market-properties.jsx');
}();

;

/***/ },

/***/ 1199:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_modules_market_constants_share_denominations__ = __webpack_require__(515);


var _default = function _default(selectedDenomination, shareDenominations) {
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
};

/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/utils/share-denomination-label.js');
}();

;

/***/ },

/***/ 1200:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_market_components_market_properties__ = __webpack_require__(1198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_link_components_link__ = __webpack_require__(513);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };







var MarketBasics = function MarketBasics(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'article',
		{ className: 'market-basics' },
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'market-basics-header' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'market-basics-header-group-1' },
				!!p.tags && !!p.tags.length && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'ul',
					{ className: 'tags' },
					p.tags.map(function (tag, i) {
						return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'li',
							{ key: i, className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()('tag', 'pointer', { link: !!tag.name }) },
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'button',
								{
									className: 'unstyled',
									onClick: tag.onClick && tag.onClick
								},
								tag.name ? tag.name : tag
							)
						);
					})
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'market-basics-header-group-2' },
				p.loginAccount && p.loginAccount.id && p.onClickToggleFavorite && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'button',
					{
						className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()('button unstyled favorite-button', { on: p.isFavorite }),
						onClick: p.onClickToggleFavorite
					},
					p.isFavorite ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'i',
						null,
						'\uF005'
					) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'i',
						null,
						'\uF006'
					)
				)
			)
		),
		p.marketLink ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			__WEBPACK_IMPORTED_MODULE_3_modules_link_components_link__["a" /* default */],
			_extends({}, p.marketLink, {
				onClick: p.marketLink.onClick,
				className: 'market-description'
			}),
			p.description
		) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'span',
			{ className: 'market-description' },
			p.description
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_modules_market_components_market_properties__["a" /* default */], p)
	);
};

// TODO -- Prop Validations
// MarketBasics.propTypes = {
// 	description: PropTypes.string,
// 	endDate: PropTypes.object,
// 	makerFeePercent: PropTypes.object,
// 	takerFeePercent: PropTypes.object,
// 	volume: PropTypes.object,
// 	tags: PropTypes.array,
// 	lastUpdatedBefore: PropTypes.string,
// 	updateData: PropTypes.func,
// 	isMarketDataLoading: PropTypes.bool,
// 	updateIntervalSecs: PropTypes.number,
// 	isUpdaterVisible: PropTypes.bool,
// 	marketDataAge: React.PropTypes.shape({
// 		lastUpdatedBefore: PropTypes.string.isRequired,
// 		isMarketDataLoading: PropTypes.bool.isRequired
// 	})
// };

var _default = MarketBasics;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(MarketBasics, 'MarketBasics', '/Users/li/augur/dev/augur/src/modules/market/components/market-basics.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/market/components/market-basics.jsx');
}();

;

/***/ },

/***/ 1203:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


var Dropdown = function Dropdown(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		"div",
		{ className: "dropdown" },
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			"select",
			{
				onChange: function onChange(event) {
					p.onChange(event.target.value);
				},
				defaultValue: p.default
			},
			p.options.map(function (option) {
				return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					"option",
					{
						key: option.value,
						value: option.value
					},
					option.label
				);
			})
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			"i",
			{ className: "fa" },
			"\uF107"
		)
	);
};

// TODO -- Prop Validations
// Dropdown.propTypes = {
// 	default: PropTypes.string,
// 	options: PropTypes.array,
// 	onChange: PropTypes.func
// };

var _default = Dropdown;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(Dropdown, "Dropdown", "/Users/li/augur/dev/augur/src/modules/common/components/dropdown.jsx");

	__REACT_HOT_LOADER__.register(_default, "default", "/Users/li/augur/dev/augur/src/modules/common/components/dropdown.jsx");
}();

;

/***/ },

/***/ 1205:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_common_components_value_denomination__ = __webpack_require__(514);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




var MarketOutcomes = function MarketOutcomes(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'div',
		{ className: 'market-preview-outcomes' },
		p.outcomes.map(function (outcome, i) {
			return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{
					key: outcome.id,
					className: 'outcome'
				},
				!!outcome.lastPricePercent && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_common_components_value_denomination__["a" /* default */], _extends({
					className: 'outcome-price'
				}, outcome.lastPricePercent, {
					formatted: outcome.lastPricePercent.rounded,
					formattedValue: outcome.lastPricePercent.roundedValue
				})),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'outcome-name' },
					outcome.name
				)
			);
		})
	);
};

// TODO -- Prop Validations
// MarketOutcomes.propTypes = {
// 	outcomes: React.PropTypes.array
// };

var _default = MarketOutcomes;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(MarketOutcomes, 'MarketOutcomes', '/Users/li/augur/dev/augur/src/modules/market/components/market-preview-outcomes.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/market/components/market-preview-outcomes.jsx');
}();

;

/***/ },

/***/ 1206:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_market_components_market_basics__ = __webpack_require__(1200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_market_components_market_preview_outcomes__ = __webpack_require__(1205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_link_components_link__ = __webpack_require__(513);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };








var MarketPreview = function MarketPreview(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'article',
		{ className: 'market-preview ' + p.className },
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'market-preview-group-1' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_modules_market_components_market_basics__["a" /* default */], p),
			!!p.marketLink && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'market-link' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					__WEBPACK_IMPORTED_MODULE_4_modules_link_components_link__["a" /* default */],
					_extends({}, p.marketLink, {
						className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()('button', p.marketLink.className)
					}),
					p.marketLink.text
				)
			)
		),
		p.outcomes && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'market-preview-group-2' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_market_components_market_preview_outcomes__["a" /* default */], { outcomes: p.outcomes })
		)
	);
};

MarketPreview.propTypes = {
	className: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
	description: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
	outcomes: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].array,
	isOpen: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool,
	isFavorite: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool,
	isPendingReport: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool,
	endDate: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object,
	tradingFeePercent: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object,
	volume: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object,
	tags: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].array,
	marketLink: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object,
	onClickToggleFavorite: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func
};

var _default = MarketPreview;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(MarketPreview, 'MarketPreview', '/Users/li/augur/dev/augur/src/modules/market/components/market-preview.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/market/components/market-preview.jsx');
}();

;

/***/ },

/***/ 1211:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(13);

exports["default"] = {
  propTypes: {
    prefixCls: _react.PropTypes.string,
    strokeWidth: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
    strokeColor: _react.PropTypes.string,
    trailWidth: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
    trailColor: _react.PropTypes.string,
    strokeLinecap: _react.PropTypes.oneOf(['round', 'square']),
    style: _react.PropTypes.object,
    className: _react.PropTypes.string
  },
  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: 'rc-progress',
      strokeWidth: 1,
      strokeColor: '#2db7f5',
      trailWidth: 1,
      trailColor: '#D9D9D9',
      strokeLinecap: 'round',
      className: ''
    };
  },
  componentDidUpdate: function componentDidUpdate() {
    var now = Date.now();
    this.refs.path.style.transitionDuration = '0.3s, 0.3s';
    if (this.prevTimeStamp && now - this.prevTimeStamp < 100) {
      this.refs.path.style.transitionDuration = '0s, 0s';
    }
    this.prevTimeStamp = Date.now();
  }
};
module.exports = exports['default'];
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;

/***/ },

/***/ 1216:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _react = __webpack_require__(13);

var _react2 = _interopRequireDefault(_react);

var _mixin = __webpack_require__(1211);

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { "default": obj };
}

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
} /* eslint-disable react/prop-types */

exports["default"] = _react2["default"].createClass({
  displayName: 'Circle',

  mixins: [_mixin2["default"]],
  render: function render() {
    var _props = this.props;
    var prefixCls = _props.prefixCls;
    var strokeWidth = _props.strokeWidth;
    var trailWidth = _props.trailWidth;
    var strokeColor = _props.strokeColor;
    var trailColor = _props.trailColor;
    var strokeLinecap = _props.strokeLinecap;
    var percent = _props.percent;
    var style = _props.style;
    var className = _props.className;

    var restProps = _objectWithoutProperties(_props, ['prefixCls', 'strokeWidth', 'trailWidth', 'strokeColor', 'trailColor', 'strokeLinecap', 'percent', 'style', 'className']);

    var radius = 50 - strokeWidth / 2;
    var pathString = 'M 50,50 m 0,-' + radius + '\n     a ' + radius + ',' + radius + ' 0 1 1 0,' + 2 * radius + '\n     a ' + radius + ',' + radius + ' 0 1 1 0,-' + 2 * radius;
    var len = Math.PI * 2 * radius;
    var pathStyle = {
      strokeDasharray: len + 'px ' + len + 'px',
      strokeDashoffset: (100 - percent) / 100 * len + 'px',
      transition: 'stroke-dashoffset 0.3s ease 0s, stroke 0.3s ease'
    };

    return _react2["default"].createElement('svg', _extends({
      className: prefixCls + '-circle ' + className,
      viewBox: '0 0 100 100',
      style: style
    }, restProps), _react2["default"].createElement('path', {
      className: prefixCls + '-circle-trail',
      d: pathString,
      stroke: trailColor,
      strokeWidth: trailWidth || strokeWidth,
      fillOpacity: '0'
    }), _react2["default"].createElement('path', {
      className: prefixCls + '-circle-path',
      d: pathString,
      strokeLinecap: strokeLinecap,
      stroke: strokeColor,
      strokeWidth: strokeWidth,
      fillOpacity: '0',
      ref: 'path',
      style: pathStyle
    }));
  }
});
module.exports = exports['default'];
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_extends, '_extends', '/Users/li/augur/dev/augur/node_modules/rc-progress/lib/Circle.js');

  __REACT_HOT_LOADER__.register(_react2, '_react2', '/Users/li/augur/dev/augur/node_modules/rc-progress/lib/Circle.js');

  __REACT_HOT_LOADER__.register(_mixin2, '_mixin2', '/Users/li/augur/dev/augur/node_modules/rc-progress/lib/Circle.js');

  __REACT_HOT_LOADER__.register(_interopRequireDefault, '_interopRequireDefault', '/Users/li/augur/dev/augur/node_modules/rc-progress/lib/Circle.js');

  __REACT_HOT_LOADER__.register(_objectWithoutProperties, '_objectWithoutProperties', '/Users/li/augur/dev/augur/node_modules/rc-progress/lib/Circle.js');
}();

;

/***/ },

/***/ 1217:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _react = __webpack_require__(13);

var _react2 = _interopRequireDefault(_react);

var _mixin = __webpack_require__(1211);

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { "default": obj };
}

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
} /* eslint-disable react/prop-types */

exports["default"] = _react2["default"].createClass({
  displayName: 'Line',

  mixins: [_mixin2["default"]],
  render: function render() {
    var _props = this.props;
    var prefixCls = _props.prefixCls;
    var strokeWidth = _props.strokeWidth;
    var trailWidth = _props.trailWidth;
    var strokeColor = _props.strokeColor;
    var trailColor = _props.trailColor;
    var strokeLinecap = _props.strokeLinecap;
    var percent = _props.percent;
    var style = _props.style;
    var className = _props.className;

    var restProps = _objectWithoutProperties(_props, ['prefixCls', 'strokeWidth', 'trailWidth', 'strokeColor', 'trailColor', 'strokeLinecap', 'percent', 'style', 'className']);

    var pathStyle = {
      strokeDasharray: '100px, 100px',
      strokeDashoffset: 100 - percent + 'px',
      transition: 'stroke-dashoffset 0.3s ease 0s, stroke 0.3s linear'
    };

    var center = strokeWidth / 2;
    var right = 100 - strokeWidth / 2;
    var pathString = 'M ' + center + ',' + center + ' L ' + right + ',' + center;
    var viewBoxString = '0 0 100 ' + strokeWidth;

    return _react2["default"].createElement('svg', _extends({
      className: prefixCls + '-line ' + className,
      viewBox: viewBoxString,
      preserveAspectRatio: 'none',
      style: style
    }, restProps), _react2["default"].createElement('path', {
      className: prefixCls + '-line-trail',
      d: pathString,
      strokeLinecap: strokeLinecap,
      stroke: trailColor,
      strokeWidth: trailWidth || strokeWidth,
      fillOpacity: '0'
    }), _react2["default"].createElement('path', {
      className: prefixCls + '-line-path',
      d: pathString,
      strokeLinecap: strokeLinecap,
      stroke: strokeColor,
      strokeWidth: strokeWidth,
      fillOpacity: '0',
      ref: 'path',
      style: pathStyle
    }));
  }
});
module.exports = exports['default'];
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_extends, '_extends', '/Users/li/augur/dev/augur/node_modules/rc-progress/lib/Line.js');

  __REACT_HOT_LOADER__.register(_react2, '_react2', '/Users/li/augur/dev/augur/node_modules/rc-progress/lib/Line.js');

  __REACT_HOT_LOADER__.register(_mixin2, '_mixin2', '/Users/li/augur/dev/augur/node_modules/rc-progress/lib/Line.js');

  __REACT_HOT_LOADER__.register(_interopRequireDefault, '_interopRequireDefault', '/Users/li/augur/dev/augur/node_modules/rc-progress/lib/Line.js');

  __REACT_HOT_LOADER__.register(_objectWithoutProperties, '_objectWithoutProperties', '/Users/li/augur/dev/augur/node_modules/rc-progress/lib/Line.js');
}();

;

/***/ },

/***/ 1218:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Line = __webpack_require__(1217);

var _Line2 = _interopRequireDefault(_Line);

var _Circle = __webpack_require__(1216);

var _Circle2 = _interopRequireDefault(_Circle);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { "default": obj };
}

exports["default"] = {
  Line: _Line2["default"],
  Circle: _Circle2["default"]
};
module.exports = exports['default'];
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_Line2, '_Line2', '/Users/li/augur/dev/augur/node_modules/rc-progress/lib/index.js');

  __REACT_HOT_LOADER__.register(_Circle2, '_Circle2', '/Users/li/augur/dev/augur/node_modules/rc-progress/lib/index.js');

  __REACT_HOT_LOADER__.register(_interopRequireDefault, '_interopRequireDefault', '/Users/li/augur/dev/augur/node_modules/rc-progress/lib/index.js');
}();

;

/***/ },

/***/ 1227:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_tooltip__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rc_progress__ = __webpack_require__(1218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rc_progress___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rc_progress__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_common_components_bullet__ = __webpack_require__(1228);






var Branch = function Branch(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'article',
		{ className: 'branch-info' },
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_rc_progress__["Line"], {
			percent: p.currentPeriodProgress,
			strokeWidth: '1',
			strokeColor: '#5c2634'
		}),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'span',
			{ className: 'reporting-cycle-info' },
			'Reporting Cycle ',
			p.reportPeriod,
			' ',
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_common_components_bullet__["a" /* default */], null),
			' ',
			Math.round(p.currentPeriodProgress),
			'% complete ',
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_common_components_bullet__["a" /* default */], null),
			' ',
			p.phaseLabel,
			' phase ends ',
			p.phaseTimeRemaining
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
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_common_components_bullet__["a" /* default */], null),
			' ',
			p.periodLength / 3600,
			' hours per cycle'
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			__WEBPACK_IMPORTED_MODULE_1_react_tooltip___default.a,
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
	className: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
	description: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
	id: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
	periodLength: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number,
	phaseLabel: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
	phaseTimeRemaining: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
	currentPeriodProgress: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number
};

var _default = Branch;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(Branch, 'Branch', '/Users/li/augur/dev/augur/src/modules/branch/components/branch.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/branch/components/branch.jsx');
}();

;

/***/ },

/***/ 1228:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


var Bullet = function Bullet() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'span',
    null,
    '\xB7'
  );
};

var _default = Bullet;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Bullet, 'Bullet', '/Users/li/augur/dev/augur/src/modules/common/components/bullet.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/common/components/bullet.jsx');
}();

;

/***/ },

/***/ 1250:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_common_components_dropdown__ = __webpack_require__(1203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_markets_components_markets_search__ = __webpack_require__(1254);





var MarketsFilterSort = function MarketsFilterSort(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'article',
		{ className: 'markets-filter-sort view-header' },
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'view-header-group' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_common_components_dropdown__["a" /* default */], {
				'default': p.selectedFilterSort.type,
				options: p.types,
				onChange: function onChange(type) {
					p.onChange(type, null, null);
				}

			}),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'companion-fields' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_common_components_dropdown__["a" /* default */], {
					className: 'companion-field',
					'default': p.selectedFilterSort.sort,
					options: p.sorts,
					onChange: function onChange(sort) {
						p.onChange(null, sort, null);
					}
				}),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'button',
					{
						className: 'unstyled',
						onClick: function onClick() {
							p.onChange(null, null, !p.selectedFilterSort.isDesc);
						}
					},
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'i',
						null,
						p.selectedFilterSort.isDesc ? '' : ''
					)
				)
			)
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'view-header-group' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_modules_markets_components_markets_search__["a" /* default */], { keywords: p.keywords })
		)
	);
};

// TODO -- Prop Validations
// MarketsFilterSort.propTypes = {
// 	className: PropTypes.string,
// 	selectedFilterSort: PropTypes.object,
// 	sorts: PropTypes.array,
// 	types: PropTypes.array,
// 	order: PropTypes.object,
// 	onChange: PropTypes.func,
// 	keywords: PropTypes.object
// };

var _default = MarketsFilterSort;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(MarketsFilterSort, 'MarketsFilterSort', '/Users/li/augur/dev/augur/src/modules/markets/components/markets-filter-sort.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/markets/components/markets-filter-sort.jsx');
}();

;

/***/ },

/***/ 1251:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_markets_components_markets_filter_sort__ = __webpack_require__(1250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_link_components_link__ = __webpack_require__(513);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





var MarketsHeaders = function MarketsHeaders(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'article',
		null,
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'view-header' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'view-header-group' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'h2',
					null,
					'Markets'
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'view-header-group' },
				p.loginAccount && p.loginAccount.id && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					__WEBPACK_IMPORTED_MODULE_2_modules_link_components_link__["a" /* default */],
					_extends({
						className: 'button imperative navigational',
						disabled: !p.loginAccount.id
					}, p.createMarketLink),
					'+ Create New Market'
				)
			)
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_markets_components_markets_filter_sort__["a" /* default */], _extends({
			keywords: p.keywords
		}, p.filterSort))
	);
};

MarketsHeaders.propTypes = {
	className: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
	createMarketLink: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object,
	loginAccount: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object,
	marketsHeader: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object,
	filterSort: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object,
	keywords: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object
};

var _default = MarketsHeaders;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(MarketsHeaders, 'MarketsHeaders', '/Users/li/augur/dev/augur/src/modules/markets/components/markets-headers.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/markets/components/markets-headers.jsx');
}();

;

/***/ },

/***/ 1252:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_market_components_market_preview__ = __webpack_require__(1206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_markets_components_markets_pagination__ = __webpack_require__(1253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_utils_get_value__ = __webpack_require__(160);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };







var MarketsList = function MarketsList(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'article',
		{ className: 'markets-list' },
		(p.markets || []).map(function (market) {
			var selectedShareDenomination = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_utils_get_value__["a" /* default */])(p, 'scalarShareDenomination.markets.' + market.id);
			var shareDenominations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_utils_get_value__["a" /* default */])(p, 'scalarShareDenomination.denominations');

			return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_market_components_market_preview__["a" /* default */], _extends({
				key: market.id,
				loginAccount: p.loginAccount
			}, market, {
				selectedShareDenomination: selectedShareDenomination,
				shareDenominations: shareDenominations
			}));
		}),
		!!p.pagination && !!p.pagination.numUnpaginated && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_modules_markets_components_markets_pagination__["a" /* default */], { pagination: p.pagination })
	);
};

// TODO -- Prop Validations
// MarketsList.propTypes = {
// 	markets: PropTypes.array,
// 	pagination: PropTypes.object
// };

var _default = MarketsList;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(MarketsList, 'MarketsList', '/Users/li/augur/dev/augur/src/modules/markets/components/markets-list.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/markets/components/markets-list.jsx');
}();

;

/***/ },

/***/ 1253:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_link_components_link__ = __webpack_require__(513);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




var MarketsPagination = function MarketsPagination(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'div',
		{ className: 'markets-pagination' },
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'markets-pagination-group-1' },
			!!p.pagination && !!p.pagination.previousPageNum && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				__WEBPACK_IMPORTED_MODULE_1_modules_link_components_link__["a" /* default */],
				_extends({}, p.pagination.previousPageLink, {
					className: 'button'
				}),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'i',
					null,
					'\uF104'
				)
			)
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'markets-pagination-group-2' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				{ className: 'pagination-count' },
				p.pagination.startItemNum + ' - ' + p.pagination.endItemNum,
				' ',
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'strong',
					null,
					'of'
				),
				' ',
				p.pagination.numUnpaginated
			)
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'markets-pagination-group-3' },
			!!p.pagination && !!p.pagination.nextPageNum && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				__WEBPACK_IMPORTED_MODULE_1_modules_link_components_link__["a" /* default */],
				_extends({}, p.pagination.nextPageLink, {
					className: 'button'
				}),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'i',
					null,
					'\uF105'
				)
			)
		)
	);
};

var _default = MarketsPagination;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(MarketsPagination, 'MarketsPagination', '/Users/li/augur/dev/augur/src/modules/markets/components/markets-pagination.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/markets/components/markets-pagination.jsx');
}();

;

/***/ },

/***/ 1254:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_common_components_input__ = __webpack_require__(1195);



var MarketsSearch = function MarketsSearch(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'article',
		{ className: 'search-input ' + p.className },
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'i',
			null,
			'\uF002'
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_common_components_input__["a" /* default */], {
			placeholder: 'Search Markets',
			isClearable: true,
			value: p.keywords && p.keywords.value,
			onChange: p.keywords && p.keywords.onChangeKeywords
		})
	);
};

MarketsSearch.propTypes = {
	className: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
	keywords: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object
};

var _default = MarketsSearch;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(MarketsSearch, 'MarketsSearch', '/Users/li/augur/dev/augur/src/modules/markets/components/markets-search.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/markets/components/markets-search.jsx');
}();

;

/***/ }

});
//# sourceMappingURL=2.js.map