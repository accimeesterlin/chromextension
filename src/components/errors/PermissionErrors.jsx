import React from 'react';
import './error.scss';

const PermissionErrors = ({ message }) => {
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
                <p>
                    Make sure that your Google Sheet Permission is either Public or people with link (no signin required)
                </p>
                <h2>To Change access: </h2>
                <ul>
                    <li>Open sheet in google drive</li>
                    <li>On top right corner, click share</li>
                    <li> On bottom of prompt window, click advanced</li>
                    <li> Change permission to public or people with link (no signin required)</li>
                </ul>

                <p>Click on the video below to view instructions on a new tab</p>

                <a
                    href="https://s3.us-east-2.amazonaws.com/tab-nabbers/Column+Error+-+Original.mp4"
                    rel="noopener noreferrer"
                    target='_blank'>
                    <img src={require('./gifs/PermissionError.gif')} alt="loading..." />
                </a>
            </div>
        </div>
    )
}


export default PermissionErrors;