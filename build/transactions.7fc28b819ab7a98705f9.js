webpackJsonp([2],{

/***/ 1472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_transactions_view__ = __webpack_require__(1754);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__selectors_transactions__ = __webpack_require__(1604);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_selectors_login_account__ = __webpack_require__(738);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth_actions_load_account_history__ = __webpack_require__(735);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__actions_trigger_transactions_export__ = __webpack_require__(1548);









var mapStateToProps = function mapStateToProps(state) {
  return {
    branch: state.branch,
    currentBlockNumber: state.blockchain.currentBlockNumber,
    loginAccount: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__auth_selectors_login_account__["a" /* selectLoginAccount */])(state),
    transactions: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__selectors_transactions__["a" /* selectTransactions */])(state),
    transactionsLoading: state.transactionsLoading,
    hasAllTransactionsLoaded: state.transactionsOldestLoadedBlock === state.loginAccount.registerBlockNumber,
    isMobile: state.isMobile
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    loadMoreTransactions: function loadMoreTransactions() {
      return dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__auth_actions_load_account_history__["a" /* loadAccountHistory */])());
    },
    loadAllTransactions: function loadAllTransactions() {
      return dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__auth_actions_load_account_history__["a" /* loadAccountHistory */])(true));
    },
    triggerTransactionsExport: function triggerTransactionsExport() {
      return dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__actions_trigger_transactions_export__["a" /* triggerTransactionsExport */])());
    }
  };
};

var Transactions = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["b" /* withRouter */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react_redux__["b" /* connect */])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_2__components_transactions_view__["a" /* default */]));

/* harmony default export */ __webpack_exports__["default"] = (Transactions);

/***/ }),

/***/ 1473:
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),

/***/ 1474:
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),

/***/ 1475:
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(1522)
  , defined = __webpack_require__(1499);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),

/***/ 1477:
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(1481)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),

/***/ 1478:
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(1474)
  , core      = __webpack_require__(1473)
  , ctx       = __webpack_require__(1519)
  , hide      = __webpack_require__(1482)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),

/***/ 1479:
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),

/***/ 1480:
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(1484)
  , IE8_DOM_DEFINE = __webpack_require__(1521)
  , toPrimitive    = __webpack_require__(1511)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(1477) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),

/***/ 1481:
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),

/***/ 1482:
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(1480)
  , createDesc = __webpack_require__(1489);
module.exports = __webpack_require__(1477) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),

/***/ 1483:
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(1508)('wks')
  , uid        = __webpack_require__(1490)
  , Symbol     = __webpack_require__(1474).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),

/***/ 1484:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1485);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),

/***/ 1485:
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),

/***/ 1486:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(1526)
  , enumBugKeys = __webpack_require__(1500);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),

/***/ 1488:
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),

/***/ 1489:
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),

/***/ 1490:
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),

/***/ 1491:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


var Spinner = function Spinner() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "article",
    { className: "spinner-container" },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: "spinner" })
  );
};

/* harmony default export */ __webpack_exports__["a"] = (Spinner);

/***/ }),

/***/ 1495:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),

/***/ 1496:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(1552);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),

/***/ 1497:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(1555);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(1551);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(1517);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),

/***/ 1498:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(1517);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),

/***/ 1499:
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),

/***/ 1500:
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),

/***/ 1501:
/***/ (function(module, exports) {

module.exports = {};

/***/ }),

/***/ 1502:
/***/ (function(module, exports) {

module.exports = true;

/***/ }),

/***/ 1503:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(1484)
  , dPs         = __webpack_require__(1578)
  , enumBugKeys = __webpack_require__(1500)
  , IE_PROTO    = __webpack_require__(1507)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(1520)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(1571).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ 1504:
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(1488)
  , createDesc     = __webpack_require__(1489)
  , toIObject      = __webpack_require__(1475)
  , toPrimitive    = __webpack_require__(1511)
  , has            = __webpack_require__(1479)
  , IE8_DOM_DEFINE = __webpack_require__(1521)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(1477) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),

/***/ 1505:
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),

/***/ 1506:
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(1480).f
  , has = __webpack_require__(1479)
  , TAG = __webpack_require__(1483)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),

/***/ 1507:
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(1508)('keys')
  , uid    = __webpack_require__(1490);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),

/***/ 1508:
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1474)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),

/***/ 1509:
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),

/***/ 1510:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(1499);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),

/***/ 1511:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(1485);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),

/***/ 1512:
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(1474)
  , core           = __webpack_require__(1473)
  , LIBRARY        = __webpack_require__(1502)
  , wksExt         = __webpack_require__(1513)
  , defineProperty = __webpack_require__(1480).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),

/***/ 1513:
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(1483);

/***/ }),

/***/ 1515:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(1550);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),

/***/ 1516:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

/***/ }),

/***/ 1517:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(1557);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(1556);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),

/***/ 1518:
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),

/***/ 1519:
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(1567);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),

/***/ 1520:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1485)
  , document = __webpack_require__(1474).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),

/***/ 1521:
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(1477) && !__webpack_require__(1481)(function(){
  return Object.defineProperty(__webpack_require__(1520)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),

/***/ 1522:
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(1518);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),

/***/ 1523:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(1502)
  , $export        = __webpack_require__(1478)
  , redefine       = __webpack_require__(1528)
  , hide           = __webpack_require__(1482)
  , has            = __webpack_require__(1479)
  , Iterators      = __webpack_require__(1501)
  , $iterCreate    = __webpack_require__(1573)
  , setToStringTag = __webpack_require__(1506)
  , getPrototypeOf = __webpack_require__(1525)
  , ITERATOR       = __webpack_require__(1483)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),

/***/ 1524:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(1526)
  , hiddenKeys = __webpack_require__(1500).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),

/***/ 1525:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(1479)
  , toObject    = __webpack_require__(1510)
  , IE_PROTO    = __webpack_require__(1507)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),

/***/ 1526:
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(1479)
  , toIObject    = __webpack_require__(1475)
  , arrayIndexOf = __webpack_require__(1569)(false)
  , IE_PROTO     = __webpack_require__(1507)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),

/***/ 1527:
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(1478)
  , core    = __webpack_require__(1473)
  , fails   = __webpack_require__(1481);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),

/***/ 1528:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1482);

/***/ }),

/***/ 1529:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(1498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_get__ = __webpack_require__(1558);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(1497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);





var enhancer = function enhancer(WrappedComponent) {
  return function (_WrappedComponent) {
    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Progress, _WrappedComponent);

    function Progress() {
      __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Progress);

      return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Progress.__proto__ || Object.getPrototypeOf(Progress)).apply(this, arguments));
    }

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Progress, [{
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        var now = Date.now();
        this.path.style.transitionDuration = '0.3s, 0.3s';
        if (this.prevTimeStamp && now - this.prevTimeStamp < 100) {
          this.path.style.transitionDuration = '0s, 0s';
        }
        this.prevTimeStamp = Date.now();
      }
    }, {
      key: 'render',
      value: function render() {
        return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_get___default()(Progress.prototype.__proto__ || Object.getPrototypeOf(Progress.prototype), 'render', this).call(this);
      }
    }]);

    return Progress;
  }(WrappedComponent);
};

/* harmony default export */ __webpack_exports__["a"] = (enhancer);

/***/ }),

/***/ 1530:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return defaultProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return propTypes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);


var defaultProps = {
  className: '',
  percent: 0,
  prefixCls: 'rc-progress',
  strokeColor: '#2db7f5',
  strokeLinecap: 'round',
  strokeWidth: 1,
  style: {},
  trailColor: '#D9D9D9',
  trailWidth: 1
};

