import React from 'react';
import '../styles/Alert.css';

function Alert({ type, message, body, details }) {
  return(
    <div className={`Alert ${type}`}>
      <div className="Alert-message">{message}</div>
      {body ? <div>{body}</div> : null}
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
