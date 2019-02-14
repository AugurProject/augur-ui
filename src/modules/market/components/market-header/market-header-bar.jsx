import React from "react";
import PropTypes from "prop-types";
import Styles from "modules/market/components/market-header/market-header-bar.styles";
import { FavoritesButton } from "modules/common-elements/buttons";
import {
  MarketStatusLabel,
  MarketTypeLabel
} from "modules/common-elements/labels";

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

  return (
    <section className={Styles.MarketHeaderBar}>
      <MarketStatusLabel marketStatus={marketStatus} />
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
  marketStatus: PropTypes.string.isRequired,
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
  collapsedView: false
};

export default MarketHeaderBar;
