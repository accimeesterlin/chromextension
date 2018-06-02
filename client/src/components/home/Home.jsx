import React, { Component } from 'react';
import './home.css';

class Home extends Component {

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

    sendMessageToContentScripts = (students, value) => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { students, value }, function (response) {
                console.log(response.farewell);
            });
        });
    };

    handleChange = (event) => {
        const value = event.target.value;
        const { students } = this.props;
        this.sendMessageToContentScripts(students, value);
    };



    optionValue = (students) => {
        return students.map(({ name, email }, index) => (
            <option key={index} value={email}>{name}</option>
        ));
    };

    displayTutorInfo = (name) => {
        if (name) {
            return (<p className='title'>Hi, {name}</p>);
        } else {
            return '';
        }
    };

    render() {
        const { students, tutor_name } = this.props;

        console.log('Students: ', students);
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
            </div>
        );
    };
}

export default Home;