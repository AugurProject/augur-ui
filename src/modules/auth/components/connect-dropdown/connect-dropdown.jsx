import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import toggleHeight from "utils/toggle-height/toggle-height";
import { ITEMS, WALLET_TYPE } from "modules/auth/constants/connect-nav";

import Styles from "modules/auth/components/connect-dropdown/connect-dropdown.styles";
import ToggleHeightStyles from "utils/toggle-height/toggle-height.styles";

// todo: need to update icons and get right sizes
// todo: do network selections toggle (can you click off)? what happens if you click software wallet while it is in the connecting phase?
// todo: make hardware content own component
// todo: replace icons with right ones

const mockData = [
  {
    address: '0x001...6bf',
    balance: '1.20 ETH'
  },
  {
    address: '0x003...6bf',
    balance: '2.20 ETH'
  },
  {
    address: '0x20e...5bf',
    balance: '4.20 ETH'
  }
]

export default class ConnectDropdown extends Component {
  static propTypes = {
    isLogged: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      connected: false,
      dropdownOpen: false,
      selectedOption: null, // todo: should be in redux?
    };

    this.showAdvanced = this.showAdvanced.bind(this)
  }

  selectOption(param) {
    const prevSelected = this.state.selectedOption

    if (prevSelected && this.refs[prevSelected]) { // need to de-toggle previous selection
      toggleHeight(this.refs[prevSelected], true, () => {
        this.setState({selectedOption: null})
      });
    }

    if (prevSelected !== param) { // new selection being made
      if (this.refs[param]) { // new selection is a hardware wallet
        toggleHeight(this.refs[param], false, () => {
          this.setState({selectedOption: param})
        });
      } else { // software wallets
        this.setState({selectedOption: param})
      }
    } else { // deselection is being done
      if (!this.refs[prevSelected]) { // software wallets
        this.setState({selectedOption: null})
      }
    }
  }

  showAdvanced() {
    
  }

  render() {
    const {
      isLogged,
    } = this.props;
    const s = this.state;

    return (
      <div className={Styles.ConnectDropdown}>
        {ITEMS.map(item => (
          <div key={item.param}>
            <div 
              className={classNames(Styles.ConnectDropdown__item, 
              {
                  [Styles.ConnectDropdown__itemSelected]: s.selectedOption === item.param,
                  [Styles.ConnectDropdown__itemHardwareSelected]: s.selectedOption === item.param && item.type === WALLET_TYPE.HARDWARE
              })}
              onClick={this.selectOption.bind(this, item.param)}
            >
              <div className={Styles.ConnectDropdown__icon}>{item.icon}</div>
              <div className={Styles.ConnectDropdown__title}>{item.title}</div>
              { s.selectedOption === item.param && item.type === WALLET_TYPE.HARDWARE && 
                <div className={Styles.ConnectDropdown__advanced} onClick={this.showAdvanced}>Advanced</div>
              }
            </div>
            { item.type === WALLET_TYPE.HARDWARE &&
              <div 
                ref={item.param}
                key={item.param}
                className={classNames(Styles.ConnectDropdown__hardwareContent, 
                  ToggleHeightStyles["toggle-height-target"],
                )}
              >
                <div className={Styles.ConnectDropdown__content}>
                  <div className={classNames(Styles.ConnectDropdown__header, 
                      Styles.ConnectDropdown__row,
                  )}>
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
              </div>
            }
          </div>
        ))}
      </div>
    );
  }
}
