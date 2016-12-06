webpackJsonp([6],{

/***/ 1187:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_tooltip__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_link_components_link__ = __webpack_require__(513);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_common_components_input__ = __webpack_require__(1195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_common_components_checkbox__ = __webpack_require__(517);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var AccountPage = function (_Component) {
	_inherits(AccountPage, _Component);

	function AccountPage(props) {
		_classCallCheck(this, AccountPage);

		var _this = _possibleConstructorReturn(this, (AccountPage.__proto__ || Object.getPrototypeOf(AccountPage)).call(this, props));

		_this.handleTransfer = function () {
			return _this.__handleTransfer__REACT_HOT_LOADER__.apply(_this, arguments);
		};

		_this.loginIDCopy = function () {
			return _this.__loginIDCopy__REACT_HOT_LOADER__.apply(_this, arguments);
		};

		_this.state = {
			name: _this.props.account.name,
			editName: false,
			showFullID: false,
			msg: '',
			sendAmount: '',
			currency: 'eth',
			recipientAddress: '',
			settings: _this.props.settings
		};

		_this.handleTransfer = _this.handleTransfer.bind(_this);
		_this.loginIDCopy = _this.loginIDCopy.bind(_this);
		return _this;
	}
	// TODO -- Prop Validations


	_createClass(AccountPage, [{
		key: '__handleTransfer__REACT_HOT_LOADER__',
		value: function __handleTransfer__REACT_HOT_LOADER__(e) {
			e.preventDefault();

			var amount = this.state.sendAmount;
			var currency = this.state.currency;
			var recipient = this.state.recipientAddress;

			this.props.account.transferFunds(amount, currency, recipient);

			this.setState({
				sendAmount: '',
				currency: 'eth',
				recipientAddress: ''
			});
		}
	}, {
		key: '__loginIDCopy__REACT_HOT_LOADER__',
		value: function __loginIDCopy__REACT_HOT_LOADER__(e) {
			try {
				this.refs.fullLoginID.select(); // TODO -- verify this in UI
				document.execCommand('copy');
			} catch (err) {
				console.error(err);
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
				{ id: 'account_view' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'article',
					{ className: 'page-content' },
					p.authLink && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						__WEBPACK_IMPORTED_MODULE_3_modules_link_components_link__["a" /* default */],
						p.authLink,
						'Sign Out (Temporarily Here)'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'account-section' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'h2',
							{ className: 'heading' },
							'Credentials'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'table',
							{ className: 'account-info' },
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'tbody',
								null,
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									'tr',
									{ className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('account-info-item', { displayNone: p.account.localNode }) },
									__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
										'th',
										{ className: 'title' },
										'Account Name:'
									),
									__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
										'td',
										{ className: 'item' },
										s.editName && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_modules_common_components_input__["a" /* default */], {
											type: 'text',
											value: p.account.name,
											onChange: function onChange(name) {
												return _this2.setState({ name: name });
											}
										}),
										!s.editName && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
											'span',
											{ 'data-tip': true, 'data-for': 'edit-name-tooltip' },
											p.account.name || 'Click here to add a name.'
										),
										!s.editName && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
											'button',
											{
												'data-tip': true, 'data-for': 'change-name-tooltip',
												className: 'link', onClick: function onClick() {
													return _this2.setState({ editName: true });
												}
											},
											'(change name)'
										),
										s.editName && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
											'button',
											{
												className: 'button',
												'data-tip': true, 'data-for': 'cancel-edit-name-tooltip',
												onClick: function onClick() {
													return _this2.setState({ name: '', editName: false });
												}
											},
											'cancel'
										),
										s.editName && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
											'button',
											{
												className: 'button make',
												'data-tip': true, 'data-for': 'save-name-tooltip',
												onClick: function onClick() {
													p.account.editName(s.name);
													_this2.setState({ name: '', editName: false });
												}
											},
											'save change'
										)
									)
								),
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									'tr',
									{ className: 'account-info-item' },
									__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
										'th',
										{ className: 'title' },
										'Account Address:'
									),
									__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
										'td',
										{ className: 'item' },
										__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
											'span',
											null,
											p.account.id && p.account.id.indexOf('0x') === 0 && p.account.id.replace('0x', '')
										)
									)
								),
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									'tr',
									{ className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('account-info-item', { displayNone: p.account.localNode }) },
									__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
										'th',
										{ className: 'title' },
										'Login ID:'
									),
									__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
										'td',
										{ className: 'item' },
										!s.showFullID && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
											'span',
											null,
											p.account.prettyLoginID
										),
										s.showFullID && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('textarea', {
											ref: 'fullLoginID',
											className: 'display-full-login-id',
											value: p.account.loginID,
											readOnly: true,
											onClick: this.loginIDCopy
										}),
										__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
											'button',
											{
												className: 'link',
												onClick: function onClick() {
													_this2.setState({ showFullID: !s.showFullID });
												}
											},
											s.showFullID ? '(hide id)' : '(show full id)'
										),
										s.showFullID && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
											'button',
											{
												className: 'button',
												onClick: this.loginIDCopy
											},
											'Copy Login ID'
										)
									)
								),
								p.onAirbitzManageAccount ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									'tr',
									{ className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('account-info-item', { displayNone: p.account.localNode }) },
									__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
										'td',
										{ colSpan: '2' },
										__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
											'button',
											{ className: 'button', onClick: p.onAirbitzManageAccount },
											'Manage Airbitz Account'
										)
									)
								) : null
							)
						)
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: 'account-section' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'h2',
							{ className: 'heading' },
							'Settings'
						),
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_modules_common_components_checkbox__["a" /* default */], {
							text: 'If I own shares of every outcome in a market, automatically close out my position (1 ETH for 1 share of every outcome)',
							isChecked: s.settings.autoSellCompleteSets || p.settings.autoSellCompleteSets,
							onClick: function onClick() {
								s.settings.autoSellCompleteSets = !s.settings.autoSellCompleteSets;
								_this2.setState(s);
								p.onUpdateSettings(s.settings);
							}
						})
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('account-section') },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'account-info-item' },
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'h2',
								{ className: 'heading' },
								'Transfer Funds'
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'p',
								null,
								'You can transfer funds to another address by selecting the type of currency you would like to send and entering the address you would like to send it to. (Note: Always double check the address you intend to send funds to!)'
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'div',
								{ className: 'transfer-funds-section' },
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									'span',
									null,
									'Send:'
								),
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
									type: 'number',
									step: '0.1',
									className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('auth-input'),
									min: '0.0',
									name: 'sendAmount',
									placeholder: 'Amount to transfer',
									'data-tip': true, 'data-for': 'amount-to-transfer-tooltip',
									value: this.state.sendAmount,
									onChange: function onChange(sendAmount) {
										return _this2.setState({ sendAmount: sendAmount.target.value });
									}
								}),
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									'select',
									{
										className: 'currency-selector',
										'data-tip': true, 'data-for': 'select-currency-tooltip',
										onChange: function onChange(currency) {
											return _this2.setState({ currency: currency.target.value });
										}
									},
									__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
										'option',
										{ value: 'ETH' },
										'Ether (ETH)'
									),
									__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
										'option',
										{ value: 'real ETH' },
										'Real Ether (ETH)'
									),
									__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
										'option',
										{ value: 'REP' },
										'REP (REP)'
									)
								),
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									'span',
									null,
									'To:'
								),
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
									type: 'text',
									className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('auth-input'),
									name: 'recipientAddress',
									placeholder: 'Recipient Address',
									'data-tip': true, 'data-for': 'recipient-address-tooltip',
									value: this.state.recipientAddress,
									onChange: function onChange(recipientAddress) {
										return _this2.setState({ recipientAddress: recipientAddress.target.value });
									}
								}),
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									'button',
									{
										className: 'button make',
										onClick: this.handleTransfer
									},
									'Send Currency'
								)
							)
						)
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('account-section', { displayNone: p.account.localNode }) },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'account-info-item' },
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'h2',
								{ className: 'heading' },
								'Download Account Key File'
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'p',
								null,
								'Download your account key file. You should always save a backup of your account data somewhere safe! Remember, ',
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									'b',
									null,
									'Augur does not store any user account information and therefore has no ability to restore or recover lost accounts'
								),
								'. (Note: running a local Ethereum node? If you download your account data to your keystore folder, you can use your Augur account on your local node.)'
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'a',
								{
									className: 'button download-account',
									href: p.account.downloadAccountDataString,
									download: p.account.downloadAccountFileName
								},
								'Download Account Key File'
							)
						)
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'div',
						{ className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('account-section') },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							{ className: 'account-info-item' },
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'h2',
								{ className: 'heading' },
								'Important Information'
							),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'p',
								null,
								'Read ',
								__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
									__WEBPACK_IMPORTED_MODULE_3_modules_link_components_link__["a" /* default */],
									p.loginMessageLink,
									' important information'
								),
								' about Augur'
							)
						)
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						__WEBPACK_IMPORTED_MODULE_1_react_tooltip___default.a,
						{ id: 'edit-name-tooltip', type: 'light', effect: 'solid', place: 'top' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'span',
							{ className: 'tooltip-text' },
							'Click here to add a name to your account'
						)
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						__WEBPACK_IMPORTED_MODULE_1_react_tooltip___default.a,
						{ id: 'change-name-tooltip', type: 'light', effect: 'solid', place: 'top' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'span',
							{ className: 'tooltip-text' },
							'Click here to change your account name'
						)
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						__WEBPACK_IMPORTED_MODULE_1_react_tooltip___default.a,
						{ id: 'recipient-address-tooltip', type: 'light', effect: 'solid', place: 'top' },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'span',
							{ className: 'tooltip-text' },
							'Recipient\'s Ethereum address'
						)
					)
				)
			);
		}
	}]);

	return AccountPage;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

AccountPage.propTypes = {
	// loginMessageLink: PropTypes.object.isRequired,
	account: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object,
	settings: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object
};
var _default = AccountPage;
/* harmony default export */ exports["default"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(AccountPage, 'AccountPage', '/Users/li/augur/dev/augur/src/modules/account/components/account-view.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/account/components/account-view.jsx');
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

/***/ }

});
//# sourceMappingURL=6.js.map