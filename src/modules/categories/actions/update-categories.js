import { augur } from 'services/augurjs';
import { updateMarketCategory } from 'modules/markets/actions/update-markets-data';

export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIESS';
export const CLEAR_CATEGORYS = 'CLEAR_CATEGORIES';
export const UPDATE_CATEGORY_POPULARITY = 'UPDATE_CATEGORY_POPULARITY';

export const updateCategories = categorys => ({ type: UPDATE_CATEGORYS, categories});
export const clearCategories = () => ({ type: CLEAR_CATEGORYS });
export const updateCategoryPopularity = (category, amount) => ({ type: UPDATE_CATEGORY_POPULARITY, category, amount });

export const updateMarketCategoryPopularity = (marketID, amount) => (dispatch, getState) => {
  const market = getState().marketsData[marketID];
  if (market && market.category !== undefined) {
    if (market.category !== null) dispatch(updateCategoryPopularity(market.category, Number(amount)));
  } else {
    augur.api.Markets.returnTags({ market: marketID }, (tags) => {
      if (tags && tags.constructor === Array && tags.length && tags[0] !== null) {
        const category = augur.format.tag.decodeTag(tags[0]);
        dispatch(updateCategoryPopularity(category, Number(amount)));
        dispatch(updateMarketCategory(marketID, category));
      }
    });
  }
};
