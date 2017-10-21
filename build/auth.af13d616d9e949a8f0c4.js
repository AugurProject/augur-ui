webpackJsonp([12],{

/***/ 1345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = Auth;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_helmet__ = __webpack_require__(658);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_routes_helpers_make_path__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_routes_constants_views__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_modules_routes_constants_components__ = __webpack_require__(681);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_modules_auth_components_auth_auth_styles__ = __webpack_require__(1478);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_modules_auth_components_auth_auth_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_modules_auth_components_auth_auth_styles__);











function Auth(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'section',
    { className: __WEBPACK_IMPORTED_MODULE_6_modules_auth_components_auth_auth_styles___default.a.Auth },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_1_react_helmet__["Helmet"],
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'title',
        null,
        'Authentication'
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["d" /* Route */], { exact: true, path: Object(__WEBPACK_IMPORTED_MODULE_3_modules_routes_helpers_make_path__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_4_modules_routes_constants_views__["e" /* AUTHENTICATION */]), component: __WEBPACK_IMPORTED_MODULE_5_modules_routes_constants_components__["e" /* AuthLander */] }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["d" /* Route */], { path: Object(__WEBPACK_IMPORTED_MODULE_3_modules_routes_helpers_make_path__["a" /* default */])([__WEBPACK_IMPORTED_MODULE_4_modules_routes_constants_views__["e" /* AUTHENTICATION */], __WEBPACK_IMPORTED_MODULE_4_modules_routes_constants_views__["g" /* CONNECT */]]), component: __WEBPACK_IMPORTED_MODULE_5_modules_routes_constants_components__["c" /* AuthConnect */] }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["d" /* Route */], { path: Object(__WEBPACK_IMPORTED_MODULE_3_modules_routes_helpers_make_path__["a" /* default */])([__WEBPACK_IMPORTED_MODULE_4_modules_routes_constants_views__["e" /* AUTHENTICATION */], __WEBPACK_IMPORTED_MODULE_4_modules_routes_constants_views__["h" /* CREATE */]]), component: __WEBPACK_IMPORTED_MODULE_5_modules_routes_constants_components__["d" /* AuthCreate */] })
  );
}

/***/ }),

/***/ 1478:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1479);
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
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./auth.styles.less", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js??ref--6-2!../../../../../node_modules/postcss-loader/lib/index.js!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/import-glob-loader/index.js!./auth.styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1479:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(657)(undefined);
// imports


// module
exports.push([module.i, "@font-face{font-family:FontAwesome;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1335) + ") format(\"woff\")}@font-face{font-family:icofont;font-style:normal;font-weight:400;src:url(" + __webpack_require__(1336) + ") format(\"woff\")}.qG1W5-maZqhqdgApvOR_P h1{font-weight:500;letter-spacing:.3px;text-transform:uppercase}._3DKdNZwKUdQ80OJd30EGet{min-height:100%;padding:2rem;width:100%}@media (max-width:900px){._3DKdNZwKUdQ80OJd30EGet{padding:0}}._2_FVetm0_muMWU9XCGahuR{max-width:1200px;min-height:100%}._3DKdNZwKUdQ80OJd30EGet{display:flex;justify-content:center}._2_FVetm0_muMWU9XCGahuR{align-items:flex-start;display:flex;flex:1;flex-direction:column;width:100%}.qG1W5-maZqhqdgApvOR_P{margin-top:5rem}.qG1W5-maZqhqdgApvOR_P h1{color:#fff}@media (max-width:900px){.qG1W5-maZqhqdgApvOR_P{padding-left:2em}}._2XcE14dXvZzc1Cy1aUL_PQ{display:flex;min-height:500px;width:100%}@media (max-width:900px){._2XcE14dXvZzc1Cy1aUL_PQ{flex-direction:column}}._2peygc5sxtDuwCmUFX-0j4{background:#fff;display:flex;flex:1}", ""]);

// exports
exports.locals = {
	"Auth__header": "qG1W5-maZqhqdgApvOR_P",
	"Auth": "_3DKdNZwKUdQ80OJd30EGet",
	"Auth--constrained": "_2_FVetm0_muMWU9XCGahuR",
	"Auth__content": "_2XcE14dXvZzc1Cy1aUL_PQ",
	"Auth__connections": "_2peygc5sxtDuwCmUFX-0j4"
};

/***/ })

});
//# sourceMappingURL=auth.af13d616d9e949a8f0c4.js.map