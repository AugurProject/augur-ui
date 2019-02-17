import {
  Ledger,
  Edge,
  MetaMask,
  Trezor
} from "modules/common/components/icons";
import { DEFAULT_DERIVATION_PATH } from "modules/auth/helpers/derivation-path";
import {
  timeDay,
  timeHour,
  timeMinute,
  timeMonth,
  timeSecond,
  timeFormat
} from "d3";
import { createBigNumber } from "utils/create-big-number";
// All named constants go here

// # MISC Constants
export const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
export const MALFORMED_OUTCOME = "malformed outcome";
// # Asset Types
export const ETH = "ETH";
export const REP = "REP";
export const DAI = "DAI";

// # Network Constants
export const MILLIS_PER_BLOCK = 12000;
export const UNIVERSE_ID = "0xf69b5";
// network id to names map
export const NETWORK_NAMES = {
  1: "Mainnet",
  3: "Ropsten",
  4: "Rinkeby",
  42: "Kovan",
  12346: "Private"
};
// network name to id map
export const NETWORK_IDS = {
  Mainnet: "1",
  Ropsten: "3",
  Rinkeby: "4",
  Kovan: "42",
  Private1: "101",
  Private2: "102",
  Private3: "103",
  Private4: "104"
};
// augurNode
export const AUGUR_NODE_URL = "augur_node";
// ethereumNodeHttp
export const ETHEREUM_NODE_HTTP = "ethereum_node_http";
// ethereumNodeWs
export const ETHEREUM_NODE_WS = "ethereum_node_ws";

// # Auth Types
export const REGISTER = "register";
export const LOGIN = "login";
export const LOGOUT = "logout";
export const IMPORT = "import";
export const FUND_ACCOUNT = "fund_account";

export const AUTH_TYPES = {
  [REGISTER]: REGISTER,
  [LOGIN]: LOGIN,
  [IMPORT]: IMPORT,
  [LOGOUT]: LOGOUT
};

export const DEFAULT_AUTH_TYPE = REGISTER;

export const EDGE_WALLET_TYPE = "wallet:ethereum";

// # Connect Nav Constants
export const PARAMS = {
  EDGE: "edge",
  LEDGER: "ledger",
  METAMASK: "metamask",
  TREZOR: "trezor"
};

export const WALLET_TYPE = {
  SOFTWARE: "software",
  HARDWARE: "hardware"
};

export const ERROR_TYPES = {
  UNABLE_TO_CONNECT: {
    header: "Unable To Connect",
    subheader: "Please install the MetaMask browser plug-in from Metamask.io"
  },
  NOT_SIGNED_IN: {
    header: "Unable To Connect",
    subheader: "Please make sure you are signed in to your account."
  },
  INCORRECT_FORMAT: {
    header: "Incorrect Format",
    subheader: `Please enter a derivative path with the format "${DEFAULT_DERIVATION_PATH}"`
  }
};

const DEFAULT_ITEM_INDEX = 0;
export const ITEMS = [
  {
    param: PARAMS.METAMASK,
    title: "Metamask / Web 3 Provider",
    icon: MetaMask,
    type: WALLET_TYPE.SOFTWARE
  },
  {
    param: PARAMS.TREZOR,
    title: "Trezor",
    icon: Trezor,
    type: WALLET_TYPE.HARDWARE
  },
  {
    param: PARAMS.LEDGER,
    title: "Ledger",
    icon: Ledger,
    type: WALLET_TYPE.HARDWARE
  }
];
if (!process.env.AUGUR_HOSTED) {
  ITEMS.unshift({
    param: PARAMS.EDGE,
    title: "Edge",
    icon: Edge,
    type: WALLET_TYPE.SOFTWARE
  });
}
ITEMS[DEFAULT_ITEM_INDEX].default = true;

