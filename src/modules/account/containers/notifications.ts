import { connect } from "react-redux";
import Notifications from "modules/account/components/notifications/notifications";
import { selectNotifications } from "modules/notifications/selectors/notification-state";
import { updateNotifications } from "modules/notifications/actions/update-notifications";
import { getReportingFees } from "modules/reports/actions/get-reporting-fees";

// TODO create state Interface
const mapStateToProps = (state: any) => {
  const notifications = selectNotifications(state);

  return {
    notifications,
    currentAugurTimestamp: state.blockchain.currentAugurTimestamp,
    reportingWindowStatsEndTime: state.reportingWindowStats.endTime
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  updateNotifications: (notifications: any) =>
    dispatch(updateNotifications(notifications)),
  getReportingFees: () => dispatch(getReportingFees())
});

const NotificationsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);

export default NotificationsContainer;
