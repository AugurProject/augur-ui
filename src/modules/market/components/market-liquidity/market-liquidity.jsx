import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { ChevronDown } from 'modules/common/components/icons'
// import CreateMarketLiquidityOrders from 'modules/create-market/components/create-market-form-liquidity-orders/create-market-form-liquidity-orders'
// TODO: break up this component into the controller/header and then the table on it's own so we can repurpose
/* <CreateMarketLiquidityOrders
              newMarket={market}
              removeOrderFromNewMarket={(...args) => { console.log('cancel order', args) }}
              liquidityState={liquidityState}
              orderBook={pendingLiquidityOrders[marketId]}
              defaultSelectedOutcome={defaultSelectedOutcome}
            /> */

import Styles from 'modules/market/components/market-liquidity/market-liquidity.styles'

export default class MarketLiquidity extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      liquidityState: {},
    }
  }

  render() {
    const { pendingLiquidityOrders, marketId, market, } = this.props
    const { isOpen, liquidityState, } = this.state
    const defaultSelectedOutcome = (market && market.outcomes && market.outcomes[0] && market.outcomes[0].name) || undefined

    return(
      <div 
      className={classNames(Styles.MarketLiquidity__container, {
        [Styles['MarketLiquidity__container-hidden']]: !pendingLiquidityOrders
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
          <div 
            className={Styles.MarketLiquidity__tableContainer}
          >
          </div>
        }
      </div>
    )
  }
}