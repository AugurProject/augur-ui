webpackJsonp([0],{

/***/ 1265:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_markets_components_markets_headers__ = __webpack_require__(1282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_markets_components_markets_list__ = __webpack_require__(1283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_branch_components_branch__ = __webpack_require__(1279);






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

/***/ 1275:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(2);

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

/***/ 1276:
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

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _mixin = __webpack_require__(1275);

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

/***/ 1277:
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

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _mixin = __webpack_require__(1275);

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

/***/ 1278:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Line = __webpack_require__(1277);

var _Line2 = _interopRequireDefault(_Line);

var _Circle = __webpack_require__(1276);

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

/***/ 1279:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_tooltip__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rc_progress__ = __webpack_require__(1278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rc_progress___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rc_progress__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_common_components_bullet__ = __webpack_require__(1280);






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

/***/ 1280:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(2);
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

/***/ 1281:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_common_components_dropdown__ = __webpack_require__(539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_markets_components_markets_search__ = __webpack_require__(1285);





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

/***/ 1282:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_markets_components_markets_filter_sort__ = __webpack_require__(1281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_link_components_link__ = __webpack_require__(35);
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

/***/ 1283:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_market_components_market_preview__ = __webpack_require__(540);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_markets_components_markets_pagination__ = __webpack_require__(1284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_utils_get_value__ = __webpack_require__(25);
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

/***/ 1284:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_link_components_link__ = __webpack_require__(35);
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

/***/ 1285:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_common_components_input__ = __webpack_require__(68);



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
//# sourceMappingURL=0.js.map