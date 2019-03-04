import React from "react";
import * as constants from "modules/common-elements/constants";
import {
  StarIcon,
  XIcon,
  EthIcon,
  PercentIcon,
  WithdrawIcon,
  DepositIcon,
  DoubleArrowIcon,
  RepLogoIcon
} from "modules/common-elements/icons";
import classNames from "classnames";

import Styles from "modules/common-elements/buttons.styles";

export interface DefaultButtonProps {
  text: string;
  action: Function;
  disabled?: boolean;
  title?: string;
}

export interface CurrencyActionButtonProps {
  action: Function;
  disabled?: boolean;
  title?: string;
}

export interface EthPercentProps {
  action: Function;
  disabled?: boolean;
  title?: string;
  showEth: boolean;
}

export interface OrderButtonProps extends DefaultButtonProps {
  type: constants.BUY | constants.SELL;
}

export interface FavoritesButton extends DefaultButtonProps {
  isFavorite: boolean;
  hideText?: boolean;
  isSmall?: boolean;
}

export const PrimaryButton = (props: DefaultButtonProps) =>
  <button
    onClick={(e) => props.action(e)}
    className={Styles.PrimaryButton}
    disabled={props.disabled}
    title={props.title || props.text}
  >
    {props.text}
  </button>;

export const SecondaryButton = (props: DefaultButtonProps) =>
  <button
    onClick={(e) => props.action(e)}
    className={Styles.SecondaryButton}
    disabled={props.disabled}
    title={props.title || props.text}
  >
    {props.text}
  </button>;

export const OrderButton = (props: OrderButtonProps) =>
  <button
    onClick={(e) => props.action(e)}
    className={props.type === constants.BUY ? Styles.BuyOrderButton : Styles.SellOrderButton}
    disabled={props.disabled}
    title={props.title}
  >
    {props.type === constants.BUY ? "Place Buy Order" : "Place Sell Order"}
  </button>;

export const FavoritesButton = (props: FavoritesButton) =>
  <button
    onClick={(e) => props.action(e)}
    className={classNames(Styles.FavoriteButton, {[Styles.FavoriteButton_Favorite]: props.isFavorite, [Styles.FavoriteButton__small]: props.isSmall })}
    disabled={props.disabled}
    title={props.title}
    style={props.hideText ? { marginRight: "0.5rem" } : undefined}
  >
    {StarIcon} {!props.hideText && `${
      props.isFavorite ?
        "Remove from" :
        "Add to"
    } watchlist`}
  </button>;

export const CompactButton = (props: DefaultButtonProps) =>
<button
  onClick={(e) => props.action(e)}
  className={Styles.CompactButton}
  disabled={props.disabled}
  title={props.title}
>
  {props.text}
</button>;

export const EthPercentButton = (props: EthPercentProps) =>
<button
  onClick={(e) => props.action(e)}
  className={classNames(Styles.CompactButton, Styles.EthPercentButton)}
  disabled={props.disabled}
  title={props.title}
>
  {!props.showEth ? EthIcon : PercentIcon }
</button>;

export const CancelTextButton = (props: DefaultButtonProps) =>
  <button
    onClick={(e) => props.action(e)}
    className={Styles.CancelTextButton}
    disabled={props.disabled}
    title={props.title}
  >
    {XIcon}{props.text}
  </button>;

export const DepositButton = (props: CurrencyActionButtonProps) =>
  <button
    onClick={(e) => props.action(e)}
    className={Styles.CurrenyActionButton}
    disabled={props.disabled}
    title={props.title || "Deposit"}
  >
    {DepositIcon}Deposit
  </button>;

export const WithdrawButton = (props: CurrencyActionButtonProps) =>
  <button
    onClick={(e) => props.action(e)}
    className={Styles.CurrenyActionButton}
    disabled={props.disabled}
    title={props.title || "Withdraw"}
  >
    {WithdrawIcon}Withdraw
  </button>;

export const ViewTransactionsButton = (props: CurrencyActionButtonProps) =>
  <button
    onClick={(e) => props.action(e)}
    className={Styles.ViewTransactionsButton}
    disabled={props.disabled}
    title={props.title || "View Transactions"}
  >
    {DoubleArrowIcon}View Transactions
  </button>;

export const REPFaucetButton = (props: CurrencyActionButtonProps) =>
  <button
    onClick={(e) => props.action(e)}
    className={Styles.REPFaucetButton}
    disabled={props.disabled}
    title={props.title || "REP Faucet"}
  >
    {RepLogoIcon}<span>REP Faucet</span>
  </button>;