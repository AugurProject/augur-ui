import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TopicTitle from 'modules/topics/components/topic-rows';

export default class TopicsHeader extends Component {
  static propTypes = {
    allTopics: PropTypes.array,
    mainTopics: PropTypes.array
  }

  constructor(props) {
    super(props);
    this.state = {
      unusedTopics: [],
      currentTopic: ''
    };
    this.setHeaderTopic = this.setHeaderTopic.bind(this);
    this.filterUnusedTopics = this.filterUnusedTopics.bind(this);
  }

  componentDidMount() {
    this.filterUnusedTopics();
    this.setHeaderTopic();
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.allTopics !== nextProps.allTopics || this.props.usedTopics !== nextProps.usedTopics) {
      this.setState({
        topics: nextProps.topics
      });
    }
  }

  //  Filter topics that can be used in topics-header from the ones used in the 9 boxes
  filterUnusedTopics() {
    const allTopics = this.props.allTopics;
    const usedTopics = this.props.mainTopics;
    const unusedTopics = allTopics.filter(topic => {
      return usedTopics.indexOf(topic) < 0;
    });
    console.log(`setting unused topics`);
    this.setState({
      unusedTopics
    });
  }

  setHeaderTopic() {
    const unusedTopics = this.state.unusedTopics;
    this.setState({
      currentTopic: unusedTopics[Math.floor(Math.random() * unusedTopics.length)]
    });
  }

  render () {
    const p = this.props;
    const s = this.state;

    return (
      <div className="topics-header-container">
        <span className="topics-header">BET ON...</span>
        <TopicTitle topic={s.currentTopic} />
      </div>
    );
  }
}
