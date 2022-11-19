import React from 'react';

function Button({ label, primary, fullSize, ...props }) {
  return (
    <div className="control">
      <button
        className={`button ${primary ? 'is-primary' : ''} ${fullSize ? 'full' : ''}`} 
        {...props}
      >
        {label}
      </button>
    </div>
  );
}

export default Button;
