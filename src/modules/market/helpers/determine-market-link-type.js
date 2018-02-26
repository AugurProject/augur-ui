import { selectMarket } from 'modules/market/selectors/market'
import { TYPE_VIEW, TYPE_REPORT, TYPE_DISPUTE, TYPE_TRADE } from 'modules/market/constants/link-types'
import { constants } from 'services/augurjs'
import { isEmpty } from 'lodash'

export const determineMarketLinkType = (marketId, loginAccount) => {
  const market = selectMarket(marketId)
  if (isEmpty(market)) return TYPE_VIEW

  const isDesignatedReporter = market.designatedReporter === loginAccount.address
  const { reportingState } = market

  switch (reportingState) {

    case constants.REPORTING_STATE.PRE_REPORTING:
      return TYPE_TRADE

    case constants.REPORTING_STATE.DESIGNATED_REPORTING:
      if (isDesignatedReporter) return TYPE_REPORT

      return TYPE_VIEW

    case constants.REPORTING_STATE.OPEN_REPORTING:
      return TYPE_REPORT

    case constants.REPORTING_STATE.CROWDSOURCING_DISPUTE:
      return TYPE_DISPUTE

    default:
      return TYPE_VIEW
  }
}
