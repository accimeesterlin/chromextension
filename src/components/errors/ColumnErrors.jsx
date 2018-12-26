import React from 'react';



const ColumnErrors = ({ message }) => {
    return <div>
        <p>{message}</p>
        <p>You need to have at least 5 columns in your spreadsheet</p>
        <p>Follow this format</p>
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

    </div>;
}


export default ColumnErrors;