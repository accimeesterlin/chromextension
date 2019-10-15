import { connect } from 'react-redux';

import { loadToken } from '../../../utils/authUtils';
import { loadMessages, loadLabels, getTutorGmailProfile } from '../../../actions/asyncActionCreators';
import EmailUI from './EmailUI';


const mapStateToProps = (state) => {
    // TODO
    // Refactor these below as selectors
    const messages = (state.gmail && state.gmail.messages);
    const labels = (state.gmail && state.gmail.labels) || [];
    const tutorEmail = (state.tutor && state.tutor.emailAddress);
    
    const templates = (state && state.templates) || [];
    const resultSizeEstimate = (state.gmail && state.gmail.resultSizeEstimate);
    
    const nextPageToken = (state.gmail && state.gmail.nextPageToken) || '';
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