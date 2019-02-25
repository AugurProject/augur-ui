import React from "react";

import AccountHeader from "modules/account/containers/account-header";
import TermsAndConditions from "modules/app/containers/terms-and-conditions";
import QuadBox from "modules/portfolio/components/common/quads/quad-box";
import NotificationBox from "modules/account/components/notifications/notification-box";

import Styles from "modules/account/components/account-view/account-view.styles";


const AccountView = () => {
  let notifications = []; // TODO;

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
};

export default AccountView;
