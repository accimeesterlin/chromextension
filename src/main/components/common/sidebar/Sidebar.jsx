import { connect } from 'react-redux';
import { setCurrent } from '../../../../actions/actionCreators';

import SidebarUI from './SidebarUI';


const mapStateToProps = (state) => {
    const currentRoute = (state.route && state.route.currentRoute) || 'No route found!!';

    return {
        currentRoute
    };
};


const mapDispatchToProps = (dispatch) => {

    return {
        setCurrent: (currentRoute) => dispatch(setCurrent(currentRoute))
    };
};

const Sidebar = connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarUI)

export default Sidebar;