import React from "react";
import * as constants from "modules/common-elements/constants";
import { StarIcon, XIcon } from "modules/common-elements/icons";
import Styles from "modules/common-elements/buttons.styles";

export interface DefaultButtonProps {
  text: string;
  action: Function;
  disabled?: boolean;
  title?: string;
}

export interface OrderButtonProps extends DefaultButtonProps {
  type: constants.BUY | constants.SELL;
}

export interface FavoritesButton extends DefaultButtonProps {
  isFavorite: boolean;
  hideText?: boolean;
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
    className={
      props.isFavorite ?
        Styles.FavoriteButton_Favorite :
        Styles.FavoriteButton
    }
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

export const CancelTextButton = (props: DefaultButtonProps) =>
  <button
    onClick={(e) => props.action(e)}
    className={Styles.CancelTextButton}
    disabled={props.disabled}
    title={props.title}
  >
    {XIcon}{props.text}
  </button>;