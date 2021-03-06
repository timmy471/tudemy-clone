import React, { useContext, useEffect } from "react";
import Jumbotron from "../layouts/Jumbotron";
import Spinner from '../layouts/Spinner';
import Categories from "../layouts/Categories";
import ForCourses from "../layouts/ForCourses";
import Testimonials from "../layouts/Testimonials";

import Login from "./Login";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import AuthContext from "../../context/auth/authContext";
import CourseContext from "../../context/course/courseContext";

const Home = () => {
  const authContext = useContext(AuthContext);
  const courseContext = useContext(CourseContext);

  const { latest, getLatest, loading, clearCurrent } = courseContext;

  const { loadUser, authUser, redirect } = authContext;

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      loadUser(localStorage.getItem("user_id"));
      authUser();
    }

    getLatest();
    clearCurrent();

    // eslint-disable-next-line
  }, []);

  if (redirect) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      {/* <Login /> */}
      <Jumbotron />
      <Categories />
      <div style={coursesStyle}>
        <h3 className="text-center mt-4">
          REC<span style={underline}>ENT COUR</span>SES
        </h3>
        <div className="mt-4">
          {!loading ? (
          <>
          <ForCourses courses={latest} />
          <div className="text-center">
            <Link to="/courses" style={linkStyle}>
              <button style={btnStyle}>View All</button>
            </Link>
          </div>
          </>) : <Spinner />}
        </div>
      </div>
      <Testimonials />
    </div>
  );
};

const btnStyle = {
  marginTop: "2rem",
  borderRadius: "4rem",
  backgroundColor: "#f01662",
  padding: "1rem 6rem",
  border: "none",
  color: "white",
};

const linkStyle = {
  textDecoration: "none",
  color: "white",
};

const coursesStyle = {
  marginTop: "4rem",
};

const underline = {
  marginTop: "8rem",
  borderBottom: "5px solid rgb(221, 62, 168)",
  paddingBottom: "0.5rem",
};

Home.propTypes = {
  latest: PropTypes.array,
  getLatest: PropTypes.func,
  loading: PropTypes.bool,
  clearCurrent: PropTypes.func,
  loaduser: PropTypes.func,
  authUser: PropTypes.func,
};

export default Home;
