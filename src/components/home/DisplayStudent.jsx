import React from 'react';


const DisplayStudent = ({ students, selectStudent }) => {
    return(
        <div className="displayStudents">
            { students.map((student, i) => (
                <p key = {i} onClick = {() => selectStudent(student)}> {student.name} </p>
            ))}
        </div>
    );
};

export default DisplayStudent;