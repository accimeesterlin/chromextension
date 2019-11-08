import { connect } from 'react-redux';
import selectn from 'selectn';
import TemplateUI from './TemplateUI';
import {
    addTemplate,
    deleteTemplate
} from '../../../actions/actionCreators';



const mapStateToProps = (state) => {
    const templates = selectn('templates.listTemplates', state);

    return {
        templates
    };
};


const mapDispatchToProps = (dispatch) => {

    return {
        addTemplate: (template) => {
            dispatch(addTemplate(template));
        },

        deleteTemplate: (index) => {
            dispatch(deleteTemplate(index));
        },
    };
};

const Template = connect(mapStateToProps, mapDispatchToProps)(TemplateUI)

export default Template;