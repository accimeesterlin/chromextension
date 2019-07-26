import { connect } from 'react-redux';
import TemplateUI from './TemplateUI';
import { addTemplate } from '../../../actions/actionCreators';

const mapStateToProps = (state) => {
    const templates = state.templates;

    return {
        templates
    };
};


const mapDispatchToProps = (dispatch) => {

    return {
        addTemplate: (template) => {
            dispatch(addTemplate(template));
        }
    };
};

const Template = connect(mapStateToProps, mapDispatchToProps)(TemplateUI)

export default Template;