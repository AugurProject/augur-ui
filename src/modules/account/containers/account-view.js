import { connect } from "react-redux";
import AccountView from "modules/account/components/account-view/account-view";
import {
  selectResolvedMarketsOpenOrders,
  selectReportOnMarkets,
  selectFinalizeMarkets
} from "modules/notifications/selectors/notification-state";
import { updateNotifications } from "modules/notifications/actions/update-notifications";

const mapStateToProps = state => {
  const resolvedMarketsOpenOrders = selectResolvedMarketsOpenOrders(state);
  const reportOnMarkets = selectReportOnMarkets(state);
  const finalizedMarkets = selectFinalizeMarkets(state);
  return {
    notifications: state.notifications,
    resolvedMarketsOpenOrders,
    reportOnMarkets,
    finalizedMarkets,
    currentAugurTimestamp: state.blockchain.currentAugurTimestamp,
    reportingWindowStatsEndTime: state.reportingWindowStats.endTime
  };
};

const mapDispatchToProps = dispatch => ({
  updateNotifications: notifications =>
    dispatch(updateNotifications(notifications))
});

const AccountViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountView);

export default AccountViewContainer;
