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
      lowerIndex: 0,
      upperIndex: 4,
      categoriesPerRow: 3,
      categories: props.categories || []
    };

  }

  componentDidMount() {
    this.setHeaderCategory();
  }

  componentWillUpdate(nextProps) {
    if (this.props.categories !== nextProps.categories) {
      this.setState({
        categories: nextProps.categories
      });
    }
  }

  setHeaderCategory() {
    if (this.state.categories.length) {
      const categories = this.state.categories;
      this.setState({
        headerCategory: categories[Math.floor(Math.random() * categories.length)]
      });
    }
  }

  render() {

    const p = this.props;
    const s = this.state;

    return (
      <section id="categories_view">
        <div id="categories_container">
          <div className="categories-header-container">
            <span className="categories-header">BET ON...</span>
            <div className="category-title">
              {s.headerCategory.toUpperCase()}
            </div>
            {p.categories.length ?
              <div className="topics">
                <TopicRows
                  topics={s.paginatedTopics}
                  topicsPerRow={s.topicsPerRow}
                  hasHeroRow={s.currentPage === 1}
                  topicsPerHeroRow={s.topicsPerHeroRow}
                  selectTopic={p.selectTopic}
                  isSearchResult={!!s.keywords}
                  fontAwesomeClasses={s.fontAwesomeClasses}
                  icoFontClasses={s.icoFontClasses}
                />
              </div> :
              <NullStateMessage message={s.nullMessage} />
            }
          </div>
        </div>
      </section>
    );
  }
}
