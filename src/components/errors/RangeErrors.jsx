import React from 'react';
import './rangeErrors.scss';


const RangeErrors = ({ message }) => {
    return (
        <div className='rangeErrors'>
            <div className='errorBox'>


                <div className='iconContainer'>
                    <svg className="icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z">
                        </path>
                    </svg>
                    Error Found
                </div>
                <div>

                    <p>{message}</p>
                </div>
            </div>
            <div className='errorInstructions'>
                <h2>Try the following: </h2>
                <ul>
                    <li>Either Change Google Sheet Tab Name to <strong>Roster</strong></li>
                    <li> Or Add <strong>Student Roster</strong> into the Roster Name Input</li>
                </ul>

                <img src={require('./PermissionError.gif')} alt="loading..." />

            </div>
        </div>
    )
}


export default RangeErrors;