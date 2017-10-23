webpackJsonp([8],{

/***/ 1349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_portfolio_components_positions_positions__ = __webpack_require__(1979);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_portfolio_components_markets_markets__ = __webpack_require__(1983);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_portfolio_components_watchlist_watchlist__ = __webpack_require__(1984);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_portfolio_components_transactions_transactions__ = __webpack_require__(1985);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_modules_routes_helpers_make_path__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_modules_routes_constants_views__ = __webpack_require__(63);












var PortfolioView = function PortfolioView(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'section',
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["d" /* Route */], { path: Object(__WEBPACK_IMPORTED_MODULE_6_modules_routes_helpers_make_path__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_7_modules_routes_constants_views__["o" /* MY_POSITIONS */]), component: __WEBPACK_IMPORTED_MODULE_2_modules_portfolio_components_positions_positions__["a" /* default */] }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["d" /* Route */], { path: Object(__WEBPACK_IMPORTED_MODULE_6_modules_routes_helpers_make_path__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_7_modules_routes_constants_views__["n" /* MY_MARKETS */]), component: __WEBPACK_IMPORTED_MODULE_3_modules_portfolio_components_markets_markets__["a" /* default */] }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["d" /* Route */], { path: Object(__WEBPACK_IMPORTED_MODULE_6_modules_routes_helpers_make_path__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_7_modules_routes_constants_views__["v" /* WATCHLIST */]), component: __WEBPACK_IMPORTED_MODULE_4_modules_portfolio_components_watchlist_watchlist__["a" /* default */] }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["d" /* Route */], { path: Object(__WEBPACK_IMPORTED_MODULE_6_modules_routes_helpers_make_path__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_7_modules_routes_constants_views__["u" /* TRANSACTIONS */]), component: __WEBPACK_IMPORTED_MODULE_5_modules_portfolio_components_transactions_transactions__["a" /* default */] })
  );
};

/* harmony default export */ __webpack_exports__["default"] = (PortfolioView);

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

/***/ 1979:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_market_components_market_portfolio_card_market_portfolio_card__ = __webpack_require__(1980);





var Positions = function Positions(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'article',
    { className: 'my-positions' },
    p.markets.map(function (market) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_modules_market_components_market_portfolio_card_market_portfolio_card__["a" /* default */], {
        key: market.id,
        market: market,
        closePositionStatus: p.closePositionStatus,
        isTradeCommitLocked: p.isTradeCommitLocked,
        scalarShareDenomination: p.scalarShareDenomination,
        orderCancellation: p.orderCancellation,
        location: p.location,
        history: p.history
      });
    })
  );
};

Positions.propTypes = {
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  markets: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired,
  isTradeCommitLocked: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  closePositionStatus: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  scalarShareDenomination: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  orderCancellation: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  registerBlockNumber: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number
};

/* harmony default export */ __webpack_exports__["a"] = (Positions);

/***/ }),

