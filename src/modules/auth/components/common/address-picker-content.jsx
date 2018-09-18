import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import formatAddress from "modules/auth/helpers/format-address";
import Styles from "modules/auth/components/connect-dropdown/connect-dropdown.styles";

const AddressPickerContent = p => (
  <div className={Styles.ConnectDropdown__content}>
    <div
      className={classNames(
        Styles.ConnectDropdown__row,
        Styles.ConnectDropdown__header
      )}
    >
      <div className={Styles.ConnectDropdown__addressColumn}>Address</div>
      <div className={Styles.ConnectDropdown__balanceColumn}>Balance</div>
    </div>
    {p.indexArray.map(i => (
      <div key={i} className={Styles.ConnectDropdown__row}>
        <div
          role="button"
          className={Styles.ConnectDropdown__addressColumn}
          onClick={() => p.clickAction(i)}
        >
          {p.addresses[i] && formatAddress(p.addresses[i])}
        </div>
        <div className={Styles.ConnectDropdown__balanceColumn}>
          {p.balances[p.addresses[i]]}
        </div>
      </div>
    ))}
    <div className={Styles.ConnectDropdown__row}>
      <div
        className={Styles.AddressPickerContent__direction}
        onClick={p.clickPrevious}
      >
        Previous
      </div>
      <div
        className={Styles.AddressPickerContent__direction}
        onClick={p.clickNext}
        style={{ marginLeft: "24px" }}
      >
        Next
      </div>
    </div>
  </div>
);

export default AddressPickerContent;

AddressPickerContent.propTypes = {
  addresses: PropTypes.array.isRequired,
  balances: PropTypes.object.isRequired,
  indexArray: PropTypes.array.isRequired,
  clickAction: PropTypes.func.isRequired,
  clickPrevious: PropTypes.func.isRequired,
  clickNext: PropTypes.func.isRequired
};
