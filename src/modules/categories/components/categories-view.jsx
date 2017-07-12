import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NullStateMessage from 'modules/common/components/null-state-message';
import CategoryRows from 'modules/categories/components/category-rows';
import CategoryTitle from 'modules/categories/components/category-title';

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

    this.setHeaderCategoryTitle = this.setHeaderCategoryTitle.bind(this);
  }

  componentDidMount() {
    setInterval(function () {
      if (this.state.categories.length) {
        this.setHeaderCategoryTitle(this.state.categories);
      }
    }.bind(this), 3000);
  }

  componentWillUpdate(nextProps) {
    if (this.props.categories !== nextProps.categories && nextProps.categories.length) {
      this.setState({ categories: nextProps.categories });
      this.setHeaderCategoryTitle(nextProps.categories);
    }
  }

  setHeaderCategoryTitle(categories) {
    this.setState({
      headerCategoryTitle: categories[Math.floor(Math.random() * categories.length)].category
    });
  }

  render() {
    const s = this.state;

    return (
      <section id="categories_view">
        <div id="categories_container">
          <div className="categories-header">
            <div className="categories-header">BET ON...</div>
            {s.categories && s.headerCategoryTitle && <CategoryTitle category={s.headerCategoryTitle} />}
          </div>
          {s.categories.length ?
            <div className="categories">
              <CategoryRows
                categories={s.categories}
                topicsPerRow={s.categoriesPerRow}
              />
            </div> :
            <NullStateMessage message={s.nullMessage} />
          }
        </div>
      </section>
    );
  }
}
