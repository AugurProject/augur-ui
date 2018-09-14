import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  LedgerEthereum,
  BrowserLedgerConnectionFactory
} from "ethereumjs-ledger";

import * as LEDGER_STATES from "modules/auth/constants/ledger-status";
import {
  DEFAULT_DERIVATION_PATH,
  NUM_DERIVATION_PATHS_TO_DISPLAY
} from "modules/auth/constants/derivation-path";

import { Alert } from "modules/common/components/icons";

import Spinner from "modules/common/components/spinner/spinner";

import Styles from "modules/auth/components/ledger-connect/ledger-connect.styles";

import DerivationPath from "modules/auth/helpers/derivation-path";

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
      pathIndex: 0,
      ledgerAddresses: new Array(NUM_DERIVATION_PATHS_TO_DISPLAY).fill(null)
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
    this.onPathIndexChange = this.onPathIndexChange.bind(this);
    this.derivationPath = this.derivationPath.bind(this);
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
    }

    this.props.updateLedgerStatus(LEDGER_STATES.NOT_CONNECTED);
  }

  onPathIndexChange(e) {
    this.setState({ pathIndex: parseInt(e.target.value, 10) });
  }

  updateDisplayInstructions(displayInstructions) {
    this.setState({ displayInstructions });
  }

  async connectLedger() {
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

    const derivationPath = this.derivationPath();
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

  derivationPath() {
    return DerivationPath.buildString(
      DerivationPath.increment(
        DerivationPath.parse(this.state.baseDerivationPath),
        this.state.pathIndex
      )
    );
  }

  render() {
    const { ledgerStatus, updateLedgerStatus } = this.props;
    const s = this.state;

    return (
      <section className={Styles.LedgerConnect}>
        <div className={Styles.LedgerConnect__action}>
          <form
            onSubmit={e => {
              e.preventDefault();
              this.connectLedger().catch(() =>
                updateLedgerStatus(LEDGER_STATES.OTHER_ISSUE)
              );
            }}
          >
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
                    <ul key={i}>
                      <li>
                        <input
                          type="radio"
                          name="ledger-address"
                          value={i}
                          id={`ledger-address-${i}`}
                          checked={this.state.pathIndex === i}
                          onChange={this.onPathIndexChange}
                        />
                      </li>
                      <li>
                        <label htmlFor={`ledger-address-${i}`}>
                          {s.ledgerAddresses[i]}
                        </label>
                      </li>
                    </ul>
                  )
                )}
              </div>
            )}

            <button className={Styles.LedgerConnect__button} type="submit">
              {ledgerStatus !== LEDGER_STATES.ATTEMPTING_CONNECTION ? (
                "Connect Ledger"
              ) : (
                <Spinner light />
              )}
            </button>
          </form>
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