var propTypes = {
  className: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  percent: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.number, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string]),
  prefixCls: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  strokeColor: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  strokeLinecap: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOf(['butt', 'round', 'square']),
  strokeWidth: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.number, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string]),
  style: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.object,
  trailColor: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  trailWidth: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.number, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string])
};

/***/ }),

/***/ 1537:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_tooltip__ = __webpack_require__(730);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rc_progress__ = __webpack_require__(1600);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_components_bullet__ = __webpack_require__(1538);







var Branch = function Branch(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'article',
    { className: 'branch-info' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_rc_progress__["a" /* Line */], {
      percent: p.currentReportingPeriodPercentComplete,
      strokeWidth: '1',
      strokeColor: '#5c2634'
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'span',
      { className: 'reporting-cycle-info' },
      'Reporting Period ',
      p.currentReportingWindowAddress,
      ' ',
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__common_components_bullet__["a" /* default */], null),
      ' ',
      Math.round(p.currentReportingPeriodPercentComplete),
      '% complete ',
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__common_components_bullet__["a" /* default */], null),
      ' period ends ',
      p.reportingCycleTimeRemaining
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
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__common_components_bullet__["a" /* default */], null),
      ' ',
      p.reportingPeriodDurationInSeconds / 3600,
      ' hours per period'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_2_react_tooltip___default.a,
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
  className: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  description: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  reportingPeriodDurationInSeconds: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  reportingCycleTimeRemaining: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  currentReportingPeriodPercentComplete: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number
};

/* harmony default export */ __webpack_exports__["a"] = (Branch);

/***/ }),

/***/ 1538:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


var Bullet = function Bullet() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'span',
    null,
    '\xB7'
  );
};

/* harmony default export */ __webpack_exports__["a"] = (Bullet);

/***/ }),

/***/ 1539:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_helpers_parse_query__ = __webpack_require__(727);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_helpers_make_query__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_constants_param_names__ = __webpack_require__(523);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var Paginator = function (_Component) {
  _inherits(Paginator, _Component);

  function Paginator(props) {
    _classCallCheck(this, Paginator);

    var _this = _possibleConstructorReturn(this, (Paginator.__proto__ || Object.getPrototypeOf(Paginator)).call(this, props));

    _this.state = {
      currentPage: null,
      lastPage: null,
      lowerBound: null,
      upperBound: null,
      backQuery: null,
      forwardQuery: null,
      totalItems: null
    };

    _this.setCurrentSegment = _this.setCurrentSegment.bind(_this);
    return _this;
  }

  _createClass(Paginator, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setCurrentSegment({
        lastPage: this.state.currentPage,
        lastLowerBound: this.state.lowerBound,
        lastUpperBound: this.state.upperBound,
        itemsLength: this.props.itemsLength,
        itemsPerPage: this.props.itemsPerPage,
        location: this.props.location,
        history: this.props.history,
        setSegment: this.props.setSegment
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.itemsLength !== nextProps.itemsLength || this.props.itemsPerPage !== nextProps.itemsPerPage || this.props.location !== nextProps.location) {
        this.setCurrentSegment({
          lastPage: this.state.currentPage,
          lastLowerBound: this.state.lowerBound,
          lastUpperBound: this.state.upperBound,
          itemsLength: nextProps.itemsLength,
          itemsPerPage: nextProps.itemsPerPage,
          location: nextProps.location,
          history: nextProps.history,
          setSegment: nextProps.setSegment
        });
      }
    }
  }, {
    key: 'setCurrentSegment',
    value: function setCurrentSegment(options) {
      if (!options.itemsLength) return options.setSegment([]);

      var currentPage = parseInt(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__app_helpers_parse_query__["a" /* default */])(options.location.search)[__WEBPACK_IMPORTED_MODULE_5__app_constants_param_names__["h" /* PAGINATION_PARAM_NAME */]] || 1, 10);
      var lastPage = Math.ceil(options.itemsLength / options.itemsPerPage);

      // Pagination Direction
      // NOTE --  By deriving pagination direction, we can accomodate pages of results with varying length
      //          Example: First page has a 'hero' row of results
      //  -1 === Moving Down
      //  0 === No Movement
      //  1 === Moving Up
      var direction = void 0;
      if (options.lastPage === currentPage || options.lastPage == null) {
        direction = 0;
      } else if (options.lastPage < currentPage) {
        direction = 1;
      } else {
        direction = -1;
      }

      //  Segment Bounds (Blech, first round reasoning through)
      //  NOTE -- Bounds are one based
      //          Bounds are established thusly to accomodate deep linking + asymetric page lengths
      //    Rough Bounds Establishment
      //      Lower Bound
      var lowerBound = void 0;
      // If no last, do a simple check against itemsPerPage
      if (options.lastLowerBound === null) {
        if (currentPage === 1) {
          lowerBound = 1;
        } else {
          lowerBound = (currentPage - 1) * options.itemsPerPage + 1;
        }
        // If last, derive from previous bounds
      } else if (currentPage === 1) {
        lowerBound = 1;
      } else if (direction === 0) {
        lowerBound = options.lastLowerBound;
      } else if (direction === 1) {
        lowerBound = options.lastUpperBound + 1;
      } else {
        lowerBound = options.lastLowerBound - options.itemsPerPage;
      }

      // In case page is out of bounds, redirect
      if (currentPage !== 1 && lowerBound > options.itemsLength) {
        var updatedSearch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__app_helpers_parse_query__["a" /* default */])(options.location.search);
        delete updatedSearch[__WEBPACK_IMPORTED_MODULE_5__app_constants_param_names__["h" /* PAGINATION_PARAM_NAME */]];
        updatedSearch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__app_helpers_make_query__["a" /* default */])(updatedSearch);

        options.history.replace(_extends({}, options.location, {
          search: updatedSearch
        }));
        return;
      }

      //      Upper Bound
      var upperBound = void 0;
      // If no last, do a simple check against itemsPerPage
      if (options.lastUpperBound === null) {
        if (options.itemsLength < options.itemsPerPage || currentPage * options.itemsPerPage > options.itemsLength) {
          upperBound = options.itemsLength;
        } else {
          upperBound = currentPage * options.itemsPerPage;
        }
        // If last, derive from previous bounds
      } else if (options.itemsLength < options.itemsPerPage || currentPage * options.itemsPerPage > options.itemsLength) {
        upperBound = options.itemsLength;
      } else if (direction === 0) {
        upperBound = options.lastUpperBound;
      } else if (direction === 1) {
        upperBound = options.lastUpperBound + options.itemsPerPage;
      } else {
        upperBound = options.lastLowerBound - 1;
      }

      //    Precise Bounds Establishment (refinment of bounds)
      //      Lower Bound
      if (lowerBound <= 0) lowerBound = 1;
      //      Upper Bound
      if (upperBound - lowerBound !== options.itemsPerPage) {
        upperBound = lowerBound - 1 + options.itemsPerPage;
      }
      if (upperBound > options.itemsLength) {
        upperBound = options.itemsLength;
      }

      //  Link Query Params
      //    Back
      var backQuery = void 0;
      if (currentPage === 1 || currentPage - 1 === 1) {
        var queryParams = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__app_helpers_parse_query__["a" /* default */])(options.location.search);
        delete queryParams[__WEBPACK_IMPORTED_MODULE_5__app_constants_param_names__["h" /* PAGINATION_PARAM_NAME */]];
        backQuery = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__app_helpers_make_query__["a" /* default */])(queryParams);
      } else {
        var _queryParams = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__app_helpers_parse_query__["a" /* default */])(options.location.search);
        _queryParams[__WEBPACK_IMPORTED_MODULE_5__app_constants_param_names__["h" /* PAGINATION_PARAM_NAME */]] = currentPage - 1;
        backQuery = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__app_helpers_make_query__["a" /* default */])(_queryParams);
      }
      //    Forward
      var forwardQuery = void 0;
      if (currentPage * options.itemsPerPage >= totalItems) {
        var _queryParams2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__app_helpers_parse_query__["a" /* default */])(options.location.search);
        _queryParams2[__WEBPACK_IMPORTED_MODULE_5__app_constants_param_names__["h" /* PAGINATION_PARAM_NAME */]] = currentPage;
        forwardQuery = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__app_helpers_make_query__["a" /* default */])(_queryParams2);
      } else {
        var _queryParams3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__app_helpers_parse_query__["a" /* default */])(options.location.search);
        _queryParams3[__WEBPACK_IMPORTED_MODULE_5__app_constants_param_names__["h" /* PAGINATION_PARAM_NAME */]] = currentPage + 1;
        forwardQuery = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__app_helpers_make_query__["a" /* default */])(_queryParams3);
      }

      var totalItems = options.itemsLength;
      var boundedLength = upperBound - lowerBound + 1;

      this.setState({
        currentPage: currentPage,
        lowerBound: lowerBound,
        upperBound: upperBound,
        backQuery: backQuery,
        forwardQuery: forwardQuery,
        totalItems: totalItems,
        lastPage: lastPage
      });

      options.setSegment(lowerBound, upperBound, boundedLength);
    }
  }, {
    key: 'render',
    value: function render() {
      var p = this.props;
      var s = this.state;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'article',
        { className: 'paginator' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'paginator-controls' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'paginator-back' },
            s.currentPage !== 1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["c" /* Link */],
              {
                className: 'button',
                to: _extends({}, p.location, {
                  search: s.backQuery
                })
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-angle-left' })
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'paginator-location' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              s.lowerBound,
              !!s.upperBound && s.upperBound > 1 && ' - ' + s.upperBound,
              ' ',
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'strong',
                null,
                'of'
              ),
              ' ',
              s.totalItems
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'paginator-forward' },
            s.currentPage !== s.lastPage && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["c" /* Link */],
              {
                className: 'button',
                to: _extends({}, p.location, {
                  search: s.forwardQuery
                })
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-angle-right' })
            )
          )
        )
      );
    }
  }]);

  return Paginator;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