// # Ledger Related Constants
export const ATTEMPTING_CONNECTION = "ATTEMPTING_CONNECTION";
export const CONNECT_LEDGER = "CONNECT_LEDGER";
export const OPEN_APP = "OPEN_APP";
export const SWITCH_MODE = "SWITCH_MODE";
export const ENABLE_CONTRACT_SUPPORT = "ENABLE_CONTRACT_SUPPORT";
export const OTHER_ISSUE = "OTHER_ISSUE";
export const NOT_CONNECTED = "NOT_CONNECTED";

// # Market Max Fees
export const MAX_FEE_100_PERCENT = "1";
export const MAX_FEE_40_PERCENT = "0.4";
export const MAX_FEE_30_PERCENT = "0.3";
export const MAX_FEE_20_PERCENT = "0.2";
export const MAX_FEE_10_PERCENT = "0.1";
export const MAX_FEE_05_PERCENT = "0.05";
export const MAX_FEE_02_PERCENT = "0.02";

// # Market Sort Params
export const MARKET_VOLUME = "volume";
export const MARKET_CREATION_TIME = "creationTime";
export const MARKET_END_DATE = "endTime";
export const MARKET_RECENTLY_TRADED = "recentlyTraded";
export const MARKET_FEE = "marketFee";
export const MARKET_OPEN_INTEREST = "openInterest";
// The user should be able to sort by:

// Volume
// Recently Traded
// End Date (soonest first)
// Creation Date (most recent first)
// Fee (lowest first)
// The user should be able to filter by market state:

// Open (PRE_REPORTING)
// In Reporting (DESIGNATED_REPORTING, OPEN_REPORTING, CROWDSOURCING_DISPUTE, AWAITING_NEXT_WINDOW)
// Resolved (AWAITING_FINALIZATION, FINALIZED)

// # Market States
export const ALL_MARKETS = "all";
export const MARKET_OPEN = "open";
export const MARKET_REPORTING = "reporting";
export const MARKET_CLOSED = "closed";

// # Market Status Messages
export const MARKET_STATUS_MESSAGES = {
  OPEN: "Open",
  IN_REPORTING: "In Reporting",
  RESOLVED: "Resolved",
  FORKING: "Forking",
  AWAITING_NO_REPORT_MIGRATION: "Awaiting No Report Migrated",
  AWAITING_FORK_MIGRATION: "Awaiting Fork Migration"
};

// # Search/Filter Param Names
export const FILTER_SEARCH_PARAM = "keywords";
export const TAGS_PARAM_NAME = "tags";
export const CATEGORY_PARAM_NAME = "category";

// # Close Dialog Status
export const CLOSE_DIALOG_CLOSING = "CLOSE_DIALOG_CLOSING";
export const CLOSE_DIALOG_PENDING = "CLOSE_DIALOG_PENDING";
export const CLOSE_DIALOG_FAILED = "CLOSE_DIALOG_FAILED";
export const CLOSE_DIALOG_NO_ORDERS = "CLOSE_DIALOG_NO_ORDERS";
export const REMOVE_DIALOG_NO_ORDERS = "REMOVE_DIALOG_NO_ORDERS";

// # Link Types
export const TYPE_MARKET = "market";
export const TYPE_REPORT = "report";
export const TYPE_DISPUTE = "dispute";
export const TYPE_CLAIM_PROCEEDS = "claim proceeds";
export const TYPE_TRADE = "trade";
export const TYPE_VIEW = "view";
export const TYPE_MIGRATE_REP = "migrate-rep";
export const TYPE_FINALIZE_MARKET = "finalize market";

// # Market Loading States
export const MARKET_INFO_LOADING = "MARKET_INFO_LOADING";
export const MARKET_INFO_LOADED = "MARKET_INFO_LOADED";
export const MARKET_FULLY_LOADING = "MARKET_FULLY_LOADING";
export const MARKET_FULLY_LOADED = "MARKET_FULLY_LOADED";

