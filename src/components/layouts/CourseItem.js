import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CourseItem = ({ course }) => {
  const { title, category, pic_url, id } = course;

  const newTitle = title.length > 45 ? title.substring(0, 45) + "..." : title;
  // const { first_name, last_name } = author;

  return (
    <div>
      <div className="card mt-4 mb-2 border-0" style={cardStyle}>
        <img
          src={pic_url}
          height="150"
          width="150"
          className="card-img-top"
          alt={title}
        />

        <div className="card-body">
          <div className="card-title">
            <h5>{newTitle}</h5>
            <p>{category}</p>
          </div>

          <Link to={`/course/${id}`} style={{ textDecoration: "none" }}>
            <span className="btn btn-info">View Course</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

CourseItem.propTypes = {
  course: PropTypes.object,
};

const cardStyle={ 
  width: "95%", 
  boxShadow:"20px 2px 20px 0px #ddd",
  margin:"0, auto"
}

export default CourseItem;
