import React, { useReducer } from "react";
import axios from "axios";
import AuthReducer from "./authReducer";
import AuthContext from "./authContext";

import {
  REGISTER_SUCCESS,
  CHECK_SUCCESS,
  REGISTER_FAIL,
  CHECK_FAIL,
  LOGOUT_USER,
  LOAD_USER,
  LOAD_USER_FAIL,
  SET_LOADING,
  IMAGE_SUCCESS,
  IMAGE_FAIL,
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
    isLoggedOut: false,
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
        `http://localhost:5000/users?q=${user.email}`
      );

      if (res.data.length === 1) {
        localStorage.setItem("user_id", res.data[0].id);
        localStorage.setItem("userToken", token);

        dispatch({
          type: CHECK_SUCCESS,
          payload: res.data,
        });
        loadUser(localStorage.getItem("user_id"));
      } else {
        registerUser(user, token);
      }
    } catch (error) {
      
      dispatch({
        type: CHECK_FAIL,
        payload: error
      });
    }
  };

  const registerUser = async (user, token) => {
    try {
      dispatch({
        type: SET_LOADING,
      });

      const res = await axios.post("http://localhost:5000/users", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.setItem("user_id", res.data[0].id);
      localStorage.setItem("userToken", token);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.statusText,
      });
    }
  };

  const loadUser = async (id) => {
    try {
      dispatch({
        type: SET_LOADING,
      });

      const res = await axios.get(`http://localhost:5000/users/${id}`);

      dispatch({
        type: LOAD_USER,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: LOAD_USER_FAIL,
        payload: error,
      });
    }
  };

  const setProfileImage = async (image) => {
    try {
        dispatch({
            type:SET_LOADING
        })
      const imgRes = await axios.post("https://api.imgur.com/3/image", image, {
        headers: {
          Authorization: "Client-ID bc314740cabd71c",
        },
      });
      
      // if(imgRes.status = 200){

      const id = localStorage.getItem("user_id");
      const getUser = await axios.get(`http://localhost:5000/users/${id}`);
      
      const { googleId, email, first_name, last_name } = getUser.data;
      const updUser = {
        googleId,
        email,
        first_name,
        last_name,
        image_url: imgRes.data.data.link,
      };

 
      const updAct = await axios.put(
        `http://localhost:5000/users/${id}`,
        updUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      dispatch({
        type: IMAGE_SUCCESS,
        payload: updAct.data,
      });
      

      // }
    } catch (error) {
      dispatch({
        type: IMAGE_FAIL,
        payload: error,
      });
    }
  };

  const logOut = () => {
    dispatch({ type: LOGOUT_USER });
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
        isLoggedOut: state.isLoggedOut,
        redirect: state.redirect,
        error: state.error,
        checkUser,
        registerUser,
        loadUser,
        setProfileImage,
        logOut,
      }}
    >
      <div>{props.children}</div>
    </AuthContext.Provider>
  );
};

export default AuthState;
