import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames';

import TopicTitle from 'modules/topics/components/topic-rows';
// import debounce from 'utils/debounce';
// import fitText from 'utils/fit-text';

export default class Topic extends Component {
  static propTypes = {
    popularity: PropTypes.number
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const p = this.props;

    return (
      <button
        key={`${p.topic}`}
        ref={(topicNameContainer) => { this.topicNameContainer = topicNameContainer; }}
        className="unstyled topic-button"
        onClick={() => p.selectTopic(p.topic)}
      >
          <div className="topic-content">
            <TopicTitle topic={p.topic} />
            <span className="topic-content-border"></span>
            <div className="topic-order-volume">
              <span>
                {p.popularity}
              </span>
            </div>
          </div>
        <ReactTooltip id="topic-volume-tooltip" type="light" effect="solid" place="top">
          <span className="tooltip-text">Open Order Volume</span>
        </ReactTooltip>
      </button>
    );
  }
}
