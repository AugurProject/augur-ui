import React from "react";
import * as constants from "./constants";
import MovementText from "modules/common-elements/movement-text";
import MovementIcon from "modules/common-elements/movement-icon";
import Styles from "./movement-label.styles";

export enum sizeTypes {
  SMALL = constants.SMALL,
  NORMAL = constants.NORMAL,
  LARGE = constants.LARGE
}

export interface MovementLabelProps {
  value: number;
  size: sizeTypes;
  showColors?: boolean;
  showIcon?: boolean;
  showBrackets?: boolean;
  showPercentSign?: boolean;
  showPositiveSign?: boolean;
}

const MovementLabel = (props: MovementLabelProps) => {
  // Set Defaults
  const showColors = props.showColors || false;
  const showPercentSign = props.showPercentSign || false;
  const showBrackets = props.showBrackets || false;
  const showPositiveSign = props.showPositiveSign || false;
  const showIcon = props.showIcon || false;

  return (
    <div className={Styles.MovementLabel}>
      {showIcon &&
        props.value !== 0 && (
          <MovementIcon value={props.value} size={props.size} />
        )}
      {
        <MovementText
          value={props.value}
          size={props.size}
          showColors={showColors}
          showPercentSign={showPercentSign}
          showBrackets={showBrackets}
          showPositiveSign={showPositiveSign}
        />
      }
    </div>
  );
};

export default MovementLabel;
