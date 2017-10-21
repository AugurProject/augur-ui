webpackJsonp([7],{

/***/ 1352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_style_sandbox_components_style_sandbox_style_sandbox_styles__ = __webpack_require__(2083);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_style_sandbox_components_style_sandbox_style_sandbox_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_modules_style_sandbox_components_style_sandbox_style_sandbox_styles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_common_components_nav_panel_nav_panel__ = __webpack_require__(1480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_common_components_nav_account_icon__ = __webpack_require__(685);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_market_components_market_card_market_card__ = __webpack_require__(2085);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











var StyleSandbox = function (_React$Component) {
  _inherits(StyleSandbox, _React$Component);

  function StyleSandbox() {
    _classCallCheck(this, StyleSandbox);

    var _this = _possibleConstructorReturn(this, (StyleSandbox.__proto__ || Object.getPrototypeOf(StyleSandbox)).call(this));

    _this.state = {
      flipNav: false
    };
    return _this;
  }

  _createClass(StyleSandbox, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var navPanelProps = {
        flipped: this.state.flipNav,
        history: this.props.history,
        items: [{ title: 'hello1', iconComponent: __WEBPACK_IMPORTED_MODULE_4_modules_common_components_nav_account_icon__["a" /* default */] }, { title: 'hello2', iconComponent: __WEBPACK_IMPORTED_MODULE_4_modules_common_components_nav_account_icon__["a" /* default */] }, { title: 'hello3', iconComponent: __WEBPACK_IMPORTED_MODULE_4_modules_common_components_nav_account_icon__["a" /* default */] }, { title: 'hello4', iconComponent: __WEBPACK_IMPORTED_MODULE_4_modules_common_components_nav_account_icon__["a" /* default */] }, { title: 'hello5', iconComponent: __WEBPACK_IMPORTED_MODULE_4_modules_common_components_nav_account_icon__["a" /* default */] }, { title: 'hello6', iconComponent: __WEBPACK_IMPORTED_MODULE_4_modules_common_components_nav_account_icon__["a" /* default */] }],
        location: this.props.location
      };

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_2_modules_style_sandbox_components_style_sandbox_style_sandbox_styles___default.a.StyleSandbox },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: __WEBPACK_IMPORTED_MODULE_2_modules_style_sandbox_components_style_sandbox_style_sandbox_styles___default.a['StyleSandbox__nav-panel-wrap'] },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_3_modules_common_components_nav_panel_nav_panel__["a" /* default */],
            navPanelProps,
            'Placeholder - content will come when appropriate component is available',
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'button',
              { onClick: function onClick() {
                  return _this2.setState({ flipNav: !_this2.state.flipNav });
                } },
              'Flip Nav'
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_modules_market_components_market_card_market_card__["a" /* default */], null)
      );
    }
  }]);

  return StyleSandbox;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

StyleSandbox.propTypes = {
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (StyleSandbox);

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

/***/ 1480:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = NavPanel;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_routes_helpers_parse_query__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_routes_helpers_make_query__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_modules_common_components_nav_panel_nav_panel_styles__ = __webpack_require__(1481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_modules_common_components_nav_panel_nav_panel_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_modules_common_components_nav_panel_nav_panel_styles__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











function makeSearch(location, param, value, isItemDefault) {
  var updatedSearch = Object(__WEBPACK_IMPORTED_MODULE_4_modules_routes_helpers_parse_query__["a" /* default */])(location.search);

  if (isItemDefault) {
    delete updatedSearch[param];
  } else {
    updatedSearch[param] = value;
  }

  return Object(__WEBPACK_IMPORTED_MODULE_5_modules_routes_helpers_make_query__["a" /* default */])(updatedSearch);
}

function NavPanel(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: __WEBPACK_IMPORTED_MODULE_6_modules_common_components_nav_panel_nav_panel_styles___default.a.NavPanel },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'aside',
      { className: __WEBPACK_IMPORTED_MODULE_6_modules_common_components_nav_panel_nav_panel_styles___default.a.NavPanel__controls },
      p.items.map(function (item) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["b" /* Link */],
          {
            key: item.title,
            className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()(__WEBPACK_IMPORTED_MODULE_6_modules_common_components_nav_panel_nav_panel_styles___default.a.NavPanel__control, _defineProperty({}, __WEBPACK_IMPORTED_MODULE_6_modules_common_components_nav_panel_nav_panel_styles___default.a['NavPanel__control--active'], p.selectedNav != null ? item.param === p.selectedNav : item.default)),
            to: {
              search: makeSearch(p.location, p.param, item.param, item.default)
            }
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_6_modules_common_components_nav_panel_nav_panel_styles___default.a.NavPanel__icon },
            item.icon
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: __WEBPACK_IMPORTED_MODULE_6_modules_common_components_nav_panel_nav_panel_styles___default.a.NavPanel__title },
            item.title
          )
        );
      })
    )
  );
}

