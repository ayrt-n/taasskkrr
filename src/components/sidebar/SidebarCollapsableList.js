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
        {items.map((project) => {
          return(
            <SidebarItem
              icon="project.svg"
              title={project.title}
              action={`/projects/${project.id}`}
              subItem={true}
              key={project.id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SidebarCollapsableList;
