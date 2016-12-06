webpackJsonp([1],{

/***/ 1192:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_create_market_components_create_market_form__ = __webpack_require__(1250);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




var CreateMarketPage = function CreateMarketPage(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'section',
		{ id: 'create_market_view' },
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'header',
			{ className: 'page-header' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				{ className: 'big-line' },
				'Be the market maker'
			),
			'. Earn fees by making markets for people to trade. The more people ',
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'b',
				null,
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'i',
					null,
					'trade'
				)
			),
			' your markets, the more fees you will ',
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'b',
				null,
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'i',
					null,
					'make'
				)
			),
			'.'
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'page-content' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_create_market_components_create_market_form__["a" /* default */], _extends({
				className: 'create-market-content'
			}, p.createMarketForm, {
				scalarShareDenomination: p.scalarShareDenomination
			}))
		)
	);
};

CreateMarketPage.propTypes = {
	className: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
	createMarketForm: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object
};

var _default = CreateMarketPage;
/* harmony default export */ exports["default"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(CreateMarketPage, 'CreateMarketPage', '/Users/li/augur/dev/augur/src/modules/create-market/components/create-market-view.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/create-market/components/create-market-view.jsx');
}();

;

/***/ },

/***/ 1207:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_utils_should_component_update_pure__ = __webpack_require__(238);
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

/***/ 1208:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_modules_market_constants_share_denominations__ = __webpack_require__(516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_utils_add_commas_to_number__ = __webpack_require__(519);



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

/***/ 1209:
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

/***/ 1210:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_tooltip__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_common_components_value_date__ = __webpack_require__(1209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_common_components_value_denomination__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_utils_get_value__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_utils_set_share_denomination__ = __webpack_require__(1208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_utils_share_denomination_label__ = __webpack_require__(1211);
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

/***/ 1211:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_modules_market_constants_share_denominations__ = __webpack_require__(516);


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

/***/ 1212:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_market_components_market_properties__ = __webpack_require__(1210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_link_components_link__ = __webpack_require__(514);
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

/***/ 1214:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


var CreateMarketFormButtons = function CreateMarketFormButtons(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		"div",
		{ className: "buttons" },
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			"button",
			{
				className: "button prev",
				type: "button",
				onClick: p.onPrev
			},
			p.prevLabel || 'back'
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			"button",
			{
				className: "button next",
				type: "button",
				disabled: p.disabled,
				onClick: !p.disabled && p.onNext
			},
			p.nextLabel || 'Next'
		)
	);
};

CreateMarketFormButtons.propTypes = {
	disabled: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool,
	nextLabel: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
	prevLabel: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
	onPrev: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func,
	onNext: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func
};

var _default = CreateMarketFormButtons;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(CreateMarketFormButtons, "CreateMarketFormButtons", "/Users/li/augur/dev/augur/src/modules/create-market/components/create-market-form-buttons.jsx");

	__REACT_HOT_LOADER__.register(_default, "default", "/Users/li/augur/dev/augur/src/modules/create-market/components/create-market-form-buttons.jsx");
}();

;

/***/ },

/***/ 1217:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_common_components_value_denomination__ = __webpack_require__(515);
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

/***/ 1218:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_market_components_market_basics__ = __webpack_require__(1212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_market_components_market_preview_outcomes__ = __webpack_require__(1217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_link_components_link__ = __webpack_require__(514);
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

/***/ 1222:
/***/ function(module, exports) {

"use strict";
'use strict';

var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function ownEnumerableKeys(obj) {
	var keys = Object.getOwnPropertyNames(obj);

	if (Object.getOwnPropertySymbols) {
		keys = keys.concat(Object.getOwnPropertySymbols(obj));
	}

	return keys.filter(function (key) {
		return propIsEnumerable.call(obj, key);
	});
}

module.exports = Object.assign || function (target, source) {
	var from;
	var keys;
	var to = ToObject(target);

	for (var s = 1; s < arguments.length; s++) {
		from = arguments[s];
		keys = ownEnumerableKeys(Object(from));

		for (var i = 0; i < keys.length; i++) {
			to[keys[i]] = from[keys[i]];
		}
	}

	return to;
};
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(propIsEnumerable, 'propIsEnumerable', '/Users/li/augur/dev/augur/node_modules/object-assign/index.js');

	__REACT_HOT_LOADER__.register(ToObject, 'ToObject', '/Users/li/augur/dev/augur/node_modules/object-assign/index.js');

	__REACT_HOT_LOADER__.register(ownEnumerableKeys, 'ownEnumerableKeys', '/Users/li/augur/dev/augur/node_modules/object-assign/index.js');
}();

;

/***/ },

/***/ 1224:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_common_components_input__ = __webpack_require__(1207);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var InputList = function (_Component) {
	_inherits(InputList, _Component);

	function InputList(props) {
		_classCallCheck(this, InputList);

		var _this = _possibleConstructorReturn(this, (InputList.__proto__ || Object.getPrototypeOf(InputList)).call(this, props));

		_this.handleChange = function () {
			return _this.__handleChange__REACT_HOT_LOADER__.apply(_this, arguments);
		};

		_this.fillMinElements = function () {
			return _this.__fillMinElements__REACT_HOT_LOADER__.apply(_this, arguments);
		};

		_this.handleChange = _this.handleChange.bind(_this);
		_this.fillMinElements = _this.fillMinElements.bind(_this);
		_this.state = {
			list: _this.fillMinElements(_this.props.list, _this.props.listMinElements),
			timeoutID: ''
		};
		return _this;
	}
	// TODO -- Prop Validations


	_createClass(InputList, [{
		key: '__handleChange__REACT_HOT_LOADER__',
		value: function __handleChange__REACT_HOT_LOADER__(i, val) {
			var _this2 = this;

			var newList = (this.state.list || []).slice();
			if ((!val || !val.length) && (!this.props.listMinElements || i >= this.props.listMinElements)) {
				newList.splice(i, 1);
			} else {
				newList[i] = val;
			}

			if (this.state.timeoutID) {
				clearTimeout(this.state.timeoutID);
			}
			this.setState({ timeoutID: setTimeout(function () {
					return _this2.props.onChange(newList);
				}, 750), list: newList });
		}
	}, {
		key: '__fillMinElements__REACT_HOT_LOADER__',
		value: function __fillMinElements__REACT_HOT_LOADER__() {
			var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
			var minElements = arguments[1];

			var len = void 0;
			var i = void 0;
			var newList = list;
			if (minElements && list.length < minElements) {
				newList = newList.slice();
				len = minElements - newList.length;
				for (i = 0; i < len; i++) {
					newList.push('');
				}
			}
			return newList;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var p = this.props;
			var s = this.state;
			var list = s.list;

			if (!p.listMaxElements || list.length < p.listMaxElements) {
				list = list.slice();
				list.push('');
			}

			return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()('input-list', p.className) },
				list.map(function (item, i) {
					return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ key: i, className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()('item', { 'new-item': i === list.length - 1 && (!item || !item.length) }) },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_modules_common_components_input__["a" /* default */], {
							type: 'text',
							maxLength: p.itemMaxLength,
							value: item,
							onChange: function onChange(newValue) {
								return _this3.handleChange(i, newValue);
							}
						}),
						p.errors && p.errors[i] && p.errors[i].length && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'span',
							{ className: 'error-message' },
							p.errors[i]
						)
					);
				})
			);
		}
	}]);

	return InputList;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

InputList.propTypes = {
	// className: PropTypes.string,
	list: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].array,
	// errors: PropTypes.array,
	listMinElements: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number,
	// listMaxElements: PropTypes.number,
	// itemMaxLength: PropTypes.number,
	onChange: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func
};
var _default = InputList;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(InputList, 'InputList', '/Users/li/augur/dev/augur/src/modules/common/components/input-list.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/common/components/input-list.jsx');
}();

;

/***/ },

/***/ 1231:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var assign = __webpack_require__(1222),
    React = __webpack_require__(13),
    DaysView = __webpack_require__(1232),
    MonthsView = __webpack_require__(1233),
    YearsView = __webpack_require__(1235),
    TimeView = __webpack_require__(1234),
    moment = __webpack_require__(0);

