import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { ChevronDown } from 'modules/common/components/icons'
import { CATEGORICAL } from 'modules/markets/constants/market-types'
import { createBigNumber } from 'utils/create-big-number'
import { formatEther } from 'utils/format-number'
import InputDropdown from 'modules/common/components/input-dropdown/input-dropdown'
import MarketLiquidityTable from 'modules/market/components/market-liquidity-table/market-liquidity-table'

import Styles from 'modules/market/components/market-liquidity/market-liquidity.styles'

export default class MarketLiquidity extends Component {
  static propTypes = {
    marketId: PropTypes.string.isRequired,
    market: PropTypes.object.isRequired,
    pendingLiquidityOrders: PropTypes.object,
    isMobileSmall: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      selectedMarketOutcome: null,
      estimatedGas: '-',
      totalCost: '-',
    }

    // this.calculateTotalCost = calculateTotalCost.bind(this)
  }

  calculateTotalCost = (marketOrderBook) => {
    const outcomes = Object.keys(marketOrderBook)
    let totalCost = createBigNumber(0)
    outcomes.forEach((outcome) => {
      marketOrderBook[outcome].forEach((order) => {
        if (!order.sent) totalCost = totalCost.plus(order.orderEstimate)
      })
    })
    return formatEther(totalCost).full
  }

  render() {
    const {
      pendingLiquidityOrders,
      marketId,
      market,
      isMobileSmall,
    } = this.props
    const {
      isOpen,
      selectedMarketOutcome,
      estimatedGas,
      totalCost,
    } = this.state
    // const defaultSelectedOutcome = (market && market.outcomes && market.outcomes[0] && market.outcomes[0].name) || undefined
    const defaultOutcome = market.marketType !== CATEGORICAL ? 1 : market.outcomes[0].name
    const selectedOutcome = selectedMarketOutcome || defaultOutcome
    const isNullState = !(pendingLiquidityOrders && pendingLiquidityOrders[marketId] && pendingLiquidityOrders[marketId][selectedOutcome])
    const outcomeOrders = isNullState ? [] : pendingLiquidityOrders[marketId][selectedOutcome]
    // console.log(selectedOutcome, outcomeOrders, isNullState, defaultOutcome, pendingLiquidityOrders && this.calculateTotalCost(pendingLiquidityOrders[marketId]));
    return (
      <div
        className={classNames(Styles.MarketLiquidity__container, {
          [Styles['MarketLiquidity__container-hidden']]: isNullState,
        })}
      >
        <button
          className={Styles.MarketLiquidity__heading}
          onClick={() => {
            this.setState({ isOpen: !isOpen })
          }}
        >
          <h1>You have unsigned orders pending for this Market's Initial Liquidity. Please submit or cancel these orders.</h1>
          <span className={classNames({ [`${Styles['is-open']}`]: isOpen })}><ChevronDown stroke="#372e4b" /></span>
        </button>
        {isOpen && pendingLiquidityOrders &&
          <div className={Styles.MarketLiquidity__ExtendedContainer}>
            <h1>Initial Liquidity Orders</h1>
            {market.marketType === CATEGORICAL &&
              <div className={Styles['MarketLiquidity__ExtendedContainer-outcomeSelectContainer']}>
                <label>Select Outcome</label>
                <InputDropdown
                  label="Choose an Outcome"
                  default={selectedOutcome}
                  options={market.outcomes.map(outcome => outcome.name)}
                  onChange={(value) => {
                    this.setState({ selectedMarketOutcome: value })
                  }}
                  isMobileSmall={isMobileSmall}
                />
              </div>
            }
            <div className={Styles.MarketLiquidity__TableWrapper}>
              <ul className={Styles.MarketLiquidity__TableHeader}>
                <li>Type</li>
                <li>Outcome</li>
                <li>Quantity</li>
                <li>Limit Price</li>
                <li>Cost</li>
                <li />
              </ul>
              <MarketLiquidityTable
                marketType={market.marketType}
                outcomeOrders={outcomeOrders}
                removeOrderFromNewMarket={(...args) => console.log('cancel order', args)}
                selectedOutcome={selectedOutcome}
              />
              <div className={Styles.MarketLiquidity__costs}>
                <ul
                  className={Styles['MarketLiquidity__ExtendedContainer-estGas']}
                >
                  <li />
                  <li />
                  <li />
                  <li />
                  <li>EST. GAS</li>
                  <li>{estimatedGas}</li>
                </ul>
                <ul
                  className={Styles['MarketLiquidity__ExtendedContainer-totalCost']}
                >
                  <li />
                  <li />
                  <li />
                  <li />
                  <li>TOTAL COST</li>
                  <li>{(pendingLiquidityOrders && this.calculateTotalCost(pendingLiquidityOrders[marketId])) || totalCost}</li>
                </ul>
              </div>
            </div>
            <div className={Styles['MarketLiquidity__submit-container']}>
              <button
                className={Styles.MarketLiquidity__submit}
                onClick={(...args) => console.log('Submit Clicked', args)}
              >
                SUBMIT ORDERS
              </button>
            </div>
          </div>
        }
      </div>
    )
  }
}