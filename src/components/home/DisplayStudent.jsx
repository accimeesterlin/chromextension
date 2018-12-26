import React, { Component } from 'react';
import _ from 'lodash';
import { FileCopy } from '@material-ui/icons';


class DisplayStudent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            students: props.students,
            selectStudent: props.selectStudent,
            open: false,
            something: null
        }

        this.copyToClip = this.copyToClip.bind(this);
    }

    copyToClip = (student) => {
        console.log(student)

        navigator.clipboard.writeText(`
    1.${student.studentCode}
    2.${student.name}
    3. N/A
    4. N/A 
    `).then(() =>

                this.setState({
                    open: true,
                    something: student.name
                })
            , () => alert('fail fail fail'));


    }

    render() {

        return (
            <div className="displayStudents">
                {_.isEmpty(this.state.students) ? <p>No students found</p> : this.state.students.map((student, i) => (
                    <div className='student-list'>
                        <p key={i} onClick={() => this.state.selectStudent(student)}> {student.name}
                        </p>
                        <FileCopy className="fileCopy" onClick={() => { this.copyToClip(student) }} />
                    </div>
                )
                )}
                <FileCopy className="fileCopy" onClick={() => { this.copyToClip() }} />
            </div>
        );
    }
};

export default DisplayStudent;