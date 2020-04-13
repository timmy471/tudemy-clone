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
        <div className="container">
         <div className="row text-center mt-4" style={{backgroundColor:"white", padding:"2rem"}}>
           <div className="col-xs-12 col-sm-12 col-md-3">
           <span>
                <img
                  src={user.image_url}
                 height="80%"
                 width='80%'
                  alt="profile"
                />
              </span>
           </div>
           <div className="col-xs-12 col-sm-12 col-md-3">
           <div style={{textAlign:"left"}} >
                <h3>
                  {user.first_name} {user.last_name}
                </h3>
                <h6>{user.email}</h6>
                <div style={{ marginTop: "3rem" }}>
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
              </div>
           </div>
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

const imgStyle={
  height:"20%",
  width:"20%"
}

export default Dashboard;
