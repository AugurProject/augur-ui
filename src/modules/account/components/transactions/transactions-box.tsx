import React from "react";

import QuadBox from "modules/portfolio/components/common/quads/quad-box";
import {
  DepositButton,
  WithdrawButton,
  ViewTransactionsButton,
  REPFaucetButton
} from "modules/common-elements/buttons";
import Styles from "modules/account/components/transactions/transactions-box.styles";

interface TransactionsBoxProps {
  isMainnet: boolean;
  eth: number | string;
  rep: number | string;
  gasPrice: string;
  repFaucet: Function;
  deposit: Function;
  transferFunds: Function;
  withdrawReviewModal: Function;
  closeModal: Function;
}

export const TransactionsBox = (props: TransactionsBoxProps) => (
  <QuadBox
    title="Transactions"
    content={
      <div className={Styles.TransactionsBoxContent}>
        <DepositButton action={props.deposit} />
        <WithdrawButton action={console.log} />
        <p>View and download your transactions history here</p>
        <ViewTransactionsButton action={console.log} />
        {!props.isMainnet && (
          <div>
            <REPFaucetButton action={props.repFaucet} />
          </div>
        )}
      </div>
    }
  />
);
