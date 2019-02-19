import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import MarketHeaderBar from "modules/market/containers/market-header-bar";
import Styles from "modules/market/components/market-header/market-header.styles";
import { createBigNumber } from "utils/create-big-number";
import { TimeLabel } from "modules/common-elements/progress";

export const MarketHeaderCollapsed = ({
  description,
  market,
  currentTime,
  marketType,
  toggleFavorite,
  isFavorite
}) => {
  const endTimestamp = market.endTime ? market.endTime.timestamp : 0;
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
            marketStatus={market.marketStatus}
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
        <TimeLabel
          label={hasPassed ? "Expired" : "Expires"}
          time={market.endTime}
        />
      </div>
    </div>
  );
};

MarketHeaderCollapsed.propTypes = {
  description: PropTypes.string.isRequired,
  market: PropTypes.object.isRequired,
  currentTime: PropTypes.number,
  marketType: PropTypes.string,
  toggleFavorite: PropTypes.func,
  isFavorite: PropTypes.bool
};

MarketHeaderCollapsed.defaultProps = {
  marketType: null,
  currentTime: 0,
  isFavorite: false,
  toggleFavorite: () => {}
};
