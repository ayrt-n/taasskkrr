import React from 'react';

function SidebarItem({ icon, title, action, subItem }) {
  const iconSrc = require(`../../assets/icons/${icon}`)

  return (
    <div className={`SidebarItem ${subItem ? "SubItem" : ""}`}>
      <img src={iconSrc} alt="" className="SidebarItem-icon" />
      <div className="SidebarItem-title">{title}</div>
    </div>
  );
}

export default SidebarItem;
