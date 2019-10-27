import React, { useState } from "react";
import propTypes from "prop-types";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button
} from "@material-ui/core";

const AddStudent = props => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [studentTimeZone, setStudenTimeZone] = useState("");

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
    setStudenTimeZone(target.value);
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

    // Reset values
    setName('');
    setEmail('');
    setGithubUsername('');
    setStudentCode('');
    setStudenTimeZone('');
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
          autoWidth={true}
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
        Add Student
      </Button>
    </form>
  );
};

AddStudent.propTypes = {
  subject: propTypes.string,
  receiver: propTypes.string,
  updateReceiverDetails: propTypes.func
};

export default AddStudent;
