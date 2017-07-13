import { describe, it } from 'mocha';
import { assert } from 'chai';
import { selectCategories } from 'modules/categories/selectors/categories';

describe(`modules/categories/selectors/select-order-book.js`, () => {
  const test = t => it(t.description, () => (
    t.assertions(selectCategories({ categories: t.categories }))
  ));
  test({
    description: 'no categories',
    categories: {},
    assertions: (output) => {
      assert.deepEqual(output, []);
    }
  });
  test({
    description: '1 category',
    categories: {
      testing: 10
    },
    assertions: (output) => {
      assert.deepEqual(output, [
        { category: 'testing', popularity: 10 }
      ]);
    }
  });
  test({
    description: '2 categories of unequal popularity',
    categories: {
      testing: 10,
      backflips: 2
    },
    assertions: (output) => {
      assert.deepEqual(output, [
        { category: 'testing', popularity: 10 },
        { category: 'backflips', popularity: 2 }
      ]);
    }
  });
  test({
    description: '2 categories of equal popularity',
    categories: {
      testing: 10,
      frontflips: 10
    },
    assertions: (output) => {
      assert.deepEqual(output, [
        { category: 'testing', popularity: 10 },
        { category: 'frontflips', popularity: 10 }
      ]);
    }
  });
  test({
    description: '3 categories of unequal popularity',
    categories: {
      testing: 10,
      backflips: 2,
      sideflips: 5
    },
    assertions: (output) => {
      assert.deepEqual(output, [
        { category: 'testing', popularity: 10 },
        { category: 'sideflips', popularity: 5 },
        { category: 'backflips', popularity: 2 }
      ]);
    }
  });
  test({
    description: '3 categories, 2 of equal popularity',
    categories: {
      testing: 10,
      backflips: 2,
      frontflips: 10
    },
    assertions: (output) => {
      assert.deepEqual(output, [
        { category: 'testing', popularity: 10 },
        { category: 'frontflips', popularity: 10 },
        { category: 'backflips', popularity: 2 }
      ]);
    }
  });
  test({
    description: '3 categories of equal popularity',
    categories: {
      testing: 10,
      twirling: 10,
      frontflips: 10
    },
    assertions: (output) => {
      assert.deepEqual(output, [
        { category: 'testing', popularity: 10 },
        { category: 'twirling', popularity: 10 },
        { category: 'frontflips', popularity: 10 }
      ]);
    }
  });
});
