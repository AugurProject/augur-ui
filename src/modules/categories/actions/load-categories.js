import { augur } from 'services/augurjs';
import { clearCategories, updateCategories } from 'modules/categories/actions/update-categories';
import logError from 'utils/log-error';

export const loadCategories = (branchID, callback = logError) => (dispatch) => {
  let firstChunkLoaded;
  augur.categories.getCategoriesInfoChunked(branchID, 0, null, null, (categoriesInfoChunk) => {
    console.log('categories info chunk:', categoriesInfoChunk);
    if (!firstChunkLoaded) {
      firstChunkLoaded = true;
      console.log('first chunk, clearing categories...');
      dispatch(clearCategories());
    }
    dispatch(updateCategories(categoriesInfoChunk));
  }, callback);
};
