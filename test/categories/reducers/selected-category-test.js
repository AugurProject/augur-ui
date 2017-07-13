import { describe, it } from 'mocha';
import { assert } from 'chai';

import selectedCategory from 'modules/categories/reducers/selected-category';

import { UPDATE_URL } from 'modules/link/actions/update-url';

describe('modules/categories/reducers/selected-category.js', () => {
  const test = (t) => {
    it(t.describe, () => {
      t.assertions();
    });
  };

  test({
    describe: 'should return the default value',
    assertions: () => {
      const actual = selectedCategory(undefined, { type: null });

      const expected = null;

      assert.equal(actual, expected, `Didn't return the expected default value`);
    }
  });

  test({
    describe: 'should return the existing value',
    assertions: () => {
      const actual = selectedCategory('category', { type: null });

      const expected = 'category';

      assert.equal(actual, expected, `Didn't return the expected existing value`);
    }
  });

  test({
    describe: 'should return the updated value',
    assertions: () => {
      const actual = selectedCategory('category', {
        type: UPDATE_URL,
        parsedURL: {
          searchParams: {
            category: 'new category'
          }
        }
      });

      const expected = 'new category';

      assert.equal(actual, expected, `Didn't return the expected updated value`);
    }
  });
});
