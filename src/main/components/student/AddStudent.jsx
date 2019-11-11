import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button
} from "@material-ui/core";

const AddStudent = props => {
  const isEditMode = props.isEditMode;
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [studentTimeZone, setStudentTimeZone] = useState("");
  
  if (isEditMode) {
    const student = props.currentStudent;
    useEffect(() => {
      setName(student.name);
      setEmail(student.email);
      setGithubUsername(student.githubUsername);
      setStudentCode(student.studentCode);
      setStudentTimeZone(student.studentTimeZone);
    }, [props.currentStudent]);
  }

  const listTimeZone = [
    "Alaska",
    "Central",
    "Eastern",
    "Hawaii",
    "Mountain",
    "Pacific",
    "Samoa"
  ];

  const selectTimeZone = target => {
    setStudentTimeZone(target.value);
  };

  const submitStudent = event => {
    event.preventDefault();
    const student = {
      name,
      email,
      githubUsername,
      studentCode,
      studentTimeZone
    };
    props.submit(student);
    props.sendNotification('success', 'student added');

    resetUserInputs();
  };


  const resetUserInputs = () => {
    // Reset values
    setName('');
    setEmail('');
    setGithubUsername('');
    setStudentCode('');
    setStudentTimeZone('');
  };

  return (
    <form onSubmit={submitStudent}>
      <TextField
        value={name}
        label="Name"
        fullWidth={true}
        name="name"
        onChange={({ target }) => setName(target.value)}
      />
      <TextField
        value={email}
        label="Email"
        fullWidth={true}
        name="email"
        onChange={({ target }) => setEmail(target.value)}
      />

      <TextField
        value={studentCode}
        label="Student Code"
        fullWidth={true}
        name="studentCode"
        onChange={({ target }) => setStudentCode(target.value)}
      />

      <div className="student-selection">
        <InputLabel htmlFor="student-timezone">Student Timezone</InputLabel>
        <Select
          value={studentTimeZone}
          onChange={e => selectTimeZone(e.target)}
          autoWidth
          name="studentTimeZone"
          className="student-timezone"
          inputProps={{
            name: "studentTimeZone",
            id: "studentTimeZone"
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>

          {listTimeZone.map((timeZone, key) => (
            <MenuItem key={key} value={timeZone}>
              {timeZone}
            </MenuItem>
          ))}
        </Select>
      </div>

      <TextField
        value={githubUsername}
        label="Github Username"
        fullWidth={true}
        name="githubUsername"
        onChange={({ target }) => setGithubUsername(target.value)}
      />

      <Button
        className="student-button"
        variant="contained"
        onClick={submitStudent}
        color="primary"
      >
        { isEditMode ? 'Update student' : 'Add student' }
      </Button>
    </form>
  );
};

AddStudent.propTypes = {
  submit: propTypes.func,
  sendNotification: propTypes.func,
  currentStudent: propTypes.object,
};

export default AddStudent;
