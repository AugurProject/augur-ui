import React from "react";

import Styles from "modules/account/components/account-header/account-header.styles";

const AccountHeader = () => (
  <section className={Styles.AccountHeader}>
    <div className={Styles.AccountHeader__header}>
      <h1 className={Styles.AccountHeader__title}>Account Summary</h1>
    </div>
  </section>
);

export default AccountHeader;