/***/ 1980:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_utils_get_value__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_status_icon_market_status_icon__ = __webpack_require__(1396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_market_components_market_tables_market_tables__ = __webpack_require__(1688);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_modules_common_components_caret_dropdown_caret_dropdown__ = __webpack_require__(1691);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_modules_market_components_common_market_common_styles__ = __webpack_require__(1381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_modules_market_components_common_market_common_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_modules_market_components_common_market_common_styles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles__ = __webpack_require__(1981);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }














var MarketPortfolioCard = function (_React$Component) {
  _inherits(MarketPortfolioCard, _React$Component);

  function MarketPortfolioCard() {
    _classCallCheck(this, MarketPortfolioCard);

    var _this = _possibleConstructorReturn(this, (MarketPortfolioCard.__proto__ || Object.getPrototypeOf(MarketPortfolioCard)).call(this));

    _this.state = {
      tableOpen: {
        myPositions: true,
        openOrders: false
      }
    };
    return _this;
  }

  _createClass(MarketPortfolioCard, [{
    key: 'toggleTable',
    value: function toggleTable(tableKey) {
      this.setState({ tableOpen: _extends({}, this.state.tableOpen, _defineProperty({}, tableKey, !this.state.tableOpen[tableKey])) });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var myPositionsSummary = Object(__WEBPACK_IMPORTED_MODULE_3_utils_get_value__["a" /* default */])(this.props, 'market.myPositionsSummary');
      var myPositionOutcomes = Object(__WEBPACK_IMPORTED_MODULE_3_utils_get_value__["a" /* default */])(this.props, 'market.myPositionOutcomes');

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'article',
        { className: __WEBPACK_IMPORTED_MODULE_7_modules_market_components_common_market_common_styles___default.a.MarketCommon__container },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'section',
          {
            className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(__WEBPACK_IMPORTED_MODULE_7_modules_market_components_common_market_common_styles___default.a.MarketCommon__topcontent, __WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles___default.a.MarketCard__topcontent)
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            {
              className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(__WEBPACK_IMPORTED_MODULE_7_modules_market_components_common_market_common_styles___default.a.MarketCommon__header, __WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles___default.a.MarketCard__header)
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: __WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles___default.a.MarketCard__headertext },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'span',
                { className: __WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles___default.a['MarketCard__expiration--mobile'] },
                'Expires June 31, 2017 7:00 AM'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'h1',
                { className: __WEBPACK_IMPORTED_MODULE_7_modules_market_components_common_market_common_styles___default.a.MarketCommon__description },
                this.props.market.description
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_modules_market_components_market_status_icon_market_status_icon__["a" /* default */], { className: __WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles___default.a.MarketCard__statusicon, isOpen: true, isReported: true })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles___default.a.MarketCard__topstats },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: __WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles___default.a.MarketCard__leftstats },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: __WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles___default.a.MarketCard__stat },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { className: __WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles___default.a.MarketCard__statlabel },
                  'Realized P/L'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { className: __WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles___default.a.MarketCard__statvalue },
                  Object(__WEBPACK_IMPORTED_MODULE_3_utils_get_value__["a" /* default */])(myPositionsSummary, 'realizedNet.formatted')
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { className: __WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles___default.a.MarketCard__statunit },
                  'ETH'
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: __WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles___default.a.MarketCard__stat },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { className: __WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles___default.a.MarketCard__statlabel },
                  'Unrealized P/L'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { className: __WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles___default.a.MarketCard__statvalue },
                  Object(__WEBPACK_IMPORTED_MODULE_3_utils_get_value__["a" /* default */])(myPositionsSummary, 'unrealizedNet.formatted')
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { className: __WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles___default.a.MarketCard__statunit },
                  'ETH'
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: __WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles___default.a.MarketCard__stat },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { className: __WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles___default.a.MarketCard__statlabel },
                  'Total P/L'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { className: __WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles___default.a.MarketCard__statvalue },
                  Object(__WEBPACK_IMPORTED_MODULE_3_utils_get_value__["a" /* default */])(myPositionsSummary, 'totalNet.formatted')
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { className: __WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles___default.a.MarketCard__statunit },
                  'ETH'
                )
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: __WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles___default.a.MarketCard__expiration },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'span',
                { className: __WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles___default.a.MarketCard__expirationlabel },
                this.props.market.endDateLabel
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'span',
                { className: __WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles___default.a.MarketCard__expirationvalue },
                Object(__WEBPACK_IMPORTED_MODULE_3_utils_get_value__["a" /* default */])(this.props.market, 'endDate.formatted')
              )
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'section',
          { className: __WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles___default.a.MarketCard__tablesection },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles___default.a.MarketCard__headingcontainer },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'h1',
              { className: __WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles___default.a.MarketCard__tableheading },
              'My Positions'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'button',
              {
                className: __WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles___default.a.MarketCard__tabletoggle,
                onClick: function onClick() {
                  return _this2.toggleTable('myPositions');
                }
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_modules_common_components_caret_dropdown_caret_dropdown__["a" /* default */], { flipped: this.state.tableOpen.myPositions })
            )
          ),
          this.state.tableOpen.myPositions && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_modules_market_components_market_tables_market_tables__["a" /* default */], {
            titleKeyPairs: [['Outcome', 'name'], ['Quantity', 'qtyShares.formatted'], ['Avg Price', 'purchasePrice.formatted'], ['Last Price', 'lastPrice.formatted'], ['Realized P/L', 'realizedNet.formatted'], ['Unrealized P/L', 'unrealizedNet.formatted'], ['Total P/L', 'totalNet.formatted'], ['Action', 'dialogButton']],
            mobileTitles: ['Outcome', 'Qty', null, 'Last', null, null, 'Total P/L', 'Action'],
            data: (myPositionOutcomes || []).map(function (outcome) {
              return _extends({}, outcome, outcome.position, {
                dialogButton: {
                  label: 'Close',
                  dialogText: 'Close position by selling ' + outcome.position.qtyShares.formatted + '\n                                 shares of ' + outcome.name + ' at ' + outcome.position.purchasePrice.formatted + ' ETH?',
                  confirm: outcome.position.closePosition
                }
              });
            })
          }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles___default.a.MarketCard__headingcontainer },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'h1',
              { className: __WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles___default.a.MarketCard__tableheading },
              'Open Orders'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'button',
              {
                className: __WEBPACK_IMPORTED_MODULE_8_modules_market_components_market_portfolio_card_market_portfolio_card_styles___default.a.MarketCard__tabletoggle,
                onClick: function onClick() {
                  return _this2.toggleTable('openOrders');
                }
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_modules_common_components_caret_dropdown_caret_dropdown__["a" /* default */], { flipped: this.state.tableOpen.openOrders })
            )
          ),
          this.state.tableOpen.openOrders && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_modules_market_components_market_tables_market_tables__["a" /* default */], {
            hideTitles: true,
            titleKeyPairs: [['Outcome', 'name'], ['Quantity', 'unmatchedShares.formatted'], ['Avg Price', 'avgPrice.formatted'], ['Last Price', null], ['Realized P/L', null], ['Unrealized P/L', null], ['Total P/L', null], ['Action', 'dialogButton']],
            mobileTitles: ['Outcome', 'Qty', null, 'Last', null, null, 'Total P/L', 'Action'],
            data: this.props.market.outcomes.reduce(function (accumulator, outcome) {
              var tempAccumulator = accumulator || [];

              outcome.userOpenOrders.forEach(function (order) {
                return tempAccumulator.push(_extends({}, order, {
                  name: outcome.name,
                  dialogButton: {
                    label: 'Close',
                    dialogText: 'Cancel order of ' + order.unmatchedShares.formatted + '\n                                   shares of ' + outcome.name + ' at ' + order.purchasePrice.formatted + ' ETH?',
                    confirm: outcome.position.closePosition
                  }
                }));
              });

              return tempAccumulator;
            })
          })
        )
      );
    }
  }]);

  return MarketPortfolioCard;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

