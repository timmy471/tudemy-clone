import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';



import "./App.css";

function App() {
  return (
 
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
          <Switch>
            
             <Route exact path = '/' component={Home} />
             <Route exact path = '/dashboard' component={Dashboard} />
             
              {/* <Route exact path = '/user/:login' component={User} /> */}
           
          </Switch>
         
          </div>
          <Footer />
        </div>
      </Router>
  
  );
}

export default App;
