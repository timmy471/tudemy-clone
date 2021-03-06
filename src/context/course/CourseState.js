import React, { useReducer, useContext } from "react";
import axios from "axios";
import courseReducer from "./courseReducer";
import courseContext from "./courseContext";
import AlertContext from "../alert/alertContext";

import {
  GET_COURSES,
  GET_COURSE,
  SEARCH_COURSES,
  SET_CURRENT,
  CLEAR_CURRENT,
  DELETE_COURSE,
  GET_LATEST,
  GET_AUTHOR,
  GET_USER_COURSES,
  GET_FAVORITES,
  ADD_FAVORITE,
  SET_ADDED,
  UNSET_ADDED,
  DELETE_FAVORITE,
  STAR_SUCCESS,
  STAR_FAIL,
  SET_STAR_COUNT,
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
    starred: false,
    starCount: 0,
    courseCount: null,
    latest: [],
    error: null,
    course: null,
    loading: false,
    fLoading: false,
  };

  const [state, dispatch] = useReducer(courseReducer, initialState);
  const alert = useContext(AlertContext);
  const BASEURL ='https://tudemy-be.herokuapp.com';
  // const BASEURL = "http://localhost:8080";

  //add course
  const addCourse = async (course) => {
    dispatch({
      type: FILE_LOADING,
    });

    const { title, category, learnt, required, image, video } = course;

    try {
      const cloudName = "dflkpux1w";
      const uploadPreset = "ur1no5q5";

      // upload image
      const imgRes = await axios.post("https://api.imgur.com/3/image", image, {
        headers: {
          Authorization: "Client-ID bc314740cabd71c",
        },
      });

      const pic_url = imgRes.data.data.link;

      //upload Video

      // const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
      // const url = "https://api.imgur.com/3/upload";

      // const vidRes = await axios.post(PROXY_URL + url, formData, {
      //   headers: {
      //     Authorization: "Client-ID bc314740cabd71c",
      //   },
      // });

      const url = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;
      const file = video;
      const fd = new FormData();
      fd.append("file", file);

      fd.append("upload_preset", uploadPreset);

      const vidRes = await axios.post(url, fd);

      const video_url = vidRes.data.secure_url;

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

      const postCourse = await axios.post(`${BASEURL}/courses`, mainCourse, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const starCourse = {
        users: [],
      };

      await axios.post(`${BASEURL}/favorites`, starCourse, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      await axios.post(`${BASEURL}/stars`, starCourse, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: UNSET_FILE_LOADING,
      });
      alert.setAlert("Course Created Successfully", "success");
    } catch (error) {
      alert.setAlert("Course Not Added, Please try again", "danger");
      dispatch({
        type: COURSE_ERROR,
        payload: error,
      });
    }
  };

  //update course
  const updCourse = async (course) => {
    dispatch({
      type: FILE_LOADING,
    });

    const {
      title,
      category,
      learnt,
      required,
      image,
      date,
      id,
      video,
    } = course;

    try {
      // upload image
      const imgRes = await axios.post("https://api.imgur.com/3/image", image, {
        headers: {
          Authorization: "Client-ID bc314740cabd71c",
        },
      });

      const pic_url = imgRes.data.data.link;

      //upload video

      // const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
      // const url = "https://api.imgur.com/3/upload";

      // const vidRes = await axios.post(PROXY_URL + url, formData, {
      //   headers: {
      //     Authorization: "Client-ID bc314740cabd71c",
      //   },
      // });
      const cloudName = "dflkpux1w";
      const uploadPreset = "ur1no5q5";
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;
      const file = video;
      const fd = new FormData();
      fd.append("file", file);

      fd.append("upload_preset", uploadPreset);

      const vidRes = await axios.post(url, fd);

      const video_url = vidRes.data.secure_url;

      const user_id = parseInt(localStorage.getItem("user_id"));

      const mainCourse = {
        user_id,
        title,
        category,
        learnt,
        required,
        video_url,
        pic_url,
        date,
      };

      await axios.put(`${BASEURL}/courses/${id}`, mainCourse, {
        headers: {
          "Content-Type": "application/json",
        },
      });
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
        `${BASEURL}/courses?_page=${page}&_limit=${limit}`
      );
      dispatch({
        type: SET_PAGE,
        payload: res.data.length,
      });

      // const authors = [];
      // const getUserData = async (id) => {
      //   const userData = await axios.get(`http://localhost:8000/users/${id}`);

      //   authors.push(userData.data);

      //   dispatch({
      //     type: SET_AUTHOR,
      //     payload: authors,
      //   });
      // };

      //   res.data.map((course) => {
      //     getUserData(course.user_id);
      //   })

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
      const res = await axios.get(`${BASEURL}/courses/${id}`);

      getCourseAuthor(res.data.user_id);

      checkAdded(parseInt(localStorage.getItem("user_id")), parseInt(id));

      checkStar(parseInt(localStorage.getItem("user_id")), parseInt(id));

      countStars(res.data.id);
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
      const res = await axios.get(`${BASEURL}/users/${id}`);

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
      const courses = await axios.get(`${BASEURL}/courses?q=${text}`);
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

        //   const authors = [];
        //   const getUserData = async (id) => {
        //     const userData = await axios.get(`http://localhost:8000/users/${id}`);

        //     authors.push(userData.data);

        //     dispatch({
        //       type: SET_AUTHOR,
        //       payload: authors,
        //     });
        //   };

        //     courses.data.map((course) => {
        //       getUserData(course.user_id);
        //     })
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
        `${BASEURL}/courses?_sort=date&_order=desc&_limit=4`
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

      const res = await axios.get(`${BASEURL}/courses?user_id=${id}`);

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

  //add course to user's favorite
  const addFavorite = async (user_id, course_id) => {
    try {
      const getCourse = await axios.get(`${BASEURL}/favorites?id=${course_id}`);
      const users = getCourse.data[0].users;
      const id = getCourse.data[0].id;
      const updData = {
        users: [...users, user_id],
      };

      await axios.put(`${BASEURL}/favorites/${id}`, updData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: ADD_FAVORITE,
      });
      checkAdded(user_id, course_id);
    } catch (error) {
      dispatch({
        type: COURSE_ERROR,
        payload: error,
      });
    }
  };

  //Remove course from user favorite list
  const removeFavorite = async (user_id, course_id) => {
    try {
      const getCourse = await axios.get(`${BASEURL}/favorites?id=${course_id}`);
      const users = getCourse.data[0].users;
      const id = getCourse.data[0].id;

      const newUsers = users.filter((userId) => userId !== user_id);
      const updData = {
        users: newUsers,
      };
      await axios.put(`${BASEURL}/favorites/${id}`, updData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      checkAdded(user_id, course_id);
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

  //check if a user ha favorited a course
  const checkAdded = async (user_id, course_id) => {
    try {
      const checkUsers = await axios.get(
        `${BASEURL}/favorites?id=${course_id}`
      );

      if (checkUsers.data[0].users.includes(user_id)) {
        dispatch({
          type: SET_ADDED,
        });
      } else {
        dispatch({
          type: UNSET_ADDED,
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
      const userFaves = await axios.get(`${BASEURL}/favorites`);
      const courseIds = [];
      const getCourses = async (id) => {
        const res = await axios.get(`${BASEURL}/courses?id=${id}`);
        courseIds.push(res.data[0]);
        dispatch({
          type: GET_FAVORITES,
          payload: courseIds,
        });
      };
      await userFaves.data.map((data) => {
        if (data.users.includes(parseInt(id))) {
          getCourses(data.id);
        }
      });
    } catch (error) {
      dispatch({
        type: COURSE_ERROR,
        payload: error.response,
      });
    }
  };

  //star a course
  const addStar = async (user_id, course_id) => {
    try {
      const getCourse = await axios.get(`${BASEURL}/stars?id=${course_id}`);
      const users = getCourse.data[0].users;
      const id = getCourse.data[0].id;
      const updData = {
        users: [...users, user_id],
      };

      await axios.put(`${BASEURL}/stars/${id}`, updData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: STAR_SUCCESS,
      });
      countStars(course_id);
    } catch (error) {
      dispatch({
        type: COURSE_ERROR,
        payload: error,
      });
    }
  };

  //unStar a course
  const removeStar = async (user_id, course_id) => {
    try {
      const getCourse = await axios.get(`${BASEURL}/stars?id=${course_id}`);
      const users = getCourse.data[0].users;
      const id = getCourse.data[0].id;

      const newUsers = users.filter((userId) => userId !== user_id);
      const updData = {
        users: newUsers,
      };
      await axios.put(`${BASEURL}/stars/${id}`, updData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      countStars(course_id);
      dispatch({
        type: STAR_FAIL,
      });
    } catch (error) {
      dispatch({
        type: COURSE_ERROR,
        payload: error,
      });
    }
  };

  //check if a user has starred the course
  const checkStar = async (user_id, course_id) => {
    dispatch({
      type: SET_LOADING,
    });

    try {
      const checkUsers = await axios.get(`${BASEURL}/stars?id=${course_id}`);

      if (checkUsers.data[0].users.includes(user_id)) {
        dispatch({
          type: STAR_SUCCESS,
        });
      } else {
        dispatch({
          type: STAR_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: COURSE_ERROR,
        payload: error,
      });
    }
  };

  const countStars = async (course_id) => {
    dispatch({
      type: SET_LOADING,
    });
    try {
      const checkUsers = await axios.get(`${BASEURL}/stars?id=${course_id}`);
      const stars = checkUsers.data[0].users.length;
      dispatch({
        type: SET_STAR_COUNT,
        payload: stars,
      });
    } catch (error) {
      dispatch({
        type: COURSE_ERROR,
        payload: error,
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
      await axios.delete(`${BASEURL}/courses/${id}`);

      const res = await axios.get(`${BASEURL}/stars?id=${id}`);

      await axios.delete(`${BASEURL}/stars/${res.data[0].id}`);

      await axios.delete(`${BASEURL}/favorites/${res.data[0].id}`);

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
        added: state.added,
        starred: state.starred,
        loading: state.loading,
        fLoading: state.fLoading,
        latest: state.latest,
        courseCount: state.courseCount,
        starCount: state.starCount,
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
        addStar,
        removeStar,
        checkStar,
        countStars,
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
