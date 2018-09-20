import React, { Component } from "react";
import PropTypes from "prop-types";
import TransportU2F from "@ledgerhq/hw-transport-u2f";
import Eth from "@ledgerhq/hw-app-eth";

import DerivationPath, {
  NUM_DERIVATION_PATHS_TO_DISPLAY
} from "modules/auth/helpers/derivation-path";
import HardwareWallet from "modules/auth/components/common/hardware-wallet";

export default class Ledger extends Component {
  static propTypes = {
    loginWithLedger: PropTypes.func.isRequired,
    showAdvanced: PropTypes.bool,
    showError: PropTypes.func.isRequired,
    hideError: PropTypes.func.isRequired,
    error: PropTypes.bool,
    setIsLoading: PropTypes.func.isRequired,
    setShowAdvancedButton: PropTypes.func.isRequired,
    isClicked: PropTypes.bool,
    isLoading: PropTypes.bool
  };

  static ledgerValidation() {
    if (location.protocol !== "https:") {
      return false;
    }
    return true;
  }

  static async onDerivationPathChange(derivationPath, pageNumber = 1) {
    const transport = await TransportU2F.create();
    const ledgerEthereum = new Eth(transport);

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
          return { success: false };
        });
      addresses.push(result && result.address);
    }

    if (addresses && addresses.length > 0) {
      if (!addresses.every(element => !element)) {
        return { success: true, addresses };
      }
    }

    return { success: false };
  }

  constructor(props) {
    super(props);

    this.connectWallet = this.connectWallet.bind(this);
  }

  async connectWallet(derivationPath) {
    const { loginWithLedger } = this.props;
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
  }

  render() {
    const {
      isLoading,
      error,
      showAdvanced,
      showError,
      hideError,
      setIsLoading,
      setShowAdvancedButton,
      isClicked
    } = this.props;

    return (
      <HardwareWallet
        loginWithWallet={this.connectWallet}
        walletName="ledger"
        showAdvanced={showAdvanced}
        showError={showError}
        hideError={hideError}
        error={error}
        setIsLoading={setIsLoading}
        setShowAdvancedButton={setShowAdvancedButton}
        isClicked={isClicked}
        isLoading={isLoading}
        onDerivationPathChange={Ledger.onDerivationPathChange}
        validation={Ledger.ledgerValidation}
      />
    );
  }
}
