webpackJsonp([3],{

/***/ 1193:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_common_components_tab_navigation__ = __webpack_require__(1230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_portfolio_components_positions__ = __webpack_require__(1268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_portfolio_components_markets__ = __webpack_require__(1267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_portfolio_components_reports__ = __webpack_require__(1269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_app_constants_views__ = __webpack_require__(45);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };










var PortfolioView = function PortfolioView(p) {
	var node = void 0;

	switch (p.activeView) {
		default:
		case __WEBPACK_IMPORTED_MODULE_5_modules_app_constants_views__["b" /* MY_POSITIONS */]:
			node = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_modules_portfolio_components_positions__["a" /* default */], _extends({}, p.positions, { settings: p.settings }));
			break;
		case __WEBPACK_IMPORTED_MODULE_5_modules_app_constants_views__["c" /* MY_MARKETS */]:
			node = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_portfolio_components_markets__["a" /* default */], p.markets);
			break;
		case __WEBPACK_IMPORTED_MODULE_5_modules_app_constants_views__["d" /* MY_REPORTS */]:
			node = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_modules_portfolio_components_reports__["a" /* default */], _extends({}, p.reports, { branch: p.branch }));
			break;
	}
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'section',
		{ id: 'portfolio_view' },
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'header',
			{ className: 'page-header portfolio-header' },
			!!p.navItems && !!p.navItems.length && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_common_components_tab_navigation__["a" /* default */], {
				activeView: p.activeView,
				navItems: p.navItems
			})
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'page-content' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'section',
				{ className: 'portfolio-content' },
				node
			)
		)
	);
};

PortfolioView.propTypes = {
	navItems: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].array.isRequired,
	totals: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object.isRequired,
	positions: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object.isRequired,
	markets: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object.isRequired,
	reports: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object.isRequired,
	settings: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object.isRequired
};

var _default = PortfolioView;
/* harmony default export */ exports["default"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(PortfolioView, 'PortfolioView', '/Users/li/augur/dev/augur/src/modules/portfolio/components/portfolio-view.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/portfolio/components/portfolio-view.jsx');
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

/***/ 1230:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_tooltip__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_link_components_link__ = __webpack_require__(513);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_common_components_value_denomination__ = __webpack_require__(514);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };








var TabNavigation = function TabNavigation(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'div',
		{ className: 'tab-navigator' },
		!!p.navItems && p.navItems.map(function (navItem, i) {
			if (typeof navItem.page === 'string') navItem.page = [navItem.page];

			return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				__WEBPACK_IMPORTED_MODULE_3_modules_link_components_link__["a" /* default */],
				{
					key: '' + i,
					className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('nav-item', { active: navItem.page.indexOf(p.activeView) > -1 }),
					href: navItem.link.href,
					onClick: navItem.link.onClick
				},
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'nav-label' },
					navItem.label
				),
				(!!navItem.leadingValue || !!navItem.trailingValue) && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'section',
					{ className: 'nav-values' },
					navItem.leadingValue && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_modules_common_components_value_denomination__["a" /* default */], _extends({
						'data-tip': true, 'data-for': 'tab-' + i + '-leading-tooltip'
					}, navItem.leadingValue || {})),
					navItem.trailingValue && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_modules_common_components_value_denomination__["a" /* default */], _extends({
						'data-tip': true, 'data-for': 'tab-' + i + '-trailing-tooltip',
						className: 'colorize'
					}, navItem.trailingValue || {})),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						__WEBPACK_IMPORTED_MODULE_1_react_tooltip___default.a,
						{ id: 'tab-' + i + '-leading-tooltip', type: 'light', effect: 'solid', place: 'top' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'span',
							{ className: 'tooltip-text' },
							navItem.leadingTitle ? navItem.leadingTitle + ': ' + navItem.leadingValue.full : ''
						)
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						__WEBPACK_IMPORTED_MODULE_1_react_tooltip___default.a,
						{ id: 'tab-' + i + '-trailing-tooltip', type: 'light', effect: 'solid', place: 'top' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'span',
							{ className: 'tooltip-text' },
							navItem.trailingTitle ? navItem.trailingTitle + ': ' + navItem.trailingValue.full : ''
						)
					)
				)
			);
		})
	);
};

// TODO -- Prop Validations
// TabNavigation.propTypes = {
// 	activeView: React.PropTypes.string,
// 	navItems: React.PropTypes.array
// };

