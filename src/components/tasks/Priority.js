import React from 'react';
import '../../styles/Tasks.css'

function Priority({ priorityEnum }) {
  let priority = ''

  if (priorityEnum === 0) {
    priority = 'Low'
  } else if (priorityEnum === 1) {
    priority = 'Medium'
  } else {
    priority = 'High'
  }

  return (
    <div className={`Task-priority ${priority}`}>
      <svg style={{width:"1rem", height: "1rem"}} viewBox="0 0 24 24">
        <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
      </svg>
      <p>{priority}</p>
    </div>
  );
}

export default Priority;
