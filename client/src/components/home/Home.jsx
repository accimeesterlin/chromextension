import React, { Component } from 'react';
import Footer from '../../common/Footer';
import './home.css';

class Home extends Component {

    // Navigate the user according the path selected
    navigateUser = (value) => {
        const { navigate } = this.props;
        switch (value) {
            case 'add_student':
                navigate({ url: '/add' });
                break;
            case 'delete_student':
                navigate({ url: '/delete' });
                break;

            case 'tutor_name':
                navigate({ url: '/tutor' });
                break;

            default:
                navigate({ url: '/home' });
                break;
        }
    };

    // Sends students object and tutor over to jQuery App
    // jQuery app will use these info to autofill Google Form Fields
    sendMessageToContentScripts = (students, value) => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { students, value }, function (response) {
                console.log(response.farewell);
            });
        });
    };

    // Get input values
    handleChange = (event) => {
        const value = event.target.value;
        const { students } = this.props;
        this.sendMessageToContentScripts(students, value);
    };

    // List all the students in the option
    optionValue = (students) => {
        console.log('Students Home: ', students)
        students.sort((a, b) => a.name === b.name ? 0 : +(a.name > b.name) || -1);
        return students.map(({ name, email }, index) => (
            <option key={index} value={email}>{name}</option>
        ));
    };

    // Display Tutor title
    displayTutorInfo = (name) => {
        if (name) {
            return (<p className='title'>Hi, {name}</p>);
        } else {
            return '';
        }
    };

    render() {
        const { students, tutor_name } = this.props;
        console.log('State of Students: ', students);

        return (
            <div className="container">
                {this.displayTutorInfo(tutor_name)}
                <p>Please select one of the option below</p>

                <div className="buttons">
                    <button
                        className='btn'
                        onClick={() => this.navigateUser('add_student')}>
                        Add a student
                    </button>

                    <button
                        className='btn'
                        onClick={() => this.navigateUser('delete_student')}>
                        Delete a student
                    </button>

                    <button
                        className='btn'
                        onClick={() => this.navigateUser('tutor_name')}>
                        Add your tutor info
                    </button>
                </div>

                <p>Or prefill current student</p>

                <select id='select_student' onChange={this.handleChange}>
                    <option value='default'>Please select a student</option>
                    {this.optionValue(students)}
                </select>

                <Footer />
            </div>
        );
    };
}

export default Home;