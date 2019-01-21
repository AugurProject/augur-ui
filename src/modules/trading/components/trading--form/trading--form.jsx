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
    updatedOrderValues: PropTypes.object.isRequired,
    selectedOutcome: PropTypes.object.isRequired,
    updateState: PropTypes.func.isRequired,
    updateOrderProperty: PropTypes.func.isRequired,
    doNotCreateOrders: PropTypes.bool.isRequired,
    updateSelectedOutcome: PropTypes.func.isRequired,
    clearOrderForm: PropTypes.func.isRequired,
    updateTradeTotalCost: PropTypes.func.isRequired,
    updateTradeNumShares: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.INPUT_TYPES = {
      QUANTITY: "orderQuantity",
      PRICE: "orderPrice",
      DO_NOT_CREATE_ORDERS: "doNotCreateOrders",
      EST_ETH: "orderEthEstimate",
      SELECTED_NAV: "selectedNav"
    };

    this.MINIMUM_TRADE_VALUE = createBigNumber(1, 10).dividedBy(10000);
    this.orderValidation = this.orderValidation.bind(this);
    this.testQuantity = this.testQuantity.bind(this);
    this.testPrice = this.testPrice.bind(this);
    this.testTotal = this.testTotal.bind(this);

    const startState = {
      [this.INPUT_TYPES.QUANTITY]: props.updatedOrderValues.orderQuantity,
      [this.INPUT_TYPES.PRICE]: props.updatedOrderValues.orderPrice,
      [this.INPUT_TYPES.DO_NOT_CREATE_ORDERS]: props.doNotCreateOrders,
      [this.INPUT_TYPES.SELECTED_NAV]: props.updatedOrderValues.selectedNav,
      [this.INPUT_TYPES.EST_ETH]: "",
      errors: {
        [this.INPUT_TYPES.QUANTITY]: [],
        [this.INPUT_TYPES.PRICE]: [],
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
    const { updatedOrderValues, updateTradeTotalCost } = this.props;
    const {
      orderPrice,
      orderQuantity,
      orderEthEstimate,
      selectedNav,
      event
    } = updatedOrderValues;

    const newOrderInfo = {
      [this.INPUT_TYPES.QUANTITY]: orderQuantity,
      [this.INPUT_TYPES.PRICE]: orderPrice,
      [this.INPUT_TYPES.DO_NOT_CREATE_ORDERS]:
        nextProps[this.INPUT_TYPES.DO_NOT_CREATE_ORDERS],
      [this.INPUT_TYPES.EST_ETH]: orderEthEstimate,
      [this.INPUT_TYPES.SELECTED_NAV]: selectedNav
    };

    const currentOrderInfo = {
      [this.INPUT_TYPES.QUANTITY]: this.state[this.INPUT_TYPES.QUANTITY],
      [this.INPUT_TYPES.PRICE]: this.state[this.INPUT_TYPES.PRICE],
      [this.INPUT_TYPES.EST_ETH]: this.state[this.INPUT_TYPES.EST_ETH],
      [this.INPUT_TYPES.DO_NOT_CREATE_ORDERS]: this.state[
        this.INPUT_TYPES.DO_NOT_CREATE_ORDERS
      ],
      [this.INPUT_TYPES.SELECTED_NAV]: this.state[this.INPUT_TYPES.SELECTED_NAV]
    };

    // RECALCULATE_TRADE
    // CLEAR_ORDER_FORM
    // UPDATE_EST_ETH
    // UPDATE_QUANTITY
    // UPDATE_PROPERTY

    if (!isEqual(newOrderInfo, currentOrderInfo)) {
      const { isOrderValid, errors, errorCount } = this.orderValidation(
        newOrderInfo,
        nextProps
      );
      this.setState(
        { ...newOrderInfo, errors, isOrderValid, errorCount },
        () => {
          if (isOrderValid && event === "RECALCULATE_TRADE") {
            updateTradeTotalCost(newOrderInfo);
          }
        }
      );
    }
  }

  testTotal(value, errors, isOrderValid, price) {
    let errorCount = 0;
    let passedTest = !!isOrderValid;
    if (!BigNumber.isBigNumber(value) || !BigNumber.isBigNumber(price)) {
      return { isOrderValid: false, errors, errorCount };
    }
    if (value && value.lt(0)) {
      errorCount += 1;
      passedTest = false;
      errors[this.INPUT_TYPES.EST_ETH].push(
        "Total Order Value must be greater than 0"
      );
    }
    return { isOrderValid: passedTest, errors, errorCount };
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
      [this.INPUT_TYPES.EST_ETH]: []
    };
    let isOrderValid = true;
    let errorCount = 0;

    const price =
      order[this.INPUT_TYPES.PRICE] &&
      createBigNumber(order[this.INPUT_TYPES.PRICE]);

    const quantity =
      order[this.INPUT_TYPES.QUANTITY] &&
      createBigNumber(order[this.INPUT_TYPES.QUANTITY]);

    const total =
      order[this.INPUT_TYPES.EST_ETH] &&
      createBigNumber(order[this.INPUT_TYPES.EST_ETH]);

    const {
      isOrderValid: priceValid,
      errors: priceErrors,
      errorCount: priceErrorCount
    } = this.testPrice(price, errors, isOrderValid, nextProps);

    errorCount += priceErrorCount;
    errors = { ...errors, ...priceErrors };

    const {
      isOrderValid: quantityValid,
      errors: quantityErrors,
      errorCount: quantityErrorCount
    } = this.testQuantity(quantity, errors, isOrderValid, nextProps);

    errorCount += quantityErrorCount;
    errors = { ...errors, ...quantityErrors };

    const {
      isOrderValid: totalValid,
      errors: totalErrors,
      errorCount: totalErrorCount
    } = this.testTotal(total, errors, isOrderValid, price);

    errorCount += totalErrorCount;
    errors = { ...errors, ...totalErrors };

    isOrderValid = priceValid && (quantityValid || totalValid);

    return { isOrderValid, errors, errorCount };
  }

  validateForm(property, rawValue) {
    const {
      updateOrderProperty,
      updateTradeTotalCost,
      updateTradeNumShares,
      updatedOrderValues
    } = this.props;
    const value = rawValue;

    const updatedState = {
      ...this.state,
      [property]: value
    };

    const { isOrderValid, errors, errorCount } = this.orderValidation(
      updatedState,
      this.props
    );

    updateOrderProperty({
      [property]: value
    });

    if (errorCount === 0 && isOrderValid) {
      let orderQuantity = updatedState[this.INPUT_TYPES.QUANTITY];
      const orderPrice = updatedState[this.INPUT_TYPES.PRICE];
      let orderEthEstimate = updatedState[this.INPUT_TYPES.EST_ETH];

      if (property === this.INPUT_TYPES.QUANTITY) {
        orderEthEstimate = "";
      } else if (
        property === this.INPUT_TYPES.EST_ETH ||
        (property === this.INPUT_TYPES.EST_ETH && value === "")
      ) {
        orderQuantity = "";
      }

      const order = {
        [this.INPUT_TYPES.QUANTITY]: BigNumber.isBigNumber(orderQuantity)
          ? orderQuantity.toFixed()
          : orderQuantity,
        [this.INPUT_TYPES.PRICE]: BigNumber.isBigNumber(orderPrice)
          ? orderPrice.toFixed()
          : orderPrice,
        [this.INPUT_TYPES.EST_ETH]: BigNumber.isBigNumber(orderEthEstimate)
          ? orderEthEstimate.toFixed()
          : orderEthEstimate,
        selectedNav: updatedOrderValues.selectedNav
      };

      if (property === this.INPUT_TYPES.EST_ETH) {
        updateTradeNumShares(order);
      } else {
        updateTradeTotalCost(order);
      }
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
        ...s.errors[this.INPUT_TYPES.EST_ETH]
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
        {market.marketType === CATEGORICAL && (
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
        {market.marketType === YES_NO && (
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
                readOnly
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
