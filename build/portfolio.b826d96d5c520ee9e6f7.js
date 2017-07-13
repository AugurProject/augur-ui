webpackJsonp([6],{

/***/ 1437:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_portfolio_view__ = __webpack_require__(1688);



var mapStateToProps = function mapStateToProps(state) {
  return {
    activeView: state.activeView
  };
};

var Portfolio = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react_redux__["b" /* connect */])(mapStateToProps)(__WEBPACK_IMPORTED_MODULE_1__components_portfolio_view__["a" /* default */]);

/* harmony default export */ __webpack_exports__["default"] = (Portfolio);

/***/ }),

/***/ 1458:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(10);
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

/***/ 1459:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__link_components_link__ = __webpack_require__(530);






var ComponentNav = function ComponentNav(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'ul',
    {
      className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('component-nav', { 'full-width-nav': p.fullWidth })
    },
    Object.keys(p.navItems || {}).map(function (nav) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_3__link_components_link__["a" /* default */],
        {
          key: nav,
          className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()({ selected: p.selectedNav === nav, 'mobile-only': p.navItems[nav].isMobile }),
          onClick: function onClick() {
            p.updateSelectedNav(nav);
          }
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'li',
          { className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()({ selected: p.selectedNav === nav }) },
          p.navItems[nav].label
        )
      );
    })
  );
};

ComponentNav.propTypes = {
  fullWidth: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  navItems: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  selectedNav: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  updateSelectedNav: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (ComponentNav);

/***/ }),

/***/ 1460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SHARE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MILLI_SHARE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MICRO_SHARE; });
/* unused harmony export DENOMINATIONS */
var SHARE = 'share';
var MILLI_SHARE = 'milli-share';
var MICRO_SHARE = 'micro-share';

var DENOMINATIONS = [{
  label: 'Shares',
  value: SHARE
}, {
  label: 'mShares',
  value: MILLI_SHARE
}, {
  label: 'μShares',
  value: MICRO_SHARE
}];

/***/ }),

/***/ 1461:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_market_constants_share_denominations__ = __webpack_require__(1460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__add_commas_to_number__ = __webpack_require__(774);



// This helper method is very specific in scope
// It takes in the formatted shares in string format and returns a string denominated as specified
// The mutation of the shares is done this way so no actual re-calculation is done to the underlying
// values, just string manipulation for presentation
function setShareDenomination(value, denomination) {
  if (value == null) {
    return value;
  }

  switch (denomination) {
    case __WEBPACK_IMPORTED_MODULE_0__modules_market_constants_share_denominations__["a" /* MICRO_SHARE */]:
      return formatValue(value, 4);
    case __WEBPACK_IMPORTED_MODULE_0__modules_market_constants_share_denominations__["b" /* MILLI_SHARE */]:
      return formatValue(value, 1);
    default:
    case __WEBPACK_IMPORTED_MODULE_0__modules_market_constants_share_denominations__["c" /* SHARE */]:
      return value;
  }
}

// The value is assumed to *always* be in 'SHARES' denomination
function formatValue(value, amount) {
  var valueArray = value.split('');

  // remove dot + determine 0 pad amount
  var dotIndex = valueArray.indexOf('.');
  var zeroPadAmount = amount;
  if (dotIndex !== -1) {
    valueArray.splice(dotIndex, 1);
  } else {
    zeroPadAmount += 2;
  }

  // Strip leading 0's OR returns original value if no values are positive
  var firstPositiveValue = -1;
  valueArray.some(function (value, i) {
    if (parseInt(value, 10)) {
      firstPositiveValue = i;
      return true;
    }

    return false;
  });
  if (firstPositiveValue !== -1) {
    valueArray.splice(0, firstPositiveValue);
  } else {
    return value; // Returns original value
  }

  // Strip Commas (added back in at the end)
  valueArray.forEach(function (value, i) {
    if (value === ',') {
      valueArray.splice(i, 1);
    }
  });

  // Handle postFixed denominations (part of the format-number method)
  valueArray = handlePostfixedUnit(valueArray, zeroPadAmount);

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__add_commas_to_number__["a" /* default */])(valueArray.join('')); // return joined string w/ comma separating thousands
}

function handlePostfixedUnit(valueArray, zeroPadAmount) {
  var step = zeroPadAmount < 4;
  var gtTrillion = '> 1T'.split('');
  var newValueArray = valueArray;

  switch (valueArray[newValueArray.length - 1]) {
    // Handle existing > 10000 values
    case 'K':
      {
        newValueArray[newValueArray.length - 1] = step ? 'M' : 'B';
        return newValueArray;
      }
    case 'M':
      {
        if (step) {
          newValueArray[newValueArray.length - 1] = 'B';
        } else {
          newValueArray = gtTrillion;
        }
        return newValueArray;
      }
    case 'B':
    case 'T':
      {
        newValueArray = gtTrillion;
        return newValueArray;
      }

    // Handle values that become greater than 10000
    default:
      {
        // Append 0's
        for (var i = 0; i < zeroPadAmount; i++) {
          newValueArray.push('0');
        }

        // Mirrors logic present in format-number
        if (newValueArray.length >= 13) {
          newValueArray = gtTrillion;
        } else if (newValueArray.length >= 11) {
          newValueArray.splice(newValueArray.length - 9);
          newValueArray.push('B');
        } else if (newValueArray.length >= 8) {
          newValueArray.splice(newValueArray.length - 6);
          newValueArray.push('M');
        } else if (newValueArray.length >= 5) {
          newValueArray.splice(newValueArray.length - 3);
          newValueArray.push('K');
        }

        return newValueArray;
      }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (setShareDenomination);

/***/ }),

/***/ 1497:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);




var ValueDate = function ValueDate(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'span',
    { className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('value-date', p.className) },
    p.formatted
  );
};

ValueDate.propTypes = {
  className: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  value: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  formatted: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
};

/* harmony default export */ __webpack_exports__["a"] = (ValueDate);

/***/ }),

/***/ 1498:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return POSITION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ORDER; });
var POSITION = 'POSITION';
var ORDER = 'ORDER';

/***/ }),

