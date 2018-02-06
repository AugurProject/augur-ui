import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MarketTradingWrapper from 'modules/market/components/market-trading--wrapper/market-trading--wrapper'
import { Check, Close } from 'modules/common/components/icons/icons'
import { isEqual } from 'lodash'

import BigNumber from 'bignumber.js'

import { CATEGORICAL } from 'modules/markets/constants/market-types'

import Styles from 'modules/market/components/market-trading/market-trading.styles'

class MarketTrading extends Component {
  static propTypes = {
    market: PropTypes.object.isRequired,
    availableFunds: PropTypes.instanceOf(BigNumber).isRequired,
    isLogged: PropTypes.bool.isRequired,
    selectedOutcomes: PropTypes.array.isRequired,
    isMobile: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)
    console.log('marketTrading Constructor', (props.market.marketType === CATEGORICAL ? null : props.market.outcomes.find(outcome => outcome.id === '1')));
    this.state = {
      showForm: false,
      showOrderPlaced: false,
      selectedOutcome: props.market.marketType === CATEGORICAL ? null : props.market.outcomes.find(outcome => outcome.id === '1')
    }

    this.toggleForm = this.toggleForm.bind(this)
    this.toggleShowOrderPlaced = this.toggleShowOrderPlaced.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.selectedOutcomes, nextProps.selectedOutcomes) || !isEqual(this.props.market.outcomes, nextProps.market.outcomes)) {
      if (nextProps.selectedOutcomes.length === 1 && nextProps.market.marketType === CATEGORICAL) {
        this.setState({
          selectedOutcome: nextProps.market.outcomes.find(outcome => outcome.id === nextProps.selectedOutcomes[0])
        })
      } else {
        this.setState({
          selectedOutcome: nextProps.market.marketType === CATEGORICAL ? null : nextProps.market.outcomes.find(outcome => outcome.id === '1')
        })
      }
    }
  }

  toggleForm() {
    this.setState({ showForm: !this.state.showForm })
  }

  toggleShowOrderPlaced() {
    this.setState({ showOrderPlaced: !this.state.showOrderPlaced })
  }

  render() {
    const s = this.state
    const p = this.props

    const hasFunds = p.availableFunds.gt(0)
    const hasSelectedOutcome = s.selectedOutcome !== null

    let initialMessage = ''

    switch (true) {
      case !p.isLogged:
        initialMessage = 'Log in to trade.'
        break
      case p.isLogged && !hasFunds:
        initialMessage = 'Add funds to begin trading.'
        break
      case p.isLogged && hasFunds && p.market.marketType !== CATEGORICAL:
        initialMessage = false
        break;
      case p.isLogged && hasFunds && !hasSelectedOutcome:
        initialMessage = 'Select an outcome to begin placing an order.'
        break
      default:
        initialMessage = false
    }

    return (
      <section className={Styles.Trading}>
        { (!p.isMobile || (p.isMobile && s.showForm)) &&
          <MarketTradingWrapper
            market={p.market}
            isLogged={p.isLogged}
            selectedOutcome={s.selectedOutcome}
            initialMessage={initialMessage}
            isMobile={p.isMobile}
            toggleForm={this.toggleForm}
            toggleShowOrderPlaced={this.toggleShowOrderPlaced}
            availableFunds={p.availableFunds}
          />
        }
        { p.isMobile && hasSelectedOutcome && initialMessage &&
          <div className={Styles['Trading__initial-message']}>
            <p>{ initialMessage }</p>
          </div>
        }
        { p.isMobile && hasSelectedOutcome && !initialMessage && !s.showForm && // this needs to be changed to use p.selectedOutcome (should only show on mobile when an outcome has been selected)
          <div className={Styles['Trading__button--trade']}>
            <button onClick={this.toggleForm}>Trade</button>
          </div>
        }
        { s.showOrderPlaced &&
          <div className={Styles['Trading__button--order-placed']}>
            <span>{ Check } Order placed!</span>
            <button onClick={e => this.toggleShowOrderPlaced()}>{ Close }</button>
          </div>
        }
      </section>
    )
  }
}

export default MarketTrading
