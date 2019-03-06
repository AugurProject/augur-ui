import React from "react";
import { XIcon } from "modules/common-elements/icons";
import { DefaultButtonProps, PrimaryButton, SecondaryButton } from "modules/common-elements/buttons";
import { LinearPropertyLabel, LinearPropertyLabelProps } from "modules/common-elements/labels";
import Styles from "modules/modal/modal.styles";

interface ModalTitleProps {
  title: string;
  closeAction: Function;
};

interface ModalDescriptionProps {
  description: Array<string>;
};

interface ModalButtonsRowProps {
  buttons: Array<DefaultButtonProps>;
};

interface ModalAlertMessageProps {
  preText: string;
  boldText?: string;
  postText?: string;
};

interface ModalBreakdownProps {
  rows: Array<Array<LinearPropertyLabelProps>>;
};

interface ModalMarketTitleProps {
  title: string;
};

interface SelectableTableRow {
  columns: Array<string | number>;
  action: Function;
};

interface ModalSelectableTableProps {
  tableData: Array<SelectableTableRow>;
};

export const ModalTitle = (props: ModalTitleProps) => 
  <>
    <h1>{props.title}</h1>
    <button onClick={() => props.closeAction()}>{XIcon}</button>
  </>;

export const ModalDescription = (props: ModalDescriptionProps) => {
  return props.description.map(
    (descriptionText: string) => (
        <p key={descriptionText.slice(20).replace(" ", "-")}>
          {descriptionText}
        </p>
      )
    )
  };

export const ModalButtonsRow = (props: ModalButtonsRowProps) =>
  (<div>
    {props.buttons.map((Button: DefaultButtonProps, index: number) => {
      if (index === 0) return (<PrimaryButton key={Button.text} {...Button} />)
      return (<SecondaryButton key={Button.text} {...Button} />)
    })}
  </div>);

export const ModalAlertMessage = (props: ModalAlertMessageProps) =>
  (<div className={Styles.AlertMessage}>
    {props.preText}{props.boldText && <b>&nbsp;{props.boldText}&nbsp;</b>}{props.postText}
  </div>);

export const ModalMarketTitle = (props: ModalMarketTitleProps) => <h2>{props.title}</h2>;

export const ModalSelectableTable = (props: ModalSelectableTableProps) => 
  (<div className={Styles.SelectableModalTable}>
    {props.tableData.map((row: SelectableTableRow) => (
      <button key={`row_${row.columns[0]}`} onClick={() => row.action()}>
        {row.columns.map((columnText: string | number) => (<span key={`col_${columnText}`}>{columnText}</span>))}
      </button>
    ))}
  </div>);

export const ModalBreakdown = (props: ModalBreakdownProps) =>
  <div>
    {props.rows.map((row: LinearPropertyLabelProps) => <LinearPropertyLabel {...row} key={row.label} />)}
  </div>;
