import { connect } from 'react-redux';
import TutorInfoUI from './TutorInfoUI';
import * as selectors from '../../selectors/tutorSelector';

import {
    saveTutorInfo,
    fetchGoogleSheetStudent,
    saveGoogleSheetStudents,
    loadTutorInfo,
    getValue,
    handleError,
    navigate
} from '../../actions';


const mapDispatchToProps = (dispatch) => {
    return {
        saveTutorInfo: (data) => dispatch(saveTutorInfo(data)),
        loadTutorInfo: (tutor) => dispatch(loadTutorInfo(tutor)),
        saveGoogleSheetStudents: (students) => dispatch(saveGoogleSheetStudents(students)),
        fetchGoogleSheetStudent: (sheet_id, tab) => dispatch(fetchGoogleSheetStudent(sheet_id, tab)),
        getValue: (data) => dispatch(getValue(data)),
        handleError: (error) => dispatch(handleError(error)),
        navigate: (data) => dispatch(navigate(data)),

    };
};

const mapStateToProps = (state) => {
    const error = state.error;
    const errorMessage = state.errorMessage;
    const tutor_name = state.tutor_name;
    const google_sheet_url = state.google_sheet_url;
    const roster_name = state.roster_name;
    const isRosterRejected = selectors.isRosterRejected(state);
    const isRosterSuccess = selectors.isRosterSuccess(state);
    const isRosterPending = selectors.isRosterPending(state);
    const isRosterIdle = selectors.isRosterIdle(state);


    return {
        error,
        errorMessage,
        tutor_name,
        google_sheet_url,
        roster_name,
        isRosterRejected,
        isRosterSuccess,
        isRosterPending,
        isRosterIdle
    };
};

const TutorInfo = connect(
    mapStateToProps,
    mapDispatchToProps
)(TutorInfoUI);
export default TutorInfo;


