import React from 'react';
import '../styles/Alert.css';

function Alert({ type, message, body, details }) {
  return(
    <div className={`Alert ${type}`} data-testid="alert">
      <div className="Alert-message" data-testid="alert-message">{message}</div>
      {body ? <div data-testid="alert-body">{body}</div> : null}
      {details &&
        <ul className="Alert-details">
          {details.map((detail) => {
            return(
              <li key={detail} data-testid="alert-detail">
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