// # Market Outcome Constants
export const YES_NO_NO_ID = 0;
export const YES_NO_NO_OUTCOME_NAME = "No";
export const YES_NO_YES_ID = 1;
export const YES_NO_YES_OUTCOME_NAME = "Yes";
export const SCALAR_DOWN_ID = 0;
export const SCALAR_UP_ID = 1;
export const YES_NO_INDETERMINATE_OUTCOME_ID = "0.5";
export const CATEGORICAL_SCALAR_INDETERMINATE_OUTCOME_ID = "0.5";
export const INDETERMINATE_PLUS_ONE = "0.500000000000000001";
export const INDETERMINATE_OUTCOME_NAME = "Indeterminate";

// # Market Types
export const YES_NO = "yesNo";
export const CATEGORICAL = "categorical";
export const SCALAR = "scalar";
export const COMBINATORIAL = "combinatorial";

// # New Market Constraint Constants
export const DESCRIPTION_MIN_LENGTH = 1;
export const DESCRIPTION_MAX_LENGTH = 256;
export const CATEGORICAL_OUTCOMES_MIN_NUM = 2;
export const CATEGORICAL_OUTCOMES_MAX_NUM = 8;
export const CATEGORICAL_OUTCOME_MAX_LENGTH = 32;
export const TAGS_MAX_LENGTH = 25;
export const TAGS_MAX_NUM = 2;
export const RESOURCES_MAX_NUM = 5;
export const RESOURCES_MAX_LENGTH = 1250;
export const EXPIRY_SOURCE_GENERIC = "EXPIRY_SOURCE_GENERIC";
export const EXPIRY_SOURCE_SPECIFIC = "EXPIRY_SOURCE_SPECIFIC";
export const DESIGNATED_REPORTER_SELF = "DESIGNATED_REPORTER_SELF";
export const DESIGNATED_REPORTER_SPECIFIC = "DESIGNATED_REPORTER_SPECIFIC";
export const INITIAL_LIQUIDITY_DEFAULT = 500;
export const INITIAL_LIQUIDITY_MIN = 250;
export const SETTLEMENT_FEE_DEFAULT = 0;
export const SETTLEMENT_FEE_MIN = 0;
export const SETTLEMENT_FEE_MAX = 12.5;
// Advanced Market Creation Defaults
export const STARTING_QUANTITY_DEFAULT = 100;
export const STARTING_QUANTITY_MIN = 0.1;
export const BEST_STARTING_QUANTITY_DEFAULT = 100;
export const BEST_STARTING_QUANTITY_MIN = 0.1;
export const PRICE_WIDTH_DEFAULT = 0.1;
export const PRICE_WIDTH_MIN = 0.01;
export const PRICE_DEPTH_DEFAULT = 0.1; // Not used yet
export const IS_SIMULATION = false; // Not used yet

// # Permissible Periods
// Note: times are in seconds
export const RANGES = [
  {
    duration: 60,
    label: "Past minute",
    tickInterval: axis => axis.ticks(timeSecond.every(30))
  },
  {
    duration: 3600,
    label: "Past hour",
    tickInterval: axis => axis.ticks(timeMinute.every(10))
  },
  {
    duration: 86400,
    label: "Past day",
    tickInterval: axis => axis.ticks(timeHour.every(3))
  },
  {
    duration: 604800,
    label: "Past week",
    isDefault: true,
    tickInterval: axis =>
      axis.ticks(timeDay.every(1)).tickFormat(timeFormat("%a %d"))
  },
  {
    duration: 2629800,
    label: "Past month",
    tickInterval: axis => axis.ticks(timeDay.every(6))
  },
  {
    duration: 31557600,
    label: "Past year",
    tickInterval: axis =>
      axis.ticks(timeMonth.every(1)).tickFormat(timeFormat("%b"))
  }
];

export const PERIOD_RANGES = {
  3600: {
    period: 3600,
    format: "{value:%H:%M}",
    crosshair: "{value:%H:%M}",
    step: 3,
    range: 24 * 3600 * 1000 // 1 day
  },
  43200: {
    period: 43200,
    format: "{value:%H:%M}",
    crosshair: "{value:%H:%M}",
    step: 3,
    range: 7 * 24 * 3600 * 1000 // 1 week
  },
  86400: {
    period: 86400,
    format: "{value:%b %d}",
    crosshair: "{value:%b %d}",
    step: 2,
    range: 30 * 24 * 3600 * 1000 // month
  },
  604800: {
    period: 604800,
    format: "{value:%b %d}",
    crosshair: "{value:%b %d}",
    step: 2,
    range: 6 * 30 * 24 * 3600 * 1000 // 6 months
  }
};

