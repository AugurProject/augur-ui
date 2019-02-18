import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import ToggleRow from "modules/portfolio/components/common/toggle-row";
import { MarketStatusLabel } from "modules/common-elements/labels";

import Styles from "modules/portfolio/components/common/market-row.styles";

// MarketRow__time will end up being a passed in prop

export default class MarketRow extends Component {
  static propTypes = {
    market: PropTypes.object.isRequired,
    showState: PropTypes.bool.isRequired
  };

  render() {
    const { market, showState } = this.props;
    return (
      <ToggleRow
        style={{padding: (showState ? '8px 28px 22px 24px' : '') }}
        rowContent={
          <div
            className={classNames(Styles.MarketRow__market, {
              [Styles.MarketRow__showState]: showState
            })}
          >
            {showState && (
              <MarketStatusLabel
                marketStatus={market.marketStatus}
                alternate
                mini
              />
            )}
            <div className={classNames(Styles.MarketRow__infoContainer, {
              [Styles['MarketRow__infoContainer--showState']]: showState
            })}>
              <span className={Styles.MarketRow__description}>{market.description}</span>
              <span className={Styles.MarketRow__time}>{market.creationTime.formattedShortDate}</span>
            </div>
          </div>
        }
        toggleContent={
          <div>
            info
          </div>
        }
      />
      
    );
  }
}
