import React from "react";
import PropTypes from "prop-types";
import { createBigNumber } from "utils/create-big-number";
import Styles from "modules/market/components/market-header/market-header-time-range.styles";
import MarketHeaderStyles from "modules/market/components/market-header/market-header.styles";
import {
  convertUnixToFormattedDate,
  getHoursRemaining
} from "utils/format-date";

const TimeRange = ({ startTime, endTime, currentTime, isMobile }) => {
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

  const percentDone = isMobile
    ? { width: `${percentageDone}%` }
    : { height: `${percentageDone}%` };
  const percentToGo = isMobile
    ? { width: "100%" }
    : { height: `${percentageToGo}%` };
  const percentDoneDot = isMobile ? { left: `${percentageDone}%` } : null;

  return (
    <div className={Styles.MarketHeaderTimeRange__container}>
      {isMobile && (
        <div
          className={Styles["MarketHeader__property__headerContainer--mobile"]}
        >
          <span className={Styles["MarketHeader__property__header--mobile"]}>
            Created
          </span>
          <span className={Styles["MarketHeader__property__header--mobile"]}>
            {hasPassed ? "Expired" : "Expires"}
          </span>
        </div>
      )}
      <div className={Styles.MarketHeaderTimeRange__percentage}>
        <span
          className={Styles.MarketHeaderTimeRange__percentage__status}
          style={percentDone}
        />
        <span
          className={Styles.MarketHeaderTimeRange__percentage__dot}
          style={percentDoneDot}
        />
        <span
          className={Styles.MarketHeaderTimeRange__percentage__toEnd}
          style={percentToGo}
        />
      </div>
      <div className={Styles.MarketHeaderTimeRange__dates}>
        <div>
          {!isMobile && (
            <span className={MarketHeaderStyles.MarketHeader__property__header}>
              Created
            </span>
          )}
          <span className={Styles.MarketHeaderTimeRange__value}>
            {formattedCreationTime.formattedLocalShortDate}
          </span>
          <span className={Styles.MarketHeaderTimeRange__utc}>
            {formattedCreationTime.clockTimeLocal}
          </span>
        </div>
        <div>
          {!isMobile && (
            <span className={MarketHeaderStyles.MarketHeader__property__header}>
              {hasPassed ? "Expired" : "Expires"}
            </span>
          )}
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
  currentTime: PropTypes.number,
  isMobile: PropTypes.bool
};

TimeRange.defaultProps = {
  endTime: {},
  currentTime: 0,
  startTime: {},
  isMobile: false
};

export default TimeRange;
