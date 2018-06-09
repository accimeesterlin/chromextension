import React, { Component } from 'react';
import Footer from '../../common/Footer';
import { connect } from 'react-redux';

import {
    saveTutorInfo,
    fetchGoogleSheetStudent,
    saveGoogleSheetStudents,
    loadTutorInfo,
} from '../../actions';
import './tutorInfo.css';

class TutorInfoUI extends Component {

    // Pull Sheet ID from Google Spreadsheet URL User Input
    // Pull tutor students record from Google Sheets
    // Add every object of student into an array
    getGoogleSheetId = async (url) => {
        const sheet_id = new RegExp("/spreadsheets/d/([a-zA-Z0-9-_]+)").exec(url)[1];
        const values = await this.props.fetchGoogleSheetStudent(sheet_id);
        this.filterGoogleSheetsStudents(values);
    };

    componentDidMount = () => {
        try {
            chrome.storage.sync.get(['tutor_name', 'google_sheet_url'], (data) => {
                this.props.loadTutorInfo(data);
            })
        } catch (error) {
            // TODO
        }
    };


    // Flatten array of array to array of object
    // Remove duplicate students
    filterGoogleSheetsStudents = (response) => {
        const students = response.value.data.values;
        const lists_students = [];
        for (let i = 0; i < students.length; i++) {
            try {
                const email = students[i][3];
                if (email.includes('@')) {
                    const code = students[i][0];
                    const name = students[i][2];
                    const username = students[i][4];
                    lists_students.push({ code, name, email, username });
                }
            } catch (error) {
                // TODO
                // Handle multiple cases of failures
            }
        }

        this.checkImportStatus(lists_students);
    };


    checkImportStatus = (students) => {
        if (students.length > 0) {
            this.props.saveGoogleSheetStudents(students);
        } else {
            this.props.handleError({
                error: true,
                errorMessage: 'Unable to import your students'
            })
        }
    };

    // Get input values
    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.props.getValue({ [name]: value });
    };

    rangeError = (errorMessage) => {
        return (
            <div className='error'>
                <p>{errorMessage}</p>
                <ul>
                    <li>Change Google Sheet Tab Name to <strong>Roster</strong></li>
                </ul>
            </div>
        );
    };


    permissionError = (errorMessage) => {
        return (
            <div className='error'>
                <p>{errorMessage}</p>
                <p>Make sure that your Google Sheet Permission is either Public or people with link (no signin required)</p>
                <p>To Change access: </p>
                <ul>
                    <li>Open sheet in google drive</li>
                    <li>On top right corner, click share</li>
                    <li> On bottom of prompt window, click advanced</li>
                    <li> Change permission to public or people with link (no signin required)</li>
                </ul>
            </div>
        )
    };

    columnError = (message) => {
        return (
            <div className='error'>
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
            </div>
        );
    };

    // Display Error in case Google Sheet API fails. 
    displayErrorMessage = () => {
        const { error, errorMessage } = this.props;
        const { permissionError, columnError, rangeError } = this;
        if (error) {

            if (errorMessage.includes('permission')) {
                return permissionError(errorMessage);
            }

            if (errorMessage.includes('import')) {
                return columnError(errorMessage);
            }

            else {
                return rangeError(errorMessage);
            }
        }
    };

    // Submit form with tutor name, and google sheet (optional)
    // Save tutor info
    // Call Google Sheet API for tutor student Roster
    submit = (event) => {
        event.preventDefault();
        const { tutor_name, google_sheet_url } = this.props;
        this.props.saveTutorInfo({
            tutor_name,
            google_sheet_url
        });

        if (google_sheet_url) {
            this.getGoogleSheetId(google_sheet_url);
        }
    };

    render() {
        const { tutor_name, google_sheet_url } = this.props;
        return (
            <div className='form-container tutor_info'>
                <button className='go-back' onClick={() => this.props.navigate({ url: '/home' })}>Go back</button>
                <div className="notify">
                    {this.displayErrorMessage()}
                    {this.props.displayNotification()}
                </div>
                <form onSubmit={this.submit}>
                    <div>
                        <label htmlFor='tutor_name'>Tutor Name: </label>
                        <input
                            type='text' name='tutor_name'
                            onChange={this.handleChange}
                            placeholder='Enter your tutor name (last, first)'
                            required
                            value={tutor_name} />
                    </div>

                    <div>
                        <label htmlFor='google_sheet_url'>Google Sheet URL:  </label>
                        <input
                            type='text' name='google_sheet_url'
                            onChange={this.handleChange}
                            onFocus={this.googleSheetInstructions}
                            value={google_sheet_url}
                            placeholder='Enter your student google sheet url'
                        />
                    </div>
                    <div className="buttons">
                        <button>Add</button>
                    </div>
                </form>

                <p>NOTE: To import students from your Google Sheet, follow this example </p>
                <a
                    href="https://docs.google.com/spreadsheets/d/1LSGuoaYRKOpkF50r8S-lpMzbNIJ9jMKCIvudNt-3Bj0/edit#gid=0"
                    target='_blank'
                    rel="noopener noreferrer"> Tutor’s Tracking Spreadsheet EXAMPLE </a>

                <Footer />
            </div>
        );
    };
};




const mapDispatchToProps = (dispatch) => {
    return {
        saveTutorInfo: (data) => dispatch(saveTutorInfo(data)),
        loadTutorInfo: (tutor) => dispatch(loadTutorInfo(tutor)),
        saveGoogleSheetStudents: (students) => dispatch(saveGoogleSheetStudents(students)),
        fetchGoogleSheetStudent: (sheet_id) => dispatch(fetchGoogleSheetStudent(sheet_id))
    };
};

const mapStateToProps = () => {
    return {

    };
};

const TutorInfo = connect(mapStateToProps, mapDispatchToProps)(TutorInfoUI);
export default TutorInfo;