export const DEFAULT_PERIODS_VALUE = 86400;
export const DEFAULT_SHORT_PERIODS_VALUE = 3600;
export const PERIODS = [
  {
    value: 3600,
    label: "Hourly"
  },
  {
    value: 43200,
    label: "12 Hour"
  },
  {
    value: 86400,
    label: "Daily"
  },
  {
    value: 604800,
    label: "Weekly"
  }
];

// # Precision Constants
export const UPPER_FIXED_PRECISION_BOUND = 8;
export const LOWER_FIXED_PRECISION_BOUND = 0;

// # Modal Constants
export const MODAL_LEDGER = "MODAL_LEDGER";
export const MODAL_TREZOR = "MODAL_TREZOR";
export const MODAL_NETWORK_MISMATCH = "MODAL_NETWORK_MISMATCH";
export const MODAL_NETWORK_CONNECT = "MODAL_NETWORK_CONNECT";
export const MODAL_NETWORK_DISCONNECTED = "MODAL_NETWORK_DISCONNECTED";
export const MODAL_ACCOUNT_APPROVAL = "MODAL_ACCOUNT_APPROVAL";
export const MODAL_CLAIM_REPORTING_FEES_FORKED_MARKET =
  "MODAL_CLAIM_REPORTING_FEES_FORKED_MARKET";
export const MODAL_CLAIM_REPORTING_FEES_NONFORKED_MARKETS =
  "MODAL_CLAIM_REPORTING_FEES_NONFORKED_MARKETS";
export const MODAL_PARTICIPATE = "MODAL_PARTICIPATE";
export const MODAL_MIGRATE_MARKET = "MODAL_MIGRATE_MARKET";
export const MODAL_NETWORK_DISABLED = "MODAL_NETWORK_DISABLED";
export const MODAL_DISCLAIMER = "MODAL_DISCLAIMER";
export const MODAL_CONFIRM = "MODAL_CONFIRM";
export const MODAL_REVIEW = "MODAL_REVIEW";
export const MODAL_GAS_PRICE = "MODAL_GAS_PRICE";
export const MODAL_CLAIM_TRADING_PROCEEDS = "MODAL_CLAIM_TRADING_PROCEEDS";
export const MODAL_TRADING_OVERLAY = "MODAL_TRADING_OVERLAY";
export const DISCLAIMER_SEEN = "disclaimerSeen";

