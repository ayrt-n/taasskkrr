import React from 'react';
import TaskService from '../../services/TaskService';

function TaskCheckbox({ id, status, handleUpdate }) {
  const handleClick = () => {
    const updatedStatus = status === 0 ? 1 : 0;
    TaskService.toggleTaskComplete(id, updatedStatus).then((data) => {
      if (!data.error) {
        handleUpdate(data);
      } else {
        // TODO HANDLE ERROR IN UPDATE
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
