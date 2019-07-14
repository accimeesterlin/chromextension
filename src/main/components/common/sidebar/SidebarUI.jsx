import React, { Component } from 'react';

import './sidebar.scss';

export default class SidebarUI extends Component {


    render() {

        // JSX
        return(
            <div className="sidebar">
                <div className="sidebar-box">
                    <p>Email</p>
                </div>
                <div className="sidebar-box">
                    <p>Student</p>
                </div>
                <div className="sidebar-box">
                    <p>Tutor</p>
                </div>

                <div className="sidebar-box">
                    <p>Calendar</p>
                </div>

                <div className="sidebar-box">
                    <p>Email Templates</p>
                </div>
            </div>
        );
    }
}
