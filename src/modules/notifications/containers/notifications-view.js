import { connect } from "react-redux";

import NotificationsView from "modules/notifications/components/notifications-view/notifications-view";
import { selectInfoNotificationsAndSeenCount } from "modules/notifications/selectors/notifications";
import {
  updateNotification,
  removeNotification,
  clearNotifications,
  loadNotifications
} from "modules/notifications/actions/notifications";

const mapStateToProps = state => {
  const notifications = selectInfoNotificationsAndSeenCount(state);
  return {
    notifications: notifications.notifications,
    transactionsData: state.transactionsData
  };
};

const mapDispatchToProps = dispatch => ({
  updateNotification: (id, notification) =>
    dispatch(updateNotification(id, notification)),
  removeNotification: id => dispatch(removeNotification(id)),
  clearNotifications: () => dispatch(clearNotifications()),
  loadNotifications: () => dispatch(loadNotifications())
});

const NotificationsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsView);

export default NotificationsContainer;
