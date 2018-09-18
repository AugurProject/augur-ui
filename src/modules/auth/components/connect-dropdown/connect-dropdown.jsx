import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { PulseLoader } from "react-spinners";

import toggleHeight from "utils/toggle-height/toggle-height";
import {
  ITEMS,
  WALLET_TYPE,
  PARAMS,
  ERROR_TYPES
} from "modules/auth/constants/connect-nav";
import isMetaMaskPresent from "src/modules/auth/helpers/is-meta-mask";
import DerivationPath, {
  DEFAULT_DERIVATION_PATH
} from "modules/auth/helpers/derivation-path";
import { errorIcon } from "modules/common/components/icons";

import Styles from "modules/auth/components/connect-dropdown/connect-dropdown.styles";
import ToggleHeightStyles from "utils/toggle-height/toggle-height.styles";
import FormStyles from "modules/common/less/form";
import Ledger from "modules/auth/containers/ledger-connect";

// todo: need to figure out why edge fails sometimes
// todo: need to add loading states
// todo: hookup trezor
// todo: need to be able to retry MM

// todo: put seperate components in own files
// todo: convert hex to constants, px to rem
// todo: need to style for mobile
// todo: clean up pr, remove those overrode files

const mockData = [
  {
    address: "0x001...6bf",
    balance: "1.20 ETH"
  },
  {
    address: "0x003...6bf",
    balance: "2.20 ETH"
  },
  {
    address: "0x20e...5bf",
    balance: "4.20 ETH"
  }
];

const ErrorContainer = p => (
  <div className={classNames(Styles.ConnectDropdown__content, {
         [Styles.ConnectDropdown__contentNoPadding]: !p.error && p.error === ERROR_TYPES.INCORRECT_FORMAT
    })}>
    <div className={Styles.ErrorContainer__header}>
      <div className={Styles.ErrorContainer__headerIcon}>
        {p.error && errorIcon}
      </div>
      {p.error && p.error.header}
    </div>
    <div className={Styles.ErrorContainer__subheader}>
      {p.error === ERROR_TYPES.UNABLE_TO_CONNECT && (
        <div className={Styles.ErrorContainer__words}>
          Please install the MetaMask browser plug-in from{" "}
          <a
            href="https://metamask.io/"
            target="_blank"
            rel="noopener noreferrer"
            className={Styles.ErrorContainer__link}
          >
            Metamask.io
          </a>
        </div>
      )}
      {p.error !== ERROR_TYPES.UNABLE_TO_CONNECT &&
        p.error &&
        p.error.subheader}
    </div>
  </div>
);

export default class ConnectDropdown extends Component {
  static propTypes = {
    isLogged: PropTypes.bool,
    connectMetaMask: PropTypes.func.isRequired,
    toggleDropdown: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    edgeLoginLink: PropTypes.func.isRequired,
    edgeLoading: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedOption: null,
      showAdvanced: false,
      selectedDefaultPath: true,
      customDerivationPath: "",
      error: null,
      connectLedger: false,
      isLedgerLoading: true,
      showAdvancedButton: false, // todo: don't want this to show up until loading is done?
    };

