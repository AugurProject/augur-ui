import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { selectMarket } from "modules/markets/selectors/market";
import { createBigNumber } from "utils/create-big-number";
import { getGasPrice } from "modules/auth/selectors/get-gas-price";
import {
  formatGasCostToEther,
  formatAttoRep,
  formatAttoEth,
  formatEther
} from "utils/format-number";
import { closeModal } from "modules/modal/actions/close-modal";
import { Proceeds } from "modules/modal/proceeds";
import { ActionRowsProps } from "modules/modal/common";
import {
  CLAIM_FEES_GAS_COST,
  redeemStake
} from "modules/reports/actions/claim-reporting-fees";
import {
  addPendingData,
  removePendingData
} from "modules/pending-queue/actions/pending-queue-management";
import {
  ALL,
  CLAIM_FEE_WINDOWS,
  CLAIM_STAKE_FEES
} from "modules/common-elements/constants";

const mapStateToProps = (state: any) => ({
  modal: state.modal,
  gasCost: formatGasCostToEther(
    CLAIM_FEES_GAS_COST,
    { decimalsRounded: 4 },
    getGasPrice(state)
  ),
  pendingQueue: state.pendingQueue || [],
  reportingFees: state.reportingWindowStats.reportingFees,
  feeWindows: state.reportingWindowStats.reportingFees.feeWindows,
  nonforkedMarkets: state.reportingWindowStats.reportingFees.nonforkedMarkets
});

const mapDispatchToProps = (dispatch: Function) => ({
  closeModal: () => dispatch(closeModal()),
  redeemStake: (options, callback) => dispatch(redeemStake(options, callback)),
  addPendingData: (pendingId, queueName) =>
    dispatch(addPendingData(pendingId, queueName)),
  removePendingData: (pendingId, queueName) =>
    dispatch(removePendingData(pendingId, queueName))
});

const mergeProps = (sP: any, dP: any, oP: any) => {
  const marketIdsToTest = sP.nonforkedMarkets;
  const markets: Array<ActionRowsProps> = [];
  marketIdsToTest.forEach(marketObj => {
    const market = selectMarket(marketObj.marketId);
    const ethFees = formatAttoEth(marketObj.unclaimedEthFees, {
      decimals: 4,
      decimalsRounded: 4,
      zeroStyled: true
    });
    const total = createBigNumber(ethFees.fullPrecision).minus(
      createBigNumber(sP.gasCost)
    );

    if (market) {
      const pending =
        sP.pendingQueue[CLAIM_STAKE_FEES] &&
        sP.pendingQueue[CLAIM_STAKE_FEES][marketObj.marketId];

      markets.push({
        title: market.description,
        text: "Claim Proceeds",
        status: pending && pending.status,
        properties: [
          {
            label: "reporting stake",
            value: `${formatAttoRep(marketObj.unclaimedRepTotal, {
              decimals: 4,
              decimalsRounded: 4,
              zeroStyled: true
            }).formatted || 0} REP`
          },
          {
            label: "Reporting Fees",
            value: `${ethFees.formatted || 0} ETH`
          },
          {
            label: "est gas cost",
            value: `${marketObj.gasCost} ETH`
          },
          {
            label: "total",
            value: `${formatEther(total).formatted} ETH`
          }
        ],
        action: () => {
          const marketIndex = sP.reportingFees.nonforkedMarkets.findIndex(
            market => market.marketId === marketObj.marketId
          );
          const RedeemStakeOptions = {
            feeWindows: [],
            nonforkedMarkets: [sP.nonforkedMarkets[marketIndex]],
            pendingId: sP.nonforkedMarkets[marketIndex].marketId
          };
          dP.redeemStake(RedeemStakeOptions);
        }
      });
    }
  });
  if (sP.feeWindows.length > 0) {
    const totalGas = createBigNumber(sP.gasCost).times(
      createBigNumber(sP.feeWindows.length)
    );
    const pending =
      sP.pendingQueue[CLAIM_STAKE_FEES] &&
      sP.pendingQueue[CLAIM_STAKE_FEES][CLAIM_FEE_WINDOWS];

    markets.push({
      title: "Reedeem all participation tokens",
      text: "Claim",
      status: pending && pending.status,
      properties: [
        {
          label: "Reporting Stake",
          value: `${sP.reportingFees.participationTokenRepStaked.formatted} REP`
        },
        {
          label: "Reporting Fees",
          value: `${
            sP.reportingFees.unclaimedParticipationTokenEthFees.formatted
          } ETH`
        },
        {
          label: "Est Gas cost",
          value: `${
            formatEther(sP.reportingFees.gasCosts[CLAIM_FEE_WINDOWS]).formatted
          } ETH`
        },
        {
          label: "Total",
          value: `${formatEther(totalGas).formatted} ETH`
        }
      ],
      action: () => {
        const RedeemStakeOptions = {
          feeWindows: sP.feeWindows,
          nonforkedMarkets: [],
          pendingId: CLAIM_FEE_WINDOWS
        };
        dP.redeemStake(RedeemStakeOptions);
      }
    });
  }

  return {
    title: "Claim Stake & Fees",
    descriptionMessage: [
      {
        preText: "You have",
        boldText: `${sP.reportingFees.unclaimedRep.full} REP`,
        postText: "available to be claimed from your reporting stake "
      },
      {
        preText: " and",
        boldText: `${sP.reportingFees.unclaimedEth.full} ETH`,
        postText: "of reporting fees to collect from the following markets:"
      }
    ],
    rows: markets,
    breakdown: [
      {
        label: "Total REP",
        value: `${sP.reportingFees.unclaimedRep.full} REP`
      },
      {
        label: "Total Fees",
        value: `${sP.reportingFees.unclaimedEth.full} ETH`
      },
      {
        label: "Total Gas Cost (ETH)",
        value: `${sP.reportingFees.gasCosts[ALL]} ETH`
      }
    ],
    closeAction: () => dP.closeModal(),
    buttons: [
      {
        text: "Claim All Stake & Fees",
        action: () => {
          const RedeemStakeOptions = {
            feeWindows: sP.reportingFees.feeWindows,
            nonforkedMarkets: sP.nonforkedMarkets,
            onSent: () => {
              dP.closeModal();
            }
          };
          dP.redeemStake(RedeemStakeOptions);
        }
      },
      {
        text: "Close",
        action: () => {
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
  )(Proceeds)
);
