import React from "react";
import classNames from "classnames";
import * as constants from "./constants";
import { marketIcon } from "modules/common/components/icons";
import Styles from "./movement-label.styles";

export enum sizeTypes {
  SMALL = constants.SMALL,
  NORMAL = constants.NORMAL,
  LARGE = constants.LARGE
}

export interface MovementIconProps {
  value: number;
  size: sizeTypes;
}

const MovementIcon = (props: MovementIconProps) => {
  // Set styles
  const getIconSizeStyles: Function = (size: sizeTypes): string => {
    return classNames(Styles.MovementLabel_Icon, {
      [Styles.MovementLabel_Icon_small]: size == sizeTypes.SMALL,
      [Styles.MovementLabel_Icon_normal]: size == sizeTypes.NORMAL,
      [Styles.MovementLabel_Icon_large]: size == sizeTypes.LARGE
    });
  };

  const getIconColorStyles: Function = (value: number): string => {
    return classNames({
      [Styles.MovementLabel_Icon_positive]: value > 0,
      [Styles.MovementLabel_Icon_negative]: value < 0
    });
  };

  const styles = `${getIconSizeStyles(props.size)} ${getIconColorStyles(
    props.value
  )}`;

  // Render
  const MovementIcon = <div className={styles}>{marketIcon}</div>;

  return MovementIcon;
};

export default MovementIcon;
