import async from 'async'
import { loadMarketsInfo } from 'modules/markets/actions/load-markets-info'
import loadOneOutcomeBidsAsks from 'modules/bids-asks/actions/load-one-outcome-bids-asks'
import logError from 'utils/log-error'

const loadBidsAsks = (marketID, callback = logError) => (dispatch, getState) => {
  if (marketID == null) {
    return callback(`must specify market ID: ${marketID}`)
  }
  dispatch(loadMarketsInfo([marketID], (err, marketInfo) => {
    const market = marketInfo[marketID]
    if (!market) {
      return callback(`market ${marketID} data not found`)
    }
    if (market.numOutcomes == null) {
      return callback(`market ${marketID} numOutcomes not found`)
    }

    const outcomes = Array.from(new Array(market.numOutcomes), (_, i) => i)
    async.eachSeries(outcomes, (outcome, nextOutcome) => {
      dispatch(loadOneOutcomeBidsAsks(marketID, outcome, nextOutcome))
    }, callback)
  }))
}

export default loadBidsAsks
