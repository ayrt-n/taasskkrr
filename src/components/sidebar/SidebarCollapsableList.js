import React, { useState } from 'react';
import chevron from '../../assets/icons/chevron-right.svg';

function SidebarCollapsableList({ title, children }) {
  const [collapsed, setCollapsed] = useState(false);
  const collapseList = () => { setCollapsed(!collapsed) }

  return(
    <div
      className={`Sidebar-collapsable-list ${collapsed ? "collapsed" : ""}`}
      data-testid="collapsable-list"
    >
      <div className="SidebarItem" onClick={collapseList} data-testid="collapse-list-div">
        <img
          src={chevron}
          className="SidebarItem-icon"
          alt=""
          style={collapsed ? {} : {transform: "rotate(90deg)"}} />
        <div className="SidebarItem-title">{title}</div>
      </div>
      <div className={"Sidebar-collapsable-items"}>
        {children}
      </div>
    </div>
  );
}

export default SidebarCollapsableList;
