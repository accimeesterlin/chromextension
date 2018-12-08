import React from 'react';
import _ from 'lodash';

const DisplayStudent = ({ students, selectStudent }) => {
    return(
        <div className="displayStudents">
            { _.isEmpty(students) ? <p>No students found</p> : students.map((student, i) => (
                <p key = {i} onClick = {() => selectStudent(student)}> {student.name} </p>
            ))}
        </div>
    );
};

export default DisplayStudent;