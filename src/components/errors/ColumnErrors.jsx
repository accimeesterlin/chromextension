import React from 'react';
import './rangeErrors.scss';



const ColumnErrors = ({ message }) => {
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
                <p>You need to have at least 5 columns in your spreadsheet</p>
                <p>Follow this format</p>
                <h2>Try the following: </h2>
                <ul>
                    <li>Class Code </li>
                    <li>University (Can be blank)</li>
                    <li>Student Name</li>
                    <li>Student Email</li>
                    <li>Github Username</li>
                </ul>

                <p>NOTE: To import students from your Google Sheet, follow this example </p>
                <a
                    href="https://docs.google.com/spreadsheets/d/1LSGuoaYRKOpkF50r8S-lpMzbNIJ9jMKCIvudNt-3Bj0/edit#gid=0"
                    target='_blank'
                    rel="noopener noreferrer"> Tutor’s Tracking Spreadsheet EXAMPLE </a>

                <a href="https://s3.us-east-2.amazonaws.com/tab-nabbers/Column+Error+-+Original.mp4" target='_blank'>
                    <img src={require('./ColumnErrors.gif')} alt="loading..." />
                </a>

            </div>
        </div>

    )
}


export default ColumnErrors;