import React from 'react';



const PermissionErrors = ({ message }) => {
    return <div >
        <p>{message}</p>
        <p>Make sure that your Google Sheet Permission is either Public or people with link (no signin required)</p>
        <p>To Change access: </p>
        <ul>
            <li>Open sheet in google drive</li>
            <li>On top right corner, click share</li>
            <li> On bottom of prompt window, click advanced</li>
            <li> Change permission to public or people with link (no signin required)</li>
        </ul>
    </div>
}


export default PermissionErrors;