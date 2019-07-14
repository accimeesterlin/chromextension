import React, { Component } from 'react';
import Form from './Form';
import { connect } from 'react-redux';
import * as tutorUtils from '../../../utils/tutorUtils';
import { addStudent } from '../../../../actions/actionCreators';

import './addStudent.scss';


export class AddStudentUI extends Component {
    state = {
        name: '',
        githubUsername: '',
        email: '',
        studentCode: '',
        status: null,
        message: 'Not able to fetch data'
    };

    componentDidMount = () => {
        if (window.ga) {
            window.ga('send', {
                hitType: 'pageview',
                page: '/student/add',
                title: 'Add Student'
            });
        }
    }

    counter = 0;

    startCounter = () => {
        this.counter++;
        if (this.counter >= 5) {
            clearInterval(this.timerID);
            this.counter = 0;
            this.setState({ status: null });
        }
    };


    handleChange = ({ target }) => {
        const name = target.name;
        const value = target.value;
        this.setState({ [name]: value, status: null });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { name, githubUsername, email, studentCode, } = this.state;
        const student = {
            name,
            githubUsername,
            email,
            studentCode
        };
        const { isError, message } = tutorUtils.validateInputs(student);


        if (isError) {
            this.setState({ status: 'error', message });
            return;
        }

        this.props.addStudent(student);

        // Empty input values
        this.setState({
            name: '',
            githubUsername: '',
            email: '',
            studentCode: '',
            status: 'success'
        });

        // this.counter = 0;
        this.timerID = setInterval(this.startCounter, 1000);
    };

    displayMessage = () => {
        const { status, message } = this.state;

        if (status === 'success') {
            return <p className="success"> <i className="fa fa-check"></i> Successfully</p>;
        } else if (status === 'error') {
            return <p className="error">
                {message}
            </p>
        }
        return null;
    };


    render() {
        return (
            <div >
                {this.displayMessage()}
                <Form
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    {...this.state}
                />
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    const students = state.students;

    return {
        students
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addStudent: (student) => dispatch(addStudent(student))
    };
};


const AddStudent = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddStudentUI);
export default AddStudent;