import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import formatAddress from "modules/auth/helpers/format-address";
import Styles from "modules/auth/components/connect-dropdown/connect-dropdown.styles";
import { prevIcon, nextIcon } from "modules/common/components/icons";
import getEtherBalance from "modules/auth/actions/get-ether-balance";
import { formatEther } from "utils/format-number";

export default class AddressPickerContent extends Component {
  static propTypes = {
    addresses: PropTypes.array.isRequired,
    indexArray: PropTypes.array.isRequired,
    clickAction: PropTypes.func.isRequired,
    clickPrevious: PropTypes.func.isRequired,
    clickNext: PropTypes.func.isRequired,
    disablePrevious: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.LedgerEthereum = null;

    this.state = {
      addressBalances: {}
    };

    this.clickPrevious = this.clickPrevious.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.addresses !== nextProps.addresses) {
      nextProps.addresses.map(address => this.updateAccountBalance(address));
    }
  }

  updateAccountBalance(address) {
    if (!this.state.addressBalances[address] && address) {
      getEtherBalance(address, (err, balance) => {
        if (!err) {
          const balances = {
            ...this.state.addressBalances
          };
          balances[address] = balance || 0;

          this.setState({
            addressBalances: balances
          });
        }
      });
    }
  }

  clickPrevious() {
    if (!this.props.disablePrevious) {
      this.props.clickPrevious();
    }
  }

  render() {
    const {
      indexArray,
      addresses,
      clickAction,
      clickNext,
      disablePrevious
    } = this.props;
    const { addressBalances } = this.state;

    return (
      <div
        className={Styles.ConnectDropdown__content}
        style={{ paddingLeft: "0", paddingRight: "0" }}
      >
        <div
          className={classNames(
            Styles.ConnectDropdown__row,
            Styles.ConnectDropdown__header
          )}
        >
          <div className={Styles.ConnectDropdown__addressColumn}>Address</div>
          <div className={Styles.ConnectDropdown__balanceColumn}>Balance</div>
        </div>
        {indexArray.map(i => (
          <div key={i} className={Styles.ConnectDropdown__row}>
            <div
              role="button"
              tabIndex={0}
              className={Styles.ConnectDropdown__addressColumn}
              onClick={() => clickAction(i)}
            >
              {(addresses[i] && formatAddress(addresses[i])) || `—`}
            </div>
            <div className={Styles.ConnectDropdown__balanceColumn}>
              {addressBalances[addresses[i]]
                ? formatEther(addressBalances[addresses[i]]).formatted
                : `—`}
            </div>
          </div>
        ))}
        <div
          className={classNames(
            Styles.ConnectDropdown__row,
            Styles.ConnectDropdown__footer
          )}
        >
          <button
            className={classNames(Styles.AddressPickerContent__direction, {
              [Styles.AddressPickerContent__directionDisabled]: disablePrevious
            })}
            onClick={this.clickPrevious}
          >
            <span
              style={{ marginRight: "8px" }}
              className={Styles.AddressPickerContent__arrow}
            >
              {prevIcon}
            </span>
            Previous
          </button>
          <button
            className={Styles.AddressPickerContent__direction}
            onClick={clickNext}
            style={{ marginLeft: "24px" }}
          >
            Next
            <span
              style={{ marginLeft: "8px" }}
              className={Styles.AddressPickerContent__arrow}
            >
              {nextIcon}
            </span>
          </button>
        </div>
      </div>
    );
  }
}
