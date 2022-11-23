import React, { useState } from 'react';
import { Formik } from 'formik';
import TextInput from '../form/TextInput';
import TextArea from '../form/TextArea';
import SelectInput from '../form/SelectInput';
import Button from '../form/Button';
import Alert from '../Alert';
import closeIcon from '../../assets/icons/close.svg';
import '../../styles/Form.css';
import TaskService from '../../services/TaskService';

function TaskForm({ task, projectId, sectionId, switchToEditMode, closeModal, afterSubmit }) {
  const [errorMessage, setErrorMessage] = useState([]);
  
  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = 'Required';
    }

    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    if (task.id) {
      TaskService.updateTask(values).then((data) => {
        if (!data.error) {
          afterSubmit(data, sectionId);
          switchToEditMode();
        } else {
          console.log(data.error);
          setErrorMessage(data.error);
          // TODO NEED TO DISPLAY ERRORS
        }
        setSubmitting(false);
      });
    } else {
      TaskService.createTask(values, projectId, sectionId).then((data) => {
        if (!data.error) {
          afterSubmit(data, sectionId);
          closeModal();
        } else {
          console.log(data.error);
          setErrorMessage(data.error);
          // TODO NEED TO DISPLAY ERRORS
        }
        setSubmitting(false);
      });
    }
  };

  return (
    <>
      <div className="Modal-header-container">
        <h2>{task.id ? 'Edit Task' : 'Add Task'}</h2>
        <button className="Close-modal-button" onClick={closeModal}>
          <img src={closeIcon} alt="" />
        </button>
      </div>
      <div className="Modal-content-container">
        <Formik
          initialValues={{...task}}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {formik => (
            <form onSubmit={formik.handleSubmit}>
              <TextInput label="Title" name="title" id="title" type="text" autoFocus/>
              <TextArea label="Description" name="description" id="description" type="text"/>
              <SelectInput label="Priority" name="priority" id="priority">
                <option value={0}>
                  Low
                </option>
                <option value={1}>
                  Medium
                </option>
                <option value={2}>
                  High
                </option>
              </SelectInput>
              <div className="field is-grouped">
                {task.id ? 
                  <Button label="Save Changes" primary type="submit"/> :
                  <Button label="Add Task" primary type="submit"/>
                }
                <Button label="Cancel" onClick={closeModal}/>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default TaskForm;