    this.showAdvanced = this.showAdvanced.bind(this);
    this.connect = this.connect.bind(this);
    this.logout = this.logout.bind(this);
    this.showError = this.showError.bind(this);
    this.hideHardwareWallet = this.hideHardwareWallet.bind(this);
    this.hideAdvanced = this.hideAdvanced.bind(this);
    this.hideError = this.hideError.bind(this);
    this.showHardwareWallet = this.showHardwareWallet.bind(this);
    this.toggleDropdownAndConnect = this.toggleDropdownAndConnect.bind(this);
    this.retry = this.retry.bind(this);
    this.setIsLedgerLoading = this.setIsLedgerLoading.bind(this)
    this.setShowAdvancedButton = this.setShowAdvancedButton.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLogged !== this.props.isLogged) {
      this.setState({ selectedOption: null });
    }
  }

  setIsLedgerLoading(value) {
    this.setState({isLedgerLoading: value})
  }

  setShowAdvancedButton(value) {
    this.setState({showAdvancedButton: value})
  }

  showError(param, error) {
    this.setState({ error }, function() {
      if (this.refs["error_" + param]) {
        toggleHeight(this.refs["error_" + param], false, () => {});
      }
    });
  }

  hideError(param) {
    this.setState({ error: null }, function() {
      if (this.refs["error_" + param]) {
        toggleHeight(this.refs["error_" + param], true, () => {
          console.log('error hidden ' + param)
        });
      }
    });
  }

  showHardwareWallet(param) {
    if (this.refs["hardwareContent_" + param]) {
      toggleHeight(this.refs["hardwareContent_" + param], false, () => {
        this.setState({ selectedOption: param });
      });
    } else {
      this.setState({ selectedOption: param });
    }
  }

  hideHardwareWallet(param) {
    if (param && this.refs["hardwareContent_" + param]) {
      toggleHeight(this.refs["hardwareContent_" + param], true, () => {
        this.setState({ selectedOption: null });
      });
    }
  }

  showAdvanced(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ showAdvanced: !this.state.showAdvanced });
  }

  hideAdvanced() {
    this.setState({ showAdvanced: false });
  }

  toggleDropdownAndConnect(cb) {
    this.props.toggleDropdown(() => {
      setTimeout(() => {
        // need to wait for animation to be done
        cb();
      }, 500);
    });
  }

  connect(param) {
    // todo: need to check if connection was successful before closing
    if (param === PARAMS.METAMASK) {
      if (!isMetaMaskPresent()) {
        // todo: does this look at all web3 things or just MM?
        this.showError(param, ERROR_TYPES.UNABLE_TO_CONNECT);
        return;
      }

      this.toggleDropdownAndConnect(() => {
        this.props.connectMetaMask((err, res) => {
          // todo: if it doesn;t work say not logged in?
          if (err) {
            this.showError(param, ERROR_TYPES.NOT_SIGNED_IN);
            this.props.toggleDropdown();
          } else {
            this.setState({ selectOption: null });
          }
        });
      });
    } else if (param === PARAMS.EDGE) {
      this.props.edgeLoginLink(this.props.history); // todo: why does this fail sometimes?
    } else if (param === PARAMS.LEDGER) {
      this.setState({ connectLedger: true });
    }
  }

  selectOption(param) {
    const prevSelected = this.state.selectedOption;

    this.hideError(prevSelected);
    this.hideAdvanced(prevSelected);
    this.hideHardwareWallet(prevSelected);

    if (prevSelected !== param) {
      // new selection being made
      this.showHardwareWallet(param);
      this.connect(param);
      this.setState({ selectedDefaultPath: true });
    } else {
      // deselection is being done
      this.setState({ selectedOption: null });
    }
  }

  logout() {
    this.props.toggleDropdown(() => {
      setTimeout(() => {
        // need to wait for animation to be done
        this.props.logout();
      }, 500);
    });
  }

  retry(param) {
    this.connect(param);
  }

  render() {
    const { 
      isLogged, 
      edgeLoading, 
    } = this.props;
    const s = this.state;

    return (
      <div className={Styles.ConnectDropdown}>
        {isLogged && (
          <div
            className={classNames(Styles.ConnectDropdown__item)}
            onClick={this.logout}
          >
            Logout
          </div>
        )}
        {!isLogged &&
          ITEMS.map(item => (
            <div key={item.param}>
              <div
                className={classNames(Styles.ConnectDropdown__item, {
                  [Styles.ConnectDropdown__itemSelected]:
                    s.selectedOption === item.param,
                  [Styles.ConnectDropdown__itemHardwareSelected]:
                    s.selectedOption === item.param &&
                    (item.type === WALLET_TYPE.HARDWARE || s.error)
                })}
                onClick={this.selectOption.bind(this, item.param)}
              >
                <div className={Styles.ConnectDropdown__icon}>{item.icon}</div>
                <div className={Styles.ConnectDropdown__title}>
                  {item.title}
                  {s.selectedOption === item.param &&
                    ((item.param === PARAMS.EDGE &&
                    edgeLoading) || (item.param === PARAMS.LEDGER && s.isLedgerLoading)) && (
                      <div style={{ marginLeft: "8px" }}>
                        <PulseLoader
                          color="#FFF"
                          sizeUnit="px"
                          size={8}
                          loading
                        />
                      </div>
                    )}
                </div>

                {s.selectedOption === item.param &&
                  item.type === WALLET_TYPE.HARDWARE && s.showAdvancedButton && (
                    <div
                      style={{ padding: "10px" }}
                      onClick={this.showAdvanced}
                    >
                      <div className={Styles.ConnectDropdown__advanced}>
                        Advanced
                      </div>
                    </div>
                  )}
              </div>
              <div
                ref={"hardwareContent_" + item.param}
                className={classNames(
                  Styles.ConnectDropdown__hardwareContent,
                  ToggleHeightStyles["toggle-height-target"]
                )}
              >
                {item.type === WALLET_TYPE.HARDWARE &&
                  item.param === "ledger" && (
                    <Ledger
                      dropdownItem={item}
                      showError={this.showError}
                      hideError={this.hideError}
                      showAdvanced={
                        s.selectedOption === "ledger" && s.showAdvanced
                      }
                      error={Boolean(s.selectedOption === item.param && s.error)}
                      setIsLedgerLoading={this.setIsLedgerLoading}
                      isLedgerClicked={s.selectedOption === item.param}
                      setShowAdvancedButton={this.setShowAdvancedButton}
                    />
                  )}
              </div>
              <div
                ref={"error_" + item.param}
                className={classNames(
                  Styles.ConnectDropdown__hardwareContent,
                  ToggleHeightStyles["toggle-height-target"]
                )}
              >
                <ErrorContainer error={s.error} retry={this.retry} />
              </div>
            </div>
          ))}
      </div>
    );
  }
}
