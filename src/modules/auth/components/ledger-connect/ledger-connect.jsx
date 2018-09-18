import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  LedgerEthereum,
  BrowserLedgerConnectionFactory
} from "ethereumjs-ledger";

import DerivationPath, {
  DEFAULT_DERIVATION_PATH,
  NUM_DERIVATION_PATHS_TO_DISPLAY
} from "modules/auth/helpers/derivation-path";
import classNames from "classnames";
import getEtherBalance from "modules/auth/actions/get-ether-balance";
import Styles from "modules/auth/components/ledger-connect/ledger-connect.styles";
import ToggleHeightStyles from "utils/toggle-height/toggle-height.styles";
import AddressPickerContent from "modules/auth/components/common/address-picker-content";
import DerivationPathEditor from "modules/auth/components/common/derivation-path-editor";
import toggleHeight from "utils/toggle-height/toggle-height";
import { ERROR_TYPES } from "modules/auth/constants/connect-nav";

export default class Ledger extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    loginWithLedger: PropTypes.func.isRequired,
    networkId: PropTypes.number.isRequired,
    ledgerStatus: PropTypes.string.isRequired,
    dropdownItem: PropTypes.object,
    showAdvanced: PropTypes.bool,
    showError: PropTypes.func.isRequired,
    hideError: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.LedgerEthereum = null;

    this.state = {
      displayInstructions: true,
      baseDerivationPath: DEFAULT_DERIVATION_PATH,
      ledgerAddresses: new Array(NUM_DERIVATION_PATHS_TO_DISPLAY).fill(null),
      ledgerAddressBalances: {},
      ledgerAddressPageNumber: 1
    };

    this.connectLedger = this.connectLedger.bind(this);
    this.updateDisplayInstructions = this.updateDisplayInstructions.bind(this);
    this.onDerivationPathChange = this.onDerivationPathChange.bind(this);
    this.buildDerivationPath = this.buildDerivationPath.bind(this);
    this.next = this.next.bind(this);
    this.ledgerValidation = this.ledgerValidation.bind(this);
    this.previous = this.previous.bind(this);
    this.validatePath = this.validatePath.bind(this);

    const { networkId } = this.props;

    this.state.ledgerEthereum = new LedgerEthereum(
      networkId,
      BrowserLedgerConnectionFactory
    );

    this.ledgerValidation();
  }

  componentDidMount() {
    if (this.state.ledgerAddresses.some(a => a === null)) {
      this.onDerivationPathChange(this.state.baseDerivationPath).catch(() =>
        this.updateDisplayInstructions(true)
      );
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (
      this.state.ledgerAddressPageNumber !== nextState.ledgerAddressPageNumber
    ) {
      this.onDerivationPathChange(
        this.state.baseDerivationPath,
        nextState.ledgerAddressPageNumber
      );
    }

    if (this.props.showAdvanced !== nextProps.showAdvanced) {
      this.showAdvanced(this.props.showAdvanced);
    }

    if (this.state.displayInstructions !== nextState.displayInstructions) {
      this.updateDisplayInstructions(nextState.displayInstructions);
    }
  }

  async onDerivationPathChange(derivationPath, pageNumber = 1) {
    const { ledgerEthereum } = this.state;

    this.updateDisplayInstructions(false);

    this.setState({
      baseDerivationPath: derivationPath
    });

    const components = DerivationPath.parse(derivationPath);
    const numberOfAddresses = NUM_DERIVATION_PATHS_TO_DISPLAY * pageNumber;
    const addresses = await Promise.all(
      Array.from(Array(numberOfAddresses).keys()).map(i =>
        ledgerEthereum
          .getAddressByBip32Path(
            DerivationPath.buildString(DerivationPath.increment(components, i))
          )
          .catch(() => this.updateDisplayInstructions(true))
      )
    );

    if (addresses) {
      this.setState({ ledgerAddresses: addresses });
      return addresses.map(address => this.updateAccountBalance(address));
    }

    this.updateDisplayInstructions(true);
  }

  ledgerValidation() {
    if (location.protocol !== "https:") {
      this.updateDisplayInstructions(true);
    }
  }

  updateDisplayInstructions(displayInstructions) {
    this.setState({ displayInstructions });
  }

  updateAccountBalance(address) {
    if (!this.state.ledgerAddressBalances[address] && address) {
      getEtherBalance(address, (err, balance) => {
        if (!err) {
          const balances = {
            ...this.state.ledgerAddressBalances
          };
          balances[address] = balance || 0;

          this.setState({
            ledgerAddressBalances: balances
          });
        }
      });
    }
  }

  async connectLedger(pathIndex) {
    const { loginWithLedger } = this.props;
    const derivationPath = this.buildDerivationPath(pathIndex);
    const address = await this.state.ledgerEthereum.getAddressByBip32Path(
      this.state.derivationPath
    );

    if (address) {
      return loginWithLedger(
        address.toLowerCase(),
        this.state.ledgerEthereum,
        derivationPath
      );
    }

    this.updateDisplayInstructions(true);
  }

  buildDerivationPath(pathIndex) {
    return DerivationPath.buildString(
      DerivationPath.increment(
        DerivationPath.parse(this.state.baseDerivationPath),
        pathIndex
      )
    );
  }

  validatePath(value) {
    // todo: validate custom derivation path here
    if (DerivationPath.validate(value)) {
      this.onDerivationPathChange(value).catch(() =>
        this.updateDisplayInstructions(true)
      );
      this.props.hideError("ledger");

      this.setState({
        error: null
      });
    } else {
      this.props.showError("ledger", ERROR_TYPES.INCORRECT_FORMAT);
      this.setState({
        error: ERROR_TYPES.INCORRECT_FORMAT
      });
    }
  }

  showAdvanced(value) {
    toggleHeight(this.refs.advanced_ledger, value, () => {});
  }

  next() {
    const { ledgerAddressPageNumber } = this.state;
    this.setState({ ledgerAddressPageNumber: ledgerAddressPageNumber + 1 });
  }

  previous() {
    const { ledgerAddressPageNumber } = this.state;
    this.setState({ ledgerAddressPageNumber: ledgerAddressPageNumber - 1 });
  }

  render() {
    const { ledgerStatus } = this.props;
    console.log(ledgerStatus);
    const s = this.state;

    const indexes = [
      ...Array(NUM_DERIVATION_PATHS_TO_DISPLAY * s.ledgerAddressPageNumber)
    ]
      .map((_, i) => i)
      .slice(
        NUM_DERIVATION_PATHS_TO_DISPLAY * s.ledgerAddressPageNumber -
          NUM_DERIVATION_PATHS_TO_DISPLAY,
        NUM_DERIVATION_PATHS_TO_DISPLAY * s.ledgerAddressPageNumber
      );

    return (
      <section>
        <div>
          <div
            ref="advanced_ledger"
            className={classNames(
              Styles.ConnectDropdown__advancedContent,
              ToggleHeightStyles["toggle-height-target"]
            )}
          >
            <DerivationPathEditor validatePath={this.validatePath} />
          </div>
          {!s.error &&
            !s.displayInstructions && (
              <AddressPickerContent
                addresses={s.ledgerAddresses}
                balances={s.ledgerAddressBalances}
                indexArray={indexes}
                clickAction={this.connectLedger}
                clickPrevious={this.previous}
                clickNext={this.next}
              />
            )}

          {!s.error &&
            s.displayInstructions && (
              <ul>
                <li>Accessed Augur via HTTPS</li>
                <li>Connected your Ledger</li>
                <li>Opened the Ethereum App</li>
                <li>Enabled Contract Data</li>
                <li>Enabled Browser Support</li>
              </ul>
            )}
        </div>
      </section>
    );
  }
}
