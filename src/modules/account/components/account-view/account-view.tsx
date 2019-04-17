import React from "react";
import Media from "react-media";

import TermsAndConditions from "modules/app/containers/terms-and-conditions";
import Notifications from "modules/account/containers/notifications";
import TransactionsBoxContainer from "modules/account/containers/transactions-box";
import AugurStatus from "modules/account/containers/augur-status";
import Favorites from "modules/portfolio/containers/favorites";
import OpenMarkets from "modules/account/containers/open-markets";
import AccountOverview from "modules/account/containers/account-overview";
import ModuleTabs from "modules/market/components/common/module-tabs/module-tabs";
import ModulePane from "modules/market/components/common/module-tabs/module-pane";
import * as constants from "modules/common-elements/constants";
import { SMALL_MOBILE } from "modules/common-elements/constants";

import Styles from "modules/account/components/account-view/account-view.styles";

export interface AccountViewProps {
  isMobile?: Boolean;
  newNotifications?: Boolean;
}

const AccountView = (props: AccountViewProps) => (
   <Media query={SMALL_MOBILE}>
    {matches =>
      matches ? (
         <ModuleTabs selected={0} fillWidth noBorder>
          <ModulePane label={constants.YOUR_OVERVIEW_TITLE}>
            <AccountOverview />
          </ModulePane>
          <ModulePane label="Notifications" isNew={props.newNotifications}>
            <Notifications />
          </ModulePane>
          <ModulePane label="Watchlist">
            <Favorites />
          </ModulePane>
          <ModulePane label="My Active Markets">
            <OpenMarkets />
          </ModulePane>
          <ModulePane label={constants.AUGUR_STATUS_TITLE}>
            <AugurStatus />
          </ModulePane>
          <ModulePane label="Transactions">
            <TransactionsBoxContainer />
          </ModulePane>
        </ModuleTabs>
      ) : (
        <section className={Styles.AccountView}>
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
      )
    }
  </Media>
);

export default AccountView;
