import { ETH, REP } from "modules/account/constants/asset-types";

describe("modules/account/constants/asset-types.js", () => {
  const runTest = t => test(t.description, () => t.expectations());

  runTest({
    description: `ETH should return the expected string`,
    expectations: () => {
      const expected = "ETH";

      expect(ETH).toStrictEqual(expected);
    }
  });

  runTest({
    description: `REP should return the expected string`,
    expectations: () => {
      const expected = "REP";

      expect(REP).toStrictEqual(expected);
    }
  });
});
