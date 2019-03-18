import { INotifications } from "modules/account/components/notifications/notifications";

export const UPDATE_NOTIFICATIONS = "UPDATE_NOTIFICATIONS";

export const updateNotifications = (notifications: INotifications) => ({
  type: UPDATE_NOTIFICATIONS,
  data: { notifications }
});
