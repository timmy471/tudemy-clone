import React from "react";
import PropTypes from "prop-types";

import CourseItem from "./CourseItem";

const ForCourses = ({ courses }) => {
  return (
    <div className="container">
      <div className="container">
        <div className=" row">
          {/* {authors.map((author, index) => {
        const course = courses[index];
        return (
           
          <div className="col-xs-12 col-sm-12 col-md-3"  key={course.id}>
           
            <CourseItem course={course} author={author} />
            
          </div>
        );
      })} */}
          {courses.map((course) => {
            return (
              <div className="col-xs-12 col-sm-12 col-md-3" key={course.id}>
                <CourseItem course={course} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

ForCourses.propTypes = {
  courses: PropTypes.array
};

export default ForCourses;
