// Importing libraries
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Importing files
import MenuItems from "./MenuItem";
import SidebarProfile from './SidebarProfile';

import "./sidebar.scss";


const SidebarUI = (props) => {
  const [index, setIndex] = useState(0);

  const items = [
    { icon: 'star', name: 'Email', route: '/email' },
    { icon: 'star', name: 'Student', route: '/student' },
    { icon: 'star', name: 'Tutor', route: '/tutor' },
    { icon: 'star', name: 'Email Templates', route: '/template' },
    { icon: 'star', name: 'Profile', route: '/profile' }
  ];

  const goTo = (route, idx) => {
    const url = '/new' + route;
    const { history } = props;
    
    setIndex(idx);

    // Verify push exist on the history object
    if (history && history.push) {
      history.push(url);
    }
  };
  
  // JSX
  return <div className="sidebar">
      <SidebarProfile />

      <ul className="sidebar-menu">
        {items.map(({ name, icon, route }, idx) => <MenuItems
            goTo={() => goTo(route, idx)}
            key={idx}
            name={name}
            active={ idx === index ? 'sidebar-active' : ''}
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