/***/ 1505:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_components_spinner__ = __webpack_require__(1458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_components_em_dash__ = __webpack_require__(769);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants_trade_close_type__ = __webpack_require__(1498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__constants_close_dialog_status__ = __webpack_require__(303);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











var MarketTradeCloseDialog = function (_Component) {
  _inherits(MarketTradeCloseDialog, _Component);

  function MarketTradeCloseDialog(props) {
    _classCallCheck(this, MarketTradeCloseDialog);

    var _this = _possibleConstructorReturn(this, (MarketTradeCloseDialog.__proto__ || Object.getPrototypeOf(MarketTradeCloseDialog)).call(this, props));

    _this.state = {
      isConfirming: false,
      status: props.status
    };

    _this.renderCloseDialogContent = _this.renderCloseDialogContent.bind(_this);
    return _this;
  }

  _createClass(MarketTradeCloseDialog, [{
    key: 'renderCloseDialogContent',
    value: function renderCloseDialogContent(marketID, orderID, closeType, isClosable, quantityOfShares, isConfirming, closePosition, status, orderType, cancelOrder, isTradeCommitLocked) {
      var _this2 = this;

      // Position -- No Available Actions
      if (closeType === __WEBPACK_IMPORTED_MODULE_5__constants_trade_close_type__["b" /* POSITION */] && !status && (!parseFloat(quantityOfShares, 10) || !isClosable)) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__common_components_em_dash__["a" /* default */], null);
      }

      if (isConfirming) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'confirming-dialog' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'button',
            {
              className: 'unstyled confirming-no',
              onClick: function onClick() {
                _this2.setState({ isConfirming: false });
              }
            },
            'No'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'button',
            {
              className: 'unstyled confirming-yes',
              onClick: function onClick(event) {
                if (closeType === __WEBPACK_IMPORTED_MODULE_5__constants_trade_close_type__["b" /* POSITION */]) {
                  closePosition(marketID, orderID);
                } else if (closeType === __WEBPACK_IMPORTED_MODULE_5__constants_trade_close_type__["a" /* ORDER */]) {
                  cancelOrder(orderID, marketID, orderType);
                }
                _this2.setState({ isConfirming: false });
              }
            },
            'Yes'
          )
        );
      }

      switch (status) {
        case __WEBPACK_IMPORTED_MODULE_6__constants_close_dialog_status__["c" /* CLOSE_DIALOG_CLOSING */]:
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__common_components_spinner__["a" /* default */], null);
        case __WEBPACK_IMPORTED_MODULE_6__constants_close_dialog_status__["a" /* CLOSE_DIALOG_NO_ORDERS */]:
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            null,
            'no orders'
          );
        case __WEBPACK_IMPORTED_MODULE_6__constants_close_dialog_status__["b" /* CLOSE_DIALOG_FAILED */]:
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            null,
            'failed'
          );
        case __WEBPACK_IMPORTED_MODULE_6__constants_close_dialog_status__["d" /* CLOSE_DIALOG_PARTIALLY_FAILED */]:
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            null,
            'partially failed'
          );
        case __WEBPACK_IMPORTED_MODULE_6__constants_close_dialog_status__["e" /* CLOSE_DIALOG_SUCCESS */]:
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            null,
            'success'
          );
        default:
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'button',
            {
              className: 'unstyled close-order-button',
              onClick: function onClick() {
                if (!isTradeCommitLocked) {
                  _this2.setState({ isConfirming: true });
                }
              }
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              '\u2205'
            )
          );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var p = this.props;
      var s = this.state;

      var orderID = p.closeType === __WEBPACK_IMPORTED_MODULE_5__constants_trade_close_type__["b" /* POSITION */] ? p.outcomeID : p.orderID;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'article',
        {
          className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('close-dialog', {
            'action-disabled': p.isTradeCommitLocked && p.closeType === __WEBPACK_IMPORTED_MODULE_5__constants_trade_close_type__["b" /* POSITION */],
            'action-running': p.status === __WEBPACK_IMPORTED_MODULE_6__constants_close_dialog_status__["c" /* CLOSE_DIALOG_CLOSING */],
            'action-failed': p.status === __WEBPACK_IMPORTED_MODULE_6__constants_close_dialog_status__["a" /* CLOSE_DIALOG_NO_ORDERS */] || p.status === __WEBPACK_IMPORTED_MODULE_6__constants_close_dialog_status__["b" /* CLOSE_DIALOG_FAILED */] || p.status === __WEBPACK_IMPORTED_MODULE_6__constants_close_dialog_status__["d" /* CLOSE_DIALOG_PARTIALLY_FAILED */],
            'action-succeeded': p.status === __WEBPACK_IMPORTED_MODULE_6__constants_close_dialog_status__["e" /* CLOSE_DIALOG_SUCCESS */]
          })
        },
        this.renderCloseDialogContent(p.marketID, orderID, p.closeType, p.isClosable, p.quantityOfShares, s.isConfirming, p.closePosition, p.status, p.orderType, p.cancelOrder, p.isTradeCommitLocked)
      );
    }
  }]);

  return MarketTradeCloseDialog;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

MarketTradeCloseDialog.propTypes = {
  status: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
};
/* harmony default export */ __webpack_exports__["a"] = (MarketTradeCloseDialog);

/***/ }),

/***/ 1506:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions_update_scalar_market_share_denomination__ = __webpack_require__(536);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_share_denominations__ = __webpack_require__(1460);





/* harmony default export */ __webpack_exports__["a"] = (function () {
  var _store$getState = __WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */].getState(),
      scalarMarketsShareDenomination = _store$getState.scalarMarketsShareDenomination;

  return {
    denominations: denominations,
    markets: scalarMarketsShareDenomination,
    updateSelectedShareDenomination: selectShareDenomination
  };
});

var denominations = [{
  label: 'Shares',
  value: __WEBPACK_IMPORTED_MODULE_2__constants_share_denominations__["c" /* SHARE */]
}, {
  label: 'mShares',
  value: __WEBPACK_IMPORTED_MODULE_2__constants_share_denominations__["b" /* MILLI_SHARE */]
}, {
  label: 'μShares',
  value: __WEBPACK_IMPORTED_MODULE_2__constants_share_denominations__["a" /* MICRO_SHARE */]
}];

function selectShareDenomination(marketID, denomination) {
  __WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */].dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__actions_update_scalar_market_share_denomination__["a" /* updateScalarMarketShareDenomination */])(marketID, denomination));
}

/***/ }),

/***/ 1507:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);



var ReportEthics = function ReportEthics(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'span',
    null,
    !!p.isUnethical && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', {
      className: 'fa fa-thumbs-down report-unethical',
      'data-tip': 'Unethical'
    })
  );
};

ReportEthics.propTypes = {
  isUnethical: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
};

/* harmony default export */ __webpack_exports__["a"] = (ReportEthics);

/***/ }),

