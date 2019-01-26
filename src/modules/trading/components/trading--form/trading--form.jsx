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
import { isEqual, reverse } from "lodash";
// import ReactTooltip from "react-tooltip";
// import TooltipStyles from "modules/common/less/tooltip.styles";
import FormStyles from "modules/common/less/form";
import Styles from "modules/trading/components/trading--form/trading--form.styles";

import TradingOutcomesDropdown from "modules/trading/components/trading-outcomes-dropdown/trading-outcomes-dropdown";
import Checkbox from "src/modules/common/components/checkbox/checkbox";
import MarketOutcomeOrders from "modules/market-charts/containers/market-outcome--orders";

class TradingForm extends Component {
  static propTypes = {
    isMobile: PropTypes.bool.isRequired,
    market: PropTypes.object.isRequired,
    marketType: PropTypes.string.isRequired,
    maxPrice: PropTypes.instanceOf(BigNumber).isRequired,
    minPrice: PropTypes.instanceOf(BigNumber).isRequired,
    orderQuantity: PropTypes.string.isRequired,
    orderPrice: PropTypes.string.isRequired,
    orderEthEstimate: PropTypes.string.isRequired,
    selectedNav: PropTypes.string.isRequired,
    selectedOutcome: PropTypes.object.isRequired,
    updateState: PropTypes.func.isRequired,
    updateOrderProperty: PropTypes.func.isRequired,
    doNotCreateOrders: PropTypes.bool.isRequired,
    updateSelectedOutcome: PropTypes.func.isRequired,
    clearOrderForm: PropTypes.func.isRequired,
    updateTradeTotalCost: PropTypes.func.isRequired,
    updateTradeNumShares: PropTypes.func.isRequired,
    showSelectOutcome: PropTypes.func.isRequired,
    updateNewOrderProperties: PropTypes.func.isRequired
  };

  static isFloatValue(value) {
    // need a better approach to this
    let testValue = value;
    if (value === "") return false;
    if (typeof value === "string" && value.startsWith("."))
      testValue = `0${testValue}`;
    const isfloatValue = parseFloat(testValue);
    if (typeof testValue === "string") {
      // trim ending zeros
      let purned = "";
      let foundStopper = false;
      reverse(testValue.split("")).forEach(chara => {
        if (chara === "." || chara !== "0") foundStopper = true;
        if ((chara !== "0" && !foundStopper) || foundStopper) {
          purned += chara;
        }
      });
      testValue =
        reverse(purned.split(""))
          .join("")
          .replace(/\.$/, "") || testValue;
    }
    if (isfloatValue.toString() !== testValue.toString()) return false;
    return true;
  }

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
      [this.INPUT_TYPES.QUANTITY]: props.orderQuantity,
      [this.INPUT_TYPES.PRICE]: props.orderPrice,
      [this.INPUT_TYPES.DO_NOT_CREATE_ORDERS]: props.doNotCreateOrders,
      [this.INPUT_TYPES.SELECTED_NAV]: props.selectedNav,
      [this.INPUT_TYPES.EST_ETH]: props.orderEthEstimate,
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
    this.updateTestProperty = this.updateTestProperty.bind(this);
    this.clearOrderFormProperties = this.clearOrderFormProperties.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.updateTestProperty(this.INPUT_TYPES.QUANTITY, nextProps);
    this.updateTestProperty(this.INPUT_TYPES.PRICE, nextProps);
    this.updateTestProperty(this.INPUT_TYPES.EST_ETH, nextProps);

