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
    {props.description.length > 0 &&
      <ModalDescription description={props.description} />
    }
    {props.buttons.length > 0 &&
      <ModalButtonsRow buttons={props.buttons} />
    }
  </div>;