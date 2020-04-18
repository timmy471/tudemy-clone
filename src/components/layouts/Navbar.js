import React, { useContext, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { GoogleLogout } from "react-google-login"

import AuthContext from "../../context/auth/authContext";

const Navbar = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser(localStorage.getItem('user_id'))
  }, [])

  const { isAuthenticated, logOut, user, isLoggedOut, loading } = authContext;

  return (
    <nav>
       
       <span style={{paddingTop:"0.8rem"}}>
         <Link to="/" style={logoStyle}>
             <b>T</b>
         </Link>
       </span>
      <ul style={{display:"flex"}}>
       
        <li> <Link to="/addcourse" style={linkStyle}>
               Teach
             </Link></li>
        <li> <Link to="/courses" style={linkStyle}>
               Learn
             </Link></li>
             {isAuthenticated && !loading && user !== null ? (
            <div>
              <li className="dropdown" style={linkStyle}>
                <span
                  className=" dropdown-toggle"
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {user.first_name}
                </span>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                  
                >
                  <span className="dropdown-item">
                    <Link
                      to="/dashboard"
                      style={{
                        color: "black",
                        cursor: "pointer",
                        textDecoration: "none",
                      }}
                    >
                      Dashboard
                    </Link>
                  </span>
                  {/* <span className="dropdown-item" data-toggle="modal" data-target="#loginModal">
                    Log Out &nbsp; <i className="fa fa-sign-out alt"></i>
                  </span> */}
                  <span className="dropdown-item">
                    <GoogleLogout
                      clientId="1023197123408-m12bk63thidlatpglrq7g7jvjmhd072v.apps.googleusercontent.com"
                      buttonText="Logout"
                      onLogoutSuccess={logOut}
                      
                    ></GoogleLogout>
                  </span>
                </div>
              </li>
            </div>
          ) : (
            <li style={linkStyle} data-toggle="modal" data-target="#loginModal">
              Login/Register
            </li>
          )}
       {isLoggedOut && <Redirect to="/" />}
    

      </ul>
    </nav>
  // <div>
               
  //               <header>
  //               <span className = 'logo'>
  //                  Logo
  //               </span>
  //                   <nav>
  //                       <ul>
  //                           <li  id = 'home' >
  //                               Home
  //                       </li>

  //                           <li id = 'contact' o id = 'contact'>
  //                               Contact
  //                       </li>

  //                           <li   id = 'about'  id = 'about'>
  //                               About
  //                       </li>
  //                       </ul>
  //                   </nav>
  //               </header>

  //           </div>
  );
  
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  cursor: "pointer",
};

const logoStyle = {
  fontSize: "35px",
  marginLeft: "2rem",
  fontFamily: "niconne",
  color: "#f01662",
  textDecoration: "none",
};

export default Navbar;
