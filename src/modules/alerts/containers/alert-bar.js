import { connect } from "react-redux";
import { AlertBar } from "modules/alerts/components/alert-bar/alert-bar";
import { selectUndissmissedOrphanedOrders } from "modules/orders/selectors/select-undissmissed-orphaned-orders";
import { dismissOrphanedOrder } from "modules/orders/actions/orphaned-orders";
import { selectMarket } from "modules/markets/selectors/market";

const mapStateToProps = state => {
  const alerts = selectUndissmissedOrphanedOrders(state);
  let market = null;
  let marketsNumber = 1;
  if (alerts.length === 1) {
    market = selectMarket(alerts[0].marketId);
  } else {
    const marketIds = alerts
      .map(alert => alert.marketId)
      .filter((value, index, self) => self.indexOf(value) === index);
    marketsNumber = marketIds.length;
  }
  return {
    isMobileSmall: state.appStatus.isMobileSmall,
    alerts,
    market,
    marketsNumber
  };
};

const mapDispatchToProps = dispatch => ({
  dismissFn: order => dispatch(dismissOrphanedOrder(order))
});

export const AlertBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertBar);