NavPanel.propTypes = {
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  items: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired,
  param: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
};

/***/ }),

/***/ 1481:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1482);
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
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./nav-panel.styles.less", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./nav-panel.styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1482:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(657)(undefined);
// imports


// module
exports.push([module.i, "@font-face{font-family:FontAwesome;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1335) + ") format(\"woff\")}@font-face{font-family:icofont;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1336) + ") format(\"woff\")}._1YixqD6qWUw-I_Z3vH1HZB{display:flex;min-height:100%;min-width:15em}._1HyMPxQJHYlpsRmUixf-zP{display:flex;flex:1;flex-direction:column}@media (max-width:900px){._1HyMPxQJHYlpsRmUixf-zP{flex-flow:row wrap}}._3KfTOda5tSr2rDBXoiqMVf{align-items:center;background:#412468;border-bottom:1px solid #5a407e;color:#fff;cursor:pointer;display:flex;flex:1;font-size:.875rem;font-weight:300;padding:0 0 0 2rem}._3KfTOda5tSr2rDBXoiqMVf:hover{background:#5a407e}._3KfTOda5tSr2rDBXoiqMVf:last-child{border-bottom:none}@media (max-width:900px){._3KfTOda5tSr2rDBXoiqMVf{border-bottom:none;flex-basis:33%;flex-flow:column wrap;height:6em;padding:1em}}._31aqHYsCHiQPZdZ2OrVlW9{background:#5a407e}.krdmTNtHIa-stieb962aR{color:#fff;margin-right:1.5em;vertical-align:middle;width:2.25em}@media (max-width:900px){.krdmTNtHIa-stieb962aR{align-items:center;display:flex;flex:1;height:100%;justify-content:center;margin-bottom:.5em;margin-right:0}.krdmTNtHIa-stieb962aR svg{height:100%}}._10vo08CWq8bsP0Sje8tTIE{flex:1}@media (max-width:900px){._10vo08CWq8bsP0Sje8tTIE{flex:none}}", ""]);

// exports
exports.locals = {
	"NavPanel": "_1YixqD6qWUw-I_Z3vH1HZB",
	"NavPanel__controls": "_1HyMPxQJHYlpsRmUixf-zP",
	"NavPanel__control": "_3KfTOda5tSr2rDBXoiqMVf",
	"NavPanel__control--active": "_31aqHYsCHiQPZdZ2OrVlW9",
	"NavPanel__icon": "krdmTNtHIa-stieb962aR",
	"NavPanel__title": "_10vo08CWq8bsP0Sje8tTIE"
};

/***/ }),

