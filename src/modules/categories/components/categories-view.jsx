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
      nullMessage: 'No Categories Available'
    };

    this.setHeaderCategoryTitle = this.setHeaderCategoryTitle.bind(this);
  }

  componentDidMount() {
    const that = this;
    setInterval(() => {
      if (that.state.categories.length) {
        that.setHeaderCategoryTitle(that.state.categories);
      }
    }, 3000);
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
            <h1>BET ON...</h1>
            {s.categories && s.headerCategoryTitle &&
            <CategoryTitle
              category={s.headerCategoryTitle}
              className="categories-header-title"
            />
            //  TODO sprinkle bottom border per new design
            }
            <hr className="categories-header-bottom-border" />
          </div>
          {s.categories.length ?
            <div className="categories">
              <CategoryRows
                categories={s.categories}
                categoresPerRow={s.categoriesPerRow}
              />
            </div> :
            <NullStateMessage message={s.nullMessage} />
          }
        </div>
      </section>
    );
  }
}
