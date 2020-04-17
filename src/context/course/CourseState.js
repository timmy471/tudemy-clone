import React, { useReducer, useContext } from "react";
import axios from "axios";
import courseReducer from "./courseReducer";
import courseContext from "./courseContext";
import AlertContext from "../alert/alertContext";

import {
  GET_COURSES,
  GET_COURSE,
  SET_AUTHOR,
  SEARCH_COURSES,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_COURSE,
  DELETE_COURSE,
  GET_LATEST,
  GET_AUTHOR,
  GET_USER_COURSES,
  GET_FAVORITES,
  ADD_FAVORITE,
  SET_ADDED,
  DELETE_FAVORITE,
  COURSE_ERROR,
  SET_PAGE,
  SET_LOADING,
  FILE_LOADING,
  UNSET_LOADING,
  UNSET_FILE_LOADING,
} from "../types";

const CourseState = (props) => {
  const initialState = {
    courses: [],
    authors: [],
    author: null,
    userCourses: [],
    userFavorites: [],
    current: null,
    added: false,
    courseCount: null,
    latest: [],
    error: null,
    course: null,
    loading: false,
    fLoading: false,
  };

  const [state, dispatch] = useReducer(courseReducer, initialState);
  const alert = useContext(AlertContext);
  const gapi = "AIzaSyBKkwlF_Fd2TgBp2VVIq_x5x5-4JdcTIBE";


  //add course
  const addCourse = async (course, formData) => {
    dispatch({
      type: FILE_LOADING,
    });

    const { title, category, learnt, required, image } = course;

    try {
      // upload image
      const imgRes = await axios.post("https://api.imgur.com/3/image", image, {
        headers: {
          Authorization: "Client-ID bc314740cabd71c",
        },
      });

      const pic_url = imgRes.data.data.link;

      const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
      const url = "https://api.imgur.com/3/upload";

      const vidRes = await axios.post(PROXY_URL + url, formData, {
        headers: {
          Authorization: "Client-ID bc314740cabd71c",
        },
      });

      const video_url = vidRes.data.data.link;

      const user_id = parseInt(localStorage.getItem("user_id"));

      const mainCourse = {
        user_id,
        title,
        category,
        learnt,
        required,
        video_url,
        pic_url,
        date: Date.now(),
      };

      const postCourse = await axios.post(
        "http://localhost:5000/courses",
        mainCourse,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: UNSET_FILE_LOADING,
      });
      alert.setAlert("Course Added Successfully", "success");
    } catch (error) {
      alert.setAlert("Course not Added, Please try again", "danger");
      dispatch({
        type: COURSE_ERROR,
        payload: error,
      });
    }
  };

  //update course
  const updCourse = async (course, formData) => {
   
    dispatch({
      type: FILE_LOADING,
    });

    const { title, category, learnt, required, image, date, id } = course;

    try {
      // upload image
      const imgRes = await axios.post("https://api.imgur.com/3/image", image, {
        headers: {
          Authorization: "Client-ID bc314740cabd71c",
        },
      });

      const pic_url = imgRes.data.data.link;

      const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
      const url = "https://api.imgur.com/3/upload";

      const vidRes = await axios.post(PROXY_URL + url, formData, {
        headers: {
          Authorization: "Client-ID bc314740cabd71c",
        },
      });

      const video_url = vidRes.data.data.link;

      const user_id = parseInt(localStorage.getItem("user_id"));

      const mainCourse = {
        user_id,
        title,
        category,
        learnt,
        required,
        video_url,
        pic_url,
        date
      };

      console.log(mainCourse);

      const postCourse = await axios.put(
        `http://localhost:5000/courses/${id}`,
        mainCourse,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      clearCurrent();
      dispatch({
        type: UNSET_FILE_LOADING,
      });
      alert.setAlert("Course Updated Successfully", "success");
    } catch (error) {
      alert.setAlert("Course not updated, please try again", "danger");
      dispatch({
        type: COURSE_ERROR,
        payload: error,
      });
    }
  };

  // get courses

  const getCourses = async (page) => {
    try {
      dispatch({
        type: SET_LOADING,
      });
      const limit = 8;
      const res = await axios.get(
        `http://localhost:5000/courses?_page=${page}&_limit=${limit}`
      );
      dispatch({
        type: SET_PAGE,
        payload: res.data.length,
      });

      const authors = [];
      const getUserData = async (id) => {
        const userData = await axios.get(`http://localhost:5000/users/${id}`);

        authors.push(userData.data);

        dispatch({
          type: SET_AUTHOR,
          payload: authors,
        });
      };

      Promise.all(
        res.data.map((course) => {
          getUserData(course.user_id);
        })
      );

      dispatch({
        type: GET_COURSES,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: COURSE_ERROR,
        payload: error.response,
      });
    }
  };

  //get course
  const getCourse = async (id) => {
    try {
      dispatch({
        type: SET_LOADING,
      });
      const res = await axios.get(`http://localhost:5000/courses/${id}`);
      getCourseAuthor(res.data.user_id);
      checkAdded(res.data.id);
      await dispatch({
        type: GET_COURSE,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: COURSE_ERROR,
        payload: error,
      });
    }
  };

  //get courseAuthor
  const getCourseAuthor = async (id) => {
    dispatch({
      type: SET_LOADING,
    });
    try {
      const res = await axios.get(`http://localhost:5000/users/${id}`);

      dispatch({
        type: GET_AUTHOR,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: COURSE_ERROR,
        payload: error,
      });
    }
  };

  //search courses
  const searchCourses = async (text) => {
    dispatch({
      type: SET_LOADING,
    });

    try {
      const courses = await axios.get(
        `http://localhost:5000/courses?q=${text}`
      );
      if (courses.data.length < 1) {
        dispatch({
          type: UNSET_LOADING,
        });
        alert.setAlert("No Courses matches your request", "danger");
      } else {
        dispatch({
          type: SEARCH_COURSES,
          payload: courses.data,
        });

        const authors = [];
        const getUserData = async (id) => {
          const userData = await axios.get(`http://localhost:5000/users/${id}`);

          authors.push(userData.data);

          dispatch({
            type: SET_AUTHOR,
            payload: authors,
          });
        };

        Promise.all(
          courses.data.map((course) => {
            getUserData(course.user_id);
          })
        );
      }
    } catch (error) {
      dispatch({
        type: COURSE_ERROR,
        payload: error.response,
      });
    }
  };

  //getLatest
  const getLatest = async () => {
    try {
      dispatch({
        type: SET_LOADING,
      });
      const res = await axios.get(
        `http://localhost:5000/courses?_sort=date&_order=desc&_limit=4`
      );

      dispatch({
        type: GET_LATEST,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: COURSE_ERROR,
        payload: error.response,
      });
    }
  };

  //getUserCourses

  const getUserCourses = async (id) => {
    try {
      dispatch({
        type: SET_LOADING,
      });

      const res = await axios.get(
        `http://localhost:5000/courses?user_id=${id}`
      );

      dispatch({
        type: GET_USER_COURSES,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: COURSE_ERROR,
        payload: error.response,
      });
    }
  };

  //addFavorite
  const addFavorite = async (course) => {
    try {
      dispatch({
        type: ADD_FAVORITE,
      });
      axios.post("http://localhost:5000/favorites", course);
    } catch (error) {
      dispatch({
        type: COURSE_ERROR,
        payload: error,
      });
    }
  };

  const removeFavorite = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/favorites?course_id=${id}`
      );

      axios.delete(`http://localhost:5000/favorites/${res.data[0].id}`);
      dispatch({
        type: DELETE_FAVORITE,
      });
    } catch (error) {
      dispatch({
        type: COURSE_ERROR,
        payload: error,
      });
    }
  };

  const checkAdded = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/favorites?course_id=${id}`
      );
      console.log(res);

      if (res.data.length !== 0) {
        dispatch({
          type: SET_ADDED,
        });
      }
    } catch (error) {
      dispatch({
        type: COURSE_ERROR,
        payload: error,
      });
    }
  };

  const getUserFaves = async (id) => {
    try {
      dispatch({
        type: SET_LOADING,
      });

      const res = await axios.get(
        `http://localhost:5000/favorites?user_fave_id=${id}`
      );

      dispatch({
        type: GET_FAVORITES,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: COURSE_ERROR,
        payload: error.response,
      });
    }
  };

  //setCurrent
  const setCurrent = (course) => {
    dispatch({
      type: SET_CURRENT,
      payload: course,
    });
  };

  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };

  //delete course
  const delCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/courses/${id}`);
      dispatch({
        type: DELETE_COURSE,
        payload: id,
      });
      alert.setAlert("Course Successfully deleted", "success");
    } catch (error) {
      dispatch({
        type: COURSE_ERROR,
        payload: error.response,
      });
    }
  };

  return (
    <courseContext.Provider
      value={{
        courses: state.courses,
        current: state.current,
        course: state.course,
        author: state.author,
        error: state.error,
        authors: state.authors,
        loading: state.loading,
        fLoading: state.fLoading,
        latest: state.latest,
        courseCount: state.courseCount,
        userCourses: state.userCourses,
        userFavorites: state.userFavorites,
        addCourse,
        getCourses,
        getLatest,
        getCourseAuthor,
        searchCourses,
        checkAdded,
        getUserCourses,
        getCourse,
        getUserFaves,
        addFavorite,
        removeFavorite,
        setCurrent,
        clearCurrent,
        updCourse,
        delCourse,
      }}
    >
      {props.children}
    </courseContext.Provider>
  );
};

export default CourseState;