/***/ 1688:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_utils_get_value__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_tables_market_tables_styles__ = __webpack_require__(1689);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_tables_market_tables_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_tables_market_tables_styles__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var MarketTable = function (_Component) {
  _inherits(MarketTable, _Component);

  function MarketTable() {
    _classCallCheck(this, MarketTable);

    var _this = _possibleConstructorReturn(this, (MarketTable.__proto__ || Object.getPrototypeOf(MarketTable)).call(this));

    _this.state = {};
    return _this;
  }

  _createClass(MarketTable, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var p = this.props;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'table',
        { className: __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_tables_market_tables_styles___default.a.MarketTable },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'thead',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'tr',
            { className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(__WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_tables_market_tables_styles___default.a.MarketTable__row, __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_tables_market_tables_styles___default.a.MarketTable__titlerow) },
            p.titleKeyPairs.map(function (titlePair, ind) {
              var title = titlePair[0];
              var mobileTitle = p.mobileTitles[ind];
              var mobileHide = mobileTitle === null;
              return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'th',
                {
                  className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(__WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_tables_market_tables_styles___default.a.MarketTable__title, _defineProperty({}, __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_tables_market_tables_styles___default.a['MarketTable__title--mobilehide'], mobileHide))
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { className: __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_tables_market_tables_styles___default.a['MarketTable__titlestring--desktop'] },
                  title
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { className: __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_tables_market_tables_styles___default.a['MarketTable__titlestring--mobile'] },
                  mobileTitle
                )
              );
            })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'tbody',
          null,
          p.data.map(function (dataRow) {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'tr',
              { className: __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_tables_market_tables_styles___default.a.MarketTable__row },
              p.titleKeyPairs.map(function (titlePair, ind) {
                var dataKey = titlePair[1];
                var mobileTitle = p.mobileTitles[ind];
                var mobileHide = mobileTitle === null;
                var data = void 0;
                if (dataKey === 'dialogButton') {
                  var buttonData = Object(__WEBPACK_IMPORTED_MODULE_3_utils_get_value__["a" /* default */])(dataRow, dataKey);
                  var rowDialogKey = 'dialog_' + dataRow.id + '_open';
                  var rowDialogOpen = _this2.state[rowDialogKey];
                  data = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      'button',
                      { onClick: function onClick() {
                          return _this2.setState(_defineProperty({}, rowDialogKey, true));
                        } },
                      buttonData.label
                    ),
                    rowDialogOpen && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      'div',
                      { className: __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_tables_market_tables_styles___default.a.MarketTable__rowDialog },
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_tables_market_tables_styles___default.a.MarketTable__rowDialogText },
                        buttonData.dialogText
                      ),
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_tables_market_tables_styles___default.a.MarketTable__rowDialogButtons },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                          'button',
                          {
                            onClick: function onClick() {
                              if (buttonData.confirm) buttonData.confirm();
                              _this2.setState(_defineProperty({}, rowDialogKey, false));
                            }
                          },
                          'Yes'
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                          'button',
                          { onClick: function onClick() {
                              return _this2.setState(_defineProperty({}, rowDialogKey, false));
                            } },
                          'No'
                        )
                      )
                    )
                  );
                } else {
                  data = Object(__WEBPACK_IMPORTED_MODULE_3_utils_get_value__["a" /* default */])(dataRow, dataKey);
                }

                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'td',
                  {
                    className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(__WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_tables_market_tables_styles___default.a.MarketTable__value, _defineProperty({}, __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_tables_market_tables_styles___default.a['MarketTable__value--mobilehide'], mobileHide))
                  },
                  data || ''
                );
              })
            );
          })
        )
      );
    }
  }]);

  return MarketTable;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

MarketTable.propTypes = {
  data: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.array.isRequired,
  isMobile: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool,
  titleKeyPairs: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.array.isRequired
};
/* harmony default export */ __webpack_exports__["a"] = (MarketTable);

/***/ }),

/***/ 1689:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1690);
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
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./market-tables.styles.less", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./market-tables.styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1690:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(657)(undefined);
// imports


