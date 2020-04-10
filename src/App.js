import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Alert from "./components/layouts/Alert";

import Footer from "./components/layouts/Footer";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";
import NotFound from "./components/pages/NotFound";
import AddCourse from "./components/pages/AddCourse";
import Courses from "./components/pages/Courses";



import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import CourseState from "./context/course/CourseState";


import "./App.css";

function App() {
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
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path ="/addcourse" component={AddCourse} />
                <Route exact path ="/courses" component={Courses} />

                {/* <Route exact path = '/user/:login' component={User} /> */}
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

export default App;
