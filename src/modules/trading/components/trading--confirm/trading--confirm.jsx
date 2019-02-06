import React, { Component } from "react";
import PropTypes from "prop-types";
import { augur } from "services/augurjs";
import classNames from "classnames";
import { BUY, SELL } from "modules/transactions/constants/types";
import { SCALAR, YES_NO } from "modules/markets/constants/market-types";
import ReactTooltip from "react-tooltip";
import TooltipStyles from "modules/common/less/tooltip.styles";
import {
  infoIcon,
  darkBgExclamationCircle,
  closeIcon
} from "modules/common/components/icons";
import { DashlineLong } from "modules/common/components/dashline/dashline";
import Styles from "modules/trading/components/trading--confirm/trading--confirm.styles";
import { formatGasCostToEther } from "utils/format-number";
import { ZERO } from "modules/trades/constants/numbers";
import { BigNumber, createBigNumber } from "utils/create-big-number";
import { isEqual } from "lodash";

class MarketTradingConfirm extends Component {
  static propTypes = {
    numOutcomes: PropTypes.number.isRequired,
    trade: PropTypes.shape({
      numShares: PropTypes.string,
      limitPrice: PropTypes.string,
      tradingFees: PropTypes.object,
      potentialEthProfit: PropTypes.object,
      potentialProfitPercent: PropTypes.object,
      potentialEthLoss: PropTypes.object,
      potentialLossPercent: PropTypes.object,
      totalCost: PropTypes.object,
      shareCost: PropTypes.object
    }).isRequired,
    gasPrice: PropTypes.number.isRequired,
    availableFunds: PropTypes.instanceOf(BigNumber).isRequired,
    selectedOutcome: PropTypes.object.isRequired,
    marketType: PropTypes.string.isRequired,
    maxPrice: PropTypes.instanceOf(BigNumber).isRequired,
    minPrice: PropTypes.instanceOf(BigNumber).isRequired,
    scalarDenomination: PropTypes.string
  };

  static defaultProps = {
    scalarDenomination: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      errorMessage: this.constructErrorMessage(props)
    };