// module
exports.push([module.i, "@font-face{font-family:FontAwesome;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1335) + ") format(\"woff\")}@font-face{font-family:icofont;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1336) + ") format(\"woff\")}.wXyv-CjuSXwwHpBTbBA5U{background-color:#fff;border:1px solid #736e89;margin:2em 0}._10pVRTSaBXC_JC5qE5R_tD{display:flex;justify-content:space-between}._2BMECxo3K5SXczqhyp5vpM{color:#a7a2b2;font-size:.75rem;font-weight:400;margin-right:2.16em;text-transform:uppercase}._3tDVveVs8N6QOWqekSqdR5{position:relative}._2WzR3B1smw2ixFWGIlxJ5S{padding:1.5rem 2rem}._29J7Q0W9LtVcRHR7pDPHCy{padding:1.5rem 1.5rem 1.0625rem}@media (max-width:600px){._3milUIcE0Je_GaSjD6V7Gc{padding-left:1rem;padding-right:1rem}}._3uZwdLdUYtZ-B7pMW4A4-d{border-spacing:0;margin-bottom:1.5rem;width:100%}._1uEfexgRPZhRNtbRDEsmFm{background:#f0eff6;color:#372e4b;font-size:1.125rem;font-weight:400;line-height:3.5rem;position:relative}._1uEfexgRPZhRNtbRDEsmFm>*{border-bottom:1px solid #dbdae1;text-align:right}._1uEfexgRPZhRNtbRDEsmFm:last-child>*{border-bottom:none}._1uEfexgRPZhRNtbRDEsmFm>:first-child{padding-left:.5rem;text-align:left;width:30%}._1uEfexgRPZhRNtbRDEsmFm>:last-child{padding-right:4.1875rem}._16bF-pwry8QTZdFGtkdbQx{background:#412468;bottom:0;color:#fff;display:flex;font-size:1.125rem;justify-content:space-between;left:0;line-height:3.5rem;padding:0 4.1875rem 0 1rem;position:absolute;right:0;top:0}._16bF-pwry8QTZdFGtkdbQx>:last-child{width:18%}._16bF-pwry8QTZdFGtkdbQx>:last-child>*{text-align:right;text-transform:uppercase;width:50%}._1JhPH97jdQUnTQjSbjJR0Y{background:none;line-height:3rem}._1JhPH97jdQUnTQjSbjJR0Y>*{border-bottom:none}.Uz6WNWCKPmcHSFnkOGwsM{color:#a7a2b2;font-size:.75rem;font-weight:400;margin:0;text-transform:uppercase}.t6bc4gTzG8-BhlPsJjsvf{display:none}@media (max-width:900px){._1uEfexgRPZhRNtbRDEsmFm{font-size:.75rem;line-height:3rem}._1uEfexgRPZhRNtbRDEsmFm>:first-child{padding-left:.75rem}._1uEfexgRPZhRNtbRDEsmFm>:last-child,._16bF-pwry8QTZdFGtkdbQx{padding-right:1rem}._34GrkJSeBxIxVTGgEptplI,._3VxRcf1QwgiQgrxvQIZ_Lc{display:none}.t6bc4gTzG8-BhlPsJjsvf{display:inline}.ukfRlK9MguVrpVM4ggq1I{display:none}}", ""]);

// exports
exports.locals = {
	"MarketCommon__container": "wXyv-CjuSXwwHpBTbBA5U",
	"MarketCommon__header": "_10pVRTSaBXC_JC5qE5R_tD",
	"MarketCommon__small-label": "_2BMECxo3K5SXczqhyp5vpM",
	"MarketCommon_description": "_3tDVveVs8N6QOWqekSqdR5",
	"MarketCommon__topcontent": "_2WzR3B1smw2ixFWGIlxJ5S",
	"MarketCommon__maincontent": "_29J7Q0W9LtVcRHR7pDPHCy",
	"MarketCommon__content": "_3milUIcE0Je_GaSjD6V7Gc",
	"MarketTable": "_3uZwdLdUYtZ-B7pMW4A4-d",
	"MarketTable__row": "_1uEfexgRPZhRNtbRDEsmFm",
	"MarketTable__rowDialog": "_16bF-pwry8QTZdFGtkdbQx",
	"MarketTable__titlerow": "_1JhPH97jdQUnTQjSbjJR0Y",
	"MarketTable__title": "Uz6WNWCKPmcHSFnkOGwsM",
	"MarketTable__titlestring--mobile": "t6bc4gTzG8-BhlPsJjsvf",
	"MarketTable__title--mobilehide": "_34GrkJSeBxIxVTGgEptplI",
	"MarketTable__titlestring--desktop": "_3VxRcf1QwgiQgrxvQIZ_Lc",
	"MarketTable__value--mobilehide": "ukfRlK9MguVrpVM4ggq1I"
};

