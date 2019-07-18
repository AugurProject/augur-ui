import {
  UPDATE_CATEGORIES,
  CLEAR_CATEGORIES
} from "modules/categories/actions/update-categories";
import { RESET_STATE } from "modules/app/actions/reset-state";

const DEFAULT_STATE = [];

// categories is of type Array<UICategory<string>>, see augur-node's types.ts
export default function(categories = DEFAULT_STATE, { type, data }) {
  switch (type) {
    case UPDATE_CATEGORIES:
      return Array.from(
        new Set([
          ...categories.map(c => c.categoryName),
          ...data.categories.map(c => c.categoryName)
        ])
      ).map(
        k =>
          data.categories.find(d => d.categoryName === k)
            ? data.categories.find(d => d.categoryName === k)
            : categories.find(d => d.categoryName === k)
      );
    case RESET_STATE:
    case CLEAR_CATEGORIES:
      return DEFAULT_STATE;
    default:
      return categories;
  }
}