var TYPES = React.PropTypes;
var Datetime = React.createClass({
	displayName: 'Datetime',

	mixins: [__webpack_require__(1236)],
	viewComponents: {
		days: DaysView,
		months: MonthsView,
		years: YearsView,
		time: TimeView
	},
	propTypes: {
		// value: TYPES.object | TYPES.string,
		// defaultValue: TYPES.object | TYPES.string,
		onFocus: TYPES.func,
		onBlur: TYPES.func,
		onChange: TYPES.func,
		locale: TYPES.string,
		utc: TYPES.bool,
		input: TYPES.bool,
		// dateFormat: TYPES.string | TYPES.bool,
		// timeFormat: TYPES.string | TYPES.bool,
		inputProps: TYPES.object,
		timeConstraints: TYPES.object,
		viewMode: TYPES.oneOf(['years', 'months', 'days', 'time']),
		isValidDate: TYPES.func,
		open: TYPES.bool,
		strictParsing: TYPES.bool,
		closeOnSelect: TYPES.bool,
		closeOnTab: TYPES.bool
	},

	getDefaultProps: function getDefaultProps() {
		var nof = function nof() {};
		return {
			className: '',
			defaultValue: '',
			inputProps: {},
			input: true,
			onFocus: nof,
			onBlur: nof,
			onChange: nof,
			timeFormat: true,
			timeConstraints: {},
			dateFormat: true,
			strictParsing: true,
			closeOnSelect: false,
			closeOnTab: true,
			utc: false
		};
	},

	getInitialState: function getInitialState() {
		var state = this.getStateFromProps(this.props);

		if (state.open === undefined) state.open = !this.props.input;

		state.currentView = this.props.dateFormat ? this.props.viewMode || state.updateOn || 'days' : 'time';

		return state;
	},

	getStateFromProps: function getStateFromProps(props) {
		var formats = this.getFormats(props),
		    date = props.value || props.defaultValue,
		    selectedDate,
		    viewDate,
		    updateOn,
		    inputValue;

		if (date && typeof date === 'string') selectedDate = this.localMoment(date, formats.datetime);else if (date) selectedDate = this.localMoment(date);

		if (selectedDate && !selectedDate.isValid()) selectedDate = null;

		viewDate = selectedDate ? selectedDate.clone().startOf('month') : this.localMoment().startOf('month');

		updateOn = this.getUpdateOn(formats);

		if (selectedDate) inputValue = selectedDate.format(formats.datetime);else if (date.isValid && !date.isValid()) inputValue = '';else inputValue = date || '';

		return {
			updateOn: updateOn,
			inputFormat: formats.datetime,
			viewDate: viewDate,
			selectedDate: selectedDate,
			inputValue: inputValue,
			open: props.open
		};
	},

	getUpdateOn: function getUpdateOn(formats) {
		if (formats.date.match(/[lLD]/)) {
			return 'days';
		} else if (formats.date.indexOf('M') !== -1) {
			return 'months';
		} else if (formats.date.indexOf('Y') !== -1) {
			return 'years';
		}

		return 'days';
	},

	getFormats: function getFormats(props) {
		var formats = {
			date: props.dateFormat || '',
			time: props.timeFormat || ''
		},
		    locale = this.localMoment(props.date).localeData();

		if (formats.date === true) {
			formats.date = locale.longDateFormat('L');
		} else if (this.getUpdateOn(formats) !== 'days') {
			formats.time = '';
		}

		if (formats.time === true) {
			formats.time = locale.longDateFormat('LT');
		}

		formats.datetime = formats.date && formats.time ? formats.date + ' ' + formats.time : formats.date || formats.time;

		return formats;
	},

	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		var formats = this.getFormats(nextProps),
		    update = {};

		if (nextProps.value !== this.props.value || formats.datetime !== this.getFormats(this.props).datetime) {
			update = this.getStateFromProps(nextProps);
		}

		if (update.open === undefined) {
			if (this.props.closeOnSelect && this.state.currentView !== 'time') {
				update.open = false;
			} else {
				update.open = this.state.open;
			}
		}

		this.setState(update);
	},

	onInputChange: function onInputChange(e) {
		var value = e.target === null ? e : e.target.value,
		    localMoment = this.localMoment(value, this.state.inputFormat),
		    update = { inputValue: value };

		if (localMoment.isValid() && !this.props.value) {
			update.selectedDate = localMoment;
			update.viewDate = localMoment.clone().startOf('month');
		} else {
			update.selectedDate = null;
		}

		return this.setState(update, function () {
			return this.props.onChange(localMoment.isValid() ? localMoment : this.state.inputValue);
		});
	},

	onInputKey: function onInputKey(e) {
		if (e.which === 9 && this.props.closeOnTab) {
			this.closeCalendar();
		}
	},

	showView: function showView(view) {
		var me = this;
		return function () {
			me.setState({ currentView: view });
		};
	},

	setDate: function setDate(type) {
		var me = this,
		    nextViews = {
			month: 'days',
			year: 'months'
		};
		return function (e) {
			me.setState({
				viewDate: me.state.viewDate.clone()[type](parseInt(e.target.getAttribute('data-value'), 10)).startOf(type),
				currentView: nextViews[type]
			});
		};
	},

	addTime: function addTime(amount, type, toSelected) {
		return this.updateTime('add', amount, type, toSelected);
	},

	subtractTime: function subtractTime(amount, type, toSelected) {
		return this.updateTime('subtract', amount, type, toSelected);
	},

	updateTime: function updateTime(op, amount, type, toSelected) {
		var me = this;

		return function () {
			var update = {},
			    date = toSelected ? 'selectedDate' : 'viewDate';

			update[date] = me.state[date].clone()[op](amount, type);

			me.setState(update);
		};
	},

	allowedSetTime: ['hours', 'minutes', 'seconds', 'milliseconds'],
	setTime: function setTime(type, value) {
		var index = this.allowedSetTime.indexOf(type) + 1,
		    state = this.state,
		    date = (state.selectedDate || state.viewDate).clone(),
		    nextType;

		// It is needed to set all the time properties
		// to not to reset the time
		date[type](value);
		for (; index < this.allowedSetTime.length; index++) {
			nextType = this.allowedSetTime[index];
			date[nextType](date[nextType]());
		}

		if (!this.props.value) {
			this.setState({
				selectedDate: date,
				inputValue: date.format(state.inputFormat)
			});
		}
		this.props.onChange(date);
	},

	updateSelectedDate: function updateSelectedDate(e, close) {
		var target = e.target,
		    modifier = 0,
		    viewDate = this.state.viewDate,
		    currentDate = this.state.selectedDate || viewDate,
		    date;

		if (target.className.indexOf('rdtDay') !== -1) {
			if (target.className.indexOf('rdtNew') !== -1) modifier = 1;else if (target.className.indexOf('rdtOld') !== -1) modifier = -1;

			date = viewDate.clone().month(viewDate.month() + modifier).date(parseInt(target.getAttribute('data-value'), 10));
		} else if (target.className.indexOf('rdtMonth') !== -1) {
			date = viewDate.clone().month(parseInt(target.getAttribute('data-value'), 10)).date(currentDate.date());
		} else if (target.className.indexOf('rdtYear') !== -1) {
			date = viewDate.clone().month(currentDate.month()).date(currentDate.date()).year(parseInt(target.getAttribute('data-value'), 10));
		}

		date.hours(currentDate.hours()).minutes(currentDate.minutes()).seconds(currentDate.seconds()).milliseconds(currentDate.milliseconds());

		if (!this.props.value) {
			this.setState({
				selectedDate: date,
				viewDate: date.clone().startOf('month'),
				inputValue: date.format(this.state.inputFormat),
				open: !(this.props.closeOnSelect && close)
			});
		} else {
			if (this.props.closeOnSelect && close) {
				this.closeCalendar();
			}
		}

		this.props.onChange(date);
	},

	openCalendar: function openCalendar() {
		if (!this.state.open) {
			this.setState({ open: true }, function () {
				this.props.onFocus();
			});
		}
	},

	closeCalendar: function closeCalendar() {
		this.setState({ open: false }, function () {
			this.props.onBlur(this.state.selectedDate || this.state.inputValue);
		});
	},

	handleClickOutside: function handleClickOutside() {
		if (this.props.input && this.state.open && !this.props.open) {
			this.setState({ open: false }, function () {
				this.props.onBlur(this.state.selectedDate || this.state.inputValue);
			});
		}
	},

	localMoment: function localMoment(date, format) {
		var momentFn = this.props.utc ? moment.utc : moment;
		var m = momentFn(date, format, this.props.strictParsing);
		if (this.props.locale) m.locale(this.props.locale);
		return m;
	},

	componentProps: {
		fromProps: ['value', 'isValidDate', 'renderDay', 'renderMonth', 'renderYear', 'timeConstraints'],
		fromState: ['viewDate', 'selectedDate', 'updateOn'],
		fromThis: ['setDate', 'setTime', 'showView', 'addTime', 'subtractTime', 'updateSelectedDate', 'localMoment']
	},

	getComponentProps: function getComponentProps() {
		var me = this,
		    formats = this.getFormats(this.props),
		    props = { dateFormat: formats.date, timeFormat: formats.time };

		this.componentProps.fromProps.forEach(function (name) {
			props[name] = me.props[name];
		});
		this.componentProps.fromState.forEach(function (name) {
			props[name] = me.state[name];
		});
		this.componentProps.fromThis.forEach(function (name) {
			props[name] = me[name];
		});

		return props;
	},

	render: function render() {
		var Component = this.viewComponents[this.state.currentView],
		    DOM = React.DOM,
		    className = 'rdt' + (this.props.className ? Array.isArray(this.props.className) ? ' ' + this.props.className.join(' ') : ' ' + this.props.className : ''),
		    children = [];

		if (this.props.input) {
			children = [DOM.input(assign({
				key: 'i',
				type: 'text',
				className: 'form-control',
				onFocus: this.openCalendar,
				onChange: this.onInputChange,
				onKeyDown: this.onInputKey,
				value: this.state.inputValue
			}, this.props.inputProps))];
		} else {
			className += ' rdtStatic';
		}

		if (this.state.open) className += ' rdtOpen';

		return DOM.div({ className: className }, children.concat(DOM.div({ key: 'dt', className: 'rdtPicker' }, React.createElement(Component, this.getComponentProps()))));
	}
});