var _default = TabNavigation;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(TabNavigation, 'TabNavigation', '/Users/li/augur/dev/augur/src/modules/common/components/tab-navigation.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/common/components/tab-navigation.jsx');
}();

;

/***/ },

/***/ 1255:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_common_components_value_denomination__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_common_components_value_date__ = __webpack_require__(1197);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





var Market = function Market(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'div',
		{ className: 'portfolio-row' },
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'portfolio-group portfolio-main-group' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				{ className: 'market-main-group-title' },
				'ends: '
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_modules_common_components_value_date__["a" /* default */], p.endDate)
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
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_common_components_value_denomination__["a" /* default */], _extends({
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
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_common_components_value_denomination__["a" /* default */], p.openVolume)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'portfolio-pair' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'title' },
					'volume'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_common_components_value_denomination__["a" /* default */], p.volume)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'portfolio-pair total-cost' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'title' },
					'# of trades'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_common_components_value_denomination__["a" /* default */], p.numberOfTrades)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'portfolio-pair total-value' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'title' },
					'avg trade size'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_common_components_value_denomination__["a" /* default */], p.averageTradeSize)
			)
		)
	);
};

Market.propTypes = {
	endDate: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object.isRequired,
	openVolume: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object.isRequired,
	volume: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object.isRequired,
	numberOfTrades: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object.isRequired,
	averageTradeSize: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object.isRequired,
	fees: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object.isRequired
};

var _default = Market;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(Market, 'Market', '/Users/li/augur/dev/augur/src/modules/my-markets/components/my-market.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/my-markets/components/my-market.jsx');
}();

;

/***/ },

/***/ 1256:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_common_components_value_denomination__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_markets_constants_market_types__ = __webpack_require__(23);




var Position = function Position(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'div',
		{ className: 'position' },
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'position-group main-group' },
			p.type === __WEBPACK_IMPORTED_MODULE_2_modules_markets_constants_market_types__["b" /* SCALAR */] ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				{ className: 'position-name' },
				p.lastPricePercent.rounded
			) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				{ className: 'position-name' },
				p.name
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_common_components_value_denomination__["a" /* default */], p.qtyShares)
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'position-group' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'position-pair purchase-price' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'title' },
					'average price of open position'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_common_components_value_denomination__["a" /* default */], p.purchasePrice)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'position-pair last-price' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'title' },
					'last trade price'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_common_components_value_denomination__["a" /* default */], p.lastPrice)
			)
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'position-group' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'position-pair realized-net' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'title' },
					'realized P/L'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_common_components_value_denomination__["a" /* default */], p.realizedNet)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'position-pair unrealized-net' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'title' },
					'unrealized P/L'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_common_components_value_denomination__["a" /* default */], p.unrealizedNet)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'position-pair total-net' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'title' },
					'total P/L'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_common_components_value_denomination__["a" /* default */], p.totalNet)
			)
		)
	);
};

Position.propTypes = {
	name: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.string,
	type: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.string,
	qtyShares: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object,
	gainPercent: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object,
	lastPrice: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object,
	lastPricePercent: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object,
	purchasePrice: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object,
	realizedNet: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object,
	unrealizedNet: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object,
	totalNet: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object
};

var _default = Position;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(Position, 'Position', '/Users/li/augur/dev/augur/src/modules/my-positions/components/my-position.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/my-positions/components/my-position.jsx');
}();

;

/***/ },

/***/ 1257:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_common_components_value_denomination__ = __webpack_require__(514);



var PositionsMarketOverview = function PositionsMarketOverview(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'article',
		{ className: 'positions-market-overview' },
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'position' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				{ className: 'description' },
				p.description
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'position-group' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'position-pair realized-net' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'span',
						{ className: 'title' },
						'total realized P/L'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_common_components_value_denomination__["a" /* default */], p.realizedNet)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'position-pair unrealized-net' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'span',
						{ className: 'title' },
						'total unrealized P/L'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_common_components_value_denomination__["a" /* default */], p.unrealizedNet)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'position-pair total-net' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'span',
						{ className: 'title' },
						'total P/L'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_common_components_value_denomination__["a" /* default */], p.totalNet)
				)
			)
		)
	);
};

PositionsMarketOverview.propTypes = {
	description: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.string.isRequired,
	unrealizedNet: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object.isRequired,
	realizedNet: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object.isRequired
};

