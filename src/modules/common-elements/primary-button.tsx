import React from "react";

import Styles from "modules/common-elements/common-elements.styles";

export interface PrimaryButtonProps {
  text: string;
  action: Function;
  disabled?: boolean;
  title?: string;
}

export const PrimaryButton = (props: PrimaryButtonProps) => 
  <button
    onClick={props.action}
    className={Styles.PrimaryButton}
    disabled={props.disabled}
    title={props.title || props.text}
  >
    {props.text}
  </button>;