// Make moment accessible through the Datetime class
Datetime.moment = moment;

module.exports = Datetime;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(TYPES, 'TYPES', '/Users/li/augur/dev/augur/node_modules/react-datetime/DateTime.js');

	__REACT_HOT_LOADER__.register(Datetime, 'Datetime', '/Users/li/augur/dev/augur/node_modules/react-datetime/DateTime.js');
}();

;

/***/ },

/***/ 1232:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var React = __webpack_require__(13),
    moment = __webpack_require__(0);

var DOM = React.DOM;
var DateTimePickerDays = React.createClass({
	displayName: 'DateTimePickerDays',


	render: function render() {
		var footer = this.renderFooter(),
		    date = this.props.viewDate,
		    locale = date.localeData(),
		    tableChildren;

		tableChildren = [DOM.thead({ key: 'th' }, [DOM.tr({ key: 'h' }, [DOM.th({ key: 'p', className: 'rdtPrev' }, DOM.span({ onClick: this.props.subtractTime(1, 'months') }, '‹')), DOM.th({ key: 's', className: 'rdtSwitch', onClick: this.props.showView('months'), colSpan: 5, 'data-value': this.props.viewDate.month() }, locale.months(date) + ' ' + date.year()), DOM.th({ key: 'n', className: 'rdtNext' }, DOM.span({ onClick: this.props.addTime(1, 'months') }, '›'))]), DOM.tr({ key: 'd' }, this.getDaysOfWeek(locale).map(function (day, index) {
			return DOM.th({ key: day + index, className: 'dow' }, day);
		}))]), DOM.tbody({ key: 'tb' }, this.renderDays())];

		if (footer) tableChildren.push(footer);

		return DOM.div({ className: 'rdtDays' }, DOM.table({}, tableChildren));
	},

	/**
  * Get a list of the days of the week
  * depending on the current locale
  * @return {array} A list with the shortname of the days
  */
	getDaysOfWeek: function getDaysOfWeek(locale) {
		var days = locale._weekdaysMin,
		    first = locale.firstDayOfWeek(),
		    dow = [],
		    i = 0;

		days.forEach(function (day) {
			dow[(7 + i++ - first) % 7] = day;
		});

		return dow;
	},

	renderDays: function renderDays() {
		var date = this.props.viewDate,
		    selected = this.props.selectedDate && this.props.selectedDate.clone(),
		    prevMonth = date.clone().subtract(1, 'months'),
		    currentYear = date.year(),
		    currentMonth = date.month(),
		    weeks = [],
		    days = [],
		    renderer = this.props.renderDay || this.renderDay,
		    isValid = this.props.isValidDate || this.isValidDate,
		    classes,
		    disabled,
		    dayProps,
		    currentDate;

		// Go to the last week of the previous month
		prevMonth.date(prevMonth.daysInMonth()).startOf('week');
		var lastDay = prevMonth.clone().add(42, 'd');

		while (prevMonth.isBefore(lastDay)) {
			classes = 'rdtDay';
			currentDate = prevMonth.clone();

			if (prevMonth.year() === currentYear && prevMonth.month() < currentMonth || prevMonth.year() < currentYear) classes += ' rdtOld';else if (prevMonth.year() === currentYear && prevMonth.month() > currentMonth || prevMonth.year() > currentYear) classes += ' rdtNew';

			if (selected && prevMonth.isSame(selected, 'day')) classes += ' rdtActive';

			if (prevMonth.isSame(moment(), 'day')) classes += ' rdtToday';

			disabled = !isValid(currentDate, selected);
			if (disabled) classes += ' rdtDisabled';

			dayProps = {
				key: prevMonth.format('M_D'),
				'data-value': prevMonth.date(),
				className: classes
			};
			if (!disabled) dayProps.onClick = this.updateSelectedDate;

			days.push(renderer(dayProps, currentDate, selected));

			if (days.length === 7) {
				weeks.push(DOM.tr({ key: prevMonth.format('M_D') }, days));
				days = [];
			}

			prevMonth.add(1, 'd');
		}

		return weeks;
	},

	updateSelectedDate: function updateSelectedDate(event) {
		this.props.updateSelectedDate(event, true);
	},

	renderDay: function renderDay(props, currentDate) {
		return DOM.td(props, currentDate.date());
	},

	renderFooter: function renderFooter() {
		if (!this.props.timeFormat) return '';

		var date = this.props.selectedDate || this.props.viewDate;

		return DOM.tfoot({ key: 'tf' }, DOM.tr({}, DOM.td({ onClick: this.props.showView('time'), colSpan: 7, className: 'rdtTimeToggle' }, date.format(this.props.timeFormat))));
	},
	isValidDate: function isValidDate() {
		return 1;
	}
});

module.exports = DateTimePickerDays;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(DOM, 'DOM', '/Users/li/augur/dev/augur/node_modules/react-datetime/src/DaysView.js');

	__REACT_HOT_LOADER__.register(DateTimePickerDays, 'DateTimePickerDays', '/Users/li/augur/dev/augur/node_modules/react-datetime/src/DaysView.js');
}();

;

/***/ },

/***/ 1233:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var React = __webpack_require__(13);

