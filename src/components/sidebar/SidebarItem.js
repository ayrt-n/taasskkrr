import React from 'react';
import { Link } from 'react-router-dom';

function SidebarItem({ icon, title, action, subItem }) {
  const iconSrc = require(`../../assets/icons/${icon}`)

  return (
    <Link to={action}>
      <div className={`SidebarItem ${subItem ? "SubItem" : ""}`}>
        <img src={iconSrc} alt="" className="SidebarItem-icon" />
        <div className="SidebarItem-title">{title}</div>
      </div>
    </Link>
  );
}

export default SidebarItem;
