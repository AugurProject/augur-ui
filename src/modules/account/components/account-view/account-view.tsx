import React, { Component } from "react";
import { isEqual } from "lodash";

import AccountHeader from "modules/account/containers/account-header";
import TermsAndConditions from "modules/app/containers/terms-and-conditions";
import QuadBox from "modules/portfolio/components/common/quads/quad-box";
import NotificationBox from "modules/account/components/notifications/notification-box";
import { OpenOrdersResolvedMarketsTemplate } from "modules/account/components/notifications/notifications-templates";
import { Notifications } from "modules/account/components/notifications/notification-box";

import * as constants from "modules/common-elements/constants";

import Styles from "modules/account/components/account-view/account-view.styles";



export interface ResolvedMarketsOpenOrdersData {
  marketId: string;
  marketName: string;
}

export interface AccountViewProps {
  resolvedMarketsOpenOrders: Array<ResolvedMarketsOpenOrdersData>;
  updateNotifications: Function;
  notifications: Array<Notifications>;
}

class AccountView extends  React.Component<AccountViewProps> {
  componentDidMount() {
    this.props.updateNotifications(
      this.generateCards(this.props.resolvedMarketsOpenOrders)
    );
  }

  componentWillReceiveProps(nextProps: AccountViewProps) {
    if (
      !isEqual(
        nextProps.resolvedMarketsOpenOrders,
        this.props.resolvedMarketsOpenOrders
      )
    ) {
      this.props.updateNotifications(
        this.generateCards(nextProps.resolvedMarketsOpenOrders)
      );
    }
  }


  generateCards(resolvedMarketsOpenOrders: Array<object>) {
    if (!resolvedMarketsOpenOrders) {
      return [];
    }

    return resolvedMarketsOpenOrders.map((market) => {
      const { marketId, marketName }: any = market;
      return {
        isImportant: false,
        isNew: true,
        marketName,
        marketId,
        title: constants.RESOLVED_MARKETS_OPEN_ORDERS_TITLE,
        buttonLabel: constants.TYPE_VIEW,
        type: 'OpenOrdersResolvedMarketsTemplate',
        buttonAction: () => null, // TODO Modals
        Template: OpenOrdersResolvedMarketsTemplate
      };
    });
  }

  render() {
    const { notifications } = this.props;
    return (
      <section className={Styles.AccountView}>
        <AccountHeader />
        <div className={Styles.AccountView__container}>
          <NotificationBox notifications={notifications} />
          <QuadBox title="Your Overview" />
          <QuadBox title="Watchlist" />
          <QuadBox title="Open Markets" />
          <QuadBox title="Augur Status" />
          <QuadBox title="Transactions" />
        </div>
        <TermsAndConditions />
      </section>
    );
  }
}

export default AccountView;
