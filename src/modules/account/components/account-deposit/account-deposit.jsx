import React, { Component } from 'react'
import PropTypes from 'prop-types'
import QRCode from 'qrcode.react'
import Clipboard from 'clipboard'
import TextFit from 'react-textfit'

import { augur } from 'services/augurjs'
import { Deposit as DepositIcon, Copy as CopyIcon } from 'modules/common/components/icons'

import Styles from 'modules/account/components/account-deposit/account-deposit.styles'

export default class AccountDeposit extends Component {
  static propTypes = {
    address: PropTypes.string.isRequired
  }

  shapeShiftOnClick(address, output) {
    return (e) => {
      e.preventDefault()
      const link = `https://shapeshift.io/shifty.html?destination=${address}&output=${output}`
      window.open(link, '1418115287605', 'width=700,height=500,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=0,left=0,top=0')
    }
  }

  componentDidMount() {
    const clipboard = new Clipboard('#copy_address') // eslint-disable-line
  }

  render() {
    const p = this.props
    const styleQR = {
      height: 'auto',
      width: '100%',
    }
    let shapeShiftConverter = <a href="https://shapeshift.io">Use Shapeshift</a>
    if (parseInt(augur.rpc.getNetworkID(), 10) === 1) {
      shapeShiftConverter = <div>
                              <button
                                onClick={this.shapeShiftOnClick(p.address, 'ETH')}
                                value={'https://shapeshift.io/shifty.html?destination=' + p.address + '&output=ETH'}
                                className={Styles.AccountDeposit__shapeShiftEthButton}
                              >
                                ShapeShift to ETH
                              </button>
                              <button
                                onClick={this.shapeShiftOnClick(p.address, 'REP')}
                                value={'https://shapeshift.io/shifty.html?destination=' + p.address + '&output=REP'}
                                className={Styles.AccountDeposit__shapeShiftRepButton}
                              >
                                ShapeShift to REP
                              </button>
                            </div>
    }

    return (
      <section className={Styles.AccountDeposit}>
        <div className={Styles.AccountDeposit__heading}>
          <h1>Account: Deposit</h1>
          { DepositIcon }
        </div>
        <div className={Styles.AccountDeposit__main}>
          <div className={Styles.AccountDeposit__description}>
            <p>
              DO NOT send real ETH or REP to this account. Augur is currently on Ethereum&#39;s Rinkeby testnet.
            </p>
            {shapeShiftConverter}
          </div>
          <div className={Styles.AccountDeposit__address}>
            <h3 className={Styles.AccountDeposit__addressLabel}>
                Public Account Address
            </h3>
            <TextFit mode="single" max={18}>
              <button
                id="copy_address"
                className={Styles.AccountDeposit__copyButtonElement}
                data-clipboard-text={p.address}
              >
                <span className={Styles.AccountDeposit__addressString}>
                  {p.address}
                </span>
                {CopyIcon}
              </button>
            </TextFit>
          </div>
          <div>
            <QRCode
              value={p.address}
              style={styleQR}
            />
          </div>
        </div>
      </section>
    )
  }
}
