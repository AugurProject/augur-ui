import React from "react";
import classNames from "classnames";

import * as constants from "modules/common-elements/constants";
import { ImmediateImportance } from "modules/common-elements/icons";
import { PillLabel } from "modules/common-elements/labels";
import { CompactButton } from "modules/common-elements/buttons";

import Styles from "modules/account/components/notifications/notification-card.styles";

export interface NotificationProps {
  type: string;
  isImportant: boolean;
  isNew: boolean;
  title: string;
  buttonLabel: string;
  buttonAction: Function;
  children: React.StatelessComponent;
}

const { NOTIFICATION_TYPES } = constants;

export const NotificationCard = (props: NotificationProps) => (
  <div className={Styles.NotificationCard}>
    <div className={Styles.NotificationCard__content}>
      <div className={Styles.NotificationCard__content__titleBar}>
        {props.isImportant && (
          <span className={Styles.NotificationCard__content__Importance}>
            {ImmediateImportance}
          </span>
        )}
        <span
          className={classNames(Styles.NotificationCard__content__title, {
            [Styles.NotificationCard__content__title__new]: props.isNew
          })}
        >
          {props.title}
        </span>
        {props.isNew && <PillLabel label={constants.NEW} />}
      </div>
      <div
        className={classNames(Styles.NotificationCard__content__message, {
          [Styles.NotificationCard__content__message__new]: props.isNew
        })}
      >
        {props.children}
      </div>
    </div>

    <CompactButton
      text={props.buttonLabel}
      action={() => props.buttonAction()}
      disabled={props.type === NOTIFICATION_TYPES.proceedsToClaimOnHold}
    />
  </div>
);