// # Notifications (soon to be alerts)
export const CRITICAL = "CRITICAL";
export const INFO = "INFO";
export const CREATEGENESISUNIVERSE = "CREATEGENESISUNIVERSE";
export const CANCELORPHANEDORDER = "CANCELORPHANEDORDER";
export const CANCELORDER = "CANCELORDER";
export const WITHDRAWETHERTOIFPOSSIBLE = "WITHDRAWETHERTOIFPOSSIBLE";
export const CALCULATEREPORTINGFEE = "CALCULATEREPORTINGFEE";
export const CLAIMTRADINGPROCEEDS = "CLAIMTRADINGPROCEEDS";
export const PUBLICBUYCOMPLETESETS = "PUBLICBUYCOMPLETESETS";
export const PUBLICBUYCOMPLETESETSWITHCASH = "PUBLICBUYCOMPLETESETSWITHCASH";
export const PUBLICSELLCOMPLETESETS = "PUBLICSELLCOMPLETESETS";
export const PUBLICSELLCOMPLETESETSWITHCASH = "PUBLICSELLCOMPLETESETSWITHCASH";
export const PUBLICCREATEORDER = "PUBLICCREATEORDER";
export const BUYPARTICIPATIONTOKENS = "BUYPARTICIPATIONTOKENS";
export const PUBLICFILLBESTORDER = "PUBLICFILLBESTORDER";
export const PUBLICFILLBESTORDERWITHLIMIT = "PUBLICFILLBESTORDERWITHLIMIT";
export const PUBLICFILLORDER = "PUBLICFILLORDER";
export const MIGRATEREP = "MIGRATEREP";
export const WITHDRAWETHER = "WITHDRAWETHER";
export const WITHDRAWTOKENS = "WITHDRAWTOKENS";
export const CONTRIBUTE = "CONTRIBUTE";
export const DISAVOWCROWDSOURCERS = "DISAVOWCROWDSOURCERS";
export const DOINITIALREPORT = "DOINITIALREPORT";
export const FINALIZE = "FINALIZE";
export const FINALIZEFORK = "FINALIZEFORK";
export const MIGRATETHROUGHONEFORK = "MIGRATETHROUGHONEFORK";
export const MIGRATEBALANCESFROMLEGACYREP = "MIGRATEBALANCESFROMLEGACYREP";
export const MIGRATEALLOWANCESFROMLEGACYREP = "MIGRATEALLOWANCESFROMLEGACYREP";
export const MIGRATEIN = "MIGRATEIN";
export const MIGRATEOUT = "MIGRATEOUT";
export const MIGRATEOUTBYPAYOUT = "MIGRATEOUTBYPAYOUT";
export const UPDATEPARENTTOTALTHEORETICALSUPPLY =
  "UPDATEPARENTTOTALTHEORETICALSUPPLY";
export const UPDATESIBLINGMIGRATIONTOTAL = "UPDATESIBLINGMIGRATIONTOTAL";
export const PUBLICBUY = "PUBLICBUY";
export const PUBLICBUYWITHLIMIT = "PUBLICBUYWITHLIMIT";
export const PUBLICSELL = "PUBLICSELL";
export const PUBLICSELLWITHLIMIT = "PUBLICSELLWITHLIMIT";
export const PUBLICTRADE = "PUBLICTRADE";
export const PUBLICTRADEWITHLIMIT = "PUBLICTRADEWITHLIMIT";
export const FAUCET = "FAUCET";
export const CLAIMSHARESINUPDATE = "CLAIMSHARESINUPDATE";
export const GETFROZENSHAREVALUEINMARKET = "GETFROZENSHAREVALUEINMARKET";
export const CREATEMARKET = "CREATEMARKET";
export const CREATECATEGORICALMARKET = "CREATECATEGORICALMARKET";
export const CREATESCALARMARKET = "CREATESCALARMARKET";
export const CREATEYESNOMARKET = "CREATEYESNOMARKET";
export const CREATECHILDUNIVERSE = "CREATECHILDUNIVERSE";
export const FORK = "FORK";
export const REDEEMSTAKE = "REDEEMSTAKE";
export const GETINITIALREPORTSTAKESIZE = "GETINITIALREPORTSTAKESIZE";
export const GETORCACHEDESIGNATEDREPORTNOSHOWBOND =
  "GETORCACHEDESIGNATEDREPORTNOSHOWBOND";
export const GETORCACHEDESIGNATEDREPORTSTAKE =
  "GETORCACHEDESIGNATEDREPORTSTAKE";
export const GETORCACHEMARKETCREATIONCOST = "GETORCACHEMARKETCREATIONCOST";
export const GETORCACHEREPORTINGFEEDIVISOR = "GETORCACHEREPORTINGFEEDIVISOR";
export const GETORCACHEVALIDITYBOND = "GETORCACHEVALIDITYBOND";
export const GETORCREATECURRENTFEEWINDOW = "GETORCREATECURRENTFEEWINDOW";
export const GETORCREATEFEEWINDOWBYTIMESTAMP =
  "GETORCREATEFEEWINDOWBYTIMESTAMP";
