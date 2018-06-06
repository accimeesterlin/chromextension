import React, { Component } from 'react';
import './tutorInfo.css';

class TutorInfo extends Component {

    getGoogleSheetId = async (url) => {
        const sheet_id = new RegExp("/spreadsheets/d/([a-zA-Z0-9-_]+)").exec(url)[1];
        const values = await this.props.fetchGoogleSheetStudent(sheet_id);
        this.filterGoogleSheetsStudents(values);
    };


    filterGoogleSheetsStudents = (response) => {
        const students = response.value.data.values;
        const lists_students = [];

        for (let i = 0; i < students.length; i++) {

            try {
                if (students[i][3].includes('@')) {

                    lists_students.push({
                        code: students[i][0],
                        name: students[i][2],
                        email: students[i][3],
                        username: students[i][4]
                    });
                }
            } catch (error) {
                // console.log('Not found');
            }
        }

        this.removeDuplicate(lists_students);
    };

    removeDuplicate = students => {
        const results = students = students.filter((thing, index, self) =>
            index === self.findIndex((t) => (
                t.email === thing.email
            ))
        );

        console.log('Remove Duplicate: ', results);
        this.saveGoogleSheetStudents(results);

    };

    saveGoogleSheetStudents = (students) => {
        console.log('Students: ', students);
        for (let i = 0; i < students.length; i++) {
            this.props.saveStudents(students[i])
        }
    };

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.props.getValue({ [name]: value });
    };

    displayErrorMessage = () => {
        const { error, errorMessage } = this.props;
        if (error) {
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
        } else {
            this.props.displayNotification();
        }
    };


    googleSheetInstructions = () => {
        console.log('Hello World');
    };


    submit = (event) => {
        event.preventDefault();
        const { tutor_name, google_sheet_url } = this.props;

        this.props.saveTutorInfo({
            tutor_name,
            google_sheet_url
        });

        this.getGoogleSheetId(google_sheet_url);
    };

    render() {
        const { tutor_name, google_sheet_url } = this.props;
        return (
            <div className='form-container tutor_info'>
                <button className='go-back' onClick={() => this.props.navigate({ url: '/home' })}>Go back</button>
                <div className="notify">
                    {this.displayErrorMessage()}
                </div>
                <form onSubmit={this.submit}>
                    <div>
                        <label htmlFor='tutor_name'>Tutor Name: </label>
                        <input
                            type='text' name='tutor_name'
                            onChange={this.handleChange}
                            placeholder='Enter your tutor name'
                            required
                            value={tutor_name} />
                    </div>

                    <div>
                        <label htmlFor='google_sheet_url'>Google Sheet URL - In Beta:  </label>
                        <input
                            type='text' name='google_sheet_url'
                            onChange={this.handleChange}
                            onFocus={this.googleSheetInstructions}
                            placeholder='Enter your student google sheet url'
                            value={google_sheet_url} />
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
            </div>
        );
    };
};


export default TutorInfo;