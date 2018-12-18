import React from "react";
import PropTypes from "prop-types";

import { YES_NO } from "modules/markets/constants/market-types";

import getValue from "utils/get-value";
import CustomPropTypes from "utils/custom-prop-types";
import { createBigNumber } from "utils/create-big-number";
import MarketOutcomeTradingIndicator from "modules/market/containers/market-outcome-trading-indicator";
import Styles from "modules/market/components/market-scalar-outcome-display/market-scalar-outcome-display.styles";

const MarketScalarOutcomeDisplay = ({
  outcomes,
  max,
  min,
  scalarDenomination = ""
}) => {
  const calculatePosition = () => {
    const lastPrice =
      getValue(outcomes[0], "lastPricePercent.fullPrecision") || 0;

    const range = max.minus(min);
    return `${createBigNumber(lastPrice)
      .minus(min)
      .dividedBy(range)
      .times(createBigNumber(100))}`;
  };

  const outcomeVerticalLinePosition = () => {
    let pos = calculatePosition();
    if (pos > 99.0) {
      pos = 99.0;
    } else if (pos < 1.0) {
      pos = 1.0;
    }
    return pos;
  };

  const currentValuePosition = {
    left: outcomeVerticalLinePosition() + "%"
  };

  const minValue = `${min} ${scalarDenomination}`;

  const maxValue = `${max} ${scalarDenomination}`;

  const lastPriceDenomination = getValue(outcomes[0], "lastPricePercent.denomination");

  const currentMarketStyles = pos => {
    let size = getValue(outcomes[0], "lastPricePercent.formatted").toString()
      .length;
    const isMobileAttrs =
      window.outerWidth < 590
        ? { marginTop: 4, fontSize: 16 }
        : { marginTop: 7, fontSize: 20 };
    for (let i = 6; i < size; i += 6) {
      size *= 0.8;
    }
    return {
      marginLeft: pos < 15 ? size + "rem" : 0,
      marginRight: pos > 85 ? size + "rem" : 0,
      ...isMobileAttrs
    };
  };

  return (
    <div className={Styles.MarketScalarOutcomes}>
      <div>
      ---------------
      </div>
      <div>
      </div>
      <div>
      </div>
     
    </div>
  );
};

/**  <div className={Styles.MarketScalarOutcomes__range} />
      <span className={Styles.MarketScalarOutcomes__min}>{minValue}</span>
      <span className={Styles.MarketScalarOutcomes__max}>{maxValue}</span>
      <span
        className={Styles.MarketScalarOutcomes__current}
        style={currentValuePosition}
      >
        <div style={currentMarketStyles(calculatePosition())}>
          <span
            className={Styles["MarketScalarOutcomes__current-value"]}
            data-testid="midpoint"
          >
            {getValue(outcomes[0], "lastPricePercent.formatted")}
          </span>
          <span className={Styles["MarketScalarOutcomes__current-denomination"]}>
            {lastPriceDenomination}
          </span>
          <MarketOutcomeTradingIndicator
            outcome={outcomes[0]}
            location="yes-no-scalar"
          />
        </div>
      </span>
      **/

MarketScalarOutcomeDisplay.propTypes = {
  outcomes: PropTypes.array.isRequired,
  max: CustomPropTypes.bigNumber.isRequired,
  min: CustomPropTypes.bigNumber.isRequired,
  scalarDenomination: PropTypes.string
};

MarketScalarOutcomeDisplay.defaultProps = {
  scalarDenomination: ""
};

export default MarketScalarOutcomeDisplay;
