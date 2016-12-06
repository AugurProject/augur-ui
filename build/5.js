webpackJsonp([5],{

/***/ 1191:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_auth_components_auth_form__ = __webpack_require__(1238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_link_components_link__ = __webpack_require__(514);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var AuthPage = function (_React$Component) {
	_inherits(AuthPage, _React$Component);

	function AuthPage() {
		_classCallCheck(this, AuthPage);

		return _possibleConstructorReturn(this, (AuthPage.__proto__ || Object.getPrototypeOf(AuthPage)).apply(this, arguments));
	}

	_createClass(AuthPage, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.props.authForm.airbitzOnLoad.onLoad();
		}
	}, {
		key: 'render',
		value: function render() {
			var p = this.props;
			return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'section',
				{ id: 'auth_view' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'header',
					{ className: 'page-header' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'span',
						{ className: 'big-line' },
						'Augur is a completely decentralized system'
					),
					' including user accounts. Your credentials never leave the browser, and you are responsible for keeping them safe.',
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'b',
						null,
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'i',
							{ className: 'negative' },
							'It is impossible to recover your account if your credentials get lost!'
						)
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
					'Click\xA0',
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						__WEBPACK_IMPORTED_MODULE_3_modules_link_components_link__["a" /* default */],
						{
							className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()('airbitz-button'),
							onClick: p.authForm.airbitzLink.onClick
						},
						p.authForm.airbitzLinkText
					),
					'\xA0to create an encrypted and backed up account using a simple username and password.'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_modules_auth_components_auth_form__["a" /* default */], _extends({ className: 'auth-form' }, p.authForm))
			);
		}
	}]);

	return AuthPage;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

AuthPage.propTypes = {
	className: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
	authForm: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object
};

var _default = AuthPage;
/* harmony default export */ exports["default"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(AuthPage, 'AuthPage', '/Users/li/augur/dev/augur/src/modules/auth/components/auth-view.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/auth/components/auth-view.jsx');
}();

;

/***/ },