Paginator.propTypes = {
  itemsLength: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
  itemsPerPage: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  setSegment: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};


/* harmony default export */ __webpack_exports__["a"] = (Paginator);

/***/ }),

/***/ 1548:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return triggerTransactionsExport; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth_actions_load_account_history__ = __webpack_require__(735);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__selectors_transactions__ = __webpack_require__(1604);



var triggerTransactionsExport = function triggerTransactionsExport() {
  return function (dispatch, getState) {
    var _getState = getState(),
        transactionsLoading = _getState.transactionsLoading,
        transactionsOldestLoadedBlock = _getState.transactionsOldestLoadedBlock,
        loginAccount = _getState.loginAccount;

    var loadedAllTransactions = transactionsOldestLoadedBlock === loginAccount.registerBlockNumber;

    if (!transactionsLoading && loadedAllTransactions) {
      // trigger download
      var transactions = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__selectors_transactions__["a" /* selectTransactions */])(getState());
      var transactionsDataString = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(transactions));
      var a = document.createElement('a');

      a.setAttribute('href', transactionsDataString);
      a.setAttribute('download', 'AugurTransactions.json');
      a.click();
    } else {
      // trigger load all transactions and give it this function as a callback.
      dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__auth_actions_load_account_history__["a" /* loadAccountHistory */])(true, triggerTransactionsExport));
    }
  };
};

/***/ }),

/***/ 1549:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_components_spinner__ = __webpack_require__(1491);





var TransactionsLoadingActions = function TransactionsLoadingActions(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'article',
    { className: 'transactions-loading-actions' },
    !p.transactionsLoading && !p.hasAllTransactionsLoaded && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'transactions-load-buttons' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'button',
        {
          className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('unstyled', { disabled: !p.registerBlockNumber }),
          onClick: function onClick() {
            if (!p.transactionsLoading) p.loadMoreTransactions();
          }
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          null,
          'Load More'
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'button',
        {
          className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('unstyled', { disabled: !p.registerBlockNumber }),
          onClick: function onClick() {
            if (!p.transactionsLoading) p.loadAllTransactions();
          }
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          null,
          'Load All'
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'button',
        {
          className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('unstyled', { disabled: !p.registerBlockNumber }, { hidden: !p.allowExport }),
          onClick: function onClick() {
            if (!p.transactionsLoading) {
              p.triggerTransactionsExport();
            }
          }
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          null,
          'Export All'
        )
      )
    ),
    p.transactionsLoading && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'transactions-loading-spinner' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        { className: 'transactions-loading-message' },
        'Loading More History'
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__common_components_spinner__["a" /* default */], null)
    ),
    !p.transactionsLoading && p.hasAllTransactionsLoaded && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'transactions-loaded' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        {
          className: 'transactions-all-loaded-message'
        },
        'All History Loaded'
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'button',
        {
          className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('unstyled', { disabled: p.transactionsLoading }, { hidden: !p.allowExport }),
          onClick: function onClick() {
            p.triggerTransactionsExport();
          }
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          null,
          'Export All'
        )
      )
    )
  );
};

TransactionsLoadingActions.propTypes = {
  loadMoreTransactions: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  loadAllTransactions: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  triggerTransactionsExport: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  transactionsLoading: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  hasAllTransactionsLoaded: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  registerBlockNumber: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  allowExport: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
};

/* harmony default export */ __webpack_exports__["a"] = (TransactionsLoadingActions);

/***/ }),

/***/ 1550:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(1559), __esModule: true };

/***/ }),

/***/ 1551:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(1560), __esModule: true };

/***/ }),

/***/ 1552:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(1561), __esModule: true };

/***/ }),

/***/ 1553:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(1562), __esModule: true };

/***/ }),

/***/ 1554:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(1563), __esModule: true };

/***/ }),

/***/ 1555:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(1564), __esModule: true };

/***/ }),

/***/ 1556:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(1565), __esModule: true };

/***/ }),

/***/ 1557:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(1566), __esModule: true };

/***/ }),

/***/ 1558:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _getPrototypeOf = __webpack_require__(1554);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = __webpack_require__(1553);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

/***/ }),

/***/ 1559:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1585);
module.exports = __webpack_require__(1473).Object.assign;

/***/ }),

/***/ 1560:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1586);
var $Object = __webpack_require__(1473).Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};

/***/ }),

/***/ 1561:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1587);
var $Object = __webpack_require__(1473).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),

/***/ 1562:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1588);
var $Object = __webpack_require__(1473).Object;
module.exports = function getOwnPropertyDescriptor(it, key){
  return $Object.getOwnPropertyDescriptor(it, key);
};

/***/ }),

/***/ 1563:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1589);
module.exports = __webpack_require__(1473).Object.getPrototypeOf;

/***/ }),

/***/ 1564:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1590);
module.exports = __webpack_require__(1473).Object.setPrototypeOf;

/***/ }),

/***/ 1565:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1593);
__webpack_require__(1591);
__webpack_require__(1594);
__webpack_require__(1595);
module.exports = __webpack_require__(1473).Symbol;

/***/ }),

/***/ 1566:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1592);
__webpack_require__(1596);
module.exports = __webpack_require__(1513).f('iterator');

/***/ }),

/***/ 1567:
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),

/***/ 1568:
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),

/***/ 1569:
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(1475)
  , toLength  = __webpack_require__(1583)
  , toIndex   = __webpack_require__(1582);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),

/***/ 1570:
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(1486)
  , gOPS    = __webpack_require__(1505)
  , pIE     = __webpack_require__(1488);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),

/***/ 1571:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1474).document && document.documentElement;

/***/ }),

/***/ 1572:
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(1518);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),

