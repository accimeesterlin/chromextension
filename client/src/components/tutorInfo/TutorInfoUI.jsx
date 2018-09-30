import React, { Component } from 'react';
import Footer from '../../common/Footer';
import { Input, Form, Message, Icon } from 'semantic-ui-react';

import './tutorInfo.css';

class TutorInfoUI extends Component {


    // Pull Sheet ID from Google Spreadsheet URL User Input
    // Pull tutor students record from Google Sheets
    // Add every object of student into an array
    getGoogleSheetId = async (url) => {
        const { roster_name, fetchGoogleSheetStudent } = this.props;
        const sheet_id = new RegExp("/spreadsheets/d/([a-zA-Z0-9-_]+)").exec(url)[1];
        const validateRosterName = roster_name ? roster_name : 'Roster'; // needs refactoring
        const values = await fetchGoogleSheetStudent(sheet_id, validateRosterName);
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
                <p>Try the following: </p>
                <ul>
                    <li>Either Change Google Sheet Tab Name to <strong>Roster</strong></li>
                    <li> Or Add <strong>Student Roster</strong> into the Roster Name Input</li>
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

            return rangeError(errorMessage);
        }
    };

    rosterNotification = () => {
        const {
            isRosterSuccess,
            isRosterPending,
            roster_name
         } = this.props;

        if (isRosterPending) {
            return <div>
                <Icon name='circle notched' loading />
                <Message.Content>
                    <Message.Header>Just one second</Message.Header>
                    We are fetching that content for you.
                </Message.Content>
            </div>
        }

        if (isRosterSuccess) {
            return <Message
                success
                header=''
                content={`We have successfully uploaded your ${roster_name || 'Roster'} lists`}
            />
        }

        return null;

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
        const { tutor_name, google_sheet_url, roster_name } = this.props;

        return (
            <div className='form-container tutor_info'>
                <button className='go-back' onClick={() => this.props.navigate({ url: '/home' })}><i className="fas fa-long-arrow-alt-left fa-3x"></i></button>

                <Form onSubmit={this.submit}>
                    <Form.Field
                        control={Input}
                        label='Tutor Name: '
                        name='tutor_name'
                        onChange={this.handleChange}
                        value={tutor_name}
                        placeholder='Enter your tutor name (last, first)' />

                    <Form.Field
                        control={Input}
                        label='Google Sheet URL: '
                        name='google_sheet_url'
                        onChange={this.handleChange}
                        value={google_sheet_url}
                        placeholder='Enter your student google sheet url' />


                    <Form.Field
                        control={Input}
                        label='Roster Name: '
                        name='roster_name'
                        onChange={this.handleChange}
                        value={roster_name}
                        placeholder='Enter your Roster Name' />

                    <div className="buttons">
                        <button>Add</button>
                    </div>
                </Form>

                <div className="notify">
                    {this.displayErrorMessage()}
                    {this.rosterNotification()}
                </div>

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




export default TutorInfoUI;

