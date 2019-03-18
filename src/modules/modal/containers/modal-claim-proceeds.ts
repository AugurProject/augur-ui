import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { selectMarket } from "modules/markets/selectors/market";
import claimTradingProceeds, {
  CLAIM_SHARES_GAS_COST,
  claimMultipleTradingProceeds
} from "modules/positions/actions/claim-trading-proceeds";
import { selectCurrentTimestampInSeconds } from "src/select-state";
import { createBigNumber } from "utils/create-big-number";
import canClaimProceeds from "utils/can-claim-proceeds";
import { getGasPrice } from "modules/auth/selectors/get-gas-price";
import { formatGasCostToEther, formatEther } from "utils/format-number";
import { closeModal } from "modules/modal/actions/close-modal";
import { Proceeds } from "modules/modal/proceeds";
import { constants } from "services/augurjs";
import { ActionRowsProps } from "modules/modal/common";

const mapStateToProps = (state: any) => ({
  modal: state.modal,
  gasCost: formatGasCostToEther(
    CLAIM_SHARES_GAS_COST,
    { decimalsRounded: 4 },
    getGasPrice(state)
  ),
  accountShareBalances: state.accountShareBalances,
  currentTimestamp: selectCurrentTimestampInSeconds(state)
});

const mapDispatchToProps = (dispatch: Function) => ({
  closeModal: () => dispatch(closeModal()),
  claimTradingProceeds: (marketId: string, callback: Function) =>
    dispatch(claimTradingProceeds(marketId, callback)),
  claimMultipleTradingProceeds: (
    marketIds: Array<string>,
    callback: Function
  ) => dispatch(claimMultipleTradingProceeds(marketIds, callback))
});

const mergeProps = (sP: any, dP: any, oP: any) => {
  const marketIdsToTest = Object.keys(sP.accountShareBalances);
  const markets: Array<ActionRowsProps> = [];
  const marketIds: Array<string> = [];
  let totalProceeds: any = createBigNumber(0); // BigNumber @type required
  marketIdsToTest.forEach(marketId => {
    const market = selectMarket(marketId);
    if (
      market &&
      market.reportingState === constants.REPORTING_STATE.FINALIZED
    ) {
      const winningOutcomeShares = formatEther(
        sP.accountShareBalances[marketId][market.consensus.winningOutcome]
      );

      if (
        canClaimProceeds(
          market.finalizationTime,
          market.outstandingReturns,
          sP.currentTimestamp
        ) &&
        winningOutcomeShares.value > 0
      ) {
        markets.push({
          title: market.description,
          label: "Proceeds",
          text: "Claim Proceeds",
          value: winningOutcomeShares.full,
          action: () => dP.claimTradingProceeds(marketId, () => {})
        });
        marketIds.push(marketId);
        totalProceeds = totalProceeds.plus(winningOutcomeShares.formatted);
      }
    }
  });
  const totalGas = formatEther(
    createBigNumber(sP.gasCost).times(markets.length)
  );
  const multiMarket = markets.length > 1;
  totalProceeds = formatEther(totalProceeds);
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
            dP.claimMultipleTradingProceeds(marketIds, dP.closeModal());
          } else {
            dP.claimTradingProceeds(marketIds[0], dP.closeModal());
          }
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
  )(Proceeds)
);
