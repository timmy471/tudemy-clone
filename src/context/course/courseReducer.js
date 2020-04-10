import {
  ADD_COURSE,
  GET_COURSES,
  SET_AUTHOR,
  SEARCH_COURSES,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_COURSE,
  DELETE_COURSE,
  COURSE_ERROR,
  SET_LOADING,
} from "../types";

const courseReducer = (state, action) => {
  switch (action.type) {

    case SET_LOADING:
        return{
            ...state,
            loading:true
        }


    case GET_COURSES:
        return{
            ...state,
            courses:action.payload,
            loading: false
        }

    case SET_AUTHOR:
        return{
             ...state,
             authors:action.payload,
            loading: false
            }
 


    default:
      return state;
  }
};

export default courseReducer;