/***/ 1508:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return triggerTransactionsExport; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth_actions_load_account_history__ = __webpack_require__(771);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__selectors_transactions__ = __webpack_require__(1564);



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

/***/ 1509:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_components_spinner__ = __webpack_require__(1458);





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

/***/ 1564:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return selectTransactions; });
/* unused harmony export formatTransaction */
/* unused harmony export formatGroupedTransactions */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_reselect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bignumber_js__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bignumber_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_bignumber_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__select_state__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__link_selectors_links__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants_types__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__constants_statuses__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_get_value__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils_format_number__ = __webpack_require__(46);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };













/* unused harmony default export */ var _unused_webpack_default_export = (function () {
  return selectTransactions(__WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */].getState());
});

var selectTransactions = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(__WEBPACK_IMPORTED_MODULE_3__select_state__["H" /* selectTransactionsDataState */], function (transactionsData) {
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
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_get_value__["a" /* default */])(b, 'timestamp.timestamp') - __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_get_value__["a" /* default */])(a, 'timestamp.timestamp');
  });

  return formattedTransactions;
});

function formatTransaction(transaction) {
  var marketLink = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_get_value__["a" /* default */])(transaction, 'data.marketLink');
  if (marketLink == null && transaction.data && (transaction.data.id || transaction.data.marketID) && (transaction.data.description || transaction.description)) {
    marketLink = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__link_selectors_links__["selectMarketLink"])({
      id: transaction.data.id || transaction.data.marketID,
      description: transaction.description
    }, __WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */].dispatch);
  }

  return _extends({}, transaction, {
    data: _extends({}, transaction.data, {
      marketLink: marketLink
    }),
    gas: transaction.gas && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils_format_number__["a" /* formatEther */])(transaction.gas),
    ethTokens: transaction.etherWithoutGas && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils_format_number__["d" /* formatEtherTokens */])(transaction.etherWithoutGas),
    shares: transaction.sharesChange && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils_format_number__["e" /* formatShares */])(transaction.sharesChange),
    rep: transaction.repChange && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils_format_number__["b" /* formatRep */])(transaction.repChange)
  });
}

function formatGroupedTransactions(transactions) {
  var formattedTransactions = transactions.map(function (transaction) {
    return formatTransaction(transaction);
  }).sort(function (a, b) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_get_value__["a" /* default */])(b, 'timestamp.timestamp') - __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_get_value__["a" /* default */])(a, 'timestamp.timestamp');
  });

  var status = formattedTransactions.reduce(function (p, transaction) {
    if (p === __WEBPACK_IMPORTED_MODULE_6__constants_statuses__["b" /* FAILED */] || transaction.status === __WEBPACK_IMPORTED_MODULE_6__constants_statuses__["b" /* FAILED */]) return __WEBPACK_IMPORTED_MODULE_6__constants_statuses__["b" /* FAILED */];
    if (p === __WEBPACK_IMPORTED_MODULE_6__constants_statuses__["c" /* INTERRUPTED */] || transaction.status === __WEBPACK_IMPORTED_MODULE_6__constants_statuses__["c" /* INTERRUPTED */]) return __WEBPACK_IMPORTED_MODULE_6__constants_statuses__["c" /* INTERRUPTED */];
    if (p === __WEBPACK_IMPORTED_MODULE_6__constants_statuses__["d" /* PENDING */] || transaction.status === __WEBPACK_IMPORTED_MODULE_6__constants_statuses__["d" /* PENDING */]) return __WEBPACK_IMPORTED_MODULE_6__constants_statuses__["d" /* PENDING */];
    if (p === __WEBPACK_IMPORTED_MODULE_6__constants_statuses__["e" /* SUBMITTED */] || transaction.status === __WEBPACK_IMPORTED_MODULE_6__constants_statuses__["e" /* SUBMITTED */]) return __WEBPACK_IMPORTED_MODULE_6__constants_statuses__["e" /* SUBMITTED */];
    if (transaction.status === __WEBPACK_IMPORTED_MODULE_6__constants_statuses__["a" /* SUCCESS */]) return __WEBPACK_IMPORTED_MODULE_6__constants_statuses__["a" /* SUCCESS */];

    return p;
  }, null);

  var totalShares = formattedTransactions.reduce(function (p, transaction) {
    return p.plus(new __WEBPACK_IMPORTED_MODULE_1_bignumber_js___default.a(transaction.numShares.value));
  }, new __WEBPACK_IMPORTED_MODULE_1_bignumber_js___default.a(0));

  return {
    status: status,
    message: (formattedTransactions[0].type === __WEBPACK_IMPORTED_MODULE_5__constants_types__["BUY"] ? 'Buy' : 'Sell') + ' ' + totalShares.toNumber() + ' shares of ' + formattedTransactions[0].data.outcomeName,
    description: formattedTransactions[0].description,
    timestamp: formattedTransactions[formattedTransactions.length - 1].timestamp,
    transactions: formattedTransactions
  };
}

/***/ }),

/***/ 1568:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions_cancel_order__ = __webpack_require__(775);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




/* harmony default export */ __webpack_exports__["a"] = (function () {
  var _store$getState = __WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */].getState(),
      orderCancellation = _store$getState.orderCancellation;

  return _extends({}, orderCancellation, {
    cancelOrder: function cancelOrder(orderID, marketID, type) {
      __WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */].dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__actions_cancel_order__["a" /* cancelOrder */])(orderID, marketID, type));
    }
  });
});

/***/ }),

/***/ 1572:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__market_open_orders_row__ = __webpack_require__(1573);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





var MarketOpenOrdersGroup = function MarketOpenOrdersGroup(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'article',
    { className: 'market-open-orders-group' },
    (p.userOpenOrders || []).map(function (order, i) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__market_open_orders_row__["a" /* default */], _extends({
        key: order.id,
        isFirst: i === 0
      }, order, {
        name: p.name,
        marketType: p.marketType,
        lastPricePercent: p.lastPricePercent,
        status: p.orderCancellation[order.id],
        cancellationStatuses: p.orderCancellation.cancellationStatuses,
        cancelOrder: p.orderCancellation.cancelOrder,
        abortCancelOrderConfirmation: p.orderCancellation.abortCancelOrderConfirmation,
        showCancelOrderConfirmation: p.orderCancellation.showCancelOrderConfirmation,
        selectedShareDenomination: p.selectedShareDenomination
      }));
    })
  );
};

/* harmony default export */ __webpack_exports__["a"] = (MarketOpenOrdersGroup);

/***/ }),

