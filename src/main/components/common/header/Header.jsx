import React from 'react';
import { Link } from 'react-router-dom';

import './header.scss';

const Header = () => (
    <div className="header">
        <h1>Tutor Pro</h1>
        <nav>
            <ul>
                <li><Link to="/new/home">Home</Link></li>
                <li><Link to="/new/student">Student</Link></li>
                <li><Link to="/new/tutor">Tutor</Link></li>
                <li><Link to="/new/profile">Profile</Link></li>
            </ul>
        </nav>
    </div>
);

export default Header;