var DOM = React.DOM;
var DateTimePickerMonths = React.createClass({
	displayName: 'DateTimePickerMonths',

	render: function render() {
		return DOM.div({ className: 'rdtMonths' }, [DOM.table({ key: 'a' }, DOM.thead({}, DOM.tr({}, [DOM.th({ key: 'prev', className: 'rdtPrev' }, DOM.span({ onClick: this.props.subtractTime(1, 'years') }, '‹')), DOM.th({ key: 'year', className: 'rdtSwitch', onClick: this.props.showView('years'), colSpan: 2, 'data-value': this.props.viewDate.year() }, this.props.viewDate.year()), DOM.th({ key: 'next', className: 'rdtNext' }, DOM.span({ onClick: this.props.addTime(1, 'years') }, '›'))]))), DOM.table({ key: 'months' }, DOM.tbody({ key: 'b' }, this.renderMonths()))]);
	},

	renderMonths: function renderMonths() {
		var date = this.props.selectedDate,
		    month = this.props.viewDate.month(),
		    year = this.props.viewDate.year(),
		    rows = [],
		    i = 0,
		    months = [],
		    renderer = this.props.renderMonth || this.renderMonth,
		    isValid = this.props.isValidDate || this.isValidDate,
		    classes,
		    props;

		var currentMonth,
		    disabled,

		// Date is irrelevant because we're really only interested in month
		irrelevantDate = 1;
		while (i < 12) {
			classes = 'rdtMonth';
			currentMonth = this.props.viewDate.clone().set({ year: year, month: i, date: irrelevantDate });
			disabled = !isValid(currentMonth);

			if (disabled) classes += ' rdtDisabled';

			if (date && i === month && year === date.year()) classes += ' rdtActive';

			props = {
				key: i,
				'data-value': i,
				className: classes
			};

			if (!disabled) props.onClick = this.props.updateOn === 'months' ? this.updateSelectedMonth : this.props.setDate('month');

			months.push(renderer(props, i, year, date && date.clone()));

			if (months.length === 4) {
				rows.push(DOM.tr({ key: month + '_' + rows.length }, months));
				months = [];
			}

			i++;
		}

		return rows;
	},

	updateSelectedMonth: function updateSelectedMonth(event) {
		this.props.updateSelectedDate(event, true);
	},

	renderMonth: function renderMonth(props, month) {
		var localMoment = this.props.viewDate;
		var monthStr = localMoment.localeData().monthsShort(localMoment.month(month));
		var strLength = 3;
		// Because some months are up to 5 characters long, we want to
		// use a fixed string length for consistency
		var monthStrFixedLength = monthStr.substring(0, strLength);
		return DOM.td(props, capitalize(monthStrFixedLength));
	},

	isValidDate: function isValidDate() {
		return 1;
	}
});

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = DateTimePickerMonths;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(DOM, 'DOM', '/Users/li/augur/dev/augur/node_modules/react-datetime/src/MonthsView.js');

	__REACT_HOT_LOADER__.register(DateTimePickerMonths, 'DateTimePickerMonths', '/Users/li/augur/dev/augur/node_modules/react-datetime/src/MonthsView.js');

	__REACT_HOT_LOADER__.register(capitalize, 'capitalize', '/Users/li/augur/dev/augur/node_modules/react-datetime/src/MonthsView.js');
}();

;

/***/ },

/***/ 1234:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var React = __webpack_require__(13),
    assign = __webpack_require__(1222);

var DOM = React.DOM;
var DateTimePickerTime = React.createClass({
	displayName: 'DateTimePickerTime',

	getInitialState: function getInitialState() {
		return this.calculateState(this.props);
	},
	calculateState: function calculateState(props) {
		var date = props.selectedDate || props.viewDate,
		    format = props.timeFormat,
		    counters = [];

		if (format.indexOf('H') !== -1 || format.indexOf('h') !== -1) {
			counters.push('hours');
			if (format.indexOf('m') !== -1) {
				counters.push('minutes');
				if (format.indexOf('s') !== -1) {
					counters.push('seconds');
				}
			}
		}

		var daypart = false;
		if (this.props.timeFormat.indexOf(' A') !== -1 && this.state !== null) {
			daypart = this.state.hours >= 12 ? 'PM' : 'AM';
		}

		return {
			hours: date.format('H'),
			minutes: date.format('mm'),
			seconds: date.format('ss'),
			milliseconds: date.format('SSS'),
			daypart: daypart,
			counters: counters
		};
	},
	renderCounter: function renderCounter(type) {
		if (type !== 'daypart') {
			var value = this.state[type];
			if (type === 'hours' && this.props.timeFormat.indexOf(' A') !== -1) {
				value = (value - 1) % 12 + 1;

				if (value === 0) {
					value = 12;
				}
			}
			return DOM.div({ key: type, className: 'rdtCounter' }, [DOM.span({ key: 'up', className: 'rdtBtn', onMouseDown: this.onStartClicking('increase', type) }, '▲'), DOM.div({ key: 'c', className: 'rdtCount' }, value), DOM.span({ key: 'do', className: 'rdtBtn', onMouseDown: this.onStartClicking('decrease', type) }, '▼')]);
		}
		return '';
	},
	renderDayPart: function renderDayPart() {
		return DOM.div({ className: 'rdtCounter', key: 'dayPart' }, [DOM.span({ key: 'up', className: 'rdtBtn', onMouseDown: this.onStartClicking('toggleDayPart', 'hours') }, '▲'), DOM.div({ key: this.state.daypart, className: 'rdtCount' }, this.state.daypart), DOM.span({ key: 'do', className: 'rdtBtn', onMouseDown: this.onStartClicking('toggleDayPart', 'hours') }, '▼')]);
	},
	render: function render() {
		var me = this,
		    counters = [];

		this.state.counters.forEach(function (c) {
			if (counters.length) counters.push(DOM.div({ key: 'sep' + counters.length, className: 'rdtCounterSeparator' }, ':'));
			counters.push(me.renderCounter(c));
		});

		if (this.state.daypart !== false) {
			counters.push(me.renderDayPart());
		}

		if (this.state.counters.length === 3 && this.props.timeFormat.indexOf('S') !== -1) {
			counters.push(DOM.div({ className: 'rdtCounterSeparator', key: 'sep5' }, ':'));
			counters.push(DOM.div({ className: 'rdtCounter rdtMilli', key: 'm' }, DOM.input({ value: this.state.milliseconds, type: 'text', onChange: this.updateMilli })));
		}

		return DOM.div({ className: 'rdtTime' }, DOM.table({}, [this.renderHeader(), DOM.tbody({ key: 'b' }, DOM.tr({}, DOM.td({}, DOM.div({ className: 'rdtCounters' }, counters))))]));
	},
	componentWillMount: function componentWillMount() {
		var me = this;
		me.timeConstraints = {
			hours: {
				min: 0,
				max: 23,
				step: 1
			},
			minutes: {
				min: 0,
				max: 59,
				step: 1
			},
			seconds: {
				min: 0,
				max: 59,
				step: 1
			},
			milliseconds: {
				min: 0,
				max: 999,
				step: 1
			}
		};
		['hours', 'minutes', 'seconds', 'milliseconds'].forEach(function (type) {
			assign(me.timeConstraints[type], me.props.timeConstraints[type]);
		});
		this.setState(this.calculateState(this.props));
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		this.setState(this.calculateState(nextProps));
	},
	updateMilli: function updateMilli(e) {
		var milli = parseInt(e.target.value, 10);
		if (milli === e.target.value && milli >= 0 && milli < 1000) {
			this.props.setTime('milliseconds', milli);
			this.setState({ milliseconds: milli });
		}
	},
	renderHeader: function renderHeader() {
		if (!this.props.dateFormat) return null;

		var date = this.props.selectedDate || this.props.viewDate;
		return DOM.thead({ key: 'h' }, DOM.tr({}, DOM.th({ className: 'rdtSwitch', colSpan: 4, onClick: this.props.showView('days') }, date.format(this.props.dateFormat))));
	},
	onStartClicking: function onStartClicking(action, type) {
		var me = this;

		return function () {
			var update = {};
			update[type] = me[action](type);
			me.setState(update);

			me.timer = setTimeout(function () {
				me.increaseTimer = setInterval(function () {
					update[type] = me[action](type);
					me.setState(update);
				}, 70);
			}, 500);

			me.mouseUpListener = function () {
				clearTimeout(me.timer);
				clearInterval(me.increaseTimer);
				me.props.setTime(type, me.state[type]);
				document.body.removeEventListener('mouseup', me.mouseUpListener);
			};

			document.body.addEventListener('mouseup', me.mouseUpListener);
		};
	},
	padValues: {
		hours: 1,
		minutes: 2,
		seconds: 2,
		milliseconds: 3
	},
	toggleDayPart: function toggleDayPart(type) {
		// type is always 'hours'
		var value = parseInt(this.state[type], 10) + 12;
		if (value > this.timeConstraints[type].max) value = this.timeConstraints[type].min + (value - (this.timeConstraints[type].max + 1));
		return this.pad(type, value);
	},
	increase: function increase(type) {
		var value = parseInt(this.state[type], 10) + this.timeConstraints[type].step;
		if (value > this.timeConstraints[type].max) value = this.timeConstraints[type].min + (value - (this.timeConstraints[type].max + 1));
		return this.pad(type, value);
	},
	decrease: function decrease(type) {
		var value = parseInt(this.state[type], 10) - this.timeConstraints[type].step;
		if (value < this.timeConstraints[type].min) value = this.timeConstraints[type].max + 1 - (this.timeConstraints[type].min - value);
		return this.pad(type, value);
	},
	pad: function pad(type, value) {
		var str = value + '';
		while (str.length < this.padValues[type]) {
			str = '0' + str;
		}return str;
	}
});

