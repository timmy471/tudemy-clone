import React from "react";
import { Link } from "react-router-dom";

const CourseItem = ({ course }) => {
  const { title, category, image_url } = course;

  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <img src={image_url}  height="150" width="150" className="card-img-top" alt={title} />   

        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{category}</p>
          <Link to="">
            <button className="btn btn-primary">View Course</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
