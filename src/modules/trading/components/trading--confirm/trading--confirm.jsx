import React from "react";
import PropTypes from "prop-types";
import { augur } from "services/augurjs";
// import ValueDenomination from "modules/common/components/value-denomination/value-denomination";
import classNames from "classnames";
// import { CATEGORICAL } from "modules/markets/constants/market-types";
import { BUY, SELL } from "modules/transactions/constants/types";
import ReactTooltip from "react-tooltip";
import TooltipStyles from "modules/common/less/tooltip.styles";
import { Hint } from "modules/common/components/icons";
import Styles from "modules/trading/components/trading--confirm/trading--confirm.styles";
import { formatGasCostToEther } from "utils/format-number";
import { ZERO } from "modules/trades/constants/numbers";
import { BigNumber, createBigNumber } from "utils/create-big-number";

const MarketTradingConfirm = ({
  trade,
  isMobile,
  selectedNav,
  market,
  selectedOutcome,
  doNotCreateOrders,
  showOrderPlaced,
  handleFilledOnly,
  gasPrice,
  availableFunds
}) => {
  const {
    limitPrice,
    numShares,
    // tradingFees,
    potentialEthProfit,
    // potentialProfitPercent,
    potentialEthLoss,
    // potentialLossPercent,
    totalCost,
    shareCost,
    side,
    tradingFees,
    sharesFilled
  } = trade;
  // const negativeProfit = potentialEthProfit && potentialEthProfit.value <= 0;
  let errorMessage = null;
  const gasValues = {
    fillGasLimit: augur.constants.WORST_CASE_FILL[market.numOutcomes],
    placeOrderNoSharesGasLimit:
      augur.constants.PLACE_ORDER_NO_SHARES[market.numOutcomes],
    placeOrderWithSharesGasLimit:
      augur.constants.PLACE_ORDER_WITH_SHARES[market.numOutcomes]
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

  return (
    <section className={Styles.TradingConfirm}>
      {shareCost &&
        shareCost.value !== 0 && (
          <div className={Styles.TradingConfirm__details}>
            <div className={Styles.TradingConfirm__position}>
              <div className={Styles.TradingConfirm__position__properties}>
                Close Position
              </div>
              <div className={Styles.TradingConfirm__agg_position}>
                <span
                  className={classNames({
                    [Styles.long]: selectedNav === BUY,
                    [Styles.short]: selectedNav === SELL
                  })}
                >
                  {side === BUY ? "Long" : "Short"}
                </span>
                <span>{sharesFilled}</span>
                Shares @ <span>{limitPrice}</span>
              </div>
              <div className={Styles.TradingConfirm__position__properties}>
                <div>
                  <div>Estimate Fee</div>
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
      <div className={Styles.TradingConfirm__details}>
        <div className={Styles.TradingConfirm__position}>
          <div className={Styles.TradingConfirm__position__properties}>
            New Position
            <span className={Styles.TradingConfirm__TooltipContainer}>
              <label
                className={classNames(
                  TooltipStyles.TooltipHint,
                  Styles.TradingConfirm__TooltipHint
                )}
                data-tip
                data-for="tooltip--fee"
              >
                {Hint}
              </label>
              <ReactTooltip
                id="tooltip--fee"
                className={TooltipStyles.Tooltip}
                effect="solid"
                place="bottom"
                type="light"
              >
                <p>
                  This means you believe {selectedNav} has a (higher or lower
                  depending on buying or selling) then (limit price to %) change
                  of happening
                </p>
              </ReactTooltip>
            </span>
          </div>
          <div className={Styles.TradingConfirm__agg_position}>
            <span
              className={classNames({
                [Styles.long]: selectedNav === BUY,
                [Styles.short]: selectedNav === SELL
              })}
            >
              {side === BUY ? "Long" : "Short"}
            </span>
            <span>{numShares}</span>
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
  market: PropTypes.object.isRequired,
  selectedNav: PropTypes.string.isRequired,
  doNotCreateOrders: PropTypes.bool.isRequired,
  selectedOutcome: PropTypes.object.isRequired,
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
  isMobile: PropTypes.bool.isRequired,
  showOrderPlaced: PropTypes.func.isRequired,
  handleFilledOnly: PropTypes.func.isRequired,
  gasPrice: PropTypes.number.isRequired,
  availableFunds: PropTypes.instanceOf(BigNumber).isRequired
};

export default MarketTradingConfirm;
