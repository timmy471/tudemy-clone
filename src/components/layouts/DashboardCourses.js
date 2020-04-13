import React from 'react'
import CourseItem from './CourseItem';

const DashboardCourses = ({courses}) => {
    return (
        <div className='container'>
        <div className='container'>
     
     <div className=" row mt-4"  style={{backgroundColor:"white", padding:"1rem", borderRadius:"1rem"}}>
    
      {
        courses.map(course=> {
          return (
           
            <div className="col-xs-12 col-sm-12 col-md-6"  key={course.id}>
             
              <CourseItem course={course}  />
              
            </div>
          );
        })
      }
    </div>
      
    </div>
    </div>
    )
}

export default DashboardCourses
