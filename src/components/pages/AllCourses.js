import React, { useEffect, useState, useContext } from "react";
import ForCourses from "../layouts/ForCourses";
import Login from "../pages/Login";
import Spinner from "../layouts/Spinner";
import Search from "../layouts/Search";

import CourseContext from "../../context/course/courseContext";

const Courses = () => {
  const courseContext = useContext(CourseContext);
  const { getCourses, courses, loading, authors } = courseContext;

  useEffect(() => {
    
    getCourses();
    //eslint-disable-next-line
  }, []);

  let i = 1;
  const getNextPage = () => {
    i = i + 1;
    getCourses(i);
    console.log(i);
  };

  return (
    <div>
      <Login />
      <Search />
      {loading || courses.length < 1 || authors.length < 1 ? (
        <Spinner />
      ) : (
        <div className="container">
          <div className="container">
            <div className="text-center mt-5">
              <h2>All Courses</h2>
            </div>

            <div
              className=" row mt-4"
              style={{
                backgroundColor: "white",
                padding: "1rem",
                borderRadius: "2rem",
              }}
            >
              {/* {authors.map((author, index) => {
          const course = courses[index];
          return (
             
            <div className="col-xs-12 col-sm-12 col-md-3"  key={course.id}>
             
              <CourseItem course={course} author={author} />
              
            </div>
          );
        })} */}

              <ForCourses courses={courses} />
            </div>
            <div className="text-center mt-4 mb-4">
              <button className="btn btn-info" onClick={getNextPage}>
                Previous
              </button>{" "}
              &nbsp; <button className="btn btn-info">Next</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
