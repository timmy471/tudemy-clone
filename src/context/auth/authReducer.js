import {
  REGISTER_SUCCESS,
  CHECK_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER,
  LOAD_USER_FAIL,
  CHECK_FAIL,
  SET_LOADING,
  LOGOUT_USER,
  IMAGE_SUCCESS,
  IMAGE_FAIL,
  AUTHENTICATE_USER
} from "../types";

const authReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        redirect: true,
        loading: false,
      };

    case AUTHENTICATE_USER:
      return{
        ...state,
        isAuthenticated: true
      }
      
    case CHECK_FAIL:
    case REGISTER_FAIL:
    case LOAD_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case CHECK_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoggedOut: false,
        redirect: true,
        loading: false,
      };

    case LOAD_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoggedOut: false,
        loading: false,
      };

    case LOGOUT_USER:
      localStorage.clear();
      return {
        ...state,
        user: null,
        loading: false,
        redirect: false,
        isAuthenticated: false,
        isLoggedOut: true,
      };

      case IMAGE_SUCCESS:
        return {
          ...state,
          user: action.payload,
          loading: false
          
        };

        case IMAGE_FAIL:
          return {
            ...state,
           error:action.payload
          };

    default:
      return state;
  }
};

export default authReducer;
