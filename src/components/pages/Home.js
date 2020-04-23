import React, { useContext, useEffect } from "react";
import Jumbotron from "../layouts/Jumbotron";
import Spiner from "../layouts/Spinner";
import ForCourses from "../layouts/ForCourses";
import Login from "./Login";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import AuthContext from "../../context/auth/authContext";
import CourseContext from "../../context/course/courseContext";

const Home = () => {
  const authContext = useContext(AuthContext);
  const courseContext = useContext(CourseContext);

  const { latest, getLatest, loading, clearCurrent } = courseContext;

  const { loadUser, authUser } = authContext;

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

  return (
    <div>
      {loading ? (
        <Spiner />
      ) : (
        <div>
          <Login />
          <Jumbotron />
          <h2 className="text-center">Recent Courses</h2>
          <ForCourses courses={latest} />
          <div className="text-center">
            <Link to="/courses" style={linkStyle}>
              <button style={btnStyle}>View All</button>
            </Link>
          </div>
        </div>
      )}
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

Home.propTypes = {
  latest: PropTypes.array,
  getLatest: PropTypes.func,
  loading: PropTypes.bool,
  clearCurrent: PropTypes.func,
  loaduser: PropTypes.func,
  authUser: PropTypes.func,
};

export default Home;
