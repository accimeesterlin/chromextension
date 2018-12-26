import React, { Component } from 'react';
import _ from 'lodash';
import DialogSelect from './DialogSelect';


class DisplayStudent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            students: props.students,
            selectStudent: props.selectStudent,
            open: false,
        }

    }

    render() {

        return (
            <div className="displayStudents">
                {_.isEmpty(this.state.students) ? <p>No students found</p> : this.state.students.map((student, i) => (
                    <div key={i} className='student-list'>
                    <p onClick={() => this.state.selectStudent(student)}> {student.name}</p>
                    <DialogSelect  classCode={student.studentCode}
                                  studentName={student.name}/>
                    </div>

                )
                )}
            </div>
        );
    }
};

export default DisplayStudent;