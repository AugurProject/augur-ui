import { formatDate } from "utils/format-date";

// Cutoff Date
// Sunday, September 15, 2019 11:59:59 PM

export const CUTOFF = 1568591999000;
export const CUTOFF_READABLE = formatDate(new Date(CUTOFF)).formattedUtc;
export const CUTOFF_URL = "https://augur.net/blog/v1-cutoff";
