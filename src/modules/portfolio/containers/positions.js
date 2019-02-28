import { connect } from "react-redux";
import memoize from "memoizee";
import Positions from "modules/portfolio/components/positions/positions";
import getLoginAccountPositions from "modules/positions/selectors/login-account-positions";
import { triggerTransactionsExport } from "modules/transactions/actions/trigger-transactions-export";
import { updateModal } from "modules/modal/actions/update-modal";
import { MODAL_CLAIM_TRADING_PROCEEDS } from "modules/common-elements/constants";
import { pick } from "lodash";

import { createMarketsStateObject } from "modules/portfolio/helpers/create-markets-state-object";
import { createTabsInfo } from "modules/portfolio/helpers/create-tabs-info";

const mapStateToProps = state => {
  const positions = getLoginAccountPositions();

  // NOTE: for data wiring, this should probably be just done as calls for getting openPosition Markets, getting Reporting Markets, and getting Closed Markets respectively from the node and just passed the expected keys below
  const markets = getPositionsMarkets(positions);

  const marketsObj = markets.reduce((obj, market) => {
    obj[market.id] = market;
    return obj;
  }, {});

  const marketsPick = markets.map((
    market // when these things change then component will re-render/re-sort
  ) =>
    pick(market, [
      "id",
      "description",
      "reportingState",
      "myPositionsSummary",
      "recentlyTraded",
      "endTime"
    ])
  );

  const marketsByState = createMarketsStateObject(marketsPick);

  return {
    markets: marketsByState,
    isMobile: state.appStatus.isMobile,
    tabsInfo: createTabsInfo(marketsByState),
    marketsObj
  };
};

const mapDispatchToProps = dispatch => ({
  triggerTransactionsExport: () => dispatch(triggerTransactionsExport()),
  claimTradingProceeds: marketId =>
    dispatch(updateModal({ type: MODAL_CLAIM_TRADING_PROCEEDS, marketId }))
});

const getPositionsMarkets = memoize(
  positions => Array.from(new Set([...positions.markets])),
  { max: 1 }
);

const PositionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Positions);

export default PositionsContainer;
