import React from 'react';

import './header.scss';

const Header = () => (
    <div className="header">
        <h1>Tutor Pro</h1>
        <nav>
            <ul>
                <li>Home</li>
                <li>Student</li>
                <li>Tutor</li>
                <li>Profile</li>
            </ul>
        </nav>
    </div>
);

export default Header;