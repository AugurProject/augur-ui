import { Notifications } from "modules/account/components/notifications/notification-box";

export const UPDATE_NOTIFICATIONS = "UPDATE_NOTIFICATIONS";

export const updateNotifications = (notifications: Notifications) => ({
  type: UPDATE_NOTIFICATIONS,
  data: { notifications }
});
