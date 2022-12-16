import React from 'react';
import eventBus from '../common/EventBus';
import { toggleTaskComplete } from '../../services/taskService';

function TaskCheckbox({ id, status, handleUpdate }) {
  const handleClick = () => {
    const updatedStatus = status === 0 ? 1 : 0;
    toggleTaskComplete(id, updatedStatus).then((data) => {
      if (!data.error) {
        handleUpdate(data);
      } else {
        if (data.error.details === "Signature has expired") {
          eventBus.dispatch('logout');
        }
      }
    });
  }

  return (
    <button
      className={`Task-checkbox ${status ? "completed" : ""}`}
      onClick={handleClick}
    />
  );
}

export default TaskCheckbox;
