/* eslint react/no-array-index-key: 0 */

import React, { Component } from "react";
import PropTypes from "prop-types";

import EtherscanLink from "modules/common/containers/etherscan-link";
import { formatShares } from "utils/format-number";
import { FilledOrder } from "modules/portfolio/types";
import MarketLink from "modules/market/components/market-link/market-link";
import { ViewIcon } from "modules/common-elements/icons";

import Styles from "modules/portfolio/components/common/tables/filled-orders-table.styles";

export interface FilledOrdersTableProps {
  filledOrder: FilledOrder;
  showMarketInfo: Boolean;
}

const FilledOrdersTable = (props: FilledOrdersTableProps) => {
  const { filledOrder, showMarketInfo } = props;
  return (
    <div className={Styles.FilledOrdersTable}>
      <div className={Styles.FilledOrdersTable__inner}>
        {showMarketInfo &&
          <MarketLink id={filledOrder.marketId}>
            <span>Market:</span> {filledOrder.marketDescription}
          </MarketLink>
        }
        <ul className={Styles.FilledOrdersTable__header}>
          <li />
          <li>Filled</li>
          <li>Time Stamp</li>
          <li>Transaction Details</li>
        </ul>
        {filledOrder.trades.map((trade: FilledOrder, i: number) => (
          <ul key={i} className={Styles.FilledOrdersTable__trade}>
            <li />
            <li>{formatShares(trade.amount).formatted}</li>
            <li>{trade.timestamp.formattedShortDate}</li>
            <li>
              <button className={Styles.FilledOrder__view}>
                { ViewIcon }
                <EtherscanLink
                  showNonLink
                  txhash={trade.transactionHash}
                  label="View"
                />
              </button>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default FilledOrdersTable;