/***/ 1573:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(1503)
  , descriptor     = __webpack_require__(1489)
  , setToStringTag = __webpack_require__(1506)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(1482)(IteratorPrototype, __webpack_require__(1483)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),

/***/ 1574:
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),

/***/ 1575:
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(1486)
  , toIObject = __webpack_require__(1475);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),

/***/ 1576:
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(1490)('meta')
  , isObject = __webpack_require__(1485)
  , has      = __webpack_require__(1479)
  , setDesc  = __webpack_require__(1480).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(1481)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),

/***/ 1577:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(1486)
  , gOPS     = __webpack_require__(1505)
  , pIE      = __webpack_require__(1488)
  , toObject = __webpack_require__(1510)
  , IObject  = __webpack_require__(1522)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(1481)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),

/***/ 1578:
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(1480)
  , anObject = __webpack_require__(1484)
  , getKeys  = __webpack_require__(1486);

module.exports = __webpack_require__(1477) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),

/***/ 1579:
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(1475)
  , gOPN      = __webpack_require__(1524).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ 1580:
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(1485)
  , anObject = __webpack_require__(1484);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(1519)(Function.call, __webpack_require__(1504).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),

/***/ 1581:
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(1509)
  , defined   = __webpack_require__(1499);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),

/***/ 1582:
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(1509)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),

/***/ 1583:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(1509)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),

/***/ 1584:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(1568)
  , step             = __webpack_require__(1574)
  , Iterators        = __webpack_require__(1501)
  , toIObject        = __webpack_require__(1475);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(1523)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),

/***/ 1585:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(1478);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(1577)});

/***/ }),

/***/ 1586:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1478)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(1503)});

/***/ }),

/***/ 1587:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1478);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(1477), 'Object', {defineProperty: __webpack_require__(1480).f});

/***/ }),

/***/ 1588:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = __webpack_require__(1475)
  , $getOwnPropertyDescriptor = __webpack_require__(1504).f;

__webpack_require__(1527)('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

/***/ }),

/***/ 1589:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = __webpack_require__(1510)
  , $getPrototypeOf = __webpack_require__(1525);

__webpack_require__(1527)('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),

/***/ 1590:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(1478);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(1580).set});

/***/ }),

/***/ 1591:
/***/ (function(module, exports) {



/***/ }),

/***/ 1592:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(1581)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(1523)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),

/***/ 1593:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(1474)
  , has            = __webpack_require__(1479)
  , DESCRIPTORS    = __webpack_require__(1477)
  , $export        = __webpack_require__(1478)
  , redefine       = __webpack_require__(1528)
  , META           = __webpack_require__(1576).KEY
  , $fails         = __webpack_require__(1481)
  , shared         = __webpack_require__(1508)
  , setToStringTag = __webpack_require__(1506)
  , uid            = __webpack_require__(1490)
  , wks            = __webpack_require__(1483)
  , wksExt         = __webpack_require__(1513)
  , wksDefine      = __webpack_require__(1512)
  , keyOf          = __webpack_require__(1575)
  , enumKeys       = __webpack_require__(1570)
  , isArray        = __webpack_require__(1572)
  , anObject       = __webpack_require__(1484)
  , toIObject      = __webpack_require__(1475)
  , toPrimitive    = __webpack_require__(1511)
  , createDesc     = __webpack_require__(1489)
  , _create        = __webpack_require__(1503)
  , gOPNExt        = __webpack_require__(1579)
  , $GOPD          = __webpack_require__(1504)
  , $DP            = __webpack_require__(1480)
  , $keys          = __webpack_require__(1486)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(1524).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(1488).f  = $propertyIsEnumerable;
  __webpack_require__(1505).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(1502)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(1482)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),

/***/ 1594:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1512)('asyncIterator');

/***/ }),

/***/ 1595:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1512)('observable');

/***/ }),

/***/ 1596:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1584);
var global        = __webpack_require__(1474)
  , hide          = __webpack_require__(1482)
  , Iterators     = __webpack_require__(1501)
  , TO_STRING_TAG = __webpack_require__(1483)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),

/***/ 1598:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(1515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(1516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(1496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(1498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(1497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__enhancer__ = __webpack_require__(1529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__types__ = __webpack_require__(1530);






/* eslint react/prop-types: 0 */





var Circle = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(Circle, _Component);

  function Circle() {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Circle);

    return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Circle, [{
    key: 'getPathStyles',
    value: function getPathStyles() {
      var _props = this.props,
          percent = _props.percent,
          strokeWidth = _props.strokeWidth,
          _props$gapDegree = _props.gapDegree,
          gapDegree = _props$gapDegree === undefined ? 0 : _props$gapDegree,
          gapPosition = _props.gapPosition;

      var radius = 50 - strokeWidth / 2;
      var beginPositionX = 0;
      var beginPositionY = -radius;
      var endPositionX = 0;
      var endPositionY = -2 * radius;
      switch (gapPosition) {
        case 'left':
          beginPositionX = -radius;
          beginPositionY = 0;
          endPositionX = 2 * radius;
          endPositionY = 0;
          break;
        case 'right':
          beginPositionX = radius;
          beginPositionY = 0;
          endPositionX = -2 * radius;
          endPositionY = 0;
          break;
        case 'bottom':
          beginPositionY = radius;
          endPositionY = 2 * radius;
          break;
        default:
      }
      var pathString = 'M 50,50 m ' + beginPositionX + ',' + beginPositionY + '\n     a ' + radius + ',' + radius + ' 0 1 1 ' + endPositionX + ',' + -endPositionY + '\n     a ' + radius + ',' + radius + ' 0 1 1 ' + -endPositionX + ',' + endPositionY;
      var len = Math.PI * 2 * radius;
      var trailPathStyle = {
        strokeDasharray: len - gapDegree + 'px ' + len + 'px',
        strokeDashoffset: '-' + gapDegree / 2 + 'px',
        transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
      };
      var strokePathStyle = {
        strokeDasharray: percent / 100 * (len - gapDegree) + 'px ' + len + 'px',
        strokeDashoffset: '-' + gapDegree / 2 + 'px',
        transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
      };
      return { pathString: pathString, trailPathStyle: trailPathStyle, strokePathStyle: strokePathStyle };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          prefixCls = _props2.prefixCls,
          strokeWidth = _props2.strokeWidth,
          trailWidth = _props2.trailWidth,
          strokeColor = _props2.strokeColor,
          trailColor = _props2.trailColor,
          strokeLinecap = _props2.strokeLinecap,
          style = _props2.style,
          className = _props2.className,
          restProps = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default()(_props2, ['prefixCls', 'strokeWidth', 'trailWidth', 'strokeColor', 'trailColor', 'strokeLinecap', 'style', 'className']);

      var _getPathStyles = this.getPathStyles(),
          pathString = _getPathStyles.pathString,
          trailPathStyle = _getPathStyles.trailPathStyle,
          strokePathStyle = _getPathStyles.strokePathStyle;

      delete restProps.percent;
      delete restProps.gapDegree;
      delete restProps.gapPosition;
      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        'svg',
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
          className: prefixCls + '-circle ' + className,
          viewBox: '0 0 100 100',
          style: style
        }, restProps),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('path', {
          className: prefixCls + '-circle-trail',
          d: pathString,
          stroke: trailColor,
          strokeWidth: trailWidth || strokeWidth,
          fillOpacity: '0',
          style: trailPathStyle
        }),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('path', {
          className: prefixCls + '-circle-path',
          d: pathString,
          strokeLinecap: strokeLinecap,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          fillOpacity: '0',
          ref: function ref(path) {
            _this2.path = path;
          },
          style: strokePathStyle
        })
      );
    }
  }]);

  return Circle;
}(__WEBPACK_IMPORTED_MODULE_6_react__["Component"]);

Circle.propTypes = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_9__types__["a" /* propTypes */], {
  gapPosition: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.oneOf(['top', 'bottom', 'left', 'right'])
});

