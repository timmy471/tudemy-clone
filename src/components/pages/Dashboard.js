import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import DashboardCourses from "../layouts/DashboardCourses";

import CourseContext from "../../context/course/courseContext";

import Spinner from "../layouts/Spinner";
import FileSpinner from "../layouts/FileSpinner";

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const courseContext = useContext(CourseContext);

  const { loading, user, setProfileImage, fLoading } = authContext;
  const {
    userCourses,
    getUserCourses,
    userFavorites,
    getUserFaves,
    clearCurrent,
  } = courseContext;

  const [image, setImage] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("user_id");
    getUserCourses(id);
    getUserFaves(id);
    clearCurrent();
    //eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    setImage(e.target.files[0]);
  };

  const callSetProfileImage = async (e) => {
    e.preventDefault();
    if (image === null) {
      alertContext.setAlert("Please select an image", "danger");
      return;
    } else {
      await setProfileImage(image);
      alertContext.setAlert("Profile updated successfully", "success");
      setImage(null);
      e.target.reset();
    }
  };

  return (
    <>
      {!loading && user !== null ? (
        <div className="container">
          <div className="container">
            <div className="row text-center mt-4" style={headerStyle}>
              <div className="col-xs-12 col-sm-12 col-md-3">
                <span>
                  {fLoading ? (
                    <FileSpinner />
                  ) : (
                    <img
                      src={user.image_url}
                      height="80%"
                      width="80%"
                      alt="profile"
                    />
                  )}
                </span>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-3">
                <div style={{ textAlign: "left" }}>
                  <h3>
                    {user.first_name} {user.last_name}
                  </h3>
                  <h6>{user.email}</h6>
                  <div style={{ marginTop: "3rem" }}>
                    <form encType="multipart/form-data">
                      <input
                        type="file"
                        accept="image/*"
                        data-max-size="5000"
                        name="image"
                        onChange={onChange}
                      />
                      <div className="row " style={{ margin: "1rem 0 1rem 0" }}>
                        <input
                          type="submit"
                          value="save"
                          onClick={callSetProfileImage}
                          className="btn btn-primary"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row  ">
            <div className="col-xs-12 col-sm-12 col-md-6 mt-4">
              <div className="text-center">
                <h4>My Courses</h4>
              </div>

              {loading ? <Spinner /> : (
                userCourses.length > 0 ? <DashboardCourses courses={userCourses} /> : (
                  <div className='text-center'>
                  <h6 className="mt-4">You have no courses created yet</h6>{" "}
                  <br />{" "}
                  <Link to="/addcourse" className="btn btn-info">
                    {" "}
                    Add Course
                  </Link>
                </div>
                )
              )}
             
            </div>

            <div className="col-xs-12 col-sm-12 col-md-6 mt-4">
              <div className="text-center">
                <h4>My Favorites</h4>
              </div>
              {loading ? <Spinner /> : (
                userFavorites.length > 0 ? <DashboardCourses courses={userFavorites} /> : (
                  <div className='text-center'>
                  <h6 className="mt-4">You have not favorited any course</h6>{" "}
                  <br />{" "}
                 
                </div>
                )
              )}
            
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

Dashboard.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object,
  setProfileImage: PropTypes.func,
  fLoading: PropTypes.bool,
  userCourses: PropTypes.array,
  userFavorites: PropTypes.array,
  getUserCourses: PropTypes.func,
  clearCurrent: PropTypes.func,
  setAlert: PropTypes.func,
};

const headerStyle = {
  backgroundColor: "white",
  padding: "2rem 2rem 0 2rem",
};

export default Dashboard;
