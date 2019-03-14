import React from "react";

import { DefaultButtonProps } from "modules/common-elements/buttons";
import {
  Title,
  ButtonsRow,
  AlertMessageProps,
  AlertMessage,
  ActionRowsProps,
  ActionRows,
  LinearPropertyLabelProps,
  Breakdown
} from "modules/modal/common";
import Styles from "modules/modal/modal.styles";

interface ProceedsProps {
  closeAction: Function;
  title: string;
  buttons: Array<DefaultButtonProps>;
  rows: ActionRowsProps;
  alertMessage?: AlertMessageProps;
  breakdown?: Array<LinearPropertyLabelProps>;
}

export const Proceeds = (props: ProceedsProps) => (
  <div className={Styles.Proceeds}>
    <Title title={props.title} closeAction={props.closeAction} />
    {props.alertMessage && <AlertMessage {...props.alertMessage} />}
    {props.rows && <ActionRows rows={props.rows} />}
    {props.breakdown && <Breakdown short rows={props.breakdown} />}
    <ButtonsRow buttons={props.buttons} />
  </div>
);
