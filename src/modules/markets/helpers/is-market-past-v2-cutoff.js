import { CUTOFF } from "modules/markets/constants/cutoff-date";

export function isPastV2Cutoff(marketEndTime) {
  if (!marketEndTime) {
    return false;
  }
  return marketEndTime * 1000 > CUTOFF;
}
