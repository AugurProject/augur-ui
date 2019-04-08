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
import { Pagination } from "modules/common-elements/pagination";
import { ValueLabel, TextLabel } from "modules/common-elements/labels";
import { SquareDropdown, DatePicker } from "modules/common-elements/selection";
import { Title } from "modules/modal/common";
import { formatEther, formatShares } from "utils/format-number";
import Styles from "modules/modal/modal.styles";

interface TransactionsProps {
  closeAction: Function;
  title: string;
  currentTimestamp: any;
  getTransactionsHistory: Function;
}

interface TransactionInfo {
  transactionHash: string;
  timestamp: number;
  marketDescription: string;
  outcome: number | null;
  outcomeDescription: string | null;
  action: string;
  price: string;
  quantity: string;
  coin: string;
  fee: string;
  total: string;
  details: string;
}

interface TransactionsState {
  coin: string;
  action: string;
  itemsPerPage: number;
  page: number;
  startDate: Date | any;
  endDate: Date | any;
  startFocused: boolean;
  endFocused: boolean;
  AllTransactions: Array<TransactionInfo>;
  filteredTransactions: Array<TransactionInfo>;
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
    value: "CANCEL"
  },
  {
    label: "Claim Trade Proceeds",
    value: "CLAIM_TRADING_PROCEEDS"
  },
  {
    label: "Claim Winning Proceeds",
    value: "CLAIM_WINNING_CROWDSOURCERS"
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

const paginationOptions = [
  {
    label: "10 per page",
    value: 10
  },
  {
    label: "20 per page",
    value: 20
  },
  {
    label: "30 per page",
    value: 30
  },
  {
    label: "40 per page",
    value: 40
  },
  {
    label: "50 per page",
    value: 50
  }
];

const DEFAULT_STATE = {
  coin: "ALL",
  action: "ALL",
  itemsPerPage: 20,
  page: 1
};

export class Transactions extends React.Component<
  TransactionsProps,
  TransactionsState
> {
  state: TransactionsState = {
    ...DEFAULT_STATE,
    startDate: moment(this.props.currentTimestamp * 1000).subtract(6, "M"),
    endDate: moment(this.props.currentTimestamp * 1000),
    startFocused: false,
    endFocused: false,
    AllTransactions: [],
    filteredTransactions: []
  };

  componentWillMount = () => {
    this.triggerSearch();
  };

  tableHeaderRef: any = null;
  tableBodyRef: any = null;

  triggerSearch = () => {
    const { getTransactionsHistory } = this.props;
    const { startDate, endDate, coin, action } = this.state;
    getTransactionsHistory(
      startDate.unix().valueOf(),
      endDate.unix().valueOf(),
      coin,
      action,
      (err: any, AllTransactions: Array<TransactionInfo>) => {
        if (!err) {
          const filteredTransactions = this.filterTransactions(
            AllTransactions,
            coin,
            action
          );
          if (this.tableHeaderRef)
            this.setState({ AllTransactions, filteredTransactions });
        }
      }
    );
  };

  resetSearch = () => {
    this.setState({
      ...DEFAULT_STATE,
      startDate: moment(this.props.currentTimestamp * 1000).subtract(6, "M"),
      endDate: moment(this.props.currentTimestamp * 1000),
      filteredTransactions: this.state.AllTransactions
    });
  };

  filterTransactions = (
    transactions: Array<TransactionInfo>,
    coin: string,
    action: string
  ) => {
    const filteredTransactions = transactions.filter(
      (Transaction: TransactionInfo) => {
        let addTransaction = true;
        if (coin !== "ALL") {
          addTransaction = Transaction.coin === coin;
        }
        if (action !== "ALL") {
          addTransaction = Transaction.action === action;
        }
        return addTransaction;
      }
    );
    return filteredTransactions;
  };

  triggerTransactionsExport = () => {
    const { AllTransactions } = this.state;
    const transactionsDataString =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(AllTransactions));
    const a = document.createElement("a");

    a.setAttribute("href", transactionsDataString);
    a.setAttribute("download", "AugurTransactions.json");
    a.click();
  };

  addTransactionRow = (tx: TransactionInfo) => {
    const timestamp = moment(tx.timestamp * 1000).format("D MMM YYYY HH:mm:ss");
    const key = `${tx.transactionHash}-${tx.timestamp}-${tx.outcome}-${
      tx.quantity
    }-${tx.price}-${tx.total}-${tx.action}`;
    // we never show the coin type outside of tx.coin so we can just format by shares always here.
    const quantity = formatShares(tx.quantity);
    return (
      <React.Fragment key={key}>
        <span>{timestamp}</span>
        <span>
          <TextLabel text={tx.marketDescription} />
        </span>
        <span>
          <TextLabel text={tx.outcomeDescription || ""} />
        </span>
        <span>
          <TextLabel text={tx.action.replace(/_/g, " ").toLowerCase()} />
        </span>
        <ValueLabel value={formatEther(tx.price)} />
        <ValueLabel value={quantity} />
        <span>{tx.coin}</span>
        <ValueLabel value={formatEther(tx.fee)} />
        <ValueLabel value={formatEther(tx.total)} />
        <ViewTransactionDetailsButton transactionHash={tx.transactionHash} />
      </React.Fragment>
    );
  };

  render() {
    const { title, closeAction, currentTimestamp } = this.props;
    const {
      coin,
      action,
      startDate,
      startFocused,
      endDate,
      endFocused,
      itemsPerPage,
      page,
      filteredTransactions
    } = this.state;
    const pageInfo = {
      page,
      itemsPerPage,
      itemCount: filteredTransactions.length,
      action: (page: number) => this.setState({ page })
    };
    const pageTransactions = filteredTransactions.slice(
      page * itemsPerPage - itemsPerPage,
      page * itemsPerPage
    );
    const headerAdjustment =
      this.tableHeaderRef &&
      this.tableBodyRef &&
      this.tableBodyRef.clientHeight < this.tableBodyRef.scrollHeight
        ? { paddingRight: "17px" }
        : {};
    const startDatePicker = {
      id: "startDatePicker",
      date: startDate,
      placeholder: "Start Date",
      onDateChange: (startDate: number) =>
        this.setState({ startDate }, () => this.triggerSearch()),
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
      numberOfMonths: 1
    };

    const endDatePicker = {
      id: "endDatePicker",
      date: endDate,
      placeholder: "End Date",
      onDateChange: (endDate: number) =>
        this.setState({ endDate }, () => this.triggerSearch()),
      onFocusChange: ({ focused }) => {
        if (this.state.endDate == null) {
          const endDate = moment(currentTimestamp * 1000);
          this.setState({
            endDate
          });
        }
        this.setState({ endFocused: focused });
      },
      isOutsideRange: (day: any) =>
        day.isAfter(moment(currentTimestamp * 1000).add(1, "hour")) ||
        day.isBefore(startDate),
      focused: endFocused,
      displayFormat: "D MMM YYYY",
      numberOfMonths: 1
    };

    return (
      <div className={Styles.Transactions}>
        <Title title={title} closeAction={closeAction} />
        <section>
          <span>Date From</span>
          <span>Date To</span>
          <span>Action</span>
          <span>Coin</span>
          <span />
          <span />
          <DatePicker {...startDatePicker} />
          <DatePicker {...endDatePicker} />
          <SquareDropdown
            options={actionOptions}
            defaultValue={action}
            onChange={(action: string) =>
              this.setState(state => {
                const filteredTransactions = this.filterTransactions(
                  state.AllTransactions,
                  state.coin,
                  action
                );
                return { filteredTransactions, action };
              })
            }
          />
          <SquareDropdown
            options={coinOptions}
            defaultValue={coin}
            onChange={(coin: string) =>
              this.setState(state => {
                const filteredTransactions = this.filterTransactions(
                  state.AllTransactions,
                  coin,
                  state.action
                );
                return { filteredTransactions, coin };
              })
            }
          />
          <div>
            <SecondaryButton action={this.resetSearch} text="Reset" />
            <PrimaryButton action={this.triggerSearch} text="Search" />
          </div>
          <ExportButton action={this.triggerTransactionsExport} />
        </section>
        <div
          ref={tableHeader => {
            this.tableHeaderRef = tableHeader;
          }}
          style={headerAdjustment}
        >
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
        <section
          ref={tableBody => {
            this.tableBodyRef = tableBody;
          }}
        >
          {pageTransactions.length === 0 && (
            <span className={Styles.NullTransactionsRow}>No Transactions</span>
          )}
          {pageTransactions.map((transaction: TransactionInfo) =>
            this.addTransactionRow(transaction)
          )}
        </section>
        <div>
          <Pagination {...pageInfo} />
          <span>Show</span>
          <SquareDropdown
            options={paginationOptions}
            defaultValue={itemsPerPage}
            onChange={(itemsPerPage: number) => this.setState({ itemsPerPage })}
            openTop
          />
        </div>
      </div>
    );
  }
}
