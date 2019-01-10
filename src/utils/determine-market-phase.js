import { constants } from "services/constants";

export default function determineMarketPhase(reportingState) {
  switch (reportingState) {
    case constants.REPORTING_STATE.PRE_REPORTING:
      return "Open";

    case constants.REPORTING_STATE.DESIGNATED_REPORTING:
    case constants.REPORTING_STATE.OPEN_REPORTING:
    case constants.REPORTING_STATE.CROWDSOURCING_DISPUTE:
    case constants.REPORTING_STATE.AWAITING_NEXT_WINDOW:
      return "In Reporting";

    case constants.REPORTING_STATE.AWAITING_FINALIZATION:
    case constants.REPORTING_STATE.FINALIZED:
      return "Resolved";

    case constants.REPORTING_STATE.FORKING:
      return "Forking";

    case constants.REPORTING_STATE.AWAITING_NO_REPORT_MIGRATION:
      return "Awaiting No Report Migrated";

    case constants.REPORTING_STATE.AWAITING_FORK_MIGRATION:
      return "Awaiting Fork Migration";

    default:
      return "";
  }
}
