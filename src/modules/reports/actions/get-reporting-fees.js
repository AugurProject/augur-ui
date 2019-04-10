import { augur } from "services/augurjs";
import logError from "utils/log-error";
import { createBigNumber } from "utils/create-big-number";
import { formatAttoRep, formatAttoEth } from "utils/format-number";
import { updateReportingWindowStats } from "modules/reports/actions/update-reporting-window-stats";
import { redeemStake } from "modules/reports/actions/claim-reporting-fees";

export const getReportingFees = (callback = logError) => (
  dispatch,
  getState
) => {
  const { universe, loginAccount } = getState();
  if (loginAccount.address === undefined) return callback(null);
  augur.augurNode.submitRequest(
    "getReportingFees",
    {
      universe: universe.id,
      reporter: loginAccount.address
    },
    (err, result) => {
      if (err) return callback(err);

      const unclaimedRepTotal = createBigNumber(result.total.unclaimedRepStaked)
        .plus(createBigNumber(result.total.unclaimedRepEarned))
        .toString();

      const promises = [];

      promises.push(
        new Promise(resolve =>
          dispatch(
            redeemStake({
              feeWindows: result.feeWindows,
              nonforkedMarkets: result.nonforkedMarkets,
              estimateGas: true,
              onSuccess: gasCost => {
                resolve({ type: "all", gasCost });
              }
            })
          )
        )
      );

      promises.push(
        new Promise(resolve =>
          dispatch(
            redeemStake({
              feeWindows: result.feeWindows,
              nonforkedMarkets: [],
              estimateGas: true,
              onSuccess: gasCost => {
                resolve({ type: "feeWindows", gasCost });
              }
            })
          )
        )
      );

      result.nonforkedMarkets.forEach(nonforkedMarket => {
        promises.push(
          new Promise(resolve =>
            dispatch(
              redeemStake({
                feeWindows: [],
                nonforkedMarkets: [nonforkedMarket],
                estimateGas: true,
                onSuccess: gasCost => {
                  nonforkedMarket.gasCost = gasCost;
                  resolve();
                }
              })
            )
          )
        );
      });

      Promise.all(promises).then(gasCosts => {
        dispatch(
          updateReportingWindowStats({
            reportingFees: {
              unclaimedEth: formatAttoEth(result.total.unclaimedEth, {
                decimals: 4,
                decimalsRounded: 4,
                zeroStyled: true
              }),
              unclaimedRep: formatAttoRep(unclaimedRepTotal, {
                decimals: 4,
                decimalsRounded: 4,
                zeroStyled: true
              }),
              unclaimedForkEth: formatAttoEth(result.total.unclaimedForkEth, {
                decimals: 4,
                decimalsRounded: 4,
                zeroStyled: true
              }),
              unclaimedForkRepStaked: formatAttoRep(
                result.total.unclaimedForkRepStaked,
                {
                  decimals: 4,
                  decimalsRounded: 4,
                  zeroStyled: true
                }
              ),
              participationTokenRepStaked: formatAttoRep(
                result.total.participationTokenRepStaked,
                {
                  decimals: 4,
                  decimalsRounded: 4,
                  zeroStyled: true
                }
              ),
              unclaimedParticipationTokenEthFees: formatAttoRep(
                result.total.unclaimedParticipationTokenEthFees,
                {
                  decimals: 4,
                  decimalsRounded: 4,
                  zeroStyled: true
                }
              ),
              feeWindows: result.feeWindows,
              forkedMarket: result.forkedMarket,
              nonforkedMarkets: result.nonforkedMarkets,
              gasCosts: gasCosts
                .filter(i => i !== undefined)
                .reduce((p, i) => ({ ...p, [i.type]: i.gasCost }), {})
            }
          })
        );
        callback(null, result);
      });
    }
  );
};
