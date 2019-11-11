import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

import Content from "../common/content/Content";
import AddStudent from "./AddStudent";
import DisplayStudents from "./DisplayStudents";

import "./student.scss";

export default class StudentUI extends Component {
  state = {
    name: "",
    status: null,
    message: "Not able to fetch data",
    isAddStudentViewEnabled: false
  };

  handleChange = ({ target }) => {
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value, status: null });
  };

  displayMessage = () => {
    const { status, message } = this.state;

    if (status === "success") {
      return (
        <p className="success">
          {" "}
          <i className="fa fa-check"></i> Successfully
        </p>
      );
    } else if (status === "error") {
      return <p className="error">{message}</p>;
    }
    return null;
  };

  submit = student => {
    this.props.addStudent(student);
  };

  showAddStudent = () => {
    this.setState({ isAddStudentViewEnabled: true });
  };

  showDisplayStudents = () => {
    this.setState({ isAddStudentViewEnabled: false });
  };

  editStudent = (index) => {
    this.props.history.push(`/new/student/${index}`);
  };

  render() {
    // JSX

    let componentToRender;

    if (this.state.isAddStudentViewEnabled) {
      componentToRender = (
        <AddStudent
          addStudent={this.props.addStudent}
          submit={this.submit}
          sendNotification={this.props.sendNotification}
        />
      );
    } else {
      componentToRender = <DisplayStudents
        students={this.props.students}
        editStudent={this.editStudent}
      />;
    }

    return (
      <Content {...this.props}>
        <div className="student">
          <Button
            className="student-add-button"
            variant="outlined"
            onClick={this.showAddStudent}
            color="primary"
          >
            Add Student
          </Button>

          <Button
            className="student-view-button"
            variant="outlined"
            onClick={this.showDisplayStudents}
            color="primary"
          >
            View Students
          </Button>
          { componentToRender }
        </div>
      </Content>
    );
  }
}

StudentUI.propTypes = {
  students: PropTypes.array,
  addStudent: PropTypes.func,
  sendNotification: PropTypes.func
};
