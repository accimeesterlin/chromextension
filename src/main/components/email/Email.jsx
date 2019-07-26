import { connect } from 'react-redux';
import EmailUI from './EmailUI';


const mapStateToProps = (state) => {
    const templates = state.templates;
    return {
        templates
    };
};


const mapDispatchToProps = () => {

    return {

    };
};

const Email = connect(mapStateToProps, mapDispatchToProps)(EmailUI)

export default Email;