import * as alertLevels from "modules/common-elements/constants";

import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  UPDATE_NOTIFICATION,
  CLEAR_NOTIFICATIONS
} from "modules/alerts/actions/alerts";

import alerts from "modules/alerts/reducers/alerts";

describe("modules/alerts/reducers/alerts", () => {
  test("returned the default state", () => {
    expect(alerts(undefined, {})).toHaveLength(0);
  });

  test("returned the expected array for type ADD_NOTIFICATION", () => {
    const actual = alerts([], {
      type: ADD_NOTIFICATION,
      data: {
        alert: {
          id: "0xTEST"
        }
      }
    });

    expect(actual).toEqual([
      {
        id: "0xTEST"
      }
    ]);
  });

  test("returned non dup array for type ADD_NOTIFICATION", () => {
    expect(
      alerts(
        [
          {
            id: "0xTEST"
          }
        ],
        {
          type: ADD_NOTIFICATION,
          data: {
            alert: {
              id: "0xTEST"
            }
          }
        }
      )
    ).toEqual([
      {
        id: "0xTEST"
      }
    ]);
  });

  test("returned the expected array for type REMOVE_NOTIFICATION", () => {
    expect(
      alerts(
        [
          {
            id: "0xTEST"
          }
        ],
        {
          type: REMOVE_NOTIFICATION,
          data: { id: "0xTEST" }
        }
      )
    ).toHaveLength(0);
  });

  test("returned the expected array for type UPDATE_NOTIFICATION", () => {
    expect(
      alerts(
        [
          {
            id: "0xTEST0"
          },
          {
            id: "0xTest1",
            seen: true,
            title: "old object"
          }
        ],
        {
          type: UPDATE_NOTIFICATION,
          data: {
            id: "0xTest1",
            alert: {
              seen: false,
              title: "new object"
            }
          }
        }
      )
    ).toEqual([
      {
        id: "0xTEST0"
      },
      {
        id: "0xTest1",
        seen: true,
        title: "new object"
      }
    ]);
  });

  describe("CLEAR_NOTIFICATIONS action", () => {
    test("removed items with the passed alert level.", () => {
      expect(
        alerts(
          [
            {
              id: "0xTEST0",
              level: alertLevels.INFO
            },
            {
              id: "0xTEST1",
              level: alertLevels.CRITICAL
            }
          ],
          {
            type: CLEAR_NOTIFICATIONS,
            data: {
              level: alertLevels.INFO
            }
          }
        )
      ).toEqual([
        {
          id: "0xTEST1",
          level: alertLevels.CRITICAL
        }
      ]);
    });
  });
});
