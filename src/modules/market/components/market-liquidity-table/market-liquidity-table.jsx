import React from 'react'
import classNames from 'classnames'
import { SCALAR, YES_NO } from 'modules/markets/constants/market-types'
import { formatEther, formatShares } from 'utils/format-number'
import { BID, ASK } from 'modules/transactions/constants/types'

import Styles from 'modules/market/components/market-liquidity-table/market-liquidity-table.styles'

const MarketLiquidityTable = (p) => {
  const { marketType, outcomeOrders, removeOrderFromNewMarket, selectedOutcome } = p
  return (
    <div className={Styles['MarketLiquidityTable__table-body']}>
      { outcomeOrders.map((order, index) => {
        let outcomeLabel = marketType === YES_NO ? 'Yes' : selectedOutcome
        const direction = order.type === BID ? '' : '-'
        outcomeLabel = marketType === SCALAR ? formatEther(order.price).formattedValue : outcomeLabel
        return (
          <ul
            key={`${selectedOutcome}-${order.type}-${formatEther(order.price).formatted}`}
            className={classNames(Styles.MarketLiquidityTable__Order, {
              [`${Styles.positive}`]: order.type === BID,
              [`${Styles.negative}`]: order.type === ASK,
            })}
          >
            <li>{order.type}</li>
            <li>{outcomeLabel}</li>
            <li>{`${direction}${formatShares(order.quantity).full}`}</li>
            <li>{formatEther(order.price).full}</li>
            <li>{formatEther(order.orderEstimate).full}</li>
            <li>
              <button
                onClick={e => removeOrderFromNewMarket({
                  outcome: selectedOutcome,
                  index,
                })}
              >Cancel
              </button>
            </li>
          </ul>
        )
      })
      }
    </div>
  )
}

export default MarketLiquidityTable
