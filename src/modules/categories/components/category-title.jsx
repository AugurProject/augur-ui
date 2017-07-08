import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames';


export default class CategoryTitle extends Component {
  static propTypes = {
    category: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const p = this.props;

    return (
      <div className="category-title">
        <span ref={(categoryName) => {
          this.categoryName = categoryName;
        }}>
          {p.category.toUpperCase()}
        </span>
      </div>
    );
  }
}
