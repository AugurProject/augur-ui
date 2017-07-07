import React from 'react';
import classNames from 'classnames';

import Category from 'modules/categories/components/category';

const CategoryRows = (p) => {

  let row = 0;
  let itemCount = 1;

  const rowItems = p.categories.reduce((accum, topic) => {
    if (!accum[row]) {
      accum[row] = [];
    }

    accum[row].push(topic);

    if (itemCount % 3 === 0) row += 1;
    itemCount += 1;

    return accum;
  }, {});

  return (
    <div className="topic-rows">
      {Object.keys(rowItems).map((row, rowIndex) => (
        <div
          key={JSON.stringify(row)}
          className={classNames('topic-row')}
        >
          {rowItems[row].map((topic, topicIndex) => (
            <Topic
              key={topic.topic}
              topic={topic.topic}
              popularity={topic.popularity}
              selectTopic={p.selectTopic}
              isSearchResult={p.isSearchResult}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TopicRows;
