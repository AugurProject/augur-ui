import React from "react";
import classNames from "classnames";
import {
    MarketStatusLabel,
  } from "modules/common-elements/labels";
import Styles from "./switch-labels-group.styles";

import {
    MARKET_OPEN,
    MARKET_REPORTING,
    MARKET_CLOSED
  } from "modules/common-elements/constants";

export interface KeyValuePair {
    key: string;
    label: string;
    num: number;
}

export interface SwitchLabelsGroupProps {
    tabs: Array<KeyValuePair>, 
    selectedTab: string, 
    selectTab: Function
}

export const SwitchLabelsGroup = (props: SwitchLabelsGroupProps) => {
    return (
        <div className={Styles.SwitchLabelsGroup}>
            {props.tabs.map(tab => (
                <div 
                    className={classNames(Styles.SwitchLabelsGroup__label, {
                        [`${Styles.active}`]: props.selectedTab === tab.key, 
                        [Styles.SwitchLabelsGroup_open]: tab.key === MARKET_OPEN,
                        [Styles.SwitchLabelsGroup_resolved]: tab.key === MARKET_REPORTING,
                        [Styles.SwitchLabelsGroup_reporting]: tab.key === MARKET_CLOSED
                    })}
                    onClick={() => {props.selectTab(tab.key)}}
                >
                    {tab.label} <span>({tab.num})</span>
                </div>
            ))}
        </div>
    );
}