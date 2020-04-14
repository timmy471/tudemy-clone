import {
  ADD_COURSE,
  GET_COURSES,
  SET_AUTHOR,
  SEARCH_COURSES,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_COURSE,
  DELETE_COURSE,
  GET_USER_COURSES,
  GET_FAVORITES,
  SET_FAVORITES,
  GET_LATEST,
  COURSE_ERROR,
  SET_LOADING,
  UNSET_LOADING
} from "../types";

const courseReducer = (state, action) => {
  switch (action.type) {

    case SET_LOADING:
        return{
            ...state,
            loading:true
        }


    case GET_COURSES:
    case SEARCH_COURSES:
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

    case GET_LATEST:
      return{
        ...state,
        latest: action.payload,
        loading:false
      }
      
    case UNSET_LOADING:
      return{
        ...state,
        loading: false
      }

    case COURSE_ERROR:
      return{
        ...state,
        error: action.payload,
        loading: false
      }

    case GET_USER_COURSES:
      return{
        ...state,
        userCourses: action.payload,
        loading: false
      }

    case SET_CURRENT:
      return{
        ...state,
        current:action.payload
      }

    case CLEAR_CURRENT:
      return{
        ...state,
        current: null
      }

    case DELETE_COURSE:
      return{
        ...state,
        userCourses: state.userCourses.filter(course=>course.id !== action.payload)
      }
    
 


    default:
      return state;
  }
};

export default courseReducer;
