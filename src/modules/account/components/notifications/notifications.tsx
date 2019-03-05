import React from "react";
import { isEqual } from "lodash";

import NotificationBox from "modules/account/components/notifications/notification-box";
import {
  FinalizeTemplate,
  OpenOrdersResolvedMarketsTemplate,
  ReportEndingSoonTemplate,
} from "modules/account/components/notifications/notifications-templates";

import { Market, Notifications as INotifications  } from "modules/account/constants";
import * as constants from "modules/common-elements/constants";

export interface NotificationsProps {
  resolvedMarketsOpenOrders: Array<Market>;
  reportOnMarkets: Array<Market>;
  finalizedMarkets: Array<Market>;
  updateNotifications: Function;
  notifications: Array<INotifications>;
  currentAugurTimestamp: number;
  reportingWindowStatsEndTime: number;
}

class Notifications extends React.Component<NotificationsProps> {
  componentDidMount() {
    this.updateState(this.props);
  }

  componentWillReceiveProps(nextProps: NotificationsProps) {
    if (!isEqual(nextProps.resolvedMarketsOpenOrders, this.props.resolvedMarketsOpenOrders) ||
        !isEqual(nextProps.reportOnMarkets, this.props.reportOnMarkets) ||
        !isEqual(nextProps.finalizedMarkets, this.props.finalizedMarkets)) {
          this.updateState(nextProps);
    }
  }

  updateState(props: NotificationsProps) {
    this.props.updateNotifications(
      this.generateCards(this.props.resolvedMarketsOpenOrders, 'resolvedMarketsOpenOrders')
      .concat(this.generateCards(this.props.reportOnMarkets, 'reportOnMarkets'))
      .concat(this.generateCards(this.props.finalizedMarkets, 'finalizedMarkets')));
  }

  render() {
    const { notifications } = this.props;
    return (
      <NotificationBox
        currentTime={this.props.currentAugurTimestamp}
        notifications={notifications}
        reportingWindowEndtime={this.props.reportingWindowStatsEndTime}
      />
    );
  }

  generateCards(markets: Array<Market>, type: string) {
    let defaults = {};

    if (type === 'resolvedMarketsOpenOrders') {
      defaults = {
        isImportant: false,
        isNew: false,
        title: constants.RESOLVED_MARKETS_OPEN_ORDERS_TITLE,
        buttonLabel: constants.TYPE_VIEW,
        buttonAction: () => null,
        Template: OpenOrdersResolvedMarketsTemplate
      }
    }
    else if (type === 'reportOnMarkets') {
      defaults = {
        isImportant: true,
        isNew: false,
        title: constants.REPORTING_ENDS_SOON,
        buttonLabel: constants.TYPE_VIEW,
        buttonAction: () => null,
        Template: ReportEndingSoonTemplate
      }
    }
    else if (type === 'finalizedMarkets') {
      defaults = {
        isImportant: true,
        isNew: false,
        title: constants.FINALIZE_MARKET,
        buttonLabel: constants.TYPE_VIEW,
        buttonAction: () => null,
        Template: FinalizeTemplate
      }
    }

    return markets.map((market: Market) => {
      return {
        market,
        ...defaults
      };
    });
  };
}

export default Notifications;
