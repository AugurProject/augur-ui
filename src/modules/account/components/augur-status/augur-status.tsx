import React from "react";

import BoxHeader from "modules/portfolio/components/common/headers/box-header";
import BlockStatus from "modules/account/components/augur-status/block-status";
import SyncStatus from "modules/account/components/augur-status/sync-status";
import * as constants from "modules/common-elements/constants";

import Styles from "modules/account/components/augur-status/augur-status.styles";

export interface SyncingInfo {
  percent: number;
  blocksBehind: number;
  highestBlockBn: number;
  lastProcessedBlockBn: number;
}

export interface AugurStatusProps {
  syncingInfo: SyncingInfo;
}

const AugurStatus = (props: AugurStatusProps) => {
  if (!props.syncingInfo) {
    return null;
  }

  const {
    percent,
    blocksBehind,
    highestBlockBn,
    lastProcessedBlockBn
  } = props.syncingInfo;

  return (
    <div className={Styles.AugurStatus}>
      <BoxHeader title={constants.AUGUR_STATUS_TITLE} />
      <div className={Styles.AugurStatusContent}>
        <SyncStatus syncPercent={percent} />
        <BlockStatus
          blocksBehind={blocksBehind}
          highestBlockBn={highestBlockBn}
          lastProcessedBlockBn={lastProcessedBlockBn}
        />
        <a
          href="https://docs.augur.net/#augur-node-functions"
          target="_blank"
          rel="noopener noreferrer"
        >
          {constants.LEARN_MORE_ABOUT_SYNCING}
        </a>
        {/* <Activity /> */}
      </div>
    </div>
  );
};

export default AugurStatus;
