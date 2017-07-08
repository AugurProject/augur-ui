import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CategoryTitle from 'modules/categories/components/category-title';

export default class CategoriesHeader extends Component {
  static propTypes = {
    allCategories: PropTypes.array,
    mainCategories: PropTypes.array
  }

  constructor(props) {
    super(props);
    this.state = {
      unusedCategories: [],
      currentCategory: ''
    };
    this.setHeaderCategory = this.setHeaderCategory.bind(this);
    this.filterUnusedCategories = this.filterUnusedCategories.bind(this);
  }

  componentDidMount() {
    this.filterUnusedCategories();
    this.setHeaderCategory();
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.allCategories !== nextProps.allCategories || this.props.usedCategories !== nextProps.usedCategories) {
      this.setState({
        topics: nextProps.topics
      });
    }
  }

  //  Filter topics that can be used in topics-header from the ones used in the 9 boxes
  filterUnusedCategories() {
    /* TODO fix the consts below
    const allCategories = this.props.allCategories;
    const mainCategories = this.props.mainCategories;
    const usedCategories = allCategories.filter(category => {
      return mainCategories.indexOf(category) < 0;
    });
    console.log(`setting unused categories`);
    this.setState({
      usedCategories
    });*/
  }

  setHeaderCategory() {
    const usedCategories = this.state.usedCategories;
    this.setState({
      usedCategory: usedCategories[Math.floor(Math.random() * usedCategories.length)]
    });
  }

  render () {
    const p = this.props;
    const s = this.state;

    return (
      <div className="categories-header-container">
        <span className="categories-header">BET ON...</span>
        <CategoryTitle category={s.currentCategory} />
      </div>
    );
  }
}
