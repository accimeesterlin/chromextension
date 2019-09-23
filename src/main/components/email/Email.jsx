import { connect } from 'react-redux';
import { loadToken } from '../../../utils/authUtils';
import { loadMessages, loadLabels, getTutorGmailProfile } from '../../../actions/asyncActionCreators';
import EmailUI from './EmailUI';
import { getMessages, getLabels, getResultSizeEstimate, getNextPageToken } from '../../selectors/emailSelectors';
import { getTutorEmailAddress } from '../../selectors/tutorSelectors';
import { getTemplates } from '../../selectors/templateSelectors';


const mapStateToProps = (state) => {
    const messages = getMessages(state);
    const labels = getLabels(state);
    const tutorEmail = getTutorEmailAddress(state);
    
    const templates = getTemplates(state);
    const resultSizeEstimate = getResultSizeEstimate(state);
    
    const nextPageToken = getNextPageToken(state);
    const token = loadToken() || '';

    return {
        templates,
        messages,
        token,
        nextPageToken,
        labels,
        resultSizeEstimate,
        tutorEmail
    };
};


const mapDispatchToProps = (dispatch) => {

    return {
        // TODO
        // Refactor this function
        loadMessages: (token, nextPageToken, labels, query, shouldEmptyMessages) => {
            dispatch(loadMessages(token, nextPageToken, labels, query, shouldEmptyMessages));
        },

        loadLabels: (token) => {
            dispatch(loadLabels(token));
        },

        getTutorGmailProfile: (token) => {
            dispatch(getTutorGmailProfile(token));
        },
    };
};

const Email = connect(mapStateToProps, mapDispatchToProps)(EmailUI)

export default Email;