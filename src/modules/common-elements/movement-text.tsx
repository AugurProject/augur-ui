import React from "react";
import classNames from "classnames";
import * as constants from "./constants";
import Styles from "./movement-label.styles";

export enum sizeTypes {
  SMALL = constants.SMALL,
  NORMAL = constants.NORMAL,
  LARGE = constants.LARGE
}

export interface MovementTextProps {
  value: number;
  size: sizeTypes;
  showColors: boolean;
  showBrackets: boolean;
  showPercentSign: boolean;
  showPositiveSign: boolean;
}

const MovementText = (props: MovementTextProps) => {
  const getTextSizeStyle: Function = (size: sizeTypes): string => {
    return classNames(Styles.MovementLabel_Text, {
      [Styles.MovementLabel_Text_small]: size == sizeTypes.SMALL,
      [Styles.MovementLabel_Text_normal]: size == sizeTypes.NORMAL,
      [Styles.MovementLabel_Text_large]: size == sizeTypes.LARGE
    });
  };
  const getTextColorStyles: Function = (value: number): string => {
    return classNames({
      [Styles.MovementLabel_Text_positive]: value > 0,
      [Styles.MovementLabel_Text_negative]: value < 0,
      [Styles.MovementLabel_Text_neutral]: value === 0
    });
  };

  // Set styles
  const textColorStyle = getTextColorStyles(props.value);
  const textSizeStyle = getTextSizeStyle(props.size);

  // Transform label
  const addPositiveSign: Function = (value: number): string | void => {
    if (props.value > 0 && props.showPositiveSign) {
      return "+".concat(String(value));
    }
    return String(value);
  };

  const addBrackets: Function = (
    showBrackets: boolean,
    label: string
  ): string | void => {
    if (showBrackets) {
      return `(${label})`;
    }
    return label;
  };

  const addPercentSign: Function = (
    showPercentSign: boolean,
    label: string
  ): string | void => {
    if (showPercentSign) {
      return `${label}%`;
    }
    return label;
  };

  let formattedString = props.value;
  formattedString = addPositiveSign(formattedString);
  formattedString = addPercentSign(props.showPercentSign, formattedString);
  formattedString = addBrackets(props.showBrackets, formattedString);

  // Render
  const MovementText = (
    <div
      className={`${props.showColors ? textColorStyle : ""} ${textSizeStyle}`}
    >
      {formattedString}
    </div>
  );

  return MovementText;
};

export default MovementText;
