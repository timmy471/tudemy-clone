import {
  GET_COURSES,
  SET_AUTHOR,
  SEARCH_COURSES,
  SET_CURRENT,
  CLEAR_CURRENT,
  GET_COURSE,
  GET_AUTHOR,
  DELETE_FAVORITE,
  SET_ADDED,
  UNSET_ADDED,
  STAR_SUCCESS,
  STAR_FAIL,
  SET_STAR_COUNT,
  DELETE_COURSE,
  GET_USER_COURSES,
  GET_FAVORITES,
  ADD_FAVORITE,
  GET_LATEST,
  COURSE_ERROR,
  SET_PAGE,
  SET_LOADING,
  UNSET_LOADING,
  FILE_LOADING,
  UNSET_FILE_LOADING
} from "../types";

const courseReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case GET_COURSES:
    case SEARCH_COURSES:
      return {
        ...state,
        courses: action.payload,
        courseCount: action.payload.length,
        loading: false,
      };
    
      case ADD_FAVORITE:
        return {
          ...state,
          added: true,
        }

    case GET_COURSE:
      return {
        ...state,
        course: action.payload,
        loading: false,
      };

    case GET_AUTHOR:
      
      return {
        ...state,
        author: action.payload,
        loading: false,
      };

      case DELETE_FAVORITE:
      return {
        ...state,
        added: false,
      }

      case UNSET_ADDED:
        return{
          ...state,
          added: false,
        }

    case SET_AUTHOR:
      return {
        ...state,
        authors: action.payload,
        loading: false,
      };
    
    case SET_PAGE:
      return {
        ...state,
        courseCount: action.payload
      }

    case GET_LATEST:
      return {
        ...state,
        latest: action.payload,
        loading: false,
      };

   

    case GET_FAVORITES:
      return {
        ...state,
        userFavorites: action.payload
      }

    case SET_ADDED:
      return {
        ...state,
        added: true,
        loading: false
      }

    case STAR_SUCCESS:
      return {
        ...state,
        starred: true,
        loading: false,
      }

    case STAR_FAIL:
      return {
        ...state,
        starred:false,
        loading: false
      }

    case SET_STAR_COUNT:
      return {
        ...state,
        starCount: action.payload,
        loading:false
      }
      
    case UNSET_LOADING:
      return {
        ...state,
        loading: false,
      };

      case FILE_LOADING:
        return {
          ...state,
          fLoading: true,
        }

    case UNSET_FILE_LOADING:
      return {
        ...state,
        fLoading: false
      }

    case COURSE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        fLoading: false
      };

    case GET_USER_COURSES:
      return {
        ...state,
        userCourses: action.payload,
        loading: false,
      };

    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };

    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };

    case DELETE_COURSE:
      return {
        ...state,
        userCourses: state.userCourses.filter(
          (course) => course.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default courseReducer;
