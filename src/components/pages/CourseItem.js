import React from "react";
import { Link } from "react-router-dom";


const CourseItem = ({ course, author, btnStyle }) => {
  const { title, category, pic_url } = course;
  const { first_name, last_name } = author;

  return (
    <div>
      <div className="card mt-4" style={{ width: "100%" }}>
        <img src={pic_url}  height="150" width="150" className="card-img-top" alt={title} />   

        <div className="card-body">
          
          <div className="card-title">
            <h5>{title}</h5> 
            <p>{first_name} {last_name}</p>
          </div>
          
          
          <Link to="" style={{textDecoration:"none"}}>
            <span className="btn btn-info">View Course</span>
          
          </Link>
        </div>
      </div>
    </div>
  );
};



export default CourseItem;
