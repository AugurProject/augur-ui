import {
  UPDATE_IS_MOBILE,
  updateIsMobile
} from "modules/app/actions/update-is-mobile";

describe("modules/app/actions/update-is-mobile.js", () => {
  test("should return the expected string", () => {
    expect("UPDATE_IS_MOBILE").toStrictEqual(UPDATE_IS_MOBILE);
  });

  describe("updateIsMobile", () => {
    test("isMobile being set from call", () => {
      const actual = updateIsMobile(false);
      assert(actual).toEqual({
        type: UPDATE_IS_MOBILE,
        data: {
          isMobile: false
        }
      });
    });
  });
});
