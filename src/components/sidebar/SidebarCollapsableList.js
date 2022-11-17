import React, { useState } from 'react';
import chevron from '../../assets/icons/chevron-right.svg';
import SidebarItem from './SidebarItem';

function SidebarCollapsableList({ title, items }) {
  const [collapsed, setCollapsed] = useState(false);
  const collapseList = () => { setCollapsed(!collapsed) }

  return(
    <div className={`Sidebar-collapsable-list ${collapsed ? "collapsed" : ""}`}>
      <div className="SidebarItem" onClick={collapseList}>
        <img
          src={chevron}
          className="SidebarItem-icon"
          alt=""
          style={collapsed ? {} : {transform: "rotate(90deg)"}} />
        <div className="SidebarItem-title">{title}</div>
      </div>
      <div className={"Sidebar-collapsable-items"}>
        {items.map((item) => {
          return(
            <SidebarItem
              icon="project.svg"
              title={item.title}
              action={`/projects/${item.id}`}
              subItem={true}
              key={item.id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SidebarCollapsableList;
