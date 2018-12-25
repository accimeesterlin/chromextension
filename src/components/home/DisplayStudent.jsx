import React from 'react';
import _ from 'lodash';
import { FileCopy } from '@material-ui/icons';


const DisplayStudent = ({ students, selectStudent }) => {
    return(
        <div className="displayStudents">
            { _.isEmpty(students) ? <p>No students found</p> : students.map((student, i) => (
                <p key = {i} onClick = {() => selectStudent(student)}> {student.name} 
                <FileCopy className="fileCopy" onClick={() => {}} />
                </p>
            ))}
        </div>
    );
};

export default DisplayStudent;