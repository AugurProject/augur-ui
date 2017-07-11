import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NullStateMessage from 'modules/common/components/null-state-message';
import CategoryRows from 'modules/categories/components/category-rows';


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
      headerCategory: '',
      nullMessage: 'No Categories Available'
    };

    this.setHeaderCategory = this.setHeaderCategory.bind(this);
  }

  componentDidMount() {
  }

  componentWillUpdate(nextProps) {
    if (this.props.categories !== nextProps.categories) {
      this.setState({categories: nextProps.categories});
      // this.setHeaderCategory(nextCategories);
    }
  }

  setHeaderCategory(categories) {
    // this.setState({
    //   headerCategory: categories[Math.floor(Math.random() * categories.length)]
    // });
  }

  render() {

    const p = this.props;
    const s = this.state;

    return (
      <section id="categories_view">
        <div id="categories_container">
          <div className="categories-header-container">
            <span className="categories-header">BET ON...</span>
            {/*<div className="category-title">*/}
              {/*{s.headerCategory.toUpperCase()}*/}
            {/*</div>*/}
            {s.categories.length ? (
              <div className="categories">
                <CategoryRows
                  categories={s.categories}
                  topicsPerRow={this.state.categoriesPerRow}
                />
              </div>
            ) : (
              <NullStateMessage message={s.nullMessage} />
              )
            }
          </div>
        </div>
      </section>
    );
  }
}
