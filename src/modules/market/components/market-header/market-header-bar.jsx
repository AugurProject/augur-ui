import React from "react";
import PropTypes from "prop-types";
import Styles from "modules/market/components/market-header/market-header-bar.styles";
import { FavoritesButton } from "modules/common-elements/buttons";
import {
  MarketStatusLabel,
  MarketTypeLabel,
  ValueLabel
} from "modules/common-elements/labels";
import * as constants from "modules/common-elements/constants";
import { formatEther } from "utils/format-number";

const MarketHeaderBar = ({
  addToFavorites,
  isLogged,
  isFavorite,
  collapsedView,
  description,
  marketType,
  marketStatus
}) => {
  if (collapsedView) {
    return (
      <section className={Styles.MarketHeaderBar}>
        <h1 className={Styles.MarketHeaderBar__description}>{description}</h1>
      </section>
    );
  }
  // console.log(formatEther("12391028391283.00000003339230"));
  return (
    <section className={Styles.MarketHeaderBar}>
      <MarketStatusLabel marketStatus={marketStatus} />
      <MarketTypeLabel marketType={marketType} />
      <ValueLabel value={formatEther("0.00000003339230")} showDenomination />
      <ValueLabel value={formatEther("0.0030")} showDenomination />
      <ValueLabel value={formatEther("253234.0030")} showDenomination />
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
  marketType: PropTypes.string.isRequired
};

MarketHeaderBar.defaultProps = {
  isLogged: false,
  isFavorite: false,
  collapsedView: false,
  marketStatus: constants.MARKET_OPEN
};

export default MarketHeaderBar;
