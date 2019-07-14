import React, { Component } from 'react';
import { removeStudent } from '../../../../actions/actionCreators';
import { connect } from 'react-redux';
import List from './List';
import './deleteStudent.scss';

export class DeleteStudentUI extends Component {
    constructor(props) {
        super(props);

        this.state = {
            students: props.students
        };
    }

    componentDidMount = () => {
        if (window.ga) {
            window.ga('send', {
                hitType: 'pageview',
                page: '/student/delete',
                title: 'Delete Student'
            });
        }
    }

    deleteStudentByEmail = (student) => {
        const studentEmail = student.email;
        this.props.removeStudent(studentEmail);
    };


    render() {
        return(
            <div>
                <div className='students'>
                    <List students = {this.props.students} deleteStudent={this.deleteStudentByEmail}/>
                </div>
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
        removeStudent: (studentEmail) => dispatch(removeStudent(studentEmail))
    };
};


const DeleteStudent = connect(
    mapStateToProps,
    mapDispatchToProps
)(DeleteStudentUI);
export default DeleteStudent;