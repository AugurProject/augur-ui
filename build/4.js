webpackJsonp([4],{

/***/ 1197:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_transactions_components_transactions__ = __webpack_require__(1285);




var TransactionsPage = function TransactionsPage(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'section',
		{ id: 'transactions_view' },
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'header',
			{ className: 'page-header' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				{ className: 'big-line' },
				p.transactionsTotals.title
			)
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'page-content' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_transactions_components_transactions__["a" /* default */], {
				className: 'transactions-content',
				transactions: p.transactions
			})
		)
	);
};

TransactionsPage.propTypes = {
	className: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.string,
	transactions: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.array,
	transactionsTotals: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object
};

var _default = TransactionsPage;
/* harmony default export */ exports["default"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(TransactionsPage, 'TransactionsPage', '/Users/li/augur/dev/augur/src/modules/transactions/components/transactions-view.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/transactions/components/transactions-view.jsx');
}();

;

/***/ },

/***/ 1284:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_link_components_link__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_transactions_constants_types__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_auth_constants_auth_types__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_markets_constants_market_types__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_modules_common_components_value_denomination__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_modules_common_components_value_timestamp__ = __webpack_require__(521);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };










function liveDangerously(thisBetterBeSanitized) {
	return { __html: thisBetterBeSanitized };
}

