import React, { useState } from 'react';
import TaskCheckbox from './TaskCheckbox';
import DeleteTaskButton from './DeleteTaskButton';
import TaskModal from './TaskModal';
import '../../styles/Tasks.css';

function Task({ task, sectionId, handleUpdate, handleDelete }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="Task">
      <TaskModal
        task={task}
        sectionId={sectionId}
        isOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
        handleUpdate={handleUpdate}
      />
      <div className="Task-left">
        <TaskCheckbox
          id={task.id}
          sectionId={sectionId}
          status={task.status}
          handleUpdate={handleUpdate}
        />
      </div>
      <div className="Task-main" onClick={() => setModalIsOpen(true)}>
        <div className="Task-title">{task.title}</div>
        <div className="Task-subtitle">{task.due_date}</div>
      </div>
      <div className="Task-right">
        <DeleteTaskButton id={task.id} sectionId={sectionId} handleDelete={handleDelete} />
      </div>
    </div>
  );
}

export default Task;
