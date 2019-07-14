import React from 'react';
import { Home, CalendarToday, Add, Delete, Info } from '@material-ui/icons';
import './nav.scss';

const Nav = ({ navigate }) => {

    return(
        <nav className="nav">
            <Home onClick = {() => navigate('/')}/>
            <Add onClick = {() => navigate('/student/add')}/>
            <Delete onClick = {() => navigate('/student/delete')}/>
            <Info onClick = {() => navigate('/tutor')}/>
            <CalendarToday onClick = {() => navigate('/upcoming/session')}/>
        </nav>
    );
};
export default Nav;
