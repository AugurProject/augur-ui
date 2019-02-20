/* eslint react/no-array-index-key: 0 */

import React from "react";
import PropTypes from "prop-types";
import { SCALAR } from "modules/common-elements/constants";
import Styles from "modules/market/components/core-properties/core-properties.styles";
import getValue from "utils/get-value";
import { PropertyLabel } from "modules/common-elements/labels";
import { DashlineLong } from "modules/common/components/dashline/dashline";

const CoreProperties = ({ market }) => (
  <div className={Styles.CoreProperties}>
    <PropertyLabel
      label="Total Volume"
      value={`${market.volume.formatted} ETH`}
    />
    <PropertyLabel
      label="Open Interest"
      value={`${market.openInterest.formatted} ETH`}
    />
    <PropertyLabel
      label="24hr Volume"
      value={`${market.volume.formatted} ETH`}
    />
    <PropertyLabel
      label="Estimated Fee"
      value={`${market.settlementFeePercent.full}`}
      hint={
        <>
          <h4>Trading Settlement Fee</h4>
          <p>
            The trading settlement fee is a combination of the Market Creator
            Fee (<b>{getValue(market, "marketCreatorFeeRatePercent.full")}</b>
            and the Reporting Fee (
            <b>{getValue(market, "reportingFeeRatePercent.full")}</b>)
          </p>
        </>
      }
    />
    {getValue(market, "marketType") === SCALAR && (
      <PropertyLabel
        label="Denominated In"
        value={`${market.scalarDenomination}`}
      />
    )}
    {getValue(market, "marketType") === SCALAR && (
      <div className={Styles.CoreProperties_minMax}>
        <PropertyLabel label="Min" value={`${market.minPrice}`} />
        <DashlineLong />
        <PropertyLabel label="Max" value={`${market.maxPrice}`} />
      </div>
    )}
  </div>
);

CoreProperties.propTypes = {
  market: PropTypes.object.isRequired
};

export default CoreProperties;
