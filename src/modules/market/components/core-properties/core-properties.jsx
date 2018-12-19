/* eslint react/no-array-index-key: 0 */

import React from "react";
import PropTypes from "prop-types";
import { SCALAR, YES_NO } from "modules/markets/constants/market-types";
import Styles from "modules/market/components/core-properties/core-properties.styles";
import getValue from "utils/get-value";
import MarketHeaderReporting from "modules/market/containers/market-header-reporting";

const CoreProperties = ({ market, isMobileSmall }) => (
  <div className={Styles.CoreProperties__coreContainer}>
    <div className={Styles.CoreProperties__row}>
      <MarketHeaderReporting marketId={market.id} />
    </div>
    <div className={Styles.CoreProperties__row}>
      <div className={Styles.CoreProperties__property}>
        <span className={Styles[`CoreProperties__property-name`]}>
          <div>Total Volume</div>
        </span>
        <span className={Styles[`CoreProperties__property-value-large`]}>
          {getValue(market, "volume.formatted")}
          <span className={Styles[`CoreProperties__property-denomination`]}>
            ETH
          </span>
        </span>
      </div>
      <div className={Styles.CoreProperties__property}>
        <span className={Styles[`CoreProperties__property-name`]}>
          <div>Open Interest</div>
        </span>
        <span className={Styles[`CoreProperties__property-value-large`]}>
          {getValue(market, "openInterest.formatted")}
          <span className={Styles[`CoreProperties__property-denomination`]}>
            ETH
          </span>
        </span>
      </div>
    </div>
    <div className={Styles.CoreProperties__row}>
      <div className={Styles.CoreProperties__property}>
        <span className={Styles[`CoreProperties__property-name`]}>
          <div>24hr Volume</div>
        </span>
        <span className={Styles[`CoreProperties__property-value`]}>
          {getValue(market, "volume.formatted")}
          <span className={Styles[`CoreProperties__property-denomination`]}>
            ETH
          </span>
        </span>
      </div>
      <div className={Styles.CoreProperties__property}>
        <span className={Styles[`CoreProperties__property-name`]}>
          <div>Fee</div>
        </span>
        <span className={Styles[`CoreProperties__property-value`]}>
          {getValue(market, "settlementFeePercent.full")}
        </span>
      </div>
    </div>
    <div className={Styles.CoreProperties__row}>
      <div className={Styles.CoreProperties__property}>
        <span className={Styles[`CoreProperties__property-name`]}>
          <div>Type</div>
        </span>
        <span className={Styles[`CoreProperties__property-value`]}>
          {getValue(market, "marketType") === YES_NO
            ? "Yes/No"
            : getValue(market, "marketType")}
        </span>
      </div>
      {getValue(market, "marketType") === SCALAR && (
        <div>
          <div className={Styles.CoreProperties__row}>
            <div className={Styles.CoreProperties__property}>
              <span className={Styles[`CoreProperties__property-name`]}>
                <div>Denominated In</div>
              </span>
              <span className={Styles[`CoreProperties__property-value`]}>
                {getValue(market, "scalarDenomination")}
              </span>
            </div>
          </div>
          <div className={Styles.CoreProperties__row}>
            <div className={Styles.CoreProperties__property__container}>
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
          </div>
        </div>
      )}
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
