
import React, { useState, useContext } from 'react';
import CourseContext from '../../context/course/courseContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {

    const courseContext = useContext(CourseContext);
    const alert = useContext(AlertContext);

    const [text, setText] = useState('');

    const changeText = e => {
        setText(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(text===''){
            return alert.setAlert("Please make an entry", "danger");
        }
        courseContext.searchCourses(text)
        setText('');
    }

    return (
        
        <div className="row ">
            <div  style={{width:"40%", margin:"0 auto", marginTop:"2rem"}}>
            <form onSubmit={handleSubmit}>
                <input type="text" className="form-control" value={text} onChange={changeText} style={{ borderRadius: "5px", height: "3rem", paddingLeft:"1rem" }} placeholder="Search Courses..."/> <br />
                <input type="submit" className="btn btn-info" style={btnStyle} value="Search"  />
            </form>
           
        </div>
        </div>
    )
}
const btnStyle={
    marginLeft:"10%",
    width:"80%",
    borderRadius:"0.5rem",
    padding:"0.5rem",
    border:"none",
    color:"white",
    
    
  }

export default Search

