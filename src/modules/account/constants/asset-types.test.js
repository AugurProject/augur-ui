import { ETH, REP } from "modules/account/constants/asset-types";

describe("modules/account/constants/asset-types.js", () => {
  const runTest = t => it(t.description, () => t.assertions());

  runTest({
    description: `ETH should return the expected string`,
    assertions: () => {
      const expected = "ETH";

      expect(ETH).toStrictEqual(expected);
    }
  });

  runTest({
    description: `REP should return the expected string`,
    assertions: () => {
      const expected = "REP";

      expect(REP).toStrictEqual(expected);
    }
  });
});
