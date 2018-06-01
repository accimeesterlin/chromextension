import React, { Component } from 'react';
import NavigationButtons from '../../common/NavigationButton';
import './deleteStudent.css';

class DeleteStudent extends Component {

    deleteCurrentStudent = (index) => {
        this.props.deleteStudent(index);
    };

    displayUsers = (users) => {
        if (users.length > 0) {
            return users.map(({ name, username, email }, index) => (
                <div key={index} className='users' onClick={() => this.deleteCurrentStudent(email)}>
                    <div>
                        <p>Name: {name}</p>
                        <p>Email: {email}</p>
                        <p>Username: {username}</p>
                    </div>

                    <button className='btn'>Delete</button>
                </div>
            ));
        } else {
            return <p className='no-more-students'>No more students</p>
        }

    };
    render() {
        const { navigate, students } = this.props;

        return (
            <div className='delete-students'>
                <h2>Delete Student</h2>
                {this.displayUsers(students)}

                <NavigationButtons navigate={navigate} url={'/home'} />
            </div>
        );
    }
};

export default DeleteStudent;