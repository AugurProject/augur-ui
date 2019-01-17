/* eslint jsx-a11y/label-has-for: 0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { BigNumber, createBigNumber } from "utils/create-big-number";
import { MIN_QUANTITY } from "modules/trades/constants/numbers";
import {
  YES_NO,
  CATEGORICAL,
  SCALAR
} from "modules/markets/constants/market-types";
import { isEqual } from "lodash";
// import ReactTooltip from "react-tooltip";
// import TooltipStyles from "modules/common/less/tooltip.styles";
import FormStyles from "modules/common/less/form";
import Styles from "modules/trading/components/trading--form/trading--form.styles";

import TradingOutcomesDropdown from "modules/trading/components/trading-outcomes-dropdown/trading-outcomes-dropdown";
import Checkbox from "src/modules/common/components/checkbox/checkbox";

class TradingForm extends Component {
  static propTypes = {
    isMobile: PropTypes.bool.isRequired,
    market: PropTypes.object.isRequired,
    marketType: PropTypes.string.isRequired,
    maxPrice: PropTypes.instanceOf(BigNumber).isRequired,
    minPrice: PropTypes.instanceOf(BigNumber).isRequired,
    orderEthEstimate: PropTypes.string.isRequired,
    orderShareEstimate: PropTypes.string.isRequired,
    orderPrice: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object
    ]).isRequired,
    orderQuantity: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object
    ]).isRequired,
    selectedNav: PropTypes.string.isRequired,
    selectedOutcome: PropTypes.object.isRequired,
    updateState: PropTypes.func.isRequired,
    doNotCreateOrders: PropTypes.bool.isRequired,
    updateSelectedOutcome: PropTypes.func.isRequired,
    clearOrderForm: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.INPUT_TYPES = {
      QUANTITY: "orderQuantity",
      PRICE: "orderPrice",
      DO_NOT_CREATE_ORDERS: "doNotCreateOrders",
      EST_ETH: "orderEthEstimate",
      MARKET_ORDER_SIZE: "marketOrderSize"
    };

    this.TRADE_MAX_COST = "tradeMaxCost";
    this.MINIMUM_TRADE_VALUE = createBigNumber(1, 10).dividedBy(10000);
    this.orderValidation = this.orderValidation.bind(this);
    this.testQuantity = this.testQuantity.bind(this);
    this.testPrice = this.testPrice.bind(this);
    this.updateTrade = this.updateTrade.bind(this);
    const startState = {
      [this.INPUT_TYPES.QUANTITY]: props.orderQuantity,
      [this.INPUT_TYPES.PRICE]: props.orderPrice,
      [this.INPUT_TYPES.DO_NOT_CREATE_ORDERS]: props.doNotCreateOrders,
      [this.INPUT_TYPES.EST_ETH]: "",
      errors: {
        [this.INPUT_TYPES.QUANTITY]: [],
        [this.INPUT_TYPES.PRICE]: [],
        [this.INPUT_TYPES.MARKET_ORDER_SIZE]: [],
        [this.TRADE_MAX_COST]: [],
        [this.INPUT_TYPES.EST_ETH]: []
      }
    };
    this.state = {
      ...startState,
      isOrderValid: this.orderValidation(startState).isOrderValid
    };
    this.changeOutcomeDropdown = this.changeOutcomeDropdown.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { orderEthEstimate, orderShareEstimate, selectedNav } = this.props;
    // make sure to keep Quantity and Price as bigNumbers
    const nextQuantity = nextProps[this.INPUT_TYPES.QUANTITY];
    const nextPrice = nextProps[this.INPUT_TYPES.PRICE];
    const nextEstEth =
      nextProps[this.INPUT_TYPES.EST_ETH] === "0"
        ? ""
        : nextProps[this.INPUT_TYPES.EST_ETH];
    const ethEstimate = orderEthEstimate === "0" ? "" : orderEthEstimate;

    const newStateInfo = {
      [this.INPUT_TYPES.QUANTITY]: nextQuantity
        ? createBigNumber(nextQuantity, 10)
        : nextQuantity,
      [this.INPUT_TYPES.PRICE]:
        nextPrice && nextPrice !== ""
          ? createBigNumber(nextPrice, 10)
          : nextPrice,
      [this.INPUT_TYPES.MARKET_ORDER_SIZE]:
        nextProps[this.INPUT_TYPES.MARKET_ORDER_SIZE],
      [this.INPUT_TYPES.DO_NOT_CREATE_ORDERS]:
        nextProps[this.INPUT_TYPES.DO_NOT_CREATE_ORDERS],
      [this.INPUT_TYPES.EST_ETH]:
        nextEstEth && nextEstEth !== ""
          ? createBigNumber(nextEstEth, 10)
          : nextEstEth
    };
    const currentStateInfo = {
      [this.INPUT_TYPES.QUANTITY]: this.state[this.INPUT_TYPES.QUANTITY],
      [this.INPUT_TYPES.PRICE]: this.state[this.INPUT_TYPES.PRICE],
      [this.INPUT_TYPES.EST_ETH]: this.state[this.INPUT_TYPES.EST_ETH],
      [this.INPUT_TYPES.MARKET_ORDER_SIZE]: this.state[
        this.INPUT_TYPES.MARKET_ORDER_SIZE
      ],
      [this.INPUT_TYPES.DO_NOT_CREATE_ORDERS]: this.state[
        this.INPUT_TYPES.DO_NOT_CREATE_ORDERS
      ]
    };
    const newOrderInfo = {
      orderEthEstimate: ethEstimate,
      orderShareEstimate: nextProps.orderShareEstimate,
      selectedNav: nextProps.selectedNav,
      ...newStateInfo
    };
    const currentOrderInfo = {
      orderShareEstimate,
      selectedNav,
      ...currentStateInfo
    };

    if (!isEqual(newOrderInfo, currentOrderInfo)) {
      const validation = this.orderValidation(newStateInfo, nextProps);
      if (
        validation.errorCount === 0 &&
        newStateInfo.orderPrice &&
        newStateInfo.orderQuantity
      ) {
        // trade has changed, lets update trade.
        this.updateTrade(newStateInfo, nextProps);
      }

      // const nextTradePrice = nextProps.selectedOutcome.trade.limitPrice;
      // const prevTradePrice = selectedOutcome.trade.limitPrice;
      // limitPrice is being defaulted and we had no value in the input box
      // const priceChange = prevTradePrice === null && nextTradePrice !== null;
      // limitPrice is being updated in the background, but we have no limitPrice input set.
      /*      const forcePriceUpdate =
        prevTradePrice === nextTradePrice &&
        nextTradePrice !== null &&
        isNaN(
          this.state[this.INPUT_TYPES.PRICE] &&
            createBigNumber(this.state[this.INPUT_TYPES.PRICE], 10)
        ) &&
        isNaN(
          nextProps[this.INPUT_TYPES.PRICE] &&
            createBigNumber(nextProps[this.INPUT_TYPES.PRICE], 10)
        );
*/
      /*
      if (priceChange || forcePriceUpdate) {
        // if limitPrice input hasn't been changed and we have defaulted the limitPrice, populate the field so as to not confuse the user as to where estimates are coming from.
        updateState(
          this.INPUT_TYPES.PRICE,
          createBigNumber(nextTradePrice, 10)
        );
      }
*/
      // orderValidation
      const { isOrderValid, errors, errorCount } = this.orderValidation(
        newStateInfo,
        nextProps
      );
      // update state
      this.setState({ ...newStateInfo, errors, isOrderValid, errorCount });
    }
  }

  testQuantity(value, errors, isOrderValid) {
    let errorCount = 0;
    let passedTest = !!isOrderValid;
    if (!BigNumber.isBigNumber(value))
      return { isOrderValid: false, errors, errorCount };
    if (value && value.lte(0)) {
      errorCount += 1;
      passedTest = false;
      errors[this.INPUT_TYPES.QUANTITY].push("Quantity must be greater than 0");
    }
    return { isOrderValid: passedTest, errors, errorCount };
  }

  testPrice(value, errors, isOrderValid, nextProps = null) {
    const props = nextProps || this.props;
    const { maxPrice, minPrice, market } = props;
    const tickSize = createBigNumber(market.tickSize);
    let errorCount = 0;
    let passedTest = !!isOrderValid;
    if (!BigNumber.isBigNumber(value))
      return { isOrderValid: false, errors, errorCount };
    if (value && (value.lte(minPrice) || value.gte(maxPrice))) {
      errorCount += 1;
      passedTest = false;
      errors[this.INPUT_TYPES.PRICE].push(
        `Price must be between ${minPrice} - ${maxPrice}`
      );
    }
    // removed this validation for now, let's let augur.js handle this.
    if (value && value.mod(tickSize).gt("0")) {
      errorCount += 1;
      passedTest = false;
      errors[this.INPUT_TYPES.PRICE].push(
        `Price must be a multiple of ${tickSize}`
      );
    }
    return { isOrderValid: passedTest, errors, errorCount };
  }

  orderValidation(order, nextProps = null) {
    let errors = {
      [this.INPUT_TYPES.QUANTITY]: [],
      [this.INPUT_TYPES.PRICE]: [],
      [this.INPUT_TYPES.MARKET_ORDER_SIZE]: [],
      [this.INPUT_TYPES.EST_ETH]: [],
      [this.TRADE_MAX_COST]: []
    };
    let isOrderValid = true;
    let errorCount = 0;

    const price =
      order[this.INPUT_TYPES.PRICE] &&
      createBigNumber(order[this.INPUT_TYPES.PRICE]);

    let quantity =
      order[this.INPUT_TYPES.QUANTITY] &&
      createBigNumber(order[this.INPUT_TYPES.QUANTITY]);

    const totalValue =
      order[this.INPUT_TYPES.EST_ETH] &&
      createBigNumber(order[this.INPUT_TYPES.EST_ETH]);
    if (
      !order[this.INPUT_TYPES.QUANTITY] &&
      order[this.INPUT_TYPES.EST_ETH] &&
      order[this.INPUT_TYPES.PRICE]
    ) {
      quantity = totalValue.dividedBy(price).toFixed();
      this.props.updateState(this.INPUT_TYPES.QUANTITY, quantity);
    }

    const {
      isOrderValid: quantityValid,
      errors: quantityErrors,
      errorCount: quantityErrorCount
    } = this.testQuantity(quantity, errors, isOrderValid, nextProps);

    isOrderValid = quantityValid;
    errorCount += quantityErrorCount;
    errors = { ...errors, ...quantityErrors };

    const {
      isOrderValid: priceValid,
      errors: priceErrors,
      errorCount: priceErrorCount
    } = this.testPrice(price, errors, isOrderValid, nextProps);
    isOrderValid = priceValid;
    errorCount += priceErrorCount;
    errors = { ...errors, ...priceErrors };
    return { isOrderValid, errors, errorCount };
  }

  updateTrade(updatedState, propsToUse) {
    let { props } = this;
    if (propsToUse) props = propsToUse;
    const side = props.selectedNav;
    let limitPrice = updatedState[this.INPUT_TYPES.PRICE];
    let shares = updatedState[this.INPUT_TYPES.QUANTITY];
    const oldShares = this.state[this.INPUT_TYPES.QUANTITY];
    if (shares === null || shares === undefined || shares === "") {
      shares = "0";
      limitPrice = null;
    }
    // keep auto-filling functionality
    if (
      oldShares !== "" &&
      (limitPrice === null || limitPrice === undefined || limitPrice === "")
    ) {
      shares = null;
      limitPrice = SCALAR ? "" : "0";
    }
    if (limitPrice && shares) {
      props.selectedOutcome.trade.updateTradeOrder(
        shares,
        limitPrice,
        side,
        null
      );
    }
  }

  validateForm(property, rawValue) {
    const { updateState } = this.props;
    // since the order changed by user action, make sure we can place orders.
    // updateState('doNotCreateOrders', false)
    let value = rawValue;
    if (
      property === this.INPUT_TYPES.QUANTITY &&
      (value === "" || createBigNumber(value).lt(0))
    ) {
      updateState(property, "");
      return this.setState({
        [property]: ""
      });
    }
    if (
      !(property === this.INPUT_TYPES.DO_NOT_CREATE_ORDERS) &&
      !BigNumber.isBigNumber(value) &&
      value !== ""
    )
      value = createBigNumber(value, 10);
    const updatedState = {
      ...this.state,
      [property]: value
    };
    if (
      property === this.INPUT_TYPES.EST_ETH &&
      updatedState.orderPrice.toString
    ) {
      // clear quantity to be recalculated
      updatedState.orderQuantity = "";
    }
    const { isOrderValid, errors, errorCount } = this.orderValidation(
      updatedState,
      this.props
    );
    // update the state of the parent component to reflect new property/value
    // only update the trade if there were no errors detected.
    updateState(property, value);

    if (errorCount === 0 && isOrderValid) {
      this.updateTrade(updatedState);
    }
    // update the local state of this form
    this.setState({
      errors: {
        ...this.state.errors,
        ...errors
      },
      [property]: value,
      isOrderValid
    });
  }

  changeOutcomeDropdown(value) {
    const { updateSelectedOutcome } = this.props;
    updateSelectedOutcome(value);
  }

  render() {
    const {
      isMobile,
      market,
      marketType,
      selectedOutcome,
      maxPrice,
      minPrice,
      updateState,
      clearOrderForm
    } = this.props;
    const s = this.state;

    const tickSize = parseFloat(market.tickSize);
    const max = maxPrice.toString();
    const min = minPrice.toString();
    const errors = Array.from(
      new Set([
        ...s.errors[this.INPUT_TYPES.QUANTITY],
        ...s.errors[this.INPUT_TYPES.PRICE],
        ...s.errors[this.INPUT_TYPES.MARKET_ORDER_SIZE],
        ...s.errors[this.TRADE_MAX_COST]
      ])
    );
    let quantityValue = s[this.INPUT_TYPES.QUANTITY];
    if (BigNumber.isBigNumber(quantityValue)) {
      quantityValue =
        s[this.INPUT_TYPES.QUANTITY].dp() > MIN_QUANTITY.dp()
          ? s[this.INPUT_TYPES.QUANTITY].dp(8, 0).toFixed()
          : s[this.INPUT_TYPES.QUANTITY].toNumber();
    }
    const defaultOutcome = selectedOutcome ? selectedOutcome.id : "Outcome";
    return (
      <div className={Styles.TradingForm__form__container}>
        {!isMobile &&
          market.marketType === CATEGORICAL && (
            <div className={Styles.TradingForm__outcome__container}>
              <TradingOutcomesDropdown
                default={defaultOutcome}
                onChange={this.changeOutcomeDropdown}
                options={market.outcomes.map(outcome => ({
                  label: outcome.name,
                  value: outcome.id
                }))}
              />
            </div>
          )}
        {!isMobile &&
          market.marketType === YES_NO && (
            <div className={Styles.TradingForm__outcome__container}>
              <div className={Styles.TradingForm__outcome__container__yes}>
                Yes
              </div>
            </div>
          )}
        <ul className={Styles["TradingForm__form-body"]}>
          <li className={Styles["TradingForm__limit-quantity"]}>
            <label htmlFor="tr__input--quantity">Quantity</label>
            <div
              className={classNames(Styles.TradingForm__input__container, {
                [`${Styles.error}`]: s.errors[this.INPUT_TYPES.QUANTITY].length
              })}
            >
              <input
                className={classNames(
                  FormStyles.Form__input,
                  Styles.TradingForm__input,
                  {
                    [`${Styles.error}`]: s.errors[this.INPUT_TYPES.QUANTITY]
                      .length
                  }
                )}
                id="tr__input--quantity"
                type="number"
                step={MIN_QUANTITY.toFixed()}
                min={MIN_QUANTITY.toFixed()}
                placeholder={`${
                  marketType === SCALAR ? tickSize : MIN_QUANTITY.toFixed()
                }`}
                value={quantityValue}
                onChange={e =>
                  this.validateForm(this.INPUT_TYPES.QUANTITY, e.target.value)
                }
              />
              <span>Shares</span>
            </div>
          </li>
          <li className={Styles["TradingForm__limit-price"]}>
            <label htmlFor="tr__input--limit-price">
              {marketType === SCALAR ? "Outcome" : "Limit Price"}
            </label>
            <div
              className={classNames(Styles.TradingForm__input__container, {
                [`${Styles.error}`]: s.errors[this.INPUT_TYPES.PRICE].length
              })}
            >
              <input
                className={classNames(
                  FormStyles.Form__input,
                  Styles.TradingForm__input
                )}
                id="tr__input--limit-price"
                type="number"
                step={tickSize}
                max={max}
                min={min}
                placeholder={`${marketType === SCALAR ? tickSize : "0.0001"}`}
                value={
                  BigNumber.isBigNumber(s[this.INPUT_TYPES.PRICE])
                    ? s[this.INPUT_TYPES.PRICE].toNumber()
                    : s[this.INPUT_TYPES.PRICE]
                }
                onChange={e =>
                  this.validateForm(this.INPUT_TYPES.PRICE, e.target.value)
                }
              />
              <span
                className={classNames({
                  [`${Styles.isScalar}`]: marketType === SCALAR,
                  [`${Styles.error}`]: s.errors[this.INPUT_TYPES.PRICE].length
                })}
              >
                {marketType === SCALAR && market.scalarDenomination
                  ? market.scalarDenomination
                  : "ETH"}
              </span>
            </div>
          </li>
          <li className={Styles["TradingForm__limit-price"]}>
            <label htmlFor="tr__input--limit-price">Total Order Value</label>
            <div
              className={classNames(Styles.TradingForm__input__container, {
                [`${Styles.error}`]: s.errors[this.INPUT_TYPES.EST_ETH].length
              })}
            >
              <input
                className={classNames(
                  FormStyles.Form__input,
                  Styles.TradingForm__input,
                  {
                    [`${Styles.error}`]: s.errors[this.INPUT_TYPES.EST_ETH]
                      .length
                  }
                )}
                id="tr__input--limit-price"
                type="number"
                step={MIN_QUANTITY.toFixed()}
                min={MIN_QUANTITY.toFixed()}
                placeholder="0.0000"
                value={
                  BigNumber.isBigNumber(s[this.INPUT_TYPES.EST_ETH])
                    ? s[this.INPUT_TYPES.EST_ETH].toNumber()
                    : s[this.INPUT_TYPES.EST_ETH]
                }
                onChange={e =>
                  this.validateForm(this.INPUT_TYPES.EST_ETH, e.target.value)
                }
              />
              <span>ETH</span>
            </div>
            <label className={Styles.smallLabel}>
              (Max cost of ETH will be escrowed)
            </label>
          </li>
          <li>
            <Checkbox
              id="tr__input--do-no-create-orders"
              type="checkbox"
              isChecked={s[this.INPUT_TYPES.DO_NOT_CREATE_ORDERS]}
              value={s[this.INPUT_TYPES.DO_NOT_CREATE_ORDERS]}
              onClick={e =>
                updateState(
                  this.INPUT_TYPES.DO_NOT_CREATE_ORDERS,
                  !s[this.INPUT_TYPES.DO_NOT_CREATE_ORDERS]
                )
              }
            />
            <label htmlFor="tr__input--do-no-create-orders">
              Fill Orders Only
            </label>
            <button
              className={Styles.TradingForm__button__clear}
              onClick={() => clearOrderForm()}
            >
              Clear
            </button>
          </li>
        </ul>
        {errors.length > 0 && (
          <div className={Styles.TradingForm__error_message_container}>
            {errors.map(error => (
              <div key={error} className={Styles.TradingForm__error_message}>
                {error}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default TradingForm;
