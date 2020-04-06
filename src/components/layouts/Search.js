import React, { useContext, useState } from 'react'
import GithubContext from '../../context/github/githubContext';

function Search() {

    const githubContext = useContext(GithubContext);

    const { searchUsers, clearUsers, users } = githubContext;

    const [text, setText] = useState('');

   const onClickHandler = (e) => {
    e.preventDefault();
    searchUsers(text);
    setText('');
   }

    return (
          
       <div style={{width:"80%", margin:"0 auto", padding:"20px"}}>
           <div style={{}}>
           <form >
               <input style={{width:"60%", height:"3rem", paddingLeft:"1rem"}} placeholder="Search Users..." value = {text}  onChange={e=>setText(e.target.value)}/> <br />
               <button style={{width:"50%", height:"2.5rem", marginTop:"1.5rem", border:"none", backgroundColor:"#7530db"}} onClick = {onClickHandler}>Search</button> <br />
               {users.length>0 &&  <button  style={{width:"50%", height:"2.5rem", marginTop:"1.5rem", border:"none", backgroundColor:"#797480"}} onClick={clearUsers} >Clear Users</button> }
           </form>
        
          </div>
               
               
           
       </div>

    )
}

export default Search

