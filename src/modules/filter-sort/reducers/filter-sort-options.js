import { RESET_STATE } from "modules/app/actions/reset-state";
import { MARKET_OPEN } from "modules/filter-sort/constants/market-states";
import { MARKET_LIQUIDITY_15 } from "modules/filter-sort/constants/market-sort-params";
import { DAY } from "modules/transactions/constants/transaction-periods";
import {
  UPDATE_FILTER_SORT_OPTIONS,
  MARKET_FILTER,
  MARKET_SORT,
  MARKET_MAX_FEES,
  MARKET_MAX_SPREAD,
  TRANSACTION_PERIOD,
  PAST_CUTOFF,
  EXPERIMENTAL_INVALID,
  INSECURE_MARKETS
} from "modules/filter-sort/actions/update-filter-sort-options";
import { MAX_FEE_05_PERCENT } from "src/modules/filter-sort/constants/market-max-fees";
import {
  MAX_SPREAD_10_PERCENT,
  MAX_SPREAD_STORED_SELECTION
} from "src/modules/filter-sort/constants/market-max-spread";

const localStorageRef = typeof window !== "undefined" && window.localStorage;
let maxSpreadSelection = null;
if (localStorageRef && localStorageRef.getItem) {
  maxSpreadSelection = localStorageRef.getItem(MAX_SPREAD_STORED_SELECTION);
}

const DEFAULT_STATE = {
  [MARKET_FILTER]: MARKET_OPEN,
  [MARKET_SORT]: MARKET_LIQUIDITY_15,
  [MARKET_MAX_FEES]: MAX_FEE_05_PERCENT,
  [MARKET_MAX_SPREAD]: maxSpreadSelection || MAX_SPREAD_10_PERCENT,
  [TRANSACTION_PERIOD]: DAY,
  [PAST_CUTOFF]: true,
  [EXPERIMENTAL_INVALID]: true,
  [INSECURE_MARKETS]: true
};

const KEYS = Object.keys(DEFAULT_STATE);

export default function(filterSortOptions = DEFAULT_STATE, { type, data }) {
  switch (type) {
    case UPDATE_FILTER_SORT_OPTIONS: {
      const { optionKey, optionValue } = data;
      if (optionKey === MARKET_MAX_SPREAD) {
        if (localStorageRef && localStorageRef.setItem) {
          localStorageRef.setItem(MAX_SPREAD_STORED_SELECTION, optionValue);
        }
      }
      if (KEYS.includes(optionKey))
        return {
          ...filterSortOptions,
          [optionKey]: optionValue
        };
      return filterSortOptions;
    }
    case RESET_STATE:
      return DEFAULT_STATE;
    default:
      return filterSortOptions;
  }
}
