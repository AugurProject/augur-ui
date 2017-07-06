import React from 'react';
import classNames from 'classnames';

import Topic from 'modules/topics/components/topic';

const TopicRows = (p) => {
  // console.log(`TopicRows topics length: ${p.topics.length}`);
  let row = 0;
  let itemCount = 0;

  const rowItems = p.topics.reduce((accum, topic, i) => {
    if (!accum[row]) {
      accum[row] = [];
    }

    accum[row].push(topic);

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
