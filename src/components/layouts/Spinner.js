import React from 'react'
import spinner from '../../images/spinner.gif';


const Spinner = () => {
    return (
        <div className="text-center"> 
            <img src = {spinner} alt="Loading..." height="100" width="100" style={{marginTop:"10rem"}} />
        </div>
    )
}

export default Spinner
