import React from 'react';

function Button({ label, buttonStyles, ...props }) {
  return (
    <div className="control">
      <button
        className={`button ${buttonStyles}`} 
        {...props}
      >
        {label}
      </button>
    </div>
  );
}

export default Button;