var _default = PositionsMarketOverview;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(PositionsMarketOverview, 'PositionsMarketOverview', '/Users/li/augur/dev/augur/src/modules/my-positions/components/my-positions-market-overview.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/my-positions/components/my-positions-market-overview.jsx');
}();

;

/***/ },

/***/ 1258:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_tooltip__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_my_positions_components_my_position__ = __webpack_require__(1256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_link_components_link__ = __webpack_require__(513);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };







var Positions = function Positions(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'article',
		{ className: 'positions-list' },
		p.marketLink && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			__WEBPACK_IMPORTED_MODULE_3_modules_link_components_link__["a" /* default */],
			{ key: p.market.id, href: p.marketLink.href, onClick: p.marketLink.onClick },
			(p.market.myPositionOutcomes || []).map(function (outcome) {
				return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_modules_my_positions_components_my_position__["a" /* default */], _extends({
					key: p.market.id + '-' + outcome.id,
					type: p.market.type
				}, outcome, outcome.position));
			})
		),
		!p.marketLink && (p.market.myPositionOutcomes || []).map(function (outcome) {
			return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_modules_my_positions_components_my_position__["a" /* default */], _extends({
				key: outcome.id,
				type: p.market.type
			}, outcome, outcome.position));
		}),
		!p.settings.autoSellCompleteSets && p.market.hasCompleteSet && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'complete-sets' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'close-position-button' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'button',
					{
						'data-tip': p.market.smallestPosition.full,
						className: 'button',
						onClick: function onClick(event) {
							event.stopPropagation();
							p.market.onSubmitClosePosition();
						}
					},
					'Redeem ',
					p.market.smallestPosition.formatted,
					' Complete Sets'
				)
			)
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_tooltip___default.a, { type: 'light', effect: 'solid', place: 'top', globalEventOff: 'click' })
	);
};

// TODO -- Prop Validations
// Positions.propTypes = {
// 	className: React.PropTypes.string,
// 	market: React.PropTypes.object,
// 	marketLink: React.PropTypes.object
// };

var _default = Positions;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(Positions, 'Positions', '/Users/li/augur/dev/augur/src/modules/my-positions/components/my-positions.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/my-positions/components/my-positions.jsx');
}();

;

/***/ },

/***/ 1259:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_tooltip__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_common_components_value_denomination__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_common_components_value_date__ = __webpack_require__(1197);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };







var Report = function Report(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'div',
		{ className: 'portfolio-row' },
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'portfolio-group portfolio-main-group' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'portfolio-pair' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'report-main-group-title' },
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
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_modules_common_components_value_denomination__["a" /* default */], p.outcomePercentage),
						')'
					),
					p.outcome && !p.outcomePercentage && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'span',
						null,
						p.outcome
					),
					!p.outcome && '-'
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
					!!p.isCommitted && !p.isRevealed && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'span',
						{
							className: 'report-committed',
							'data-tip': 'You have successfully committed to this report. Remember to login to reveal the report!'
						},
						p.reported || '-'
					),
					!!p.isRevealed && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'span',
						{ className: 'report-revealed' },
						p.reported || '-'
					),
					!p.isRevealed && !p.isCommitted && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'span',
						null,
						p.reported || '-'
					),
					!!p.outcome && p.isReportEqual && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'span',
						{
							className: 'fa report-equal',
							'data-tip': 'Your report matches the consensus outcome'
						},
						'\uF058'
					),
					!!p.outcome && !p.isReportEqual && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'span',
						{
							className: 'fa report-unequal',
							'data-tip': 'Your report does not match the consensus outcome'
						},
						'\uF057'
					),
					!!p.isUnethical && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'span',
						{
							className: 'fa report-unethical',
							'data-tip': 'You reported that this market is unethical'
						},
						'\uF165'
					)
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
						{
							'data-tip': p.branch.currentPeriod - p.period + ' reporting cycles ago'
						},
						p.period
					) : '-'
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
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_modules_common_components_value_denomination__["a" /* default */], _extends({
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
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_common_components_value_date__["a" /* default */], p.endDate)
			)
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_tooltip___default.a, { type: 'light', effect: 'solid', place: 'top' })
	);
};

// TODO -- Prop Validations
// Report.propTypes = {
// 	outcome: PropTypes.string,
// 	reported: PropTypes.string,
// 	isReportEqual: PropTypes.bool.isRequired,
// 	feesEarned: PropTypes.object.isRequired,
// 	repEarned: PropTypes.object.isRequired,
// 	endDate: PropTypes.object.isRequired
// };