module.exports = DateTimePickerTime;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(DOM, 'DOM', '/Users/li/augur/dev/augur/node_modules/react-datetime/src/TimeView.js');

	__REACT_HOT_LOADER__.register(DateTimePickerTime, 'DateTimePickerTime', '/Users/li/augur/dev/augur/node_modules/react-datetime/src/TimeView.js');
}();

;

/***/ },

/***/ 1235:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var React = __webpack_require__(13);

var DOM = React.DOM;
var DateTimePickerYears = React.createClass({
	displayName: 'DateTimePickerYears',

	render: function render() {
		var year = parseInt(this.props.viewDate.year() / 10, 10) * 10;

		return DOM.div({ className: 'rdtYears' }, [DOM.table({ key: 'a' }, DOM.thead({}, DOM.tr({}, [DOM.th({ key: 'prev', className: 'rdtPrev' }, DOM.span({ onClick: this.props.subtractTime(10, 'years') }, '‹')), DOM.th({ key: 'year', className: 'rdtSwitch', onClick: this.props.showView('years'), colSpan: 2 }, year + '-' + (year + 9)), DOM.th({ key: 'next', className: 'rdtNext' }, DOM.span({ onClick: this.props.addTime(10, 'years') }, '›'))]))), DOM.table({ key: 'years' }, DOM.tbody({}, this.renderYears(year)))]);
	},

	renderYears: function renderYears(year) {
		var years = [],
		    i = -1,
		    rows = [],
		    renderer = this.props.renderYear || this.renderYear,
		    selectedDate = this.props.selectedDate,
		    isValid = this.props.isValidDate || this.isValidDate,
		    classes,
		    props;

		year--;
		var currentYear,
		    disabled,

		// Month and date are irrelevant here because
		// we're only really interested in the year
		irrelevantMonth = 1,
		    irrelevantDate = 1;
		while (i < 11) {
			classes = 'rdtYear';
			currentYear = this.props.viewDate.clone().set({ year: year, month: irrelevantMonth, date: irrelevantDate });
			if (i === -1 | i === 10) classes += ' rdtOld';

			disabled = !isValid(currentYear);
			if (disabled) classes += ' rdtDisabled';

			if (selectedDate && selectedDate.year() === year) classes += ' rdtActive';

			props = {
				key: year,
				'data-value': year,
				className: classes
			};

			if (!disabled) props.onClick = this.props.updateOn === 'years' ? this.updateSelectedYear : this.props.setDate('year');

			years.push(renderer(props, year, selectedDate && selectedDate.clone()));

			if (years.length === 4) {
				rows.push(DOM.tr({ key: i }, years));
				years = [];
			}

			year++;
			i++;
		}

		return rows;
	},

	updateSelectedYear: function updateSelectedYear(event) {
		this.props.updateSelectedDate(event, true);
	},

	renderYear: function renderYear(props, year) {
		return DOM.td(props, year);
	},

	isValidDate: function isValidDate() {
		return 1;
	}
});

module.exports = DateTimePickerYears;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(DOM, 'DOM', '/Users/li/augur/dev/augur/node_modules/react-datetime/src/YearsView.js');

	__REACT_HOT_LOADER__.register(DateTimePickerYears, 'DateTimePickerYears', '/Users/li/augur/dev/augur/node_modules/react-datetime/src/YearsView.js');
}();

;

/***/ },

/***/ 1236:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

// This is extracted from https://github.com/Pomax/react-onclickoutside
// And modified to support react 0.13 and react 0.14

var React = __webpack_require__(13),
    version = React.version && React.version.split('.');

if (version && (version[0] > 0 || version[1] > 13)) React = __webpack_require__(101);

// Use a parallel array because we can't use
// objects as keys, they get toString-coerced
var registeredComponents = [];
var handlers = [];

var IGNORE_CLASS = 'ignore-react-onclickoutside';

var isSourceFound = function isSourceFound(source, localNode) {
  if (source === localNode) {
    return true;
  }
  // SVG <use/> elements do not technically reside in the rendered DOM, so
  // they do not have classList directly, but they offer a link to their
  // corresponding element, which can have classList. This extra check is for
  // that case.
  // See: http://www.w3.org/TR/SVG11/struct.html#InterfaceSVGUseElement
  // Discussion: https://github.com/Pomax/react-onclickoutside/pull/17
  if (source.correspondingElement) {
    return source.correspondingElement.classList.contains(IGNORE_CLASS);
  }
  return source.classList.contains(IGNORE_CLASS);
};

module.exports = {
  componentDidMount: function componentDidMount() {
    if (typeof this.handleClickOutside !== 'function') throw new Error('Component lacks a handleClickOutside(event) function for processing outside click events.');

    var fn = this.__outsideClickHandler = function (localNode, eventHandler) {
      return function (evt) {
        evt.stopPropagation();
        var source = evt.target;
        var found = false;
        // If source=local then this event came from "somewhere"
        // inside and should be ignored. We could handle this with
        // a layered approach, too, but that requires going back to
        // thinking in terms of Dom node nesting, running counter
        // to React's "you shouldn't care about the DOM" philosophy.
        while (source.parentNode) {
          found = isSourceFound(source, localNode);
          if (found) return;
          source = source.parentNode;
        }
        eventHandler(evt);
      };
    }(React.findDOMNode(this), this.handleClickOutside);

    var pos = registeredComponents.length;
    registeredComponents.push(this);
    handlers[pos] = fn;

    // If there is a truthy disableOnClickOutside property for this
    // component, don't immediately start listening for outside events.
    if (!this.props.disableOnClickOutside) {
      this.enableOnClickOutside();
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this.disableOnClickOutside();
    this.__outsideClickHandler = false;
    var pos = registeredComponents.indexOf(this);
    if (pos > -1) {
      if (handlers[pos]) {
        // clean up so we don't leak memory
        handlers.splice(pos, 1);
        registeredComponents.splice(pos, 1);
      }
    }
  },

  /**
   * Can be called to explicitly enable event listening
   * for clicks and touches outside of this element.
   */
  enableOnClickOutside: function enableOnClickOutside() {
    var fn = this.__outsideClickHandler;
    document.addEventListener('mousedown', fn);
    document.addEventListener('touchstart', fn);
  },

  /**
   * Can be called to explicitly disable event listening
   * for clicks and touches outside of this element.
   */
  disableOnClickOutside: function disableOnClickOutside() {
    var fn = this.__outsideClickHandler;
    document.removeEventListener('mousedown', fn);
    document.removeEventListener('touchstart', fn);
  }
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(version, 'version', '/Users/li/augur/dev/augur/node_modules/react-datetime/src/onClickOutside.js');

  __REACT_HOT_LOADER__.register(registeredComponents, 'registeredComponents', '/Users/li/augur/dev/augur/node_modules/react-datetime/src/onClickOutside.js');

  __REACT_HOT_LOADER__.register(handlers, 'handlers', '/Users/li/augur/dev/augur/node_modules/react-datetime/src/onClickOutside.js');

  __REACT_HOT_LOADER__.register(IGNORE_CLASS, 'IGNORE_CLASS', '/Users/li/augur/dev/augur/node_modules/react-datetime/src/onClickOutside.js');

  __REACT_HOT_LOADER__.register(isSourceFound, 'isSourceFound', '/Users/li/augur/dev/augur/node_modules/react-datetime/src/onClickOutside.js');
}();

;

/***/ },

/***/ 1241:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_datetime__ = __webpack_require__(1231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_datetime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_datetime__);



