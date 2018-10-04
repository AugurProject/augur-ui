import React from "react";
import PropTypes from "prop-types";
import {
  getDaysRemaining,
  convertUnixToFormattedDate,
  getHoursRemaining,
  getMinutesRemaining
} from "utils/format-date";
import classNames from "classnames";
import Styles from "modules/reporting/components/time-progress-bar/time-progress-bar.styles";

const TimeProgressBar = p => {
  const { currentTime, startTime, endTime } = p;
  const totalHours = getHoursRemaining(endTime, startTime);
  const hoursLeft = getHoursRemaining(endTime, currentTime);
  const minutesLeft = getMinutesRemaining(endTime, currentTime);
  const daysLeft = getDaysRemaining(endTime, currentTime);
  const formattedDate = convertUnixToFormattedDate(endTime);

  const currentPeriodStyle = {
    width: `${((totalHours - hoursLeft) / totalHours) * 100}%`
  };

  let timeLeft = `${daysLeft} ${daysLeft === 1 ? "day" : "days"} left`;
  if (daysLeft === 0)
    timeLeft = `${hoursLeft} ${hoursLeft === 1 ? "hour" : "hours"} left`;
  if (hoursLeft === 0) {
    timeLeft = `${minutesLeft} ${
      minutesLeft === 1 ? "minute" : "minutes"
    } left`;
  }

  return (
    <article>
      <div
        className={classNames(
          Styles.TimeProgressBar__endTimeRow,
          Styles.TimeProgressBar__row
        )}
      >
        <span data-testid="endTime" className={Styles.TimeProgressBar__endTime}>
          <span
            className={Styles.TimeProgressBar__endTimeValue}
            style={{ fontSize: "12px" }}
          >
            {" "}
            {formattedDate.clockTimeLocal}
          </span>
        </span>
      </div>
      <div
        className={classNames(
          Styles.TimeProgressBar__row,
          Styles.TimeProgressBar__endTimeRow
        )}
      >
        <span data-testid="endTime" className={Styles.TimeProgressBar__endTime}>
          {p.timePeriodLabel} ends{" "}
          <span className={Styles.TimeProgressBar__endTimeValue}>
            {" "}
            {formattedDate.formattedSimpleData}{" "}
          </span>
        </span>
      </div>
      <div className={Styles["TimeProgressBar__dispute-graph"]}>
        <div className={Styles.TimeProgressBar__graph}>
          <div className={Styles["TimeProgressBar__graph-current"]}>
            <div style={currentPeriodStyle} />
          </div>
        </div>
      </div>
      <div className={Styles.TimeProgressBar__daysLeft}>
        <span data-testid="daysLeft">{timeLeft}</span>
      </div>
    </article>
  );
};

TimeProgressBar.propTypes = {
  endTime: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  startTime: PropTypes.number.isRequired,
  timePeriodLabel: PropTypes.string.isRequired
};

export default TimeProgressBar;
