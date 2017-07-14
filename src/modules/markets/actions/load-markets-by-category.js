import { augur } from 'services/augurjs';
import { updateHasLoadedCategory } from 'modules/categories/actions/update-has-loaded-category';
import { loadMarketsInfo } from 'modules/markets/actions/load-markets-info';

export const loadMarketsByCategory = (category, branchID) => (dispatch, getState) => {
  dispatch(updateHasLoadedCategory({ [category]: true }));
  augur.categories.findMarketsWithCategory({ category, branchID }, (err, marketIDs) => {
    if (err) {
      console.error('ERROR findMarketsWithCategory()', err);
      dispatch(updateHasLoadedCategory({ [category]: false }));
    } else if (!marketIDs) {
      console.warn('WARN findMarketsWithCategory()', `no market id's returned`);
      dispatch(updateHasLoadedCategory({ [category]: false }));
    } else if (marketIDs.length) {
      dispatch(loadMarketsInfo(marketIDs));
    }
  });
};
