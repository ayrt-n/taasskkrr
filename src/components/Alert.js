import React from 'react';
import '../styles/Alert.css';

// Alert component, used to present success/warning/danger messages to users
// Type prop used to specify styling of alert ('danger', 'warning', 'success')
// Message used for main title of the alert (e.g., Login Failed!)
// Body used for plain text description of the alert (e.g., 'Account successfully created!')
// Details used for bulleted list of details (e.g., used to display reasons for error)
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
