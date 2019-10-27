import React, { Component } from "react";
import PropTypes from "prop-types";
import Content from "../common/content/Content";

import AddStudent from './AddStudent';
import "./student.scss";

export default class StudentUI extends Component {
  state = {
    name: "",
    githubUsername: "",
    email: "",
    studentCode: "",
    studentTimeZone: "",
    status: null,
    message: "Not able to fetch data"
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

  selectTimeZone = target => {
    this.setState({ studentTimeZone: target.value });
  };

  submit = student => {
    this.props.addStudent(student);
  };

  render() {

    // JSX
    return (
      <Content {...this.props}>
        <div className="student">
          <h2>I am the Student Component</h2>
          <AddStudent
            addStudent={this.props.addStudent}
            submit={this.submit}
            sendNotification={this.props.sendNotification}
          />
        </div>
      </Content>
    );
  }
}

StudentUI.propTypes = {
  students: PropTypes.array,
  addStudent: PropTypes.func,
  sendNotification: PropTypes.func,
};