/***/ 1573:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_components_value_denomination__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__market_trade_close_dialog__ = __webpack_require__(1505);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__markets_constants_market_types__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants_trade_close_type__ = __webpack_require__(1498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_get_value__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_set_share_denomination__ = __webpack_require__(1461);











var MarketOpenOrdersRow = function MarketOpenOrdersRow(p) {
  var unmatchedShares = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_set_share_denomination__["a" /* default */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_get_value__["a" /* default */])(p, 'unmatchedShares.formatted'), p.selectedShareDenomination);

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'article',
    { className: 'market-open-orders-row not-selectable ' + (p.isFirst ? 'isFirst' : '') },
    p.isFirst ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'span',
      null,
      p.marketType === __WEBPACK_IMPORTED_MODULE_3__markets_constants_market_types__["a" /* SCALAR */] ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__common_components_value_denomination__["a" /* default */], { formatted: p.lastPricePercent }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        null,
        p.name
      )
    ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', null),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'span',
      null,
      p.type
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__common_components_value_denomination__["a" /* default */], { formatted: unmatchedShares }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__common_components_value_denomination__["a" /* default */], p.avgPrice),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__market_trade_close_dialog__["a" /* default */], {
      closeType: __WEBPACK_IMPORTED_MODULE_4__constants_trade_close_type__["a" /* ORDER */],
      marketID: p.marketID,
      orderID: p.id,
      status: p.status,
      orderType: p.type,
      cancelOrder: p.cancelOrder
    })
  );
};

/* harmony default export */ __webpack_exports__["a"] = (MarketOpenOrdersRow);

/***/ }),

/***/ 1574:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return selectClosePositionStatus; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_reselect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__select_state__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions_clear_close_position_outcome__ = __webpack_require__(539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__market_constants_close_dialog_status__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__transactions_constants_statuses__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__trade_actions_update_trade_commitment__ = __webpack_require__(133);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }










/* harmony default export */ __webpack_exports__["b"] = (function () {
  return selectClosePositionStatus(__WEBPACK_IMPORTED_MODULE_1__store__["a" /* default */].getState());
});

var selectClosePositionStatus = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(__WEBPACK_IMPORTED_MODULE_2__select_state__["G" /* selectClosePositionTradeGroupsState */], __WEBPACK_IMPORTED_MODULE_2__select_state__["H" /* selectTransactionsDataState */], function (closePositionTradeGroups, transactionsData) {
  var statuses = Object.keys(closePositionTradeGroups).reduce(function (p, marketID) {
    var outcomeStatuses = Object.keys(closePositionTradeGroups[marketID]).reduce(function (p, outcomeID) {
      var closePositionTransactionIDs = closePositionTradeGroups[marketID][outcomeID].reduce(function (p, tradeGroupID) {
        var transactionIDs = Object.keys(transactionsData).filter(function (transactionID) {
          return transactionsData[transactionID].tradeGroupID === tradeGroupID;
        });

        if (transactionIDs.length !== 0) {
          return [].concat(_toConsumableArray(p), _toConsumableArray(transactionIDs));
        }

        return p;
      }, []);

      // closing failed further up in the call chain to close position
      if (closePositionTradeGroups[marketID][outcomeID][0] === __WEBPACK_IMPORTED_MODULE_4__market_constants_close_dialog_status__["b" /* CLOSE_DIALOG_FAILED */]) {
        delayClearTradeGroupIDs(marketID, outcomeID);

        return _extends({}, p, _defineProperty({}, outcomeID, __WEBPACK_IMPORTED_MODULE_4__market_constants_close_dialog_status__["b" /* CLOSE_DIALOG_FAILED */]));
      }

      // no orders are available within the outcome's order book
      if (closePositionTradeGroups[marketID][outcomeID][0] === __WEBPACK_IMPORTED_MODULE_4__market_constants_close_dialog_status__["a" /* CLOSE_DIALOG_NO_ORDERS */]) {
        delayClearTradeGroupIDs(marketID, outcomeID);

        return _extends({}, p, _defineProperty({}, outcomeID, __WEBPACK_IMPORTED_MODULE_4__market_constants_close_dialog_status__["a" /* CLOSE_DIALOG_NO_ORDERS */]));
      }

      // Short Circuit until transactionsData is updated with the tradeGroupID
      if (closePositionTransactionIDs.length === 0 && closePositionTradeGroups[marketID][outcomeID]) {
        return _extends({}, p, _defineProperty({}, outcomeID, __WEBPACK_IMPORTED_MODULE_4__market_constants_close_dialog_status__["c" /* CLOSE_DIALOG_CLOSING */]));
      }

      var numberOfFailedTransactions = closePositionTransactionIDs.filter(function (transactionID) {
        return transactionsData[transactionID].status === __WEBPACK_IMPORTED_MODULE_5__transactions_constants_statuses__["b" /* FAILED */];
      }).length;

      // Close Position Completely Failed
      if (numberOfFailedTransactions === closePositionTransactionIDs.length) {
        delayClearTradeGroupIDs(marketID, outcomeID);

        return _extends({}, p, _defineProperty({}, outcomeID, __WEBPACK_IMPORTED_MODULE_4__market_constants_close_dialog_status__["b" /* CLOSE_DIALOG_FAILED */]));
      }

      // Close Position Completely Succeeded
      var numberOfSuccessfulTransactions = closePositionTransactionIDs.filter(function (transactionID) {
        return transactionsData[transactionID].status === __WEBPACK_IMPORTED_MODULE_5__transactions_constants_statuses__["a" /* SUCCESS */];
      }).length;

      if (numberOfSuccessfulTransactions === closePositionTransactionIDs.length) {
        delayClearTradeGroupIDs(marketID, outcomeID);

        return _extends({}, p, _defineProperty({}, outcomeID, __WEBPACK_IMPORTED_MODULE_4__market_constants_close_dialog_status__["e" /* CLOSE_DIALOG_SUCCESS */]));
      }

      // Close Position Partially Failed
      if (numberOfFailedTransactions && numberOfFailedTransactions !== closePositionTransactionIDs.length && numberOfSuccessfulTransactions === 0) {

        return _extends({}, p, _defineProperty({}, outcomeID, __WEBPACK_IMPORTED_MODULE_4__market_constants_close_dialog_status__["d" /* CLOSE_DIALOG_PARTIALLY_FAILED */]));
      } else if (numberOfFailedTransactions && numberOfFailedTransactions + numberOfSuccessfulTransactions === closePositionTransactionIDs.length) {
        delayClearTradeGroupIDs(marketID, outcomeID);

        return _extends({}, p, _defineProperty({}, outcomeID, __WEBPACK_IMPORTED_MODULE_4__market_constants_close_dialog_status__["d" /* CLOSE_DIALOG_PARTIALLY_FAILED */]));
      }

      // Close Position In-Process without Failures
      return _extends({}, p, _defineProperty({}, outcomeID, __WEBPACK_IMPORTED_MODULE_4__market_constants_close_dialog_status__["c" /* CLOSE_DIALOG_CLOSING */]));
    }, {});

    if (Object.keys(outcomeStatuses).length !== 0) {
      return _extends({}, p, _defineProperty({}, marketID, outcomeStatuses));
    }

    return p;
  }, {});

  return statuses;
});

