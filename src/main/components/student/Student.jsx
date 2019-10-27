import { connect } from 'react-redux';
import StudentUI from './StudentUI';
import { addStudent, sendNotification } from '../../../actions/actionCreators';



const mapStateToProps = (state) => {
    const students = state.students;

    return {
        students
    };
};


const mapDispatchToProps = (dispatch) => {

    return {
        addStudent: (student) => {
            dispatch(addStudent(student))
        },

        sendNotification: (notificationType, message) => {
            dispatch(sendNotification(notificationType, message))
        }
    };
};

const Student = connect(mapStateToProps, mapDispatchToProps)(StudentUI)

export default Student;