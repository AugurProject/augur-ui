import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import NullStateMessage from 'modules/common/components/null-state-message';
import TopicRows from 'modules/topics/components/topic-rows';
import CategoriesHeader from 'modules/topics/components/categories-header';
import Input from 'modules/common/components/input';
import Link from 'modules/link/components/link';


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
  }

  componentWillUpdate(nextProps, nextState) {
    //  topics must be sorted here by openOrderVolume or we must compare more deeply here
    if (this.props.topics !== nextProps.topics) {
      this.setSortedTopicsState(topics, s);
    }
  }

  setSortedTopicsState(topics, s) {
    const maxNumTopics = this.state.numberOfRows * this.state.topicsPerRow + 1; // +1 because it seems like there's one at the top as well
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
