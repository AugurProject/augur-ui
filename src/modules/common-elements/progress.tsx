import * as React from "react";
import Styles from "modules/common-elements/progress.styles";
import * as format from "utils/format-date";

export interface ProgressLabelProps {
  endTime: any | number;
  currentTime: number;
  label?: string;
};

export interface TimeLabelProps {
  time: any | number;
  label: string;
}

export interface TimeProgressBarProps {
  startTime: any | number;
  endTime: any | number;
  currentTime: any | number;
}

export class ProgressLabel extends React.Component<ProgressLabelProps> {
  render() {
    const { label, currentTime, endTime } = this.props;
    const daysRemaining = format.getDaysRemaining(endTime.timestamp, currentTime);
    const hoursRemaining = format.getHoursMinusDaysRemaining(endTime.timestamp, currentTime);
    const minutesRemaining = format.getMinutesMinusHoursRemaining(endTime.timestamp, currentTime);

    return (
      <span className={Styles.ProgressLabel}>
        {label}<span>&nbsp;{`${daysRemaining}d ${hoursRemaining >= 10 ? hoursRemaining : "0" + hoursRemaining}h ${minutesRemaining >= 10 ? minutesRemaining : "0" + minutesRemaining}m`}</span>
      </span>
    );
  }
}

export class TimeLabel extends React.Component<TimeLabelProps> {
  render() {
    const { label, time } = this.props;
    let formattedTime: object | number = time;
    if (typeof time !== "object") {
      formattedTime = format.convertUnixToFormattedDate(time);
    }

    return (
      <span className={Styles.TimeLabel}>
        <span>{label}</span>
        <span>{formattedTime.formattedLocalShortDate}</span>
        <span>{formattedTime.clockTimeLocal}</span>
      </span>
    )
  }
}

export class TimeProgressBar extends React.Component<TimeProgressBarProps> {
  render() {
    const { startTime, endTime, currentTime } = this.props;
    const totalHours = format.getHoursRemaining(endTime.timestamp, startTime.timestamp);
    const hoursLeft = format.getHoursRemaining(endTime.timestamp, currentTime);
    const percentageToGo = Math.ceil(
      hoursLeft > 0 ? (hoursLeft / totalHours) * 100 : 0
    );
    const percentageDone = 100 - percentageToGo;
    const percentDone = {"--percent-done": `${percentageDone}%`};
    const percentToGo = {"--percent-to-go": `${percentageToGo}%`};
    return (
      <span className={Styles.TimeProgressBar}>
        <span style={percentDone} />
        <span />
        <span style={percentToGo} />
      </span>
    )
  }
}

export class MarketTimeline extends React.Component<TimeProgressBarProps> {
  render() {
    const { startTime, endTime, currentTime } = this.props;
    const isEndTimestamp = typeof endTime === "number";
    const isCurrentTimestamp = typeof currentTime === "number";
    const currentTimestamp = isCurrentTimestamp ? currentTime : currentTime.timestamp;
    const endTimestamp = isEndTimestamp ? endTime : endTime.timestamp;
    const hasPassed = currentTimestamp > endTimestamp;
    const endLabel = hasPassed ? "Expired" : "Expires"; 
    return (
      <div className={Styles.MarketTimeline}>
        <div data-start-label="Created" data-end-label={endLabel} />
        <TimeProgressBar {...this.props} />
        <div>
          <TimeLabel label="Created" time={startTime} />
          <TimeLabel label={endLabel} time={endTime} />
        </div>
      </div>
    )
  }
}
  