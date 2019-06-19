import { augur } from "services/augurjs";
import {
  clearCategories,
  updateCategories
} from "modules/categories/actions/update-categories";
import logError from "utils/log-error";

const loadCategories = (params = {}, callback = logError) => (
  dispatch,
  getState
) => {
  const { universe } = getState();
  if (!universe.id) return callback(null);
  augur.markets.getCategories(
    { ...params, universe: universe.id },
    (err, categories) => {
      if (err) return callback(err);
      if (categories == null) return callback(null);
      dispatch(clearCategories());

      categories.sort(sortByLiquidityTokensDescending);
      categories.forEach(c => c.tags.sort(sortByLiquidityTokensDescending));

      dispatch(updateCategories(categories));
      callback(null, categories);
    }
  );
};

export default loadCategories;

function sortByLiquidityTokensDescending(a, b) {
  // If optimization needed, parseFloat for each object up
  // front instead of redundantly doing it each comparison.
  const oiA = parseFloat(a.liquidityTokens);
  const oiB = parseFloat(b.liquidityTokens);
  if (isNaN(oiA)) {
    return -1;
  }
  if (isNaN(oiB)) {
    return 1;
  }
  return oiB - oiA;
}
