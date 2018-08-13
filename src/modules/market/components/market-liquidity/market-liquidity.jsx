import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { augur } from 'services/augurjs'
import { ChevronDown } from 'modules/common/components/icons'
import { createBigNumber } from 'utils/create-big-number'
import { formatEther, formatGasCostToEther } from 'utils/format-number'
import MarketLiquidityTable from 'modules/market/components/market-liquidity-table/market-liquidity-table'

import Styles from 'modules/market/components/market-liquidity/market-liquidity.styles'

const NEW_ORDER_GAS_ESTIMATE = createBigNumber(700000)

export default class MarketLiquidity extends Component {
  static propTypes = {
    marketId: PropTypes.string.isRequired,
    market: PropTypes.object.isRequired,
    pendingLiquidityOrders: PropTypes.object,
    isMobileSmall: PropTypes.bool.isRequired,
    availableEth: PropTypes.string.isRequired,
    removeLiquidityOrder: PropTypes.func.isRequired,
    submitLiquidityOrders: PropTypes.func.isRequired,
    clearMarketLiquidityOrders: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      isWarningShowing: false,
      estimatedGas: createBigNumber('0'),
      totalCost: createBigNumber('0'),
      gasPrice: augur.rpc.getGasPrice(),
    }

    this.handleCancelOrder = this.handleCancelOrder.bind(this)
    this.handleSubmitOrders = this.handleSubmitOrders.bind(this)
    this.handleClearAllMarketOrders = this.handleClearAllMarketOrders.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    const { pendingLiquidityOrders, marketId } = this.props
    if (pendingLiquidityOrders && pendingLiquidityOrders[marketId]) {
      const newMarketOrderBook = pendingLiquidityOrders[marketId]
      const oldMarketOrderBook = (prevProps.pendingLiquidityOrders && prevProps.pendingLiquidityOrders[marketId]) || {}
      this.calculateOverallStats(newMarketOrderBook, oldMarketOrderBook)
    }
  }

  calculateOverallStats = (marketOrderBook, oldMarketOrderBook) => {
    const newStats = this.calculateStats(marketOrderBook)
    // old book empty? just update
    if (!oldMarketOrderBook || this.state.totalCost.toFixed() !== newStats.totalCost.toFixed()) {
      return this.setState({
        totalCost: newStats.totalCost,
        estimatedGas: newStats.estimatedGas,
      })
    }
    const oldStats = this.calculateStats(oldMarketOrderBook)
    // is there a change? update if so
    if (newStats.totalOrders !== oldStats.totalOrders) {
      return this.setState({
        totalCost: newStats.totalCost,
        estimatedGas: newStats.estimatedGas,
      })
    }
  }

  calculateStats = (marketOrderBook) => {
    const outcomes = Object.keys(marketOrderBook)
    let totalCost = createBigNumber(0)
    let estimatedGas = createBigNumber(0)
    let totalOrders = 0
    outcomes.forEach((outcome) => {
      marketOrderBook[outcome].forEach((order) => {
        if (!order.sent) {
          totalCost = totalCost.plus(order.orderEstimate)
          estimatedGas = estimatedGas.plus(NEW_ORDER_GAS_ESTIMATE)
          totalOrders += 1
        }
      })
    })
    return { totalCost, estimatedGas, totalOrders }
  }

  handleCancelOrder(orderDetails) {
    const {
      marketId,
      removeLiquidityOrder,
    } = this.props
    const { outcome: outcomeId, orderId } = orderDetails
    removeLiquidityOrder({ marketId, outcomeId, orderId })
  }

  handleSubmitOrders(e) {
    const { marketId, submitLiquidityOrders } = this.props
    submitLiquidityOrders({ marketId })
  }

  handleClearAllMarketOrders(e) {
    const { marketId, clearMarketLiquidityOrders } = this.props
    clearMarketLiquidityOrders(marketId)
  }

  render() {
    const {
      pendingLiquidityOrders,
      marketId,
      market,
    } = this.props
    const {
      isOpen,
      estimatedGas,
      totalCost,
      gasPrice,
      isWarningShowing,
    } = this.state
    const isNullState = !(pendingLiquidityOrders && pendingLiquidityOrders[marketId])
    const marketOrders = isNullState ? {} : pendingLiquidityOrders[marketId]
    const marketOutcomes = Object.keys(marketOrders)
    let headerPadding = '0px'
    if (this.tableScroll && this.tableScroll.scrollWidth && this.tableScrollHeader && this.tableScrollHeader.scrollWidth) {
      headerPadding = `${this.tableScrollHeader.scrollWidth - this.tableScroll.scrollWidth}px`
    }

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
          <h1>You have unsigned orders pending for this Market&apos;s Initial Liquidity. Please submit or cancel these orders.</h1>
          <span className={classNames({ [`${Styles['is-open']}`]: isOpen })}><ChevronDown stroke="#372e4b" /></span>
        </button>
        {isOpen && pendingLiquidityOrders &&
          <div className={Styles.MarketLiquidity__ExtendedContainer}>
            <h1>Initial Liquidity Orders</h1>
            <div
              ref={(tableScrollHeader) => { this.tableScrollHeader = tableScrollHeader }}
              className={Styles.MarketLiquidity__TableWrapper}
              style={{ paddingRight: headerPadding }}
            >
              <ul className={Styles.MarketLiquidity__TableHeader}>
                <li>Type</li>
                <li>Outcome</li>
                <li>Quantity</li>
                <li>Limit Price</li>
                <li>Cost</li>
                <li />
              </ul>
            </div>
            <div
              ref={(tableScroll) => { this.tableScroll = tableScroll }}
              className={Styles.MarketLiquidity__TableScroll}
            >
              <div
                className={Styles.MarketLiquidity__TableWrapper}
              >
                { marketOutcomes && marketOutcomes.map(outcome => (
                  <MarketLiquidityTable
                    key={`${outcome}-${marketId}-${market.marketType}`}
                    marketType={market.marketType}
                    outcomeOrders={marketOrders[outcome]}
                    removeOrderFromNewMarket={this.handleCancelOrder}
                    selectedOutcome={outcome}
                  />
                ))}
              </div>
            </div>
            <div className={Styles.MarketLiquidity__TableWrapper}>
              <div className={Styles.MarketLiquidity__costs}>
                <ul
                  className={Styles['MarketLiquidity__ExtendedContainer-estGas']}
                >
                  <li />
                  <li />
                  <li />
                  <li />
                  <li>EST. GAS</li>
                  <li>{formatEther(formatGasCostToEther(estimatedGas, { decimalsRounded: 4 }, gasPrice)).full}</li>
                </ul>
                <ul
                  className={Styles['MarketLiquidity__ExtendedContainer-totalCost']}
                >
                  <li />
                  <li />
                  <li />
                  <li />
                  <li>TOTAL COST</li>
                  <li>{formatEther(totalCost).full}</li>
                </ul>
              </div>
            </div>
            { !isWarningShowing &&
              <div className={Styles['MarketLiquidity__submit-container']}>
                <button
                  className={Styles.MarketLiquidity__submit}
                  onClick={this.handleSubmitOrders}
                >
                  SUBMIT ORDERS
                </button>
                <button
                  className={Styles.MarketLiquidity__clearAll}
                  onClick={(e) => {
                    this.setState({ isWarningShowing: true })
                    e.preventDefault()
                  }}
                >
                  Cancel All Orders
                </button>
              </div>
            }
            { isWarningShowing &&
              <div className={Styles['MarketLiquidity__warning-container']}>
                <div>This action cannot be reversed. Are you sure you want to cancel all initial liquidity orders?</div>
                <button
                  onClick={(e) => {
                    this.setState({ isWarningShowing: false })
                    e.preventDefault()
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={this.handleClearAllMarketOrders}
                >
                  Clear All Orders
                </button>
              </div>
            }
          </div>
        }
      </div>
    )
  }
}
