import React, { Component } from 'react';
import Nav from '../../../common/nav/Nav';
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
            message: ''
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

    handleError = () => {
        this.setState({ status: 'error' });
    };

    handleSuccessfulResult = ({ data }) => {
        // Start timer to remove status message
        this.counter = 0;
        this.timerID = setInterval(this.startCounter, 1000);

        // Filter results and add students to the store
        const results = data && data.values ? data.values : [];
        this.addStudentToStore(results);

        // Set status to success
        this.setState({ status: 'success' });
    };

    addStudentToStore = (data) => {
        for (let i = 0; i < data.length; i++) {
            try {
                const email = data[i][3];
                if (email.includes('@')) {
                    this.props.addStudents({
                        name: data[i][2],
                        githubUsername: data[i][4],
                        email,
                        studentCode: data[i][0]
                    });
                }
            } catch (error) {
                console.log('Error is displaying');
                // TODO
                // Handle multiple cases of failures
            }
        }
    };


    navigate = (link) => {
        console.log('Link: ', link);
        return this.props.history.push(link);
    }

    handleChange = ({ target }) => {
        const name = target.name;
        const value = target.value;

        this.setState({ [name]: value});
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


    render() {
        const { status } = this.state;

        //TODO: refactor this code
        const isPending = status === 'pending' ? <i className="fa fa-spinner fa-spin"></i> : null;
        const isSuccess = status === 'success' ? <p className="success"> <i className="fa fa-check"></i> successfully</p> : null;
        const isError = status === 'error' ? <p className="error"><i class="fas fa-times"></i> view more</p> : null;


        
        console.log('State: ', this.state);
        return (
            <div className="info">
                <Nav navigate={this.navigate} />
                {isSuccess}

                <Form
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    {...this.state}>

                    {isPending}
                </Form>
            </div>
        );
    }
}

const Info = connectWithStore(InfoUI);


export default Info;