import React, { Component } from "react";

import { DefaultButtonProps } from "modules/common-elements/buttons";
import { SquareDropdown } from "modules/common-elements/selection";
import {
  Title,
  ButtonsRow,
  Breakdown,
  Description,
  LinearPropertyLabelProps
} from "modules/modal/common";
import Styles from "modules/modal/modal.styles";
import { createBigNumber } from "utils/create-big-number";

const TRANSFER_ETH_GAS_COST = 21000;
const TRANSFER_REP_GAS_COST = 80000;

interface FormProps {
  closeAction: Function;
  title: string;
  description: Array<string>;
  buttons: Array<DefaultButtonProps>;
  loginAccount: {
    rep: string;
    eth: string;
  };
  breakdown?: Array<LinearPropertyLabelProps>;
}

interface FormState {
  step: number;
  address: string;
  currency: string;
  amount: string;
}

export class Form extends Component<FormProps, FormState> {
  state: FormState = {
    step: 0,
    address: "",
    currency: "eth",
    amount: ""
  };

  dropdownChange = (value: string) => {
    this.setState({ currency: value });
  }

  handleMax = () => {
    this.setState({ amount: createBigNumber(this.props.loginAccount[this.state.currency]).toFixed() })
  }

  amountChange = (e: Event) => {
    const currentAmount = createBigNumber(this.state.amount);
    const newAmount = createBigNumber(e.target.value);
    // validation... 
    this.setState({ amount: newAmount.toFixed() });
  }

  addressChange = (e: Event) => {
    // validation... 
    this.setState({ address: e.target.value });
  }

  render() {
    const props = this.props;
    const { step, amount, currency, address } = this.state;
    const options = [{
      label: "ETH",
      value: "eth"
    },
    {
      label: "REP",
      value: "rep"
    }];
    return (
      <div className={Styles.Form}>
        <Title title={props.title} closeAction={props.closeAction} />
        <Description description={props.description} />
        <Breakdown rows={props.breakdown} reverse title={props.breakdownTitle} />
        {step === 0 && (
          <div>
            <div>
              <label htmlFor="currency">Currency</label>
              <SquareDropdown
                id="currency"
                options={options}
                defaultValue={currency}
                onChange={this.dropdownChange}
                stretchOut
              />
            </div>
            <div>
              <label htmlFor="amount">Amount</label>
              <button onClick={this.handleMax}>MAX</button>
              <input type="number" id="amount" placeholder="0.00" value={amount} onChange={this.amountChange} />
            </div>
            <div>
              <label htmlFor="address">Recipient Address</label>
              <input type="text" id="address" value={address} placeholder="0x..." onChange={this.addressChange} />
            </div>
          </div>
        )}
        <ButtonsRow buttons={props.buttons} />
      </div>
    );
  }
}