import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CategoryTItle from 'modules/category/components/category-rows';

export default class CategoriesHeader extends Component {
  static propTypes = {
    allCategorys: PropTypes.array,
    mainCategorys: PropTypes.array
  }

  constructor(props) {
    super(props);
    this.state = {
      unusedCategories: [],
      currentCategory: ''
    };
    this.setHeaderCategory = this.setHeaderCategory.bind(this);
    this.filterUnusedCategorys = this.filterUnusedCategories.bind(this);
  }

  componentDidMount() {
    this.filterUnusedCategories();
    this.setHeaderCategory();
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.allCategories !== nextProps.allCategories || this.props.usedCategories !== nextProps.usedCategorys) {
      this.setState({
        categories: nextProps.categories
      });
    }
  }

  //  Filter categorys that can be used in categorys-header from the ones used in the 9 boxes
  filterUnusedCategorys() {
    const allCategorys = this.props.allCategories;
    const usedCategorys = this.props.mainCategories;
    const unusedCategorys = allCategories.filter(category => {
      return usedCategorys.indexOf(category) < 0;
    });
    console.log(`setting unused categorys`);
    this.setState({
      unusedCategorys
    });
  }

  setHeaderCategory() {
    const unusedCategorys = this.state.unusedCategories;
    this.setState({
      currentCategory: unusedCategories[Math.floor(Math.random() * unusedCategories.length)]
    });
  }

  render () {
    const p = this.props;
    const s = this.state;

    return (
      <div className="categorys-header-container">
        <span className="categorys-header">BET ON...</span>
        <CategoryTitle category={s.currentCategory} />



      </div>
    );
  }
}
