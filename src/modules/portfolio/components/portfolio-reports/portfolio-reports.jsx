import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

import { formatAttoRep, formatEther } from 'utils/format-number'

import { MODAL_CLAIM_REPORTING_FEES } from 'modules/modal/constants/modal-types'
import Styles from 'modules/portfolio/components/portfolio-reports/portfolio-reports.styles'

export default class PortfolioReports extends Component {
  static propTypes = {
    universe: PropTypes.object.isRequired,
    reporter: PropTypes.string.isRequired,
    getReportingFees: PropTypes.func.isRequired,
    updateModal: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      unclaimedEth: {
        value: 0,
        formattedValue: 0,
        formatted: '-',
        roundedValue: 0,
        rounded: '-',
        minimized: '-',
        denomination: '',
        full: '-',
      },
      unclaimedRep: {
        value: 0,
        formattedValue: 0,
        formatted: '-',
        roundedValue: 0,
        rounded: '-',
        minimized: '-',
        denomination: '',
        full: '-',
      },
    }

    this.handleClaimReportingFeesNonforkedMarkets = this.handleClaimReportingFeesNonforkedMarkets.bind(this)
  }

  componentWillMount() {
    const {
      reporter,
      universe,
    } = this.props
    this.props.getReportingFees(universe.id, reporter, (err, result) => {
      if (err) {
        this.setState({
          unclaimedEth: formatEther(0, { decimals: 4, zeroStyled: true }),
          unclaimedRep: formatAttoRep(0, { decimals: 4, zeroStyled: true }),
          feeWindows: [],
          forkedMarket: null,
          nonforkedMarkets: [],
        })
        return
      }

      this.setState({
        unclaimedEth: formatEther(result.total.unclaimedEth, { decimals: 4, zeroStyled: true }),
        unclaimedRep: formatAttoRep(result.total.unclaimedRepStaked, { decimals: 4, zeroStyled: true }),
        feeWindows: result.feeWindows,
        forkedMarket: result.forkedMarket,
        nonforkedMarkets: result.nonforkedMarkets,
      })
    })
  }

  handleClaimReportingFeesNonforkedMarkets() {
    const {
      unclaimedEth,
      unclaimedRep,
      feeWindows,
      forkedMarket,
      nonforkedMarkets,
    } = this.state
    this.props.updateModal({
      type: MODAL_CLAIM_REPORTING_FEES,
      unclaimedEth,
      unclaimedRep,
      feeWindows,
      forkedMarket,
      nonforkedMarkets,
      canClose: true,
    })
  }

  render() {
    const s = this.state

    let disableClaimReportingFeesNonforkedMarketsButton = ''
    if (s.unclaimedEth.formatted === '-' && s.unclaimedRep.formatted === '-') {
      disableClaimReportingFeesNonforkedMarketsButton = 'disabled'
    }

    return (
      <section className={Styles.PortfolioReports}>
        <Helmet>
          <title>Reporting</title>
        </Helmet>
        <h4>
          Claim all available stake and fees
        </h4>
        <div className={Styles.PortfolioReports__details}>
          <ul className={Styles.PortfolioReports__info}>
            <li><span>REP</span><span>{s.unclaimedRep.formatted}</span></li>
            <li><span>ETH</span><span>{s.unclaimedEth.formatted}</span></li>
          </ul>
          <button
            className={Styles.PortfolioReports__claim}
            disabled={disableClaimReportingFeesNonforkedMarketsButton}
            onClick={this.handleClaimReportingFeesNonforkedMarkets}
          >
            Claim
          </button>
        </div>
      </section>
    )
  }
}