Circle.defaultProps = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_9__types__["b" /* defaultProps */], {
  gapPosition: 'top'
});

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__enhancer__["a" /* default */])(Circle));

/***/ }),

/***/ 1599:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(1515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(1516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(1496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(1498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(1497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__enhancer__ = __webpack_require__(1529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__types__ = __webpack_require__(1530);










var Line = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(Line, _Component);

  function Line() {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Line);

    return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Line.__proto__ || Object.getPrototypeOf(Line)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Line, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          percent = _props.percent,
          prefixCls = _props.prefixCls,
          strokeColor = _props.strokeColor,
          strokeLinecap = _props.strokeLinecap,
          strokeWidth = _props.strokeWidth,
          style = _props.style,
          trailColor = _props.trailColor,
          trailWidth = _props.trailWidth,
          restProps = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default()(_props, ['className', 'percent', 'prefixCls', 'strokeColor', 'strokeLinecap', 'strokeWidth', 'style', 'trailColor', 'trailWidth']);

      delete restProps.gapPosition;

      var pathStyle = {
        strokeDasharray: '100px, 100px',
        strokeDashoffset: 100 - percent + 'px',
        transition: 'stroke-dashoffset 0.3s ease 0s, stroke 0.3s linear'
      };

      var center = strokeWidth / 2;
      var right = 100 - strokeWidth / 2;
      var pathString = 'M ' + (strokeLinecap === 'round' ? center : 0) + ',' + center + '\n           L ' + (strokeLinecap === 'round' ? right : 100) + ',' + center;
      var viewBoxString = '0 0 100 ' + strokeWidth;

      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        'svg',
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
          className: prefixCls + '-line ' + className,
          viewBox: viewBoxString,
          preserveAspectRatio: 'none',
          style: style
        }, restProps),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('path', {
          className: prefixCls + '-line-trail',
          d: pathString,
          strokeLinecap: strokeLinecap,
          stroke: trailColor,
          strokeWidth: trailWidth || strokeWidth,
          fillOpacity: '0'
        }),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('path', {
          className: prefixCls + '-line-path',
          d: pathString,
          strokeLinecap: strokeLinecap,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          fillOpacity: '0',
          ref: function ref(path) {
            _this2.path = path;
          },
          style: pathStyle
        })
      );
    }
  }]);

  return Line;
}(__WEBPACK_IMPORTED_MODULE_6_react__["Component"]);

Line.propTypes = __WEBPACK_IMPORTED_MODULE_8__types__["a" /* propTypes */];

Line.defaultProps = __WEBPACK_IMPORTED_MODULE_8__types__["b" /* defaultProps */];

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__enhancer__["a" /* default */])(Line));

/***/ }),

/***/ 1600:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Line__ = __webpack_require__(1599);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Circle__ = __webpack_require__(1598);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Line__["a"]; });
/* unused harmony reexport Circle */





/* unused harmony default export */ var _unused_webpack_default_export = ({
  Line: __WEBPACK_IMPORTED_MODULE_0__Line__["a" /* default */],
  Circle: __WEBPACK_IMPORTED_MODULE_1__Circle__["a" /* default */]
});

/***/ }),

/***/ 1604:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return selectTransactions; });
/* unused harmony export formatTransaction */
/* unused harmony export formatGroupedTransactions */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_reselect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bignumber_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bignumber_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_bignumber_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__select_state__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants_types__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants_statuses__ = __webpack_require__(527);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_get_value__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_format_number__ = __webpack_require__(40);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };












/* unused harmony default export */ var _unused_webpack_default_export = (function () {
  return selectTransactions(__WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */].getState());
});

var selectTransactions = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(__WEBPACK_IMPORTED_MODULE_3__select_state__["u" /* selectTransactionsDataState */], function (transactionsData) {
  var tradeGroups = [];
  var formattedTransactions = Object.keys(transactionsData || {}).reduce(function (p, id) {
    var tradeGroupID = transactionsData[id].tradeGroupID;
    if (tradeGroupID) {
      if (tradeGroups.indexOf(tradeGroupID) === -1) {
        tradeGroups.push(tradeGroupID);
        var filteredTransactions = Object.keys(transactionsData).filter(function (id) {
          return transactionsData[id].tradeGroupID === tradeGroupID;
        }).map(function (id) {
          return transactionsData[id];
        });

        if (filteredTransactions.length === 1) {
          p.push(formatTransaction(filteredTransactions[0]));
        } else {
          p.push(formatGroupedTransactions(filteredTransactions));
        }
      }

      return p;
    }

    p.push(formatTransaction(transactionsData[id]));
    return p;
  }, []).sort(function (a, b) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_get_value__["a" /* default */])(b, 'timestamp.timestamp') - __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_get_value__["a" /* default */])(a, 'timestamp.timestamp');
  });

  return formattedTransactions;
});

function formatTransaction(transaction) {
  return _extends({}, transaction, {
    data: transaction.data,
    gas: transaction.gas && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_format_number__["f" /* formatEther */])(transaction.gas),
    ethTokens: transaction.etherWithoutGas && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_format_number__["b" /* formatEtherTokens */])(transaction.etherWithoutGas),
    shares: transaction.sharesChange && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_format_number__["e" /* formatShares */])(transaction.sharesChange),
    rep: transaction.repChange && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_format_number__["c" /* formatRep */])(transaction.repChange)
  });
}

function formatGroupedTransactions(transactions) {
  var formattedTransactions = transactions.map(function (transaction) {
    return formatTransaction(transaction);
  }).sort(function (a, b) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_get_value__["a" /* default */])(b, 'timestamp.timestamp') - __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_get_value__["a" /* default */])(a, 'timestamp.timestamp');
  });

  var status = formattedTransactions.reduce(function (p, transaction) {
    if (p === __WEBPACK_IMPORTED_MODULE_5__constants_statuses__["b" /* FAILED */] || transaction.status === __WEBPACK_IMPORTED_MODULE_5__constants_statuses__["b" /* FAILED */]) return __WEBPACK_IMPORTED_MODULE_5__constants_statuses__["b" /* FAILED */];
    if (p === __WEBPACK_IMPORTED_MODULE_5__constants_statuses__["c" /* INTERRUPTED */] || transaction.status === __WEBPACK_IMPORTED_MODULE_5__constants_statuses__["c" /* INTERRUPTED */]) return __WEBPACK_IMPORTED_MODULE_5__constants_statuses__["c" /* INTERRUPTED */];
    if (p === __WEBPACK_IMPORTED_MODULE_5__constants_statuses__["d" /* PENDING */] || transaction.status === __WEBPACK_IMPORTED_MODULE_5__constants_statuses__["d" /* PENDING */]) return __WEBPACK_IMPORTED_MODULE_5__constants_statuses__["d" /* PENDING */];
    if (p === __WEBPACK_IMPORTED_MODULE_5__constants_statuses__["e" /* SUBMITTED */] || transaction.status === __WEBPACK_IMPORTED_MODULE_5__constants_statuses__["e" /* SUBMITTED */]) return __WEBPACK_IMPORTED_MODULE_5__constants_statuses__["e" /* SUBMITTED */];
    if (transaction.status === __WEBPACK_IMPORTED_MODULE_5__constants_statuses__["a" /* SUCCESS */]) return __WEBPACK_IMPORTED_MODULE_5__constants_statuses__["a" /* SUCCESS */];

    return p;
  }, null);

  var totalShares = formattedTransactions.reduce(function (p, transaction) {
    return p.plus(new __WEBPACK_IMPORTED_MODULE_1_bignumber_js___default.a(transaction.numShares.value));
  }, new __WEBPACK_IMPORTED_MODULE_1_bignumber_js___default.a(0));

  return {
    status: status,
    message: (formattedTransactions[0].type === __WEBPACK_IMPORTED_MODULE_4__constants_types__["BUY"] ? 'Buy' : 'Sell') + ' ' + totalShares.toNumber() + ' shares of ' + formattedTransactions[0].data.outcomeName,
    description: formattedTransactions[0].description,
    timestamp: formattedTransactions[formattedTransactions.length - 1].timestamp,
    transactions: formattedTransactions
  };
}

