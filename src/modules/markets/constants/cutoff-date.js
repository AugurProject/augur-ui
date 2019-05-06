import { formatDate } from "utils/format-date";

// Cutoff Date
// update this
// Friday, May 31, 2019 11:59:59 PM

export const CUTOFF = 1559347199000;
export const CUTOFF_READABLE = formatDate(new Date(CUTOFF)).formattedUtc;
