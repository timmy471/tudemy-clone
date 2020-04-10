import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

import Spinner from "../layouts/Spinner";

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { isLoggedOut, loadUser, loading, user, setProfileImage } = authContext;

  const [image, setImage] = useState(null);

  useEffect(() => {
    loadUser(localStorage.getItem("user_id"));
    //eslint-disable-next-line
  }, []);

  const onChange = e => {
    setImage(e.target.files[0])
  }

  const callSetProfileImage = async (e) => {
    e.preventDefault();
        if(image===null){
        alertContext.setAlert('Please select an image', 'danger');
        return;
    }else{
    await setProfileImage(image);
    alertContext.setAlert('Profile updated successfully', 'success');
    }
  }


  return (
    <>
      {!loading && user !== null ? (
        <div className="container">
          <div className="profile ">
            <div
              className="profile-details"
              style={{
                display: "flex",
                backgroundColor: "white",
                width: "auto",
                padding: "2rem",
                marginTop: "2rem"
              }}
            >
              <span>
                <img
                  src={user.image_url}
                  height="150"
                  width="150"
                  alt="profile"
                />
              </span>
              <span style={{ margin: "1rem 3rem" }} >
                <h3>
                  {user.first_name} {user.last_name}
                </h3>
                <h6>{user.email}</h6>
                <div style={{ marginTop: "4rem" }}>
                  <form  encType= 'multipart/form-data'>
                    <input
                      type="file"
                      accept="image/*"
                      data-max-size="5000"
                      name="image"
                      onChange={onChange}
                    />
                    <div className ="row " style={{margin:"1rem 0 1rem 0"}}>
                    <input type="submit" value="save" onClick={callSetProfileImage} className="btn btn-primary" />
                    </div>
                  </form>
                </div>
              </span>
            </div>
          </div>
        </div>
      ) : isLoggedOut ? (
        <Redirect to="/" />
      ) : (
        <Spinner />
      )}
    </>
  );
  //   {{display:"flex", marginTop:"2rem", backgroundColor:"white", width:"auto", padding:"2rem"}}
};

export default Dashboard;
