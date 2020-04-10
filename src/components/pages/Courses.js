import React, { useEffect, useContext } from "react";
import CourseItem from "./CourseItem";
import Spinner from "../layouts/Spinner";
import CourseContext from "../../context/course/courseContext";

const Courses = () => {
  const courseContext = useContext(CourseContext);
  const { getCourses, courses, loading } = courseContext;
  
  useEffect(() => {
    getCourses();
    //eslint-disable-next-line
  }, []);

    if(loading || courses.length<1){
        return <Spinner />
    }else{
        
  return (
    <div className="container mt-5 ">
      <h2 className="text-center">All Courses</h2>
      <div className="couses row mt-3">
        {courses.map(course => (
          <div className="col-xs-12 col-sm-12 col-md-3" key={course.id}>
            <CourseItem  course={course} />
          </div>
        ))}
      </div>
    </div>
  );
    }

};

export default Courses;
