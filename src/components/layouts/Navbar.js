import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <nav>
            
                <ul>
                
                
                    <li><Link to="/" style={linkStyle}>Become a Tutor</Link></li>
                    <li style={linkStyle} data-toggle="modal" data-target="#loginModal">Login/Register</li>
                    {/* <li><Link to="/about" style={linkStyle}><span>Sign Out</span>  <i className="fa fa-sign-out alt"></i></Link></li> */}
                    
                </ul>
                <div style={logoStyle}><b>T</b></div>
            </nav>
          
        </div>
    )
}

const linkStyle={
    color:"white", 
    textDecoration:"none",
    cursor:"pointer"
}

const logoStyle={
    fontSize:"3.7rem",
    marginLeft:"3.5rem",
    float:"left", 
    fontFamily:"niconne", 
    color: "#f01662"
}

export default Navbar
