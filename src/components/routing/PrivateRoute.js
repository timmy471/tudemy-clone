import React, { useContext, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import Spinner from "../layouts/Spinner";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, loading, authUser, isLoggedOut } = authContext;

  useEffect(() => {
    authUser();
    if (isLoggedOut) {
      alert("Please login to visit this page");
    }
    //eslint-disable-next-line
  }, []);

  const isAuth = (props) => (
    <Fragment>
      {" "}
      {!isLoggedOut ? <Component {...props} /> : <Redirect to="/" />}{" "}
      {/* {isAuthenticated ? <Component {...props} /> : <Redirect to="/" />}{" "} */}
    </Fragment>
  );

  return (
    <div>
      <Route
        {...rest}
        render={(props) => (loading ? <Spinner /> : isAuth(props))}
      />
    </div>
  );
};

PrivateRoute.propTypes = {
  isLoggedOut: PropTypes.bool,
  loading: PropTypes.bool,
  authUser: PropTypes.func,
};

export default PrivateRoute;
