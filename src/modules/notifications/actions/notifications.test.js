import * as updateNotifications from "modules/notifications/actions/notifications";
import * as notificationLevels from "modules/notifications/constants/notifications";
import thunk from "redux-thunk";
import testState from "test/testState";
import configureMockStore from "redux-mock-store";

describe("modules/notifications/actions/notifications", () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const state = Object.assign({}, testState);
  const store = mockStore(state);

  describe("addNotification", () => {
    test("if returns nothing when the notifications param is null/undefined", () => {
      expect(
        store.dispatch(updateNotifications.addNotification())
      ).toBeUndefined();
    });

    test("if returns the expected object when a notification is passed in", () => {
      expect(store.dispatch(updateNotifications.addNotification({}))).toEqual({
        type: updateNotifications.ADD_NOTIFICATION,
        data: {
          notification: {
            level: notificationLevels.INFO,
            networkId: null,
            seen: false,
            universe: undefined
          }
        }
      });
    });

    test("if the notification level defaults to the 'INFO' constant", () => {
      expect(
        store.dispatch(updateNotifications.addNotification({})).data
          .notification.level
      ).toBe(notificationLevels.INFO);
    });

    test("if overrides the default notification level with the value passed in the notification object param", () => {
      expect(
        store.dispatch(
          updateNotifications.addNotification({
            level: notificationLevels.CRITICAL
          })
        ).data.notification.level
      ).toBe(notificationLevels.CRITICAL);
    });
  });

  describe("removeNotification", () => {
    test("if returns the expected object", () => {
      expect(store.dispatch(updateNotifications.removeNotification(1))).toEqual(
        {
          type: updateNotifications.REMOVE_NOTIFICATION,
          data: { id: 1 }
        }
      );
    });
  });

  describe("updateNotification", () => {
    test("if returns the expected object", () => {
      expect(
        store.dispatch(
          updateNotifications.updateNotification(1, {
            testing: "test_update"
          })
        )
      ).toEqual({
        type: updateNotifications.UPDATE_NOTIFICATION,
        data: {
          id: 1,
          notification: {
            testing: "test_update"
          }
        }
      });
    });
  });

  describe("clearNotifications", () => {
    test("if returns the expected object", () => {
      expect(store.dispatch(updateNotifications.clearNotifications())).toEqual({
        type: updateNotifications.CLEAR_NOTIFICATIONS,
        data: {
          level: notificationLevels.INFO
        }
      });
    });

    describe("notificationLevel", () => {
      test("the 'INFO' constant", () => {
        expect(
          store.dispatch(updateNotifications.clearNotifications()).data.level
        ).toBe(notificationLevels.INFO);
      });

      test("if passes notificationLevel", () => {
        expect(
          updateNotifications.clearNotifications(notificationLevels.CRITICAL)
            .data.level
        ).toBe(notificationLevels.CRITICAL);
      });
    });
  });
});
