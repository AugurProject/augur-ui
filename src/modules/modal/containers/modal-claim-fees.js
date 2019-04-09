import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { selectMarket } from "modules/markets/selectors/market";
import { CLAIM_SHARES_GAS_COST } from "modules/positions/actions/claim-trading-proceeds";
import { createBigNumber } from "utils/create-big-number";
import { getGasPrice } from "modules/auth/selectors/get-gas-price";
import { formatGasCostToEther, formatAttoRep, formatAttoEth, formatEther } from "utils/format-number";
import { closeModal } from "modules/modal/actions/close-modal";
import { Proceeds } from "modules/modal/proceeds";
import { ActionRowsProps } from "modules/modal/common";
import {
  claimReportingFeesNonforkedMarkets,
  redeemStake,
  CLAIM_FEES_GAS_COST
} from "modules/reports/actions/claim-reporting-fees";
import { updateReportingWindowStats } from "modules/reports/actions/update-reporting-window-stats";

const mapStateToProps = (state: any) => ({
  modal: state.modal,
  gasCost: formatGasCostToEther(
    CLAIM_FEES_GAS_COST,
    { decimalsRounded: 4 },
    getGasPrice(state)
  ),
  reportingFees: state.reportingWindowStats.reportingFees,
  feeWindows: state.reportingWindowStats.reportingFees.feeWindows,
  nonforkedMarkets: state.reportingWindowStats.reportingFees.nonforkedMarkets
});

const mapDispatchToProps = (dispatch: Function) => ({
  closeModal: () => dispatch(closeModal()),
  claimReportingFeesNonforkedMarkets: (options, callback) =>
    dispatch(claimReportingFeesNonforkedMarkets(options, callback)),
  redeemStake: (options, callback) => dispatch(redeemStake(options, callback)),
  updateReportingWindowStats: (windowStats) => dispatch(updateReportingWindowStats(windowStats))
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
    const total = createBigNumber(ethFees.fullPrecision).minus(createBigNumber(sP.gasCost))

    if (market) {
      markets.push({
        title: market.description,
        text: (marketObj.status === "PENDING" ? 'P ' : "") + "Claim Proceeds",
        properties: [
          {
            label: "reporting stake",
            value: `${
              formatAttoRep(marketObj.unclaimedRepTotal, {
                decimals: 4,
                decimalsRounded: 4,
                zeroStyled: true
              }).formatted || 0
            } REP`
          },
          {
            label: "Reporting Fees",
            value: `${
              ethFees.formatted || 0
            } ETH`
          },
          {
            label: "est gas cost",
            value: `${sP.gasCost} ETH`
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

       

          const ClaimReportingFeesNonforkedMarketsOptions = {
            feeWindows: [], // fee windows is empty here because we are just claiming by markets
            marketIndex: marketIndex,
            forkedMarket: sP.reportingFees.forkedMarket,
            nonforkedMarkets: [sP.nonforkedMarkets[marketIndex]],
            estimateGas: false,
            onSent: () => {
             
            },
            onSuccess: result => {
              if (sP.modal.cb) {
                sP.modal.cb();
              }
            }
          };
          dP.claimReportingFeesNonforkedMarkets(
            ClaimReportingFeesNonforkedMarketsOptions
          );
        }
      });
    }
  });
  if (sP.feeWindows.length > 0) {
    const totalGas = createBigNumber(sP.gasCost).times(createBigNumber(sP.feeWindows.length))

    markets.push({
      title: "Reedeem all participation tokens",
      text: "Claim",
      properties: [
        {
          label: "Total REP",
          value: `${sP.reportingFees.participationTokenRepStaked.formatted} REP`
        },
        {
          label: "Total ETH",
          value: `${
            sP.reportingFees.unclaimedParticipationTokenEthFees.formatted
          } ETH`
        },
        {
          label: "Total Gas Cost (ETH)",
          value: `${formatEther(totalGas).formatted} ETH`
        }
      ],
      action: () => {
        const ClaimReportingFeesNonforkedMarketsOptions = {
          feeWindows: sP.feeWindows,
          forkedMarket: sP.reportingFees.forkedMarket,
          nonforkedMarkets: [],
          estimateGas: false,
          onSent: () => {},
          onSuccess: result => {
            if (sP.modal.cb) {
              sP.modal.cb();
            }
          }
        };
        dP.claimReportingFeesNonforkedMarkets(
          ClaimReportingFeesNonforkedMarketsOptions
        );
      }
    });
  }

  const total = createBigNumber(sP.reportingFees.unclaimedEth.fullPrecision).minus(createBigNumber(sP.gasCost))

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
        label: "Reporting Stake",
        value: `${sP.reportingFees.unclaimedRep.full} REP`
      },
      {
        label: "Reporting Fees",
        value: `${sP.reportingFees.unclaimedEth.full} ETH`
      },
      {
        label: "Estimated Gas",
        value: `${sP.gasCost} ETH`
      },
      {
        label: "Total",
        value: `${formatEther(total).formatted} ETH`
      }
    ],
    closeAction: () => {
      dP.closeModal();
      if (sP.modal.cb) {
        sP.modal.cb();
      }
    },
    buttons: [
      {
        text: "Claim All Stake & Fees",
        action: () => {
          const reportingParticipants = [];
          sP.nonforkedMarkets.forEach(nonforkedMarket => {
            reportingParticipants.push(nonforkedMarket.initialReporter);
            nonforkedMarket.crowdsourcers.forEach(crowdsourcer => {
              reportingParticipants.push(crowdsourcer);
            });
          });
          const ClaimReportingFeesNonforkedMarketsOptions = {
            _feeWindows: sP.reportingFees.feeWindows,
            _reportingParticipants: reportingParticipants,
            onSent: () => {},
            onFailed: () => {},
            onSuccess: result => {
              if (sP.modal.cb) {
                sP.modal.cb();
              }
              dP.closeModal();
            }
          };
          dP.redeemStake(ClaimReportingFeesNonforkedMarketsOptions);
        }
      },
      {
        text: "Close",
        action: () => {
          dP.closeModal();
          if (sP.modal.cb) {
            sP.modal.cb();
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
    mergeProps,
    {
      areStatePropsEqual: (next, prev) => {
        return JSON.stringify(next.nonforkedMarkets) !== JSON.stringify(prev.nonforkedMarkets)
      }
    }
  )(Proceeds)
);
