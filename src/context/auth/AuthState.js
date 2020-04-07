import React, { useReducer } from "react";
import axios from "axios";
import AuthReducer from "./authReducer";
import AuthContext from "./authContext";
import {
  REGISTER_SUCCESS,
  CHECK_SUCCESS,
  REGISTER_FAIL,
  CHECK_FAIL,
  SET_LOADING,
} from "../types";

// let authClientId;
// let authClientSecret;

// if(process.env.NODE_ENV !== 'production'){
//     authClientId = process.env.REACT_APP_auth_CLIENT_ID;
//     authClientSecret = process.env.REACT_APP_auth_CLIENT_SECRET;

// }else{
//     authClientId = process.env.auth_CLIENT_ID;
//     authClientSecret = process.auth_CLIENT_SECRET;
// }

const AuthState = (props) => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    redirect: false,
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const checkUser = async (user, token) => {
    try {
      dispatch({
        type: SET_LOADING,
      });

      const res = await axios.get(
        `http://tudemy-clone.herokuapp.com/users?q=${user.email}`
      );

    
      if (res.data.length === 1) {
        localStorage.setItem("userToken", token);

        dispatch({
          type: CHECK_SUCCESS,
          payload: res.data,
        });
      } else {
        registerUser(user, token);
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: CHECK_FAIL,
        payload: error,
      });
    }
  };

  const registerUser = async (user, token) => {
    try {
      dispatch({
        type: SET_LOADING,
      });

      const res = await axios.post("http://tudemy-clone.herokuapp.com/users", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.setItem("userToken", token);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: REGISTER_FAIL,
        payload: error,
      });
    }
  };

  // const loginUser = async (email, token) => {

  //     try {
  //         dispatch({
  //             type:SET_LOADING
  //         })

  //         const res = await axios.get(`http://localhost:5000/users?q=${email}` )

  //         console.log(res);
  //         if(res!==''){

  //         localStorage.setItem('userToken', token)

  //         dispatch({
  //             type:LOGIN_SUCCESS,
  //             payload: res.data
  //         })
  //         }

  //     } catch (error) {
  //         console.log(error);
  //         dispatch({
  //             type:LOGIN_FAIL,
  //             payload: error
  //         })
  //     }

  // }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        isAuthenticated: state.isAuthenticated,
        redirect: state.redirect,
        error: state.error,
        checkUser,
        registerUser,
      }}
    >
      <div>{props.children}</div>
    </AuthContext.Provider>
  );
};

export default AuthState;