// waits, then clears tradeIDs from closePositionTradeGroups
// This will ultimately clear the outcome status and allow for the
// user to try again if an action is available
function delayClearTradeGroupIDs(marketID, outcomeID) {
  setTimeout(function () {
    __WEBPACK_IMPORTED_MODULE_1__store__["a" /* default */].dispatch({
      type: __WEBPACK_IMPORTED_MODULE_6__trade_actions_update_trade_commitment__["a" /* UPDATE_TRADE_COMMIT_LOCK */],
      isLocked: false
    });
    __WEBPACK_IMPORTED_MODULE_1__store__["a" /* default */].dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__actions_clear_close_position_outcome__["a" /* clearClosePositionOutcome */])(marketID, outcomeID));
  }, 3000);
}

/***/ }),

/***/ 1663:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_components_value_denomination__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_components_value_date__ = __webpack_require__(1497);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };






var Market = function Market(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'article',
    {
      className: 'my-market portfolio-detail'
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      {
        className: 'portfolio-group portfolio-main-group'
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        {
          className: 'main-group-title'
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          null,
          'ends: '
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__common_components_value_date__["a" /* default */], p.endDate)
      )
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
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__common_components_value_denomination__["a" /* default */], _extends({
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
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__common_components_value_denomination__["a" /* default */], p.openVolume)
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'portfolio-pair' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'title' },
          'volume'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__common_components_value_denomination__["a" /* default */], p.volume)
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'portfolio-pair total-cost' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'title' },
          '# of trades'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__common_components_value_denomination__["a" /* default */], p.numberOfTrades)
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'portfolio-pair total-value' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'title' },
          'avg trade size'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__common_components_value_denomination__["a" /* default */], p.averageTradeSize)
      )
    )
  );
};

Market.propTypes = {
  endDate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  fees: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  openVolume: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  volume: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  numberOfTrades: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  averageTradeSize: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (Market);

/***/ }),

/***/ 1664:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_components_null_state_message__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__my_market__ = __webpack_require__(1663);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__link_components_link__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__transactions_components_transactions_loading_actions__ = __webpack_require__(1509);








var MyMarkets = function MyMarkets(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'article',
    { className: 'my-markets' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'view-header' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'view-header-group' }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'view-header-group' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__transactions_components_transactions_loading_actions__["a" /* default */], {
          loadMoreTransactions: p.loadMoreTransactions,
          loadAllTransactions: p.loadAllTransactions,
          transactionsLoading: p.transactionsLoading,
          hasAllTransactionsLoaded: p.hasAllTransactionsLoaded,
          triggerTransactionsExport: p.triggerTransactionsExport,
          registerBlockNumber: p.registerBlockNumber
        })
      )
    ),
    p.myMarkets && p.myMarkets.length ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      null,
      p.myMarkets.map(function (market) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          {
            key: market.id,
            className: 'portfolio-market'
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            {
              className: 'my-market-overview portfolio-market-overview'
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_4__link_components_link__["a" /* default */],
              market.marketLink,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'span',
                null,
                market.description
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__my_market__["a" /* default */], market)
        );
      })
    ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__common_components_null_state_message__["a" /* default */], { message: 'No Markets Created' })
  );
};

MyMarkets.propTypes = {
  myMarkets: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (MyMarkets);

/***/ }),

/***/ 1665:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_my_markets__ = __webpack_require__(1664);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__selectors_my_markets__ = __webpack_require__(793);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_actions_load_account_history__ = __webpack_require__(771);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__transactions_actions_trigger_transactions_export__ = __webpack_require__(1508);







var mapStateToProps = function mapStateToProps(state) {
  return {
    myMarkets: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__selectors_my_markets__["a" /* default */])(),
    transactionsLoading: state.transactionsLoading,
    hasAllTransactionsLoaded: state.transactionsOldestLoadedBlock === state.loginAccount.registerBlockNumber,
    registerBlockNumber: state.loginAccount.registerBlockNumber
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    loadMoreTransactions: function loadMoreTransactions() {
      return dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__auth_actions_load_account_history__["a" /* loadAccountHistory */])());
    },
    loadAllTransactions: function loadAllTransactions() {
      return dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__auth_actions_load_account_history__["a" /* loadAccountHistory */])(true));
    },
    triggerTransactionsExport: function triggerTransactionsExport() {
      return dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__transactions_actions_trigger_transactions_export__["a" /* triggerTransactionsExport */])());
    }
  };
};

var MyMarketsContainer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react_redux__["b" /* connect */])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_1__components_my_markets__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (MyMarketsContainer);

/***/ }),

/***/ 1666:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__market_components_market_open_orders_group__ = __webpack_require__(1572);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__markets_constants_market_types__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_get_value__ = __webpack_require__(43);









var MyOrders = function MyOrders(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'article',
    { className: 'my-orders market-open-orders' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'market-open-orders-header' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        null,
        !p.marketType === __WEBPACK_IMPORTED_MODULE_3__markets_constants_market_types__["a" /* SCALAR */] ? 'Outcomes' : 'Outcome'
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        null,
        'Type'
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        null,
        'Shares'
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        null,
        'Price'
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        null,
        'Action'
      )
    ),
    (p.outcomes || []).map(function (outcome, index) {
      var lastPricePercent = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_get_value__["a" /* default */])(outcome, 'lastPricePercent.rounded');

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__market_components_market_open_orders_group__["a" /* default */], {
        key: outcome.name,
        id: outcome.id,
        name: outcome.name,
        marketType: p.marketType,
        lastPricePercent: lastPricePercent,
        userOpenOrders: outcome.userOpenOrders,
        orderCancellation: p.orderCancellation,
        selectedShareDenomination: p.selectedShareDenomination
      });
    })
  );
};

MyOrders.propTypes = {
  outcomes: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired,
  marketType: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  orderCancellation: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (MyOrders);

/***/ }),

