import { createSelector } from 'reselect'
import { selectCategoriesState } from 'src/select-state'
import { WrappedBigNumber } from 'src/utils/wrapped-big-number'

export const selectCategories = createSelector(
  selectCategoriesState,
  categories => Object.values(categories || {})
    .map(({ category, popularity }) => ({
      category,
      popularity: WrappedBigNumber(popularity),
    }))
    .sort(popularityDifference),
)

const popularityDifference = (category1, category2) => category1.popularity.isLessThan(category2.popularity)
