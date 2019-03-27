import React from "react";
import classNames from "classnames";
import { Close, Info } from "modules/common/components/icons";
import ReactTooltip from "react-tooltip";
import TooltipStyles from "modules/common/less/tooltip.styles";
import Styles from "modules/market/components/market-header/market-header-message.styles";

export const MarketHeaderMessage = () => (
  <div className={Styles.MarketHeaderMessage}>
    <span>{Close}</span>
    <div style={{ display: "inline-block" }}>
      <span>
        Always make sure that the <span className={Styles.bolden}>title</span>,
        <span className={Styles.bolden}>details</span>,{" "}
        <span className={Styles.bolden}>reporting start time</span>,{" "}
        <span className={Styles.bolden}>resolution source</span> and{" "}
        <span className={Styles.bolden}>outcomes</span> are not in direct
        conflict with each other{" "}
        <span
          className={TooltipStyles.TooltipHint}
          data-tip
          data-for="tooltip--message"
        >
          {Info}
        </span>
        <ReactTooltip
          id="tooltip--message"
          className={classNames(
            TooltipStyles.Tooltip,
            Styles.MarketHeaderMessage__tooltip
          )}
          effect="solid"
          place="top"
          type="light"
        >
          <div style={{ color: "#372e4b" }}>
            {
              <div>
                <p>
                  Markets on Augur are created by the community, this means that
                  errors are can be made in the creation of a market, which can
                  result in the market being resolved as invalid. If a market
                  resolves as invalid, each share is refunded to traders in
                  equally amounts.
                </p>
                <p>
                  If the reporting start time (UTC) isn’t after the actual end
                  of the event, or if the title/description and reporting start
                  time don’t match up, don’t trade on the market.
                </p>
              </div>
            }
          </div>
        </ReactTooltip>
      </span>
    </div>
  </div>
);
