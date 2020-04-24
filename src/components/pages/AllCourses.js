import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import ForCourses from "../layouts/ForCourses";
import Spinner from "../layouts/Spinner";
import Search from "../layouts/Search";

import CourseContext from "../../context/course/courseContext";
import AuthContext from "../../context/auth/authContext";

const Courses = () => {
  const courseContext = useContext(CourseContext);
  const authContext = useContext(AuthContext);
  const {
    getCourses,
    courses,
    loading,
    courseCount,
    clearCurrent,
  } = courseContext;

  const [page, setPage] = useState(1);

  const incrementPage = () => {
    setPage(page + 1);
  };

  const decrementPage = () => {
    setPage(page - 1);
  };

  useEffect(() => {
    clearCurrent();
    authContext.authUser();
    getCourses(page);
    //eslint-disable-next-line
  }, [page]);

  return (
    <div>
      <Search />
      {loading ? (
        <Spinner />
      ) : courses.length < 1 ? (
        <div className="container text-center mt-4">
          <h4>There are no courses at the moment</h4>
        </div>
      ) : (
        <div className="container">
          <div className="container">
            <div className="text-center mt-5">
              <h2>All Courses</h2>
            </div>

            <div className=" row mt-4">
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
              {page > 1 && (
                <button onClick={decrementPage} className="btn btn-info">
                  Previous
                </button>
              )}{" "}
              &nbsp;{" "}
              {courseCount === 8 && (
                <button onClick={incrementPage} className="btn btn-info">
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Courses.propTypes = {
  getCourses: PropTypes.func,
  courses: PropTypes.array,
  loading: PropTypes.bool,
  courseCount: PropTypes.string,
  clearCurrent: PropTypes.func,
  setAlert: PropTypes.func,
};
export default Courses;