/***/ 1667:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_my_orders__ = __webpack_require__(1666);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_open_orders_selectors_open_orders__ = __webpack_require__(780);






var mapStateToProps = function mapStateToProps(state) {
  return {
    orders: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__user_open_orders_selectors_open_orders__["default"])()
  };
};

var Orders = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react_redux__["b" /* connect */])(mapStateToProps)(__WEBPACK_IMPORTED_MODULE_1__components_my_orders__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Orders);

/***/ }),

/***/ 1668:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__link_components_link__ = __webpack_require__(530);





var PositionsMarketOverview = function PositionsMarketOverview(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'article',
    { className: 'my-positions-overview portfolio-market-overview' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_2__link_components_link__["a" /* default */],
      {
        href: p.marketLink.href,
        onClick: p.marketLink.onClick
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        { className: 'my-positions-market-description' },
        p.description
      )
    )
  );
};

PositionsMarketOverview.propTypes = {
  description: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  marketLink: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (PositionsMarketOverview);

/***/ }),

/***/ 1669:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_components_value_denomination__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__market_components_market_trade_close_dialog__ = __webpack_require__(1505);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__markets_constants_market_types__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__market_constants_trade_close_type__ = __webpack_require__(1498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_get_value__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_set_share_denomination__ = __webpack_require__(1461);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };













var MyPosition = function MyPosition(p) {
  var marketID = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_get_value__["a" /* default */])(p, 'marketID');
  var outcomeID = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_get_value__["a" /* default */])(p, 'id');

  var selectedShareDenomination = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_get_value__["a" /* default */])(p, 'scalarShareDenomination.markets.' + marketID);
  var quantityOfShares = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_set_share_denomination__["a" /* default */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_get_value__["a" /* default */])(p, 'position.qtyShares.formatted'), selectedShareDenomination);

  var isClosable = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_get_value__["a" /* default */])(p, 'position.isClosable');
  var closePosition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_get_value__["a" /* default */])(p, 'position.closePosition');

  var status = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_get_value__["a" /* default */])(p, 'closePositionStatus.' + marketID + '.' + outcomeID);

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'my-position portfolio-detail' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'portfolio-group main-group' },
      p.type === __WEBPACK_IMPORTED_MODULE_4__markets_constants_market_types__["a" /* SCALAR */] ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        { className: 'main-group-title' },
        p.lastPricePercent.rounded
      ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        { className: 'main-group-title' },
        p.name
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'portfolio-pair realized-net' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'title' },
          'shares'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__common_components_value_denomination__["a" /* default */], _extends({}, p.qtyShares, {
          denomination: ''
        }))
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'portfolio-group' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'portfolio-pair purchase-price' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'title' },
          'average price of open position'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__common_components_value_denomination__["a" /* default */], p.purchasePrice)
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'portfolio-pair last-price' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'title' },
          'last trade price'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__common_components_value_denomination__["a" /* default */], p.lastPrice)
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'portfolio-group' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'portfolio-pair realized-net' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'title' },
          'realized P/L'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__common_components_value_denomination__["a" /* default */], p.realizedNet)
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'portfolio-pair unrealized-net' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'title' },
          'unrealized P/L'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__common_components_value_denomination__["a" /* default */], p.unrealizedNet)
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'portfolio-pair total-net' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'title' },
          'total P/L'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__common_components_value_denomination__["a" /* default */], p.totalNet)
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'close-trades' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__market_components_market_trade_close_dialog__["a" /* default */], {
        closeType: __WEBPACK_IMPORTED_MODULE_5__market_constants_trade_close_type__["b" /* POSITION */],
        marketID: marketID,
        outcomeID: outcomeID,
        quantityOfShares: quantityOfShares,
        closePosition: closePosition,
        isClosable: isClosable,
        status: status,
        isTradeCommitLocked: p.isTradeCommitLocked
      })
    )
  );
};

MyPosition.propTypes = {
  marketID: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  scalarShareDenomination: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  position: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  closePositionStatus: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  lastPricePercent: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  name: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  qtyShares: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  purchasePrice: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  lastPrice: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  realizedNet: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  unrealizedNet: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  totalNet: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (MyPosition);

/***/ }),

/***/ 1670:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_components_component_nav__ = __webpack_require__(1459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_components_value_denomination__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_components_null_state_message__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__my_position__ = __webpack_require__(1669);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__my_position_overview__ = __webpack_require__(1668);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__my_orders_container__ = __webpack_require__(1667);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__constants_internal_views__ = __webpack_require__(1672);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__utils_get_value__ = __webpack_require__(43);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
















var MyPositionsMarket = function (_Component) {
  _inherits(MyPositionsMarket, _Component);

  function MyPositionsMarket(props) {
    var _this$navItems;

    _classCallCheck(this, MyPositionsMarket);

    var _this = _possibleConstructorReturn(this, (MyPositionsMarket.__proto__ || Object.getPrototypeOf(MyPositionsMarket)).call(this, props));

    _this.navItems = (_this$navItems = {}, _defineProperty(_this$navItems, __WEBPACK_IMPORTED_MODULE_8__constants_internal_views__["a" /* POSITIONS_POSITIONS */], {
      label: 'Positions'
    }), _defineProperty(_this$navItems, __WEBPACK_IMPORTED_MODULE_8__constants_internal_views__["b" /* POSITIONS_ORDERS */], {
      label: 'Orders'
    }), _this$navItems);

    _this.state = {
      selectedNav: __WEBPACK_IMPORTED_MODULE_8__constants_internal_views__["a" /* POSITIONS_POSITIONS */]
    };
    return _this;
  }

  _createClass(MyPositionsMarket, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var p = this.props;
      var s = this.state;

      var myPositionOutcomes = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__utils_get_value__["a" /* default */])(p, 'market.myPositionOutcomes');
      var myPositionsSummary = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__utils_get_value__["a" /* default */])(p, 'market.myPositionsSummary');
      var marketLink = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__utils_get_value__["a" /* default */])(p, 'market.marketLink');

      var userOpenOrdersCount = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__utils_get_value__["a" /* default */])(p, 'market.userOpenOrdersSummary.openOrdersCount.value');
      var outcomes = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__utils_get_value__["a" /* default */])(p, 'market.outcomes');

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'article',
        {
          className: 'my-positions-market portfolio-market'
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__my_position_overview__["a" /* default */], {
          description: p.market.description,
          marketLink: marketLink
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__common_components_component_nav__["a" /* default */], {
          navItems: this.navItems,
          selectedNav: s.selectedNav,
          updateSelectedNav: function updateSelectedNav(selectedNav) {
            return _this2.setState({ selectedNav: selectedNav });
          }
        }),
        s.selectedNav === __WEBPACK_IMPORTED_MODULE_8__constants_internal_views__["a" /* POSITIONS_POSITIONS */] && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          null,
          myPositionOutcomes && myPositionOutcomes.length ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'my-position portfolio-detail' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'portfolio-group main-group' }),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'portfolio-group' }),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'portfolio-group' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'portfolio-pair realized-net' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'span',
                    { className: 'title' },
                    'total realized P/L'
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__common_components_value_denomination__["a" /* default */], myPositionsSummary.realizedNet)
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'portfolio-pair unrealized-net' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'span',
                    { className: 'title' },
                    'total unrealized P/L'
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__common_components_value_denomination__["a" /* default */], myPositionsSummary.unrealizedNet)
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'portfolio-pair total-net' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'span',
                    { className: 'title' },
                    'total P/L'
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__common_components_value_denomination__["a" /* default */], myPositionsSummary.totalNet)
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'close-trades' })
            ),
            (myPositionOutcomes || []).map(function (outcome) {
              return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__my_position__["a" /* default */], _extends({}, outcome, outcome.position, {
                key: p.market.id + '-' + outcome.id,
                type: p.market.type,
                closePositionStatus: p.closePositionStatus,
                isTradeCommitLocked: p.isTradeCommitLocked,
                scalarShareDenomination: p.scalarShareDenomination
              }));
            })
          ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__common_components_null_state_message__["a" /* default */], { message: 'No Positions Held' })
        ),
        s.selectedNav === __WEBPACK_IMPORTED_MODULE_8__constants_internal_views__["b" /* POSITIONS_ORDERS */] && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          null,
          userOpenOrdersCount ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__my_orders_container__["a" /* default */], {
            outcomes: outcomes,
            marketType: p.market.type,
            orderCancellation: p.orderCancellation
          }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__common_components_null_state_message__["a" /* default */], { message: 'No Open Orders' })
        )
      );
    }
  }]);

  return MyPositionsMarket;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

