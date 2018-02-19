/* eslint jsx-a11y/label-has-for: 0 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import BigNumber from 'bignumber.js'

import { SCALAR } from 'modules/markets/constants/market-types'
import { isEqual } from 'lodash'
import { MARKET, LIMIT } from 'modules/transactions/constants/types'

import Styles from 'modules/market/components/market-trading--form/market-trading--form.styles'

class MarketTradingForm extends Component {
  static propTypes = {
    market: PropTypes.object.isRequired,
    marketType: PropTypes.string.isRequired,
    selectedNav: PropTypes.string.isRequired,
    orderType: PropTypes.string.isRequired,
    orderPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    orderQuantity: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    marketQuantity: PropTypes.string.isRequired,
    orderEstimate: PropTypes.string.isRequired,
    selectedOutcome: PropTypes.object.isRequired,
    nextPage: PropTypes.func.isRequired,
    updateState: PropTypes.func.isRequired,
    isMobile: PropTypes.bool.isRequired,
    minPrice: PropTypes.number.isRequired,
    maxPrice: PropTypes.number.isRequired,
    availableFunds: PropTypes.instanceOf(BigNumber).isRequired
  }

  constructor(props) {
    super(props)

    this.INPUT_TYPES = {
      QUANTITY: 'orderQuantity',
      PRICE: 'orderPrice',
      MARKET_ORDER_SIZE: 'marketOrderTotal'
    }
    this.DEFAULT_ERROR_STATE = {
      [this.INPUT_TYPES.QUANTITY]: [],
      [this.INPUT_TYPES.PRICE]: [],
      [this.INPUT_TYPES.MARKET_ORDER_SIZE]: [],
    }

    this.state = {
      [this.INPUT_TYPES.QUANTITY]: '',
      [this.INPUT_TYPES.PRICE]: '',
      [this.INPUT_TYPES.MARKET_ORDER_SIZE]: '',
      errors: this.DEFAULT_ERROR_STATE,
      isOrderValid: false
    }
    this.orderValidation = this.orderValidation.bind(this)
    this.testQuantity = this.testQuantity.bind(this)
    this.testPrice = this.testPrice.bind(this)
    this.testMarketOrderSize = this.testMarketOrderSize.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const newStateInfo = {
      [this.INPUT_TYPES.QUANTITY]: nextProps[this.INPUT_TYPES.QUANTITY],
      [this.INPUT_TYPES.PRICE]: nextProps[this.INPUT_TYPES.PRICE],
      [this.INPUT_TYPES.MARKET_ORDER_SIZE]: nextProps[this.INPUT_TYPES.MARKET_ORDER_SIZE],
    }
    const currentStateInfo = {
      [this.INPUT_TYPES.QUANTITY]: this.state[this.INPUT_TYPES.QUANTITY],
      [this.INPUT_TYPES.PRICE]: this.state[this.INPUT_TYPES.PRICE],
      [this.INPUT_TYPES.MARKET_ORDER_SIZE]: this.state[this.INPUT_TYPES.MARKET_ORDER_SIZE],
    }
    const newInfo = {
      marketQuantity: nextProps.marketQuantity,
      orderType: nextProps.orderType,
      orderEstimate: nextProps.orderEstimate,
      ...newStateInfo,
    }
    const currentInfo = {
      marketQuantity: this.props.marketQuantity,
      orderType: this.props.orderType,
      orderEstimate: this.props.orderEstimate,
      ...currentStateInfo,
    }

    if (!isEqual(newInfo, currentInfo)) {
      const nextTrade = nextProps.selectedOutcome.trade
      const prevTrade = this.props.selectedOutcome.trade
      if ((nextProps.orderType === LIMIT || (nextProps.orderType === MARKET && nextProps.marketType === SCALAR)) && (prevTrade.limitPrice === null && nextTrade.limitPrice !== null)) {
        // if limitPrice input hasn't been changed and we have defaulted the limitPrice, populate the field so as to not confuse the user.
        this.props.updateState(this.INPUT_TYPES.PRICE, new BigNumber(nextTrade.limitPrice))
      }
      // orderValidation
      const { isOrderValid, errors } = this.orderValidation(newStateInfo, nextProps)
      // update state
      this.setState({ ...newStateInfo, errors, isOrderValid })
    }
  }

  testQuantity(value, errors, isOrderValid) {
    let errorCount = 0
    let passedTest = !!isOrderValid
    if (isNaN(value)) return { isOrderValid: false, errors, errorCount }
    if (value.lt(0)) {
      errorCount += 1
      passedTest = false
      errors[this.INPUT_TYPES.QUANTITY].push('Quantity must be greater than 0')
    }
    return { isOrderValid: passedTest, errors, errorCount }
  }

  testPrice(value, errors, isOrderValid) {
    let errorCount = 0
    let passedTest = !!isOrderValid
    if (isNaN(value)) return { isOrderValid: false, errors, errorCount }
    if (value.lt(this.props.minPrice) || value.gt(this.props.maxPrice)) {
      errorCount += 1
      passedTest = false
      errors[this.INPUT_TYPES.PRICE].push(`Price must be between ${this.props.minPrice} - ${this.props.maxPrice}`)
    }
    return { isOrderValid: passedTest, errors, errorCount }
  }

  testMarketOrderSize(value, errors, isOrderValid) {
    let errorCount = 0
    let passedTest = !!isOrderValid
    if (isNaN(value)) return { isOrderValid: false, errors, errorCount }
    if (value.gt(this.props.availableFunds)) {
      errorCount += 1
      passedTest = false
      errors[this.INPUT_TYPES.MARKET_ORDER_SIZE].push(`Cannot exceed account ETH balance of ${this.props.availableFunds.toNumber()}`)
    }
    if (value.lt(0)) {
      errorCount += 1
      passedTest = false
      errors[this.INPUT_TYPES.MARKET_ORDER_SIZE].push(`Cannot be a negative number`)
    }
    return { isOrderValid: passedTest, errors, errorCount }
  }

  orderValidation(order, propsToUse) {
    let { props } = this
    if (!propsToUse) props = propsToUse
    let cumulativeErrors = {
      [this.INPUT_TYPES.QUANTITY]: [],
      [this.INPUT_TYPES.PRICE]: [],
      [this.INPUT_TYPES.MARKET_ORDER_SIZE]: [],
    }
    let cumulativeOrderValid = true
    let cumulativeErrorCount = 0
    const { orderType, marketType } = props
    if (orderType === MARKET) {
      let value = new BigNumber(order[this.INPUT_TYPES.MARKET_ORDER_SIZE])
      const { isOrderValid, errors, errorCount } = this.testMarketOrderSize(value, cumulativeErrors, cumulativeOrderValid)
      cumulativeOrderValid = isOrderValid
      cumulativeErrorCount += errorCount
      cumulativeErrors = { ...cumulativeErrors, ...errors }

      if (marketType === SCALAR) {
        value = new BigNumber(order[this.INPUT_TYPES.PRICE])
        const { isOrderValid, errors, errorCount } = this.testPrice(value, cumulativeErrors, cumulativeOrderValid)
        cumulativeOrderValid = isOrderValid
        cumulativeErrorCount += errorCount
        cumulativeErrors = { ...cumulativeErrors, ...errors }
      }
    } else {
      let value = new BigNumber(order[this.INPUT_TYPES.QUANTITY])
      const { isOrderValid, errors, errorCount } = this.testQuantity(value, cumulativeErrors, cumulativeOrderValid)
      cumulativeOrderValid = isOrderValid
      cumulativeErrorCount += errorCount
      cumulativeErrors = { ...cumulativeErrors, ...errors }

      value = new BigNumber(order[this.INPUT_TYPES.PRICE])

      const { isOrderValid: priceValid, errors: priceErrors, errorCount: priceCount } = this.testPrice(value, cumulativeErrors, cumulativeOrderValid)
      cumulativeOrderValid = priceValid
      cumulativeErrorCount += priceCount
      cumulativeErrors = { ...cumulativeErrors, ...priceErrors }
    }
    return { isOrderValid: cumulativeOrderValid, errors: cumulativeErrors, errorCount: cumulativeErrorCount }
  }

  validateForm(property, rawValue) {
    let value = rawValue
    if (!(value instanceof BigNumber) && value !== '') value = new BigNumber(value)
    const { orderType, marketType } = this.props
    const updatedState = {
      ...this.state,
      [property]: value
    }
    const { isOrderValid, errors, errorCount } = this.orderValidation(updatedState, this.props)
    this.props.updateState(property, value)

    if (errorCount === 0) {
      const side = this.props.selectedNav
      const maxCost = updatedState[this.INPUT_TYPES.MARKET_ORDER_SIZE]
      let limitPrice = 0
      let shares = 0

      if (orderType === MARKET) {
        limitPrice = (marketType === SCALAR && !isNaN(updatedState[this.INPUT_TYPES.PRICE])) ? updatedState[this.INPUT_TYPES.PRICE] : null

        this.props.selectedOutcome.trade.updateTradeOrder(shares, limitPrice, side, maxCost)
      } else {
        shares = updatedState[this.INPUT_TYPES.QUANTITY]
        limitPrice = updatedState[this.INPUT_TYPES.PRICE]

        this.props.selectedOutcome.trade.updateTradeOrder(shares, limitPrice, side)
      }
    }
    this.setState({
      errors: {
        ...this.state.errors,
        ...errors
      },
      [property]: value,
      isOrderValid
    })
  }

  render() {
    const p = this.props
    const s = this.state

    const tickSize = parseFloat(p.market.tickSize)
    const errors = Array.from(new Set([...s.errors[this.INPUT_TYPES.QUANTITY], ...s.errors[this.INPUT_TYPES.PRICE], ...s.errors[this.INPUT_TYPES.MARKET_ORDER_SIZE]]))

    return (
      <ul className={Styles['TradingForm__form-body']}>
        <li>
          <label>Order Type</label>
          <div className={Styles.TradingForm__type}>
            <button
              className={classNames({ [`${Styles.active}`]: p.orderType === MARKET })}
              onClick={() => p.updateState('orderType', MARKET)}
            >Market
            </button>
            <button
              className={classNames({ [`${Styles.active}`]: p.orderType === LIMIT })}
              onClick={() => p.updateState('orderType', LIMIT)}
            >Limit
            </button>
          </div>
        </li>
        { p.orderType === LIMIT && !p.isMobile && p.market.marketType !== SCALAR &&
          <li>
            <label>Outcome</label>
            <div className={Styles['TradingForm__static-field']}>{ p.selectedOutcome.name }</div>
          </li>
        }
        { p.orderType === MARKET &&
          <li>
            <label htmlFor="tr__input--total-cost">Total Cost</label>
            <input
              className={classNames({ [`${Styles.error}`]: s.errors[this.INPUT_TYPES.MARKET_ORDER_SIZE].length })}
              id="tr__input--total-cost"
              type="number"
              step={tickSize}
              placeholder={`${tickSize} ETH`}
              value={s[this.INPUT_TYPES.MARKET_ORDER_SIZE] instanceof BigNumber ? s[this.INPUT_TYPES.MARKET_ORDER_SIZE].toNumber() : s[this.INPUT_TYPES.MARKET_ORDER_SIZE]}
              onChange={e => this.validateForm(this.INPUT_TYPES.MARKET_ORDER_SIZE, e.target.value)}
            />
          </li>
        }
        { p.orderType === LIMIT &&
          <li>
            <label htmlFor="tr__input--quantity">Quantity</label>
            <input
              className={classNames({ [`${Styles.error}`]: s.errors[this.INPUT_TYPES.QUANTITY].length })}
              id="tr__input--quantity"
              type="number"
              step={tickSize}
              placeholder={`${tickSize} Shares`}
              value={s[this.INPUT_TYPES.QUANTITY] instanceof BigNumber ? s[this.INPUT_TYPES.QUANTITY].toNumber() : s[this.INPUT_TYPES.QUANTITY]}
              onChange={e => this.validateForm(this.INPUT_TYPES.QUANTITY, e.target.value)}
            />
          </li>
        }
        { p.orderType === LIMIT &&
          <li>
            <label htmlFor="tr__input--limit-price">Limit Price</label>
            <input
              className={classNames({ [`${Styles.error}`]: s.errors[this.INPUT_TYPES.PRICE].length })}
              id="tr__input--limit-price"
              type="number"
              step={tickSize}
              placeholder={`${tickSize} ETH`}
              value={s[this.INPUT_TYPES.PRICE] instanceof BigNumber ? s[this.INPUT_TYPES.PRICE].toNumber() : s[this.INPUT_TYPES.PRICE]}
              onChange={e => this.validateForm(this.INPUT_TYPES.PRICE, e.target.value)}
            />
          </li>
        }
        { p.market.marketType === SCALAR && p.orderType === MARKET &&
          <li>
            <label htmlFor="tr__input--limit-price-market">Price</label>
            <input
              className={classNames({ [`${Styles.error}`]: s.errors[this.INPUT_TYPES.PRICE].length })}
              id="tr__input--limit-price-market"
              type="number"
              step={tickSize}
              placeholder={`${tickSize} ETH`}
              value={s[this.INPUT_TYPES.PRICE] instanceof BigNumber ? s[this.INPUT_TYPES.PRICE].toNumber() : s[this.INPUT_TYPES.PRICE]}
              onChange={e => this.validateForm(this.INPUT_TYPES.PRICE, e.target.value)}
            />
          </li>
        }
        { p.orderType === LIMIT &&
          <li>
            <label>Est. Cost</label>
            <div className={Styles['TradingForm__static-field']}>{ p.orderEstimate }</div>
          </li>
        }
        { p.orderType === MARKET &&
          <li>
            <label>Quantity</label>
            <div className={Styles['TradingForm__static-field']}>{ p.marketQuantity }</div>
          </li>
        }
        { errors.length > 0 &&
          <li className={Styles['TradingForm__error-message']}>
            { errors.map(error => <p key={error}>{error}</p>) }
          </li>
        }
        <li className={Styles['TradingForm__button--review']}>
          <button
            disabled={(!s.isOrderValid)}
            onClick={s.isOrderValid ? p.nextPage : undefined}
          >Review
          </button>
        </li>
      </ul>
    )
  }
}

export default MarketTradingForm
