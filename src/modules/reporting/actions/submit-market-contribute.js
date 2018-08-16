import { augur } from 'services/augurjs'
import { REPORTING_DISPUTE_MARKETS } from 'modules/routes/constants/views'
import makePath from 'modules/routes/helpers/make-path'
import logError from 'utils/log-error'
import { getPayoutNumerators } from 'modules/reporting/selectors/get-payout-numerators'
import { removeAccountDispute } from 'modules/reporting/actions/update-account-disputes'

import { updateNotification, addNotification } from 'modules/notifications/actions'
import { selectCurrentTimestampInSeconds } from 'src/select-state'

export const submitMarketContribute = (estimateGas, marketId, selectedOutcome, invalid, amount, history, callback = logError) => (dispatch, getState) => {
  const { loginAccount, marketsData } = getState()
  const outcome = parseFloat(selectedOutcome)

  if (!marketId || (isNaN(outcome) && !invalid)) return callback(null)

  const market = marketsData[marketId]
  if (!market) return callback('Market not found')
  const payoutNumerators = getPayoutNumerators(market, selectedOutcome, invalid)

  augur.api.Market.contribute({
    meta: loginAccount.meta,
    tx: { to: marketId, estimateGas },
    _invalid: !!invalid,
    _payoutNumerators: payoutNumerators,
    _amount: amount,
    onSent: (res) => {
      if (!estimateGas) {
        dispatch(addNotification({
          id: res.hash,
          market: marketId,
          outcome: selectedOutcome,
          _amount: amount,
          _invalid: !!invalid,
          status: 'Pending',
          timestamp: selectCurrentTimestampInSeconds(getState()),
          type: 'contribute',
        }))
        history.push(makePath(REPORTING_DISPUTE_MARKETS))
      }
    },
    onSuccess: (res) => {
      if (estimateGas) {
        callback(null, res)
      } else {
        dispatch(updateNotification(res.hash, {
          status: 'Success',
          timestamp: selectCurrentTimestampInSeconds(getState()),
        }))
        dispatch(removeAccountDispute({ marketId }))
        callback(null)
      }
    },
    onFailed: (err) => {
      callback(err)
    },
  })
}
