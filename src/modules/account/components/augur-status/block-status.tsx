import React from "react";
import classNames from "classnames";

import { formatNumber } from "utils/format-number";
import * as constants from "modules/common-elements/constants";

import Styles from "modules/account/components/augur-status/block-status.styles";

export interface BlockStatusProps {
  blocksBehind: number;
  lastProcessedBlockBn: number;
  highestBlockBn: number;
}

const BlockStatus = (props: BlockStatusProps) => {
  const { blocksBehind, lastProcessedBlockBn, highestBlockBn } = props;
  return (
    <>
      <div className={Styles.BlockStatus}>
          <div>
            <div>{constants.SYNC_BENIND}</div>
            <div>{blocksBehind}</div>
          </div>

          <div>
            <div>{constants.SYNC_PROCESSED}</div>
            <div>
              {formatNumber(lastProcessedBlockBn.toString()).formatted} /{" "}
              {formatNumber(highestBlockBn.toString()).formatted}
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.ShowOnMobile}>
      </div>
    </>
  );
};

export default BlockStatus;
