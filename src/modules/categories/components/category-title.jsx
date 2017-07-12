import React from 'react';

const CategoryTitle = (p) => {
  return (
    <div className="category-title">
      {p.category.toUpperCase()}
    </div>
  );
};

export default CategoryTitle;
