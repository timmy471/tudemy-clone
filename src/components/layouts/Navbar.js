import React, { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../context/auth/authContext";

const Navbar = () => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logOut, user } = authContext;

//   <div class="dropdown">
//   <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//     Dropdown button
//   </button>
//   <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
//     <a class="dropdown-item" href="#">Action</a>
//     <a class="dropdown-item" href="#">Another action</a>
//     <a class="dropdown-item" href="#">Something else here</a>
//   </div>
// </div>

//  <li
//               style={linkStyle}>
//                <span onClick={logOut}>Sign Out</span>{" "}
//                <i className="fa fa-sign-out alt"></i>
            
//            </li>
  
    return (
        <div>
          <nav>
           
            <ul>
            
              <li>
                <Link to="/" style={linkStyle}>
                  Become a Tutor
                </Link>
              </li>
              {isAuthenticated ? (
                  <div>
             <li className="dropdown" style={linkStyle}>
  <span className=" dropdown-toggle" type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    {user.first_name}
  </span>
  <div  style={{paddingRight:"5rem"}}>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <span className="dropdown-item" ><Link to="/dashboard"  style={{color:"black", cursor:"pointer", textDecoration:"none"}}>Dashboard</Link></span>
    <span className="dropdown-item" onClick={logOut}>Sign Out  <i className="fa fa-sign-out alt"></i> </span>
  </div>
  </div>
</li>
           {/* <li>Dashboard</li> */}
           </div>
              ) : (
                
                  <li style={linkStyle} data-toggle="modal" data-target="#loginModal">
                  Login/Register
                </li>
              )}
    
            </ul>
            <div title="Tudemy homepage">
              <Link to ='/' style={logoStyle}><b>T</b></Link>
            </div>
          </nav>
        </div>
      );
  

  
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  cursor: "pointer",
};

const logoStyle = {
  fontSize: "3.7rem",
  marginLeft: "3.5rem",
  float: "left",
  fontFamily: "niconne",
  color: "#f01662",
  textDecoration: "none"
};

export default Navbar;