var DatePicker = function DatePicker(p) {
	var yesterday = __WEBPACK_IMPORTED_MODULE_1_react_datetime___default.a.moment().subtract(1, 'day');
	var valid = function valid(current) {
		return current.isAfter(yesterday);
	};
	var defaultValue = p.endDate ? p.endDate : null;

	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_datetime___default.a, {
		isValidDate: valid,
		dateFormat: 'YYYY/MM/DD',
		timeFormat: 'hh:mm:ss a',
		defaultValue: defaultValue,
		onChange: function onChange(date) {
			return p.onValuesUpdated({ endDate: new Date(date) });
		},
		open: true,
		inputProps: { placeholder: 'YYYY/MM/DD hh:mm:ss a' }
	});
};

// TODO -- Prop Validations
// DatePicker.propTypes = {
// 	onValuesUpdated: PropTypes.func,
// 	endDate: PropTypes.object
// };

var _default = DatePicker;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(DatePicker, 'DatePicker', '/Users/li/augur/dev/augur/src/modules/common/components/datepicker.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/common/components/datepicker.jsx');
}();

;

/***/ },

/***/ 1243:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_markets_constants_market_types__ = __webpack_require__(23);



var CreateMarketForm1 = function CreateMarketForm1(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'div',
		{ className: 'step-1' },
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'h1',
			null,
			'Select the type of market you want to create'
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('hr', null),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'market-types' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'market-type binary' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'h4',
					null,
					'A market with a YES or NO outcome'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'button',
					{ className: 'button select', onClick: function onClick() {
							return p.onValuesUpdated({ type: __WEBPACK_IMPORTED_MODULE_1_modules_markets_constants_market_types__["c" /* BINARY */], step: 2 });
						} },
					'Yes / No'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'p',
					null,
					'Ask a question that has a simple YES or NO answer'
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('hr', null),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'market-type categorical' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'h4',
					null,
					'A market with a MULTIPLE CHOICE outcome'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'button',
					{ className: 'button select', onClick: function onClick() {
							return p.onValuesUpdated({ type: __WEBPACK_IMPORTED_MODULE_1_modules_markets_constants_market_types__["a" /* CATEGORICAL */], step: 2 });
						} },
					'Multiple Choice'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'p',
					null,
					'Ask a question and provide a set of multiple choice answers'
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('hr', null),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'market-type scalar' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'h4',
					null,
					'A market with a NUMERIC outcome'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'button',
					{ className: 'button select', onClick: function onClick() {
							return p.onValuesUpdated({ type: __WEBPACK_IMPORTED_MODULE_1_modules_markets_constants_market_types__["b" /* SCALAR */], step: 2 });
						} },
					'Numeric'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'p',
					null,
					'Ask a question that has an answer within a range of numbers'
				)
			)
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('hr', null),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'important-message' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'h4',
				null,
				'Important:'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'p',
				null,
				'There is a 30.00 ETH bond charged to your account when you create a new market. If the outcome of your market cannot be determined (and the market cannot be expired as a result) or if your market is ruled unethical, this bond will be forfeited. If your market is expired the bond will be returned to you in full.'
			)
		)
	);
};

// TODO -- Prop Validations
// CreateMarketForm1.propTypes = {
// 	onValuesUpdated: PropTypes.func
// };

var _default = CreateMarketForm1;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(CreateMarketForm1, 'CreateMarketForm1', '/Users/li/augur/dev/augur/src/modules/create-market/components/create-market-form-1.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/create-market/components/create-market-form-1.jsx');
}();

;

/***/ },

/***/ 1244:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_common_components_input_list__ = __webpack_require__(1224);



var CreateMarketForm2Categorical = function CreateMarketForm2Categorical(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'div',
		{ className: 'categorical' },
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'h4',
			null,
			'What are the possible answers to your question? (required)'
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'p',
			null,
			'All possible outcomes to your question must be covered by these answers. You can add an\n\t\t\t"any other outcome" type answer at the end to ensure everything is covered.'
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_common_components_input_list__["a" /* default */], {
			className: 'categorical-list',
			list: p.categoricalOutcomes,
			errors: p.errors && p.errors.categoricalOutcomes || [],
			listMinElements: p.categoricalOutcomesMinNum,
			listMaxElements: p.categoricalOutcomesMaxNum,
			itemMaxLength: p.categoricalOutcomeMaxLength,
			onChange: function onChange(newOutcomes) {
				return p.onValuesUpdated({ categoricalOutcomes: newOutcomes });
			}
		})
	);
};

// TOOD -- Prop Validations
// CreateMarketForm2Categorical.propTypes = {
// 	categoricalOutcomes: PropTypes.array,
// 	errors: PropTypes.object,
// 	categoricalOutcomesMinNum: PropTypes.number,
// 	categoricalOutcomesMaxNum: PropTypes.number,
// 	categoricalOutcomeMaxLength: PropTypes.number,
// 	onValuesUpdated: PropTypes.func
// };

var _default = CreateMarketForm2Categorical;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(CreateMarketForm2Categorical, 'CreateMarketForm2Categorical', '/Users/li/augur/dev/augur/src/modules/create-market/components/create-market-form-2-categorical.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/create-market/components/create-market-form-2-categorical.jsx');
}();

;

/***/ },

/***/ 1245:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_common_components_input__ = __webpack_require__(1207);



var CreateMarketForm2Scalar = function CreateMarketForm2Scalar(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'div',
		{ className: 'scalar' },
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'h4',
			null,
			'What are the minimum and maximum values allowed when answering?'
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'p',
			null,
			'The answer to your question must be a number that falls between the minimum and maximum values you\'re about to set.'
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'scalar-num min' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'label',
				{
					htmlFor: 'minimum-answer'
				},
				'Minimum'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_common_components_input__["a" /* default */], {
				type: 'text',
				name: 'minimum-answer',
				value: p.scalarSmallNum,
				placeholder: 'Minimum answer',
				maxLength: 6,
				onChange: function onChange(value) {
					return p.onValuesUpdated({ scalarSmallNum: value });
				}
			}),
			p.errors.scalarSmallNum && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				{ className: 'error-message' },
				p.errors.scalarSmallNum
			)
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'scalar-num min' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'label',
				{
					htmlFor: 'maximum-answer'
				},
				'Maximum'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_common_components_input__["a" /* default */], {
				type: 'text',
				name: 'maximum-answer',
				value: p.scalarBigNum,
				placeholder: 'Maximum answer',
				maxLength: 6,
				onChange: function onChange(value) {
					return p.onValuesUpdated({ scalarBigNum: value });
				}
			}),
			p.errors.scalarBigNum && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				{ className: 'error-message' },
				p.errors.scalarBigNum
			)
		)
	);
};

// TOOD -- Prop Validations
// CreateMarketForm2Scalar.propTypes = {
// 	scalarSmallNum: PropTypes.string,
// 	scalarBigNum: PropTypes.string,
// 	onValuesUpdated: PropTypes.func
// };

var _default = CreateMarketForm2Scalar;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(CreateMarketForm2Scalar, 'CreateMarketForm2Scalar', '/Users/li/augur/dev/augur/src/modules/create-market/components/create-market-form-2-scalar.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/create-market/components/create-market-form-2-scalar.jsx');
}();

;

/***/ },

