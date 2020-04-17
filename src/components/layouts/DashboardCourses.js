import React from 'react'
import UserCourseItem from './UserCourseItem';

const DashboardCourses = ({courses}) => {
    return (
        <div className='container'>
        <div className='container'>
     
     <div className=" row mt-4">
    
      {
        courses.map(course=> {
          return (
           
            <div className="col-xs-12 col-sm-12 col-md-6"  key={course.id}>
             
              <UserCourseItem course={course}  />
              
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
