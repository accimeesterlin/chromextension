import React, { Component } from 'react';
import NavigationButtons from '../../common/NavigationButton';
import './deleteStudent.css';

class DeleteStudent extends Component {

    deleteCurrentStudent = (index) => {
        this.props.deleteStudent(index);
    };

    displayUsers = (users) => {
        if (users.length > 0) {
            return users.map(({ name, code, email }, index) => (
                <div key={index} className='users' >
                    <div>
                        <p>Name: {name}</p>
                        <p>Email: {email}</p>
                        <p>Code: {code}</p>
                    </div>

                    <button onClick={() => this.deleteCurrentStudent(email)}>Delete</button>
                </div>
            ));
        } else {
            return <p className='no-more-students'>No more students</p>
        }

    };

    deleteStudentTitle = (students) => {

        if (students.length > 0) {
            return (<p className='title'>Delete Student</p>);
        } else {
            return '';
        }
    };
    render() {
        const { navigate, students } = this.props;

        return (
            <div className='delete-students'>
                <button className='go-back' onClick={() => navigate({ url: '/home' })}>Go back</button>
                {this.deleteStudentTitle(students)}
                {this.displayUsers(students)}
            </div>
        );
    }
};

export default DeleteStudent;