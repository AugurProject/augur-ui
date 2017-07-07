import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames';


export default class TopicTitle extends Component {
  static propTypes = {
    topic: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const p = this.props;

    return (
      <div className="topic-title">
        <span ref={(topicName) => {
          this.topicName = topicName;
        }}>
          {p.topic.toUpperCase()}
        </span>
      </div>
    );
  }
}
