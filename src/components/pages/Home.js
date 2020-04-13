import React, { useContext, useEffect } from "react";
import Jumbotron from "../layouts/Jumbotron";
import ForCourses from '../layouts/ForCourses';
import Login from "./Login";
import { Redirect, Link } from "react-router-dom";

import AuthContext from "../../context/auth/authContext";
import CourseContext from "../../context/course/courseContext";


const Home = () => {


  const authContext = useContext(AuthContext);
  const courseContext = useContext(CourseContext);

  const { latest, getLatest } = courseContext;

  const { redirect, loadUser } = authContext;

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      loadUser(localStorage.getItem("user_id"));
      
    }
    getLatest();
    //eslint-disable-next-line
  }, []);

  if (redirect) {
    return <Redirect to="/dashboard" />;
  } else {
    return (
      <div>
        <Login />
        <Jumbotron />
        <h2 className="text-center">Recent Courses</h2>
        <ForCourses courses={latest} />
        <div className="text-center">
        <Link to="/courses" style={{textDecoration:"none", color:"white"}} ><button style={btnStyle}>View All</button></Link>
      </div>
      </div>
    );
  }
};

const btnStyle={
 
  marginTop:"2rem",
  borderRadius:"4rem",
  backgroundColor: "#f01662",
  padding:"1rem 6rem",
  border:"none",
  color:"white",
  
  
}

export default Home;
