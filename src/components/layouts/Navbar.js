import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GoogleLogout } from "react-google-login";

import AuthContext from "../../context/auth/authContext";

const Navbar = () => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logOut, user } = authContext;

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
        </ul>
        <div title="Tudemy homepage">
          <Link to="/" style={logoStyle}>
            <b>T</b>
          </Link>
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
  textDecoration: "none",
};

export default Navbar;
