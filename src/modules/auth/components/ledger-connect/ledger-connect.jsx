import React, { Component } from "react";
import PropTypes from "prop-types";
import TransportU2F from "@ledgerhq/hw-transport-u2f";
import Eth from "@ledgerhq/hw-app-eth";

import DerivationPath, {
  DEFAULT_DERIVATION_PATH,
  NUM_DERIVATION_PATHS_TO_DISPLAY
} from "modules/auth/helpers/derivation-path";
import classNames from "classnames";

import AddressPickerContent from "modules/auth/components/common/address-picker-content";
import DerivationPathEditor from "modules/auth/components/common/derivation-path-editor";
import toggleHeight from "utils/toggle-height/toggle-height";
import { ERROR_TYPES } from "modules/auth/constants/connect-nav";
import { errorIcon } from "modules/common/components/icons";

import Styles from "modules/auth/components/ledger-connect/ledger-connect.styles";
import StylesDropdown from "modules/auth/components/connect-dropdown/connect-dropdown.styles";
import ToggleHeightStyles from "utils/toggle-height/toggle-height.styles";

export default class Ledger extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    loginWithLedger: PropTypes.func.isRequired,
    networkId: PropTypes.number.isRequired,
    ledgerStatus: PropTypes.string.isRequired,
    dropdownItem: PropTypes.object,
    showAdvanced: PropTypes.bool,
    showError: PropTypes.func.isRequired,
    hideError: PropTypes.func.isRequired,
    error: PropTypes.bool,
    setIsLoading: PropTypes.func.isRequired,
    setShowAdvancedButton: PropTypes.func.isRequired,
    isClicked: PropTypes.bool, 
    isLoading: PropTypes.bool, 
  };

  constructor(props) {
    super(props);

    this.LedgerEthereum = null;

    this.state = {
      displayInstructions: true, // don't want to show ledger content while loading is true
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

    this.ledgerValidation();
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.ledgerAddresses !== this.state.ledgerAddresses) {
      if (nextState.isLoading && nextState.ledgerAddresses.every(element => !element)) {
        nextProps.setShowAdvancedButton(false)
      } else {
        nextProps.setShowAdvancedButton(true)
      }
    }

    if (this.props.isClicked !== nextProps.isClicked && nextProps.isClicked) {
      // this is if the button was clicked, need to reupdate on click
      this.onDerivationPathChange(
        this.state.baseDerivationPath,
        nextState.ledgerAddressPageNumber
      );

      this.ledgerValidation();
    }
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
    this.props.setIsLoading(true);
    const transport = await TransportU2F.create();
    const ledgerEthereum = new Eth(transport);

    this.updateDisplayInstructions(false);

    this.setState({
      baseDerivationPath: derivationPath
    });

    const components = DerivationPath.parse(derivationPath);
    const numberOfAddresses = NUM_DERIVATION_PATHS_TO_DISPLAY * pageNumber;
    const indexes = Array.from(Array(numberOfAddresses).keys());
    const addresses = [];

    for (const index of indexes) {
      const result = await ledgerEthereum
        .getAddress(
          DerivationPath.buildString(
            DerivationPath.increment(components, index)
          ),
          false,
          true
        )
        .catch(err => {
          console.log("Error:", err);
          this.updateDisplayInstructions(true);
          return this.props.setIsLoading(false);
        });
      addresses.push(result && result.address);
    }

    if (addresses && addresses.length > 0) {
      this.setState({ ledgerAddresses: addresses });
      if (!addresses.every(element => !element)) {
        this.updateDisplayInstructions(false);
        this.props.setIsLoading(false);
      }
      return;
    }
    this.props.setIsLoading(false);
    this.updateDisplayInstructions(true);
  }

  ledgerValidation() {
    if (location.protocol !== "https:") {
      this.updateDisplayInstructions(true);
    }
  }

  updateDisplayInstructions(displayInstructions) {
    if (displayInstructions) {
      this.props.setShowAdvancedButton(false);
    } 

    this.setState({ displayInstructions });
  }

  async connectLedger(pathIndex) {
    const { loginWithLedger } = this.props;
    const derivationPath = this.buildDerivationPath(pathIndex);
    const transport = await TransportU2F.create();
    const ledgerEthereum = new Eth(transport);
    const result = await ledgerEthereum.getAddress(derivationPath);
    const { address } = result;

    if (address) {
      return loginWithLedger(
        address.toLowerCase(),
        ledgerEthereum,
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
    } else {
      this.props.showError("ledger", ERROR_TYPES.INCORRECT_FORMAT);
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
    const { isLoading, error } = this.props;
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

    let hideContent = false
    if (isLoading && s.ledgerAddresses.every(element => !element)) {
      hideContent = true
    }

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
          {!error &&
            !s.displayInstructions && !hideContent && (
              <AddressPickerContent
                addresses={s.ledgerAddresses}
                balances={s.ledgerAddressBalances}
                indexArray={indexes}
                clickAction={this.connectLedger}
                clickPrevious={this.previous}
                clickNext={this.next}
                disablePrevious={s.ledgerAddressPageNumber === 1}
              />
            )}

          {!error &&
            s.displayInstructions && (
              <div className={StylesDropdown.ConnectDropdown__content}>
                <div className={StylesDropdown.ErrorContainer__header}>
                  <div className={StylesDropdown.ErrorContainer__headerIcon}>
                    {errorIcon}
                  </div>
                  Unable To Connect
                </div>
                <div
                  className={classNames(
                    StylesDropdown.ErrorContainer__subheader,
                    Styles.LedgerConnect__subheader
                  )}
                >
                  <div>Make sure you have:</div>
                  <ul>
                    <li>Accessed Augur via HTTPS</li>
                    <li>Connected your Ledger</li>
                    <li>Opened the Ethereum App</li>
                    <li>Enabled contract data</li>
                    <li>Enabled browser support</li>
                  </ul>
                </div>
              </div>
            )}
        </div>
      </section>
    );
  }
}
