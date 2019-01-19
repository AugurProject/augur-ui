import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { BigNumber, createBigNumber } from "utils/create-big-number";

import TradingForm from "modules/trading/components/trading--form/trading--form";
import TradingConfirm from "modules/trading/components/trading--confirm/trading--confirm";
import { Close } from "modules/common/components/icons";

import ValueDenomination from "modules/common/components/value-denomination/value-denomination";

import getValue from "utils/get-value";
import { isEqual } from "lodash";
import { FindReact } from "utils/find-react";
import { SCALAR } from "modules/markets/constants/market-types";
import { BUY, SELL } from "modules/transactions/constants/types";
import MarketOutcomeTradingIndicator from "modules/market/containers/market-outcome-trading-indicator";
import Styles from "modules/trading/components/trading--wrapper/trading--wrapper.styles";

class TradingWrapper extends Component {
  static propTypes = {
    market: PropTypes.object.isRequired,
    isLogged: PropTypes.bool.isRequired,
    selectedOrderProperties: PropTypes.object.isRequired,
    availableFunds: PropTypes.instanceOf(BigNumber).isRequired,
    isMobile: PropTypes.bool.isRequired,
    toggleForm: PropTypes.func.isRequired,
    clearTradeInProgress: PropTypes.func.isRequired,
    selectedOutcome: PropTypes.object,
    updateSelectedOrderProperties: PropTypes.func.isRequired,
    handleFilledOnly: PropTypes.func.isRequired,
    gasPrice: PropTypes.number.isRequired,
    updateSelectedOutcome: PropTypes.func.isRequired
  };

  static defaultProps = {
    selectedOutcome: null
  };

  constructor(props) {
    super(props);

    this.state = {
      orderPrice: props.selectedOrderProperties.price || "",
      orderQuantity: props.selectedOrderProperties.quantity || "",
      orderEthEstimate: "",
      selectedNav: props.selectedOrderProperties.selectedNav || BUY,
      doNotCreateOrders:
        props.selectedOrderProperties.doNotCreateOrders || false,
      processingOrder: {}
    };

    this.updateState = this.updateState.bind(this);
    this.clearOrderForm = this.clearOrderForm.bind(this);
    this.calculateTrade = this.calculateTrade.bind(this);
    this.updateFormValues = this.updateFormValues.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { selectedOrderProperties } = this.props;

    if (
      this.props.selectedOutcome === null ||
      !(nextProps.selectedOutcome || {}).trade
    )
      return this.clearOrderForm();

    // Updates from chart clicks
    if (!isEqual(selectedOrderProperties, nextProps.selectedOrderProperties)) {
      this.calculateTrade({ ...nextProps.selectedOrderProperties });
    }

    const {
      limitPrice,
      numShares,
      totalCost
    } = nextProps.selectedOutcome.trade;
    const { orderPrice, orderQuantity, orderEthEstimate } = this.state;

    if (
      limitPrice !== null &&
      createBigNumber(limitPrice).eq(createBigNumber(orderPrice))
    ) {
      if (
        createBigNumber(numShares).eq(createBigNumber(orderQuantity || "0")) &&
        createBigNumber(orderEthEstimate || "0").eq(
          createBigNumber(totalCost.formatted)
        )
      )
        return;
      // calculating cost when numShares is ""
      let cost =
        orderEthEstimate &&
        createBigNumber(orderEthEstimate).eq(createBigNumber(totalCost.value))
          ? orderEthEstimate
          : totalCost.formatted;

      // calculating cost when numShares is filled in
      if (numShares !== orderQuantity) {
        cost = orderEthEstimate;
      }

      this.updateFormValues({
        orderPrice: limitPrice,
        orderQuantity: numShares,
        orderEthEstimate: cost
      });
    }
  }

  updateFormValues(order) {
    this.setState({
      ...this.state,
      ...order
    });
  }

  calculateTrade(order) {
    this.setState({ ...order }, () => {
      this.props.selectedOutcome.trade.updateTradeOrder(
        order.orderQuantity.toString(),
        order.orderPrice.toString(),
        order.selectedNav,
        order.orderEthEstimate ? order.orderEthEstimate.toString() : undefined
      );
    });
  }
  // updates from form input
  updateState(formValues) {
    if (
      formValues.orderPrice &&
      (formValues.orderQuantity || formValues.orderEthEstimate)
    ) {
      // call to calculate trade based on input changes
      this.calculateTrade({
        ...this.state,
        ...formValues
      });
    } else {
      this.setState({ ...formValues });
    }
  }

  clearOrderForm() {
    const { clearTradeInProgress, market } = this.props;
    this.setState(
      {
        orderPrice: "",
        orderQuantity: "",
        orderEthEstimate: "",
        doNotCreateOrders: false
      },
      () => {
        if (market.id) clearTradeInProgress(market.id);
      }
    );
  }

