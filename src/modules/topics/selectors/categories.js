import { createSelector } from 'reselect';
import store from 'src/store';
import { selectCategoriesState } from 'src/select-state';

export default function () {
  return selectCategories(store.getState());
}

export const selectCategories = createSelector(
  selectCategoriesState,
  categories => Object.keys(categories || {})
                  .map(category => ({ category, openOrderVolume: categories[category] }))
                  .sort(openOrderVolumeDifference)
);

const openOrderVolumeDifference = (category1, category2) => category2.openOrderVolume - category1.openOrderVolume;
