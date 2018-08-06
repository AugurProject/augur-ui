const localStorageRef = typeof window !== 'undefined' && window.localStorage
const LIQUIDITY = 'liquidity'

export const saveLiquidity = (liquidity, marketId) =>
  (dispatch, getState) => {
    const { loginAccount } = getState()
    const { address } = loginAccount
    if (localStorageRef) {
      const accountStorage = getAccountStorage(address)
      accountStorage[LIQUIDITY] = {
        ...accountStorage[LIQUIDITY],
        [marketId]: liquidity,
      }
      setAccountStorage(address, accountStorage)
    }
  }
// order is a keyed order object: { <orderId>: { ... } }
export const updateLiquidityOrder = (order, marketId, isRemoval = false) => (dispatch, getState) => {
  const { loginAccount } = getState()
  const { address } = loginAccount
  if (localStorageRef) {
    const accountStorage = getAccountStorage(address)
    const accountLiquidity = accountStorage[LIQUIDITY]
    const curMarketLiquidity = accountLiquidity[marketId]
    const orderId = Object.Keys(order)[0]
    if (isRemoval) {
      delete curMarketLiquidity[orderId]
    } else {
      curMarketLiquidity[orderId] = order[orderId]
    }
    setAccountStorage(address, Object.assign(accountStorage, {
      [LIQUIDITY]: {
        ...accountLiquidity,
        [marketId]: { ...curMarketLiquidity },
      },
    }))
  }
}

const getAccountStorage = address => JSON.parse(localStorageRef.getItem(address))

const setAccountStorage = (address, accountStorage) => localStorageRef.setItem(address, accountStorage)

