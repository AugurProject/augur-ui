import React from 'react';
import classNames from 'classnames';

import Category from 'modules/categories/components/category';

const CategoryRows = (p) => {

  let row = 0;
  let itemCount = 1;

  // shows 50 first then throws cannot read property reduce of undefined so CategoriesView is rerendering I believe.
  // console.log(`p.categories.length: ${p.categories.length}`);
  const rowItems = p.categories.reduce((accum, category) => {
    if (!accum[row]) {
      accum[row] = [];
    }

    accum[row].push(category);

    if (itemCount % 3 === 0) row += 1;
    itemCount += 1;

    return accum;
  }, {});

  return (
    <div className="category-rows">
      {Object.keys(rowItems).map((row, rowIndex) => (
        <div
          key={JSON.stringify(row)}
          className={classNames('topic-row')}
        >
          {rowItems[row].map((category, categoryIndex) => (
            <Category
              key={category.category}
              category={category.category}
              popularity={category.popularity}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default CategoryRows;
