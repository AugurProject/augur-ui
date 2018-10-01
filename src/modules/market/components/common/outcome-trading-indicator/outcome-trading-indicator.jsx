import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  BUY_UP,
  BUY_DOWN,
  SELL_UP,
  SELL_DOWN,
  NONE
} from "modules/trades/constants/types";
import Styles from "modules/market/components/common/outcome-trading-indicator/outcome-trading-indicator.style";

export default function OutcomeTradingIndicator({
  tradingIndicator,
  style,
  location,
  isMobile
}) {
  const indicatorArray = {};
  indicatorArray[BUY_UP] = Styles.TradingIndicator_arrow_buy_up;
  indicatorArray[BUY_DOWN] = Styles.TradingIndicator_arrow_buy_down;
  indicatorArray[SELL_UP] = Styles.TradingIndicator_arrow_sell_up;
  indicatorArray[SELL_DOWN] = Styles.TradingIndicator_arrow_sell_down;
  indicatorArray[NONE] = "";

  const indicatorStyle = indicatorArray[tradingIndicator];

  const spacing = (loc, indicator) => {
    if (tradingIndicator === "none") {
      return;
    }
    switch (loc + "|" + indicator) {
      case "yes-no-scalar|" + BUY_UP:
      case "yes-no-scalar|" + SELL_UP:
        return { bottom: "0.975rem" };
      case "yes-no-scalar|" + BUY_DOWN:
      case "yes-no-scalar|" + SELL_DOWN:
        return { top: "1.075rem" };
      case "categorical|" + BUY_UP:
      case "categorical|" + SELL_UP:
        return { top: "-0.85rem" };
      case "categorical|" + BUY_DOWN:
      case "categorical|" + SELL_DOWN:
        return { top: "0.85rem" };
      case "list|" + BUY_UP:
      case "list|" + SELL_UP:
        return { bottom: "0.935rem" };
      case "list|" + BUY_DOWN:
      case "list|" + SELL_DOWN:
        return { top: "0.955rem" };
      default:
        return {};
    }
  };

  const arrowStyles = (loc, indicator) => ({
    ...style,
    position: "relative",
    ...spacing(loc, indicator)
  });

  return (
    <span
      className={classNames(indicatorStyle, { [`${Styles.small}`]: isMobile })}
      style={arrowStyles(location, tradingIndicator)}
    />
  );
}

OutcomeTradingIndicator.propTypes = {
  tradingIndicator: PropTypes.string.isRequired,
  style: PropTypes.object,
  location: PropTypes.string,
  isMobile: PropTypes.bool
};