var Transaction = function Transaction(p) {
	var nodes = {};

	var buildDescription = function buildDescription(fullDescription) {
		if (!fullDescription) return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', null);
		var shortDescription = void 0;
		if (fullDescription.indexOf('\n') > -1) {
			shortDescription = fullDescription.split('\n').map(function (text) {
				return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					{ key: text },
					text
				);
			});
			shortDescription = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'ul',
				null,
				shortDescription
			);
		} else {
			shortDescription = fullDescription.substring(0, 100) + (fullDescription.length > 100 && '...' || '');
		}
		var description = function description(isShortened) {
			if (isShortened) {
				return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'market-description', 'data-tip': fullDescription },
					shortDescription
				);
			}
			return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				{ className: 'market-description' },
				shortDescription
			);
		};
		var isShortened = shortDescription !== fullDescription;
		if (shortDescription && p.data.marketLink) {
			return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				__WEBPACK_IMPORTED_MODULE_2_modules_link_components_link__["a" /* default */],
				{ href: p.data.marketLink.href, onClick: p.data.marketLink.onClick },
				description(isShortened)
			);
		}
		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'span',
			null,
			description(isShortened)
		);
	};

	switch (p.type) {
		case __WEBPACK_IMPORTED_MODULE_3_modules_transactions_constants_types__["BUY"]:
		case __WEBPACK_IMPORTED_MODULE_3_modules_transactions_constants_types__["BID"]:
		case __WEBPACK_IMPORTED_MODULE_3_modules_transactions_constants_types__["SELL"]:
		case __WEBPACK_IMPORTED_MODULE_3_modules_transactions_constants_types__["ASK"]:
		case __WEBPACK_IMPORTED_MODULE_3_modules_transactions_constants_types__["SHORT_SELL"]:
		case __WEBPACK_IMPORTED_MODULE_3_modules_transactions_constants_types__["SHORT_ASK"]:
			switch (p.type) {
				case __WEBPACK_IMPORTED_MODULE_3_modules_transactions_constants_types__["BUY"]:
					nodes.action = 'BUY';
					break;
				case __WEBPACK_IMPORTED_MODULE_3_modules_transactions_constants_types__["BID"]:
					nodes.action = 'BID';
					break;
				case __WEBPACK_IMPORTED_MODULE_3_modules_transactions_constants_types__["SELL"]:
					nodes.action = 'SELL';
					break;
				case __WEBPACK_IMPORTED_MODULE_3_modules_transactions_constants_types__["ASK"]:
					nodes.action = 'ASK';
					break;
				case __WEBPACK_IMPORTED_MODULE_3_modules_transactions_constants_types__["SHORT_SELL"]:
					nodes.action = 'SHORT SELL';
					break;
				case __WEBPACK_IMPORTED_MODULE_3_modules_transactions_constants_types__["SHORT_ASK"]:
					nodes.action = 'SHORT ASK';
					break;
				default:
					break;
			}

			nodes.description = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				{ className: 'description' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'action' },
					nodes.action
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_modules_common_components_value_denomination__["a" /* default */], _extends({ className: 'shares' }, p.numShares)),
				p.data.marketType === __WEBPACK_IMPORTED_MODULE_5_modules_markets_constants_market_types__["a" /* CATEGORICAL */] && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					null,
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'span',
						{ className: 'of' },
						'of'
					),
					' ',
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'span',
						{ className: 'outcome-name' },
						p.data.outcomeName && p.data.outcomeName.toString().substring(0, 35) + (p.data.outcomeName.toString().length > 35 && '...' || '')
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'at' },
					'@'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_modules_common_components_value_denomination__["a" /* default */], _extends({ className: 'noFeePrice' }, p.noFeePrice)),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', { className: 'hide-in-tx-display' }),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_modules_common_components_value_denomination__["a" /* default */], _extends({ className: 'avgPrice' }, p.avgPrice, { prefix: 'estimated total (including trading fees):', postfix: '/ share' })),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
				buildDescription(p.data.description),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', { className: 'hide-in-trade-summary-display' }),
				p.timestamp && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_modules_common_components_value_timestamp__["a" /* default */], _extends({ className: 'property-value' }, p.timestamp))
			);

			break;

		case __WEBPACK_IMPORTED_MODULE_3_modules_transactions_constants_types__["SELL_COMPLETE_SETS"]:
			nodes.action = 'REDEEM ' + p.numShares.formatted + ' COMPLETE SETS';
			nodes.description = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				{ className: 'description' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'action' },
					nodes.action
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
				buildDescription(p.data.description),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
				p.timestamp && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_modules_common_components_value_timestamp__["a" /* default */], _extends({ className: 'property-value' }, p.timestamp))
			);
			break;

		case __WEBPACK_IMPORTED_MODULE_4_modules_auth_constants_auth_types__["FUND_ACCOUNT"]:
			nodes.action = 'REGISTER NEW ACCOUNT';
			nodes.description = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				{ className: 'description' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'action' },
					nodes.action
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'market-description' },
					'Request testnet Ether and Reputation'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
				p.timestamp && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_modules_common_components_value_timestamp__["a" /* default */], _extends({ className: 'property-value' }, p.timestamp))
			);
			break;

		case __WEBPACK_IMPORTED_MODULE_3_modules_transactions_constants_types__["CREATE_MARKET"]:
			nodes.action = 'Create market';
			nodes.description = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				{ className: 'description' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'action' },
					nodes.action
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
				buildDescription(p.data.description),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
				p.timestamp && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_modules_common_components_value_timestamp__["a" /* default */], _extends({ className: 'property-value' }, p.timestamp))
			);
			break;

		case __WEBPACK_IMPORTED_MODULE_3_modules_transactions_constants_types__["COMMIT_REPORT"]:
		case __WEBPACK_IMPORTED_MODULE_3_modules_transactions_constants_types__["REVEAL_REPORT"]:
			{
				var isScalar = void 0;
				switch (p.type) {
					case __WEBPACK_IMPORTED_MODULE_3_modules_transactions_constants_types__["COMMIT_REPORT"]:
						nodes.action = 'Commit report';
						isScalar = p.data.market.type === __WEBPACK_IMPORTED_MODULE_5_modules_markets_constants_market_types__["b" /* SCALAR */];
						break;
					case __WEBPACK_IMPORTED_MODULE_3_modules_transactions_constants_types__["REVEAL_REPORT"]:
						nodes.action = 'Reveal report';
						isScalar = p.data.isScalar;
						break;
					default:
						break;
				}
				var reportedOutcome = isScalar ? p.data.reportedOutcomeID : p.data.outcome && p.data.outcome.name && p.data.outcome.name.substring(0, 35) + (p.data.outcome.name.length > 35 && '...' || '');
				nodes.description = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'description' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'span',
						{ className: 'action' },
						nodes.action
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'strong',
						null,
						reportedOutcome
					),
					!!p.data.isUnethical && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'strong',
						{ className: 'unethical' },
						' and Unethical'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
					buildDescription(p.data.description || p.data.marketDescription),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
					p.timestamp && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_modules_common_components_value_timestamp__["a" /* default */], _extends({ className: 'property-value' }, p.timestamp))
				);
				break;
			}
		case __WEBPACK_IMPORTED_MODULE_3_modules_transactions_constants_types__["GENERATE_ORDER_BOOK"]:
			nodes.action = 'Generate order book';
			nodes.description = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				{ className: 'description' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'action' },
					nodes.action
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
				buildDescription(p.data.description),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
				p.timestamp && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_modules_common_components_value_timestamp__["a" /* default */], _extends({ className: 'property-value' }, p.timestamp))
			);
			break;

		case __WEBPACK_IMPORTED_MODULE_3_modules_transactions_constants_types__["CANCEL_ORDER"]:
			{
				nodes.description = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'description' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'span',
						{ className: 'action' },
						'Cancel order'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'span',
						{ className: 'at' },
						'to ',
						p.data.order.type
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_modules_common_components_value_denomination__["a" /* default */], _extends({ className: 'shares' }, p.data.order.shares)),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'span',
						{ className: 'of' },
						'of'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'span',
						{ className: 'outcome-name' },
						p.data.outcome.name && p.data.outcome.name.substring(0, 35) + (p.data.outcome.name.length > 35 && '...' || '')
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
					buildDescription(p.data.description),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
					p.timestamp && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_modules_common_components_value_timestamp__["a" /* default */], _extends({ className: 'property-value' }, p.timestamp))
				);
				break;
			}
		default:
			nodes.description = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				{ className: 'description' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'action' },
					p.type
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
				buildDescription(p.data.description),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
				p.timestamp && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_modules_common_components_value_timestamp__["a" /* default */], _extends({ className: 'property-value' }, p.timestamp))
			);
			break;
	}

	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'article',
		{ className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()('transaction-item', p.className, p.status) },
		p.index && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'span',
			{ className: 'index' },
			p.index + '.'
		),
		nodes.description,
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'span',
			{ className: 'value-changes' },
			!!p.tradingFees && p.tradingFees.value !== null && p.tradingFees.value !== undefined && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_modules_common_components_value_denomination__["a" /* default */], _extends({ className: 'value-change tradingFees' }, p.tradingFees, { prefix: 'trading fees:' })),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				{ className: 'spacer' },
				'\xA0'
			),
			!!p.feePercent && p.feePercent.value !== null && p.feePercent !== undefined && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_modules_common_components_value_denomination__["a" /* default */], _extends({ className: 'value-change feePercent' }, p.feePercent, { prefix: '[', postfix: ']' })),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
			!!p.gasFees && !!p.gasFees.value && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_modules_common_components_value_denomination__["a" /* default */], _extends({ className: 'value-change gasFees' }, p.gasFees, { prefix: 'estimated gas cost:' }))
		),
		p.status && p.hash ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			__WEBPACK_IMPORTED_MODULE_2_modules_link_components_link__["a" /* default */],
			{ href: 'https://testnet.etherscan.io/tx/' + p.hash, target: '_blank' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'status-and-message' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'message', dangerouslySetInnerHTML: liveDangerously(p.message) }),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
				!!p.tradingFees && p.tradingFees.value !== null && p.tradingFees.value !== undefined && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					null,
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_modules_common_components_value_denomination__["a" /* default */], _extends({
						className: 'tradingFees-message'
					}, p.tradingFees, {
						prefix: 'trading fees:'
					})),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null)
				),
				!!p.freeze && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'freeze-message' },
					p.freeze.noFeeCost && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_modules_common_components_value_denomination__["a" /* default */], _extends({
						className: 'freeze-noFeeCost-message'
					}, p.freeze.noFeeCost, {
						prefix: p.freeze.verb,
						postfix: '+ '
					})),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_modules_common_components_value_denomination__["a" /* default */], _extends({
						className: 'freeze-tradingFees-message'
					}, p.freeze.tradingFees, {
						prefix: !p.freeze.noFeeCost && p.freeze.verb,
						postfix: 'in potential trading fees'
					})),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null)
				),
				!!p.totalCost && p.totalCost.value !== null && p.totalCost.value !== undefined && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					null,
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_modules_common_components_value_denomination__["a" /* default */], _extends({
						className: 'totalCost-message'
					}, p.totalCost, {
						prefix: 'total cost:'
					})),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null)
				),
				!!p.totalReturn && p.totalReturn.value !== null && p.totalReturn.value !== undefined && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					null,
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_modules_common_components_value_denomination__["a" /* default */], _extends({
						className: 'totalReturn-message'
					}, p.totalReturn, {
						prefix: 'total return:'
					})),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null)
				),
				!!p.marketCreationFee && p.marketCreationFee.value !== null && p.marketCreationFee !== undefined && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					null,
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_modules_common_components_value_denomination__["a" /* default */], _extends({
						className: 'marketCreationFee-message'
					}, p.marketCreationFee, {
						prefix: 'market creation fee:'
					})),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null)
				),
				!!p.eventBond && p.eventBond.value !== null && p.eventBond !== undefined && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					null,
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_modules_common_components_value_denomination__["a" /* default */], _extends({
						className: 'eventBond-message'
					}, p.eventBond, {
						prefix: 'event creation bond:'
					})),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null)
				),
				!!p.gasFees && p.gasFees.value !== null && p.gasFees.value !== undefined && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					null,
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_modules_common_components_value_denomination__["a" /* default */], _extends({
						className: 'gasFees-message'
					}, p.gasFees, {
						prefix: 'gas cost:'
					})),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: 'status' },
					p.status
				)
			)
		) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'status-and-message' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'message', dangerouslySetInnerHTML: liveDangerously(p.message) }),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
			!!p.tradingFees && p.tradingFees.value !== null && p.tradingFees.value !== undefined && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				null,
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_modules_common_components_value_denomination__["a" /* default */], _extends({
					className: 'tradingFees-message'
				}, p.tradingFees, {
					prefix: 'trading fees:'
				})),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null)
			),
			!!p.freeze && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				{ className: 'freeze-message' },
				p.freeze.noFeeCost && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_modules_common_components_value_denomination__["a" /* default */], _extends({
					className: 'freeze-noFeeCost-message'
				}, p.freeze.noFeeCost, {
					prefix: p.freeze.verb,
					postfix: '+ '
				})),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_modules_common_components_value_denomination__["a" /* default */], _extends({
					className: 'freeze-tradingFees-message'
				}, p.freeze.tradingFees, {
					prefix: !p.freeze.noFeeCost && p.freeze.verb,
					postfix: 'in potential trading fees'
				})),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null)
			),
			!!p.totalCost && p.totalCost.value !== null && p.totalCost.value !== undefined && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				null,
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_modules_common_components_value_denomination__["a" /* default */], _extends({
					className: 'totalCost-message'
				}, p.totalCost, {
					prefix: 'total cost:'
				})),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null)
			),
			!!p.totalReturn && p.totalReturn.value !== null && p.totalReturn.value !== undefined && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				null,
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_modules_common_components_value_denomination__["a" /* default */], _extends({
					className: 'totalReturn-message'
				}, p.totalReturn, {
					prefix: 'total return:'
				})),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null)
			),
			!!p.gasFees && p.gasFees.value !== null && p.gasFees.value !== undefined && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				null,
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_modules_common_components_value_denomination__["a" /* default */], _extends({
					className: 'gasFees-message'
				}, p.gasFees, {
					prefix: 'gas cost:'
				})),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				{ className: 'status' },
				p.status
			)
		)
	);
};

