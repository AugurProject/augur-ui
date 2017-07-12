import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NullStateMessage from 'modules/common/components/null-state-message';
import CategoryRows from 'modules/categories/components/category-rows';
import CategoryTitle from 'modules/categories/components/category-title'

export default class CategoriesView extends Component {
  static propTypes = {
    categories: PropTypes.array,
    loginAccount: PropTypes.object,
    createMarketLink: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      categoriesPerRow: 3,
      categories: props.categories || [],
      headerCategoryTitle: '',
      nullMessage: 'No categories available'
    };

    this.setHeaderCategory = this.setHeaderCategory.bind(this);
  }

  componentDidMount() {
  }

  componentWillUpdate(nextProps) {
    if (this.props.categories !== nextProps.categories) {
      const nextCategories = nextProps.categories;
      this.setState({categories: nextCategories});
      this.setHeaderCategory(nextCategories);
    }
  }

  setHeaderCategory(categories) {
    this.setState({
      headerCategory: categories[Math.floor(Math.random() * categories.length)]
    });
  }

  render() {
    const s = this.state;

    return (
      <section id="categories_view">
        <div id="categories_container">
          <div className="categories-header">
            <div className="categories-header">BET ON...</div>
            <CategoryTitle category={s.headerCategoryTitle} />
          </div>
          {s.categories.length ?
            <div className="categories">
              <CategoryRows
                categories={s.categories}
                topicsPerRow={this.state.categoriesPerRow}
              />
            </div> :
            <NullStateMessage message={s.nullMessage}/>
          }
          </div>
      </section>
    );
  }
}
