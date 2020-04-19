import React from "react";
import { Link } from 'react-router-dom';


const Jumbotron = () => {
  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container-fluid">
        <div className="textbox">
            <h2>Let's learn And Grow Together!</h2>
            <Link to="/courses" style={linkStyle} ><button>Get Started</button></Link>
        </div>
      </div>
    </div>
  );
};

const linkStyle = {
  textDecoration: "none",
  color: "white"
}
export default Jumbotron;
