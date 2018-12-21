/* eslint react/no-array-index-key: 0 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { SCALAR, YES_NO } from "modules/markets/constants/market-types";
import Styles from "modules/market/components/core-properties/core-properties.styles";
import getValue from "utils/get-value";
import MarketHeaderReporting from "modules/market/containers/market-header-reporting";
import { infoIcon } from "modules/common/components/icons";
import ReactTooltip from "react-tooltip";
import TooltipStyles from "modules/common/less/tooltip.styles";

const CoreProperties = ({ market, isMobileSmall }) => (
  <div className={Styles.CoreProperties__coreContainer}>
    <div className={Styles.CoreProperties__row} style={{ minHeight: "55px" }}>
      <MarketHeaderReporting marketId={market.id} />
    </div>
    <div className={Styles.CoreProperties__property__container}>
      <div
        className={Styles.CoreProperties__column}
        style={{ flexGrow: "1", maxWidth: "180px" }}
      >
        <div className={Styles.CoreProperties__property}>
          <span>
            <div>Total Volume</div>
          </span>
          <span style={{ fontSize: "1.125rem" }}>
            {getValue(market, "volume.formatted")}
            <span className={Styles[`CoreProperties__property-denomination`]}>
              ETH
            </span>
          </span>
        </div>
        <div className={Styles.CoreProperties__property}>
          <span>
            <div>24hr Volume</div>
          </span>
          <span>
            {getValue(market, "volume.formatted")}
            <span className={Styles[`CoreProperties__property-denomination`]}>
              ETH
            </span>
          </span>
        </div>
        <div className={Styles.CoreProperties__property}>
          <span>
            <div>Type</div>
          </span>
          <span style={{ textTransform: "capitalize" }}>
            {getValue(market, "marketType") === YES_NO
              ? "Yes/No"
              : getValue(market, "marketType")}
          </span>
        </div>
      </div>
      <div className={Styles.CoreProperties__column}>
        <div className={Styles.CoreProperties__property}>
          <span>
            <div>Open Interest</div>
          </span>
          <span style={{ fontSize: "1.125rem" }}>
            {getValue(market, "openInterest.formatted")}
            <span className={Styles[`CoreProperties__property-denomination`]}>
              ETH
            </span>
          </span>
        </div>
        <div className={Styles.CoreProperties__property}>
          <span>
            <div>Estimated Fee</div>
          </span>
          <span>{getValue(market, "settlementFeePercent.full")}</span>
        </div>
        <div>
          <label
            className={classNames(
              TooltipStyles.TooltipHint,
              Styles["CoreProperties__property-tooltip"]
            )}
            data-tip
            data-for="tooltip--market-fees"
          >
            {infoIcon}
          </label>
          <ReactTooltip
            id="tooltip--market-fees"
            className={TooltipStyles.Tooltip}
            effect="solid"
            place="right"
            type="light"
          >
            <h4>Trading Settlement Fee</h4>
            <p>
              The trading settlement fee is a combination of the Market Creator
              Fee (<b>{getValue(market, "marketCreatorFeeRatePercent.full")}</b>
              ) and the Reporting Fee (
              <b>{getValue(market, "reportingFeeRatePercent.full")}</b>)
            </p>
          </ReactTooltip>
        </div>
        {getValue(market, "marketType") === SCALAR && (
          <div>
            <div className={Styles.CoreProperties__property}>
              <span>
                <div>Denominated In</div>
              </span>
              <span>{getValue(market, "scalarDenomination")}</span>
            </div>
            <div className={Styles.CoreProperties__min__max__dots}>
              <div>
                <span className={Styles.CoreProperties__property__min__max}>
                  <div>Min</div>
                </span>
                <span>{getValue(market, "minPrice").toString()}</span>
              </div>
              <span className={Styles.CoreProperties__dotted__line} />
              <div>
                <span className={Styles.CoreProperties__property__min__max}>
                  <div>Max</div>
                </span>
                <span>{getValue(market, "maxPrice").toString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

CoreProperties.propTypes = {
  market: PropTypes.object.isRequired,
  isMobileSmall: PropTypes.bool
};

CoreProperties.defaultProps = {
  isMobileSmall: false
};

export default CoreProperties;
