import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ModalClaimTradingProceeds from "modules/modal/components/modal-claim-trading-proceeds";
import claimTradingProceeds, {
  CLAIM_SHARES_GAS_COST
} from "modules/positions/actions/claim-trading-proceeds";
import { closeModal } from "modules/modal/actions/close-modal";
import selectWinningPositions from "modules/positions/selectors/winning-positions";
import { getGasPrice } from "modules/auth/selectors/get-gas-price";
import { formatGasCostToEther } from "utils/format-number";

const mapStateToProps = state => {
  const gasCost = formatGasCostToEther(
    CLAIM_SHARES_GAS_COST,
    { decimalsRounded: 4 },
    getGasPrice(state)
  );

  return {
    modal: state.modal,
    winningPosition: selectWinningPositions(),
    gasCost
  };
};

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  claimTradingProceeds: (marketId, callback) =>
    dispatch(claimTradingProceeds(marketId, callback))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ModalClaimTradingProceeds)
);
