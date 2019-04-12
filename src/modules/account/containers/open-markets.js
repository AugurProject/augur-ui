import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import OpenMarkets from "modules/account/components/open-markets/open-markets";
import { pick } from "lodash";
import getLoginAccountPositions from "modules/positions/selectors/login-account-positions";
import getSelectLoginAccountTotals from "modules/positions/selectors/login-account-totals";
import memoize from "memoizee";
import { MARKET_OPEN } from "modules/common-elements/constants";
import { createMarketsStateObject } from "modules/portfolio/helpers/create-markets-state-object";

const mapStateToProps = state => {
  const positions = getLoginAccountPositions();
  const totalPercentage = getSelectLoginAccountTotals();
  const markets = getPositionsMarkets(positions);

  const marketsObj = markets.reduce((obj, market) => {
    obj[market.id] = market;
    return obj;
  }, {});

  const marketsPick = markets.map((
    market // when these things change then component will re-render/re-sort
  ) => pick(market, ["id", "description", "reportingState"]));

  const marketsByState = createMarketsStateObject(marketsPick);

  return {
    isLogged: state.authStatus.isLogged,
    isMobile: state.appStatus.isMobile,
    markets: marketsByState[MARKET_OPEN],
    marketsObj,
    totalPercentage
  };
};

const OpenMarketsContainer = withRouter(connect(mapStateToProps)(OpenMarkets));

const getPositionsMarkets = memoize(
  positions => Array.from(new Set([...positions.markets])),
  { max: 1 }
);

export default OpenMarketsContainer;
