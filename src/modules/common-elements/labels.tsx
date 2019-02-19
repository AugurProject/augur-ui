import React from "react";
import classNames from "classnames";
import * as constants from "modules/common-elements/constants";
import Styles from "modules/common-elements/labels.styles";
import { ClipLoader } from "react-spinners";
import { MarketIcon } from "modules/common-elements/icons";

export interface MarketTypeProps {
  marketType: string
}

export interface MarketStatusProps {
  marketStatus: string,
  mini?: boolean,
  alternate?: boolean
}

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

export interface MovementIconProps {
  value: number;
  size: sizeTypes;
}

export const MarketTypeLabel = (props: MarketTypeProps) => 
  <span
    className={Styles.MarketTypeLabel}
  >
    {props.marketType === constants.YES_NO ? "Yes/No" : props.marketType}
  </span>;

export const MarketStatusLabel = (props: MarketStatusProps) => {
  const { marketStatus, mini, alternate } = props;
  let open: boolean = false;
  let resolved: boolean = false;
  let reporting: boolean = false;
  let text: string;
  switch (marketStatus) {
    case constants.MARKET_OPEN:
      open = true;
      text = constants.MARKET_STATUS_MESSAGES.OPEN;
      break;
    case constants.MARKET_CLOSED:
      resolved = true;
      text = constants.MARKET_STATUS_MESSAGES.RESOLVED;
      break;
    default:
      reporting = true;
      text = constants.MARKET_STATUS_MESSAGES.IN_REPORTING;
      break;
  }
  return (
  <span
    className={classNames(Styles.MarketStatus, {
      [Styles.MarketStatus_alternate]: alternate,
      [Styles.MarketStatus_mini]: mini,
      [Styles.MarketStatus_open]: open,
      [Styles.MarketStatus_resolved]: resolved,
      [Styles.MarketStatus_reporting]: reporting
    })}
  >
    {text}
  </span>
  );
};

export const PendingLabel = () => 
  <span
    className={Styles.PendingLabel}
  >
    Pending <ClipLoader size={8} color="#ffffff" />
  </span>;

const MovementIcon = (props: MovementIconProps) => {
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

  const iconSize = getIconSizeStyles(props.size);
  const iconColor = getIconColorStyles(props.value);

  return <div className={`${iconSize} ${iconColor}`}>{MarketIcon}</div>;
};

export interface MovementTextProps {
  value: number;
  size: sizeTypes;
  showColors: boolean;
  showBrackets: boolean;
  showPercent: boolean;
  showPlusMinus: boolean;
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

  const textColorStyle = getTextColorStyles(props.value);
  const textSizeStyle = getTextSizeStyle(props.size);

  // Transform label
  const removeMinus: Function = (label: number): number => {
    if (props.value < 0 && !props.showPlusMinus) {
      return Math.abs(props.value);
    }
    return label;
  };

  const toString: Function = (label: number): string => {
    return String(label);
  };

  const addPlus: Function = (label: string): string => {
    if (props.value > 0 && props.showPlusMinus) {
      return "+".concat(label);
    }
    return label;
  };

  const addPercent: Function = (label: string): string => {
    if (props.showPercent) {
      return `${label}%`;
    }
    return label;
  };

  const addBrackets: Function = (label: string): string => {
    if (props.showBrackets) {
      return `(${label})`;
    }
    return label;
  };

  const formattedString = addBrackets(
    addPercent(addPlus(toString(removeMinus(props.value))))
  );

  return (
    <div
      className={`${props.showColors ? textColorStyle : ""} ${textSizeStyle}`}
    >
      {formattedString}
    </div>
  );
};

export const MovementLabel = (props: MovementLabelProps) => {
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
