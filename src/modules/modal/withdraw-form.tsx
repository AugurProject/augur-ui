import React, { Component } from "react";

import { ImmediateImportance } from "modules/common-elements/icons";
import { FormattedValue } from "modules/common-elements/labels";
import { SquareDropdown } from "modules/common-elements/selection";
import {
  Title,
  ButtonsRow,
  Breakdown,
  Description,
  ReadableAddress
} from "modules/modal/common";
import { ETH, REP, ZERO } from "modules/common-elements/constants";
import { formatEther, formatRep } from "utils/format-number";
import isAddress from "modules/auth/helpers/is-address";
import Styles from "modules/modal/modal.styles";
import { createBigNumber } from "utils/create-big-number";

interface WithdrawFormProps {
  closeAction: Function;
  transferFunds: Function;
  GasCosts: {
    eth: FormattedValue;
    rep: FormattedValue;
  };
  loginAccount: {
    rep: string;
    eth: string;
  };
}

interface WithdrawFormState {
  step: number;
  address: string;
  currency: string;
  amount: string;
  errors: {
    address: string;
    amount: string;
  };
}

function sanitizeArg(arg: any) {
  return arg == null || arg === "" ? "" : arg;
}

export class WithdrawForm extends Component<
  WithdrawFormProps,
  WithdrawFormState
> {
  state: WithdrawFormState = {
    step: 0,
    address: "",
    currency: ETH,
    amount: "",
    errors: {
      address: "",
      amount: ""
    }
  };

  options = [
    {
      label: ETH,
      value: ETH
    },
    {
      label: REP,
      value: REP
    }
  ];

  dropdownChange = (value: string) => {
    this.setState({ currency: value });
  };

  handleMax = () => {
    const { loginAccount, GasCosts } = this.props;
    const { currency } = this.state;
    const fullAmount = createBigNumber(loginAccount[currency.toLowerCase()]);
    this.setState({
      amount:
        currency === ETH
          ? fullAmount.minus(GasCosts.eth.fullPrecision).toFixed()
          : fullAmount.toFixed()
    });
  };

  amountChange = (e: Event) => {
    const { loginAccount, GasCosts } = this.props;
    const newAmount = createBigNumber(sanitizeArg(e.target.value));
    const { errors: updatedErrors, currency } = this.state;
    updatedErrors.amount = "";
    let amountMinusGas = createBigNumber(0);
    if (currency === ETH) {
      amountMinusGas = newAmount.minus(GasCosts.eth.fullPrecision);
    } else {
      amountMinusGas.minus(GasCosts.rep.fullPrecision);
    }
    // validation...
    if (newAmount === "") {
      updatedErrors.amount = `Quantity is required.`;
    } else {
      if (isNaN(parseFloat(newAmount))) {
        updatedErrors.amount = `Quantity isn't a number.`;
      }

      if (!isFinite(newAmount)) {
        updatedErrors.amount = `Quantity isn't finite.`;
      }

      if (newAmount.gt(loginAccount.eth)) {
        updatedErrors.amount = `Quantity is greater than available funds.`;
      }

      if (newAmount.lte(ZERO)) {
        updatedErrors.amount = `Quantity must be greater than zero.`;
      }

      if (amountMinusGas.lt(ZERO)) {
        updatedErrors.amount = `Not enough ETH available to pay gas cost.`;
      }
    }

    this.setState({ amount: newAmount.toFixed(), errors: updatedErrors });
  };

  addressChange = (e: Event) => {
    const address = e.target.value;
    const { errors: updatedErrors } = this.state;
    updatedErrors.address = "";
    if (address && !isAddress(address)) {
      updatedErrors.address = `Address is invalid`;
    }

    if (address === "") {
      updatedErrors.address = `Address is required`;
    }
    this.setState({ address, errors: updatedErrors });
  };

  render() {
    const { GasCosts, transferFunds, loginAccount, closeAction } = this.props;
    const { step, amount, currency, address, errors } = this.state;
    const { amount: errAmount, address: errAddress } = errors;
    const isValid =
      errAmount === "" && errAddress === "" && amount.length && address.length;

    const formattedAmount =
      currency === ETH ? formatEther(amount || 0) : formatRep(amount || 0);
    const gasCost = GasCosts[currency.toLowerCase()];
    const formattedTotal =
      currency === ETH
        ? formatEther(
            createBigNumber(amount || 0).plus(GasCosts.eth.fullPrecision)
          )
        : formattedAmount;
    const buttons =
      step === 0
        ? [
            {
              text: "review",
              action: () => this.setState({ step: 1 }),
              disabled: !isValid
            },
            {
              text: "cancel",
              action: closeAction
            }
          ]
        : [
            {
              text: "send",
              action: () =>
                transferFunds(formattedAmount.fullPrecision, currency, address)
            },
            {
              text: "back",
              action: () => this.setState({ step: 0 })
            }
          ];
    const ModalTitle = step === 0 ? "Send Funds" : "Review";
    const breakdown =
      step === 0
        ? [
            {
              label: "Ethereum (ETH)",
              value: formatEther(loginAccount.eth),
              useValueLabel: true
            },
            {
              label: "Reputation (REP)",
              value: formatRep(loginAccount.rep),
              useValueLabel: true
            }
          ]
        : [
            {
              label: "Send",
              value: formattedAmount,
              useValueLabel: true,
              showDenomination: true
            },
            {
              label: "GAS Cost",
              value: gasCost,
              useValueLabel: true,
              showDenomination: true
            },
            {
              label: "Total",
              value: formattedTotal,
              useValueLabel: true,
              showDenomination: true
            }
          ];
    return (
      <div className={Styles.WithdrawForm}>
        <Title title={ModalTitle} closeAction={closeAction} />
        {step === 1 && (
          <>
            <Breakdown rows={breakdown} reverse />
            <ReadableAddress address={address} title="RECIPIENT ADDRESS" />
          </>
        )}
        {step === 0 && (
          <>
            <Description
              description={["Send funds from your connected wallet"]}
            />
            <Breakdown rows={breakdown} reverse title="Available Funds" />
            <div className={Styles.GroupedForm}>
              <div>
                <label htmlFor="currency">Currency</label>
                <SquareDropdown
                  id="currency"
                  options={this.options}
                  defaultValue={currency}
                  onChange={this.dropdownChange}
                  stretchOut
                />
              </div>
              <div>
                <label htmlFor="amount">Amount</label>
                <button onClick={this.handleMax}>MAX</button>
                <input
                  type="number"
                  id="amount"
                  placeholder="0.00"
                  value={amount}
                  onChange={this.amountChange}
                />
                {errors.amount &&
                  errors.amount.length && <span>{errors.amount}</span>}
              </div>
              <div>
                <label htmlFor="address">Recipient Address</label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  placeholder="0x..."
                  onChange={this.addressChange}
                />
                {errors.address.length && (
                  <span>
                    {ImmediateImportance} {errors.address}
                  </span>
                )}
              </div>
            </div>
          </>
        )}
        <ButtonsRow buttons={buttons} />
      </div>
    );
  }
}