export const GETORCREATENEXTFEEWINDOW = "GETORCREATENEXTFEEWINDOW";
export const GETORCREATEPREVIOUSFEEWINDOW = "GETORCREATEPREVIOUSFEEWINDOW";
export const UPDATEFORKVALUES = "UPDATEFORKVALUES";
export const APPROVE = "APPROVE";
export const DECREASEAPPROVAL = "DECREASEAPPROVAL";
export const DEPOSITETHER = "DEPOSITETHER";
export const DEPOSITETHERFOR = "DEPOSITETHERFOR";
export const FORKANDREDEEM = "FORKANDREDEEM";
export const REDEEMFORREPORTINGPARTICIPANT = "REDEEMFORREPORTINGPARTICIPANT";
export const REDEEM = "REDEEM";
export const INCREASEAPPROVAL = "INCREASEAPPROVAL";
export const MIGRATE = "MIGRATE";
export const TRANSFER = "TRANSFER";
export const TRANSFERFROM = "TRANSFERFROM";
export const TRANSFEROWNERSHIP = "TRANSFEROWNERSHIP";
export const WITHDRAWETHERTO = "WITHDRAWETHERTO";
export const WITHDRAWINEMERGENCY = "WITHDRAWINEMERGENCY";
export const SENDETHER = "SENDETHER";
export const SENDREPUTATION = "SENDREPUTATION";

// # Orders/Trade Constants
export const ORDER_BOOK_TABLE = "ORDER_BOOK_TABLE";
export const ORDER_BOOK_CHART = "ORDER_BOOK_CHART";
export const BIDS = "bids";
export const ASKS = "asks";
export const CANCELED = "CANCELED";
export const OPEN = "OPEN";
export const PRICE = "price";
export const SHARE = "share";
export const SHARES = "Shares";
export const BUY = "buy";
export const SELL = "sell";
export const UP = "up";
export const DOWN = "down";
export const NONE = "none";
export const ZERO = createBigNumber(0);
export const ONE = createBigNumber(1, 10);
export const TWO = createBigNumber(2, 10);
export const TEN = createBigNumber(10, 10);
export const TEN_TO_THE_EIGHTEENTH_POWER = TEN.exponentiatedBy(18);
export const MIN_QUANTITY = createBigNumber("0.00000001");

// # Positions
export const LONG = "long";
export const SHORT = "short";
export const NO_POSITION = "—";

// # Transaction Constants
export const NO_RELAY = ["buyCompleteSets"];

export const AWAITING_SIGNATURE = "awaiting signature";
export const PENDING = "pending";
export const SUCCESS = "success";
export const FAILED = "failed";
export const COMMITTING = "committing";
export const SUBMITTED = "submitted";
export const INTERRUPTED = "interrupted";

// Market Creation
export const CREATING_MARKET = "creating market...";

// Order Book Generation
export const GENERATING_ORDER_BOOK = "generating order book...";

export const SIMULATED_ORDER_BOOK = "order book simulated";

export const COMPLETE_SET_BOUGHT = "complete set bought";
export const ORDER_BOOK_ORDER_COMPLETE = "order creation complete";
export const ORDER_BOOK_OUTCOME_COMPLETE = "outcome creation complete";

export const CANCELLING_ORDER = "cancelling order";

export const DAY = "days";
export const WEEK = "week";
export const MONTH = "month";
// for add-transactions.js and transactions.jsx
export const ALL = "all";
export const PUBLIC_TRADE = "publicTrade";
export const OPEN_ORDER = "OpenOrder";
export const MARKET_CREATION = "MarketCreation";
export const TRADE = "Trade";
export const POSITION = "Position";
export const REPORTING = "Reporting";
export const COMPLETE_SETS_SOLD = "CompleteSetsSold";

// Other
export const TRANSFER_FUNDS = "transfer_funds";
export const SENT_CASH = "sent_cash";
export const SENT_ETHER = "sent_ether";
export const SMALL = "small";
export const NORMAL = "normal";
export const LARGE = "large";

// Trade/order labels
export const BID = "bid";
export const ASK = "ask";
export const MATCH_BID = "match_bid";
export const MATCH_ASK = "match_ask";

export const VOLUME_ETH_SHARES = [
  {
    value: ETH,
    label: ETH
  },
  {
    value: SHARES,
    label: SHARES
  }
]
