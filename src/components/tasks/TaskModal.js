import React, { useState } from 'react';
import TaskDetails from './TaskDetails';
import TaskForm from './TaskForm';
import '../../styles/Modal.css';
import '../../styles/Form.css';

function TaskModal({ task, sectionId, closeModal, afterSubmit }) {
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      {editMode ?
        <TaskForm
          task={task}
          sectionId={sectionId}
          closeModal={closeModal}
          afterSubmit={afterSubmit}
        /> :
        <TaskDetails
          task={task}
          closeModal={closeModal}
          editTask={() => { setEditMode(true) }}
        />
      }
    </>
  );
}

export default TaskModal;
