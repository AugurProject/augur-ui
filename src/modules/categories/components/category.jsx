import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import CategoryTitle from 'modules/categories/components/category-title';

import fitText from 'utils/fit-text';
import debounce from 'utils/debounce';

export default class Category extends Component {
  static propTypes = {
    popularity: PropTypes.number
  }

  constructor(props) {
    super(props);
    this.handleFitText = debounce(this.handleFitText.bind(this));
  }

  handleFitText() {
    // TODO
    fitText(this.categoryNameContainer, this.categoryName);
  }

  render() {
    const p = this.props;

    return (
      <button
        key={`${p.category}-${p.popularity}`}
        ref={(categoryNameContainer) => { this.categoryNameContainer = categoryNameContainer; }}
        className="unstyled category-button"
        onClick={() => p.selectCategory(p.category)}
      >
        <div className="category-content">
          <CategoryTitle category={p.category} />
          <span className="category-content-border"></span>
          <div className="category-order-volume">
            <span>
              {Math.floor(p.popularity).toLocaleString()}
            </span>
          </div>
        </div>
        <ReactTooltip id="category-volume-tooltip" type="light" effect="solid" place="top">
          <span className="tooltip-text">Total Market Volume</span>
        </ReactTooltip>
      </button>
    );
  }
}
