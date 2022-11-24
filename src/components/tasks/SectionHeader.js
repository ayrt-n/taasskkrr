import React from 'react';
import DropdownMenu from '../DropdownMenu';
import '../../styles/DropdownMenu.css'


function SectionHeader({ title, headingLevel, name }) {
  const Title = headingLevel;

  return (
    <div className="Section-header">
      <Title>{title}</Title>
      <DropdownMenu>
        <li className="Dropdown-item"><button>Edit {name}</button></li>
        <li className="Dropdown-item"><button>Delete {name}</button></li>
      </DropdownMenu>
    </div>
  );
}

export default SectionHeader;
