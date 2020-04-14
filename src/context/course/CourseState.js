import React, { useReducer, useContext } from "react";
import axios from "axios";
import courseReducer from "./courseReducer";
import courseContext from "./courseContext";
import AlertContext from "../alert/alertContext";


import {
  ADD_COURSE,
  GET_COURSES,
  SET_AUTHOR,
  SEARCH_COURSES,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_COURSE,
  DELETE_COURSE,
  GET_LATEST,
  GET_USER_COURSES,
  GET_FAVORITES,
  SET_FAVORITES,
  COURSE_ERROR,
  SET_LOADING,
  UNSET_LOADING,
} from "../types";

const CourseState = (props) => {
  const initialState = {
    courses: [],
    authors: [],
    userCourses: [],
    current:null,
    latest: [],
    error: null,
    course: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(courseReducer, initialState);
  const alert = useContext(AlertContext);
  const gapi = "AIzaSyBKkwlF_Fd2TgBp2VVIq_x5x5-4JdcTIBE";
  // 'https://www.googleapis.com/youtube/v3/videos?key=[YOUR_API_KEY]' \
  // --header 'Authorization: Bearer [YOUR_ACCESS_TOKEN]' \
  // --header 'Accept: application/json' \
  // --header 'Content-Type: application/json' \
  // --data '{}' \

  //add course
  const addCourse = async (course) => {
    const { title, category, learnt, required, video } = course;

    try {
      const res = await axios.post(
        "https://www.googleapis.com/upload/youtube/v3/videos?key=AIzaSyBCfCEFWOIuDfGevY2C4dEvlQQ8GifdOrQ&channelId=/UCV_PNuxLU6P-Y6KVBCy-Z3A",
        video,
        {
          headers: {
            Authorization:
            "Bearer 890922991801-g84tsnhmspeee927n3hk27lhk0k1mvhs.apps.googleusercontent.com",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      // const res = axios.get("https://www.googleapis.com/youtube/v3/videos?id=" + videoId + "&key=" + apiKey + "&part=snippet,statistics,contentDetails")
      console.log(res);
    } catch (error) {
      dispatch({
        type: COURSE_ERROR,
        payload: error.response.data,
      });
    }
  };

  // get courses 
 
  const getCourses = async (i) => {
    try {
      dispatch({
        type: SET_LOADING,
      });
      const res = await axios.get(`http://localhost:5000/courses?_page=${i}&_limit=8`);

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
        payload: error.response.data,
      });
    }
  };



  //get course
  const searchCourses = async text => {

    dispatch({
      type: SET_LOADING
    })

    try {
      const courses = await axios.get(`http://localhost:5000/courses?q=${text}`)
      if(courses.data.length < 1){
        dispatch({
          type: UNSET_LOADING
        })
      alert.setAlert("No Courses matches your request", "danger");
      }else{
          dispatch({
        type: SEARCH_COURSES,
        payload: courses.data,
      });
        
      const authors = [];
      const getUserData = async (id) => {
        const userData = await axios.get(`http://localhost:5000/users/${id}`);
        
        authors.push(userData.data);
        console.log(authors)
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
        payload: error.response.data
      })
    }
   
  };
  
  //getLatest
  const getLatest = async () => {
      try {
        dispatch({
          type: SET_LOADING,
        });
        const res = await axios.get(`http://localhost:5000/courses?_sort=date&_order=desc&_limit=4`);
  
      
        dispatch({
          type: GET_LATEST,
          payload: res.data,
        });
      } catch (error) {
        dispatch({
          type: COURSE_ERROR,
          payload: error.response.data,
        });
      }

  }


  //getUserCourses

    const getUserCourses = async id => {
      try {
        dispatch({
          type: SET_LOADING,
        });
    
        const res = await axios.get(`http://localhost:5000/courses?user_id=${id}`);
  
        dispatch({
          type: GET_USER_COURSES,
          payload: res.data,
        });
      } catch (error) {
        dispatch({
          type: COURSE_ERROR,
          payload: error.response.data,
        });
      }

  }

  //setCurrent
  const setCurrent = (course) => {
    dispatch({
      type:SET_CURRENT,
      payload:course
    })
    console.log(course);
  };

  const clearCurrent = () => {
    dispatch({
      type:CLEAR_CURRENT
    })
  }

  //update course
  const updCourse = () => {
    clearCurrent();
  };

  //delete course
  const delCourse = async id => {
    try {
      await axios.delete(`http://localhost:5000/courses/${id}`);
      dispatch({
        type: DELETE_COURSE,
        payload: id
      })
      alert.setAlert("Course Successfully deleted", "success");
    } catch (error) {
      dispatch({
        type:COURSE_ERROR,
        payload:error.response.data
      })
    }
  };

  return (
    <courseContext.Provider
      value={{
        courses: state.courses,
        current: state.current,
        course: state.course,
        error: state.error,
        authors: state.authors,
        loading: state.loading,
        latest: state.latest,
        userCourses: state.userCourses,
        addCourse,
        getCourses,
        getLatest,
        searchCourses,
        getUserCourses,
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
