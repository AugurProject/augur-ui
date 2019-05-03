import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { Flag } from "modules/common/components/icons";
import { CUTOFF } from "modules/trades/constants/numbers";
import ReactTooltip from "react-tooltip";
import TooltipStyles from "modules/common/less/tooltip.styles";
import Styles from "modules/market/components/cutoff-flag/cutoff-flag.styles";

// todo: add cut off date, add link to read more
const CutoffFlag = ({ endTime }) => (
  <>
    {endTime >= CUTOFF && (
      <div className={Styles.CutoffFlag}>
        <span data-tip data-for="tooltip-cutoff-flag">
          {Flag}
        </span>
        <ReactTooltip
          id="tooltip-cutoff-flag"
          className={classNames(TooltipStyles.Tooltip, Styles.Tooltip)}
          effect="solid"
          place="top"
          type="light"
          offset={{ right: 8 }}
        >
          <p>
            This market has an end-time after the cutoff date for the Augur v2
            release phase. Markets ending after [CUTOFF DATE] cannot be
            guaranteed to resolve correctly.
            <br />
            <a
              href="http://docs.augur.net"
              target="_blank"
              rel="noopener noreferrer"
              className={Styles.ReadMore}
            >
              Read more
            </a>
          </p>
        </ReactTooltip>
      </div>
    )}
  </>
);

CutoffFlag.propTypes = {
  endTime: PropTypes.number.isRequired
};

export default CutoffFlag;
