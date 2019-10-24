import { connect } from 'react-redux';
import { loadToken } from '../../../utils/authUtils';
import { getTutorGmailProfile } from '../../../actions/asyncActionCreators';
import {
    updateCurrentTemplate,
    updateReceiverDetails,
    updateReceiverMsg,
    requestToSendEmail
} from '../../../actions/actionCreators';
import EmailUI from './EmailUI';
import {
    getNextPageToken,
    getReceiverEmail,
    getReceiverSubject,
    getReceiverMsg,
} from '../../selectors/emailSelectors';
import { getTutorEmailAddress } from '../../selectors/tutorSelectors';
import { getTemplates, getCurrentTemplate } from '../../selectors/templateSelectors';


const mapStateToProps = (state) => {
    const tutorEmail = getTutorEmailAddress(state);
    
    const currentTemplate = getCurrentTemplate(state);
    const templates = getTemplates(state);

    const receiverEmail = getReceiverEmail(state);
    const receiverSubject = getReceiverSubject(state) || currentTemplate.templateSubject;
    const receiverMsg = getReceiverMsg(state);
    
    
    const nextPageToken = getNextPageToken(state);
    const token = loadToken() || '';

    return {
        templates,
        token,
        nextPageToken,
        tutorEmail,
        currentTemplate,
        receiverEmail,
        receiverSubject,
        receiverMsg
    };
};


const mapDispatchToProps = (dispatch) => {

    return {
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
        },
        requestToSendEmail: () => {
            dispatch(requestToSendEmail());
        }
    };
};

const Email = connect(mapStateToProps, mapDispatchToProps)(EmailUI)

export default Email;