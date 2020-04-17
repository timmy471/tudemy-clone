import React, { useContext, useEffect } from "react";
import Jumbotron from "../layouts/Jumbotron";
import Spinner from "../layouts/Spinner";
import ForCourses from '../layouts/ForCourses';
import Login from "./Login";
import { Redirect, Link } from "react-router-dom";

import AuthContext from "../../context/auth/authContext";
import CourseContext from "../../context/course/courseContext";


const Home = (props) => {

  
  const authContext = useContext(AuthContext);
  const courseContext = useContext(CourseContext);

  const { latest, getLatest, loading, clearCurrent } = courseContext;

  const {  loadUser } = authContext;

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      loadUser(localStorage.getItem("user_id"));
    }
    getLatest();
    clearCurrent();
    //eslint-disable-next-line
  }, []);

  
    return (
      <div>
        <Login />
        <Jumbotron />
        <h2 className="text-center">Recent Courses</h2>
       {loading ? (<Spinner />) : ( 
       <div>
       <ForCourses courses={latest} />
        <div className="text-center">
        <Link to="/courses" style={{textDecoration:"none", color:"white"}} ><button style={btnStyle}>View All</button></Link>
      </div>
      </div>)}
      </div>
    );
  
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
