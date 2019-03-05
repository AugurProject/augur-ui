import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Favorites from "modules/portfolio/components/favorites/favorites";
import { toggleFavorite } from "modules/markets/actions/update-favorites";
import selectAllMarkets from "modules/markets/selectors/markets-all";
import { selectMarket } from "modules/markets/selectors/market";

const mapStateToProps = state => {
  // basically just create the filtered markets based on what IDs we find in the favorites object
  const markets = selectAllMarkets();
  const { favorites } = state;
  const filteredMarkets = Object.keys(favorites).reduce(
    (filtered, favoriteId) => {
      if (markets.find(market => market.id === favoriteId)) {
        const market = selectMarket(favoriteId);
        market.favoriteAddedData = favorites[favoriteId];
        filtered.push(market);
      }
      return filtered;
    },
    []
  );

  return {
    isLogged: state.authStatus.isLogged,
    isMobile: state.appStatus.isMobile,
    markets: filteredMarkets,
    currentAugurTimestamp: state.blockchain.currentAugurTimestamp,
    reportingWindowStatsEndTime: state.reportingWindowStats.endTime
  };
};

const mapDispatchToProps = dispatch => ({
  toggleFavorite: marketId => dispatch(toggleFavorite(marketId))
});

const FavoritesContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Favorites)
);

export default FavoritesContainer;
