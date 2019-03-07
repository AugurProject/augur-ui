import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { selectMarket } from "modules/markets/selectors/market";
import claimTradingProceeds, {
  CLAIM_SHARES_GAS_COST
} from "modules/positions/actions/claim-trading-proceeds";
import { createBigNumber } from "utils/create-big-number";
import { getGasPrice } from "modules/auth/selectors/get-gas-price";
import { formatGasCostToEther, formatEther } from "utils/format-number";
import { closeModal } from "modules/modal/actions/close-modal";
import { ProceedsModal } from "modules/modal/proceeds-modal";
import { string } from "prop-types";

const mapStateToProps = (state: any) => ({
  modal: state.modal,
  gasCost: formatGasCostToEther(
    CLAIM_SHARES_GAS_COST,
    { decimalsRounded: 4 },
    getGasPrice(state)
  )
});

const mapDispatchToProps = (dispatch: Function) => ({
  closeModal: () => dispatch(closeModal()),
  claimTradingProceeds: (marketId: string, callback: Function) =>
    dispatch(claimTradingProceeds(marketId, callback))
});

const mergeProps = (sP: any, dP: any, oP: any) => {
  // TODO: make this real
  const marketIds = ["0x0", "0x1", "0x2"];
  const markets = [
    {
      title: "Test Market 1",
      value: formatEther(2).full,
      text: "Claim Proceeds",
      label: "Proceeds",
      action: () => dP.claimTradingProceeds(marketIds[0], () => {})
    },
    {
      title: "Test Market 2",
      value: formatEther(1.5).full,
      text: "Claim Proceeds",
      label: "Proceeds",
      action: () => dP.claimTradingProceeds(marketIds[1], () => {})
    },
    {
      title: "Test Market 3",
      value: formatEther(1.5).full,
      text: "Claim Proceeds",
      label: "Proceeds",
      action: () => dP.claimTradingProceeds(marketIds[2], () => {})
    }
  ];
  const totalGas = formatEther(createBigNumber(sP.gasCost).times(markets.length));
  const multiMarket = markets.length > 1;
  const totalProceeds = formatEther(5);
  return {
    title: "Claim Proceeds",
    alertMessage: {
      preText: "You currently have a total of", 
      boldText: totalProceeds.full,
      postText: `to be claimed in the following market${multiMarket && "s"}:`
    },
    rows: markets,
    breakdown: [
      {
        label: "Estimated Gas",
        value: totalGas.full
      },
      {
        label: "Total Proceeds",
        value: totalProceeds.full
      }
    ],
    closeAction: () => dP.closeModal(),
    buttons: [
      {
        text: `${multiMarket ? "Claim All Proceeds" : "Claim Proceeds"}`,
        action: () => {
          if (multiMarket) {
            dP.claimTradingProceeds(marketIds[0], (err: string) => {
              if (err) return err;
              // TODO: do more stuff to queue through
            })
          } else {
            dP.claimTradingProceeds(marketIds[0], () => {});
          }
          dP.closeModal();
        }
      }
    ]
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(ProceedsModal)
);