Transaction.propTypes = {
	className: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.string,
	index: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.number,
	type: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.string,
	status: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.string,
	data: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object,
	shares: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object,
	gas: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object,
	hash: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.string,
	freeze: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object,
	gasFees: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object,
	tradingFees: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object,
	marketCreationFee: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object,
	eventBond: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object,
	totalCost: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object,
	totalReturn: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object,
	timestamp: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object
};

var _default = Transaction;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(liveDangerously, 'liveDangerously', '/Users/li/augur/dev/augur/src/modules/transactions/components/transaction.jsx');

	__REACT_HOT_LOADER__.register(Transaction, 'Transaction', '/Users/li/augur/dev/augur/src/modules/transactions/components/transaction.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/transactions/components/transaction.jsx');
}();

;

/***/ },

/***/ 1285:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_transactions_components_transaction__ = __webpack_require__(1284);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




var Transactions = function Transactions(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'article',
		{ className: p.className },
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'transactions-container' },
			(p.transactions || []).map(function (transaction, i) {
				return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_modules_transactions_components_transaction__["a" /* default */], _extends({
					key: transaction.id
				}, transaction, {
					index: p.transactions.length - i
				}));
			})
		),
		!!p.transactions.length && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'span',
			{ className: 'feel-free' },
			"continue trading while transactions are running, just don't close the browser before they're done!"
		)
	);
};

// TODO -- prop validations
// Transactions.propTypes = {
// 	transactions: React.PropTypes.array
// };
var _default = Transactions;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(Transactions, 'Transactions', '/Users/li/augur/dev/augur/src/modules/transactions/components/transactions.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/transactions/components/transactions.jsx');
}();

;

/***/ }

});
//# sourceMappingURL=4.js.map