  render() {
    const {
      availableFunds,
      isLogged,
      isMobile,
      market,
      selectedOutcome,
      toggleForm,
      gasPrice,
      handleFilledOnly,
      updateSelectedOutcome
    } = this.props;
    const s = this.state;

    const lastPrice = getValue(
      this.props,
      "selectedOutcome.lastPrice.formatted"
    );

    return (
      <section className={Styles.TradingWrapper}>
        {isMobile && (
          <div className={Styles["TradingWrapper__mobile-header"]}>
            <button
              className={Styles["TradingWrapper__mobile-header-close"]}
              onClick={toggleForm}
            >
              {Close}
            </button>
            <span className={Styles["TradingWrapper__mobile-header-outcome"]}>
              {selectedOutcome.name}
            </span>
            <span className={Styles["TradingWrapper__mobile-header-last"]}>
              <ValueDenomination formatted={lastPrice} />
              <MarketOutcomeTradingIndicator
                isMobile={isMobile}
                outcome={selectedOutcome}
                location="modileTradingForm"
              />
            </span>
          </div>
        )}
        <div>
          <ul
            className={classNames({
              [Styles.TradingWrapper__header_buy]: s.selectedNav === BUY,
              [Styles.TradingWrapper__header_sell]: s.selectedNav === SELL
            })}
          >
            <li
              className={classNames({
                [`${Styles.active_buy}`]: s.selectedNav === BUY
              })}
            >
              <button onClick={() => this.setState({ selectedNav: BUY })}>
                <div>Buy Shares</div>
                <span
                  className={classNames(Styles.TradingWrapper__underline__buy, {
                    [`${Styles.notActive}`]: s.selectedNav === SELL
                  })}
                />
              </button>
            </li>
            <li
              className={classNames({
                [`${Styles.active_sell}`]: s.selectedNav === SELL
              })}
            >
              <button onClick={() => this.setState({ selectedNav: SELL })}>
                <div>Sell Shares</div>
                <span
                  className={classNames(
                    Styles.TradingWrapper__underline__sell,
                    {
                      [`${Styles.notActive}`]: s.selectedNav === BUY
                    }
                  )}
                />
              </button>
            </li>
          </ul>
          {market.marketType === SCALAR && (
            <div className={Styles.TradingWrapper__scalar__line} />
          )}
          {!isLogged && (
            <button
              id="login-button"
              className={Styles["TradingWrapper__button--login"]}
              onClick={() =>
                FindReact(
                  document.getElementsByClassName(
                    "connect-account-styles_ConnectAccount"
                  )[0]
                ).toggleDropdown()
              }
            >
              Sign in to trade
            </button>
          )}
          <TradingForm
            market={market}
            marketType={getValue(this.props, "market.marketType")}
            maxPrice={getValue(this.props, "market.maxPrice")}
            minPrice={getValue(this.props, "market.minPrice")}
            selectedNav={s.selectedNav}
            orderPrice={s.orderPrice}
            orderQuantity={s.orderQuantity}
            orderEthEstimate={s.orderEthEstimate}
            doNotCreateOrders={s.doNotCreateOrders}
            selectedOutcome={selectedOutcome}
            updateState={this.updateState}
            isMobile={isMobile}
            clearOrderForm={this.clearOrderForm}
            updateSelectedOutcome={updateSelectedOutcome}
          />
        </div>
        {selectedOutcome &&
          selectedOutcome.trade &&
          (selectedOutcome.trade.shareCost.value !== 0 ||
            selectedOutcome.trade.totalCost.value !== 0) && (
            <TradingConfirm
              numOutcomes={market.numOutcomes}
              selectedNav={s.selectedNav}
              trade={selectedOutcome.trade}
              isMobile={isMobile}
              gasPrice={gasPrice}
              availableFunds={availableFunds}
            />
          )}
        <div className={Styles.TradingWrapper__actions}>
          <button
            className={classNames(Styles["TradingWrapper__button--submit"], {
              [Styles.long]: s.selectedNav === BUY,
              [Styles.short]: s.selectedNav === SELL,
              [Styles.disabled]: !selectedOutcome.trade.limitPrice
            })}
            onClick={e => {
              e.preventDefault();
              market.onSubmitPlaceTrade(
                selectedOutcome.id,
                (err, tradeGroupID) => {
                  // onSent/onFailed CB
                  if (!err) {
                    this.clearOrderForm();
                  }
                },
                res => {
                  if (s.doNotCreateOrders && res.res !== res.sharesToFill)
                    handleFilledOnly(res.tradeInProgress);
                  // onComplete CB
                },
                s.doNotCreateOrders
              );
            }}
          >
            Place {s.selectedNav === BUY ? "Buy" : "Sell"} Order
          </button>
        </div>
      </section>
    );
  }
}

export default TradingWrapper;
