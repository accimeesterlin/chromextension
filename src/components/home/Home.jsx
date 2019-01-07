/*eslint-disable*/
import React, { Component } from 'react';
import Nav from '../../common/nav/Nav';
import Search from '../../molecules/Search';
import { connectWithStore } from '../../store/index';
import './home.scss';
import DisplayStudents from './DisplayStudent';
import { Typography, withStyles } from '@material-ui/core'

export const styles = (theme) => {
    return (
        {
            homeName: {
                textAlign: 'left',
                margin: '10px'
            }
        }
    )
}
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
                    console.log('successfully sent data to content script');
                });
            });
        }
        console.error('not running inside chrome extension');
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
        const {classes} = this.props;

        const tutorName = this.props.tutorName ? `Welcome, ${this.props.tutorName}` : null;

        return (
            <div className="home">
                <Nav navigate={this.navigate} />
                <Typography className={classes.homeName}>{tutorName}</Typography>
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
const stylizedHome = withStyles(styles)(Home);
export default stylizedHome;