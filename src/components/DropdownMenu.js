import React, { useState } from 'react';

function DropdownMenu({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button className="Dropdown-button" onClick={() => setIsOpen(!isOpen)}>
        <svg style={{width:'24px', height:'24px'}} viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
        </svg>
      </button>
      {isOpen ?
        <div className="Dropdown-container" onClick={() => setIsOpen(false)}>
          <ul className="Dropdown-menu">
            {children}
          </ul>
          <div className="Dropdown-overlay" onClick={() => setIsOpen(false)}/>
        </div> :
        null
      }
    </div>
  );
}

export default DropdownMenu;
