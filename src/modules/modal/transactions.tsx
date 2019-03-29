import React from "react";
import moment from "moment";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import {
  PrimaryButton,
  SecondaryButton,
  ExportButton,
  ViewTransactionDetailsButton
} from "modules/common-elements/buttons";
import { ValueLabel } from "modules/common-elements/labels";
import { 
  SquareDropdown,
  DatePicker
} from "modules/common-elements/selection";
import {
  Title
} from "modules/modal/common";
import { ETH } from "modules/common-elements/constants";
import { formatEther, formatShares, formatREP } from "utils/format-number";
import Styles from "modules/modal/modal.styles";

interface TransactionsProps {
  closeAction: Function;
  title: string;
  currentTimestamp: any;
  transactions: Array<any>;
}

interface TransactionsState {
  coin: string;
  action: string;
  startDate: Date | any;
  endDate: Date | any;
  startFocused: boolean;
  endFocused: boolean;
  hours: Array<number>;
  minutes: Array<any>;
  ampm: Array<string>;
}

const coinOptions = [
  {
    label: "All",
    value: "ALL"
  },
  {
    label: "ETH",
    value: "ETH"
  },
  {
    label: "REP",
    value: "REP"
  }
];

const actionOptions = [
  {
    label: "All",
    value: "ALL"
  },
  {
    label: "Buy",
    value: "BUY"
  },
  {
    label: "Sell",
    value: "SELL"
  },
  {
    label: "Cancelled",
    value: "CANCELLED"
  },
  {
    label: "Claim",
    value: "CLAIM"
  },
  {
    label: "Dispute",
    value: "DISPUTE"
  },
  {
    label: "Initial Report",
    value: "INITIAL_REPORT"
  },
  {
    label: "Finalize Market",
    value: "FINALIZE_MARKET"
  },
  {
    label: "Market Creation",
    value: "MARKET_CREATION"
  },
  {
    label: "Complete Sets",
    value: "COMPLETE_SETS"
  }
];

export class Transactions extends React.Component<TransactionsProps, TransactionsState> {
  state: TransactionsState = {
    coin: "ALL",
    action: "ALL",
    startDate: moment(this.props.currentTimestamp * 1000).subtract(6, "M"),
    endDate: moment(this.props.currentTimestamp * 1000),
    startFocused: false,
    endFocused: false,
    hours: Array.from(new Array(12), (val, index) => index + 1),
    minutes: [
      ...Array.from(Array(10).keys(), (val, index) => "0" + index),
      ...Array.from(Array(50).keys(), (val, index) => index + 10)
    ],
    ampm: ["AM", "PM"]
  };

  addTransactionRow = (tx: any) => {
    const timestamp = moment(tx.timestamp).format("D MMM YYYY HH:mm:ss");
    const quantity = tx.coin === ETH ? formatShares(tx.quantity) : formatREP(tx.quantity);
    return (
      <React.Fragment key={`${tx.txHash}`}>
        <span>{timestamp}</span>
        <span>{tx.market}</span>
        <span>{tx.outcome}</span>
        <span>{tx.action}</span>
        <ValueLabel
          keyId={`${tx.txHash}_${tx.price}`}
          value={formatEther(tx.price)}
        />
        <ValueLabel
          keyId={`${tx.txHash}_${tx.quantity}`}
          value={quantity}
        />
        <span key={`${tx.txHash}_${tx.coin}`}>{tx.coin}</span>
        <ValueLabel
          keyId={`${tx.txHash}_${tx.fee}`}
          value={formatEther(tx.fee)}
        />
        <ValueLabel
          keyId={`${tx.txHash}_${tx.total}`}
          value={formatEther(tx.total)}
        />
        <ViewTransactionDetailsButton transactionHash={tx.txHash} />
      </ React.Fragment>
    );
  };

  render() {
    const { title, closeAction, currentTimestamp, transactions } = this.props;
    const { coin, action, startDate, startFocused, endDate, endFocused } = this.state;
    const startDatePicker = {
      id: "startDatePicker",
      date: startDate,
      placeholder: "Start Date",
      onDateChange: (startDate) => this.setState({ startDate }),
      onFocusChange: ({ focused }) => {
        if (this.state.startDate == null) {
          const startDate = moment(currentTimestamp * 1000);
          this.setState({
            startDate
          });
        }
        this.setState({ startFocused: focused });
      },
      focused: startFocused,
      displayFormat: "D MMM YYYY",
      numberOfMonths: 1,
    };

    const endDatePicker = {
      id: "endDatePicker",
      date: endDate,
      placeholder: "End Date",
      onDateChange: (endDate) => this.setState({ endDate }),
      onFocusChange: ({ focused }) => {
        if (this.state.endDate == null) {
          const endDate = moment(currentTimestamp * 1000);
          this.setState({
            endDate
          });
        }
        this.setState({ endFocused: focused });
      },
      isOutsideRange: (day: any) => day.isAfter(moment(currentTimestamp * 1000).add(1, "hour")) || day.isBefore(startDate),
      focused: endFocused,
      displayFormat: "D MMM YYYY",
      numberOfMonths: 1,
    };

    return (
      <div className={Styles.Transactions}>
        <Title title={title} closeAction={closeAction} />
        <section>
          <label>Date From</label>
          <label>Date To</label>
          <label>Action</label>
          <label>Coin</label>
          <label></label>
          <label></label>
          <DatePicker {...startDatePicker} />
          <DatePicker {...endDatePicker} />
          <SquareDropdown options={actionOptions} defaultValue={action} onChange={(action: string) => this.setState({ action })} />
          <SquareDropdown options={coinOptions} defaultValue={coin} onChange={(coin: string) => this.setState({ coin })} />
          <div>
            <SecondaryButton action={() => console.log("second")} text="Reset"/>
            <PrimaryButton action={() => console.log("seach")} text="Search"/>
          </div>
          <ExportButton action={() => console.log("export all")} />
        </section>
        <div>
          <span>Date</span>
          <span>Market</span>
          <span>Outcome</span>
          <span>Action</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Coin</span>
          <span>Fee</span>
          <span>Total</span>
          <span>Etherscan</span>
        </div>
        <section>
          {transactions.map((transaction: any) => this.addTransactionRow(transaction))}
        </section>
      </div>
    );
  }
};
