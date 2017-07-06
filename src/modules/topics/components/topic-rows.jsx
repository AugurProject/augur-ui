import React from 'react';
import classNames from 'classnames';

import Topic from 'modules/topics/components/topic';

const TopicRows = (p) => {

  let row = 0;
  let itemCount = 1;

  const rowItems = p.topics.reduce((accum, topic) => {
    if (!accum[row]) {
      accum[row] = [];
    }

    accum[row].push(topic);

    if (itemCount % 3 === 0) row += 1;
    itemCount += 1;

    return accum;
  }, {});

  // console.log(`${Object.keys(rowItems).length}`);

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
              // isSpacer={!Object.keys(topic).length}
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
