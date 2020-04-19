import React, { useContext } from 'react';
 
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
    const alertContext = useContext(AlertContext);
    const { alert } = alertContext;
    return (
        alert != null && (
            <div className = {`alert alert-${alert.type}`} style = {{ textAlign:'center' }}>
            <h6>{alert.msg}</h6>
         </div>
        )
       
    )
}

export default Alert
