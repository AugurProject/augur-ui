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
  styles?: object;
  showColors?: boolean;
  showIcon?: boolean;
  showBrackets?: boolean;
  showPercent?: boolean;
  showPlusMinus?: boolean;
}

const MovementLabel = (props: MovementLabelProps) => {
  const showColors = props.showColors || false;          // Red/Green
  const showPercent = props.showPercent || false;        // 0.00%
  const showBrackets = props.showBrackets || false;      // (0.00)
  const showPlusMinus = props.showPlusMinus || false;    // +4.32 / -0.32
  const showIcon = props.showIcon || false;              // 📈 3.2 / 📉 2.1

  return (
    <div
      className={Styles.MovementLabel}
      style={
        showIcon
          ? { ...props.styles, justifyContent: "space-between" }
          : { ...props.styles, justifyContent: "flex-end" }
      }
    >
      {showIcon &&
        props.value !== 0 && (
          <MovementIcon value={props.value} size={props.size} />
        )}
      {
        <MovementText
          value={props.value}
          size={props.size}
          showColors={showColors}
          showPercent={showPercent}
          showBrackets={showBrackets}
          showPlusMinus={showPlusMinus}
        />
      }
    </div>
  );
};

export default MovementLabel;
