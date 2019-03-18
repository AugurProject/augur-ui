import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Form } from "modules/modal/form";

import { closeModal } from "modules/modal/actions/close-modal";
import { formatEther, formatRep } from "utils/format-number";

const mapStateToProps = (state: any) => ({
  modal: state.modal,
  loginAccount: state.loginAccount
});

const mapDispatchToProps = (dispatch: Function) => ({
  closeModal: () => dispatch(closeModal())
});

const mergeProps = (sP: any, dP: any, oP: any) => ({
  title: "Send Funds",
  description: [
    "Send funds from your connected wallet"
  ],
  loginAccount: sP.loginAccount,
  breakdownTitle: "Available Funds",
  breakdown: [
    {
      label: "Ethereum (ETH)",
      value: formatEther(sP.loginAccount.eth),
      useValueLabel: true
    },
    {
      label: "Reputation (REP)",
      value: formatRep(sP.loginAccount.rep),
      useValueLabel: true
    }
  ],
  closeAction: () => dP.closeModal(),
  buttons: [
    {
      text: "Review",
      action: () => dP.closeModal()
    },
    {
      text: "Cancel",
      action: () => dP.closeModal()
    }
  ]
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(Form)
);
