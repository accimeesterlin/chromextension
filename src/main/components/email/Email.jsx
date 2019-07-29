import { connect } from 'react-redux';

import { loadToken } from '../../../utils/authUtils';
import { loadMessages, loadLabels } from '../../../actions/asyncActionCreators';
import EmailUI from './EmailUI';


const mapStateToProps = (state) => {
    const templates = state.templates;
    const messages = state.gmail.messages;
    const nextPageToken = state.gmail.nextPageToken;
    const labels = state.gmail.labels;
    const resultSizeEstimate = state.gmail.resultSizeEstimate;

    const token = loadToken();

    return {
        templates,
        messages,
        token,
        nextPageToken,
        labels,
        resultSizeEstimate
    };
};


const mapDispatchToProps = (dispatch) => {

    return {
        loadMessages: (token, nextPageToken, labels, query, shouldEmptyMessages) => {
            dispatch(loadMessages(token, nextPageToken, labels, query, shouldEmptyMessages));
        },

        loadLabels: (token) => {
            dispatch(loadLabels(token));
        }
    };
};

const Email = connect(mapStateToProps, mapDispatchToProps)(EmailUI)

export default Email;