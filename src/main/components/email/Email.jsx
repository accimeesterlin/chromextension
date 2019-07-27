import { connect } from 'react-redux';

import { loadToken } from '../../../utils/authUtils';
import { loadMessages } from '../../../actions/asyncActionCreators';
import EmailUI from './EmailUI';


const mapStateToProps = (state) => {
    const templates = state.templates;
    const messages = state.messages;
    const token = loadToken();

    return {
        templates,
        messages,
        token
    };
};


const mapDispatchToProps = (dispatch) => {

    return {
        loadMessages: (limit, token) => {
            dispatch(loadMessages(limit, token))
        }
    };
};

const Email = connect(mapStateToProps, mapDispatchToProps)(EmailUI)

export default Email;