/*eslint-disable */

import React, { Component } from 'react';
import Nav from '../../common/nav/Nav';
import Search from '../../molecules/Search';
import { connectWithStore } from '../../store/index';
import './home.scss';
import DisplayStudents from './DisplayStudent';
import { tutorGoogleSheetToFillOut } from '../../common/constants';

class HomeUI extends Component {
    constructor(props) {
        super(props);

        this.state = {
            students: props.students,
            value: ''
        };
    }

    navigate = (link) => {
        console.log('Link: ', link);
        return this.props.history.push(link);
    }

    sendMessageToContentScripts = (student, tutorName) => {
        if (chrome) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { student, tutorName }, function (response) {
                    console.log('Successfully sent data to Content Script');
                });
            });
        }

        console.log('Not running inside the Chrome Extension yet!!!');
    };


    handleFocus = () => {
        this.setState({
            isFocus: true,
            students: this.props.students
        });
    };

    handleChange = ({ target }) => {
        const value = target.value.toLowerCase();
        const students = this.props.students.filter((el) => el.name.toLowerCase().includes(value));
        this.setState({ students, value });
    };

    generateGoogleSheetUrl = ({ email, name, studentCode }) => {
        const studentCodeId = 'entry.1626809215';
        const studentNameId = 'entry.1262798942';
        const studentEmailId = 'entry.1509111758';
        const tutorNameId = 'entry.737967299';
        let googleSheetUrl = `${tutorGoogleSheetToFillOut}?`;
        googleSheetUrl += `&${studentCodeId}=${studentCode}`;
        googleSheetUrl += `&${studentNameId}=${name}`;
        googleSheetUrl += `&${studentEmailId}=${email}`;
        googleSheetUrl += `&${tutorNameId}=${this.props.tutorName}`;
        
        window.open(googleSheetUrl);
    };



    selectStudent = (student) => {
        console.log('Selected student:', student);
        this.generateGoogleSheetUrl(student);
        // this.sendMessageToContentScripts(student, this.props.tutorName);
        this.setState({ isFocus: false });
    };


    render() {

        const tutorName = this.props.tutorName ? `Welcome ${this.props.tutorName}` : null;

        return (
            <div className="home">
                <Nav navigate={this.navigate} />
                <p className="home-name"> {tutorName} </p>
                <Search
                    handleChange={this.handleChange}
                    handleFocus={this.handleFocus}
                    value={this.state.value}
                />
                {this.state.isFocus ? <DisplayStudents selectStudent={this.selectStudent} students={this.state.students} /> : null}
            </div>
        );
    }
}

const Home = connectWithStore(HomeUI);
export default Home;