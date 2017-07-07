import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NullStateMessage from 'modules/common/components/null-state-message';
import TopicsHeader from 'modules/topics/components/topics-header';
import TopicRows from 'modules/topics/components/topic-rows';


export default class TopicsView extends Component {
  static propTypes = {
    topics: PropTypes.array,
    loginAccount: PropTypes.object,
    createMarketLink: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      nullMessage: 'No Categories Available',
      keywords: '',
      // TODO what are these for?
      lowerIndex: 0,
      upperIndex: 4,
      // Adjust these to change topic layout
      numberOfRows: 3,
      topicsPerRow: 3,
      sortedTopics: []
    };

    this.setSortedTopicsState = this.setSortedTopicsState.bind(this);
  }

  componentDidMount() {
    this.setSortedTopicsState(this.props.topics);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.topics !== nextProps.topics) {
      this.setSortedTopicsState(nextProps.topics);
    }
  }

  setSortedTopicsState(topics) {
    const maxNumTopics = this.state.numberOfRows * this.state.topicsPerRow;
    // topics.sort(function (a, b) {
    //   return a.popularity - b.popularity;
    // });
    const sortedTopics = topics.slice(0, maxNumTopics);
    this.setState({
      sortedTopics
    });
    console.log(`sortedTopics.length: ${sortedTopics.length}`);
  }

  render() {

    const p = this.props;
    const s = this.state;

    if (s.sortedTopics.length) console.log(`yesyesyesyesyesyesyesyesyes`);
    return (
      <section id="topics_view">
        <div id="topics_container">
          <TopicsHeader
            mainTopics={s.sortedTopics}
            allTopics={p.topics}
          />
          {s.sortedTopics.length ?
            <div className="topics">
              <TopicRows
                topics={s.sortedTopics}
                topicsPerRow={s.topicsPerRow}
                selectTopic={p.selectTopic}
              />
            </div> :
            <NullStateMessage message={s.nullMessage} />
          }
        </div>
      </section>
    );
  }
}