/***/ }),

/***/ 1691:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_common_components_caret_dropdown_caret_dropdown_styles__ = __webpack_require__(1692);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_common_components_caret_dropdown_caret_dropdown_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_modules_common_components_caret_dropdown_caret_dropdown_styles__);






var CaretDropdown = function CaretDropdown(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'svg',
    {
      className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(__WEBPACK_IMPORTED_MODULE_3_modules_common_components_caret_dropdown_caret_dropdown_styles___default.a.CaretDropdown, p.className),
      transform: p.flipped ? 'rotate(180), translate(0, 4)' : ''
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'g',
      { stroke: 'none', strokeWidth: '1', fill: 'none', fillRule: 'evenodd', strokeLinecap: 'round', strokeLinejoin: 'round' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'g',
        { transform: 'translate(-1207.000000, -140.000000)', stroke: '#A7A2B2' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'g',
          { transform: 'translate(1206.000000, 134.000000)' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('polyline', { transform: 'translate(8.156854, 6.156854) rotate(-225.000000) translate(-8.156854, -6.156854) ', points: '3.65685425 1.65685425 12.6568542 1.65685425 12.6568542 10.6568542' })
        )
      )
    )
  );
};

CaretDropdown.propTypes = {
  className: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
  flipped: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool
};

/* harmony default export */ __webpack_exports__["a"] = (CaretDropdown);

/***/ }),

/***/ 1692:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1693);
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
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./caret-dropdown.styles.less", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./caret-dropdown.styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1693:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(657)(undefined);
// imports


// module
exports.push([module.i, "@font-face{font-family:FontAwesome;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1335) + ") format(\"woff\")}@font-face{font-family:icofont;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1336) + ") format(\"woff\")}.fz5Q78QxPJs16w-3wmnJp{height:13px;width:13px}.fz5Q78QxPJs16w-3wmnJp>polyline{fill:#a7a2b2}", ""]);

// exports
exports.locals = {
	"CaretDropdown": "fz5Q78QxPJs16w-3wmnJp"
};

/***/ }),

/***/ 2083:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2084);
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
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./style-sandbox.styles.less", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./style-sandbox.styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 2084:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(657)(undefined);
// imports


// module
exports.push([module.i, "._1mrRItOeYLT9gKd4HuBRnT{background:transparent}._3S8J_u7IVQlZz1t7kddb_M{padding:100px}", ""]);

// exports
exports.locals = {
	"StyleSandbox": "_1mrRItOeYLT9gKd4HuBRnT",
	"StyleSandbox__nav-panel-wrap": "_3S8J_u7IVQlZz1t7kddb_M"
};

/***/ }),

