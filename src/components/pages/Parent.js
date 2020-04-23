import React, { useEffect, useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import Alert from "../layouts/Alert";

import Footer from "../layouts/Footer";
import Home from "./Home";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";
import AddCourse from "./AddCourse";
import AllCourses from "./AllCourses";
import Course from "./Course";
import PrivateRoute from "../routing/PrivateRoute";

import AuthState from "../../context/auth/AuthState";
import AlertState from "../../context/alert/AlertState";
import CourseState from "../../context/course/CourseState";

import AuthContext from "../../context/auth/authContext";

const Parent = () => {

    const authContext = useContext(AuthContext);

    useEffect(() => {
        if(localStorage.getItem('user_id')){
          authContext.authUser();
    
        }
      }, [])

    return (
        <AuthState>
        <AlertState>
          <CourseState>
              <Router>
                <div className="App">
                  <Navbar />
                  <>
                    <Alert />
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <PrivateRoute exact path="/dashboard" component={Dashboard} />
                      <PrivateRoute exact path="/addcourse" component={AddCourse} />
                      <Route exact path="/courses" component={AllCourses} />
    
                      <PrivateRoute exact path="/course/:id" component={Course} />
                      <Route component={NotFound} />
                    </Switch>
                  </>
                  <Footer />
                </div>
              </Router>
              </CourseState>
      </AlertState>
    </AuthState>
      );
}

export default Parent
