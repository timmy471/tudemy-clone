import React, { useContext } from "react";
import GoogleLogin from "react-google-login";


import AuthContext from "../../context/auth/authContext";

const Login = (props) => {
  const authContext = useContext(AuthContext);

  const { checkUser } = authContext;

  const responseGoogle = (res) => {
    const { googleId, email, givenName, familyName } = res.profileObj;

    const user = {
      googleId,
      email,
      first_name: givenName,
      last_name: familyName,
      image_url: "imageur.com",
    };

    const token = res.tokenId;

 
    checkUser(user, token)
    
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
  // }
};

export default Login;
