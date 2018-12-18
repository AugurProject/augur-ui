import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MarketOutcomesList from "modules/market/components/market-outcomes-list/market-outcomes-list";
import { loadFullMarket } from "modules/markets/actions/load-full-market";
import { selectMarket } from "modules/markets/selectors/market";
import parseQuery from "modules/routes/helpers/parse-query";
import { MARKET_ID_PARAM_NAME } from "modules/routes/constants/param-names";
import getPrecision from "utils/get-number-precision";

const mapStateToProps = (state, ownProps) => {
  const market = selectMarket(ownProps.marketId);

  return {
    marketType: market.marketType,
    scalarDenomination: market.scalarDenomination,
    minPrice: market.minPrice,
    maxPrice: market.maxPrice,
  };
};

const MarketOutcomesListContainer = withRouter(
  connect(
    mapStateToProps,
  )(MarketOutcomesList)
);

export default MarketOutcomesListContainer;
