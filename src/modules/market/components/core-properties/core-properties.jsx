/* eslint react/no-array-index-key: 0 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { SCALAR, YES_NO } from "modules/markets/constants/market-types";

import Styles from "modules/market/components/core-properties/core-properties.styles";
import ReactTooltip from "react-tooltip";
import TooltipStyles from "modules/common/less/tooltip.styles";
import getValue from "utils/get-value";
import { Hint } from "modules/common/components/icons";

const Property = ({ numRow, property }) => (
  <div
    className={classNames(Styles.CoreProperties__property, {
      [Styles.CoreProperties__propertySmall]: numRow !== 0
    })}
  >
    <span className={Styles[`CoreProperties__property-name`]}>
      <div>{property.name}</div>
      {property.tooltip && (
        <div>
          <label
            className={classNames(
              TooltipStyles.TooltipHint,
              Styles["CoreProperties__property-tooltip"]
            )}
            data-tip
            data-for="tooltip--market-fees"
          >
            {Hint}
          </label>
          <ReactTooltip
            id="tooltip--market-fees"
            className={TooltipStyles.Tooltip}
            effect="solid"
            place="bottom"
            type="light"
          >
            <h4>Trading Settlement Fee</h4>
            <p>
              The trading settlement fee is a combination of the Market Creator
              Fee (<b>{property.marketCreatorFee}</b>) and the Reporting Fee (
              <b>{property.reportingFee}</b>)
            </p>
          </ReactTooltip>
        </div>
      )}
    </span>
    <span
      className={Styles[`CoreProperties__property-value`]}
      style={property.textStyle}
    >
      {property.value}
      {property.denomination && (
        <span className={Styles[`CoreProperties__property-denomination`]}>
          {property.denomination}
        </span>
      )}
    </span>
  </div>
);

Property.propTypes = {
  numRow: PropTypes.number.isRequired,
  property: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
    tooltip: PropTypes.bool,
    textStyle: PropTypes.object,
    marketCreatorFee: PropTypes.string,
    reportingFee: PropTypes.string
  }).isRequired
};

const CoreProperties = ({ market, isMobileSmall }) => {
  const { marketType } = market;

  const marketCreatorFee = getValue(market, "marketCreatorFeeRatePercent.full");
  const reportingFee = getValue(market, "reportingFeeRatePercent.full");

  const isScalar = marketType === SCALAR;

  const propertyRows = [
    [
      {
        name: "Total Volume",
        value: getValue(market, "volume.formatted"),
        denomination: "ETH",
        textStyle: { fontSize: "18px" }
      },
      {
        name: "Open Interest",
        value: getValue(market, "openInterest.formatted"),
        denomination: "ETH",
        textStyle: { fontSize: "18px" }
      }
    ],
    [
      {
        name: "24hr Volume",
        value: "---",
        denomination: "ETH"
      },
      {
        name: "Fee",
        value: getValue(market, "settlementFeePercent.full"),
        tooltip: true,
        marketCreatorFee,
        reportingFee
      }
    ],
    [
      {
        name: "Type",
        value:
          getValue(market, "marketType") === YES_NO
            ? "Yes/No"
            : getValue(market, "marketType")
      }
    ],
    [
      {
        name: "denominated in",
        value: getValue(market, "scalarDenomination"),
        textStyle: { textTransform: "none" }
      }
    ]
  ];

  if (isMobileSmall && isScalar) {
    propertyRows.push([
      {
        name: "min",
        value: getValue(market, "minPrice").toString()
      },
      {
        name: "max",
        value: getValue(market, "maxPrice").toString()
      }
    ]);
  }

  const renderedProperties = [];
  propertyRows.forEach((propertyRow, numRow) => {
    const row = [];
    propertyRow.forEach((property, numCol) => {
      if (property.value) {
        row.push(
          <Property
            key={`property${numRow}${numCol}`}
            property={property}
            numRow={numRow}
          />
        );
      }
    });
    renderedProperties.push(
      <div
        key={`row${numRow}`}
        className={classNames(Styles.CoreProperties__row)}
      >
        {row}
      </div>
    );
  });

  return (
    <div className={Styles.CoreProperties__coreContainer}>
      {renderedProperties}
    </div>
  );
};

CoreProperties.propTypes = {
  market: PropTypes.object.isRequired,
  isMobileSmall: PropTypes.bool
};

CoreProperties.defaultProps = {
  isMobileSmall: false
};

export default CoreProperties;
