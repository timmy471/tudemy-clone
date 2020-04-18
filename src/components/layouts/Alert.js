import React, { useContext } from 'react';
 
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
    const alertContext = useContext(AlertContext);
    const { alert } = alertContext;
    return (
        alert != null && (
            <div className = {`alert alert-${alert.type}`} style = {{ textAlign:'center' }}>
            <h4>{alert.msg}</h4>
         </div>
        )
       
    )
}

export default Alert
