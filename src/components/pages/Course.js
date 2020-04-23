import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import "../../stylesheets/course.css";

import CourseContext from "../../context/course/courseContext";
import AlertContext from "../../context/alert/alertContext";
import Spinner from "../layouts/Spinner";

const Course = (props) => {
  const courseContext = useContext(CourseContext);
  const alert = useContext(AlertContext);

  const {
    getCourse,
    course,
    loading,
    author,
    addFavorite,
    added,
    clearCurrent,
    removeFavorite,
    addStar,
    removeStar,
    starCount,
    starred,
  } = courseContext;

  useEffect(() => {
    clearCurrent();
    getCourse(props.match.params.id);
    //eslint-disable-next-line
  }, []);

  const user_id = localStorage.getItem("user_id");

  const onAddhandler = () => {
    const faveCourse = {
      course_id: course.id,
      user_id: course.user_id,
      user_fave_id: parseInt(user_id),
      title: course.title,
      category: course.category,
      learnt: course.learnt,
      required: course.required,
      video_url: course.video_url,
      pic_url: course.pic_url,
      date: course.date,
    };

    addFavorite(faveCourse);
    alert.setAlert("Course added to favorites", "success");
  };

  const onRemoveHandler = () => {
    removeFavorite(course.id);
    alert.setAlert("Course removed from favorites", "warning");
  };

  const onAddStar = () => {
    addStar(parseInt(localStorage.getItem("user_id")), course.id);
    alert.setAlert("You starred this Course", "success");
  };

  const onRemoveStar = () => {
    removeStar(parseInt(localStorage.getItem("user_id")), course.id);
    alert.setAlert("You Unstarred this Course", "warning");
  };

  return (
    <div>
      {author !== null && !loading ? (
        <div className="container mt-4">
          <div className="row">
            <div className="col-xs-8 col-sm-9 col-md-8">
              <h5>{course.title} </h5>
            </div>

            <div className="col-xs-4 col-sm-4 col-md-4">
              {course.user_id !== parseInt(user_id) ? (
                <ul>
                  <li>
                    {!added ? (
                      <span
                        className="add"
                        onClick={onAddhandler}
                        title="Add to favorites"
                      >
                        <i className="fa fa-heart"></i>
                      </span>
                    ) : (
                      <span
                        className="remove"
                        onClick={onRemoveHandler}
                        title="Remove from favorites"
                      >
                        <i className="fa fa-heart"></i>
                      </span>
                    )}
                  </li>
                  {starred ? (
                    <li className="list">
                      <i
                        className="fa fa-star addStar"
                        onClick={onRemoveStar}
                        title="Unstar this course"
                      ></i>
                    </li>
                  ) : (
                    <li className="list">
                      <i
                        className="fa fa-star starLogo"
                        onClick={onAddStar}
                        title="star this course"
                      ></i>
                    </li>
                  )}{" "}
                  &nbsp; <span className="starCount">{starCount}</span>
                </ul>
              ) : (
                <div className="own">
                  <span>
                    {" "}
                    <i className="fa fa-star star" title="star counts"></i>
                  </span>
                  &nbsp; <span className="ownStarCount">{starCount}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 text-center" className="wrapper">
            {/* <ReactPlayer
              url={course.video_url}
              height="100%"
              width="100%"
              playing={false}
              controls={true}
              border="false"
            /> */}
            <iframe
              title={course.title}
              height="300px"
              width="70%"
              frameBorder="0"
              allow="encrypted-media"
              allowFullScreen
              type="video/mp4"
              src={course.video_url}
            ></iframe>
          </div>
          <div className="body">
            <div className="row  mt-4">
             
              <div className="col-xs-12 col-sm-12 col-md-6 details">
                <div className="">
                  <h5>What will you learn?</h5>
                </div>
                <p className={starCount}>{course.learnt}</p>
              </div>

              <div className="col-xs-12 col-sm-12 col-md-6 details">
                <div className="">
                  <h5>What is required for this course?</h5>
                </div>
                <p className={starCount}>{course.required}</p>
              </div>
            </div>
            <div className="text-center author">
              <h4>About the Tutor</h4>
              <img
                src={author.image_url}
                height="200"
                width="200"
                alt={author.first_name}
              />
              <p className="mt-2">
                {author.first_name} {author.last_name} <br />
                {author.email}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

Course.propTypes = {
  course: PropTypes.object,
  loading: PropTypes.bool,
  author: PropTypes.object,
  addFavorite: PropTypes.func,
  added: PropTypes.bool,
  clearCurrent: PropTypes.func,
  removeFavorite: PropTypes.func,
  addStar: PropTypes.func,
  removeStar: PropTypes.func,
  starCount: PropTypes.number,
  starred: PropTypes.bool,
  setAlert: PropTypes.func,
};

export default Course;
