import { connect } from 'react-redux';
import { loadToken } from '../../../utils/authUtils';
import selectn from 'selectn';

import {
    updateCurrentTemplate,
    updateReceiverDetails,
    updateReceiverMsg,
    requestToSendEmail
} from '../../../actions/actionCreators';
import EmailUI from './EmailUI';
import {
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
    const isTokenAuthorized = selectn('tutor.isTokenAuthorized', state);
    const token = loadToken(isTokenAuthorized) || '';
    
    return {
        templates,
        token,
        tutorEmail,
        currentTemplate,
        receiverEmail,
        receiverSubject,
        receiverMsg
    };
};


const mapDispatchToProps = (dispatch) => {

    return {
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