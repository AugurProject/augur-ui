import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  LedgerEthereum,
  BrowserLedgerConnectionFactory
} from "ethereumjs-ledger";

import * as LEDGER_STATES from "modules/auth/constants/ledger-status";
import DerivationPath, {
  DEFAULT_DERIVATION_PATH,
  NUM_DERIVATION_PATHS_TO_DISPLAY
} from "modules/auth/helpers/derivation-path";

import { Alert } from "modules/common/components/icons";
import getEtherBalance from "modules/auth/actions/get-ether-balance";
import Spinner from "modules/common/components/spinner/spinner";
import formatAddress from "modules/auth/helpers/format-address";
import Styles from "modules/auth/components/ledger-connect/ledger-connect.styles";

export default class Ledger extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    loginWithLedger: PropTypes.func.isRequired,
    networkId: PropTypes.number.isRequired,
    updateLedgerStatus: PropTypes.func.isRequired,
    ledgerStatus: PropTypes.string.isRequired,
    onConnectLedgerRequest: PropTypes.func.isRequired,
    onOpenEthereumAppRequest: PropTypes.func.isRequired,
    onSwitchLedgerModeRequest: PropTypes.func.isRequired,
    onEnableContractSupportRequest: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.LedgerEthereum = null;

    this.state = {
      displayInstructions: false,
      baseDerivationPath: DEFAULT_DERIVATION_PATH,
      ledgerAddresses: new Array(NUM_DERIVATION_PATHS_TO_DISPLAY).fill(null),
      ledgerAddressBalances: {}
    };

    this.connectLedger = this.connectLedger.bind(this);
    this.updateDisplayInstructions = this.updateDisplayInstructions.bind(this);
    this.onConnectLedgerRequestHook = this.onConnectLedgerRequestHook.bind(
      this
    );
    this.onOpenEthereumAppRequestHook = this.onOpenEthereumAppRequestHook.bind(
      this
    );
    this.onSwitchLedgerModeRequestHook = this.onSwitchLedgerModeRequestHook.bind(
      this
    );
    this.onEnableContractSupportRequestHook = this.onEnableContractSupportRequestHook.bind(
      this
    );
    this.onDerivationPathChange = this.onDerivationPathChange.bind(this);
    this.derivationPath = this.derivationPath.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  componentDidMount() {
    if (this.state.ledgerAddresses.some(a => a === null)) {
      this.onDerivationPathChange(this.state.baseDerivationPath).catch(() =>
        this.props.updateLedgerStatus(LEDGER_STATES.OTHER_ISSUE)
      );
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.ledgerStatus !== nextProps.ledgerStatus) {
      if (
        nextProps.ledgerStatus !== LEDGER_STATES.NOT_CONNECTED &&
        nextProps.ledgerStatus !== LEDGER_STATES.ATTEMPTING_CONNECTION
      ) {
        this.updateDisplayInstructions(true);
      } else {
        this.updateDisplayInstructions(false);
      }
    }
  }

  async onConnectLedgerRequestHook() {
    this.props.onConnectLedgerRequest();
  }

  async onOpenEthereumAppRequestHook() {
    this.props.onOpenEthereumAppRequest();
  }

  async onSwitchLedgerModeRequestHook() {
    this.props.onSwitchLedgerModeRequest();
  }

  async onEnableContractSupportRequestHook() {
    this.props.onEnableContractSupportRequest();
  }

  async onDerivationPathChange(derivationPath) {
    const { networkId } = this.props;
    this.props.updateLedgerStatus(LEDGER_STATES.ATTEMPTING_CONNECTION);

    if (location.protocol !== "https:") {
      this.props.updateLedgerStatus(LEDGER_STATES.OTHER_ISSUE);
    }

    this.setState({ baseDerivationPath: derivationPath });

    const ledgerEthereum = new LedgerEthereum(
      networkId,
      BrowserLedgerConnectionFactory,
      this.onConnectLedgerRequestHook,
      this.onOpenEthereumAppRequestHook,
      this.onSwitchLedgerModeRequestHook,
      this.onEnableContractSupportRequestHook
    );

    const components = DerivationPath.parse(derivationPath);
    const addresses = await Promise.all(
      Array.from(Array(NUM_DERIVATION_PATHS_TO_DISPLAY).keys()).map(i =>
        ledgerEthereum.getAddressByBip32Path(
          DerivationPath.buildString(DerivationPath.increment(components, i))
        )
      )
    );

    if (addresses) {
      this.setState({ ledgerAddresses: addresses });
      addresses.map(address => this.updateAccountBalance(address));
    }

    this.props.updateLedgerStatus(LEDGER_STATES.NOT_CONNECTED);
  }

  updateDisplayInstructions(displayInstructions) {
    this.setState({ displayInstructions });
  }

  updateAccountBalance(address) {
    getEtherBalance(address, (err, balance) => {
      if (!err) this.state.ledgerAddressBalances[address] = balance || 0;
    });
  }

  async connectLedger(pathIndex) {
    const { loginWithLedger, networkId } = this.props;
    this.props.updateLedgerStatus(LEDGER_STATES.ATTEMPTING_CONNECTION);

    if (location.protocol !== "https:") {
      this.props.updateLedgerStatus(LEDGER_STATES.OTHER_ISSUE);
    }

    const ledgerEthereum = new LedgerEthereum(
      networkId,
      BrowserLedgerConnectionFactory,
      this.onConnectLedgerRequestHook,
      this.onOpenEthereumAppRequestHook,
      this.onSwitchLedgerModeRequestHook,
      this.onEnableContractSupportRequestHook
    );

    const derivationPath = this.derivationPath(pathIndex);
    const address = await ledgerEthereum.getAddressByBip32Path(derivationPath);

    if (address) {
      return loginWithLedger(
        address.toLowerCase(),
        ledgerEthereum,
        derivationPath
      );
    }

    this.props.updateLedgerStatus(LEDGER_STATES.OTHER_ISSUE);
  }

  derivationPath(pathIndex) {
    return DerivationPath.buildString(
      DerivationPath.increment(
        DerivationPath.parse(this.state.baseDerivationPath),
        pathIndex
      )
    );
  }

  next() {
    console.log("next", this.state.baseDerivationPath);
  }

  previous() {
    console.log("previous", this.state.baseDerivationPath);
  }

  render() {
    const { ledgerStatus, updateLedgerStatus } = this.props;
    const s = this.state;

    return (
      <section className={Styles.LedgerConnect}>
        <div className={Styles.LedgerConnect__action}>
          <input
            type="text"
            defaultValue={s.baseDerivationPath}
            onChange={e => {
              this.onDerivationPathChange(e.target.value).catch(() =>
                updateLedgerStatus(LEDGER_STATES.OTHER_ISSUE)
              );
            }}
          />

          {this.state.ledgerAddresses.some(a => a !== null) && (
            <div>
              {Array.from(Array(NUM_DERIVATION_PATHS_TO_DISPLAY).keys()).map(
                i => (
                  <div key={i} className={Styles.Ledger__address__balances}>
                    <div className={Styles.Ledger__addresses}>
                      <label
                        onClick={() => this.connectLedger(i)}
                        htmlFor={`ledger-address-${i}`}
                      >
                        {formatAddress(s.ledgerAddresses[i])}
                      </label>
                    </div>
                    <div className={Styles.Ledger__balances}>
                      <label>
                        {this.state.ledgerAddressBalances[s.ledgerAddresses[i]]}
                      </label>
                    </div>
                  </div>
                )
              )}
              <div className={Styles.LedgerConnect__buttons}>
                <button
                  type="button"
                  className={Styles.LedgerConnect__button}
                  onClick={this.previous}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className={Styles.LedgerConnect__button}
                  onClick={this.next}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {ledgerStatus === LEDGER_STATES.ATTEMPTING_CONNECTION && (
            <Spinner light />
          )}
        </div>
        {s.displayInstructions && (
          <div className={Styles.LedgerConnect__messages}>
            {Alert}
            <h3>Make sure you have: </h3>
            <ul>
              <li>Accessed Augur via HTTPS</li>
              <li>Connected your Ledger</li>
              <li>Opened the Ethereum App</li>
              <li>Enabled Contract Data</li>
              <li>Enabled Browser Support</li>
            </ul>
          </div>
        )}
      </section>
    );
  }
}