/***/ }),

/***/ 1611:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export REGISTER */
/* unused harmony export LOGIN */
/* unused harmony export LOGOUT */
/* unused harmony export IMPORT */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FUND_ACCOUNT; });
/* unused harmony export AUTH_TYPES */
/* unused harmony export DEFAULT_AUTH_TYPE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AIRBITZ_WALLET_TYPE; });
var _AUTH_TYPES;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var REGISTER = 'register';
var LOGIN = 'login';
var LOGOUT = 'logout';
var IMPORT = 'import';
var FUND_ACCOUNT = 'fund_account';

var AUTH_TYPES = (_AUTH_TYPES = {}, _defineProperty(_AUTH_TYPES, REGISTER, REGISTER), _defineProperty(_AUTH_TYPES, LOGIN, LOGIN), _defineProperty(_AUTH_TYPES, IMPORT, IMPORT), _defineProperty(_AUTH_TYPES, LOGOUT, LOGOUT), _AUTH_TYPES);

var DEFAULT_AUTH_TYPE = REGISTER;

var AIRBITZ_WALLET_TYPE = 'wallet:ethereum';

/***/ }),

/***/ 1643:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_transition_group_CSSTransitionGroup__ = __webpack_require__(528);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_transition_group_CSSTransitionGroup___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_transition_group_CSSTransitionGroup__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__transaction_details__ = __webpack_require__(1751);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__transaction_summary__ = __webpack_require__(1753);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_components_spinner__ = __webpack_require__(1491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__constants_statuses__ = __webpack_require__(527);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











var Transaction = function (_Component) {
  _inherits(Transaction, _Component);

  function Transaction(props) {
    _classCallCheck(this, Transaction);

    var _this = _possibleConstructorReturn(this, (Transaction.__proto__ || Object.getPrototypeOf(Transaction)).call(this, props));

    _this.state = {
      isFullTransactionVisible: false
    };
    return _this;
  }

  _createClass(Transaction, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var p = this.props;
      var s = this.state;

      var animationInSpeed = parseInt(window.getComputedStyle(document.body).getPropertyValue('--animation-speed-fast'), 10);
      var animationOutSpeed = parseInt(window.getComputedStyle(document.body).getPropertyValue('--animation-speed-normal'), 10);

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'article',
        { className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()('transaction', p.status) },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()('transaction-status', p.status) }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'transaction-content' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()('transaction-content-main', s.isFullTransactionVisible && 'transaction-details-visible') },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__transaction_summary__["a" /* default */], _extends({
              isGroupedTransaction: p.isGroupedTransaction
            }, p)),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: 'transaction-spinner' },
              (p.status === __WEBPACK_IMPORTED_MODULE_7__constants_statuses__["e" /* SUBMITTED */] || p.status === __WEBPACK_IMPORTED_MODULE_7__constants_statuses__["d" /* PENDING */] || p.status === __WEBPACK_IMPORTED_MODULE_7__constants_statuses__["f" /* COMMITTING */]) && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__common_components_spinner__["a" /* default */], null)
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'button',
              {
                className: 'unstyled transaction-toggle',
                onClick: function onClick() {
                  return _this2.setState({ isFullTransactionVisible: !s.isFullTransactionVisible });
                }
              },
              s.isFullTransactionVisible ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-minus' }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-plus' })
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_react_transition_group_CSSTransitionGroup___default.a,
            {
              transitionName: 'transaction-details',
              transitionEnterTimeout: animationInSpeed,
              transitionLeaveTimeout: animationOutSpeed
            },
            s.isFullTransactionVisible && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__transaction_details__["a" /* default */], p)
          )
        )
      );
    }
  }]);

  return Transaction;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

Transaction.propTypes = {
  status: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  isGroupedTransaction: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
};
/* harmony default export */ __webpack_exports__["a"] = (Transaction);

/***/ }),

/***/ 1676:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);




var ValueTimestamp = function ValueTimestamp(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'span',
    { className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('value-timestamp', p.className) },
    p.full
  );
};

ValueTimestamp.propTypes = {
  className: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  full: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
};

/* harmony default export */ __webpack_exports__["a"] = (ValueTimestamp);

/***/ }),

/***/ 1751:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_components_value_denomination__ = __webpack_require__(525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_statuses__ = __webpack_require__(527);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_get_value__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_format_number__ = __webpack_require__(40);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };









var TransactionDetails = function TransactionDetails(p) {
  var TransactionDetails = function TransactionDetails(p) {
    var tradingFees = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_get_value__["a" /* default */])(p, 'tradingFees.value');
    var balances = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_get_value__["a" /* default */])(p, 'data.balances');
    var totalCost = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_get_value__["a" /* default */])(p, 'totalCost.value');
    var totalReturn = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_get_value__["a" /* default */])(p, 'totalReturn.value');
    var marketCreationFee = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_get_value__["a" /* default */])(p, 'marketCreationFee.value');
    var bond = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_get_value__["a" /* default */])(p, 'bond.value');
    var gasFees = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_get_value__["a" /* default */])(p, 'gasFees.value');

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'transaction-details-content' },
      !!p.topic && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'transaction-detail' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'transaction-detail-title' },
          'Topic: '
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'transaction-status' },
          p.topic
        )
      ),
      !!tradingFees && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'transaction-detail' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__common_components_value_denomination__["a" /* default */], _extends({
          className: 'tradingFees-message'
        }, p.tradingFees, {
          prefix: 'Trading Fees:'
        }))
      ),
      (balances || []).map(function (b) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          {
            key: (b.change && b.change.full) + '-' + (b.balance && b.balance.full),
            className: 'transaction-detail'
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'transaction-detail-title' },
            'Balance Change: '
          ),
          !!b.change && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__common_components_value_denomination__["a" /* default */], b.change),
          !!b.balance && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__common_components_value_denomination__["a" /* default */], _extends({
            prefix: ' [ balance:', postfix: ']'
          }, b.balance))
        );
      }),
      !!p.freeze && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'transaction-detail' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'transaction-detail-title' },
          p.freeze.verb,
          ' Funds: '
        ),
        p.freeze.noFeeCost && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__common_components_value_denomination__["a" /* default */], _extends({}, p.freeze.noFeeCost, {
          postfix: '+ '
        })),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__common_components_value_denomination__["a" /* default */], _extends({}, p.freeze.tradingFees, {
          postfix: 'in potential trading fees'
        }))
      ),
      !!totalCost && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'transaction-detail' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__common_components_value_denomination__["a" /* default */], _extends({
          prefix: 'total cost:'
        }, p.totalCost))
      ),
      !!totalReturn && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'transaction-detail' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__common_components_value_denomination__["a" /* default */], _extends({
          prefix: 'total return:'
        }, p.totalReturn))
      ),
      !!marketCreationFee && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'transaction-detail' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__common_components_value_denomination__["a" /* default */], _extends({
          prefix: 'market creation fee:'
        }, p.marketCreationFee))
      ),
      !!bond && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'transaction-detail' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__common_components_value_denomination__["a" /* default */], _extends({
          prefix: p.bond.label + ' bond:'
        }, p.bond.value))
      ),
      !!gasFees && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'transaction-detail' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__common_components_value_denomination__["a" /* default */], _extends({
          prefix: 'gas cost:'
        }, p.gasFees))
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'transaction-detail' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'transaction-detail-title' },
          'Status: '
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'transaction-status' },
          p.status
        )
      ),
      p.status === __WEBPACK_IMPORTED_MODULE_2__constants_statuses__["a" /* SUCCESS */] && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'transaction-detail' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'transaction-detail-title' },
          'Confirmations: '
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__common_components_value_denomination__["a" /* default */], _extends({
          hideDenomination: true
        }, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_format_number__["j" /* formatConfirmations */])(p.currentBlockNumber - p.blockNumber)))
      )
    );
  };

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'article',
    { className: 'transaction-details' },
    p.hash ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'a',
      {
        to: 'https://testnet.etherscan.io/tx/' + p.hash,
        target: '_blank',
        rel: 'noopener noreferrer'
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(TransactionDetails, p)
    ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(TransactionDetails, p)
  );
};

