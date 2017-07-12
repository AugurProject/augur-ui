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
    console.log(`handling fitText()`);
    fitText(this.categoryNameContainer, this.categoryName);
  }

  render() {
    const p = this.props;
    const popularity = p.popularity > 999 ? (Math.ceil(p.popularity / 1000)).toLocaleString() :
      p.popularity;

    return (
      <button
        key={`${p.category}-${p.popularity}`}
        ref={(categoryNameContainer) => {
          this.categoryNameContainer = categoryNameContainer;
        }}
        className="unstyled category-button"
        onClick={() => p.selectCategory(p.category)}
      >
        <div className="category-content">
          <CategoryTitle
            ref={(categoryName) => {
              this.categoryName = categoryName;
            }}
            category={p.category.toUpperCase()}
          />
          <hr className="category-separator"/>
          <div className="category-popularity">
            <span>
              {popularity}K Shares
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
