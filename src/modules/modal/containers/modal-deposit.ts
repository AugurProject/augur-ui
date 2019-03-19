import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Message } from "modules/modal/message";

import { closeModal } from "modules/modal/actions/close-modal";
import getRep from "modules/account/actions/get-rep";

const mapStateToProps = (state: any) => ({
  modal: state.modal,
  address: state.loginAccount.displayAddress
});

const mapDispatchToProps = (dispatch: Function) => ({
  closeModal: () => dispatch(closeModal()),
  getRep: () => dispatch(getRep())
});

const mergeProps = (sP: any, dP: any, oP: any) => ({
  title: "Receive Funds",
  description: [
    "Send Ethereum (ETH) or Reputation (REP) to the wallet you have connected to trade on Augur."
  ],
  closeAction: () => dP.closeModal(),
  readableAddress: {
    address: sP.address,
    showQR: true,
    copyable: true,
    title: "Your connected wallet address"
  },
  buttons: []
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(Message)
);
