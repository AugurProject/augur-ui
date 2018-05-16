import { augur } from 'services/augurjs'
import logError from 'utils/log-error'
import { updateAssets } from 'modules/auth/actions/update-assets'

export default function claimReportingFeesNonforkedMarkets(options, callback = logError) {
  return (dispatch, getState) => {
    const { loginAccount } = getState()
    if (!loginAccount.address) return callback(null)
    augur.reporting.claimReportingFeesNonforkedMarkets({
      redeemer: loginAccount.address,
      feeWindows: options.feeWindows,
      forkedMarket: options.forkedMarket,
      nonforkedMarkets: options.nonforkedMarkets,
      estimateGas: options.estimateGas,
      meta: loginAccount.meta,
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
