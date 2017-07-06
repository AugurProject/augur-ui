import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames';

import debounce from 'utils/debounce';
import fitText from 'utils/fit-text';

export default class Topic extends Component {
  static propTypes = {
    popularity: PropTypes.number
  }

  constructor(props) {
    super(props);
    this.state = {
    };

  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  render() {
    const p = this.props;
    // const s = this.state;

    return (
      <button
        key={`${p.topic}`}
        ref={(topicNameContainer) => { this.topicNameContainer = topicNameContainer; }}
        className="unstyled topic-button"
        onClick={() => p.selectTopic(p.topic)}
      >
          <div className="topic-content">
            <div className="topic-name" >
              <span ref={(topicName) => { this.topicName = topicName; }}>
                {p.topic.toUpperCase()}
              </span>
            </div>
            <div className="topic-popularity">
              <span
              >
                {p.topic.popularity}
              </span>
            </div>
          </div>
        <ReactTooltip id="topic-volume-tooltip" type="light" effect="solid" place="top">
          <span className="tooltip-text">Total Volume (TODO)</span>
        </ReactTooltip>
        <ReactTooltip id="topic-volume-tooltip" type="light" effect="solid" place="top">
          <span className="tooltip-text">Total Open Orders (TODO)</span>
        </ReactTooltip>
      </button>
    );
  }
}
