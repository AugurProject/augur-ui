import React, { Component } from "react";
import PropTypes from "prop-types";

import DerivationPath, {
  NUM_DERIVATION_PATHS_TO_DISPLAY
} from "modules/auth/helpers/derivation-path";
import TrezorConnect, { DEVICE_EVENT, DEVICE } from "trezor-connect";
import HardwareWallet from "modules/auth/components/common/hardware-wallet";
import {
  TREZOR_MANIFEST_EMAIL,
  TREZOR_MANIFEST_APP
} from "modules/auth/constants/trezor-manifest";

export default class TrezorConnectWrapper extends Component {
  static propTypes = {
    loginWithTrezor: PropTypes.func.isRequired,
    showAdvanced: PropTypes.bool.isRequired,
    showError: PropTypes.func.isRequired,
    hideError: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired,
    setIsLoading: PropTypes.func.isRequired,
    setShowAdvancedButton: PropTypes.func.isRequired,
    isClicked: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  static async onDerivationPathChange(derivationPaths, pageNumber = 1) {
    const paths = [];

    derivationPaths.forEach(derivationPath => {
      const components = DerivationPath.parse(derivationPath);
      const numberOfAddresses = NUM_DERIVATION_PATHS_TO_DISPLAY * pageNumber;
      const indexes = Array.from(Array(numberOfAddresses).keys());
      indexes.forEach(index => {
        const derivationPath = DerivationPath.buildString(
          DerivationPath.increment(components, index)
        );
        paths.push(derivationPath);
      });
    });

    const addresses = [];

    const bundle = paths.map(path => ({
      path,
      showOnTrezor: false
    }));

    const response = await TrezorConnect.ethereumGetAddress({
      bundle
    }).catch(err => {
      console.log("Error:", err);
      return { success: false };
    });

    if (response.success) {
      // parse up the bundle results
      response.payload.every(item =>
        addresses.push({
          address: item.address,
          derivationPath: item.path,
          serializedPath: item.serializedPath
        })
      );
      if (addresses && addresses.length > 0) {
        if (!addresses.every(element => !element.address)) {
          return { success: true, addresses };
        }
      }
    }

    return { success: false };
  }

  constructor(props) {
    super(props);

    this.connectWallet = this.connectWallet.bind(this);

    TrezorConnect.manifest({
      email: TREZOR_MANIFEST_EMAIL,
      appUrl: TREZOR_MANIFEST_APP
    });
  }

  async connectWallet(derivationPath) {
    const { loginWithTrezor, logout } = this.props;
    const result = await TrezorConnect.ethereumGetAddress({
      path: derivationPath
    });

    TrezorConnect.on(DEVICE_EVENT, event => {
      switch (event.type) {
        case DEVICE.DISCONNECT: {
          logout();
          break;
        }
        default:
          break;
      }
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
    } else {
      console.error("Could not connect to Trezor", result);
    }
  }

  render() {
    return (
      <HardwareWallet
        loginWithWallet={this.connectWallet}
        walletName="trezor"
        onDerivationPathChange={TrezorConnectWrapper.onDerivationPathChange}
        validation={() => true}
        {...this.props}
      />
    );
  }
}
