import React from "react";

import { DefaultButtonProps } from "modules/common-elements/buttons";
import {
  ModalTitle,
  ModalButtonsRow,
  ModalAlertMessageProps,
  ModalAlertMessage,
  ModalMarketActionRowsProps,
  ModalMarketActionRows,
  LinearPropertyLabelProps,
  ModalBreakdown
} from "modules/modal/common";
import Styles from "modules/modal/modal.styles";

interface ProceedsModalProps {
  closeAction: Function;
  title: string;
  buttons: Array<DefaultButtonProps>;
  rows: ModalMarketActionRowsProps;
  alertMessage?: ModalAlertMessageProps;
  breakdown?: Array<LinearPropertyLabelProps>;
}

export const ProceedsModal = (props: ProceedsModalProps) => (
  <div className={Styles.ProceedsModal}>
    <ModalTitle title={props.title} closeAction={props.closeAction} />
    {props.alertMessage && <ModalAlertMessage {...props.alertMessage} />}
    {props.rows && <ModalMarketActionRows rows={props.rows} />}
    {props.breakdown && <ModalBreakdown short rows={props.breakdown} />}
    <ModalButtonsRow buttons={props.buttons} />
  </div>
);
