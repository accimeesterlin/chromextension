import React from "react";
import PropTypes from "prop-types";

import Icon from "@material-ui/core/Icon";

const MenuItem = props => {
  const { name, icon, goTo, active } = props;

  const className = 'sidebar-icon ' + active;

  return <li onClick={goTo}>
    <p>
      <span>{name}</span>
      <Icon className={className}>{icon}</Icon>
    </p>
  </li>
};


MenuItem.propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    goTo: PropTypes.func.isRequired,
    active: PropTypes.string.isRequired
};

export default MenuItem;
