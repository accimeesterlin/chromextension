import React from "react";
import propTypes from "prop-types";

const DisplayStudents = (props) => {

  if (props.students.length === 0) return <p>No students available</p>;

  return (
    <div className="display-students">
      {props.students.map((student) => (
        <div className="student-profile">
          <p>{student.name}</p>
          <p>{student.email}</p>
          <p>{student.githubUsername}</p>
          <p>{student.studentCode}</p>
          <p>{student.studentTimeZone}</p>
        </div>
      ))}
    </div>
  );
};

DisplayStudents.propTypes = {
  students: propTypes.array,
};

export default DisplayStudents;