/* harmony default export */ __webpack_exports__["a"] = (TransactionDetails);

/***/ }),

/***/ 1752:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_transition_group_CSSTransitionGroup__ = __webpack_require__(528);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_transition_group_CSSTransitionGroup___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_transition_group_CSSTransitionGroup__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__transaction__ = __webpack_require__(1643);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };







var TransactionGroup = function TransactionGroup(p) {
  var animationInSpeed = parseInt(window.getComputedStyle(document.body).getPropertyValue('--animation-speed-very-slow'), 10);

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'article',
    { className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()('transaction-group', p.status) },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()('transaction-group-summary', p.status) },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        { className: 'transaction-action' },
        p.message
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        { className: 'transaction-group-summary-description' },
        p.description
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_2_react_transition_group_CSSTransitionGroup___default.a,
      {
        transitionName: 'transaction',
        transitionEnterTimeout: animationInSpeed,
        transitionLeave: false
      },
      p.transactions.map(function (transaction, i) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__transaction__["a" /* default */], _extends({
          key: transaction.id,
          currentBlockNumber: p.currentBlockNumber,
          isGroupedTransaction: true
        }, transaction));
      })
    )
  );
};

/* harmony default export */ __webpack_exports__["a"] = (TransactionGroup);

/***/ }),

/***/ 1753:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_components_value_denomination__ = __webpack_require__(525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_components_value_timestamp__ = __webpack_require__(1676);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__constants_types__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__auth_constants_auth_types__ = __webpack_require__(1611);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__markets_constants_market_types__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_helpers_make_path__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_helpers_make_query__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__utils_get_value__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_constants_views__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_constants_param_names__ = __webpack_require__(523);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




















var TransactionSummary = function TransactionSummary(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'article',
    { className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()('transaction-summary', p.isGroupedTransaction && 'transaction-grouped') },
    p.data.marketID ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["c" /* Link */],
      {
        to: {
          pathname: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__app_helpers_make_path__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_12__app_constants_views__["k" /* MARKET */]),
          search: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__app_helpers_make_query__["a" /* default */])(_defineProperty({}, __WEBPACK_IMPORTED_MODULE_13__app_constants_param_names__["c" /* MARKET_ID_PARAM_NAME */], p.data.marketID))
        }
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(TransactionSummaryContent, p)
    ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(TransactionSummaryContent, p)
  );
};

var TransactionSummaryContent = function TransactionSummaryContent(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'transaction-summary-content' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'transaction-action' },
      transactionAction(p),
      transactionActionDetails(p)
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'transaction-description' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        null,
        transactionDescription(p)
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__common_components_value_timestamp__["a" /* default */], _extends({
      className: 'transaction-timestamp'
    }, p.timestamp))
  );
};

function transactionAction(transaction) {
  var action = function action() {
    switch (transaction.type) {
      case __WEBPACK_IMPORTED_MODULE_6__constants_types__["BUY"]:
        return 'Buy ';
      case __WEBPACK_IMPORTED_MODULE_6__constants_types__["BID"]:
        return 'Bid ';
      case __WEBPACK_IMPORTED_MODULE_6__constants_types__["SELL"]:
        return 'Sell ';
      case __WEBPACK_IMPORTED_MODULE_6__constants_types__["ASK"]:
        return 'Ask ';
      case __WEBPACK_IMPORTED_MODULE_6__constants_types__["MATCH_BID"]:
        return 'Bid Filled ';
      case __WEBPACK_IMPORTED_MODULE_6__constants_types__["MATCH_ASK"]:
        return 'Ask Filled ';
      case __WEBPACK_IMPORTED_MODULE_6__constants_types__["CANCEL_ORDER"]:
        return 'Cancel Order ';
      case __WEBPACK_IMPORTED_MODULE_6__constants_types__["SELL_COMPLETE_SETS"]:
        return 'Redeem ' + transaction.numShares.formatted + ' Complete Sets ';
      case __WEBPACK_IMPORTED_MODULE_6__constants_types__["CREATE_MARKET"]:
        return 'Create Market ';
      case __WEBPACK_IMPORTED_MODULE_6__constants_types__["SUBMIT_REPORT"]:
        return 'Submit Report ';
      default:
        return transaction.type;
    }
  };

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'span',
    { className: 'transaction-action-type' },
    action()
  );
}

function transactionActionDetails(transaction) {
  switch (transaction.type) {
    case __WEBPACK_IMPORTED_MODULE_6__constants_types__["BUY"]:
    case __WEBPACK_IMPORTED_MODULE_6__constants_types__["BID"]:
    case __WEBPACK_IMPORTED_MODULE_6__constants_types__["SELL"]:
    case __WEBPACK_IMPORTED_MODULE_6__constants_types__["ASK"]:
    case __WEBPACK_IMPORTED_MODULE_6__constants_types__["MATCH_BID"]:
    case __WEBPACK_IMPORTED_MODULE_6__constants_types__["MATCH_ASK"]:
      {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'transaction-trade-action-details' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__common_components_value_denomination__["a" /* default */], _extends({
            className: 'transaction-shares'
          }, transaction.numShares)),
          transaction.data.marketType === __WEBPACK_IMPORTED_MODULE_8__markets_constants_market_types__["c" /* CATEGORICAL */] && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: 'short-word' },
              ' of '
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: 'outcome-name' },
              transaction.data.outcomeName && transaction.data.outcomeName.toString().substring(0, 35) + (transaction.data.outcomeName.toString().length > 35 && '...' || '')
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'at' },
            ' @ '
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__common_components_value_denomination__["a" /* default */], _extends({ className: 'noFeePrice' }, transaction.noFeePrice))
        );
      }
    case __WEBPACK_IMPORTED_MODULE_6__constants_types__["CANCEL_ORDER"]:
      {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'transaction-trade-action-details' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'short-word' },
            'to'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            null,
            ' ',
            transaction.data.order.type,
            ' '
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__common_components_value_denomination__["a" /* default */], transaction.data.order.shares),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'short-word' },
            ' of '
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'outcome-name' },
            transaction.data.outcome.name && transaction.data.outcome.name.substring(0, 35) + (transaction.data.outcome.name.length > 35 && '...' || '')
          )
        );
      }
    case __WEBPACK_IMPORTED_MODULE_6__constants_types__["SUBMIT_REPORT"]:
      {
        var type = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__utils_get_value__["a" /* default */])(transaction, 'data.market.type');
        var outcomeName = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__utils_get_value__["a" /* default */])(transaction, 'data.outcome.name');
        var reportedOutcome = transaction.data.isScalar || type === __WEBPACK_IMPORTED_MODULE_8__markets_constants_market_types__["a" /* SCALAR */] ? transaction.data.reportedOutcomeID : outcomeName && '' + outcomeName.substring(0, 35) + (outcomeName.length > 35 && '...');

        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'transaction-trade-action-report-details' },
          !!reportedOutcome && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'transaction-reported-outcome' },
            reportedOutcome
          )
        );
      }
    default:
      break;
  }
}

