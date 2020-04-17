import React from 'react'
import spinner from '../../images/spinner.gif';


const FileSpinner = () => {
    return (
        <div className="text-center"> 
            <img src = {spinner} alt="Loading..." height="100" width="100" />
        </div>
    )
}

export default FileSpinner
