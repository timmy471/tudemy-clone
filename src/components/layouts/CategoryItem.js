import React from 'react';
import PropTypes from "prop-types";


const CategoryItem = ({category}) => {
    return (
        <div className="categoryItem text-center">
            <span className="icon">{category.icon}</span>
            <p>{category.title}</p>
        </div>
    )
}

CategoryItem.propTypes = {
    category: PropTypes.object,
  };

export default CategoryItem
