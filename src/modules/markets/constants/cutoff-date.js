import { formatDate } from "utils/format-date";

// Cutoff Date
// update this
// Tuesday, May 3, 2022 9:09:52 PM
export const CUTOFF = 1651612192;
export const CUTOFF_READABLE = formatDate(new Date(CUTOFF * 1000)).formattedUtc;
