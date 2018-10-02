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

  const direction = indicator => {
    if (![BUY_UP, BUY_DOWN, SELL_UP, SELL_DOWN].includes(indicator)) {
      return null;
    }
    return indicator === BUY_UP || indicator === SELL_UP ? "up" : "down";
  };

  const spacing = (loc, direction) => {
    if (direction === null) {
      return {};
    }
    switch (loc + "|" + direction) {
      case "yes-no-scalar|up":
        return { bottom: "0.975rem" };
      case "yes-no-scalar|down":
        return { top: "1.075rem" };
      case "categorical|up":
        return { top: "-0.85rem" };
      case "categorical|down":
        return { top: "0.85rem" };
      case "outcomes|up":
        return { bottom: "0.935rem" };
      case "outcomes|down":
        return { top: "0.955rem" };
      case "positions|up":
        return { top: "-0.935rem" };
      case "positions|down":
        return { top: "0.85rem" };
      default:
        return {};
    }
  };

  const arrowStyles = (loc, indicator) => ({
    position: "relative",
    ...spacing(loc, indicator),
    ...style
  });

  return (
    <span
      className={classNames(indicatorStyle, { [`${Styles.small}`]: isMobile })}
      style={arrowStyles(location, direction(tradingIndicator))}
    />
  );
}

OutcomeTradingIndicator.propTypes = {
  tradingIndicator: PropTypes.string.isRequired,
  style: PropTypes.object,
  location: PropTypes.string,
  isMobile: PropTypes.bool
};
