import React from "react";
import classNames from "classnames";

import { XIcon } from "modules/common-elements/icons";
import {
  DefaultButtonProps,
  PrimaryButton,
  SecondaryButton,
  CompactButton
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

interface CallToActionProps {
  callToAction: string;
}

interface BreakdownProps {
  rows: Array<Array<LinearPropertyLabelProps>>;
  short?: boolean;
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
  <div className={classNames({ [Styles.ShortBreakdown]: props.short })}>
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
        <PropertyLabel label={row.label} value={row.value} />
      </section>
      <CompactButton text={row.text} action={row.action} />
    </section>
  ));
