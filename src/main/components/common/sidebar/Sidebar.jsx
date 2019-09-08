import { connect } from 'react-redux';
import SidebarUI from './SidebarUI';


const mapStateToProps = (state, ownProps) => {
    return {
        a: ''
    };
};


const mapDispatchToProps = () => {

    return {
        b: ''
    };
};

const Sidebar = connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarUI)

export default Sidebar;