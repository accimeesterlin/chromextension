import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import { Button } from "@material-ui/core";

import Content from "../common/content/Content";
import AddStudent from './AddStudent';

import { sendNotification, updateStudent } from '../../../actions/actionCreators';


import "./student.scss";

class EditStudentUI extends Component {
  state = {
    studentIndex: '',
    name: '',
    email: '',
    githubUsername: '',
    studentCode: '',
    studentTimeZone: ''
  };

  componentDidMount = () => {
      console.log('Props: ', this.props);
      const { students, match } = this.props;
      const studentIndex = match.params.id
      const currentSudent = students[studentIndex];
      this.setState({
        studentIndex,
          ...currentSudent
      });
  };

  updateStudent = (student) => {
    const studentIndex = this.state.studentIndex;
    this.props.updateStudent({
        ...student,
        studentIndex
    });
  };

  render() {

    console.log('State: ', this.state);
    return (
      <Content {...this.props}>
        <div className="edit-student">
          <h2>I am the Edit Student Component</h2>

          <AddStudent
            submit={this.updateStudent}
            currentStudent={this.state}
            isEditMode={true}
            sendNotification={this.props.sendNotification}
          />
        </div>
      </Content>
    );
  }
}

EditStudentUI.propTypes = {
  students: PropTypes.array,
  addStudent: PropTypes.func,
  sendNotification: PropTypes.func
};




const mapStateToProps = (state) => {
    const students = state.students;

    return {
        students
    };
};


const mapDispatchToProps = (dispatch) => {

    return {

        sendNotification: (notificationType, message) => {
            dispatch(sendNotification(notificationType, message))
        },

        updateStudent: (student) => {
            dispatch(updateStudent(student))
        },
        
    };
};

const EditStudent = connect(mapStateToProps, mapDispatchToProps)(EditStudentUI);

export default EditStudent;
