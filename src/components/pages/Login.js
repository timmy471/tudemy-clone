import React from "react";
import GoogleLogin from "react-google-login";
import { Redirect } from "react-router-dom";

const Login = () => {
  const responseGoogle = (response) => {
    console.log(response);
    <Redirect to="/dashboard" />
  };

  return (
    <div className="modal fade" id="loginModal">
      <div className="modal-dialog modal-dialog-centered">
        <div
          className="modal-content"
          style={{ backgroundColor: " rgba(91, 83, 83, 0.3)" }}
        >
          <div className="modal-header">
            <GoogleLogin
              clientId="1023197123408-m12bk63thidlatpglrq7g7jvjmhd072v.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
            ,
            <button
              type="button"
              className="btn btn-danger mt-2"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
