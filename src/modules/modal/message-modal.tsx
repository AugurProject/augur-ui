import React from "react";

import { DefaultButtonProps } from "modules/common-elements/buttons";
import { ModalTitle, ModalDescription, ModalButtonsRow } from "modules/modal/common";
import Styles from "modules/modal/modal.styles";

interface MessageModalProps {
  closeAction: Function;
  title: string;
  description: Array<string>;
  buttons: Array<DefaultButtonProps>;
};

export const MessageModal = (props: MessageModalProps) =>
  <div className={Styles.MessageModal}>
    <ModalTitle title={props.title} closeAction={props.closeAction} />
    <ModalDescription description={props.description} />
    <ModalButtonsRow buttons={props.buttons} />
  </div>;