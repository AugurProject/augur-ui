import React, { Component } from "react";
import PropTypes from "prop-types";

import DerivationPath, {
  DEFAULT_DERIVATION_PATH,
  NUM_DERIVATION_PATHS_TO_DISPLAY
} from "modules/auth/helpers/derivation-path";
import classNames from "classnames";
import TrezorConnect from "trezor-connect";
import AddressPickerContent from "modules/auth/components/common/address-picker-content";
import DerivationPathEditor from "modules/auth/components/common/derivation-path-editor";
import toggleHeight from "utils/toggle-height/toggle-height";
import { ERROR_TYPES } from "modules/auth/constants/connect-nav";
import { errorIcon } from "modules/common/components/icons";

import Styles from "modules/auth/components/common/connect-wallet.styles";
import StylesDropdown from "modules/auth/components/connect-dropdown/connect-dropdown.styles";
import ToggleHeightStyles from "utils/toggle-height/toggle-height.styles";

export default class Trezor extends Component {
  static propTypes = {
    loginWithTrezor: PropTypes.func.isRequired,
    showAdvanced: PropTypes.bool,
    showError: PropTypes.func.isRequired,
    hideError: PropTypes.func.isRequired,
    error: PropTypes.bool,
    setIsLoading: PropTypes.func.isRequired,
    setShowAdvancedButton: PropTypes.func.isRequired,
    isClicked: PropTypes.bool,
    isLoading: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.state = {
      displayInstructions: true,
      baseDerivationPath: DEFAULT_DERIVATION_PATH,
      walletAddresses: new Array(NUM_DERIVATION_PATHS_TO_DISPLAY).fill(null),
      addressPageNumber: 1
    };

    this.connectWallet = this.connectWallet.bind(this);
    this.updateDisplayInstructions = this.updateDisplayInstructions.bind(this);
    this.onDerivationPathChange = this.onDerivationPathChange.bind(this);
    this.buildDerivationPath = this.buildDerivationPath.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.validatePath = this.validatePath.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.walletAddresses !== this.state.walletAddresses) {
      if (
        nextState.isLoading &&
        nextState.walletAddresses.every(element => !element)
      ) {
        nextProps.setShowAdvancedButton(false);
      } else {
        nextProps.setShowAdvancedButton(true);
      }
    }

    if (this.props.isClicked !== nextProps.isClicked && nextProps.isClicked) {
      // this is if the button was clicked, need to reupdate on click
      this.onDerivationPathChange(
        this.state.baseDerivationPath,
        nextState.addressPageNumber
      );
    }
    if (this.state.addressPageNumber !== nextState.addressPageNumber) {
      this.onDerivationPathChange(
        this.state.baseDerivationPath,
        nextState.addressPageNumber
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

    this.updateDisplayInstructions(false);

    this.setState({
      baseDerivationPath: derivationPath
    });

    const components = DerivationPath.parse(derivationPath);
    const numberOfAddresses = NUM_DERIVATION_PATHS_TO_DISPLAY * pageNumber;
    const indexes = Array.from(Array(numberOfAddresses).keys());
    const addresses = [];

    const bundle = indexes.map(index => {
      const showOnTrezor = false;
      const path = DerivationPath.buildString(
        DerivationPath.increment(components, index)
      );
      return {
        path,
        showOnTrezor
      };
    });

    const response = await TrezorConnect.ethereumGetAddress({ bundle }).catch(
      err => {
        console.log("Error:", err);
        this.updateDisplayInstructions(true);
        return this.props.setIsLoading(false);
      }
    );

    if (response.success) {
      // parse up the bundle results
      response.payload.every(item => addresses.push(item.address));
      if (addresses && addresses.length > 0) {
        this.setState({
          walletAddresses: addresses,
          addressPageNumber: pageNumber
        });
        if (!addresses.every(element => !element)) {
          this.updateDisplayInstructions(false);
          this.props.setIsLoading(false);
        }
      }
    } else {
      this.updateDisplayInstructions(true);
      this.props.setIsLoading(false);
    }
  }

  updateDisplayInstructions(displayInstructions) {
    if (displayInstructions) {
      this.props.setShowAdvancedButton(false);
    }
    this.setState({ displayInstructions });
  }

  async connectWallet(pathIndex) {
    const { loginWithTrezor } = this.props;
    const derivationPath = this.buildDerivationPath(pathIndex);
    const result = await TrezorConnect.ethereumGetAddress({
      path: derivationPath
    });

    if (result.success) {
      const { address } = result.payload;

      if (address) {
        return loginWithTrezor(
          address.toLowerCase(),
          TrezorConnect,
          derivationPath
        );
      }
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
    if (DerivationPath.validate(value)) {
      this.onDerivationPathChange(value).catch(() =>
        this.updateDisplayInstructions(true)
      );
      this.props.hideError("trezor");
    } else {
      this.props.showError("trezor", ERROR_TYPES.INCORRECT_FORMAT);
    }
  }

  showAdvanced(value) {
    toggleHeight(this.refs.advanced_trezor, value, () => {});
  }

  next() {
    const { addressPageNumber } = this.state;
    this.setState({ addressPageNumber: addressPageNumber + 1 });
  }

  previous() {
    const { addressPageNumber } = this.state;
    this.setState({ addressPageNumber: addressPageNumber - 1 });
  }

  render() {
    const { isLoading, error } = this.props;
    const s = this.state;

    const indexes = [
      ...Array(NUM_DERIVATION_PATHS_TO_DISPLAY * s.addressPageNumber)
    ]
      .map((_, i) => i)
      .slice(
        NUM_DERIVATION_PATHS_TO_DISPLAY * s.addressPageNumber -
          NUM_DERIVATION_PATHS_TO_DISPLAY,
        NUM_DERIVATION_PATHS_TO_DISPLAY * s.addressPageNumber
      );

    let hideContent = false;
    if (isLoading && s.walletAddresses.every(element => !element)) {
      hideContent = true;
    }

    return (
      <section>
        <div>
          <div
            ref="advanced_trezor"
            className={classNames(
              StylesDropdown.ConnectDropdown__advancedContent,
              ToggleHeightStyles["toggle-height-target"]
            )}
          >
            <DerivationPathEditor validatePath={this.validatePath} />
          </div>
          {!error &&
            !s.displayInstructions &&
            !hideContent && (
              <AddressPickerContent
                addresses={s.walletAddresses}
                indexArray={indexes}
                clickAction={this.connectWallet}
                clickPrevious={this.previous}
                clickNext={this.next}
                disablePrevious={s.addressPageNumber === 1}
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
                    Styles.ConnectWallet__subheader
                  )}
                >
                  <ul>
                    <li>Make sure you have connected your Trezor</li>
                    <li>Try dismissing Trezor web browser tab</li>
                    <li>
                      Disconnecting and reconnecting Trezor might fix the issue
                    </li>
                  </ul>
                  <div
                    className={StylesDropdown.ConnectDropdown__retryContainer}
                  >
                    <button
                      className={StylesDropdown.ConnectDropdown__retryButton}
                      onClick={e => {
                        e.stopPropagation();
                        e.preventDefault();

                        this.onDerivationPathChange(s.baseDerivationPath);
                      }}
                    >
                      Retry
                    </button>
                  </div>
                </div>
              </div>
            )}
        </div>
      </section>
    );
  }
}
