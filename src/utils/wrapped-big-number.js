import BigNumber from 'bignumber.js'
import logError from 'utils/log-error'

const WrappedBigNumber = function (...args) {
  let newBigNumber
  try {
    newBigNumber = new BigNumber(...args)
  } catch (e) {
    logError('Error instantiating BigNumber', e)
  }

  return newBigNumber
}

const FullWrappedBigNumber = Object.assign(WrappedBigNumber, BigNumber)

export default FullWrappedBigNumber
