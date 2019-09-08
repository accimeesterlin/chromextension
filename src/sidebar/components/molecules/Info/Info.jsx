import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
import axios from 'axios';
import * as tutorUtils from '../../../utils/tutorUtils';
import { connect } from 'react-redux';
import { saveTutorName, saveTutorGoogleSheetUrl, saveTutorRoster, addStudent } from '../../../../actions/actionCreators';



import './info.scss';


export class InfoUI extends Component {
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

    componentDidMount = () => {
        if (window.ga) {
            window.ga('send', {
                hitType: 'pageview',
                page: '/tutor',
                title: 'Tutor Info'
            });
        }
    }


    startCounter = () => {
        this.counter++;

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
                if (email.includes('@')) {
                    this.props.addStudent({
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

    handleChange = ({ target }) => {
        const name = target.name;
        const value = target.value;

        this.setState({ [name]: value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        clearInterval(this.timerID);

        const { tutorName, googleSheetUrl, rosterName } = this.state;
        if (tutorName) {
            this.props.saveTutorName(tutorName);
        }

        if (googleSheetUrl) {
            this.props.saveTutorGoogleSheetUrl(googleSheetUrl);
        }

        if (rosterName) {
            this.props.saveTutorRoster(rosterName);
        }
        this.fetchGoogleSheet();
    };


    displayMessage = () => {
        const { status, message } = this.state;

        if (status === 'success') {
            return <p className="success"> <i className="fa fa-check"></i> Successfully</p>;
        } else if (status === 'error') {
            return <p className="error">
                <Link to={"/error/" + message}><i className="fa fa-info-circle"></i></Link>
                {message}
            </p>
        }
        return null;
    };


    render() {
        const { status } = this.state;

        const isPending = status === 'pending' ? <i className="fa fa-spinner fa-spin"></i> : null;

        return (
            <div className="">
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

const mapStateToProps = (state) => {
    const students = state.students;
    const { tutorName, googleSheetUrl, rosterName } = state.tutor;
    return {
        students,
        tutorName,
        googleSheetUrl,
        rosterName
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveTutorName: (name) => dispatch(saveTutorName(name)),
        saveTutorGoogleSheetUrl: (url) => dispatch(saveTutorGoogleSheetUrl(url)),
        saveTutorRoster: (roster) => dispatch(saveTutorRoster(roster)),
        addStudent: (student) => dispatch(addStudent(student)),
    };
};


const Info = connect(
    mapStateToProps,
    mapDispatchToProps
)(InfoUI);


export default Info;