/***/ 1238:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_tooltip__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_link_components_link__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_common_components_checkbox__ = __webpack_require__(518);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var AuthForm = function (_Component) {
	_inherits(AuthForm, _Component);

	function AuthForm(props) {
		_classCallCheck(this, AuthForm);

		var _this = _possibleConstructorReturn(this, (AuthForm.__proto__ || Object.getPrototypeOf(AuthForm)).call(this, props));

		_this.handleSubmit = function () {
			return _this.__handleSubmit__REACT_HOT_LOADER__.apply(_this, arguments);
		};

		_this.handlePasswordInput = function () {
			return _this.__handlePasswordInput__REACT_HOT_LOADER__.apply(_this, arguments);
		};

		_this.loginIDCopy = function () {
			return _this.__loginIDCopy__REACT_HOT_LOADER__.apply(_this, arguments);
		};

		_this.handleSubmit = _this.handleSubmit.bind(_this);
		_this.handlePasswordInput = _this.handlePasswordInput.bind(_this);
		_this.loginIDCopy = _this.loginIDCopy.bind(_this);
		if (new FileReader()) {
			_this.fileReader = new FileReader();
		}
		_this.state = {
			msg: _this.props.msg,
			loginID: undefined,
			rememberMe: _this.props.rememberMe,
			disableInputs: false,
			loginAccount: {},
			submitDisabled: props.type === 'register'
		};
		return _this;
	}

	_createClass(AuthForm, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			this.setState({ msg: nextProps.msg });
		}
	}, {
		key: '__handleSubmit__REACT_HOT_LOADER__',
		value: function __handleSubmit__REACT_HOT_LOADER__(e) {
			var _this2 = this;

			e.preventDefault();
			e.stopPropagation();

			var name = this.refs.accountName.value;
			var loginID = this.refs.loginID.value;
			var password = this.refs.password.value;
			var password2 = this.refs.password2.value;
			var rememberMe = this.state.rememberMe;
			var loginAccount = this.state.loginAccount;
			var file = this.refs.form[1].files[0] !== undefined;

			if (this.props.type === 'import' && file && this.fileReader) {
				this.fileReader.readAsText(this.refs.form[1].files[0]);
				this.fileReader.onload = function (e) {
					var importAccount = JSON.parse(e.target.result);
					setTimeout(function () {
						return _this2.props.onSubmit(name, password, password2, loginID, rememberMe, importAccount, loginAccount, undefined);
					}, 300);
				};
			} else {
				setTimeout(function () {
					return _this2.props.onSubmit(name, password, password2, loginID, rememberMe, undefined, loginAccount, undefined);
				}, 300);
			}
			this.setState({ msg: '', loginID: undefined, disableInputs: false });
			return false;
		}
	}, {
		key: '__handlePasswordInput__REACT_HOT_LOADER__',
		value: function __handlePasswordInput__REACT_HOT_LOADER__(e) {
			var _this3 = this;

			e.preventDefault();
			e.stopPropagation();
			var name = this.refs.accountName.value;
			var loginID = this.refs.loginID.value;
			var password = this.refs.password.value;
			var password2 = this.refs.password2.value;
			var rememberMe = this.state.rememberMe;

			if (password !== '' && password2 !== '' && password.length === password2.length) {
				setTimeout(function () {
					return _this3.props.onSubmit(name, password, password2, loginID, rememberMe, undefined, undefined, function (loginAccount) {
						_this3.setState({ loginID: loginAccount.loginID, disableInputs: true, loginAccount: loginAccount, submitDisabled: false });
					});
				}, 300);
			}
		}
	}, {
		key: '__loginIDCopy__REACT_HOT_LOADER__',
		value: function __loginIDCopy__REACT_HOT_LOADER__(e) {
			var loginIDDisplay = this.refs.loginIDDisplay;

			try {
				loginIDDisplay.select();
				document.execCommand('copy');
			} catch (err) {
				console.log(err);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var p = this.props;
			var s = this.state;
			var submitDisabled = p.type === 'login' ? false : s.submitDisabled;

			return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'form',
				{ ref: 'form', className: p.className, onSubmit: this.handleSubmit, encType: 'multipart/form-data', autoComplete: true },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'h1',
					{ className: 'title' },
					p.title,
					p.topLinkText && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						__WEBPACK_IMPORTED_MODULE_3_modules_link_components_link__["a" /* default */],
						{
							className: 'top-link',
							href: p.topLink.href,
							onClick: p.topLink.onClick
						},
						p.topLinkText
					)
				),
				p.instruction && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'p',
					{ className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('instruction') },
					p.instruction
				),
				s.msg && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'span',
					{ className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('msg', p.msgClass) },
					s.msg
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
					ref: 'accountName',
					className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('auth-input', { displayNone: !p.isVisibleName }),
					type: 'text',
					placeholder: 'account name',
					maxLength: '30',
					autoFocus: 'autofocus',
					disabled: s.disableInputs
				}),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
					name: 'importAccount',
					className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('auth-input', { displayNone: !p.isVisibleFileInput }),
					type: 'file',
					placeholder: 'Import Account',
					autoFocus: 'autofocus'
				}),
				p.loginID && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('textarea', { ref: 'loginIDDisplay', className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('loginID-generated'), readOnly: true, value: p.loginID, onClick: this.loginIDCopy }),
				p.loginID && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'button',
					{ type: 'button', className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('button submit-button'), onClick: this.loginIDCopy },
					'Copy Login ID'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
					name: 'username',
					id: 'username',
					ref: 'loginID',
					className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('auth-input', { displayNone: !p.isVisibleID }),
					type: 'text',
					placeholder: 'Login ID',
					autoFocus: 'autofocus',
					autoComplete: true,
					onChange: function onChange(loginID) {
						return _this4.setState({ loginID: loginID });
					},
					required: p.isVisibleID
				}),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
					name: 'password',
					id: 'password',
					ref: 'password',
					className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('auth-input', { displayNone: !p.isVisiblePassword }),
					type: 'password',
					defaultValue: p.password,
					placeholder: p.passwordPlaceholder || 'password (must be at least 6 characters in length)',
					maxLength: '256',
					required: p.isVisiblePassword,
					autoComplete: true,
					disabled: s.disableInputs,
					onChange: this.handlePasswordInput
				}),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
					ref: 'password2',
					className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('auth-input', { displayNone: !p.isVisiblePassword2 }),
					type: 'password',
					placeholder: p.password2Placeholder || 'confirm password',
					maxLength: '256',
					required: p.isVisiblePassword2,
					disabled: s.disableInputs,
					onChange: this.handlePasswordInput
				}),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('instruction', { displayNone: !p.isVisibleRememberMe }) },
					'Select \u201Cremember me\u201D to save your account and login automatically next time. (this will only remember your account on this device.)'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('bottom-container') },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						__WEBPACK_IMPORTED_MODULE_3_modules_link_components_link__["a" /* default */],
						{
							className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('bottom-link', { displayNone: !p.bottomLink }),
							href: p.bottomLink.href,
							onClick: p.bottomLink.onClick
						},
						p.bottomLinkText
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_modules_common_components_checkbox__["a" /* default */], {
						className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()({ displayNone: !p.isVisibleRememberMe }),
						'data-tip': true, 'data-for': 'remember-me-tooltip',
						text: 'Remember Me',
						isChecked: s.rememberMe,
						onClick: function onClick() {
							return _this4.setState({ rememberMe: !s.rememberMe });
						}
					})
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
					className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('button', 'submit-button', p.submitButtonClass),
					type: 'submit',
					value: p.submitButtonText,
					disabled: submitDisabled
				}),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					__WEBPACK_IMPORTED_MODULE_3_modules_link_components_link__["a" /* default */],
					{
						className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('airbitz-button airbitz-button-bottom'),
						onClick: p.airbitzLink.onClick
					},
					p.airbitzLinkText
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					__WEBPACK_IMPORTED_MODULE_3_modules_link_components_link__["a" /* default */],
					{
						type: 'button',
						className: 'button x-button unstyled',
						'data-tip': true, 'data-for': 'close-link-tooltip',
						href: p.closeLink.href,
						onClick: p.closeLink.onClick
					},
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'i',
						null,
						'\uF057'
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					__WEBPACK_IMPORTED_MODULE_1_react_tooltip___default.a,
					{ id: 'remember-me-tooltip', type: 'light', effect: 'solid', place: 'top' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'span',
						{ className: 'tooltip-text' },
						'Click here to save your account information in your browser\'s local storage.'
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					__WEBPACK_IMPORTED_MODULE_1_react_tooltip___default.a,
					{ id: 'close-link-tooltip', type: 'light', effect: 'solid', place: 'top' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'span',
						{ className: 'tooltip-text' },
						'Back to Markets Page'
					)
				)
			);
		}
	}]);

	return AuthForm;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

AuthForm.propTypes = {
	className: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
	title: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
	loginID: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
	type: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
	rememberMe: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool,
	passwordPlaceholder: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
	password2Placeholder: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
	instruction: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
	isVisibleName: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool,
	isVisiblePassword: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool,
	isVisiblePassword2: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool,
	isVisibleID: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool,
	isVisibleFileInput: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool,
	isVisibleRememberMe: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool,
	msg: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
	msgClass: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
	topLinkText: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
	topLink: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object,
	botttomLinkText: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
	botttomLink: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object,
	closeLink: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object,
	submitButtonText: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
	submitButtonClass: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
	onSubmit: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func
};
AuthForm.defaultProps = {
	rememberMe: true
};
var _default = AuthForm;
/* harmony default export */ exports["a"] = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(AuthForm, 'AuthForm', '/Users/li/augur/dev/augur/src/modules/auth/components/auth-form.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/li/augur/dev/augur/src/modules/auth/components/auth-form.jsx');
}();

;

/***/ }

});
//# sourceMappingURL=5.js.map