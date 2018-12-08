import React from 'react';
import { Home, CalendarToday, Add, Delete, Info } from '@material-ui/icons';
import './nav.scss';

const Nav = () => {

    return(
        <nav className="nav">
            <Home />
            <Add />
            <Delete />
            <Info />
            <CalendarToday />
        </nav>
    );
};
export default Nav;

