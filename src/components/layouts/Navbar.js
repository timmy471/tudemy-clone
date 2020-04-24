import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";

import AuthContext from "../../context/auth/authContext";

const Navbar = () => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, user, isLoggedOut, loading } = authContext;

  return (
    // <nav>
    //   <span style={{ paddingTop: "0.8rem" }}>
    //     <Link to="/" style={logoStyle}>
    //       <b>T</b>
    //     </Link>
    //   </span>
    //   <ul style={{ display: "flex" }}>
    //     <li>
    //       {" "}
    //       <Link to="/addcourse" style={linkStyle}>
    //         Teach
    //       </Link>
    //     </li>
    //     <li>
    //       {" "}
    //       <Link to="/courses" style={linkStyle}>
    //         Learn
    //       </Link>
    //     </li>
    //     {isAuthenticated && !loading && user !== null ? (
    //       <div>
    //         <li className="dropdown" style={linkStyle}>
    //           <span
    //             className=" dropdown-toggle"
    //             type="button"
    //             data-toggle="dropdown"
    //             aria-haspopup="true"
    //             aria-expanded="false"
    //           >
    //             {user.first_name}
    //           </span>
    //           <div
    //             className="dropdown-menu"
    //             aria-labelledby="dropdownMenuButton"
    //           >
    //             <span className="dropdown-item">
    //               <Link
    //                 to="/dashboard"
    //                 style={{
    //                   color: "black",
    //                   cursor: "pointer",
    //                   textDecoration: "none",
    //                 }}
    //               >
    //                 Dashboard
    //               </Link>
    //             </span>
    //             <span
    //               className="dropdown-item"
    //               data-toggle="modal"
    //               data-target="#loginModal"
    //             >
    //               Log Out &nbsp; <i className="fa fa-sign-out alt"></i>
    //             </span>
    //             {/* <span className="dropdown-item">
    //                 <GoogleLogout
    //                   clientId="1023197123408-m12bk63thidlatpglrq7g7jvjmhd072v.apps.googleusercontent.com"
    //                   buttonText="Logout"
    //                   onLogoutSuccess={logOut}
                      
    //                 ></GoogleLogout>
    //               </span> */}
    //           </div>
    //         </li>
    //       </div>
    //     ) : (
    //       <li style={linkStyle} data-toggle="modal" data-target="#loginModal">
    //         Login/Register
    //       </li>
    //     )}
    //     {isLoggedOut && <Redirect to="/" />}
    //   </ul>
    // </nav>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" />
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
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
