import React from 'react'
import CourseItem from './CourseItem';

const ForCourses = ({courses}) => {
    return (
        <div className='container'>
        <div className='container'>
     
     <div className=" row"  style={{backgroundColor:"white",  borderRadius:"1rem"}}>
      
       {/* {authors.map((author, index) => {
        const course = courses[index];
        return (
           
          <div className="col-xs-12 col-sm-12 col-md-3"  key={course.id}>
           
            <CourseItem course={course} author={author} />
            
          </div>
        );
      })} */}
      {
        courses.map(course=> {
          return (
           
            <div className="col-xs-12 col-sm-12 col-md-3"  key={course.id}>
             
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

export default ForCourses
