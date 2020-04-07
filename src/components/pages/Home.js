import React, { useContext } from 'react'
import Jumbotron from "../layouts/Jumbotron";
import Login from "./Login";
import { Redirect } from 'react-router-dom';

import AuthContext from "../../context/auth/authContext";

const Home = () => {

    const authContext  = useContext(AuthContext);
    console.log(authContext);
    if(authContext.redirect){
        
        return <Redirect to="/dashboard" />
    }else{
        return (
            <div>
                <Login />
                <Jumbotron />
            </div>
        )
    }
  
}

export default Home
