import React from "react";

import { MovementLabel } from "modules/common-elements/labels";
import { EthIcon, RepLogoIcon } from "modules/common-elements/icons";
import {
  AVAILABLE_TRADING_BALANCE,
  TOTAL_FROZEN_FUNDS,
  REP_BALANCE,
  REP_STAKED,
  TOTAL_ACCOUNT_VALUE_IN_ETH
} from "modules/common-elements/constants";

import Styles from "modules/account/components/overview-funds/overview-funds.styles";

export interface OverviewFundsProps {
  repStaked: number;
  repBalance: string;
  totalFrozenFunds: string;
}

const OverviewFunds = (props: OverviewFundsProps) => {
  const { totalFrozenFunds, repBalance, repStaked } = props;

  return (
    <div className={Styles.OverviewFundsContent}>
      <div>{TOTAL_ACCOUNT_VALUE_IN_ETH}</div>
      <MovementLabel
        showColors
        size="large"
        showPlusMinus
        showPercent
        showIcon
        value={0} // TODO Account P/L (time range)
      />
      <div>
        000.0000 {/* TODO Total Account Value (ETH) */}
        {EthIcon}
      </div>

      <BalanceFrozenFunds totalFrozenFunds={totalFrozenFunds} />

      <RepBalanceStaked repStaked={repStaked} repBalance={repBalance} />
    </div>
  );
};

export interface BalanceFrozenFundsProps {
  totalFrozenFunds: string;
}

const BalanceFrozenFunds = (props: BalanceFrozenFundsProps) => (
  <div className={Styles.BalanceFrozenFunds}>
    <div>
      <div>{AVAILABLE_TRADING_BALANCE}</div>
      <div>
        000.0000 {/* TODO Available trading balance */}
        {EthIcon}
      </div>
    </div>

    <div>
      <div>{TOTAL_FROZEN_FUNDS}</div>
      <div>
        {props.totalFrozenFunds}
        {EthIcon}
      </div>
    </div>
  </div>
);

export interface RepBalanceStakedProps {
  repStaked: number;
  repBalance: string;
}

const RepBalanceStaked = (props: RepBalanceStakedProps) => (
  <div className={Styles.RepBalanceStaked}>
    <div>
      <div>{REP_BALANCE}</div>
      <div>{props.repBalance}</div>
    </div>

    <div>{RepLogoIcon}</div>

    <div>
      <div>{REP_STAKED}</div>
      <div>{props.repStaked}</div>
    </div>
  </div>
);

export default OverviewFunds;
