import React from "react";
import PropTypes from "prop-types";
import { augur } from "services/augurjs";
import classNames from "classnames";
import { BUY, SELL } from "modules/transactions/constants/types";
import { SCALAR } from "modules/markets/constants/market-types";
import ReactTooltip from "react-tooltip";
import TooltipStyles from "modules/common/less/tooltip.styles";
import { infoIcon } from "modules/common/components/icons";
import { DashlineLong } from "modules/common/components/dashline/dashline";
import Styles from "modules/trading/components/trading--confirm/trading--confirm.styles";
import { formatGasCostToEther } from "utils/format-number";
import { ZERO } from "modules/trades/constants/numbers";
import { BigNumber, createBigNumber } from "utils/create-big-number";

const MarketTradingConfirm = ({
  trade,
  numOutcomes,
  gasPrice,
  availableFunds,
  selectedOutcome,
  marketType,
  maxPrice,
  minPrice,
  scalarDenomination
}) => {
  const {
    limitPrice,
    numShares,
    potentialEthProfit,
    potentialEthLoss,
    totalCost,
    shareCost,
    side,
    tradingFees
  } = trade;
  const outcomeName = marketType === SCALAR ? limitPrice : selectedOutcome.name;
  const higherLower = side === BUY ? "higher" : "lower";
  const marketRange = maxPrice.minus(minPrice).abs();

  const limitPricePercentage = (side === BUY
    ? createBigNumber(limitPrice)
    : maxPrice.minus(createBigNumber(limitPrice))
  )
    .dividedBy(marketRange)
    .times(100)
    .toFixed(0);

  let tooltip = `This means you believe ${outcomeName} has a ${higherLower}
                      than ${limitPricePercentage}% chance of happening.`;
  if (marketType === SCALAR) {
    tooltip = `This means you believe the result will be ${higherLower}
  than ${limitPrice} ${scalarDenomination}`;
  }
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

  const negativeProfit = potentialEthProfit && potentialEthProfit.value <= 0;
  if (negativeProfit) {
    errorMessage = {
      header: "Not Profitable",
      message: `This trade will likely be unprofitable, check your calculations`
    };
  }
  let newOrderAmount = "0";
  if (numShares && totalCost.fullPrecision && shareCost.fullPrecision) {
    newOrderAmount = createBigNumber(numShares)
      .minus(shareCost.fullPrecision)
      .toFixed(4);
  }

  return (
    <section className={Styles.TradingConfirm}>
      {shareCost &&
        shareCost.value !== 0 && (
          <div className={Styles.TradingConfirm__details}>
            <DashlineLong />
            <div className={Styles.TradingConfirm__position}>
              <div
                className={classNames(
                  Styles.TradingConfirm__position__properties,
                  Styles.TradingConfirm__position__tooltipContainer
                )}
              >
                Close Position
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
                <span>{shareCost.value}</span>
                Shares @ <span>{limitPrice}</span>
              </div>
              <div className={Styles.TradingConfirm__position__properties}>
                <div>
                  <div>Estimated Fee</div>
                  <div className={Styles.TradingConfirm__property__value}>
                    {tradingFees.formatted}
                    <span>ETH</span>
                  </div>
                </div>
                <div className={Styles.TradingConfirm__vert__line} />
                <div>
                  <div>Profit</div>
                  <div className={Styles.TradingConfirm__property__value}>
                    {potentialEthProfit && potentialEthProfit.formatted}
                    <span>ETH</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      {totalCost &&
        totalCost.value !== 0 && (
          <div className={Styles.TradingConfirm__details}>
            <DashlineLong />
            <div className={Styles.TradingConfirm__position}>
              <div
                className={classNames(
                  Styles.TradingConfirm__position__properties,
                  Styles.TradingConfirm__position__tooltipContainer
                )}
              >
                New Position
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
                <span>{newOrderAmount}</span>
                Shares @ <span>{limitPrice}</span>
              </div>
              <div className={Styles.TradingConfirm__position__properties}>
                <div>
                  <div>Max Profit</div>
                  <div className={Styles.TradingConfirm__property__value}>
                    {potentialEthProfit && potentialEthProfit.formatted}
                    <span>ETH</span>
                  </div>
                </div>
                <div className={Styles.TradingConfirm__vert__line} />
                <div>
                  <div>Max Loss</div>
                  <div className={Styles.TradingConfirm__property__value}>
                    {potentialEthLoss && potentialEthLoss.formatted}
                    <span>ETH</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      {errorMessage && (
        <div className={Styles.TradingConfirm__error_message_container}>
          <div>{errorMessage.header}</div>
          <div>{errorMessage.message}</div>
        </div>
      )}
    </section>
  );
};

MarketTradingConfirm.propTypes = {
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

MarketTradingConfirm.defaultProps = {
  scalarDenomination: ""
};

export default MarketTradingConfirm;
