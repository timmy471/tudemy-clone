import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import CourseContext from "../../context/course/courseContext";
import AlertContext from "../../context/alert/alertContext";
import FileSpinner from "../layouts/FileSpinner";

const AddCourse = () => {
  const courseContext = useContext(CourseContext);
  const {
    addCourse,
    current,
    clearCurrent,
    fLoading,
    updCourse,
  } = courseContext;
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;



  const [course, setCourse] = useState({
    title: "",
    category: "",
    required: "",
    learnt: "",
    image: "",
    video: "",
  });

  useEffect(() => {
    if (current !== null) {
      setCourse(current);
      // setCourse({ ...current, title:current.title, category:current.category})
    }
  }, [courseContext, current]);

  const { title, category, required, learnt, video, image } = course;

  const formData = new FormData();

  const onChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
    // formData.append('course', course);
  };

  const onVideoChange = (e) => {
    setCourse({ ...course, video: e.target.files[0] });
  };

  const onImageChange = (e) => {
    setCourse({ ...course, image: e.target.files[0] });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (title === "" || category === "" || learnt === "" || required === "") {
      return setAlert("Please fill all fields", "danger");
    }
    const realCourse = {
      title: title.charAt(0).toUpperCase() + title.slice(1),
      category,
      learnt: learnt.charAt(0).toUpperCase() + learnt.slice(1),
      required: required.charAt(0).toUpperCase() + required.slice(1),
      image,
      video,
    };

    const updData = {
      title: title.charAt(0).toUpperCase() + title.slice(1),
      category,
      learnt: learnt.charAt(0).toUpperCase() + learnt.slice(1),
      required: required.charAt(0).toUpperCase() + required.slice(1),
      image,
      video,
      date: current && current.date,
      id: current && current.id,
    };

    formData.append("video", video);
    // console.log(formData.has('video'))
    current === null
      ? addCourse(realCourse, formData)
      : updCourse(updData, formData);
    setCourse({
      title: "",
      category: "",
      learnt: "",
      required: "",
    });

    current && clearCurrent();

    e.target.reset();
  };

  // if (!isAuthenticated) {
  //   setAlert("Please login to teach on Tudemy", "danger");
  //   return <Redirect to="/" />;
  // } else {
  return (
    <div className="container">
      <div className="add-course " style={layoutStyle}>
        <h2 className="text-center">Add Course</h2>
        <form encType="multipart/form-data" onSubmit={onSubmit}>
          <div className="row" style={{ marginBottom: "2.5rem" }}>
            <div className="col-xm-12 col-sm-12 col-md-6">
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  name="title"
                  onChange={onChange}
                  placeholder="e.g Learn React; beginner to master..."
                  style={inputStyle}
                />
              </div>
            </div>

            <div className="col-xm-12 col-sm-12 col-md-6">
              <label>Category:</label>
              <select
                className="form-control"
                id="type"
                name="category"
                value={category}
                onChange={onChange}
                style={inputStyle}
              >
                <option value="">Select Category</option>
                <option value="Development">Development</option>
                <option value="Business">Business</option>
                <option value="Finance And Accounting">
                  Finance And Accouting
                </option>
                <option value="IT and Software">IT and Software</option>
                <option value="Office productivity">Office Productivity</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-xm-12 col-sm-12 col-md-6">
              <div className="form-group">
                <label>Course Requirement:</label>
                <textarea
                  placeholder="What is required of a student willing to take this course?"
                  id="organization"
                  className="form-control"
                  rows="8"
                  name="required"
                  value={required}
                  onChange={onChange}
                  style={textAreaStyle}
                >
                  {required}
                </textarea>
              </div>
            </div>

            <div className="col-xm-12 col-sm-12 col-md-6">
              <div className="form-group">
                <label>What will be Learnt:</label>
                <textarea
                  placeholder="What will your students learn?"
                  id="organization"
                  className="form-control"
                  rows="8"
                  name="learnt"
                  value={learnt}
                  onChange={onChange}
                  style={textAreaStyle}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-xm-12 col-sm-12 col-md-6">
              <div className="form-group">
                <label>Course Video:</label>{" "}
                <input
                  type="file"
                  onChange={onVideoChange}
                  name="video"
                  data-max-size="2000000"
                  accept="video/*"
                  required
                />
                <br />
                <small>For best performance, ensure video is 1920x1080</small>
              </div>
            </div>
            <div className="col-xm-12 col-sm-12 col-md-6">
              <div className="form-group">
                <label>Cover Image:</label>{" "}
                <input
                  type="file"
                  onChange={onImageChange}
                  name="image"
                  data-max-size="5000"
                  accept="image/*"
                  required
                />
              </div>
            </div>
          </div>

          {current !== null ? (
            <div className="row mt-3">
              <input className="btn btn-info " type="submit" value="Update" />
              &nbsp; &nbsp;
              {/* <span onClick={clearCurrent()}> */}
              <Link to="/dashboard" style={linkStyle}>
                <button className="btn btn-info">Go Back</button>
              </Link>
              {/* </span> */}
            </div>
          ) : (
            <div className="row">
              <input
                className="btn btn-primary mt-3"
                type="submit"
                value="Save"
              />
            </div>
          )}
        </form>
        <span style={{ position: "relative", bottom: "1rem" }}>
          {fLoading && <FileSpinner />}
        </span>
      </div>
    </div>
  );
  // }
};

AddCourse.propTypes = {
  addCourse: PropTypes.func,
  current: PropTypes.object,
  clearCurrent: PropTypes.func,
  fLoading: PropTypes.bool,
  updCourse: PropTypes.func,
  setAleret: PropTypes.func,
};

const layoutStyle = {
  padding: "3rem 3rem",
  marginTop: "2rem",
  backgroundColor: "white",
};

const inputStyle = {
  borderRadius: "5px",
  height: "3rem",
};

const textAreaStyle = {
  borderRadius: "5px",
  height: "auto",
};

const linkStyle = {
  textDecoration: "none",
  color: "black",
};

export default AddCourse;
