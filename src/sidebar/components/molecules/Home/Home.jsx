/*eslint-disable */

import React, { Component } from 'react';
import Search from '../../atoms/Search';
import { connectWithStore } from '../../../store/index';
import UseFullLinks from './UseFullLinks';
import './home.scss';
import DisplayStudents from './DisplayStudent';

class HomeUI extends Component {
    constructor(props) {
        super(props);

        this.state = {
            students: props.students,
            value: ''
        };
    }

    componentDidMount = () => {
        window.ga('send', {
            hitType: 'pageview',
            page: '/',
            title: 'Home'
        });
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



    selectStudent = (student) => {
        this.sendMessageToContentScripts(student, this.props.tutorName);
        this.setState({ isFocus: false });
    };


    render() {
        const { tutorName, googleSheetUrl } = this.props;
        const tutorFullName = tutorName ? `Welcome ${tutorName}` : null;

        return (
            <div className="home">
                <p className="home-name"> {tutorFullName} </p>
                <UseFullLinks googleSheetUrl={googleSheetUrl}/>
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