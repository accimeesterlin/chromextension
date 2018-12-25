import React from 'react';



const RangeErrors = ({ message }) => {
    return <div >
        <p>{message}</p>
        <h2>Try the following: </h2>
        <ul>
            <li>Either Change Google Sheet Tab Name to <strong>Roster</strong></li>
            <li> Or Add <strong>Student Roster</strong> into the Roster Name Input</li>
        </ul>
    </div>
}


export default RangeErrors;