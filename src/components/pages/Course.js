import React, { useEffect, useContext } from "react";
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
    checkAdded,
    clearCurrent,
    removeFavorite,
  } = courseContext;

  useEffect(() => {
    clearCurrent();
    getCourse(props.match.params.id);
    checkAdded();
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
      alert.setAlert("Course removed from favorites", "success");
  }

  return (
    <div>
      {author !== null && !loading ? (
        <div className="container mt-4">
          <h3>{course.title} </h3>
          {course.user_id !== parseInt(user_id) &&
            (!added ? (
              <button className="btn btn-primary" onClick={onAddhandler}>
                Add to Favorites
              </button>
            ) : (
              <button className="btn btn-danger" onClick={onRemoveHandler}>Remove from favorites</button>
            ))}

          <div className="mt-3">
            
             <iframe
               title={course.title}
               width="100%"
               height="400"
               frameBorder="0"
               allow="encrypted-media"
               allowFullScreen
               type="video/mp4"
               src={course.video_url}
             ></iframe>
          </div>
          <div className="row  mt-4">
            <div className="col-xs-12 col-sm-12 col-md-6">
              <div className="">
                <h5>What is required for this course?</h5>
              </div>
              <p>{course.required}</p>
            </div>

            <div className="col-xs-12 col-sm-12 col-md-6">
              <div className="">
                <h5>What will I learn?</h5>
              </div>
              <p>{course.learnt}</p>
            </div>
          </div>
          <div className="text-center" style={{ marginTop: "5rem" }}>
            <h4>About the Tutor</h4>
            <img
              src={author.image_url}
              style={{ borderRadius: "50%" }}
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
      ) : (
        <Spinner />
      )}
    </div>
  );
};
// const imgStyle={

// }

export default Course;
