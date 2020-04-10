import React, { useContext, useEffect } from "react";
import Jumbotron from "../layouts/Jumbotron";
import Login from "./Login";
import { Redirect } from "react-router-dom";

import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);
  const { redirect, loadUser } = authContext;

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      loadUser(localStorage.getItem("user_id"));
      
    }
    //eslint-disable-next-line
  }, []);

  if (redirect) {
    return <Redirect to="/dashboard" />;
  } else {
    return (
      <div>
        <Login />
        <Jumbotron />
        <div className="container">
          
        </div>
      </div>
    );
  }
};

export default Home;
