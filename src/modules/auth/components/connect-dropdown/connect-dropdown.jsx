import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import toggleHeight from "utils/toggle-height/toggle-height";
import { ITEMS, WALLET_TYPE, PARAMS } from "modules/auth/constants/connect-nav";

import Styles from "modules/auth/components/connect-dropdown/connect-dropdown.styles";
import ToggleHeightStyles from "utils/toggle-height/toggle-height.styles";
import FormStyles from "modules/common/less/form";
import DerivationPath, {
  DEFAULT_DERIVATION_PATH
} from "modules/auth/helpers/derivation-path";

// todo: need to update icons and get right sizes
// todo: what happens if you click software wallet while it is in the connecting phase?
// todo: make hardware content own component
// todo: replace icons with right ones
// todo: give advanced button some padding so clickable field is bigger

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

const DerivationPathEditor = p => {
  return (
    <section className={Styles.DerivationPathEditor}>
      <div className={Styles.DerivationPathEditor__title}>Derivation Path</div>
      <div className={Styles.DerivationPathEditor__row}>
        <ul className={classNames(FormStyles["Form__radio-buttons--per-line"], Styles.DerivationPathEditor__radioButtons)}>
          <li>
            <button
              className={classNames({
                [`${FormStyles.active}`]: p.selectedDefaultPath
              })}
              onClick={p.selectDerivationPath.bind(this, true)}
            >
              <span className={Styles.DerivationPathEditor__path}>{DEFAULT_DERIVATION_PATH}</span>
              <span className={Styles.DerivationPathEditor__pathDetails}>(default)</span>
            </button>
          </li>
        </ul>
      </div>
      <div className={Styles.DerivationPathEditor__row}>
        <ul className={classNames(FormStyles["Form__radio-buttons--per-line"], Styles.DerivationPathEditor__radioButtons, Styles.DerivationPathEditor__radioButtonsInput)}>
          <li>
            <button
              className={classNames({
                [`${FormStyles.active}`]: !p.selectedDefaultPath
              })}
              onClick={p.selectDerivationPath.bind(this, false)}
            >
              <span className={Styles.DerivationPathEditor__path}>
                <input
                  className={Styles.DerivationPathEditor__pathInput}
                  type="text"
                  value={p.customDerivationPath}
                  placeholder={DEFAULT_DERIVATION_PATH}
                  onChange={e => p.validatePath(e.target.value)}
                />
              </span>
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
};

const AddressPickerContent = p => {
  return (
    <div className={Styles.ConnectDropdown__content}>
      <div
        className={classNames(
          Styles.ConnectDropdown__row,
          Styles.ConnectDropdown__header
        )}
      >
        <div className={Styles.ConnectDropdown__addressColumn}>
          Address
        </div>
        <div className={Styles.ConnectDropdown__balanceColumn}>
          Balance
        </div>
      </div>
      {mockData.map((item, index) => (
        <div key={index} className={Styles.ConnectDropdown__row}>
          <div className={Styles.ConnectDropdown__addressColumn}>
            {item.address}
          </div>
          <div className={Styles.ConnectDropdown__balanceColumn}>
            {item.balance}
          </div>
        </div>
      ))}
    </div>
  )
}
export default class ConnectDropdown extends Component {
  static propTypes = {
    isLogged: PropTypes.bool,
    connectMetaMask: PropTypes.func.isRequired,
    isMetaMaskPresent: PropTypes.bool.isRequired,
    toggleDropdown: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedOption: null,
      showAdvanced: false,
      selectedDefaultPath: true,
      customDerivationPath: "",
    };

    this.showAdvanced = this.showAdvanced.bind(this)
    this.selectDerivationPath = this.selectDerivationPath.bind(this)
    this.validatePath = this.validatePath.bind(this)
    this.connect = this.connect.bind(this)
    this.logout = this.logout.bind(this)
  }

  connect(param) {
    // todo: need to redirect to /categories page
    if (param === PARAMS.METAMASK) {
      this.props.toggleDropdown()
      this.props.connectMetaMask()
      this.setState({selectOption: null})
    }
  }

  selectOption(param) {
    // todo: clean up, too confusing

    const prevSelected = this.state.selectedOption;

    if (prevSelected && this.refs[prevSelected]) {
      // need to de-toggle previous selection
      toggleHeight(this.refs[prevSelected], true, () => {
        this.setState({ selectedOption: null});
      });
    }

    if (prevSelected !== param) {
      // new selection being made
      if (this.refs[param]) {
        // new selection is a hardware wallet
        toggleHeight(this.refs[param], false, () => {
          this.setState({ selectedOption: param});
        });
      } else {
        // software wallets
        this.setState({ selectedOption: param});
      }

      this.connect(param)

      this.setState({selectedDefaultPath: true}) // need to reset default path when switching off, todo: is this wanted?
    } else {
      // deselection is being done
      if (!this.refs[prevSelected]) {
        // software wallets
        this.setState({ selectedOption: null});
      }
    }

    if (this.refs['advanced_' + prevSelected]) {
      toggleHeight(this.refs['advanced_' + prevSelected], true, () => {
        this.setState({showAdvanced: false})
      });
    }
  }

  showAdvanced(e) {
    e.stopPropagation();
    e.preventDefault();

    toggleHeight(this.refs['advanced_' + this.state.selectedOption], this.state.showAdvanced, () => {
      this.setState({showAdvanced: !this.state.showAdvanced})
    });
  }

  selectDerivationPath(value) {
    this.setState({selectedDefaultPath: value})
  }

  validatePath(value) {
    // todo: validate custom derivation path here
    this.setState({customDerivationPath: value})
  }

  logout() {
    this.props.toggleDropdown()
    this.props.logout()
  }

  render() {
    const {
      isLogged,
    } = this.props;
    const s = this.state;

    return (
      <div className={Styles.ConnectDropdown}>
        {isLogged &&
          <div
            className={classNames(Styles.ConnectDropdown__item)}
            onClick={this.logout}
          >
            Logout
          </div>
        }
        {!isLogged && ITEMS.map(item => (
          <div key={item.param}>
            <div
              className={classNames(Styles.ConnectDropdown__item, {
                [Styles.ConnectDropdown__itemSelected]:
                  s.selectedOption === item.param,
                [Styles.ConnectDropdown__itemHardwareSelected]:
                  s.selectedOption === item.param &&
                  item.type === WALLET_TYPE.HARDWARE
              })}
              onClick={this.selectOption.bind(this, item.param)}
            >
              <div className={Styles.ConnectDropdown__icon}>{item.icon}</div>
              <div className={Styles.ConnectDropdown__title}>{item.title}</div>
              {s.selectedOption === item.param &&
                item.type === WALLET_TYPE.HARDWARE && (
                  <div className={Styles.ConnectDropdown__advanced} onClick={this.showAdvanced}>
                    Advanced
                  </div>
              )}
            </div>
            {item.type === WALLET_TYPE.HARDWARE && (
              <div
                ref={item.param}
                key={item.param}
                className={classNames(
                  Styles.ConnectDropdown__hardwareContent,
                  ToggleHeightStyles["toggle-height-target"]
                )}
              >
                <div
                  ref={'advanced_' + item.param}
                  key={'advanced_' + item.param}
                  className={classNames(
                    Styles.ConnectDropdown__advancedContent,
                    ToggleHeightStyles["toggle-height-target"]
                  )}
                >
                  <DerivationPathEditor
                    selectedDefaultPath={s.selectedDefaultPath}
                    selectDerivationPath={this.selectDerivationPath}
                    customDerivationPath={s.customDerivationPath}
                    validatePath={this.validatePath}
                  />
                </div>
                <AddressPickerContent />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
}
