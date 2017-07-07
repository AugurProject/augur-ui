import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NullStateMessage from 'modules/common/components/null-state-message';
import CategoriesHeader from 'modules/categories/components/categories-header';
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
      nullMessage: 'No Categories Available',
      keywords: '',
      // TODO what are these for?
      lowerIndex: 0,
      upperIndex: 4,
      numberOfRows: 3,
      categoriesPerRow: 3,
      sortedCategories: []
    };

    this.setSortedCategoriesState = this.setSortedCategoriesState.bind(this);
  }

  componentDidMount() {
    this.setSortedCategoriesState(this.props.categories);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.categories !== nextProps.categories) {
      this.setSortedCategoriesState(nextProps.categories);
    }
  }

  setSortedCategoriesState(categories) {
    const maxNumCategories = this.state.numberOfRows * this.state.categoriesPerRow;
    // categories.sort(function (a, b) {
    //   return a.popularity - b.popularity;
    // });
    const sortedCategories = categories.slice(0, maxNumCategories);
    this.setState({
      sortedCategories
    });
    console.log(`sortedCategories.length: ${sortedCategories.length}`);
  }

  render() {

    const p = this.props;
    const s = this.state;

    return (
      <section id="categories_view">
        <div id="categories_container">
          <CategoriesHeader
            mainCategories={s.sortedCategories}
            allCategories={p.categories}
          />
          {s.sortedCategories.length ?
            <div className="categories">
              <CategoryRows
                categories={s.sortedCategories}
                categoriesPerRow={s.categoriesPerRow}
                selectCategory={p.selectCategory}
              />
            </div> :
            <NullStateMessage message={s.nullMessage} />
          }
        </div>
      </section>
    );
  }
}
