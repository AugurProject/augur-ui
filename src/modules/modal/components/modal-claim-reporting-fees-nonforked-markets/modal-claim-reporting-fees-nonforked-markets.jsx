import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { augur } from 'services/augurjs'
import { formatGasCostToEther } from 'utils/format-number'

import Styles from 'modules/modal/components/modal-claim-reporting-fees-nonforked-markets/modal-claim-reporting-fees-nonforked-markets.styles'

export default class ModalClaimReportingFeesNonforkedMarkets extends Component {
  static propTypes = {
    claimReportingFeesNonforkedMarkets: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    recipient: PropTypes.string.isRequired,
    feeWindows: PropTypes.array.isRequired,
    nonforkedMarkets: PropTypes.array.isRequired,
    unclaimedEth: PropTypes.object.isRequired,
    unclaimedRep: PropTypes.object.isRequired,
    forkedMarket: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.state = {
      ClaimReportingFeesNonforkedMarketsGasEstimate: '0',
    }

    this.handleClaimReportingFeesNonforkedMarkets = this.handleClaimReportingFeesNonforkedMarkets.bind(this)
  }

  componentWillMount() {
    const options = {
      feeWindows: this.props.feeWindows,
      forkedMarket: this.props.forkedMarket,
      nonforkedMarkets: this.props.nonforkedMarkets,
      estimateGas: true,
    }
    this.props.claimReportingFeesNonforkedMarkets(options, (err, result) => {
      if (err) {
        // Default to 0 for now if we recieve an error.
        const claimReportingFeesNonforkedMarketsGasEstimate = '0'
        const gasPrice = augur.rpc.getGasPrice()
        this.setState({
          ClaimReportingFeesNonforkedMarketsGasEstimate: formatGasCostToEther(claimReportingFeesNonforkedMarketsGasEstimate, { decimalsRounded: 4 }, gasPrice),
        })
      } else {
        const claimReportingFeesNonforkedMarketsGasEstimate = result.gasEstimates.totals.all.toString()
        const gasPrice = augur.rpc.getGasPrice()
        this.setState({
          ClaimReportingFeesNonforkedMarketsGasEstimate: formatGasCostToEther(claimReportingFeesNonforkedMarketsGasEstimate, { decimalsRounded: 4 }, gasPrice),
        })
      }
    })
  }

  handleClaimReportingFeesNonforkedMarkets(e) {
    e.preventDefault()
    const options = {
      feeWindows: this.props.feeWindows,
      forkedMarket: this.props.forkedMarket,
      nonforkedMarkets: this.props.nonforkedMarkets,
      estimateGas: false,
    }
    this.props.claimReportingFeesNonforkedMarkets(options, (err, result) => {
      this.props.closeModal()
    })
  }

  render() {
    const {
      recipient,
      unclaimedRep,
      unclaimedEth,
    } = this.props
    const s = this.state

    // In theory, this modal should never be shown if there is no unclaimed ETH/REP, but check whether button should be disabled anyway.
    let disableClaimReportingFeesNonforkedMarketsButton = ''
    if (unclaimedRep.formatted === '-' && unclaimedEth.formatted === '-') {
      disableClaimReportingFeesNonforkedMarketsButton = 'disabled'
    }

    return (
      <form
        className={Styles.ModalClaimReportingFeesNonforkedMarkets__form}
        onSubmit={this.handleClaimReportingFeesNonforkedMarkets}
      >
        <div className={Styles.ModalClaimReportingFeesNonforkedMarkets__heading}>
          <h1>Review Withdrawl</h1>
        </div>
        <div className={Styles.ModalClaimReportingFeesNonforkedMarkets__details}>
          <ul className={Styles.ModalClaimReportingFeesNonforkedMarkets__info}>
            <li><span>Recipient</span><span>{recipient}</span></li>
            <li><span>Rep</span><span>{unclaimedRep.formatted}</span></li>
            <li><span>Eth</span><span>{unclaimedEth.formatted}</span></li>
            <li><span>Gas</span><span>{s.ClaimReportingFeesNonforkedMarketsGasEstimate}</span></li>
          </ul>
        </div>
        <div className={Styles.ModalClaimReportingFeesNonforkedMarkets__message}>
          Transferring all funds may require multiple signed transactions.
        </div>
        <div className={Styles.ModalClaimReportingFeesNonforkedMarkets__actions}>
          <button
            className={Styles.ModalClaimReportingFeesNonforkedMarkets__button}
            disabled={disableClaimReportingFeesNonforkedMarketsButton}
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    )
  }
}
