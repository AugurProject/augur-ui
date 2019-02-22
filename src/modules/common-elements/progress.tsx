import * as React from "react";
import Styles from "modules/common-elements/progress.styles";
import * as format from "utils/format-date";
import classNames from "classnames";

export interface DateFormattedObject {
  value: Date;
  simpleDate: string;
  formatted: string;
  formattedShortDate: string;
  formattedShortTime: string;
  formattedShort: string;
  formattedLocal: string;
  formattedLocalShortDate: string;
  formattedLocalShort: string;
  formattedLocalShortTime: string;
  full: string;
  timestamp: number;
  utcLocalOffset: string;
  clockTimeLocal: string;
  formattedSimpleData: string;
};

export interface ProgressLabelProps {
  endTime: DateFormattedObject | number;
  currentTime: DateFormattedObject | number;
  label?: string;
  countdownBreakpoint?: number;
  firstColorBreakpoint?: number;
  finalColorBreakpoint?: number;
};

export interface TimeLabelProps {
  time: DateFormattedObject | number;
  label: string;
}

export interface TimeProgressBarProps {
  startTime: DateFormattedObject | number;
  endTime: DateFormattedObject | number;
  currentTime: DateFormattedObject | number;
}

// default breakpoints
const OneWeek = 168*60*60;
const ThreeDays = 72*60*60;
const OneDay = 24*60*60;

export const ProgressLabel = (props: ProgressLabelProps) => {
  const {
    label,
    currentTime,
    endTime,
    countdownBreakpoint,
    firstColorBreakpoint,
    finalColorBreakpoint
  } = props;
  
  let formattedEndTime: DateFormattedObject | number = endTime;
  let formattedCurrentTime: DateFormattedObject | number = currentTime;
  if (typeof endTime !== "object") {
    formattedEndTime = format.convertUnixToFormattedDate(endTime);
  }
  if (typeof currentTime !== "object") {
    formattedCurrentTime = format.convertUnixToFormattedDate(currentTime);
  }
  const daysRemaining = format.getDaysRemaining(formattedEndTime.timestamp, formattedCurrentTime.timestamp);
  const hoursRemaining = format.getHoursMinusDaysRemaining(formattedEndTime.timestamp, formattedCurrentTime.timestamp);
  const minutesRemaining = format.getMinutesMinusHoursRemaining(formattedEndTime.timestamp, formattedCurrentTime.timestamp);
  const timeLeft = formattedEndTime.timestamp - formattedCurrentTime.timestamp;
  const countdown = (countdownBreakpoint || OneWeek) >= timeLeft && timeLeft > 0;
  const firstBreakpoint = firstColorBreakpoint || ThreeDays;
  const secondBreakpoint = finalColorBreakpoint || OneDay;
  const breakpointOne = (timeLeft <= firstBreakpoint && timeLeft > secondBreakpoint);
  const breakpointTwo = (timeLeft <= secondBreakpoint && countdown);
  
  const valueString = countdown ? `${daysRemaining}d ${hoursRemaining >= 10 ? hoursRemaining : "0" + hoursRemaining}h ${minutesRemaining >= 10 ? minutesRemaining : "0" + minutesRemaining}m` : formattedEndTime.formattedLocalShortDate;
  
  return (
    <span className={classNames(Styles.ProgressLabel,{
      [Styles.ProgressLabel__FirstBreakpoint]: breakpointOne,
      [Styles.ProgressLabel__SecondBreakpoint]: breakpointTwo,
      [Styles.ProgressLabel__Finished]: timeLeft < 0
    })}>
      <span>{label}</span><span>{valueString}</span>
    </span>
  );
};

export const TimeLabel = (props: TimeLabelProps) => {
  const { label, time } = props;
  let formattedTime: DateFormattedObject | number = time;
  if (typeof time !== "object") {
    formattedTime = format.convertUnixToFormattedDate(time);
  }
  return (
    <span className={Styles.TimeLabel}>
      <span>{label}</span>
      <span>{formattedTime.formattedLocalShortDate}</span>
      <span>{formattedTime.clockTimeLocal}</span>
    </span>
  );
};

export const TimeProgressBar = (props: TimeProgressBarProps) => {
  const { startTime, endTime, currentTime } = props;
  let formattedStartTime: DateFormattedObject | number = startTime;
  let formattedEndTime: DateFormattedObject | number = endTime;
  let formattedCurrentTime: DateFormattedObject | number = currentTime;
  if (typeof startTime !== "object") {
    formattedStartTime = format.convertUnixToFormattedDate(startTime);
  }
  if (typeof endTime !== "object") {
    formattedEndTime = format.convertUnixToFormattedDate(endTime);
  }
  if (typeof currentTime !== "object") {
    formattedCurrentTime = format.convertUnixToFormattedDate(currentTime);
  }
  const totalHours = format.getHoursRemaining(formattedEndTime.timestamp, formattedStartTime.timestamp);
  const hoursLeft = format.getHoursRemaining(formattedEndTime.timestamp, formattedCurrentTime.timestamp);
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
  );
};

export const MarketTimeline =  (props: TimeProgressBarProps) => {
  const { startTime, endTime, currentTime } = props;
  let formattedEndTime: DateFormattedObject | number = endTime;
  let formattedCurrentTime: DateFormattedObject | number = currentTime;
  if (typeof endTime !== "object") {
    formattedEndTime = format.convertUnixToFormattedDate(endTime);
  }
  if (typeof currentTime !== "object") {
    formattedCurrentTime = format.convertUnixToFormattedDate(currentTime);
  }
  const currentTimestamp = formattedCurrentTime.timestamp;
  const endTimestamp = formattedEndTime.timestamp;
  const hasPassed = currentTimestamp > endTimestamp;
  const endLabel = hasPassed ? "Expired" : "Expires"; 
  return (
    <div className={Styles.MarketTimeline}>
      <div data-start-label="Created" data-end-label={endLabel} />
      <TimeProgressBar {...props} />
      <div>
        <TimeLabel label="Created" time={startTime} />
        <TimeLabel label={endLabel} time={endTime} />
      </div>
    </div>
  );
};
  