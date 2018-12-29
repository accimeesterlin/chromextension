import React, { Component } from 'react';
import Nav from '../../../common/nav/Nav';
import { Link } from 'react-router-dom';
import Form from './Form';
import axios from 'axios';
import * as tutorUtils from '../../../utils/tutorUtils';
// import Snackbar from '../../../molecules/SnackBar';
import { connectWithStore } from '../../../store/index';


import './info.scss';


class InfoUI extends Component {
    constructor(props) {
        super(props);

        this.state = {
            googleSheetUrl: props.googleSheetUrl || '',
            tutorName: props.tutorName || '',
            rosterName: props.rosterName || '',
            open: false,
            status: null,
            message: 'Not able to fetch data'
        };
    }


    startCounter = () => {
        this.counter++;
        console.log('Counter: ', this.counter);

        if (this.counter >= 5) {
            clearInterval(this.timerID);
            this.setState({ status: '' });

        }
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    fetchGoogleSheet = async () => {
        const { googleSheetUrl, rosterName } = this.state;

        if (googleSheetUrl && rosterName) {
            this.setState({ status: 'pending' }); // loading data
            const url = tutorUtils.generateSheetUrl(googleSheetUrl, rosterName);
            axios(url)
                .then(this.handleSuccessfulResult)
                .catch(this.handleError);
        }
    };


    handleError = (error) => {
        this.counter = 0;
        this.timerID = setInterval(this.startCounter, 1000);

        const { message, code } = error.response.data.error;

        this.setState({ status: 'error', message, code });
    };

    handleSuccessfulResult = ({ data }) => {
        // Start timer to remove status message
        this.counter = 0;
        this.timerID = setInterval(this.startCounter, 1000);

        // Filter results and add students to the store
        const results = data && data.values ? data.values : [];

        this.addStudentToStore(results);
    };


    validateCorrectColum = (isValid) => {
        if (isValid) {
            this.setState({ status: 'success', message: 'Successfully' });

        } else {
            this.setState({ status: 'error', message: 'Columns Error' });
        }

    };

    addStudentToStore = (data) => {
        let isValid = false;

        for (let i = 0; i < data.length; i++) {
            try {
                const email = data[i][3];
                console.log('Email: ', email);
                if (email.includes('@')) {
                    this.props.addStudents({
                        name: data[i][2],
                        githubUsername: data[i][4],
                        email,
                        studentCode: data[i][0]
                    });
                    isValid = true;
                }
            } catch (error) {
                console.log('Error is displaying');
                // TODO
                // Handle multiple cases of failures
            }
        }
        this.validateCorrectColum(isValid);
    };


    navigate = (link) => {
        console.log('Link: ', link);
        return this.props.history.push(link);
    }

    handleChange = ({ target }) => {
        const name = target.name;
        const value = target.value;

        this.setState({ [name]: value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        clearInterval(this.timerID);


        const { tutorName, googleSheetUrl, rosterName } = this.state;

        this.props.saveTutorInfo({
            tutorName,
            googleSheetUrl,
            rosterName
        });

        this.fetchGoogleSheet();
    };


    displayMessage = () => {
        const { status, message } = this.state;

        if (status === 'success') {
            return <p className="success"> <i className="fa fa-check"></i> Successfully</p>;
        } else if (status === 'error') {
            return <p className="error">
                <Link to={"/error"}><i className="fa fa-info-circle"></i></Link>
                {message}
            </p>
        }
        return null;
    };


    render() {
        const { status } = this.state;

        const isPending = status === 'pending' ? <i className="fa fa-spinner fa-spin"></i> : null;

        return (
            <div className="info">
                <Nav navigate={this.navigate} />
                {this.displayMessage()}
                <Form
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    status={status}
                    {...this.state}>

                    {isPending}
                </Form>
            </div>
        );
    }
}

const Info = connectWithStore(InfoUI);


export default Info;