MyPositionsMarket.propTypes = {
  market: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  isTradeCommitLocked: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  closePositionStatus: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  scalarShareDenomination: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  orderCancellation: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
};
/* harmony default export */ __webpack_exports__["a"] = (MyPositionsMarket);

/***/ }),

/***/ 1671:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_components_null_state_message__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__my_positions_market__ = __webpack_require__(1670);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__transactions_components_transactions_loading_actions__ = __webpack_require__(1509);







var MyPositions = function MyPositions(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'article',
    { className: 'my-positions' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'view-header' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'view-header-group' }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'view-header-group' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__transactions_components_transactions_loading_actions__["a" /* default */], {
          loadMoreTransactions: p.loadMoreTransactions,
          loadAllTransactions: p.loadAllTransactions,
          transactionsLoading: p.transactionsLoading,
          hasAllTransactionsLoaded: p.hasAllTransactionsLoaded,
          triggerTransactionsExport: p.triggerTransactionsExport,
          registerBlockNumber: p.registerBlockNumber
        })
      )
    ),
    p.markets && p.markets.length ? p.markets.map(function (market) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__my_positions_market__["a" /* default */], {
        key: market.id,
        market: market,
        closePositionStatus: p.closePositionStatus,
        isTradeCommitLocked: p.isTradeCommitLocked,
        scalarShareDenomination: p.scalarShareDenomination,
        orderCancellation: p.orderCancellation
      });
    }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__common_components_null_state_message__["a" /* default */], {
      message: 'No Positions Held'
    })
  );
};

MyPositions.propTypes = {
  markets: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired,
  isTradeCommitLocked: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  closePositionStatus: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  scalarShareDenomination: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  orderCancellation: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  registerBlockNumber: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number
};

/* harmony default export */ __webpack_exports__["a"] = (MyPositions);

/***/ }),

/***/ 1672:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return POSITIONS_POSITIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return POSITIONS_ORDERS; });
var POSITIONS_POSITIONS = 'POSITIONS_POSITIONS';
var POSITIONS_ORDERS = 'POSITIONS_ORDERS';

/***/ }),

/***/ 1673:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_memoizee__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_memoizee___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_memoizee__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_my_positions__ = __webpack_require__(1671);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__selectors_login_account_positions__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_open_orders_selectors_open_orders__ = __webpack_require__(780);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__selectors_close_position_status__ = __webpack_require__(1574);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__market_selectors_scalar_share_denomination__ = __webpack_require__(1506);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__bids_asks_selectors_order_cancellation__ = __webpack_require__(1568);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__auth_actions_load_account_history__ = __webpack_require__(771);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__transactions_actions_trigger_transactions_export__ = __webpack_require__(1508);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }














var mapStateToProps = function mapStateToProps(state) {
  var positions = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__selectors_login_account_positions__["a" /* default */])();
  var openOrders = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__user_open_orders_selectors_open_orders__["default"])();

  return {
    markets: getPositionsMarkets(positions, openOrders),
    isTradeCommitLocked: state.tradeCommitLock.isLocked,
    closePositionStatus: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__selectors_close_position_status__["b" /* default */])(),
    scalarShareDenomination: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__market_selectors_scalar_share_denomination__["a" /* default */])(),
    orderCancellation: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__bids_asks_selectors_order_cancellation__["a" /* default */])(),
    transactionsLoading: state.transactionsLoading,
    hasAllTransactionsLoaded: state.transactionsOldestLoadedBlock === state.loginAccount.registerBlockNumber,
    registerBlockNumber: state.loginAccount.registerBlockNumber
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    loadMoreTransactions: function loadMoreTransactions() {
      return dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__auth_actions_load_account_history__["a" /* loadAccountHistory */])());
    },
    loadAllTransactions: function loadAllTransactions() {
      return dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__auth_actions_load_account_history__["a" /* loadAccountHistory */])(true));
    },
    triggerTransactionsExport: function triggerTransactionsExport() {
      return dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__transactions_actions_trigger_transactions_export__["a" /* triggerTransactionsExport */])());
    }
  };
};

var MyPositionsContainer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react_redux__["b" /* connect */])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_2__components_my_positions__["a" /* default */]);

var getPositionsMarkets = __WEBPACK_IMPORTED_MODULE_1_memoizee___default()(function (positions, openOrders) {
  return Array.from(new Set([].concat(_toConsumableArray(positions.markets), _toConsumableArray(openOrders))));
}, { max: 1 });

