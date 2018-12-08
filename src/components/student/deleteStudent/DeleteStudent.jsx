import React, { Component } from 'react';
import Nav from '../../../common/nav/Nav';
import { connectWithStore } from '../../../store/index';
import List from './List';
import './deleteStudent.scss';

class DeleteStudentUI extends Component {
    constructor(props) {
        super(props);

        this.state = {
            students: props.students
        };
    }

    navigate = (link) => {
        console.log('Link: ', link);
        return this.props.history.push(link);
    }

    deleteStudent = (student) => {
        console.log('Student: ', student);

        this.props.deleteStudent(student);
    };


    render() {

        const students = [
            { name: 'Peter', email: 'John' },
            { name: 'Sadrack', email: 'email' },
            { name: 'Lucson', email: 'you' },
            { name: 'Patrick', email: 'moving' }
        ];
        return(
            <div className="deleteStudent">
                <Nav navigate = {this.navigate}/>
                <div className="students">
                    <List students = {this.props.students} deleteStudent={this.deleteStudent}/>
                </div>
            </div>
        );
    }
}


const DeleteStudent = connectWithStore(DeleteStudentUI);

export default DeleteStudent;