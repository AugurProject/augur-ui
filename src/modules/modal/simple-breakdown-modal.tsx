import React from "react";

import { DefaultButtonProps } from "modules/common-elements/buttons";
import { ModalTitle, ModalMarketTitle, ModalAlertMessage, ModalBreakdown, ModalButtonsRow } from "modules/modal/common";
import { LinearPropertyLabelProps } from "modules/common-elements/labels";
import Styles from "modules/modal/modal.styles";

interface SimpleBreakdownModalProps {
  closeAction: Function;
  sellCompleteSets: Function;
  title: string;
  marketTitle: string;
  breakdown: Array<LinearPropertyLabelProps>;
  buttons: Array<DefaultButtonProps>;
  modal: any;
};

export const SimpleBreakdownModal = (props: SimpleBreakdownModalProps) =>
  <div className={Styles.SimpleBreakdownModal}>
    <ModalTitle title={props.title} closeAction={props.closeAction} />
    <ModalAlertMessage preText="You currently have" boldText={props.modal.numCompleteSets.full} postText="of all outcomes in the market:" />
    <ModalMarketTitle title={props.marketTitle} />
    <ModalBreakdown rows={props.breakdown} />
    <ModalButtonsRow buttons={props.buttons} />
  </div>;