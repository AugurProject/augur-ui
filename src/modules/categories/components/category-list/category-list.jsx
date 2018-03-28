import React from 'react'
import PropTypes from 'prop-types'

import Category from 'modules/categories/components/category/category'

import Styles from 'modules/categories/components/category-list/category-list.styles'

const CategoryList = ({ boundedLength, categories, lowerBound }) => {
  const isShortList = (categories.length <= 2)
  const arrayLength = isShortList ? categories.length : boundedLength
  const categoryStyling = isShortList ? Styles['CategoryList__categorywrap-short'] : Styles.CategoryList__categorywrap

  return (
    <div className={Styles.CategoryList}>
      {[...Array(arrayLength)].map((_, i) => {
        const categoryIndex = (lowerBound - 1) + i
        const category = (categories && categories[categoryIndex]) ? categories[categoryIndex] : null

        return (
          <div
            className={categoryStyling}
            key={category ? JSON.stringify(category) : `${JSON.stringify(category)}${categoryIndex}`}
          >
            <Category
              category={(category && !!category.category) ? category.category : 'null-category'}
              popularity={(category && !!category.popularity) ? category.popularity.toString() : '0'}
            />
          </div>
        )
      })}
    </div>
  )
}

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
  lowerBound: PropTypes.number,
  boundedLength: PropTypes.number,
}

export default CategoryList