/* harmony default export */ __webpack_exports__["a"] = (MyPositionsContainer);

/***/ }),

/***/ 1674:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_tooltip__ = __webpack_require__(533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_components_value_denomination__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_components_value_date__ = __webpack_require__(1497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_components_em_dash__ = __webpack_require__(769);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__report_ethics__ = __webpack_require__(1507);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };










var MyReport = function MyReport(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'article',
    {
      className: 'my-report portfolio-detail'
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'portfolio-group portfolio-main-group' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'portfolio-pair' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'main-group-title' },
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
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__common_components_value_denomination__["a" /* default */], p.outcomePercentage),
            ')'
          ),
          p.outcome && !p.outcomePercentage && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            null,
            p.outcome
          ),
          !p.outcome && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__common_components_em_dash__["a" /* default */], null)
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
            p.reported || __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__common_components_em_dash__["a" /* default */], null)
          ),
          !!p.isRevealed && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'report-revealed' },
            p.reported || __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__common_components_em_dash__["a" /* default */], null)
          ),
          !p.isRevealed && !p.isCommitted && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            null,
            p.reported || __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__common_components_em_dash__["a" /* default */], null)
          ),
          !!p.outcome && p.isReportEqual && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', {
            className: 'fa fa-check-circle report-equal',
            'data-tip': 'Your report matches the consensus outcome'
          }),
          !!p.outcome && !p.isReportEqual && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', {
            className: 'fa fa-times-circle report-unequal',
            'data-tip': 'Your report does not match the consensus outcome'
          }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__report_ethics__["a" /* default */], { isUnethical: p.isUnethical })
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
          ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__common_components_em_dash__["a" /* default */], null)
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
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__common_components_value_denomination__["a" /* default */], _extends({
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
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__common_components_value_date__["a" /* default */], p.endDate)
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_tooltip___default.a, { type: 'light', effect: 'solid', place: 'top' })
  );
};

MyReport.propTypes = {
  outcome: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  outcomePercentage: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  reported: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  repEarned: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  period: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  isCommitted: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  isRevealed: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  isReportEqual: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  isUnethical: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  branch: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  endDate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (MyReport);

/***/ }),

/***/ 1675:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_tooltip__ = __webpack_require__(533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_components_null_state_message__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__my_report__ = __webpack_require__(1674);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__link_components_link__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__transactions_components_transactions_loading_actions__ = __webpack_require__(1509);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };










var MyReports = function MyReports(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'article',
    { className: 'my-reports' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'view-header' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'view-header-group' }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'view-header-group' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__transactions_components_transactions_loading_actions__["a" /* default */], {
          loadMoreTransactions: p.loadMoreTransactions,
          loadAllTransactions: p.loadAllTransactions,
          transactionsLoading: p.transactionsLoading,
          hasAllTransactionsLoaded: p.hasAllTransactionsLoaded,
          triggerTransactionsExport: p.triggerTransactionsExport,
          registerBlockNumber: p.registerBlockNumber
        })
      )
    ),
    p.reports && p.reports.length ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      null,
      p.reports.map(function (market) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          {
            key: market.marketID,
            className: 'portfolio-market'
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            {
              className: 'portfolio-market-overview'
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_5__link_components_link__["a" /* default */],
              market.marketLink,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'span',
                { className: 'description' },
                market.description
              )
            ),
            market.isChallenged && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', {
              className: 'fa fa-gavel outcome-challenged',
              'data-tip': 'This outcome is currently being challenged'
            }),
            !market.isChallenged && market.isChallengeable && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', {
              className: 'fa fa-exclamation-circle outcome-challengeable',
              'data-tip': 'This outcome is eligible to be challenged'
            })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__my_report__["a" /* default */], _extends({}, market, {
            branch: p.branch
          }))
        );
      })
    ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__common_components_null_state_message__["a" /* default */], { message: 'No Reports Made' }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_tooltip___default.a, { type: 'light', effect: 'solid', place: 'top' })
  );
};

MyReports.propTypes = {
  branch: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  reports: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired,
  registerBlockNumber: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number
};

/* harmony default export */ __webpack_exports__["a"] = (MyReports);

/***/ }),

/***/ 1676:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_my_reports__ = __webpack_require__(1675);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__selectors_my_reports__ = __webpack_require__(794);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_actions_load_account_history__ = __webpack_require__(771);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__transactions_actions_trigger_transactions_export__ = __webpack_require__(1508);







var mapStateToProps = function mapStateToProps(state) {
  return {
    branch: state.branch,
    reports: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__selectors_my_reports__["a" /* default */])(),
    transactionsLoading: state.transactionsLoading,
    hasAllTransactionsLoaded: state.transactionsOldestLoadedBlock === state.loginAccount.registerBlockNumber,
    registerBlockNumber: state.loginAccount.registerBlockNumber
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    loadMoreTransactions: function loadMoreTransactions() {
      return dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__auth_actions_load_account_history__["a" /* loadAccountHistory */])());
    },
    loadAllTransactions: function loadAllTransactions() {
      return dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__auth_actions_load_account_history__["a" /* loadAccountHistory */])(true));
    },
    triggerTransactionsExport: function triggerTransactionsExport() {
      return dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__transactions_actions_trigger_transactions_export__["a" /* triggerTransactionsExport */])());
    }
  };
};

var MyReportsContainer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react_redux__["b" /* connect */])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_1__components_my_reports__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (MyReportsContainer);

/***/ }),

/***/ 1688:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__my_positions_container__ = __webpack_require__(1673);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__my_markets_container__ = __webpack_require__(1665);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__my_reports_container__ = __webpack_require__(1676);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_constants_views__ = __webpack_require__(56);









var PortfolioView = function PortfolioView(p) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'section',
    { id: 'portfolio_view' },
    p.activeView === __WEBPACK_IMPORTED_MODULE_5__app_constants_views__["c" /* MY_POSITIONS */] && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__my_positions_container__["a" /* default */], null),
    p.activeView === __WEBPACK_IMPORTED_MODULE_5__app_constants_views__["d" /* MY_MARKETS */] && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__my_markets_container__["a" /* default */], null),
    p.activeView === __WEBPACK_IMPORTED_MODULE_5__app_constants_views__["e" /* MY_REPORTS */] && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__my_reports_container__["a" /* default */], null)
  );
};

PortfolioView.propTypes = {
  activeView: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (PortfolioView);

/***/ })

});
//# sourceMappingURL=portfolio.b826d96d5c520ee9e6f7.js.map