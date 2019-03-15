import React from "react";

import AccountHeader from "modules/account/containers/account-header";
import TermsAndConditions from "modules/app/containers/terms-and-conditions";
import Notifications from "modules/account/containers/notifications";
import TransactionsBoxContainer from "modules/account/containers/transactions-box";
import AugurStatus from "modules/account/containers/augur-status";
import Favorites from "modules/portfolio/containers/favorites";
import OpenMarkets from "modules/account/containers/open-markets";
import AccountOverview from "modules/account/containers/account-overview";

import Styles from "modules/account/components/account-view/account-view.styles";

const AccountView = () => (
  <section className={Styles.AccountView}>
    <AccountHeader />
    <div className={Styles.AccountView__container}>
      <div>
        <Notifications />
        <OpenMarkets />
      </div>
      <div>
        <AccountOverview />
        <AugurStatus />
      </div>
      <div>
        <Favorites />
        <TransactionsBoxContainer />
      </div>
    </div>
    <TermsAndConditions />
  </section>
);

export default AccountView;
