import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ModalReview from "modules/modal/components/modal-review";
import claimTradingProceeds, {
  CLAIM_SHARES_GAS_COST
} from "modules/positions/actions/claim-trading-proceeds";
import { closeModal } from "modules/modal/actions/close-modal";
import selectWinningPositions from "modules/positions/selectors/winning-positions";
import { getGasPrice } from "modules/auth/selectors/get-gas-price";
import { formatGasCostToEther } from "utils/format-number";
import { MODAL_REVIEW } from "modules/modal/constants/modal-types";

const mapStateToProps = state => {
  const winningPositions = selectWinningPositions();

  const gasCost = formatGasCostToEther(
    CLAIM_SHARES_GAS_COST,
    { decimalsRounded: 4 },
    getGasPrice(state)
  );

  return {
    modal: state.modal,
    winningPositions,
    gasCost
  };
};

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  claimTradingProceeds: (marketId, callback) =>
    dispatch(claimTradingProceeds(marketId, callback))
});

const mergeProps = (sP, dP, oP) => {
  const { winningPositions } = sP;
  const { marketId } = sP.modal;
  const { closeModal, claimTradingProceeds } = dP;
  const winningPosition = winningPositions[marketId];
  return {
    buttons: [
      {
        label: "cancel",
        action: closeModal,
        type: "gray"
      },
      {
        label: "confirm",
        action: () => {
          closeModal();
          claimTradingProceeds(winningPosition.id);
        }
      }
    ],
    items: [
      {
        label: "Market",
        value: winningPosition.description,
        denomination: ""
      },
      {
        label: "Returns",
        value: winningPosition.winnings.toString(),
        denomination: "ETH"
      },
      {
        label: "Gas Cost",
        value: sP.gasCost,
        denomination: "ETH"
      }
    ],
    title: "Claim Outstanding Returns",
    type: MODAL_REVIEW
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(ModalReview)
);
