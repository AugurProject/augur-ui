import { UPDATE_NOTIFICATIONS } from "modules/notifications/actions/update-notifications";
import { CLEAR_LOGIN_ACCOUNT } from "modules/auth/actions/update-login-account";
import { RESET_STATE } from "modules/app/actions/reset-state";
import { Notifications } from "modules/account/components/notifications/notification-box";

const DEFAULT_STATE: Array<null> = [];

export interface Data {
  notifications: Array<Notifications>;
}

export interface Action {
  type: string;
  data: Data;
}

export default (notifications = DEFAULT_STATE, action: Action) => {
  switch (action.type) {
    case UPDATE_NOTIFICATIONS:
      return action.data.notifications;
    case RESET_STATE:
    case CLEAR_LOGIN_ACCOUNT:
      return DEFAULT_STATE;
    default:
      return notifications;
  }
};
