/*eslint-disable */

import React, { Component } from 'react';
import Nav from '../../common/nav/Nav';
import Search from '../../molecules/Search';
import { connectWithStore } from '../../store/index';
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
        window.ga('config', 'UA-131529515-1', {
            'page_title': 'Home',
            'page_path': '/'
        });
    }

    navigate = (link) => {
        console.log('Link: ', link);
        return this.props.history.push(link);
    }

    sendMessageToContentScripts = (student, value) => {
        if (chrome) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { student }, function (response) {
                    console.log(response.farewell);
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

        const students = this.state.students.filter((el) => {
            if (el.name.toLowerCase().includes(value)) {
                return el;
            }
        });

        if (value === '') {
            return this.setState({ students: this.props.students, value });
        }
        this.setState({ students, value });
    };



    selectStudent = (student) => {
        this.sendMessageToContentScripts(student);
        this.setState({ isFocus: false });
    };


    render() {

        console.log('Students: ', this.props.students);
        
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
Home.displayName = 'HOME';
export default Home;