    if (
      !isEqual(
        nextProps[this.INPUT_TYPES.DO_NOT_CREATE_ORDERS],
        this.state[this.INPUT_TYPES.DO_NOT_CREATE_ORDERS]
      )
    ) {
      this.setState({
        [this.INPUT_TYPES.DO_NOT_CREATE_ORDERS]:
          nextProps[this.INPUT_TYPES.DO_NOT_CREATE_ORDERS]
      });
    }
  }

  updateTestProperty(property, nextProps) {
    if (!isEqual(nextProps[property], this.state[property])) {
      this.setState(
        {
          [property]: nextProps[property]
        },
        () => {
          const newOrderInfo = {
            ...this.state,
            [property]: nextProps[property]
          };
          const { isOrderValid, errors, errorCount } = this.orderValidation(
            newOrderInfo,
            nextProps
          );
          this.setState({ ...newOrderInfo, errors, isOrderValid, errorCount });
        }
      );
    }
  }

  testTotal(value, errors, isOrderValid, price) {
    let errorCount = 0;
    let passedTest = !!isOrderValid;
    if (value === "") {
      return { isOrderValid: false, errors, errorCount };
    }
    if (value && createBigNumber(value).lt(0)) {
      errorCount += 1;
      passedTest = false;
      errors[this.INPUT_TYPES.EST_ETH].push(
        "Total Order Value must be greater than 0"
      );
    }
    if (!TradingForm.isFloatValue(value)) {
      errorCount += 1;
      passedTest = false;
      errors[this.INPUT_TYPES.EST_ETH].push(
        "Total Order Value is not a number"
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
    if (!TradingForm.isFloatValue(value)) {
      errorCount += 1;
      passedTest = false;
      errors[this.INPUT_TYPES.QUANTITY].push("Quantity is not a number");
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
        `Limit price must be between ${minPrice} - ${maxPrice}`
      );
    }
    if (!TradingForm.isFloatValue(value)) {
      errorCount += 1;
      passedTest = false;
      errors[this.INPUT_TYPES.PRICE].push("Price is not a number");
    }
    // removed this validation for now, let's let augur.js handle this.
    if (value && value.mod(tickSize).gt("0")) {
      errorCount += 1;
      passedTest = false;
      errors[this.INPUT_TYPES.PRICE].push(
        `Limit price must be a multiple of ${tickSize}`
      );
    }
    return { isOrderValid: passedTest, errors, errorCount };
  }

  testPropertyCombo(quantity, price, estEth, errors) {
    let errorCount = 0;
    if (quantity && estEth && !price) {
      errorCount += 1;
      errors[this.INPUT_TYPES.PRICE].push(
        "Price is needed with either quantity or total order value"
      );
    }

    return { isOrderValid: errorCount === 0, errors, errorCount };
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

    const {
      isOrderValid: comboValid,
      errors: comboErrors,
      errorCount: comboErrorCount
    } = this.testPropertyCombo(
      order[this.INPUT_TYPES.QUANTITY],
      order[this.INPUT_TYPES.PRICE],
      order[this.INPUT_TYPES.EST_ETH],
      errors
    );

    errors = { ...errors, ...comboErrors };
    errorCount += comboErrorCount;

    isOrderValid = priceValid && (quantityValid || totalValid) && comboValid;

    return { isOrderValid, errors, errorCount };
  }

  validateForm(property, rawValue) {
    const {
      updateOrderProperty,
      updateTradeTotalCost,
      updateTradeNumShares,
      selectedNav,
      clearOrderForm
    } = this.props;
    const value = rawValue;

    const updatedState = {
      ...this.state,
      [property]: value
    };

    const validationResults = this.orderValidation(updatedState, this.props);

    if (value !== "" && !TradingForm.isFloatValue(value)) {
      validationResults.errorCount += 1;
      validationResults.isOrderValid = false;
      validationResults.errors[property].push("Value is not a number");
    }

    if (validationResults.errorCount > 0) {
      clearOrderForm(false);
    }

    updateOrderProperty(
      {
        [property]: value
      },
      () => {
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
          selectedNav
        };

        // update the local state of this form then make call to calculate total or shares
        this.setState(
          currentState => ({
            ...updatedState,
            errors: {
              ...currentState.errors,
              ...validationResults.errors
            },
            errorCount: validationResults.errorCount,
            isOrderValid: validationResults.isOrderValid
          }),
          () => {
            if (
              validationResults.errorCount === 0 &&
              validationResults.isOrderValid
            ) {
              if (
                order[this.INPUT_TYPES.EST_ETH] &&
                order[this.INPUT_TYPES.PRICE] &&
                order[this.INPUT_TYPES.EST_ETH] !== "0"
              ) {
                updateTradeNumShares(order);
              } else if (
                order[this.INPUT_TYPES.QUANTITY] &&
                order[this.INPUT_TYPES.PRICE] &&
                order[this.INPUT_TYPES.QUANTITY] !== "0"
              ) {
                updateTradeTotalCost(order);
              }
            }
          }
        );
      }
    );
  }

  clearOrderFormProperties() {
    const { selectedNav, clearOrderForm } = this.props;
    const startState = {
      [this.INPUT_TYPES.QUANTITY]: "",
      [this.INPUT_TYPES.PRICE]: "",
      [this.INPUT_TYPES.DO_NOT_CREATE_ORDERS]: false,
      [this.INPUT_TYPES.SELECTED_NAV]: selectedNav,
      [this.INPUT_TYPES.EST_ETH]: "",
      errors: {
        [this.INPUT_TYPES.QUANTITY]: [],
        [this.INPUT_TYPES.PRICE]: [],
        [this.INPUT_TYPES.EST_ETH]: []
      }
    };
    this.setState(
      {
        ...startState,
        isOrderValid: false
      },
      () => clearOrderForm()
    );
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
      showSelectOutcome,
      isMobile,
      updateNewOrderProperties
    } = this.props;
    const s = this.state;

    const tickSize = parseFloat(market.tickSize);
    const max = maxPrice && maxPrice.toString();
    const min = minPrice && minPrice.toString();
    const errors = Array.from(
      new Set([
        ...s.errors[this.INPUT_TYPES.QUANTITY],
        ...s.errors[this.INPUT_TYPES.PRICE],
        ...s.errors[this.INPUT_TYPES.EST_ETH]
      ])
    );

    const quantityValue = s[this.INPUT_TYPES.QUANTITY];
    const defaultOutcome = selectedOutcome ? selectedOutcome.id : "Outcome";
    return (
      <div className={Styles.TradingForm__form__container}>
        {market.marketType === CATEGORICAL && (
          <div className={Styles.TradingForm__outcome__container}>
            <TradingOutcomesDropdown
              default={defaultOutcome}
              onChange={this.changeOutcomeDropdown}
              showSelectOutcome={showSelectOutcome}
              isMobile={isMobile}
              options={market.outcomes.map(outcome => ({
                label: outcome.name,
                value: outcome.id
              }))}
            />
          </div>
        )}
        {market.marketType === YES_NO &&
          !isMobile && (
            <div className={Styles.TradingForm__outcome__container}>
              <div className={Styles.TradingForm__outcome__container__yes}>
                Yes
              </div>
            </div>
          )}
        {isMobile && (
          <MarketOutcomeOrders
            headerHeight={0}
            isMobile={isMobile}
            fixedPrecision={4}
            pricePrecision={4}
            hoveredPrice={null}
            updateHoveredPrice={null}
            updatePrecision={null}
            updateSelectedOrderProperties={updateNewOrderProperties}
            marketId={market.id}
            selectedOutcome={selectedOutcome && selectedOutcome.id}
            onMobileTradingPage
          />
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
              <span
                className={classNames({
                  [`${Styles.error}`]: s.errors[this.INPUT_TYPES.QUANTITY]
                    .length
                })}
              >
                Shares
              </span>
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
              <span
                className={classNames({
                  [`${Styles.error}`]: s.errors[this.INPUT_TYPES.EST_ETH].length
                })}
              >
                ETH
              </span>
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
                updateState({
                  [this.INPUT_TYPES.DO_NOT_CREATE_ORDERS]: !s[
                    this.INPUT_TYPES.DO_NOT_CREATE_ORDERS
                  ]
                })
              }
            />
            <label htmlFor="tr__input--do-no-create-orders">
              Fill Orders Only
            </label>
            <button
              className={Styles.TradingForm__button__clear}
              onClick={() => this.clearOrderFormProperties()}
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
