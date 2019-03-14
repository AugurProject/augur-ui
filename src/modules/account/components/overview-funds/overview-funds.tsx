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

  const tradingBalanceFrozenFunds = [
    {
      title: AVAILABLE_TRADING_BALANCE,
      value: "000.0000" // TODO Available trading balance
    },
    {
      title: TOTAL_FROZEN_FUNDS,
      value: totalFrozenFunds
    }
  ];

  const repBalanceStaked = [
    {
      title: REP_BALANCE,
      value: repBalance
    },
    {
      title: REP_STAKED,
      value: repStaked
    }
  ];

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

      <FundDataRow
        className={Styles.BalanceFrozenFunds}
        columns={tradingBalanceFrozenFunds}
        showRepLogo={false}
        showEthLogo
      />
      <FundDataRow
        className={Styles.RepBalanceStaked}
        columns={repBalanceStaked}
        showRepLogo
        showEthLogo={false}
      />
    </div>
  );
};

export interface FundDataRowProps {
  className: string;
  columns: Array<any>;
  showRepLogo: boolean;
  showEthLogo: boolean;
}

const FundDataRow = (props: FundDataRowProps) => {
  const { columns, showRepLogo, showEthLogo } = props;

  const rows = columns.map((value: any) => (
    <div>
      <div>{value.title}</div>
      <div>
        {value.value}
        {showEthLogo ? EthIcon : null}
      </div>
    </div>
  ));

  return (
    <div className={props.className}>
      {rows[0]}
      {showRepLogo ? <div>{RepLogoIcon}</div> : null}
      {rows[1]}
    </div>
  );
};

export default OverviewFunds;
