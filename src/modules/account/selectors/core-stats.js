import { createSelector } from "reselect";
import { formatEther } from "utils/format-number";
import { selectLoginAccount } from "modules/auth/selectors/login-account";

export const selectOutcomeLastPrice = (marketOutcomeData, outcomeId) => {
  if (!marketOutcomeData || !outcomeId) return null;
  return (marketOutcomeData[outcomeId] || {}).price;
};

export const selectCoreStats = createSelector(
  selectLoginAccount,
  loginAccount => [
    // Group 1
    {
      totalRealEth: {
        label: "ETH",
        title: "Ether -- pays transaction gas fees",
        value: { ...loginAccount.eth, denomination: null }
      },
      totalRep: {
        label: "REP",
        title: "Reputation -- event voting currency",
        value: { ...loginAccount.rep, denomination: null }
      }
    },
    {
      totalPLMonth: {
        label: "30 Day P/L",
        title: "Profit/Loss -- net of all trades over the last 30 days",
        value: formatEther(loginAccount.totalPLMonth)
      },
      totalPLDay: {
        label: "1 Day P/L",
        title: "Profit/Loss -- net of all trades over the last day",
        value: formatEther(loginAccount.totalPLDay)
      }
    }
  ]
);
