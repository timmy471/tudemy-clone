import React, { useState, useContext, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";

import CourseContext from "../../context/course/courseContext";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const AddCourse = () => {
  const courseContext = useContext(CourseContext);
  const { addCourse, current, clearCurrent } = courseContext;
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  const [course, setCourse] = useState({
    title: "",
    category: "",
    required: "",
    learnt: "",
    video: "",
    image: "",
  });

  useEffect(() => {
    
    if (current !== null) {
      setCourse(current);
      // setCourse({ ...current, title:current.title, categor:current.category})
    }
  }, [courseContext, current]);

  const { title, category, required, learnt, video, image } = course;

  const onChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    setCourse({ ...course, video: e.target.files[0] });
  };

  const onImageChange = (e) => {
    setCourse({ ...course, image: e.target.files[0] });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const realCourse = {
      title: title.charAt(0).toUpperCase() + title.slice(1),
      category,
      required: required.charAt(0).toUpperCase() + required.slice(1),
      learnt: learnt.charAt(0).toUpperCase() + learnt.slice(1),
      video,
      image
 
    }
    console.log(realCourse);

    // addCourse(realCourse);
  };

  if (!isAuthenticated) {
    setAlert("Please login to teach on Tudemy", "danger");
    return <Redirect to="/" />;
  } else {
    return (
      <div className="container">
        <div
          className="add-course "
          style={{
            padding: "3rem 3rem",
            marginTop: "2rem",
            backgroundColor: "white",
          }}
        >
          <h2 className="text-center">Add Course</h2>
          <form onSubmit={onSubmit}>
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
                    style={{ borderRadius: "5px", height: "3rem" }}
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
                  style={{ borderRadius: "5px", height: "3rem" }}
                >
                  <option value="">Select Category</option>
                  <option value="Development">Development</option>
                  <option value="Business">Business</option>
                  <option value="Finance And Accounting">
                    Finance And Accouting
                  </option>
                  <option value="IT and Software">IT and Software</option>
                  <option value="Office productivity">
                    Office Productivity
                  </option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-xm-12 col-sm-12 col-md-6">
                <div className="form-group">
                  <label>Course Requirement:</label>
                  <textarea
                    placeholder="What is required of a student willing to take this course?"
                    style={{ borderRadius: "5px" }}
                    id="organization"
                    className="form-control"
                    rows="10"
                    name="required"
                    value={required}
                    onChange={onChange}
                    style={{ height: "auto" }}
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
                    style={{ borderRadius: "20px" }}
                    id="organization"
                    className="form-control"
                    rows="10"
                    name="learnt"
                    value={learnt}
                    onChange={onChange}
                    style={{ height: "auto" }}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-xm-12 col-sm-12 col-md-6">
                <div className="form-group">
                  <label>Course Video:</label>{" "}
                  <input
                    type="file"
                    onChange={onFileChange}
                    name="file"
                    value={video}
                    data-max-size="2000000"
                    accept="video/*"
                  />
                </div>
              </div>
              <div className="col-xm-12 col-sm-12 col-md-6">
                <div className="form-group">
                  <label>Cover Image:</label>{" "}
                  <input
                    type="file"
                    onChange={onImageChange}
                    name="image"
                    value={image}
                    data-max-size="5000"
                    accept="image/*"
                  />
                </div>
              </div>
            </div>

            {1===1 ? (
              <div className="row mt-3">
                <input
                  className="btn btn-info "
                  type="submit"
                  value="Update"
                />
                &nbsp; &nbsp;
                <span onClick={clearCurrent()}>
                  <Link
                    to="/dashboard"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <button className="btn btn-info">Go Back</button>
                  </Link>
                  </span>
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
        </div>
      </div>
    );
  }
};

export default AddCourse;
