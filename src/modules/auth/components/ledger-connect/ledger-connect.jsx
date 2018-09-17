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
import classNames from "classnames";
import { Alert } from "modules/common/components/icons";
import getEtherBalance from "modules/auth/actions/get-ether-balance";
import Spinner from "modules/common/components/spinner/spinner";
import Styles from "modules/auth/components/ledger-connect/ledger-connect.styles";
import FormStyles from "modules/common/less/form";
import ToggleHeightStyles from "utils/toggle-height/toggle-height.styles";
import AddressPickerContent from "modules/auth/components/common/AddressPickerContent";
import DerivationPathEditor from "modules/auth/components/common/DerivationPathEditor";
import toggleHeight from "utils/toggle-height/toggle-height";
import { ERROR_TYPES } from "modules/auth/constants/connect-nav";

export default class Ledger extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    loginWithLedger: PropTypes.func.isRequired,
    networkId: PropTypes.number.isRequired,
    updateLedgerStatus: PropTypes.func.isRequired,
    ledgerStatus: PropTypes.string.isRequired,
    dropdownItem: PropTypes.object,
    showAdvanced: PropTypes.bool,
    showError: PropTypes.func.isRequired,
    hideError: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.LedgerEthereum = null;
 
    this.state = {
      displayInstructions: (props.ledgerStatus !== LEDGER_STATES.NOT_CONNECTED && props.ledgerStatus !== LEDGER_STATES.ATTEMPTING_CONNECTION),
      baseDerivationPath: DEFAULT_DERIVATION_PATH,
      ledgerAddresses: new Array(NUM_DERIVATION_PATHS_TO_DISPLAY).fill(null),
      ledgerAddressBalances: {},
      ledgerAddressPageNumber: 1,
      customDerivationPath: false
    };

    this.connectLedger = this.connectLedger.bind(this);
    this.updateDisplayInstructions = this.updateDisplayInstructions.bind(this);
    this.onDerivationPathChange = this.onDerivationPathChange.bind(this);
    this.buildDerivationPath = this.buildDerivationPath.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.focusTextInput = this.focusTextInput.bind(this);
    this.validatePath = this.validatePath.bind(this);
  }

  componentDidMount() {
    if (this.state.ledgerAddresses.some(a => a === null)) {
      this.onDerivationPathChange(this.state.baseDerivationPath).catch(() =>
        this.props.updateLedgerStatus(LEDGER_STATES.OTHER_ISSUE)
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

    if (this.props.ledgerStatus !== nextProps.ledgerStatus) {
      if (nextProps.ledgerStatus !== LEDGER_STATES.NOT_CONNECTED && nextProps.ledgerStatus !== LEDGER_STATES.ATTEMPTING_CONNECTION) {
        this.updateDisplayInstructions(true);
      } else {
        this.updateDisplayInstructions(false);
      }
    }
  }

  async onDerivationPathChange(derivationPath, pageNumber = 1) {
    const { networkId, updateLedgerStatus } = this.props;
    updateLedgerStatus(LEDGER_STATES.ATTEMPTING_CONNECTION);
    if (location.protocol !== "https:") {
      updateLedgerStatus(LEDGER_STATES.OTHER_ISSUE);
    }

    this.setState({
      baseDerivationPath: derivationPath,
      customDerivationPath: derivationPath !== DEFAULT_DERIVATION_PATH
    });

    const ledgerEthereum = new LedgerEthereum(
      networkId,
      BrowserLedgerConnectionFactory,
      this.onConnectLedgerRequestHook,
      this.onOpenEthereumAppRequestHook,
      this.onSwitchLedgerModeRequestHook,
      this.onEnableContractSupportRequestHook
    );

    const components = DerivationPath.parse(derivationPath);
    const numberOfAddresses = NUM_DERIVATION_PATHS_TO_DISPLAY * pageNumber;
    const addresses = await Promise.all(
      Array.from(Array(numberOfAddresses).keys()).map(i =>
        ledgerEthereum.getAddressByBip32Path(
          DerivationPath.buildString(DerivationPath.increment(components, i))
        )
      )
    );

    if (addresses) {
      this.setState({ ledgerAddresses: addresses });
      addresses.map(address => this.updateAccountBalance(address));
    }

    updateLedgerStatus(LEDGER_STATES.NOT_CONNECTED);
  }

  updateDisplayInstructions(displayInstructions) {
    this.setState({ displayInstructions });
  }

  updateAccountBalance(address) {
    if (!this.state.ledgerAddressBalances[address]) {
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
    const { loginWithLedger, networkId, updateLedgerStatus } = this.props;
    updateLedgerStatus(LEDGER_STATES.ATTEMPTING_CONNECTION);

    if (location.protocol !== "https:") {
      updateLedgerStatus(LEDGER_STATES.OTHER_ISSUE);
    }

    const ledgerEthereum = new LedgerEthereum(
      networkId,
      BrowserLedgerConnectionFactory,
      this.onConnectLedgerRequestHook,
      this.onOpenEthereumAppRequestHook,
      this.onSwitchLedgerModeRequestHook,
      this.onEnableContractSupportRequestHook
    );

    const derivationPath = this.buildDerivationPath(pathIndex);
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
        this.props.updateLedgerStatus(LEDGER_STATES.OTHER_ISSUE)
      );
      this.props.hideError("ledger")

      this.setState({
        error: null
      });
    } else {
      this.props.showError("ledger", ERROR_TYPES.INCORRECT_FORMAT)
      this.setState({
        error: ERROR_TYPES.INCORRECT_FORMAT
      });
    }
  }

  showAdvanced(value) {
    toggleHeight(this.refs["advanced_ledger"], value, () => {});
  }

  focusTextInput() {
    this.derivationInput.focus();
    this.setState({ customDerivationPath: true });
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
    const { ledgerStatus, updateLedgerStatus } = this.props;
    console.log(ledgerStatus)
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

// {s.error === INCORRECT_FORMAT && (
//             <div>
//               {Alert}
//               <h3>Incorrect Format </h3>
//               <span>
//                 Please enter a derivation path with the format
//                 {DEFAULT_DERIVATION_PATH}
//               </span>
//             </div>
//           )}
