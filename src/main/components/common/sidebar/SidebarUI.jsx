// Importing libraries
import React from 'react';
import PropTypes from 'prop-types';

// Importing files
import MenuItems from "./MenuItem";
import SidebarProfile from './SidebarProfile';

import "./sidebar.scss";


const SidebarUI = ({ history, currentRoute, setCurrent }) => {

  const dashboardMenus = [
    { icon: 'dashboard', name: 'Dashboard', route: '/dashboard' },
    { icon: 'email', name: 'Email', route: '/email' },
    { icon: 'school', name: 'Student', route: '/student' },
    { icon: 'people', name: 'Tutor', route: '/tutor' },
    { icon: 'dynamic_feed', name: 'Email Templates', route: '/template' },
    { icon: 'perm_identity', name: 'Profile', route: '/profile' }
  ];

  const goTo = (route, idx) => {
    const url = '/new' + route;
    
    setCurrent(route);

    // Verify push exist on the history object
    if (history && history.push) {
      history.push(url);
    }
  };
  
  // JSX
  return <div className="sidebar">
      <SidebarProfile />

      <ul className="sidebar-menu">
        {dashboardMenus.map(({ name, icon, route }, idx) => <MenuItems
            goTo={() => goTo(route, idx)}
            key={idx}
            name={name}
            active={ route === currentRoute ? 'sidebar-active' : ''}
            icon={icon} />
        )}
      </ul>
  </div>;
};

SidebarUI.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default SidebarUI;
