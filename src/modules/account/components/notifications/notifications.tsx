import React from "react";
import { isEqual } from "lodash";

import NotificationBox from "modules/account/components/notifications/notification-box";
import { Notifications as INotifications } from "modules/account/types";
import {
  FinalizeTemplate,
  OpenOrdersResolvedMarketsTemplate,
  ReportEndingSoonTemplate,
  DisputeTemplate,
  SellCompleteSetTemplate,
  ClaimReportingFeesTemplate,
  UnsignedOrdersTemplate
} from "modules/account/components/notifications/notifications-templates";

import * as constants from "modules/common-elements/constants";

export interface NotificationsProps {
  notifications: Array<INotifications>;
  updateNotifications: Function;
  getReportingFees: Function;
  currentAugurTimestamp: number;
  reportingWindowStatsEndTime: number;
}

class Notifications extends React.Component<NotificationsProps> {
  componentDidMount() {
    this.props.updateNotifications(this.props.notifications);
    this.props.getReportingFees();
  }

  componentWillReceiveProps(nextProps: NotificationsProps) {
    if (!isEqual(this.props.notifications, nextProps.notifications)) {
      this.props.updateNotifications(nextProps.notifications);
      this.props.getReportingFees();
    }
  }

  render() {
    const notifications = this.props.notifications.map(notificaction => {
      let options = {};
      if (
        notificaction.type ===
        constants.NOTIFICATION_TYPES.resolvedMarketsOpenOrders
      ) {
        options = {
          buttonAction: () => null,
          Template: OpenOrdersResolvedMarketsTemplate
        };
      } else if (
        notificaction.type === constants.NOTIFICATION_TYPES.reportOnMarkets
      ) {
        options = {
          buttonAction: () => null,
          Template: ReportEndingSoonTemplate
        };
      } else if (
        notificaction.type === constants.NOTIFICATION_TYPES.finalizeMarkets
      ) {
        options = {
          buttonAction: () => null,
          Template: FinalizeTemplate
        };
      } else if (
        notificaction.type === constants.NOTIFICATION_TYPES.marketsInDispute
      ) {
        options = {
          buttonAction: () => null,
          Template: DisputeTemplate
        };
      } else if (
        notificaction.type === constants.NOTIFICATION_TYPES.completeSetPositions
      ) {
        options = {
          buttonAction: () => null,
          Template: SellCompleteSetTemplate
        };
      } else if (
        notificaction.type === constants.NOTIFICATION_TYPES.unsignedOrders
      ) {
        options = {
          buttonAction: () => null,
          Template: UnsignedOrdersTemplate
        };
      } else if (
        notificaction.type === constants.NOTIFICATION_TYPES.claimReportingFees
      ) {
        options = {
          buttonAction: () => null,
          Template: ClaimReportingFeesTemplate
        };
      }

      return {
        ...notificaction,
        ...options
      };
    });

    return (
      <NotificationBox
        notifications={notifications}
        currentTime={this.props.currentAugurTimestamp}
        reportingWindowEndtime={this.props.reportingWindowStatsEndTime}
      />
    );
  }
}

export default Notifications;
