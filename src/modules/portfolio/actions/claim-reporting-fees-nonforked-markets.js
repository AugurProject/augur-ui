import { augur } from 'services/augurjs'
import logError from 'utils/log-error'
import { updateAssets } from 'modules/auth/actions/update-assets'

export default function claimReportingFeesNonforkedMarkets(options, callback = logError) {
  return (dispatch, getState) => {
    augur.reporting.claimReportingFeesNonforkedMarkets({
      feeWindows: options.feeWindows,
      forkedMarket: options.forkedMarket,
      nonforkedMarkets: options.nonforkedMarkets,
      onSent: () => {},
      onSuccess: (result) => {
        dispatch(updateAssets())
        callback(null, result)
      },
      onFailed: (err) => {
        callback(err)
      },
    })
  }
}
