import React from "react";
import PropTypes from "prop-types";
import Styles from "modules/market/components/market-header/market-header-bar.styles";
import { FavoritesButton } from "modules/common-elements/buttons";
import {
  InReportingLabel,
  MarketTypeLabel
} from "modules/common-elements/labels";
import * as constants from "modules/common-elements/constants";

const MarketHeaderBar = ({
  addToFavorites,
  isLogged,
  isFavorite,
  collapsedView,
  description,
  marketType,
  marketStatus,
  reportingState,
  disputeInfo,
  endTime,
  currentAugurTimestamp,
  reportingWindowStatsEndTime
}) => {
  if (collapsedView) {
    return (
      <section className={Styles.MarketHeaderBar}>
        <h1 className={Styles.MarketHeaderBar__description}>{description}</h1>
      </section>
    );
  }

  return (
    <section className={Styles.MarketHeaderBar}>
      <InReportingLabel
        // mini={true}
        marketStatus={marketStatus}
        reportingState={reportingState}
        disputeInfo={disputeInfo}
        endTime={endTime}
        currentAugurTimestamp={currentAugurTimestamp}
        reportingWindowStatsEndTime={reportingWindowStatsEndTime}
      />
      <MarketTypeLabel marketType={marketType} />
      {addToFavorites && (
        <div className={Styles.MarketHeaderBar__watchlist__container}>
          <FavoritesButton
            action={() => addToFavorites()}
            isFavorite={isFavorite}
            disabled={!isLogged}
          />
        </div>
      )}
    </section>
  );
};

MarketHeaderBar.propTypes = {
  marketStatus: PropTypes.string,
  isLogged: PropTypes.bool,
  isFavorite: PropTypes.bool,
  addToFavorites: PropTypes.func.isRequired,
  collapsedView: PropTypes.bool,
  description: PropTypes.string.isRequired,
  marketType: PropTypes.string.isRequired,
  reportingState: PropTypes.string.isRequired,
  disputeInfo: PropTypes.object.isRequired,
  endTime: PropTypes.object.isRequired,
  currentAugurTimestamp: PropTypes.number.isRequired,
  reportingWindowStatsEndTime: PropTypes.number.isRequired
};

MarketHeaderBar.defaultProps = {
  isLogged: false,
  isFavorite: false,
  collapsedView: false,
  marketStatus: constants.MARKET_OPEN
};

export default MarketHeaderBar;
