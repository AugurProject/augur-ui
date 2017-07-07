import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NullStateMessage from 'modules/common/components/null-state-message';
import TopicRows from 'modules/topics/components/topic-rows';


export default class TopicsView extends Component {
  static propTypes = {
    topics: PropTypes.array,
    branch: PropTypes.object,
    loginAccount: PropTypes.object,
    createMarketLink: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      nullMessage: 'No Topics Available',
      keywords: '',
      // TODO what are these for?
      lowerIndex: 0,
      upperIndex: 4,
      // Adjust these to change topic layout
      numberOfRows: 3,
      topicsPerRow: 3,
      sortedTopics: props.topics || []
    };

    this.setSortedTopicsState = this.setSortedTopicsState.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
    if (this.props.length)
      this.setSortedTopicsState(this.props);
  }

  componentWillUpdate(nextProps, nextState) {
    //  topics must be sorted here by openOrderVolume or we must compare more deeply here
    if (this.props.topics !== nextProps.topics) {
      this.setSortedTopicsState(nextProps.topics);
    }
  }

  setSortedTopicsState(topics) {
    const maxNumTopics = this.state.numberOfRows * this.state.topicsPerRow;
    topics.sort(function (a, b) {
      return a.openOrderVolume - b.openOrderVolume;
    });
    const sortedTopics = topics.slice(0, maxNumTopics);
    this.setState({
      sortedTopics
    });
  }

  render() {
    const p = this.props;
    const s = this.state;

    return (
      <section id="topics_view">
        <div id="topics_container">
          <div className="topics-header-container">
            <span className="topics-header">BET ON...</span>
          </div>
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
