import React from 'react';

function Button({ label, fullSize, ...props }) {
  return (
    <div className="control">
      <button
        className={`button ${fullSize ? 'full' : ''}`} 
        {...props}
      >
        {label}
      </button>
    </div>
  );
}

export default Button;
