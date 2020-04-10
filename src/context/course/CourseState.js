import React, { useReducer } from 'react';
import axios from 'axios';
import courseReducer from './courseReducer';
import courseContext from './courseContext';

import { ADD_COURSE, GET_COURSES, SET_AUTHOR, SEARCH_COURSES, SET_CURRENT, CLEAR_CURRENT, UPDATE_COURSE, DELETE_COURSE, OURSE_ERROR, SET_LOADING, COURSE_ERROR } from '../types';

const CourseState = props => {

    const initialState = {
        courses: [],
        authors:[],
        course: {},
        loading:false
    }
    
    const [state, dispatch] = useReducer(courseReducer, initialState);
    const gapi ="AIzaSyBKkwlF_Fd2TgBp2VVIq_x5x5-4JdcTIBE";
    // 'https://www.googleapis.com/youtube/v3/videos?key=[YOUR_API_KEY]' \
    // --header 'Authorization: Bearer [YOUR_ACCESS_TOKEN]' \
    // --header 'Accept: application/json' \
    // --header 'Content-Type: application/json' \
    // --data '{}' \


    //add course
    const addCourse = async course => {

        const { title, category, learnt, required, video } = course;

        try {
            const res = await axios.post("https://www.googleapis.com/youtube/v3/videos?key=AIzaSyBKkwlF_Fd2TgBp2VVIq_x5x5-4JdcTIBEi", video, {
                 headers: {
                   'Authorization': 'Client-ID bc314740cabd71c',
                  'Access-Control-Allow-Origin': '*',
                  'Content-Type': 'application/json'
                 },
              })
              console.log(res);
         } catch (error) {
            dispatch({
                type:COURSE_ERROR,
                payload:error
            })
        }
    }

    //get courses
    const getCourses = async () => {
        try {
            dispatch({
                type: SET_LOADING
            })
            const res = await axios.get('http://localhost:5000/courses');

            const getUserData = async (id) => {
                const userData = await axios.get(`http://localhost:5000/users/${id}`);
                console.log(userData.data);
                 dispatch({
                     type:SET_AUTHOR,
                     payload:userData.data
                 })
                 console.log(userData.data);

            }
             res.data.map(course => {
                getUserData(course.user_id);
               
            } );
           
            console.log(res)
           
            
            dispatch({
                type:GET_COURSES,
                payload:res.data
            })
        } catch (error) {
            dispatch({
                type:COURSE_ERROR,
                payload:error
            })
        }
    }

    //get course 
    const searchCourses = () => {

    }

    //editcourse
    const editCourse = () => {

    }

    //update course
    const updCourse = () => {

    }

    //delete course
    const delCourse = () => {

    }



    return <courseContext.Provider value ={{
        courses: state.courses,
        course: state.course,
        loading: state.loading,
        addCourse,
        getCourses, 
        searchCourses,
        editCourse,
        updCourse,
        delCourse
    }}>
        {props.children}
    </courseContext.Provider>
    
}


export default CourseState

