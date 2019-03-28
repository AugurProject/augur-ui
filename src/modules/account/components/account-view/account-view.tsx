import React from "react";

import TermsAndConditions from "modules/app/containers/terms-and-conditions";
import Notifications from "modules/account/containers/notifications";
import TransactionsBoxContainer from "modules/account/containers/transactions-box";
import AugurStatus from "modules/account/containers/augur-status";
import Favorites from "modules/portfolio/containers/favorites";
import OpenMarkets from "modules/account/containers/open-markets";
import AccountOverview from "modules/account/containers/account-overview";
import ModuleTabs from "modules/market/components/common/module-tabs/module-tabs";
import ModulePane from "modules/market/components/common/module-tabs/module-pane";

import Styles from "modules/account/components/account-view/account-view.styles";

export interface AccountViewProps {
  isMobile?: Boolean;
}

const AccountView = (props: AccountViewProps) => (
  <section className={Styles.AccountView}>
    {props.isMobile && (
      <ModuleTabs selected={0} fillWidth noBorder>
        <ModulePane label="Your Overview">
          <AccountOverview />
        </ModulePane>
        <ModulePane label="Notifications">
          <Notifications />
        </ModulePane>
        <ModulePane label="Watchlist">
          <Favorites />
        </ModulePane>
        <ModulePane label="Open Markets">
          <OpenMarkets />
        </ModulePane>
        <ModulePane label="Augur Status">
          <AugurStatus />
        </ModulePane>
        <ModulePane label="Transactions">
          <TransactionsBoxContainer />
        </ModulePane>
      </ModuleTabs>
    )}
    {!props.isMobile && (
      <>
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
      </>
    )}
  </section>
);

export default AccountView;
