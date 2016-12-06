webpackJsonp([7],{

/***/ 1193:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_link_components_link__ = __webpack_require__(514);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




var LoginMessagePage = function LoginMessagePage(p) {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'section',
		{ id: 'login_message_view' },
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'page-content' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'h1',
				null,
				'Welcome to the Augur beta test!'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'p',
				null,
				'This is a beta test in advance of Augur\'s live release. There are bugs. There are features being\n\t\t\t\tadded, improved, and re-designed. There are a few hundred enhancements scheduled to be added in the next few\n\t\t\t\tmonths. Your thoughtful feedback now is essential. Please use the feedback button at the bottom left of\n\t\t\t\tevery page to submit your feedback, or feel free to send an email to ',
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'a',
					{
						className: 'link',
						href: 'mailto:hugs@augur.net?subject=Beta Testing feedback'
					},
					'hugs@augur.net'
				),
				'. From your submissions, the development team will coordinate fixes and new features. Changes and fixes will be\n\t\t\t\tdisplayed when you log in again.'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'h2',
				null,
				'Important information:'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'ol',
				null,
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Because Augur is a ',
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'b',
						null,
						'completely decentralized'
					),
					' system, if you lose your login credentials it is impossible to recover them. Please ',
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'a',
						{ className: 'link', href: 'http://blog.augur.net/faq/how-do-i-savebackup-my-wallet/', target: '_blank', rel: 'noopener noreferrer' },
						'take appropriate measures'
					),
					' to protect the safety of your password, and create a way to recover your credentials if you forget them.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Do not send real Ether (ETH) to your Augur account while we are testing! Each account will be given 10,000 testnet ETH tokens for beta testing. Please note that testnet ETH has no value except for testing: it is merely an on-contract IOU (a token) for testnet Ether.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Reputation (REP) is a unique and important part of the Augur trading platform. If you own REP tokens, you must visit\n\t\t\t\t\tthe site periodically to fulfill your reporting obligations. During beta testing, each new account will\n\t\t\t\t\treceive 47 testnet REP (they have no value except for testing). Each reporting cycle will last 2 days. Every\n\t\t\t\t\ttwo-day cycle will consist of a commit phase, a reveal phase, and a challenge phase. Because the test\n\t\t\t\t\tcycle is dramatically compressed (the main net cycle will be 60 days long) it is recommended that\n\t\t\t\t\tusers visit the site at least every 2 days to maintain your REP and simulate \u201Creal money\u201D trading,\n\t\t\t\t\tresolution, and reporting conditions. Learn ',
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'a',
						{
							className: 'link',
							href: 'https://www.youtube.com/watch?v=sCms-snzHk4',
							target: '_blank',
							rel: 'noopener noreferrer'
						},
						'how Augur\'s Reputation tokens work'
					),
					'.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'A note on price/time priority on the blockchain.  The site is only as fast as Ethereum blocks are mined.  Augur\'s matching engine sorts order books by price, then by block number, then by transaction index. Within a single block, transactions are ordered by the miner who mines the block.  When constructing a block, miners typically order transactions first by gasprice (highest to lowest), and then by the order received (oldest to newest).  So, Augur\'s "price/blocknumber/transaction index priority" ordering is generally equivalent to price/time priority, if there are differing gasprices within the block, the transaction index is not guaranteed to be time-ordered.  (Presently, Augur does not attempt to adjust gasprices in response to other pending transactions, although, if desired, gasprice can be adjusted manually using the API, by changing the "gasPrice" field attached to every sendTransaction payload.)'
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'h2',
				null,
				'Technical updates:'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'h3',
				null,
				'November 30, 2016'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'ol',
				null,
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Added human-readable "label" and "description" fields to static API data.  Added "label maker" to augur-core API maker script.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'The following things are now included in the auto-generated transaction display: formatted label, description, timestamp, and gas fees.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Added a "no-relay" list to the UI, which has the names of methods for which the transaction relay should not be triggered.  This will allow the old manually-constructed "transactions" to peacefully coexist with relay-generated transactions in the transaction display.'
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'h3',
				null,
				'November 29, 2016'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'ol',
				null,
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Attached the initial transact payload and full Ethereum network response data objects to the txRelay callback argument in ethrpc.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Percentage reporting on correct outcome is now only displayed for binary markets, since we do not presently have access to this information for categorical and scalar markets.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Fixed an array indexing error in getMarketInfo function on the compositeGetters contract.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Reports are now revealed in parallel (up to 5 at a time).'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Registered sell error codes for the shortAsk method.  This fixes the bug where a short ask order would correctly fail (due to orders being "crossed"), but the transactions display would incorrectly show the short ask as successful.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Removed deprecated callbacks from augur.js.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Fixed augur.js sendEther method to correctly include an onFailed callback.'
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'h3',
				null,
				'November 28, 2016'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'ol',
				null,
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'The checkPeriod function now only looks up chain data on initial loading and when the reporting cycle phase changes.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Removed code related to the market data refresh timer, which is no longer used.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Added a generic hook for transaction callbacks to ethrpc.  The UI (or augur.js) can now register a transaction relay function that is automatically called any time any transaction is sent, succeeds, or fails.'
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'h3',
				null,
				'November 27, 2016'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'ol',
				null,
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Added answer-in-description reporting test markets for first 4 cycles on root branch.  (Example description: "Binary Reporting Test Market (Cycle 1): correct answer is Yes")'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'New testnet (Ropsten) genesis file is now bundled with augur.js.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Fixed proportion-correct display on closed-market detail page and My Reports page.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Fixed market result outcome name lookup for closed markets.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'The augur.js penaltyCatchUp sequence now calls closeMarket for all markets associated with the penalized event (instead of just extra markets beyond the first).  This may be a temporary fix, depending on how penalizeWrong on-contract method is changed.'
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'h3',
				null,
				'November 26, 2016'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'ol',
				null,
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Fixed new-branch first-reporting-cycle edge case on collectFees contract: collectFees method now always returns a value.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Renewed augur.net wildcard SSL certificate (for eth2/3/9000 servers).'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Fixed trade page warning about minLimitPrice/maxLimitPrice types.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Removed the block number restriction on best bid/ask order tracking on trades contract.  Best bid/ask now represent the best prices in any block, for a given market and outcome.  (The block number restriction is no longer necessary since the crossed-orders check simply returns an error for the later-arriving order, which is not placed on the book.)'
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'h3',
				null,
				'November 25, 2016'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'ol',
				null,
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Event IDs retrieved during composite lookups (getMarketInfo, batchGetMarketInfo, and/or getMarketsInfo) are now uniformly formatted.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Added market/event ID parser method to the static API data of several augur.js wrappers.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Combined first and second reporting test sequences into one method.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Default HTTP and websocket hosted node URLs are now attached to the ethrpc (augur.rpc) object / editable by the consumer.'
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'h3',
				null,
				'November 24, 2016'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'ol',
				null,
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Restructured augur.js tests: moved unit tests and integration tests to separate folders.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Updated UUID versions and package name in keythereum and augur.js.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Updated middleware Travis CI builds to only run on updates to the master branch.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Various fixes to augur UI unit tests.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Merged Sprinkle\'s mega-PRs!  (These include fixes/improvements made over the past week.)'
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'h3',
				null,
				'November 23, 2016'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'ol',
				null,
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Added the ability to auto-populate a trade ticket by selecting any order present in either the outcomes list or order book.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Expanded test coverage of the Augur API buy, sell, and shortAsk trade methods.'
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'h3',
				null,
				'November 22, 2016'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'ol',
				null,
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Visual indication of \'own\' orders within a market outcome\'s order book.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Improved min/max bound handling for both shares and limit price when creating a trade order.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Auto highlight behavior change to order book on market view.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Improvements to the scalar share denomination label handling.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'General improvements to Augur.js trade unit tests.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Improved test coverage of Augur.js \'buy\' method.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Added test coverage for the Augur.js \'sendReputation\' method.'
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'h3',
				null,
				'November 21, 2016'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'ol',
				null,
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Expanded and refined test coverage of the place trade action.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Updated and added additional test coverage related to the market data and outcome trade components.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Continued styling improvements to the market view.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Bug fix related to the counts presented in both the header and footer navigational items.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Improved state handling surrounding the outcome trade side selection.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Safari and Mobile Safari specific UI fixes.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Expanded and added additional selector shape coverage for market data and outcome trade selectors respectively.'
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'h3',
				null,
				'November 18, 2016'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'ol',
				null,
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'General responsive improvments including:',
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'ul',
						null,
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'li',
							null,
							'Improvements to market view components to be fully responsive.'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'li',
							null,
							'Improvements to the markets view compoenents\' existing responsiveness.'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'li',
							null,
							'Various miscellaneous UI responsiveness adjustments + improvements.'
						)
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Improved UX of header and footer navigation.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Inclusion of additonal swipe event to handle show/hide of side bar.'
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'h3',
				null,
				'November 17, 2016'
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'ol',
				null,
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'The trades contract now tracks the best bid and ask price within each block, and the buy/sell functions on the buy & sell shares contract verifies that incoming orders do not cross any previous orders in the same block.  (That is, it makes sure that bids do not exceed the best ask price and vice versa.)  If a make that would result in a crossed order is found, the later arriving order is not created, and an appropriate error message is relayed to the user.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Better handling of mobile touch events, especially pertaining to nav reveal/hide swipe events.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Additional responsive UI improvements.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'li',
					null,
					'Expanded and refined testing coverage of the short sell trading functionality.'
				)
			),
			p.marketsLink && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				__WEBPACK_IMPORTED_MODULE_1_modules_link_components_link__["a" /* default */],
				_extends({ className: 'lets-do-this-button' }, p.marketsLink),
				'Let\'s do this!'
			)
		)
	);
};

LoginMessagePage.propTypes = {
	marketsLink: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object // TODO
};

var _default = LoginMessagePage;
/* harmony default export */ exports["default"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(LoginMessagePage, 'LoginMessagePage', '/Users/li/augur/dev/augur/src/modules/login-message/components/login-message-view.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/login-message/components/login-message-view.jsx');
}();

;

/***/ }

});
//# sourceMappingURL=7.js.map