import React from "react";

import BoxHeader from "modules/portfolio/components/common/headers/box-header";
import { NotificationCard } from "modules/common-elements/notifications";
import { PillLabel } from "modules/common-elements/labels";
import * as constants from "modules/common-elements/constants";

import Styles from "modules/account/components/notifications/notification-box.styles";

export interface Notifications {
  isImportant: boolean;
  isNew: boolean;
  title: string;
  marketId: string;
  buttonLabel: string;
  buttonAction: Function;
  marketName: string;
  round?: number;
  amount?: number;
  countDown?: Date;
  type: string;
  Template: React.StatelessComponent<any>;
}

export interface NotificationBoxProps {
  notifications: Array<Notifications>;
}

const NotificationBox = (props: NotificationBoxProps) => {
  const { notifications } = props;
  const notificationCount = notifications.length;
  const newNotificationCount = notifications.filter((item: any) => item.isNew)
    .length;

  const rows = notifications.map((notification: Notifications, idx: number) => {
    const {
      Template,
      marketName,
      round,
      amount,
      countDown,
      isImportant,
      isNew,
      title,
      buttonLabel,
      buttonAction
    } = notification;

    const templateProps = { marketName, amount, round, countDown };
    const notificationCardProps = {
      isImportant,
      isNew,
      title,
      buttonLabel,
      buttonAction
    };
    return (
      <NotificationCard key={idx} {...notificationCardProps}>
        <Template {...templateProps} />
      </NotificationCard>
    );
  });

  const labelContent = (
    <div className={Styles.NotificationBox__header}>
      <span>{`(${notificationCount} Notifications)`}</span>
      {newNotificationCount > 0 && (
        <PillLabel label={`${newNotificationCount} ${constants.NEW}`} />
      )}
    </div>
  );

  return (
    <div className={Styles.NotificationBox}>
      <BoxHeader title="Notifications" rightContent={labelContent} />
      <div className={Styles.NotificationBox__content}>{rows}</div>
    </div>
  );
};

export default NotificationBox;
