import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import BigNumber from 'bignumber.js'

import makePath from 'modules/routes/helpers/make-path'

import getValue from 'utils/get-value'

import { BID, ASK, MARKET, LIMIT } from 'modules/transactions/constants/types'
import { BINARY, CATEGORICAL, SCALAR } from 'modules/markets/constants/market-types'
import { ACCOUNT_DEPOSIT } from 'modules/routes/constants/views'

import FormStyles from 'modules/common/less/form'
import Styles from 'modules/market/components/market-trading/market-trading.styles'

const PRECISION = 4

class MarketTrading extends Component {
  constructor(props) {
    super(props)

    this.state = {
      orderType: LIMIT,
      orderPrice: '',
      orderQuantity: '',
      orderEstimate: '',
      selectedNav: BID,
      isOrderValide: false,
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.orderQuantity !== nextState.orderQuantity || this.state.orderPrice !== nextState.orderPrice) {
      let orderEstimate = ''
      if (nextState.orderQuantity instanceof BigNumber && nextState.orderPrice instanceof BigNumber) {
        orderEstimate = `${nextState.orderQuantity.times(nextState.orderPrice).toNumber()} ETH`
      }
      this.setState({ orderEstimate })
    }
  }

  render() {
    const s = this.state
    const p = this.props

    const hasFunds = getValue(p, 'market.tradeSummary.hasUserEnoughFunds')
    const hasSelectedOutcome = p.selectedOutcomes.length > 0
    const selectedOutcome = p.outcomes.filter(outcome => outcome.id === p.selectedOutcomes[0])[0]

    let initialMessage = ''

    switch(true) {
      case p.market.marketType === SCALAR:
        initialMessage = false
        break
      case !p.isLogged:
        initialMessage = 'Log in to trade.'
        break
      case p.isLogged && !hasFunds:
        initialMessage = 'Add funds to begin trading.'
        break
      case p.isLogged && hasFunds && !hasSelectedOutcome:
        initialMessage = 'Select an outcome to begin placing an order.'
        break
      default:
        initialMessage = false
    }

    return (
      <section className={Styles.Trading}>
        <ul className={Styles['Trading__header']}>
          <li className={classNames({ [`${Styles.active}`]: s.selectedNav === BID })}>
            <button onClick={() => this.setState({ selectedNav: BID })}>Buy</button>
          </li>
          <li className={classNames({ [`${Styles.active}`]: s.selectedNav === ASK })}>
            <button onClick={() => this.setState({ selectedNav: ASK })}>Sell</button>
          </li>
        </ul>
        { initialMessage &&
          <p className={Styles['Trading__initial-message']}>{ initialMessage }</p>
        }
        { initialMessage && p.isLogged && !hasFunds &&
          <Link className={Styles['Trading__button--add-funds']} to={makePath(ACCOUNT_DEPOSIT)}>Add Funds</Link>
        }
        { !initialMessage &&
          <ul className={Styles['Trading__form-body']}>
            <li>
              <label>Order Type</label>
              <div className={Styles.Trading__type}>
                  <button
                    className={classNames({ [`${Styles.active}`]: s.orderType === MARKET })}
                    onClick={() => this.setState({ orderType: MARKET })}
                  >Market</button>
                  <button
                    className={classNames({ [`${Styles.active}`]: s.orderType === LIMIT })}
                    onClick={() => this.setState({ orderType: LIMIT })}
                  >Limit</button>
              </div>
            </li>
            { p.market.marketType !== SCALAR &&
              <li>
                <label>Outcome</label>
                <div className={Styles['Trading__static-field']}>{ selectedOutcome.name }</div>
              </li>
            }
            <li>
              <label htmlFor="tr__input--quantity">Quantity</label>
              <input
                id="tr__input--quantity"
                type="number"
                step={10**-PRECISION}
                placeholder="0.0000 Shares"
                value={s.orderQuantity instanceof BigNumber ? s.orderQuantity.toNumber() : s.orderQuantity}
                onChange={e => this.setState({ orderQuantity: e.target.value })}
              />
            </li>
            <li>
              <label htmlFor="tr__input--limit-price">Limit Price</label>
              <input
                id="tr__input--limit-price"
                type="number"
                step={10**-PRECISION}
                placeholder="0.0000 ETH"
                value={s.orderPrice instanceof BigNumber ? s.orderPrice.toNumber() : s.orderPrice}
                onChange={e => this.setState({ orderPrice: e.target.value })}
              />
            </li>
            <li>
              <label>Est. Cost</label>
              <div className={Styles['Trading__static-field']}>{ s.orderEstimate }</div>
            </li>
            <li className={Styles['Trading__button--review']}>
              <button
                disabled={!s.isOrderValid}
                onClick={s.isOrderValid && this.handleAddOrder}
              >Review</button>
            </li>
          </ul>
        }
      </section>
    )
  }
}

export default MarketTrading