MarketPortfolioCard.propTypes = {
  market: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object.isRequired,
  isTradeCommitLocked: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool,
  closePositionStatus: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object.isRequired,
  scalarShareDenomination: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object.isRequired,
  orderCancellation: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object.isRequired,
  orderData: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object.isRequired,
  positionData: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object.isRequired
};
/* harmony default export */ __webpack_exports__["a"] = (MarketPortfolioCard);

/***/ }),

/***/ 1981:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1982);
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
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./market-portfolio-card.styles.less", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./market-portfolio-card.styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1982:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(657)(undefined);
// imports


// module
exports.push([module.i, "@font-face{font-family:FontAwesome;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1335) + ") format(\"woff\")}@font-face{font-family:icofont;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1336) + ") format(\"woff\")}._2UwihVxwrUNtmeLi0Df28x{background-color:#fff;border:1px solid #736e89;margin:2em 0}._1WaOl05_P7p1iOXH4-HYBO{display:flex;justify-content:space-between}._2KAnvPR1747BS42lUzoq8K{color:#a7a2b2;font-size:.75rem;font-weight:400;margin-right:2.16em;text-transform:uppercase}._232s2inFPZyiLlx2oNY_LA{position:relative}._2mPNw5IrFiBASOIh5Mnxbl{padding:1.5rem 2rem}._2UPAKs5-SE_AKLUqW1DrKU{padding:1.5rem 1.5rem 1.0625rem}@media (max-width:600px){._1qIIw5hMGQjJ-tfKPEpm63{padding-left:1rem;padding-right:1rem}}._1A7pSXHImHmYEFZWcLWLOv{border-bottom:1px solid #a7a2b2;padding-bottom:.3125rem}._1ect7BaXC4g97RjbB5hwoM{margin-left:.4rem}._1BiAs8eeJyso7CrWwH6JfR{display:inline-block}._2-sJ-l5SDRvt_fAl9YvuMq{overflow:hidden;position:relative}._2NQS3ZDuqRjkhxDMJJmzi4{bottom:0;margin-left:.5rem;position:absolute}._2NQS3ZDuqRjkhxDMJJmzi4 span{vertical-align:bottom}.xMa-Tfjyd3Dcu4d5q83s8{display:inline-block}._3qNjM_psqDzby3Q6BeAIRk{color:#a7a2b2;font-size:.75rem;font-weight:400;margin-right:2.16em;text-transform:uppercase}._1gGAWHoLbPPHW6XjatUcxo{bottom:-.165rem;font-size:1.5rem;margin-right:.208em;position:relative}._2vjNhVXX2J68EAUWZQkV3r{color:#412468;font-size:.875rem;margin-right:4.375rem;text-transform:uppercase}._3qNjM_psqDzby3Q6BeAIRk,._2vjNhVXX2J68EAUWZQkV3r,._1gGAWHoLbPPHW6XjatUcxo{display:inline-block}._252H8Uu5f4KkIgd3jdLW1O{float:right;margin-right:3.75rem;text-align:right}._1hoIKZf4d6W588yedn_uwe{color:#a7a2b2;display:block;font-size:.75rem;font-weight:400;margin-bottom:.25rem;margin-right:0;text-transform:uppercase}.fXxNOxZT-csgxcghfNJx6{color:#372e4b;display:block;font-size:1rem;font-weight:300}.KWEgLOjcy6It_Wvml4i2p{display:none}._2ryCyucd5X2l4NgghyMbwk{overflow:hidden;padding:1.5rem 2rem}._2q_sBfvYtAe92XBeV2GoqP{clear:both}._3108LNpmV7RHF8R7644pTj{color:#372e4b;float:left;font-size:1.125rem;font-weight:500;line-height:unset;margin:0 0 1rem;padding-left:.5rem;text-transform:uppercase}.c0-8KB8_JxJp188Rg4WC9{float:right}@media (max-width:900px){._1A7pSXHImHmYEFZWcLWLOv{padding:1rem 1rem .625rem}._1ect7BaXC4g97RjbB5hwoM{margin:0}._1ect7BaXC4g97RjbB5hwoM h1{font-size:1.25rem;margin-bottom:.3rem}._2zEr-WT2Z3_NuKFXYaFQxV{height:1rem;position:relative;right:-8px;top:-8px;width:1rem}._2NQS3ZDuqRjkhxDMJJmzi4{display:flex;justify-content:space-between;margin:0;position:relative}.xMa-Tfjyd3Dcu4d5q83s8{height:2.375rem;min-width:5rem;overflow:hidden;position:relative}._2vjNhVXX2J68EAUWZQkV3r{margin:0}._2vjNhVXX2J68EAUWZQkV3r,._1gGAWHoLbPPHW6XjatUcxo{bottom:auto;font-size:1.125rem;position:static}._3qNjM_psqDzby3Q6BeAIRk{bottom:0;font-size:.625rem;margin:0;position:absolute;white-space:nowrap}._252H8Uu5f4KkIgd3jdLW1O{display:none}.KWEgLOjcy6It_Wvml4i2p{color:#372e4b;display:block;font-size:.625rem;font-weight:500;text-transform:uppercase}._2ryCyucd5X2l4NgghyMbwk{padding:1rem .25rem}._2q_sBfvYtAe92XBeV2GoqP{padding:0 .75rem}._3108LNpmV7RHF8R7644pTj{font-size:.875rem;font-weight:500;margin-bottom:.625rem;padding:0}}", ""]);

