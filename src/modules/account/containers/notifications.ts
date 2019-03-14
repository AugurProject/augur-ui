import { connect } from "react-redux";
import Notifications from "modules/account/components/notifications/notifications";
import { selectNotifications } from "modules/notifications/selectors/notification-state";
import { updateNotifications } from "modules/notifications/actions/update-notifications";
import { getReportingFees } from "modules/reports/actions/get-reporting-fees";
import { updateModal } from "modules/modal/actions/update-modal";
import {
  MODAL_FINALIZE_MARKET,
  MODAL_SELL_COMPLETE_SETS,
  MODAL_CLAIM_PROCEEDS
} from "modules/common-elements/constants";

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
  getReportingFees: () => dispatch(getReportingFees()),
  finalizeMarketModal: (marketId: any) =>
    dispatch(updateModal({ type: MODAL_FINALIZE_MARKET, marketId })),
  sellCompleteSetsModal: (marketId: any, numCompleteSets: any) =>
    dispatch(
      updateModal({ type: MODAL_SELL_COMPLETE_SETS, marketId, numCompleteSets })
    ),
  claimTradingProceeds: (marketIds: any) =>
    dispatch(updateModal({ type: MODAL_CLAIM_PROCEEDS, marketId: marketIds }))
});

const NotificationsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);

export default NotificationsContainer;
