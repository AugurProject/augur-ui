import { UPDATE_GAS_INFO } from "modules/app/actions/update-gas-price-info";
import { RESET_STATE } from "modules/app/actions/reset-state";
import { formatGasCost } from "utils/format-number";

const GWEI_CONVERSION = 1000000000;
const DEFAULT_STATE = {
  average: formatGasCost(GWEI_CONVERSION).value,
  fast: formatGasCost(GWEI_CONVERSION).value,
  safeLow: formatGasCost(GWEI_CONVERSION).value
};

export default function(gasPriceInfo = DEFAULT_STATE, { type, data }) {
  switch (type) {
    case UPDATE_GAS_INFO:
      return {
        ...gasPriceInfo,
        ...data.gasPriceInfo
      };
    case RESET_STATE:
      return DEFAULT_STATE;
    default:
      return gasPriceInfo;
  }
}