// exports
exports.locals = {
	"MarketCommon__container": "_2UwihVxwrUNtmeLi0Df28x",
	"MarketCommon__header": "_1WaOl05_P7p1iOXH4-HYBO",
	"MarketCommon__small-label": "_2KAnvPR1747BS42lUzoq8K",
	"MarketCommon_description": "_232s2inFPZyiLlx2oNY_LA",
	"MarketCommon__topcontent": "_2mPNw5IrFiBASOIh5Mnxbl",
	"MarketCommon__maincontent": "_2UPAKs5-SE_AKLUqW1DrKU",
	"MarketCommon__content": "_1qIIw5hMGQjJ-tfKPEpm63",
	"MarketCard__topcontent": "_1A7pSXHImHmYEFZWcLWLOv",
	"MarketCard__header": "_1ect7BaXC4g97RjbB5hwoM",
	"MarketCard__headertext": "_1BiAs8eeJyso7CrWwH6JfR",
	"MarketCard__topstats": "_2-sJ-l5SDRvt_fAl9YvuMq",
	"MarketCard__leftstats": "_2NQS3ZDuqRjkhxDMJJmzi4",
	"MarketCard__stat": "xMa-Tfjyd3Dcu4d5q83s8",
	"MarketCard__statlabel": "_3qNjM_psqDzby3Q6BeAIRk",
	"MarketCard__statvalue": "_1gGAWHoLbPPHW6XjatUcxo",
	"MarketCard__statunit": "_2vjNhVXX2J68EAUWZQkV3r",
	"MarketCard__expiration": "_252H8Uu5f4KkIgd3jdLW1O",
	"MarketCard__expirationlabel": "_1hoIKZf4d6W588yedn_uwe",
	"MarketCard__expirationvalue": "fXxNOxZT-csgxcghfNJx6",
	"MarketCard__expiration--mobile": "KWEgLOjcy6It_Wvml4i2p",
	"MarketCard__tablesection": "_2ryCyucd5X2l4NgghyMbwk",
	"MarketCard__headingcontainer": "_2q_sBfvYtAe92XBeV2GoqP",
	"MarketCard__tableheading": "_3108LNpmV7RHF8R7644pTj",
	"MarketCard__tabletoggle": "c0-8KB8_JxJp188Rg4WC9",
	"MarketCard__statusicon": "_2zEr-WT2Z3_NuKFXYaFQxV"
};

/***/ }),

/***/ 1983:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


/* harmony default export */ __webpack_exports__["a"] = (function () {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', null);
});

/***/ }),

/***/ 1984:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


/* harmony default export */ __webpack_exports__["a"] = (function () {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', null);
});

/***/ }),

/***/ 1985:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


/* harmony default export */ __webpack_exports__["a"] = (function () {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', null);
});

/***/ })

});
//# sourceMappingURL=portfolio.e9c7f5703616e4494596.js.map