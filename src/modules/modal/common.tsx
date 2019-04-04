import React, { Component } from "react";
import classNames from "classnames";

import QRCode from "qrcode.react";
import Clipboard from "clipboard";
import ReactTooltip from "react-tooltip";
import TooltipStyles from "modules/common/less/tooltip.styles";
import {
  XIcon,
  CopyIcon,
  CheckCircleIcon
} from "modules/common-elements/icons";
import {
  DefaultButtonProps,
  PrimaryButton,
  SecondaryButton,
  SubmitTextButton
} from "modules/common-elements/buttons";
import {
  LinearPropertyLabel,
  LinearPropertyLabelProps,
  PropertyLabel
} from "modules/common-elements/labels";
import Styles from "modules/modal/modal.styles";

interface TitleProps {
  title: string;
  closeAction: Function;
}

interface DescriptionProps {
  description: Array<string>;
}

interface ButtonsRowProps {
  buttons: Array<DefaultButtonProps>;
}

interface AlertMessageProps {
  preText: string;
  boldText?: string;
  postText?: string;
}

interface DescriptionMessageProps {
  messages: Array<AlertMessageProps>;
}

interface CallToActionProps {
  callToAction: string;
}

interface BreakdownProps {
  rows: Array<Array<LinearPropertyLabelProps>>;
  title?: string;
  short?: boolean;
  reverse?: boolean;
}

interface MarketTitleProps {
  title: string;
}

interface SelectableTableRow {
  columns: Array<string | number>;
  action: Function;
}

interface SelectableTableProps {
  tableData: Array<SelectableTableRow>;
}

interface ActionRow {
  title: string;
  text: string;
  label: string;
  value: string;
  action: Function;
}

interface ActionRowsProps {
  rows: Array<ActionRow>;
}

interface ReadableAddressProps {
  address: string;
  copyable?: boolean;
  showQR?: boolean;
  title?: string;
}

interface AccountAddressDisplayProps {
  address: string;
  copyable?: boolean;
}

interface AccountAddressDisplayState {
  isCopied: boolean;
}

export const Title = (props: TitleProps) => (
  <>
    <h1>{props.title}</h1>
    {props.closeAction && (
      <button onClick={() => props.closeAction()}>{XIcon}</button>
    )}
  </>
);

export const Description = (props: DescriptionProps) =>
  props.description.map((descriptionText: string) => (
    <p key={descriptionText.slice(20).replace(" ", "-")}>{descriptionText}</p>
  ));

export const ButtonsRow = (props: ButtonsRowProps) => (
  <div>
    {props.buttons.map((Button: DefaultButtonProps, index: number) => {
      if (index === 0) return <PrimaryButton key={Button.text} {...Button} />;
      return <SecondaryButton key={Button.text} {...Button} />;
    })}
  </div>
);

export const DescriptionMessage = (props: DescriptionMessageProps) => (
  <div className={Styles.DescriptionMessage}>
    {props.messages.map(message => (
      <>
        {message.preText}
        {message.boldText && (
          <b>
            &nbsp;
            {message.boldText}
            &nbsp;
          </b>
        )}
        {message.postText}
      </>
    ))}
  </div>
);

export const AlertMessage = (props: AlertMessageProps) => (
  <div className={Styles.AlertMessage}>
    {props.preText}
    {props.boldText && (
      <b>
        &nbsp;
        {props.boldText}
        &nbsp;
      </b>
    )}
    {props.postText}
  </div>
);

export const MarketTitle = (props: MarketTitleProps) => <h2>{props.title}</h2>;

export const CallToAction = (props: CallToActionProps) => (
  <h3>{props.callToAction}</h3>
);

export const SelectableTable = (props: SelectableTableProps) => (
  <div className={Styles.SelectableTable}>
    {props.tableData.map((row: SelectableTableRow) => (
      <button key={`row_${row.columns[0]}`} onClick={() => row.action()}>
        {row.columns.map((columnText: string | number) => (
          <span key={`col_${columnText}`}>{columnText}</span>
        ))}
      </button>
    ))}
  </div>
);

export const Breakdown = (props: BreakdownProps) => (
  <div
    className={classNames({
      [Styles.ShortBreakdown]: props.short,
      [Styles.ReverseBreakdown]: props.reverse
    })}
  >
    {props.title && <h4>{props.title}</h4>}
    {props.rows.map((row: LinearPropertyLabelProps) => (
      <LinearPropertyLabel {...row} key={row.label} />
    ))}
  </div>
);

export const ActionRows = (props: ActionRowsProps) =>
  props.rows.map((row: ActionRow) => (
    <section key={row.title} className={Styles.ActionRow}>
      <section>
        <MarketTitle title={row.title} />
        <div>
          {row.properties.map(property => (
            <LinearPropertyLabel
              label={property.label}
              value={property.value}
            />
          ))}
        </div>
      </section>
      <SubmitTextButton text={row.text} action={row.action} />
    </section>
  ));

export const ReadableAddress = (props: ReadableAddressProps) => (
  <div className={Styles.ReadableAddress}>
    {props.title && <h4>{props.title}</h4>}
    {props.showQR && (
      <QRCode
        value={props.address}
        style={{ width: "120px", height: "120px" }}
      />
    )}
    <AccountAddressDisplay address={props.address} copyable={props.copyable} />
  </div>
);

export class AccountAddressDisplay extends Component<
  AccountAddressDisplayProps,
  AccountAddressDisplayState
> {
  state: AccountAddressDisplayState = {
    isCopied: false
  };

  componentWrapper: any = null;
  clipboard: any = new Clipboard("#copy_address");

  copyClicked = () => {
    this.setState({ isCopied: true }, () => {
      setTimeout(() => {
        if (this.componentWrapper) this.setState({ isCopied: false });
      }, 3000);
    });
  };

  render() {
    const { isCopied } = this.state;
    const { address, copyable } = this.props;
    return (
      <span
        ref={container => {
          this.componentWrapper = container;
        }}
        className={Styles.AccountAddressDisplay}
      >
        {address}
        {copyable && (
          <>
            <button
              id="copy_address"
              data-clipboard-text={address}
              onClick={this.copyClicked}
              data-tip
              data-for="AccountAddressDisplay_copy_tooltip"
            >
              {isCopied ? CheckCircleIcon : CopyIcon}
            </button>
            {isCopied && (
              <ReactTooltip
                id="AccountAddressDisplay_copy_tooltip"
                className={TooltipStyles.Tooltip}
                effect="solid"
                place="top"
                type="light"
                event="mouseover"
                eventOff="mouseleave"
              >
                Copied
              </ReactTooltip>
            )}
          </>
        )}
      </span>
    );
  }
}
