import React from 'react';

function NewSectionButton({ handleClick }) {
  return (
    <button onClick={handleClick} className="New-section-button">
      <p>
        <span>
          Add Section
        </span>
      </p>
    </button>
  );
}

export default NewSectionButton;
