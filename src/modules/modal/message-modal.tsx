import React from "react";

import { DefaultButtonProps } from "modules/common-elements/buttons";
import {
  ModalTitle,
  ModalDescriptionProps,
  ModalDescription,
  ModalButtonsRow,
  ModalAlertMessageProps,
  ModalAlertMessage,
  ModalMarketTitle,
  ModalCallToAction,
  LinearPropertyLabelProps,
  ModalBreakdown
} from "modules/modal/common";
import Styles from "modules/modal/modal.styles";

interface MessageModalProps {
  closeAction: Function;
  title: string;
  buttons: Array<DefaultButtonProps>;
  alertMessage?: ModalAlertMessageProps;
  marketTitle?: string;
  callToAction?: string;
  description?: ModalDescriptionProps;
  breakdown?: Array<LinearPropertyLabelProps>;
}

export const MessageModal = (props: MessageModalProps) => (
  <div className={Styles.MessageModal}>
    <ModalTitle title={props.title} closeAction={props.closeAction} />
    {props.alertMessage && <ModalAlertMessage {...props.alertMessage} />}
    {props.marketTitle && <ModalMarketTitle title={props.marketTitle} />}
    {props.callToAction && (
      <ModalCallToAction callToAction={props.callToAction} />
    )}
    {props.description && <ModalDescription description={props.description} />}
    {props.breakdown && <ModalBreakdown rows={props.breakdown} />}
    <ModalButtonsRow buttons={props.buttons} />
  </div>
);
