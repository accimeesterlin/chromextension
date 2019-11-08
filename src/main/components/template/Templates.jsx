import { connect } from 'react-redux';
import selectn from 'selectn';
import TemplateUI from './TemplateUI';
import {
    addTemplate,
    updateTemplateInput,
    updateTemplateEditorInput,
    resetTemplateInputs,
    deleteTemplate
} from '../../../actions/actionCreators';



const mapStateToProps = (state) => {
    const templates = selectn('templates.listTemplates', state);
    const templateInputs = selectn('templates.templateInputs', state);

    return {
        templates,
        templateInputs
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

        updateTemplateInput: (userInput) => {
            dispatch(updateTemplateInput(userInput));
        },

        updateTemplateEditorInput: (editor) => {
            dispatch(updateTemplateEditorInput(editor));
        },

        resetTemplateInputs: () => {
            dispatch(resetTemplateInputs());
        }
    };
};

const Template = connect(mapStateToProps, mapDispatchToProps)(TemplateUI)

export default Template;