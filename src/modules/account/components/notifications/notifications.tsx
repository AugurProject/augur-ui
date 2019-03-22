/* eslint react/no-array-index-key: 0 */

import React, { ReactNode } from "react";
import { isEqual } from "lodash";

import BoxHeader from "modules/portfolio/components/common/headers/box-header";
import { NotificationCard } from "modules/account/components/notifications/notification-card";
import { PillLabel } from "modules/common-elements/labels";
import {
  Market,
  FinalizeTemplate,
  OpenOrdersResolvedMarketsTemplate,
  ReportEndingSoonTemplate,
  DisputeTemplate,
  SellCompleteSetTemplate,
  ClaimReportingFeesTemplate,
  UnsignedOrdersTemplate,
  ProceedsToClaimTemplate,
  ProceedsToClaimOnHoldTemplate
} from "modules/account/components/notifications/notifications-templates";

import * as constants from "modules/common-elements/constants";

import Styles from "modules/account/components/notifications/notifications.styles";

export interface INotifications {
  id: string;
  type: string;
  isImportant: boolean;
  isNew: boolean;
  title: string;
  buttonLabel: string;
  buttonAction: Function;
  Template: ReactNode;
  market: Market | null;
  markets: Array<string>;
  claimReportingFees?: Object;
  totalProceeds?: number;
}

export interface NotificationsProps {
  notifications: Array<INotifications>;
  updateNotifications: Function;
  getReportingFees: Function;
  currentAugurTimestamp: number;
  reportingWindowStatsEndTime: number;
  sellCompleteSetsModal: Function;
  finalizeMarketModal: Function;
  claimTradingProceeds: Function;
}

const { NOTIFICATION_TYPES } = constants;

class Notifications extends React.Component<NotificationsProps> {
  state = {
    disabledNotifications: {}
  };

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

  getButtonAction(notification: INotifications) {
    let buttonAction;

    switch (notification.type) {
      case NOTIFICATION_TYPES.resolvedMarketsOpenOrders:
        buttonAction = () => null;
        break;

      case NOTIFICATION_TYPES.reportOnMarkets:
        buttonAction = () => null;
        break;

      case NOTIFICATION_TYPES.finalizeMarkets:
        buttonAction = () => {
          this.disableNotification(notification.id, true);
          this.props.finalizeMarketModal(notification.market.id, () =>
            this.disableNotification(notification.id, false)
          );
        };
        break;

      case NOTIFICATION_TYPES.marketsInDispute:
        buttonAction = () => null;
        break;

      case NOTIFICATION_TYPES.completeSetPositions:
        buttonAction = () => {
          this.disableNotification(notification.id, true);
          this.props.sellCompleteSetsModal(
            notification.market.id,
            notification.market.myPositionsSummary.numCompleteSets,
            () => this.disableNotification(notification.id, false)
          );
        };
        break;

      case NOTIFICATION_TYPES.unsignedOrders:
        buttonAction = () => null;
        break;

      case NOTIFICATION_TYPES.claimReportingFees:
        buttonAction = () => null;
        break;

      case NOTIFICATION_TYPES.proceedsToClaim:
        buttonAction = () => {
          this.disableNotification(notification.id, true);
          this.props.claimTradingProceeds(() =>
            this.disableNotification(notification.id, false)
          );
        };
        break;

      case NOTIFICATION_TYPES.proceedsToClaimOnHold:
        buttonAction = () => null;
        break;

      default:
        buttonAction = () => null;
        break;
    }

    return {
      ...notification,
      buttonAction
    };
  }

  disableNotification(id: string, disabled: boolean) {
    this.setState({
      disabledNotifications: {
        ...this.state.disabledNotifications,
        [id]: disabled
      }
    });
  }

  render() {
    const { currentAugurTimestamp, reportingWindowStatsEndTime } = this.props;
    const notifications = this.props.notifications.map(notification =>
      this.getButtonAction(notification)
    );
    const notificationCount = notifications.length;
    const newNotificationCount = notifications.filter(item => item.isNew)
      .length;

    const rows = notifications.map((notification, idx) => {
      const {
        id,
        isImportant,
        isNew,
        title,
        buttonLabel,
        buttonAction,
        market,
        markets,
        claimReportingFees,
        totalProceeds,
        type
      } = notification;

      const templateProps = {
        claimReportingFees,
        totalProceeds,
        markets,
        market,
        currentTime: currentAugurTimestamp,
        reportingWindowStatsEndTime
      };

      const notificationCardProps = {
        id,
        type,
        isImportant,
        isNew,
        title,
        buttonLabel,
        buttonAction,
        disabledNotifications: this.state.disabledNotifications
      };

      return (
        <NotificationCard key={idx} {...notificationCardProps}>
          {type === NOTIFICATION_TYPES.resolvedMarketsOpenOrders ? (
            <OpenOrdersResolvedMarketsTemplate {...templateProps} />
          ) : null}
          {type === NOTIFICATION_TYPES.reportOnMarkets ? (
            <ReportEndingSoonTemplate {...templateProps} />
          ) : null}
          {type === NOTIFICATION_TYPES.finalizeMarkets ? (
            <FinalizeTemplate {...templateProps} />
          ) : null}
          {type === NOTIFICATION_TYPES.marketsInDispute ? (
            <DisputeTemplate {...templateProps} />
          ) : null}
          {type === NOTIFICATION_TYPES.completeSetPositions ? (
            <SellCompleteSetTemplate {...templateProps} />
          ) : null}
          {type === NOTIFICATION_TYPES.unsignedOrders ? (
            <UnsignedOrdersTemplate {...templateProps} />
          ) : null}
          {type === NOTIFICATION_TYPES.claimReportingFees ? (
            <ClaimReportingFeesTemplate {...templateProps} />
          ) : null}
          {type === NOTIFICATION_TYPES.proceedsToClaimOnHold ? (
            <ProceedsToClaimOnHoldTemplate {...templateProps} />
          ) : null}
          {type === NOTIFICATION_TYPES.proceedsToClaim ? (
            <ProceedsToClaimTemplate {...templateProps} />
          ) : null}
        </NotificationCard>
      );
    });

    const labelContent = (
      <div className={Styles.NotificationBox__header}>
        <span>{`(${notificationCount} Notifications)`}</span>
        {newNotificationCount > 0 && (
          <PillLabel label={`${newNotificationCount} ${constants.NEW}`} />
        )}
      </div>
    );

    return (
      <div className={Styles.NotificationBox}>
        <BoxHeader title="Notifications" rightContent={labelContent} />
        <div className={Styles.NotificationBox__content}>
          {notificationCount === 0 ? (
            <div className={Styles.NotificationBox__EmptyDisplay}>
              {"No notifications"}
            </div>
          ) : (
            rows
          )}
        </div>
      </div>
    );
  }
}

export default Notifications;
