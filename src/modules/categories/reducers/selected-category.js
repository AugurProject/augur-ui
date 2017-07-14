import { UPDATE_URL } from 'modules/link/actions/update-url';

import getValue from 'utils/get-value';

export default function (category = null, action) {
  switch (action.type) {
    case UPDATE_URL: {
      const paramCategory = getValue(action, 'parsedURL.searchParams.category');
      if (paramCategory) {
        return paramCategory;
      }
      return null;
    }
    default:
      return category;
  }
}