/***/ 1246:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_markets_constants_market_types__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_create_market_components_create_market_form_2_categorical__ = __webpack_require__(1244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_create_market_components_create_market_form_2_scalar__ = __webpack_require__(1245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_create_market_components_create_market_form_buttons__ = __webpack_require__(1214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_common_components_input__ = __webpack_require__(1207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_modules_common_components_datepicker__ = __webpack_require__(1241);








var CreateMarketForm2 = function CreateMarketForm2(p) {
	var typeSpecific = void 0;
	// const tomorrow = new Date();
	// tomorrow.setDate(tomorrow.getDate() + 1);
	switch (p.type) {
		case __WEBPACK_IMPORTED_MODULE_1_modules_markets_constants_market_types__["a" /* CATEGORICAL */]:
			typeSpecific = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_modules_create_market_components_create_market_form_2_categorical__["a" /* default */], p);
			break;
		case __WEBPACK_IMPORTED_MODULE_1_modules_markets_constants_market_types__["b" /* SCALAR */]:
			typeSpecific = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_create_market_components_create_market_form_2_scalar__["a" /* default */], p);
			break;
		default:
			break;
	}

	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'div',
		{ className: 'step-2' },
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'description' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'h1',
				null,
				'What do you want to ask?'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_modules_common_components_input__["a" /* default */], {
				type: 'text',
				value: p.description,
				placeholder: p.descriptionPlaceholder,
				maxLength: p.descriptionMaxLength,
				onChange: function onChange(value) {
					return p.onValuesUpdated({ description: value });
				}
			}),
			p.errors.description && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				{ className: 'error-message' },
				p.errors.description
			)
		),
		typeSpecific,
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'end-date' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'h4',
				null,
				'What\'s the end date for your question?'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_modules_common_components_datepicker__["a" /* default */], { endDate: p.endDate, onValuesUpdated: p.onValuesUpdated }),
			p.errors.endDate && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				{ className: 'error-message' },
				p.errors.endDate
			)
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_modules_create_market_components_create_market_form_buttons__["a" /* default */], {
			disabled: !p.isValid,
			onNext: function onNext() {
				return p.onValuesUpdated({ step: p.step + 1 });
			},
			onPrev: function onPrev() {
				return p.onValuesUpdated({ step: p.step - 1 });
			}
		})
	);
};

// TODO -- Prop Validations
// CreateMarketForm2.propTypes = {
// 	type: PropTypes.string,
// 	description: PropTypes.string,
// 	endDate: PropTypes.object,
// 	descriptionPlaceholder: PropTypes.string,
// 	descriptionMaxLength: PropTypes.number,
// 	minEndDate: PropTypes.object,
// 	isValid: PropTypes.bool,
// 	errors: PropTypes.object,
// 	onValuesUpdated: PropTypes.func
// };

var _default = CreateMarketForm2;
/* harmony default export */ exports["a"] = _default;
// 	expanded={true}

;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(CreateMarketForm2, 'CreateMarketForm2', '/Users/li/augur/dev/augur/src/modules/create-market/components/create-market-form-2.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/create-market/components/create-market-form-2.jsx');
}();

;

/***/ },

/***/ 1247:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_common_components_input_list__ = __webpack_require__(1224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_create_market_components_create_market_form_buttons__ = __webpack_require__(1214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_common_components_input__ = __webpack_require__(1207);






var CreateMarketForm4 = function CreateMarketForm4(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'div',
		{ className: 'step-3' },
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'h1',
			null,
			'Additional market information'
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'expiry' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'h4',
				null,
				'What is the source of expiry information for your question?'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				{ className: 'expiry-source-option' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
					value: p.expirySourceTypes.generic,
					type: 'radio',
					checked: p.expirySource === p.expirySourceTypes.generic,
					onChange: function onChange() {
						return p.onValuesUpdated({ expirySource: p.expirySourceTypes.generic });
					}
				}),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					null,
					'Outcome will be covered by local, national or international news media.'
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				{ className: 'expiry-source-option' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
					value: p.expirySourceTypes.specific,
					type: 'radio',
					checked: p.expirySource === p.expirySourceTypes.specific,
					onChange: function onChange() {
						return p.onValuesUpdated({ expirySource: p.expirySourceTypes.specific });
					}
				}),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					null,
					'Outcome will be detailed on a specific publicly available website:'
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()('expiry-source-url', { displayNone: p.expirySource !== p.expirySourceTypes.specific }) },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_modules_common_components_input__["a" /* default */], {
					type: 'text',
					value: p.expirySourceUrl,
					placeholder: 'http://www.boxofficemojo.com',
					onChange: function onChange(value) {
						return p.onValuesUpdated({ expirySourceUrl: value });
					}
				})
			),
			(p.errors.expirySource || p.errors.expirySourceUrl) && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				{ className: 'error-message' },
				p.errors.expirySource || p.errors.expirySourceUrl
			)
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'tags' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'h4',
				null,
				'Add some tags to your market (optional)'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'p',
				null,
				'Up to three tags can be added to categorize your market. For example: politics, sports, entertainment or technology.'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_modules_common_components_input_list__["a" /* default */], {
				className: 'tags-list',
				list: p.tags,
				errors: p.errors && p.errors.tags,
				listMaxElements: p.tagsMaxNum,
				itemMaxLength: p.tagMaxLength,
				onChange: function onChange(newTags) {
					return p.onValuesUpdated({ tags: newTags });
				}
			})
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'details-text' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'h4',
				null,
				'Does your question need further explanation? (optional)'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'p',
				null,
				'Your question: ',
				p.description
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_modules_common_components_input__["a" /* default */], {
				className: 'details-text-input',
				value: p.detailsText,
				maxLength: 500,
				placeholder: 'Optional: enter a more detailed description of your market.',
				onChange: function onChange(value) {
					return p.onValuesUpdated({ detailsText: value });
				}
			})
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_create_market_components_create_market_form_buttons__["a" /* default */], {
			disabled: !p.isValid,
			onNext: function onNext() {
				return p.onValuesUpdated({ step: p.step + 1 });
			},
			onPrev: function onPrev() {
				return p.onValuesUpdated({ step: p.step - 1 });
			}
		})
	);
};

// TODO -- Prop Validations
// CreateMarketForm4.propTypes = {
// 	expirySource: PropTypes.string,
// 	expirySourceUrl: PropTypes.string,
// 	expirySourceTypes: PropTypes.object,
// 	tags: PropTypes.array,
// 	tagsMaxNum: PropTypes.number,
// 	tagMaxLength: PropTypes.number,
// 	description: PropTypes.string,
// 	detailsText: PropTypes.string,
// 	isValid: PropTypes.bool,
// 	errors: PropTypes.object,
// 	onValuesUpdated: PropTypes.func
// };

var _default = CreateMarketForm4;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(CreateMarketForm4, 'CreateMarketForm4', '/Users/li/augur/dev/augur/src/modules/create-market/components/create-market-form-3.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/create-market/components/create-market-form-3.jsx');
}();

;

/***/ },

