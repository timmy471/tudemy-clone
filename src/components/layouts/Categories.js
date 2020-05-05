import React from "react";
import CategoryItem from './CategoryItem';

import "../../stylesheets/category.css";


const Categories = () => {
  const categoryData = [
    {
      id: 1,
      icon: <i className="fa fa-database"></i>,
      title: "Development",
    },
    {
      id: 2,
      icon: <i className="fa fa-briefcase"></i>,
      title: "Business",
    },
    {
      id: 3,
      icon: <i className="fa fa-percent"></i>,
      title: "Finance and Accounting",
    },
    {
      id: 4,
      icon: <i className="fa fa-code"></i>,
      title: "IT and Sofware",
    },
    {
      id: 5,
      icon: <i className="fa fa-print"></i>,
      title: "Office Productivity",
    },
    {
      id: 6,
      icon: <i className="fa fa-camera-retro"></i>,
      title: "Photography",
    },
  ];

  return <div className="container categories">
      <h3 className="text-center">TO<span className="underline">P CATEGORI</span>ES</h3>
      <div className="row">
          {categoryData.map(category => (
              <div className="col-xs-6 col-sm-6 col-md-4 mt-4" key={category.id}>
                  <CategoryItem category={category} />
                  </div>
          ))}
      </div>
  </div>;
};

export default Categories;
