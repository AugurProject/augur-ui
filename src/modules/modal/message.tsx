import React from "react";

import { DefaultButtonProps } from "modules/common-elements/buttons";
import {
  Title,
  DescriptionProps,
  Description,
  ButtonsRow,
  AlertMessageProps,
  AlertMessage,
  MarketTitle,
  CallToAction,
  LinearPropertyLabelProps,
  Breakdown,
  ReadableAddress,
  ReadableAddressProps,
  DepositInfo,
  DepositInfoProps
} from "modules/modal/common";
import Styles from "modules/modal/modal.styles";

interface MessageProps {
  closeAction: Function;
  title: string;
  buttons: Array<DefaultButtonProps>;
  alertMessage?: AlertMessageProps;
  marketTitle?: string;
  callToAction?: string;
  description?: DescriptionProps;
  breakdown?: Array<LinearPropertyLabelProps>;
  readableAddress?: ReadableAddressProps;
  depositInfo?: DepositInfoProps;
}

export const Message = (props: MessageProps) => (
  <div className={Styles.Message}>
    <Title title={props.title} closeAction={props.closeAction} />
    {props.alertMessage && <AlertMessage {...props.alertMessage} />}
    {props.marketTitle && <MarketTitle title={props.marketTitle} />}
    {props.callToAction && <CallToAction callToAction={props.callToAction} />}
    {props.description && <Description description={props.description} />}
    {props.breakdown && <Breakdown rows={props.breakdown} />}
    {props.readableAddress && <ReadableAddress {...props.readableAddress} />}
    {props.depositInfo && <DepositInfo {...props.depositInfo} />}
    <ButtonsRow buttons={props.buttons} />
  </div>
);
