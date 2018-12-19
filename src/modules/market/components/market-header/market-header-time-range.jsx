import React from "react";
import PropTypes from "prop-types";
import { createBigNumber } from "utils/create-big-number";
import Styles from "modules/market/components/market-header/market-header-time-range.styles";
import MarketHeaderStyles from "modules/market/components/market-header/market-header.styles";
import {
  convertUnixToFormattedDate,
  getHoursRemaining
} from "utils/format-date";

const TimeRange = ({ startTime, endTime, currentTime }) => {
  const startTimestamp = startTime.timestamp || 0;
  const endTimestamp = endTime.timestamp || 0;
  const totalHours =
    (startTime && getHoursRemaining(endTimestamp, startTimestamp)) || 0;
  const hoursLeft =
    (currentTime && getHoursRemaining(endTimestamp, currentTime)) || 0;
  const percentageToGo = Math.ceil(
    hoursLeft > 0 ? (hoursLeft / totalHours) * 100 : 0
  );
  const formattedCreationTime =
    (startTimestamp && convertUnixToFormattedDate(startTimestamp)) || {};
  const formattedEndTime =
    (endTimestamp && convertUnixToFormattedDate(endTimestamp)) || {};
  const hasPassed = createBigNumber(currentTime).gt(
    createBigNumber(endTimestamp)
  );

  const percentageDone = 100 - percentageToGo;

  return (
    <div className={Styles.MarketHeaderTimeRange__container}>
      <div className={Styles.MarketHeaderTimeRange__percentage}>
        <span
          className={Styles.MarketHeaderTimeRange__percentage__status}
          style={{ height: `${percentageDone}%` }}
        />
        <span className={Styles.MarketHeaderTimeRange__percentage__dot} />
        <span
          className={Styles.MarketHeaderTimeRange__percentage__toEnd}
          style={{ height: `${percentageToGo}%` }}
        />
      </div>
      <div className={Styles.MarketHeaderTimeRange__dates}>
        <div>
          <span className={MarketHeaderStyles.MarketHeader__property__header}>
            Created
          </span>
          <span className={Styles.MarketHeaderTimeRange__value}>
            {formattedCreationTime.formattedLocalShortDate}
          </span>
          <span className={Styles.MarketHeaderTimeRange__utc}>
            {formattedCreationTime.clockTimeLocal}
          </span>
        </div>
        <div>
          <span className={MarketHeaderStyles.MarketHeader__property__header}>
            {hasPassed ? "Expired" : "Expires"}
          </span>
          <span className={Styles.MarketHeaderTimeRange__value}>
            {formattedEndTime.formattedLocalShortDate}
          </span>
          <span className={Styles.MarketHeaderTimeRange__utc}>
            {formattedEndTime.clockTimeLocal}
          </span>
        </div>
      </div>
    </div>
  );
};

TimeRange.propTypes = {
  startTime: PropTypes.object,
  endTime: PropTypes.object,
  currentTime: PropTypes.number
};

TimeRange.defaultProps = {
  endTime: {},
  currentTime: 0,
  startTime: {}
};

export default TimeRange;
