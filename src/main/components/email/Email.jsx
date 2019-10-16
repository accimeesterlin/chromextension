import { connect } from 'react-redux';
import { loadToken } from '../../../utils/authUtils';
import { loadMessages, loadLabels, getTutorGmailProfile } from '../../../actions/asyncActionCreators';
import { updateCurrentTemplate, updateReceiverDetails, updateReceiverMsg } from '../../../actions/actionCreators';
import EmailUI from './EmailUI';
import {
    getMessages,
    getLabels,
    getResultSizeEstimate,
    getNextPageToken,
    getReceiverEmail,
    getReceiverSubject,
    getReceiverMsg,
} from '../../selectors/emailSelectors';
import { getTutorEmailAddress } from '../../selectors/tutorSelectors';
import { getTemplates, getCurrentTemplate } from '../../selectors/templateSelectors';


const mapStateToProps = (state) => {
    const messages = getMessages(state);
    const labels = getLabels(state);
    const tutorEmail = getTutorEmailAddress(state);
    
    const resultSizeEstimate = getResultSizeEstimate(state);
    const currentTemplate = getCurrentTemplate(state);
    const templates = getTemplates(state);

    const receiverEmail = getReceiverEmail(state);
    const receiverSubject = getReceiverSubject(state) || currentTemplate.templateSubject;
    const receiverMsg = getReceiverMsg(state);
    
    
    const nextPageToken = getNextPageToken(state);
    const token = loadToken() || '';

    return {
        templates,
        messages,
        token,
        nextPageToken,
        labels,
        resultSizeEstimate,
        tutorEmail,
        currentTemplate,
        receiverEmail,
        receiverSubject,
        receiverMsg
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

        updateTemplate: (currentTemplate) => {
            dispatch(updateCurrentTemplate(currentTemplate));
        },

        updateReceiverDetails: info => {
            dispatch(updateReceiverDetails(info));
        },

        updateReceiverMsg: msg => {
            dispatch(updateReceiverMsg(msg));
        }
    };
};

const Email = connect(mapStateToProps, mapDispatchToProps)(EmailUI)

export default Email;