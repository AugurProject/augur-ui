import { connect } from "react-redux";
import Notifications from "modules/account/components/notifications/notifications";
import {
  selectResolvedMarketsOpenOrders,
  selectReportOnMarkets,
  selectFinalizeMarkets,
} from "modules/notifications/selectors/notification-state";
import { updateNotifications } from "modules/notifications/actions/update-notifications";

// TODO create state Interface
const mapStateToProps = (state: any) => {
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

const mapDispatchToProps = (dispatch: Function) => ({
  updateNotifications: (notifications: any) =>
    dispatch(updateNotifications(notifications))
});

const NotificationsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);

export default NotificationsContainer;
