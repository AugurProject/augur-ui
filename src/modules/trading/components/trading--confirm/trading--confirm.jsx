import React from "react";
import PropTypes from "prop-types";

// import ValueDenomination from "modules/common/components/value-denomination/value-denomination";
import classNames from "classnames";
// import { CATEGORICAL } from "modules/markets/constants/market-types";
import { BUY, SELL } from "modules/transactions/constants/types";
import ReactTooltip from "react-tooltip";
import TooltipStyles from "modules/common/less/tooltip.styles";
import { Hint } from "modules/common/components/icons";
import Styles from "modules/trading/components/trading--confirm/trading--confirm.styles";

const MarketTradingConfirm = ({
  trade,
  isMobile,
  selectedNav,
  market,
  selectedOutcome,
  doNotCreateOrders,
  showOrderPlaced,
  handleFilledOnly
  // errors
}) => {
  const {
    // numShares,
    limitPrice,
    // tradingFees,
    potentialEthProfit,
    // potentialProfitPercent,
    potentialEthLoss
    // potentialLossPercent,
    // totalCost,
    // shareCost
  } = trade;
  // const negativeProfit = potentialEthProfit && potentialEthProfit.value <= 0;
  return (
    <section className={Styles.TradingConfirm}>
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
              Short
            </span>
            <span>2.000</span>
            Shares @ <span>{limitPrice}</span>
          </div>
          <div className={Styles.TradingConfirm__position__properties}>
            <div>
              <div>Estimate Fee</div>
              <div className={Styles.TradingConfirm__property__value}>
                0.1000
                <span>ETH</span>
              </div>
            </div>
            <div className={Styles.TradingConfirm__vert__line} />
            <div>
              <div>Profit</div>
              <div className={Styles.TradingConfirm__property__value}>
                0.2000
                <span>ETH</span>
              </div>
            </div>
          </div>
        </div>
      </div>
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
              Short
            </span>
            <span>2.000</span>
            Shares @ <span>{limitPrice}</span>
          </div>
          <div className={Styles.TradingConfirm__position__properties}>
            <div>
              <div>Max Profit</div>
              <div className={Styles.TradingConfirm__property__value}>
                {potentialEthProfit.formatted}
                <span>ETH</span>
              </div>
            </div>
            <div className={Styles.TradingConfirm__vert__line} />
            <div>
              <div>Max Loss</div>
              <div className={Styles.TradingConfirm__property__value}>
                {potentialEthLoss.formatted}
                <span>ETH</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.TradingConfirmation__actions}>
        <button
          className={classNames(Styles["TradingConfirmation__button--submit"], {
            [Styles.long]: selectedNav === BUY,
            [Styles.short]: selectedNav === SELL
          })}
          onClick={e => {
            e.preventDefault();
            market.onSubmitPlaceTrade(
              selectedOutcome.id,
              (err, tradeGroupID) => {
                // onSent/onFailed CB
                if (!err) {
                  showOrderPlaced();
                }
              },
              res => {
                if (doNotCreateOrders && res.res !== res.sharesToFill)
                  handleFilledOnly(res.tradeInProgress);
                // onComplete CB
              },
              doNotCreateOrders
            );
          }}
        >
          Place {selectedNav === BUY ? "Buy" : "Sell"} Order
        </button>
      </div>
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
  handleFilledOnly: PropTypes.func.isRequired
};

export default MarketTradingConfirm;
