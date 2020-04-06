import React from "react";
import GoogleLogin from 'react-google-login';

const Login = () => {
  return (
    <div className="modal fade" id="loginModal"  >
      <div className="modal-dialog modal-dialog-centered" >
        <div className="modal-content" style={{backgroundColor:" rgba(91, 83, 83, 0.3)"}}>
          <div className="modal-header"  >
             <GoogleLogin
    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
    buttonText="Login"
    // onSuccess={responseGoogle}
    // onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />,
          
            <button type="button" className="btn btn-danger" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Login;