    this.constructErrorMessage = this.constructErrorMessage.bind(this);
    this.clearErrorMessage = this.clearErrorMessage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      !isEqual(this.props.trade, nextProps.trade) ||
      !isEqual(this.props.gasPrice, nextProps.gasPrice) ||
      !isEqual(this.props.availableFunds, nextProps.availableFunds)
    ) {
      this.setState({
        errorMessage: this.constructErrorMessage(nextProps)
      });
    }
  }

  constructErrorMessage(props) {
    const { trade, numOutcomes, gasPrice, availableFunds } =
      props || this.props;

    const { potentialEthProfit, totalCost, orderShareProfit } = trade;

    let errorMessage = null;
    const gasValues = {
      fillGasLimit: augur.constants.WORST_CASE_FILL[numOutcomes],
      placeOrderNoSharesGasLimit:
        augur.constants.PLACE_ORDER_NO_SHARES[numOutcomes],
      placeOrderWithSharesGasLimit:
        augur.constants.PLACE_ORDER_WITH_SHARES[numOutcomes]
    };
    const gas =
      trade.shareCost.formattedValue > 0
        ? gasValues.placeOrderWithSharesGasLimit
        : gasValues.fillGasLimit;
    const gasCost = formatGasCostToEther(gas, { decimalsRounded: 4 }, gasPrice);
    const tradeTotalCost = createBigNumber(totalCost.formattedValue, 10);

    if (
      tradeTotalCost.gt(ZERO) &&
      createBigNumber(gasCost).gt(createBigNumber(tradeTotalCost))
    ) {
      errorMessage = {
        header: "Gas Higher than Order",
        message: `Est. gas cost ${gasCost} ETH, higher than order cost`
      };
    }

    if (
      totalCost &&
      createBigNumber(totalCost.formattedValue, 10).gte(
        createBigNumber(availableFunds, 10)
      )
    ) {
      errorMessage = {
        header: "Insufficient Funds",
        message: "You do not have enough funds to place this order"
      };
    }

    const negativeShareProfit =
      orderShareProfit && createBigNumber(orderShareProfit.value).lte(0);
    const negativeProfit =
      totalCost.value > 0 &&
      potentialEthProfit &&
      potentialEthProfit.value <= 0;
    if (negativeProfit || negativeShareProfit) {
      errorMessage = {
        header: "Not Profitable",
        message: `This trade will likely be unprofitable.`
      };
    }

    return errorMessage;
  }

  clearErrorMessage() {
    this.setState({ errorMessage: null });
  }

  render() {
    const {
      trade,
      selectedOutcome,
      marketType,
      maxPrice,
      minPrice,
      scalarDenomination
    } = this.props;

    const {
      limitPrice,
      numShares,
      potentialEthProfit,
      potentialEthLoss,
      totalCost,
      shareCost,
      side,
      orderShareProfit,
      orderShareTradingFee
    } = trade;

    const { errorMessage } = this.state;

    const outcomeName =
      marketType === YES_NO ? "this event" : selectedOutcome.name;
    const greaterLess = side === BUY ? "greater" : "less";
    const higherLower = side === BUY ? "higher" : "lower";

    const marketRange = maxPrice.minus(minPrice).abs();

    const limitPricePercentage = (side === BUY
      ? createBigNumber(limitPrice)
      : maxPrice.minus(createBigNumber(limitPrice))
    )
      .dividedBy(marketRange)
      .times(100)
      .toFixed(0);

    let tooltip = `You believe ${outcomeName} has a ${greaterLess}
                        than ${limitPricePercentage}% chance to occur.`;
    if (marketType === SCALAR) {
      tooltip = `You believe the outcome of this event will be ${higherLower}
    than ${limitPrice} ${scalarDenomination}`;
    }

    let newOrderAmount = "0";
    if (numShares && totalCost.fullPrecision && shareCost.fullPrecision) {
      newOrderAmount = createBigNumber(numShares)
        .minus(shareCost.fullPrecision)
        .toFixed(4);
    }

    return (
      <section className={Styles.TradingConfirm}>
        {((shareCost && shareCost.value !== 0) ||
          (totalCost && totalCost.value !== 0)) && (
          <div className={Styles.TrandingConfirm__topBorder} />
        )}
        {shareCost &&
          shareCost.value !== 0 && (
            <div className={Styles.TradingConfirm__details}>
              <div className={Styles.TradingConfirm__position__properties}>
                CLOSING POSITION
              </div>
              <div className={Styles.TradingConfirm__agg_position}>
                <span
                  className={classNames({
                    [Styles.long]: side !== BUY,
                    [Styles.short]: side !== SELL
                  })}
                >
                  {side !== BUY ? "Long" : "Short"}
                </span>
                <span> {shareCost.value} </span>
                Shares @ <span> {limitPrice}</span>
              </div>
              <div className={Styles.TradingConfirm__position__details}>
                <div>Estimated Fee</div>
                <DashlineLong />
                <span className={Styles.TradingConfirm__property__value}>
                  {orderShareTradingFee && orderShareTradingFee.formatted}
                  <span>ETH</span>
                </span>
              </div>
              <div className={Styles.TradingConfirm__position__details}>
                <div>Profit</div>
                <DashlineLong />
                <span className={Styles.TradingConfirm__property__value}>
                  {orderShareProfit && orderShareProfit.formatted}
                  <span>ETH</span>
                </span>
              </div>
            </div>
          )}
        {totalCost &&
          totalCost.value !== 0 && (
            <div className={Styles.TradingConfirm__details}>
              <div
                className={classNames(
                  Styles.TradingConfirm__position__properties,
                  Styles.TradingConfirm__position__tooltipContainer
                )}
              >
                NEW POSITION
                <span className={Styles.TradingConfirm__TooltipContainer}>
                  <label
                    className={classNames(
                      TooltipStyles.TooltipHint,
                      Styles.TradingConfirm__TooltipHint
                    )}
                    data-tip
                    data-for="tooltip--confirm"
                  >
                    {infoIcon}
                  </label>
                  <ReactTooltip
                    id="tooltip--confirm"
                    className={TooltipStyles.Tooltip}
                    effect="solid"
                    place="top"
                    type="light"
                  >
                    <p>{tooltip}</p>
                  </ReactTooltip>
                </span>
              </div>
              <div className={Styles.TradingConfirm__agg_position}>
                <span
                  className={classNames({
                    [Styles.long]: side === BUY,
                    [Styles.short]: side === SELL
                  })}
                >
                  {side === BUY ? "Long" : "Short"}
                </span>
                <span> {newOrderAmount} </span>
                Shares @ <span> {limitPrice}</span>
              </div>
              <div className={Styles.TradingConfirm__position__details}>
                <div>Max Profit</div>
                <DashlineLong />
                <span className={Styles.TradingConfirm__property__value}>
                  {potentialEthProfit && potentialEthProfit.formatted}
                  <span>ETH</span>
                </span>
              </div>
              <div className={Styles.TradingConfirm__position__details}>
                <div>Max Loss</div>
                <DashlineLong />
                <span className={Styles.TradingConfirm__property__value}>
                  {potentialEthLoss && potentialEthLoss.formatted}
                  <span>ETH</span>
                </span>
              </div>
            </div>
          )}
        {errorMessage && (
          <div className={Styles.TradingConfirm__error_message_container}>
            <div>
              {darkBgExclamationCircle("#09CFE1")}{" "}
              <span>{errorMessage.header}</span>
              <button onClick={this.clearErrorMessage}>{closeIcon}</button>
            </div>
            <div>{errorMessage.message}</div>
          </div>
        )}
      </section>
    );
  }
}

export default MarketTradingConfirm;