/***/ 2085:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_market_components_market_status_icon_market_status_icon__ = __webpack_require__(1396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_market_components_market_tables_market_tables__ = __webpack_require__(1688);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_common_components_caret_dropdown_caret_dropdown__ = __webpack_require__(1691);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_market_components_common_market_common_styles__ = __webpack_require__(1381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_market_components_common_market_common_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_modules_market_components_common_market_common_styles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles__ = __webpack_require__(2086);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











var MarketCard = function (_React$Component) {
  _inherits(MarketCard, _React$Component);

  function MarketCard() {
    _classCallCheck(this, MarketCard);

    var _this = _possibleConstructorReturn(this, (MarketCard.__proto__ || Object.getPrototypeOf(MarketCard)).call(this));

    _this.state = {
      tableOpen: {
        myPositions: true,
        openPositions: false
      }
    };
    return _this;
  }

  _createClass(MarketCard, [{
    key: 'toggleTable',
    value: function toggleTable(tableKey) {
      this.setState({ tableOpen: _extends({}, this.state.tableOpen, _defineProperty({}, tableKey, !this.state.tableOpen[tableKey])) });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'article',
        { className: __WEBPACK_IMPORTED_MODULE_5_modules_market_components_common_market_common_styles___default.a.MarketCommon__container },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'section',
          {
            className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(__WEBPACK_IMPORTED_MODULE_5_modules_market_components_common_market_common_styles___default.a.MarketCommon__topcontent, __WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles___default.a.MarketCard__topcontent)
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            {
              className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(__WEBPACK_IMPORTED_MODULE_5_modules_market_components_common_market_common_styles___default.a.MarketCommon__header, __WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles___default.a.MarketCard__header)
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: __WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles___default.a.MarketCard__headertext },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'span',
                { className: __WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles___default.a['MarketCard__expiration--mobile'] },
                'Expires June 31, 2017 7:00 AM'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'h1',
                { className: __WEBPACK_IMPORTED_MODULE_5_modules_market_components_common_market_common_styles___default.a.MarketCommon__description },
                'Market Title'
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_modules_market_components_market_status_icon_market_status_icon__["a" /* default */], { className: __WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles___default.a.MarketCard__statusicon, isOpen: true, isReported: true })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles___default.a.MarketCard__topstats },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: __WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles___default.a.MarketCard__leftstats },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: __WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles___default.a.MarketCard__stat },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { className: __WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles___default.a.MarketCard__statlabel },
                  'Realized P/L'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { className: __WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles___default.a.MarketCard__statvalue },
                  '0'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { className: __WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles___default.a.MarketCard__statunit },
                  'ETH'
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: __WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles___default.a.MarketCard__stat },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { className: __WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles___default.a.MarketCard__statlabel },
                  'Unrealized P/L'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { className: __WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles___default.a.MarketCard__statvalue },
                  '0'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { className: __WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles___default.a.MarketCard__statunit },
                  'ETH'
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: __WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles___default.a.MarketCard__stat },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { className: __WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles___default.a.MarketCard__statlabel },
                  'Total P/L'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { className: __WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles___default.a.MarketCard__statvalue },
                  '0'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { className: __WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles___default.a.MarketCard__statunit },
                  'ETH'
                )
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: __WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles___default.a.MarketCard__expiration },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'span',
                { className: __WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles___default.a.MarketCard__expirationlabel },
                'Expires'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'span',
                { className: __WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles___default.a.MarketCard__expirationvalue },
                'June 31, 2017 7:00 AM'
              )
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'section',
          { className: __WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles___default.a.MarketCard__tablesection },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles___default.a.MarketCard__headingcontainer },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'h1',
              { className: __WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles___default.a.MarketCard__tableheading },
              'My Positions'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'button',
              {
                className: __WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles___default.a.MarketCard__tabletoggle,
                onClick: function onClick() {
                  return _this2.toggleTable('myPositions');
                }
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_modules_common_components_caret_dropdown_caret_dropdown__["a" /* default */], { flipped: this.state.tableOpen.myPositions })
            )
          ),
          this.state.tableOpen.myPositions && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_market_components_market_tables_market_tables__["a" /* default */], {
            titles: ['Outcome', 'Quantity', 'Last Price', 'Realized P/L', 'Unrealized P/L', 'Total P/L', 'Action'],
            mobileTitles: ['Outcome', 'Qty', 'Last', null, null, 'Total P/L', 'Action'],
            data: [['Hong Kong', '10', '10', '20', '129', '129', 'Close'], ['Hong Kong', '10', '10', '20', '129', '129', 'Close']]
          }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles___default.a.MarketCard__headingcontainer },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'h1',
              { className: __WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles___default.a.MarketCard__tableheading },
              'Open Positions'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'button',
              {
                className: __WEBPACK_IMPORTED_MODULE_6_modules_market_components_market_card_market_card_styles___default.a.MarketCard__tabletoggle,
                onClick: function onClick() {
                  return _this2.toggleTable('openPositions');
                }
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_modules_common_components_caret_dropdown_caret_dropdown__["a" /* default */], { flipped: this.state.tableOpen.openPositions })
            )
          ),
          this.state.tableOpen.openPositions && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_modules_market_components_market_tables_market_tables__["a" /* default */], {
            titles: ['Outcome', 'Quantity', 'Last Price', 'Realized P/L', 'Unrealized P/L', 'Total P/L', 'Action'],
            data: [['Hong Kong', '10', '10', '20', '129', '129', 'Close'], ['Hong Kong', '10', '10', '20', '129', '129', 'Close']]
          })
        )
      );
    }
  }]);

  return MarketCard;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (MarketCard);

