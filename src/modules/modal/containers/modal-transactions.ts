import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Transactions } from "modules/modal/transactions";

import { closeModal } from "modules/modal/actions/close-modal";


const exampleTransactions = [
  {
    txHash: "0xdeadbeef",
    timestamp: Date.now(),
    market: "Test Market with a really long title that hopefully can't fit completely in the space alloted in the table so that we can test the tooltip highlighting aspect of the table row.",
    outcome: "a really long outcome that also hopefully can't fit so we need to test the tooltip stuff.",
    action: "buy",
    price: "0.5",
    quantity: "12.5",
    coin: "ETH",
    fee: "0",
    total: "6.25"
  },
  {
    txHash: "0xdeadbeef2",
    timestamp: Date.now(),
    market: "A shorter market title",
    outcome: "Outcome A",
    action: "sell",
    price: "0.5",
    quantity: "125123.235005",
    coin: "ETH",
    fee: "0.000000123",
    total: "666.25"
  }
];

const mapStateToProps = (state: any) => ({
  modal: state.modal,
  now: state.blockchain.currentAugurTimestamp
});

const mapDispatchToProps = (dispatch: Function) => ({
  closeModal: () => dispatch(closeModal())
});

const mergeProps = (sP: any, dP: any, oP: any) => ({
  title: "Transactions History",
  closeAction: () => dP.closeModal(),
  currentTimestamp: sP.now,
  transactions: exampleTransactions
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(Transactions)
);
