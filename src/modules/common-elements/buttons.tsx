import React from "react";
import * as constants from "./constants";
import { starIcon } from "modules/common/components/icons";
import Styles from "./buttons.styles";

export enum OrderTypes {
  BUY = constants.BUY,
  SELL = constants.SELL,
}

export interface DefaultButtonProps {
  text: string;
  action: Function;
  disabled?: boolean;
  title?: string;
}

export interface OrderButtonProps extends DefaultButtonProps {
  type: OrderTypes;
}

export interface FavoritesButton extends DefaultButtonProps {
  isFavorite: boolean;
  hideText?: boolean;
}

export const PrimaryButton = (props: DefaultButtonProps) => 
  <button
    onClick={() => props.action}
    className={Styles.PrimaryButton}
    disabled={props.disabled}
    title={props.title || props.text}
  >
    {props.text}
  </button>;

export const OrderButton = (props: OrderButtonProps) => 
  <button
    onClick={() => props.action}
    className={props.type === constants.BUY ? Styles.BuyOrderButton : Styles.SellOrderButton}
    disabled={props.disabled}
    title={props.title}
  >
    {props.type === constants.BUY ? "Place Buy Order" : "Place Sell Order"}
  </button>;

export const FavoritesButton = (props: FavoritesButton) =>
  <button
    onClick={() => props.action}
    className={
      props.isFavorite ?
        Styles.FavoriteButton_Favorite :
        Styles.FavoriteButton
    }
    disabled={props.disabled}
    title={props.title}
    style={props.hideText ? { marginRight: "0.5rem" } : undefined}
  >
    {starIcon} {!props.hideText && `${
      props.isFavorite ?
        "Remove from" :
        "Add to"
    } watchlist`}
  </button>;