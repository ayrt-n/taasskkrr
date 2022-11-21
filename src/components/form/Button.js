import React from 'react';

function Button({ label, primary, danger, fullSize, ...props }) {
  return (
    <div className="control">
      <button
        className={`button ${primary ? 'is-primary' : ''} ${fullSize ? 'full' : ''} ${danger ? 'is-danger' : ''}`} 
        {...props}
      >
        {label}
      </button>
    </div>
  );
}

export default Button;
