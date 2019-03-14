import { connect } from "react-redux";
import { updateModal } from "modules/modal/actions/update-modal";
import { closeModal } from "modules/modal/actions/close-modal";
import { transferFunds } from "modules/auth/actions/transfer-funds";
import { selectLoginAccount } from "modules/auth/selectors/login-account";
import { getGasPrice } from "modules/auth/selectors/get-gas-price";
import { TransactionsBox } from "modules/account/components/transactions/transactions-box";
import {
  NETWORK_IDS,
  MODAL_REVIEW,
  MODAL_REP_FAUCET,
  MODAL_DEPOSIT
} from "modules/common-elements/constants";
// made state an ANY for now.
const mapStateToProps = (state: any) => {
  const loginAccount = selectLoginAccount(state);

  return {
    isMainnet: state.connection.augurNodeNetworkId === NETWORK_IDS.Mainnet,
    eth: loginAccount.eth,
    rep: loginAccount.rep,
    gasPrice: getGasPrice(state)
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  repFaucet: () => dispatch(updateModal({ type: MODAL_REP_FAUCET })),
  deposit: () => dispatch(updateModal({ type: MODAL_DEPOSIT })),
  transferFunds: (amount: string, asset: string, to: string) => {
    dispatch(closeModal());
    dispatch(transferFunds(amount, asset, to));
  },
  withdrawReviewModal: (modal: Object) =>
    dispatch(
      updateModal({
        type: MODAL_REVIEW,
        ...modal
      })
    ),
  closeModal: () => dispatch(closeModal())
});

const TransactionsBoxContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsBox);

export default TransactionsBoxContainer;
