import { convertUnixToFormattedDate } from "utils/format-date";
import { createBigNumber } from "utils/create-big-number";
import { orderBy } from "lodash";

export const marketTradingPriceTimeSeries = (marketPriceHistory, outcome) => {
  const sortedPriceHistory = orderBy(
    marketPriceHistory,
    ["timestamp"],
    ["desc"]
  );
  const datedPriceHistory = sortedPriceHistory.reduce((p, item, i) => {
    if (item.outcome.toString() !== outcome) return p;
    const dateBreakDown = convertUnixToFormattedDate(item.timestamp);
    const date = dateBreakDown.formattedShortDate;
    const time = dateBreakDown.formattedShortTime;
    const trade = {
      amount: createBigNumber(item.amount).toFixed(4),
      price: createBigNumber(item.price).toFixed(4),
      type: item.type,
      date,
      time,
      key: date + item.time + item.price + item.amount + i
    };
    const dayItems = p[date] || [];
    return { ...p, [date]: [...dayItems, trade] };
  }, {});

  return datedPriceHistory;
};
