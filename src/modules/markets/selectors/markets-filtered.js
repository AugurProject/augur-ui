import store from 'src/store';
import { selectKeywordsState, selectSelectedFilterSortState, selectSelectedTagsState, selectSelectedCategoryState, selectBranchReportPeriod } from 'src/select-state';
import selectAllMarkets from 'modules/markets/selectors/markets-all';

import { FILTER_TYPE_OPEN, FILTER_TYPE_CLOSED, FILTER_TYPE_REPORTING } from 'modules/markets/constants/filter-sort';

import { cleanKeywordsArray } from 'utils/clean-keywords';
import { isMarketDataOpen } from 'utils/is-market-data-open';
import { createBigCacheSelector } from 'utils/big-cache-selector';

export default function () {
  return selectFilteredMarkets(store.getState());
}

export const selectFilteredMarkets = createBigCacheSelector(3)(
  selectAllMarkets,
  selectKeywordsState,
  selectSelectedTagsState,
  selectSelectedCategoryState,
  selectSelectedFilterSortState,
  selectBranchReportPeriod,
  (markets, keywords, selectedTags, selectedCategory, selectedFilterSort, reportPeriod) => (
    markets.filter(market => isMarketFiltersMatch(
      market,
      keywords,
      selectedFilterSort,
      selectedTags,
      selectedCategory,
      reportPeriod
    ))
  )
);

export const isMarketFiltersMatch = (market, keywords, selectedFilterSort, selectedTags, selectedCategory, reportPeriod) => {

  const selectedTagsList = Object.keys(selectedTags);
  return isMatchKeywords(market, keywords) &&
    isMatchTags(market, selectedTagsList) &&
    isOfType(market, selectedFilterSort.type) &&
    isMatchCategory(market, selectedCategory) &&
    isDisplayable(market);

  function isMatchKeywords(market, keys) {
    const keywordsArray = cleanKeywordsArray(keys);
    if (!keywordsArray.length) {
      return true;
    }
    return keywordsArray.every(keyword => (
      market.description.toLowerCase().indexOf(keyword) >= 0 ||
      market.outcomes.some(outcome => outcome.name && outcome.name.indexOf(keyword) >= 0) ||
      market.tags.some(tag => tag.name.indexOf(keyword) >= 0)
    ));
  }

  function isOfType(market, type) {
    switch (type) {
      case (FILTER_TYPE_CLOSED):
        return !isMarketDataOpen(market);
      case (FILTER_TYPE_REPORTING):
        return market.tradingPeriod === reportPeriod;
      case (FILTER_TYPE_OPEN):
      default:
        return isMarketDataOpen(market);
    }
  }

  function isMatchTags(market, selectedTagsList) {
    if (!selectedTagsList.length) {
      return true;
    }
    return selectedTagsList.every(tag => market.tags.some(marketTag => marketTag.name === tag));
  }

  function isMatchCategory(market, selectedCategory) {
    if (!selectedCategory) {
      return true;
    }

    return market.tags.length && market.tags[0].name === selectedCategory;
  }

  function isDisplayable(market) {
    if (!market.isMalFormed) {
      return true;
    }
  }
};
