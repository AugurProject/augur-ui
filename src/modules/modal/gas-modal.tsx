import React from "react";

import { ModalTitle, ModalButtonsRow, ModalSelectableTable, ModalAlertMessage} from "modules/modal/common";

import Styles from "modules/modal/modal.styles";

interface GasModalProps {
  saveAction: Function;
  closeAction: Function;
  safeLow: number;
  average: number;
  fast: number;
  blockNumber: number;
  userDefinedGasPrice?: number;
};

interface GasModalState {
  amount: number;
  showLowAlert: boolean;
}

export class GasModal extends React.Component<GasModalProps, GasModalState> {
  state: GasModalState = {
    amount: this.props.userDefinedGasPrice || this.props.average,
    showLowAlert: (this.props.userDefinedGasPrice || this.props.average) < this.props.safeLow
  };

  updateAmount(amount: number) {
    let amt = this.state.amount;
    if (amount) amt = amount;
    this.setState({ amount: amt, showLowAlert: amt < this.props.safeLow });
  }

  render() {
    const { closeAction, saveAction, safeLow, average, fast } = this.props;
    const { amount, showLowAlert } = this.state;
    const disabled = !amount || amount <= 0;

    const buttons = [{
      text: "Save",
      action: () => saveAction(amount),
      disabled
    }];
    const tableData = [
      {
        columns: ["Speed", "Gas Price (gwei)"],
        action: () => {}
      },
      {
        columns: ["Slow (<30m)", safeLow],
        action: () => { console.log("slow clicked"); this.updateAmount(safeLow);},
      },
      {
        columns: ["Standard (<5m)", average],
        action: () => this.updateAmount(average),
      },
      {
        columns: ["Fast (<2m)", fast],
        action: () => this.updateAmount(fast),
      }
    ];

    return (
      <div className={Styles.GasModal}>
        <ModalTitle title="Gas Price (gwei)" closeAction={closeAction} />
        {showLowAlert && (
          <ModalAlertMessage
            preText="Transactions are unlikely to be processed at your current gas price."
          />
        )}
        <input
          id="price"
          placeholder="price"
          step={1}
          type="number"
          value={this.state.amount}
          onChange={e => {
            this.updateAmount(parseFloat(e.target.value));
          }}
        />
        <h2>Recommended Gas Price</h2>
        <p>(based on current network conditions)</p>
        <ModalSelectableTable tableData={tableData} />
        <ModalButtonsRow buttons={buttons} />
      </div>
    );
  }
}