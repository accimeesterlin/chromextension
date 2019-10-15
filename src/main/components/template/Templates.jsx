import { connect } from 'react-redux';
import TemplateUI from './TemplateUI';
import { addTemplate } from '../../../actions/actionCreators';
import { getTemplates } from '../../selectors/templateSelectors';



const mapStateToProps = (state) => {
    const templates = getTemplates(state);

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