import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { selectMarket } from "modules/markets/selectors/market";
import { CLAIM_SHARES_GAS_COST } from "modules/positions/actions/claim-trading-proceeds";
import { createBigNumber } from "utils/create-big-number";
import { getGasPrice } from "modules/auth/selectors/get-gas-price";
import { formatGasCostToEther, formatEther } from "utils/format-number";
import { closeModal } from "modules/modal/actions/close-modal";
import { Proceeds } from "modules/modal/proceeds";
import { constants } from "services/augurjs";
import { ActionRowsProps } from "modules/modal/common";
import { claimReportingFeesNonforkedMarkets, redeemStake } from "modules/reports/actions/claim-reporting-fees";

const mapStateToProps = (state: any) => ({
  modal: state.modal,
  gasCost: formatGasCostToEther(
    CLAIM_SHARES_GAS_COST,
    { decimalsRounded: 4 },
    getGasPrice(state)
  ),
  reportingFees: state.reportingWindowStats.reportingFees,
  nonforkedMarkets: state.reportingWindowStats.reportingFees.nonforkedMarkets
});

const mapDispatchToProps = (dispatch: Function) => ({
  closeModal: () => dispatch(closeModal()),
  claimReportingFeesNonforkedMarkets: (options, callback) =>
    dispatch(claimReportingFeesNonforkedMarkets(options, callback)),
  redeemStake: (options, callback) =>
    dispatch(redeemStake(options, callback))
});

const mergeProps = (sP: any, dP: any, oP: any) => {
  const marketIdsToTest = sP.nonforkedMarkets;
  const markets: Array<ActionRowsProps> = [];
  const marketIds: Array<string> = [];
  marketIdsToTest.forEach(marketObj => {
    const market = selectMarket(marketObj.marketId);
    if (market) {
	    markets.push({
	      title: market.description,
	      text: "Claim Stake & Fees",
	      properties: [
            {
              label: "reporting stake",
              value: 0,
            },
            {
              label: "reporting fees",
              value: 0,
            },
            {
              label: "est gas cost",
              value: 0,
            },
            {
              label: "total",
              value: 0,
            }
          ],
	      action: () => {
          const market = sP.reportingFees.nonforkedMarkets.find(market => market.marketId === marketObj.marketId);
          console.log(market)
          const ClaimReportingFeesNonforkedMarketsOptions = {
            feeWindows: sP.reportingFees.feeWindows,
            forkedMarket: sP.reportingFees.forkedMarket,
            nonforkedMarkets: [market],
            estimateGas: false,
            onSent: () => {},
            onSuccess: result => {
              if (sP.modal.cb) {
                sP.modal.cb();
              }
             // dP.closeModal();
            }
          };
          dP.claimReportingFeesNonforkedMarkets(ClaimReportingFeesNonforkedMarketsOptions)
        }
	    });
	    marketIds.push(marketObj.marketId);
    }
  });
  const totalGas = formatEther(
    createBigNumber(sP.gasCost).times(markets.length)
  );
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
        boldText: `${sP.reportingFees.unclaimedEth.full} REP`,
        postText: "of reporting fees to collect from the following markets:"
      }
    ],
    rows: markets,
    breakdown: [
    	{
        label: "Reporting Stake",
        value: sP.reportingFees.unclaimedRep.full
      },
      {
        label: "Reporting Fees",
        value: sP.reportingFees.unclaimedEth.full
      },
      {
        label: "Estimated Gas",
        value: totalGas.full
      },
      {
        label: "Total",
        value: 0
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
          //dP.closeModal();
          const ClaimReportingFeesNonforkedMarketsOptions = {
            _feeWindows: sP.reportingFees.feeWindows,
            onSent: () => {},
            onSuccess: result => {
              if (sP.modal.cb) {
                sP.modal.cb();
              }
              //dP.closeModal();
            }
          };
          // dP.claimReportingFeesNonforkedMarkets(ClaimReportingFeesNonforkedMarketsOptions)
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
    mergeProps
  )(Proceeds)
);
