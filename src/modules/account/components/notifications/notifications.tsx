/* eslint react/no-array-index-key: 0 */

import React, { ReactNode } from "react";
import { isEqual } from "lodash";
import { RouteComponentProps } from "react-router-dom";

import BoxHeader from "modules/portfolio/components/common/headers/box-header";
import EmptyDisplay from "modules/portfolio/components/common/tables/empty-display";
import makePath from "modules/routes/helpers/make-path";
import makeQuery from "modules/routes/helpers/make-query";

import { NotificationCard } from "modules/account/components/notifications/notification-card";
import { PillLabel } from "modules/common-elements/labels";
import { REPORT, DISPUTE } from "modules/routes/constants/views";
import {
  MARKET_ID_PARAM_NAME,
  RETURN_PARAM_NAME
} from "modules/routes/constants/param-names";
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

export interface NotificationsProps extends RouteComponentProps {
  notifications: Array<INotifications>;
  updateNotifications: Function;
  getReportingFees: Function;
  currentAugurTimestamp: number;
  reportingWindowStatsEndTime: number;
  sellCompleteSetsModal: Function;
  finalizeMarketModal: Function;
  claimTradingProceeds: Function;
  claimReportingFees: Function;
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
    const { location, history } = this.props;

    switch (notification.type) {
      case NOTIFICATION_TYPES.resolvedMarketsOpenOrders:
        buttonAction = () => null;
        break;

      case NOTIFICATION_TYPES.reportOnMarkets:
        buttonAction = () => {
          const queryLink = {
            [MARKET_ID_PARAM_NAME]: notification.market.id,
            [RETURN_PARAM_NAME]: location.hash
          };
          history.push({
            pathname: makePath(REPORT),
            search: makeQuery(queryLink)
          });
        };
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
        buttonAction = () => {
          const queryLink = {
            [MARKET_ID_PARAM_NAME]: notification.market.id,
            [RETURN_PARAM_NAME]: location.hash
          };
          history.push({
            pathname: makePath(DISPUTE),
            search: makeQuery(queryLink)
          });
        };
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
        buttonAction = () => {
          this.props.claimReportingFees(
            notification.claimReportingFees,
            () => null
          );
        };
        break;

      case NOTIFICATION_TYPES.proceedsToClaim:
        buttonAction = () => {
          this.disableNotification(notification.id, true);
          this.props.claimTradingProceeds(() =>
            this.disableNotification(notification.id, false)
          );
        };
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
            <EmptyDisplay selectedTab="" filterLabel="notifications" />
          ) : (
            rows
          )}
        </div>
      </div>
    );
  }
}

export default Notifications;
