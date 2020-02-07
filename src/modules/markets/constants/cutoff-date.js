import { formatDate } from "utils/format-date";

// Cutoff Date
// Saturday, February 8, 2020 12:00:00 PM
// old Saturday, February 8, 2020 12:00:00 PM
// old Thursday, January 2, 2020 12:00:00 AM
// old Wednesday, January 1, 2020 12:00:00 AM
// old cutoff date Sunday, September 15, 2019 11:59:59 PM

export const CUTOFF = 1581984000000;
export const CUTOFF_READABLE = formatDate(new Date(CUTOFF)).formattedUtc;
export const CUTOFF_URL = "https://www.augur.net/blog/v1-cutoff-update/";
