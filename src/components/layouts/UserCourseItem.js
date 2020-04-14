import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CourseContext from '../../context/course/courseContext';
import AlertContext from '../../context/alert/alertContext';



const UserCourseItem = ({ course }) => {
  const { title, category, pic_url, id } = course;
  const courseContext = useContext(CourseContext);


  const onDelete = () => {
    courseContext.delCourse(id);
  }

  return (
     <div>
       <div className="card mt-4 mb-2" style={{ width: "100%" }}>
         <img src={pic_url}  height="150" width="150" className="card-img-top" alt={title} />   

         <div className="card-body">
          
           <div className="card-title">
             <h5>
           <Link to={`/course/:${id}`} style={{textDecoration:"none", color:"black"}} title="view Course">{title}</Link></h5> 
             <p>{category}</p>
           </div>
     

           <Link to="/addcourse" style={{textDecoration:"none"}}>
             <span className="btn btn-primary" onClick={()=>courseContext.setCurrent(course)}>Edit</span>
          
           </Link> &nbsp;

            <span className="pull-right">
             <span onClick={onDelete} className="btn btn-danger">Delete</span>
             </span>
          
         </div>
      </div>
     </div> 

  );
};

                                                     

export default UserCourseItem;
   