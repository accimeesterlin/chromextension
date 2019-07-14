import React, { Component } from 'react';


export default class StudentUI extends Component {
    state = {
        name: '',
        githubUsername: '',
        email: '',
        studentCode: '',
        status: null,
        message: 'Not able to fetch data'
    };

    handleChange = ({ target }) => {
        const name = target.name;
        const value = target.value;
        this.setState({ [name]: value, status: null });
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

        // JSX
        return(
            <div>
                <h2>I am the Student Component</h2>
            </div>
        );
    }
}
