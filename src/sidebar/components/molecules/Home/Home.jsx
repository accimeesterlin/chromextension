/*eslint-disable */

import React, { Component } from 'react';
import Search from '../../atoms/Search';
import { connect } from 'react-redux';
import UseFullLinks from './UseFullLinks';
import './home.scss';
import DisplayStudents from './DisplayStudent';

export class HomeUI extends Component {
    constructor(props) {
        super(props);

        this.state = {
            students: props.students,
            value: ''
        };
    }

    componentDidMount = () => {
        if (window.ga) {
            window.ga('send', {
                hitType: 'pageview',
                page: '/',
                title: 'Home'
            });
        }
    }

    sendMessageToContentScripts = (student, tutorName) => {
        const log = console.log;
        if (chrome && chrome.tabs) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { student, tutorName }, function () {
                    log('Successfully sent data to Content Script');
                });
            });
        }

        log('Not running inside the Chrome Extension yet!!!');
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
            <div className="home-sidebar">
                <p className="home-sidebar-name"> {tutorFullName} </p>
                <UseFullLinks googleSheetUrl={googleSheetUrl}/>
                <Search
                    handleChange={this.handleChange}
                    handleFocus={this.handleFocus}
                    value={this.state.value}
                />
                {this.state.isFocus ? <DisplayStudents selectStudent={this.selectStudent} students={this.state.students} /> : null}
                {/* <a href="chrome-extension://fdodjjknhlahjbifipiknkoojnieeaha/index.html/#/new/home" target="_blank">View full Page</a> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const students = state.students;
    const { tutorName, googleSheetUrl } = state.tutor;
    return {
        students,
        tutorName,
        googleSheetUrl
    };
};

const mapDispatchToProps = () => {
    return {
        
    };
};


const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeUI);
export default Home;