import React from "react";
import { isEqual } from "lodash";

import AccountHeader from "modules/account/containers/account-header";
import TermsAndConditions from "modules/app/containers/terms-and-conditions";
import QuadBox from "modules/portfolio/components/common/quads/quad-box";
import NotificationBox from "modules/account/components/notifications/notification-box";
import TransactionsBoxContainer from "modules/account/containers/transactions-box";
import {
  FinalizeTemplate,
  OpenOrdersResolvedMarketsTemplate,
  ReportEndingSoonTemplate,
} from "modules/account/components/notifications/notifications-templates";
import Favorites from "modules/portfolio/containers/favorites";
import OpenMarkets from "modules/account/containers/open-markets";

import { Market, Notifications } from "modules/account/types";
import * as constants from "modules/common-elements/constants";

import Styles from "modules/account/components/account-view/account-view.styles";


export interface AccountViewProps {
  resolvedMarketsOpenOrders: Array<Market>;
  reportOnMarkets: Array<Market>;
  finalizedMarkets: Array<Market>;
  updateNotifications: Function;
  notifications: Array<Notifications>;
  currentAugurTimestamp: number;
  reportingWindowStatsEndTime: number;
}

class AccountView extends React.Component<AccountViewProps> {
  componentDidMount() {
    this.updateState(this.props);
  }

  componentWillReceiveProps(nextProps: AccountViewProps) {
    if (!isEqual(nextProps.resolvedMarketsOpenOrders, this.props.resolvedMarketsOpenOrders) ||
        !isEqual(nextProps.reportOnMarkets, this.props.reportOnMarkets) ||
        !isEqual(nextProps.finalizedMarkets, this.props.finalizedMarkets)) {
          this.updateState(nextProps);
    }
  }

  updateState(props: AccountViewProps) {
    this.props.updateNotifications(
      this.generateCards(this.props.resolvedMarketsOpenOrders, 'resolvedMarketsOpenOrders')
      .concat(this.generateCards(this.props.reportOnMarkets, 'reportOnMarkets'))
      .concat(this.generateCards(this.props.finalizedMarkets, 'finalizedMarkets')));
  }

  render() {
    const { notifications } = this.props;
    return (
      <section className={Styles.AccountView}>
        <AccountHeader />
        <div className={Styles.AccountView__container}>
          <NotificationBox
            currentTime={this.props.currentAugurTimestamp}
            notifications={notifications}
            reportingWindowEndtime={this.props.reportingWindowStatsEndTime}
          />
          <QuadBox title="Your Overview" />
          <Favorites />
          <OpenMarkets />
          <QuadBox title="Augur Status" />
          <TransactionsBoxContainer />
          />
        </div>
        <TermsAndConditions />
      </section>
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

export default AccountView;
