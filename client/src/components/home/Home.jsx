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
        try {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { students, value }, function (response) {
                    console.log(response.farewell);
                });
            });
        } catch (error) {
            // TODO
        }
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

    // List all students in dropdown
    listValue = (students) => {
        students.sort((a, b) => a.name === b.name ? 0 : +(a.name > b.name) || -1);
        return students.map(({
            name,
            email
        }, index) => (<a onClick={this.handleChange} key={index} value={email}>{name}</a>));
    };

    // Display Tutor title
    displayTutorInfo = (name) => {
        if (name) {
            return (<p className='title'>Hi, {name}</p>);
        } else {
            return '';
        }
    };

    showStudents = () => {
        document.getElementById("myDropdown").style.display = ("block");
    }

    filterFunction = (event) => {
        var input, filter, ul, li, a, i;
        var input = document.getElementById("myInput");
        var filter = input.value.toUpperCase();
        var div = document.getElementById("myDropdown");
        var a = div.getElementsByTagName("a");
        div.style.display = "block";
        for (i = 0; i < a.length; i++) {
            if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
                a[i].style.display = "";
            } else {
                a[i].style.display = "none";
            }
        }
    }

    render() {
        const { students, tutor_name } = this.props;
        return (
            <div className="container">
                {this.displayTutorInfo(tutor_name)}
                <p>Please select one of the options below:</p>

                <div className="buttons">
                    <button
                        className='btn btn-inline'
                        onClick={() => this.navigateUser('add_student')}>
                        Add a student
                    </button>

                    <button
                        className='btn btn-inline'
                        onClick={() => this.navigateUser('delete_student')}>
                        Delete a student
                    </button>

                    <button
                        className='btn btn-green'
                        onClick={() => this.navigateUser('tutor_name')}>
                        Add your tutor info
                    </button>
                </div>

                <p>Or prefill current student</p>

                <input type="text"
                    placeholder="Filter Students.."
                    id="myInput"
                    onClick={this.showStudents}
                    onKeyUp={this.filterFunction} />

                <div className="dropdown">
                    <div id="myDropdown" className="dropdown-content">
                        {this.listValue(students)}
                    </div>
                </div>

                <Footer />
            </div>
        );
    };
}

export default Home;