/***/ 1248:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_create_market_components_create_market_form_buttons__ = __webpack_require__(1214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_common_components_input__ = __webpack_require__(1207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_common_components_checkbox__ = __webpack_require__(518);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_utils_get_value__ = __webpack_require__(160);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };










var CreateMarketForm4 = function CreateMarketForm4(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'div',
		{ className: 'step-4' },
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'fee' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'h4',
				null,
				'Set the taker\'s fee'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'p',
				null,
				'The taker fee is a percentage fee charged to the \'Taker\' against the value of any trade made in the market.'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_common_components_input__["a" /* default */], {
				type: 'text',
				value: p.takerFee,
				onChange: function onChange(value) {
					return p.onValuesUpdated({ takerFee: value });
				}
			}),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				{ className: 'denomination' },
				'%'
			),
			p.errors.takerFee && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				{ className: 'error-message' },
				p.errors.takerFee
			)
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'fee' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'h4',
				null,
				'Set the maker\'s fee'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'p',
				null,
				'The maker fee is a percentage fee charged to the \'Maker\' against the value of any trade made in the market.'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_common_components_input__["a" /* default */], {
				type: 'text',
				value: p.makerFee,
				onChange: function onChange(value) {
					return p.onValuesUpdated({ makerFee: value });
				}
			}),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				{ className: 'denomination' },
				'%'
			),
			p.errors.makerFee && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				{ className: 'error-message' },
				p.errors.makerFee
			)
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'initial-order-book displayNone' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'h4',
				null,
				'Set the initial order book'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'p',
				null,
				'Allows you to place an initial set of orders in this market\'s order book, which will allow traders to begin buying and selling immediately.'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_modules_common_components_checkbox__["a" /* default */], {
				text: 'Include initial order book',
				isChecked: p.isCreatingOrderBook,
				onClick: function onClick() {
					return p.onValuesUpdated({ isCreatingOrderBook: !p.isCreatingOrderBook });
				}
			})
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()('order-book-creation', { displayNone: !p.isCreatingOrderBook }) },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'h6',
				{ className: 'horizontal-divider' },
				' Order Book Creation '
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				null,
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'liquidity' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'h4',
						null,
						'Set the amount of initial liquidity'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'p',
						null,
						'Initial liquidity is the amount of ether you\'re putting into the market to get trading started.\n\t\t\t\t\t\tThe Market Maker will use these funds to buy shares - which are then sold back to those\n\t\t\t\t\t\twanting to trade your market when the market opens. Any initial liquidity remaining when\n\t\t\t\t\t\tthe market is expired will be returned to you (along with any profit generated by the Market\n\t\t\t\t\t\tMaker from selling shares).'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_common_components_input__["a" /* default */], {
						type: 'text',
						value: p.initialLiquidity,
						onChange: function onChange(value) {
							return p.onValuesUpdated({ initialLiquidity: value });
						}
					}),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'span',
						{ className: 'denomination' },
						'ETH'
					),
					p.errors.initialLiquidity && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'span',
						{ className: 'error-message' },
						p.errors.initialLiquidity
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					null,
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'h4',
						null,
						'Initial Fair Price'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'p',
						null,
						'This establishes the initial price for each respective outcome.'
					),
					p.initialFairPrices.values.map(function (cV, i) {
						return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ key: 'initialFairPrice' + i },
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_common_components_input__["a" /* default */], {
								type: 'text',
								value: p.initialFairPrices.values[i].value,
								onChange: function onChange(onChangeValue) {
									var prices = p.initialFairPrices.values;
									var raw = p.initialFairPrices.raw;

									prices[i].value = onChangeValue;
									raw[i] = onChangeValue;

									p.onValuesUpdated({
										initialFairPrices: _extends({}, p.initialFairPrices, {
											values: prices,
											raw: raw
										})
									});
								}
							}),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'span',
								{ className: 'denomination' },
								'ETH | ',
								cV.label
							),
							!!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_utils_get_value__["a" /* default */])(p, 'errors.initialFairPrice.' + i) && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'span',
								{ className: 'error-message' },
								p.errors.initialFairPrice['' + i]
							)
						);
					})
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					null,
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'h4',
						null,
						'Best Bid/Ask Quantity'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'p',
						null,
						'This defines the number of shares applied to the best bid and ask orders.'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_common_components_input__["a" /* default */], {
						type: 'text',
						value: p.bestStartingQuantity,
						onChange: function onChange(value) {
							return p.onValuesUpdated({ bestStartingQuantity: value });
						}
					}),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'span',
						{ className: 'denomination' },
						'Shares'
					),
					p.errors.bestStartingQuantity && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'span',
						{ className: 'error-message' },
						p.errors.bestStartingQuantity
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					null,
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'h4',
						null,
						'Starting Quantity'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'p',
						null,
						'This is the number of shares in each order.'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_common_components_input__["a" /* default */], {
						type: 'text',
						value: p.startingQuantity,
						onChange: function onChange(value) {
							return p.onValuesUpdated({ startingQuantity: value });
						}
					}),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'span',
						{ className: 'denomination' },
						'Shares'
					),
					p.errors.startingQuantity && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'span',
						{ className: 'error-message' },
						p.errors.startingQuantity
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					null,
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'h4',
						null,
						'Price Width'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'p',
						null,
						'This defines the spread between the initial best bid and ask orders.'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_common_components_input__["a" /* default */], {
						type: 'text',
						value: p.priceWidth,
						onChange: function onChange(value) {
							return p.onValuesUpdated({ priceWidth: value });
						}
					}),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'span',
						{ className: 'denomination' },
						'ETH'
					),
					p.errors.priceWidth && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'span',
						{ className: 'error-message' },
						p.errors.priceWidth
					)
				)
			)
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_modules_create_market_components_create_market_form_buttons__["a" /* default */], {
			disabled: !p.isValid,
			nextLabel: 'review',
			onNext: function onNext() {
				return p.onValuesUpdated({ step: p.step + 1 });
			},
			onPrev: function onPrev() {
				return p.onValuesUpdated({ step: p.step - 1 });
			}
		})
	);
};

// TOOD -- Prop Validations
// CreateMarketForm4.propTypes = {
// 	onValuesUpdated: PropTypes.func,
// 	errors: PropTypes.object,
// 	isValid: PropTypes.bool,
// 	takerFee: PropTypes.number,
// 	makerFee: PropTypes.number,
// 	initialLiquidity: PropTypes.any,
// 	showAdvancedMarketParams: PropTypes.bool,
// 	initialFairPrices: PropTypes.object,
// 	bestStartingQuantity: PropTypes.any,
// 	startingQuantity: PropTypes.any,
// 	priceWidth: PropTypes.any,
// 	priceDepth: PropTypes.any
// };

var _default = CreateMarketForm4;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(CreateMarketForm4, 'CreateMarketForm4', '/Users/li/augur/dev/augur/src/modules/create-market/components/create-market-form-4.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/create-market/components/create-market-form-4.jsx');
}();

;

/***/ },

/***/ 1249:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_market_components_market_preview__ = __webpack_require__(1218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_create_market_components_create_market_form_buttons__ = __webpack_require__(1214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_common_components_value_denomination__ = __webpack_require__(515);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };






var CreateMarketForm5 = function CreateMarketForm5(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'div',
		{ className: 'step-5' },
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'h1',
			null,
			'Review and submit your new market'
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_market_components_market_preview__["a" /* default */], p),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_common_components_value_denomination__["a" /* default */], _extends({ className: 'market-creation-fee' }, p.marketCreationFee, { prefix: 'Market creation fee:' })),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_common_components_value_denomination__["a" /* default */], _extends({ className: 'gas-fees' }, p.gasFees, { prefix: 'Gas cost:' })),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_common_components_value_denomination__["a" /* default */], _extends({ className: 'event-bond' }, p.eventBond, { prefix: 'Bond (refundable):' })),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_modules_create_market_components_create_market_form_buttons__["a" /* default */], {
			nextLabel: 'submit new market',
			onNext: p.onSubmit,
			onPrev: function onPrev() {
				return p.onValuesUpdated({ step: p.step - 1 });
			}
		})
	);
};

// TOOD -- Prop Validations
// CreateMarketForm5.propTypes = {
// 	marketCreationFee: PropTypes.object,
// 	gasCost: PropTypes.object,
// 	eventBond: PropTypes.object,
// 	onSubmit: PropTypes.func
// };

var _default = CreateMarketForm5;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(CreateMarketForm5, 'CreateMarketForm5', '/Users/li/augur/dev/augur/src/modules/create-market/components/create-market-form-5.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/create-market/components/create-market-form-5.jsx');
}();

;

/***/ },

/***/ 1250:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_create_market_components_create_market_form_1__ = __webpack_require__(1243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_create_market_components_create_market_form_2__ = __webpack_require__(1246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_create_market_components_create_market_form_3__ = __webpack_require__(1247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_create_market_components_create_market_form_4__ = __webpack_require__(1248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_create_market_components_create_market_form_5__ = __webpack_require__(1249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_modules_market_constants_share_denominations__ = __webpack_require__(516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_utils_get_value__ = __webpack_require__(160);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };












var CreateMarketForm = function CreateMarketForm(p) {
	var form = void 0;

	var shareDenominations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7_utils_get_value__["a" /* default */])(p, 'scalarShareDenomination.denominations');

	switch (p.step) {
		case 1:
		default:
			form = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_create_market_components_create_market_form_1__["a" /* default */], p);
			break;
		case 2:
			form = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_modules_create_market_components_create_market_form_2__["a" /* default */], p);
			break;
		case 3:
			form = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_create_market_components_create_market_form_3__["a" /* default */], p);
			break;
		case 4:
			form = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_modules_create_market_components_create_market_form_4__["a" /* default */], p);
			break;
		case 5:
			form = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_modules_create_market_components_create_market_form_5__["a" /* default */], _extends({}, p, {
				selectedShareDenomination: __WEBPACK_IMPORTED_MODULE_6_modules_market_constants_share_denominations__["c" /* SHARE */],
				shareDenominations: shareDenominations
			}));
			break;
	}

	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'article',
		{ className: p.className },
		form
	);
};

CreateMarketForm.propTypes = {
	className: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
	step: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number
};

var _default = CreateMarketForm;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(CreateMarketForm, 'CreateMarketForm', '/Users/li/augur/dev/augur/src/modules/create-market/components/create-market-form.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/create-market/components/create-market-form.jsx');
}();

;

/***/ }

});
//# sourceMappingURL=1.js.map