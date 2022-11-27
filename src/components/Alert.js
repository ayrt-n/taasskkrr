import React from 'react';
import '../styles/Alert.css';

function Alert({ type, message, details }) {
  return(
    <div className={`Alert ${type}`}>
      <div className="Alert-message">{message}</div>
      {details &&
        <ul className="Alert-details">
          {details.map((detail) => {
            return(
              <li key={detail}>
                {detail}
              </li>
            );
          })}
        </ul>
      }
    </div>
  );
}

export default Alert;
