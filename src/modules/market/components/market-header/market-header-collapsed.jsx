import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import MarketHeaderBar from "modules/market/containers/market-header-bar";
import Styles from "modules/market/components/market-header/market-header.styles";
import TimeRangeStyles from "modules/market/components/market-header/market-header-time-range.styles";
import { createBigNumber } from "utils/create-big-number";
import { convertUnixToFormattedDate } from "utils/format-date";

export const MarketHeaderCollapsed = ({
  description,
  market,
  currentTime,
  marketType,
  toggleFavorite,
  isFavorite
}) => {
  const endTimestamp = market.endTime ? market.endTime.timestamp : 0;
  const formattedEndTime =
    (endTimestamp && convertUnixToFormattedDate(endTimestamp)) || {};
  const hasPassed = createBigNumber(currentTime).gt(
    createBigNumber(endTimestamp)
  );

  return (
    <div className={Styles[`MarketHeader__main-values`]}>
      <div
        className={classNames(Styles.MarketHeader__descContainer, {
          [Styles.MarketHeader__collapsed]: true
        })}
      >
        {market.id && (
          <MarketHeaderBar
            marketId={market.id}
            category={market.category}
            reportingState={market.reportingState}
            tags={market.tags}
            addToFavorites={toggleFavorite}
            isMobile={false}
            isFavorite={isFavorite}
            collapsedView
            marketType={marketType}
            description={description}
          />
        )}
      </div>
      <div className={Styles.MarketHeader__timeStuff}>
        <div>
          <span className={Styles.MarketHeader__property__header}>
            {hasPassed ? "Expired" : "Expires"}
          </span>

          <span
            className={TimeRangeStyles.MarketHeaderTimeRange__value}
            style={{ paddingBottom: "1rem" }}
          >
            {formattedEndTime.formattedLocalShortDate}
          </span>
          <span className={TimeRangeStyles.MarketHeaderTimeRange__utc}>
            {formattedEndTime.clockTimeLocal}
          </span>
        </div>
      </div>
    </div>
  );
};

MarketHeaderCollapsed.propTypes = {
  description: PropTypes.string.isRequired,
  market: PropTypes.object.isRequired,
  currentTime: PropTypes.number,
  marketType: PropTypes.string,
  isMobile: PropTypes.bool,
  toggleFavorite: PropTypes.func,
  isFavorite: PropTypes.bool,
  history: PropTypes.object.isRequired
};

MarketHeaderCollapsed.defaultProps = {
  marketType: null,
  currentTime: 0,
  isFavorite: false,
  toggleFavorite: () => {},
  isMobile: false
};
