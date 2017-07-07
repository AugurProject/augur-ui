import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
// import classNames from 'classnames';

import CategoryTitle from 'modules/categories/components/category-rows';
// import debounce from 'utils/debounce';
// import fitText from 'utils/fit-text';

export default class Category extends Component {
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
        key={`${p.category}`}
        ref={(categoryNameContainer) => { this.categoryNameContainer = categoryNameContainer; }}
        className="unstyled category-button"
        onClick={() => p.selectCategory(p.category)}
      >
          <div className="category-content">
            <CategoryTitle category={p.category} />
            <span className="category-content-border"></span>
            <div className="category-order-volume">
              <span>
                {p.popularity}
              </span>
            </div>
          </div>
        <ReactTooltip id="category-volume-tooltip" type="light" effect="solid" place="top">
          <span className="tooltip-text">Total Markets Volume</span>
        </ReactTooltip>
      </button>
    );
  }
}
