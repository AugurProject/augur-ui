import React from "react";
import PropTypes from "prop-types";

import { PrimaryButton } from "modules/common-elements/buttons";

import Styles from "modules/account/components/account-rep-faucet/account-rep-faucet.styles";

const AccountRepFaucet = ({ repFaucet }) => (
  <section className={Styles.AccountRepFaucet}>
    <div className={Styles.AccountRepFaucet__heading}>
      <h1>
        Account: <span>REP Faucet</span>
      </h1>
    </div>
    <div className={Styles.AccountRepFaucet__main}>
      <div className={Styles.AccountRepFaucet__description}>
        <div>
          <p>
            On Test Nets you may get REP by making a TX with the button below.
          </p>
          <PrimaryButton text="Get Rep" action={repFaucet} />
        </div>
      </div>
    </div>
  </section>
);

AccountRepFaucet.propTypes = {
  repFaucet: PropTypes.func.isRequired
};

export default AccountRepFaucet;