var _default = Report;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(Report, 'Report', '/Users/li/augur/dev/augur/src/modules/my-reports/components/my-report.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/my-reports/components/my-report.jsx');
}();

;

/***/ },

/***/ 1267:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_my_markets_components_my_market__ = __webpack_require__(1255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_link_components_link__ = __webpack_require__(513);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





var PortfolioMarkets = function PortfolioMarkets(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'div',
		null,
		!!p.markets && !!p.markets.length && p.markets.map(function (market) {
			return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				__WEBPACK_IMPORTED_MODULE_2_modules_link_components_link__["a" /* default */],
				_extends({ key: market.id }, market.marketLink),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: '' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'span',
						{ className: 'description' },
						market.description
					),
					!!market && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'article',
						{ className: 'portfolio-list' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_my_markets_components_my_market__["a" /* default */], market)
					)
				)
			);
		})
	);
};

// TODO -- Prop Validations
// PortfolioMarkets.propTypes = {
// 	markets: React.PropTypes.array.isRequired
// };

var _default = PortfolioMarkets;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(PortfolioMarkets, 'PortfolioMarkets', '/Users/li/augur/dev/augur/src/modules/portfolio/components/markets.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/portfolio/components/markets.jsx');
}();

;

/***/ },

/***/ 1268:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_my_positions_components_my_positions__ = __webpack_require__(1258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_my_positions_components_my_positions_market_overview__ = __webpack_require__(1257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_link_components_link__ = __webpack_require__(513);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };






var PortfolioPositions = function PortfolioPositions(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'div',
		{ className: 'positions-content' },
		!!p.markets && !!p.markets.length && p.markets.map(function (market) {
			return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ key: market.id, className: 'positions-container' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					__WEBPACK_IMPORTED_MODULE_3_modules_link_components_link__["a" /* default */],
					{ href: market.marketLink.href, onClick: market.marketLink.onClick },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_modules_my_positions_components_my_positions_market_overview__["a" /* default */], _extends({
						description: market.description
					}, market.myPositionsSummary))
				),
				!!market.myPositionOutcomes && !!market.myPositionOutcomes.length && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_my_positions_components_my_positions__["a" /* default */], {
					className: 'page-content positions-content',
					market: market,
					marketLink: market.marketLink,
					settings: p.settings
				})
			);
		})
	);
};

// TODO -- Prop Validations
// PortfolioPositions.propTypes = {
// 	markets: React.PropTypes.array.isRequired
// };

var _default = PortfolioPositions;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(PortfolioPositions, 'PortfolioPositions', '/Users/li/augur/dev/augur/src/modules/portfolio/components/positions.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/portfolio/components/positions.jsx');
}();

;

/***/ },

/***/ 1269:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_tooltip__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_my_reports_components_my_report__ = __webpack_require__(1259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_link_components_link__ = __webpack_require__(513);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };







var PortfolioReports = function PortfolioReports(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'div',
		null,
		!!p.reports && !!p.reports.length && p.reports.map(function (market) {
			return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				__WEBPACK_IMPORTED_MODULE_3_modules_link_components_link__["a" /* default */],
				_extends({ key: '' + market.marketId }, market.marketLink),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ key: market.marketId },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'span',
						{ className: 'description' },
						market.description,
						market.isChallenged && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'span',
							{
								className: 'fa outcome-challenged',
								'data-tip': 'This outcome is currently being challenged'
							},
							'\uF0E3'
						),
						!market.isChallenged && market.isChallengeable && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'span',
							{
								className: 'fa outcome-challengeable',
								'data-tip': 'This outcome is eligible to be challenged'
							},
							'\uF06A'
						)
					),
					!!market && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'article',
						{ className: 'portfolio-list' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_modules_my_reports_components_my_report__["a" /* default */], _extends({}, market, { branch: p.branch }))
					)
				)
			);
		}),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_tooltip___default.a, { type: 'light', effect: 'solid', place: 'top' })
	);
};

// TODO -- Prop Validations
// PortfolioReports.propTypes = {
// 	reports: React.PropTypes.array.isRequired
// };

var _default = PortfolioReports;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(PortfolioReports, 'PortfolioReports', '/Users/li/augur/dev/augur/src/modules/portfolio/components/reports.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/portfolio/components/reports.jsx');
}();

;

/***/ }

});
//# sourceMappingURL=3.js.map