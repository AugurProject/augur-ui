import React from "react";

import BoxHeader from "modules/portfolio/components/common/headers/box-header";
import { NotificationCard } from "modules/common-elements/notifications";
import { PillLabel } from "modules/common-elements/labels";
import * as constants from "modules/common-elements/constants";

import Styles from "modules/account/components/notifications/notification-box.styles";

import { Notifications } from "modules/account/types";

export interface NotificationBoxProps {
  notifications: Array<Notifications>;
  currentTime: number;
  reportingWindowEndtime: number;
}

const NotificationBox = (props: NotificationBoxProps) => {
  const { currentTime, reportingWindowEndtime, notifications } = props;
  const notificationCount = notifications.length;
  const newNotificationCount = notifications.filter((item: any) => item.isNew).length;

  const rows = notifications.map((notification: Notifications, idx: number) => {
    const {
      isImportant,
      isNew,
      title,
      buttonLabel,
      buttonAction,
      Template,
      market
    } = notification;

    const templateProps = { market, currentTime, reportingWindowEndtime };
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
