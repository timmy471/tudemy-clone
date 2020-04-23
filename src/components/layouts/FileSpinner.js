import React from 'react'
import Spinner from "react-bootstrap/Spinner";


const FileSpinner = () => {
    return (
        <div className="text-center mt-4"> 
            <Spinner animation="grow" variant="info"  height="100" width="100" alt="loading..."/>
        </div>
    )
}

export default FileSpinner