function transactionDescription(transaction) {
  switch (transaction.type) {
    case __WEBPACK_IMPORTED_MODULE_7__auth_constants_auth_types__["a" /* FUND_ACCOUNT */]:
      return 'Request testnet Ether and Reputation';
    default:
      return transaction.description;
  }
}

TransactionSummary.propTypes = {
  type: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (TransactionSummary);

/***/ }),

/***/ 1754:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet__ = __webpack_require__(731);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__transactions__ = __webpack_require__(1755);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__branch_components_branch__ = __webpack_require__(1537);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_components_paginator__ = __webpack_require__(1539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_components_spinner__ = __webpack_require__(1491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__transactions_loading_actions__ = __webpack_require__(1549);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils_get_value__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__utils_debounce__ = __webpack_require__(92);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }














var TransactionsView = function (_Component) {
  _inherits(TransactionsView, _Component);

  function TransactionsView(props) {
    _classCallCheck(this, TransactionsView);

    var _this = _possibleConstructorReturn(this, (TransactionsView.__proto__ || Object.getPrototypeOf(TransactionsView)).call(this, props));

    _this.state = {
      lowerBound: null,
      boundedLength: null,
      pageChanged: false,
      hasAttachedScrollListener: false
    };

    _this.handleScroll = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__utils_debounce__["a" /* default */])(_this.handleScroll.bind(_this), 100);
    _this.setSegment = _this.setSegment.bind(_this);
    return _this;
  }

  _createClass(TransactionsView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.manageScrollEventListener(this.props, this.state);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      // These are to prevent the CSSTransitionGroup from transitioning transactions on pagination
      if (this.state.pageChanged !== nextState.pageChanged) this.setState({ pageChanged: false });

      if (!nextState.hasAttachedScrollListener && nextProps.isMobile) this.setState({ hasAttachedScrollListener: true });
      if (nextState.hasAttachedScrollListener && !nextProps.isMobile) this.setState({ hasAttachedScrollListener: false });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      this.manageScrollEventListener(this.props, this.state);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.state.hasAttachedScrollListener) window.removeEventListener('scroll', this.handleScroll);
    }
  }, {
    key: 'setSegment',
    value: function setSegment(lowerBound, upperBound, boundedLength) {
      this.setState({ lowerBound: lowerBound, boundedLength: boundedLength, pageChanged: this.state.lowerBound !== lowerBound });
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll() {
      var D = document;
      var documentHeight = Math.max(D.body.scrollHeight, D.documentElement.scrollHeight, D.body.offsetHeight, D.documentElement.offsetHeight, D.body.clientHeight, D.documentElement.clientHeight); // Cross Browser Compatibility
      var currentScrollPosition = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight;

      if (documentHeight - currentScrollPosition < 200 && !this.props.transactionsLoading) {
        this.props.loadMoreTransactions();
      }
    }
  }, {
    key: 'manageScrollEventListener',
    value: function manageScrollEventListener(p, s) {
      if (p.isMobile && !s.hasAttachedScrollListener) {
        window.addEventListener('scroll', this.handleScroll);
        this.setState({ hasAttachedScrollListener: true });
      } else if (!p.isMobile && s.hasAttachedScrollListener) {
        window.removeEventListener('scroll', this.handleScroll);
        this.setState({ hasAttachedScrollListener: false });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var p = this.props;
      var s = this.state;

      var hasRep = !!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils_get_value__["a" /* default */])(p, 'loginAccount.rep.value');
      var hasBranch = !!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils_get_value__["a" /* default */])(p, 'branch.id');
      var transactionsLength = p.transactions.length;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'section',
        { id: 'transactions_view' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_react_helmet__["Helmet"],
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'title',
            null,
            'Transactions'
          )
        ),
        hasRep && hasBranch && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__branch_components_branch__["a" /* default */], p.branch),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'view-header' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'view-header-group' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'h2',
              null,
              'Transactions'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'view-header-group' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__transactions_loading_actions__["a" /* default */], {
              loadMoreTransactions: p.loadMoreTransactions,
              loadAllTransactions: p.loadAllTransactions,
              transactionsLoading: p.transactionsLoading,
              hasAllTransactionsLoaded: p.hasAllTransactionsLoaded,
              triggerTransactionsExport: p.triggerTransactionsExport,
              registerBlockNumber: p.loginAccount.registerBlockNumber,
              allowExport: true
            })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__transactions__["a" /* default */], {
          transactions: p.transactions,
          currentBlockNumber: p.currentBlockNumber,
          lowerBound: s.lowerBound,
          boundedLength: s.boundedLength,
          pageChanged: s.pageChanged
        }),
        !!transactionsLength && !p.isMobile && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__common_components_paginator__["a" /* default */], {
          itemsLength: p.transactions.length,
          itemsPerPage: 20,
          location: p.location,
          history: p.history,
          setSegment: this.setSegment
        }),
        p.isMobile && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'transactions-loading-status' },
          p.isMobile && p.transactionsLoading && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'transactions-loading-spinner' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__common_components_spinner__["a" /* default */], null)
          ),
          !p.transactionsLoading && p.hasAllTransactionsLoaded && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            {
              className: 'transactions-all-loaded-message'
            },
            'All Transactions Loaded'
          )
        )
      );
    }
  }]);

  return TransactionsView;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

TransactionsView.propTypes = {
  transactions: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired,
  transactionsLoading: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  loadMoreTransactions: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  loadAllTransactions: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  triggerTransactionsExport: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  hasAllTransactionsLoaded: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  isMobile: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  branch: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  loginAccount: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  currentBlockNumber: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number
};
/* harmony default export */ __webpack_exports__["a"] = (TransactionsView);

/***/ }),

/***/ 1755:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_transition_group_CSSTransitionGroup__ = __webpack_require__(528);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_transition_group_CSSTransitionGroup___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_transition_group_CSSTransitionGroup__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__transaction__ = __webpack_require__(1643);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__transaction_group__ = __webpack_require__(1752);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_components_null_state_message__ = __webpack_require__(526);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }








var Transactions = function Transactions(p) {
  var animationSpeed = parseInt(window.getComputedStyle(document.body).getPropertyValue('--animation-speed-very-slow'), 10);

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'article',
    { className: 'transactions' },
    p.boundedLength && p.transactions.length ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_2_react_transition_group_CSSTransitionGroup___default.a,
      {
        transitionName: 'transaction',
        transitionEnter: !p.pageChanged,
        transitionEnterTimeout: animationSpeed,
        transitionLeave: false
      },
      [].concat(_toConsumableArray(Array(p.boundedLength))).map(function (unused, i) {
        var transaction = p.transactions[p.lowerBound - 1 + i];

        return transaction.transactions && transaction.transactions.length > 1 ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__transaction_group__["a" /* default */], _extends({
          key: transaction.transactions[0].hash,
          currentBlockNumber: p.currentBlockNumber
        }, transaction)) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__transaction__["a" /* default */], _extends({
          key: transaction.hash,
          currentBlockNumber: p.currentBlockNumber
        }, transaction));
      })
    ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__common_components_null_state_message__["a" /* default */], {
      message: 'No Transaction Data'
    })
  );
};

Transactions.propTypes = {
  lowerBound: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any,
  boundedLength: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any,
  pageChanged: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  className: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  transactions: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array,
  currentBlockNumber: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number
};

/* harmony default export */ __webpack_exports__["a"] = (Transactions);

/***/ })

});
//# sourceMappingURL=transactions.7fc28b819ab7a98705f9.js.map