/***/ }),

/***/ 2086:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2087);
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
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./market-card.styles.less", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./market-card.styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 2087:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(657)(undefined);
// imports


// module
exports.push([module.i, "@font-face{font-family:FontAwesome;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1335) + ") format(\"woff\")}@font-face{font-family:icofont;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1336) + ") format(\"woff\")}._1NADHLrrexpvT_X_cYVe60{background-color:#fff;border:1px solid #736e89;margin:2em 0}._1oWZngLEgw992CW7el6s7A{display:flex;justify-content:space-between}._3N9_x0dQeutBizXKi9olOi{color:#a7a2b2;font-size:.75rem;font-weight:400;margin-right:2.16em;text-transform:uppercase}._3W73cKaxSDf9DNMcQ0Ga42{position:relative}._1dMCTX8TFUd5DAbq5_uxG4{padding:1.5rem 2rem}._32oOUYo8apTft4zO3xsDX5{padding:1.5rem 1.5rem 1.0625rem}@media (max-width:600px){._2Cmhzcfa-cyWH9KmZdlINW{padding-left:1rem;padding-right:1rem}}._3iHsQc-KXAnPEi5lEHcMIS{border-bottom:1px solid #a7a2b2;padding-bottom:.3125rem}.XLognXyqTHZyiFFb91xVr{margin-left:.4rem}._2ZnjFACWUPPO_hy6mgmG-4{display:inline-block}._9jmFrGLpcERPqaYCO7Txm{overflow:hidden;position:relative}.slBZLhPkoJCzDuFouOClH{bottom:0;margin-left:.5rem;position:absolute}.slBZLhPkoJCzDuFouOClH span{vertical-align:bottom}._2aXZuvtmZMzfs5iLMG75md{display:inline-block}._3-ZX09LRdWjexxdSk3XOnR{color:#a7a2b2;font-size:.75rem;font-weight:400;margin-right:2.16em;text-transform:uppercase}._3G9FEafT8cTfzs1ccMyRJp{bottom:-.165rem;font-size:1.5rem;margin-right:.208em;position:relative}._348CUSgFZkA2Dw6f4FhcNT{color:#412468;font-size:.875rem;margin-right:4.375rem;text-transform:uppercase}._3-ZX09LRdWjexxdSk3XOnR,._348CUSgFZkA2Dw6f4FhcNT,._3G9FEafT8cTfzs1ccMyRJp{display:inline-block}._2ekk0zr-DCUOxYJXLIIrA-{float:right;margin-right:3.75rem;text-align:right}._1FuQY_SjTFVTYYWQABUwp5{color:#a7a2b2;display:block;font-size:.75rem;font-weight:400;margin-bottom:.25rem;margin-right:0;text-transform:uppercase}._30JFT9T8rr9KIC4tKZw2xB{color:#372e4b;display:block;font-size:1rem;font-weight:300}.X8zMwRh3ujP_XnrxEgysE{display:none}._2_k_s-To1JO2QsR07tJvvk{overflow:hidden;padding:1.5rem 2rem}.v-fBwLPhXAweJCEYbhc_e{clear:both}._2OXB1y_4Oba2vPRs7Eb19T{color:#372e4b;float:left;font-size:1.125rem;font-weight:500;line-height:unset;margin:0 0 1rem;padding-left:.5rem;text-transform:uppercase}._0AVrg2ulNkQ16cyKtmAY{float:right}@media (max-width:900px){._3iHsQc-KXAnPEi5lEHcMIS{padding:1rem 1rem .625rem}.XLognXyqTHZyiFFb91xVr{margin:0}.XLognXyqTHZyiFFb91xVr h1{font-size:1.25rem;margin-bottom:.3rem}._1RxGaR4JIGyY3tUuCALLAF{height:1rem;position:relative;right:-8px;top:-8px;width:1rem}.slBZLhPkoJCzDuFouOClH{display:flex;justify-content:space-between;margin:0;position:relative}._2aXZuvtmZMzfs5iLMG75md{height:2.375rem;min-width:5rem;overflow:hidden;position:relative}._348CUSgFZkA2Dw6f4FhcNT{margin:0}._348CUSgFZkA2Dw6f4FhcNT,._3G9FEafT8cTfzs1ccMyRJp{bottom:auto;font-size:1.125rem;position:static}._3-ZX09LRdWjexxdSk3XOnR{bottom:0;font-size:.625rem;margin:0;position:absolute;white-space:nowrap}._2ekk0zr-DCUOxYJXLIIrA-{display:none}.X8zMwRh3ujP_XnrxEgysE{color:#372e4b;display:block;font-size:.625rem;font-weight:500;text-transform:uppercase}._2_k_s-To1JO2QsR07tJvvk{padding:1rem .25rem}.v-fBwLPhXAweJCEYbhc_e{padding:0 .75rem}._2OXB1y_4Oba2vPRs7Eb19T{font-size:.875rem;font-weight:500;margin-bottom:.625rem;padding:0}}", ""]);

