import React from 'react'
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div>
            <h1 className = 'btn btn-primary'>Not found</h1>
            <p>The page you are looking for does not exist</p>
            <button className="btn btn-default"><Link to ="/">Go Home</Link> </button>
        </div>
    )
}

export default NotFound