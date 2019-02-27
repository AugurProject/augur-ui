import { connect } from "react-redux";
import AccountView from "modules/account/components/account-view/account-view";
import { selectResolvedMarketsOpenOrders } from "modules/notifications/selectors/notification-state";
import { updateNotifications } from "modules/notifications/actions/update-notifications";

const mapStateToProps = state => {
  const resolvedMarketsOpenOrders = selectResolvedMarketsOpenOrders(state);

  return {
    notifications: state.notifications,
    resolvedMarketsOpenOrders
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