// exports
exports.locals = {
	"MarketCommon__container": "_1NADHLrrexpvT_X_cYVe60",
	"MarketCommon__header": "_1oWZngLEgw992CW7el6s7A",
	"MarketCommon__small-label": "_3N9_x0dQeutBizXKi9olOi",
	"MarketCommon_description": "_3W73cKaxSDf9DNMcQ0Ga42",
	"MarketCommon__topcontent": "_1dMCTX8TFUd5DAbq5_uxG4",
	"MarketCommon__maincontent": "_32oOUYo8apTft4zO3xsDX5",
	"MarketCommon__content": "_2Cmhzcfa-cyWH9KmZdlINW",
	"MarketCard__topcontent": "_3iHsQc-KXAnPEi5lEHcMIS",
	"MarketCard__header": "XLognXyqTHZyiFFb91xVr",
	"MarketCard__headertext": "_2ZnjFACWUPPO_hy6mgmG-4",
	"MarketCard__topstats": "_9jmFrGLpcERPqaYCO7Txm",
	"MarketCard__leftstats": "slBZLhPkoJCzDuFouOClH",
	"MarketCard__stat": "_2aXZuvtmZMzfs5iLMG75md",
	"MarketCard__statlabel": "_3-ZX09LRdWjexxdSk3XOnR",
	"MarketCard__statvalue": "_3G9FEafT8cTfzs1ccMyRJp",
	"MarketCard__statunit": "_348CUSgFZkA2Dw6f4FhcNT",
	"MarketCard__expiration": "_2ekk0zr-DCUOxYJXLIIrA-",
	"MarketCard__expirationlabel": "_1FuQY_SjTFVTYYWQABUwp5",
	"MarketCard__expirationvalue": "_30JFT9T8rr9KIC4tKZw2xB",
	"MarketCard__expiration--mobile": "X8zMwRh3ujP_XnrxEgysE",
	"MarketCard__tablesection": "_2_k_s-To1JO2QsR07tJvvk",
	"MarketCard__headingcontainer": "v-fBwLPhXAweJCEYbhc_e",
	"MarketCard__tableheading": "_2OXB1y_4Oba2vPRs7Eb19T",
	"MarketCard__tabletoggle": "_0AVrg2ulNkQ16cyKtmAY",
	"MarketCard__statusicon": "_1RxGaR4JIGyY3tUuCALLAF"
};

/***/ })

});
//# sourceMappingURL=style-sandbox.7cecd4f050c9b39bf4fd.js.map