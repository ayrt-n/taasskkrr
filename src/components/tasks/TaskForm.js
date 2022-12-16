import React, { useState } from 'react';
import { Formik } from 'formik';
import TextInput from '../form/TextInput';
import TextArea from '../form/TextArea';
import SelectInput from '../form/SelectInput';
import DateInput from '../form/DateInput';
import Button from '../form/Button';
import Alert from '../Alert';
import '../../styles/Form.css';
import { updateTask, createTask } from '../../services/taskService';
import eventBus from '../common/EventBus';

function TaskForm({ task, closeModal, afterSubmit }) {
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
      updateTask(values).then((data) => {
        if (!data.error) {
          afterSubmit(data);
          closeModal();
        } else {
          if (data.error.details === "Signature has expired") {
            eventBus.dispatch('logout');
          } else {
            setErrorMessage(data.error.details);
          }
        }
        setSubmitting(false);
      });
    } else {
      createTask(values, task.project_id, task.section_id).then((data) => {
        if (!data.error) {
          afterSubmit(data);
          closeModal();
        } else {
          if (data.error.details[0] === "Signature has expired") {
            eventBus.dispatch('logout');
          } else {
            setErrorMessage(data.error.details);
          }
        }
        setSubmitting(false);
      });
    }
  };

  return (
    <>
      <div className="Modal-content-container">
        {errorMessage.length > 0 && <Alert type="danger" message="Unable to save task:" details={errorMessage} />}
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
              <DateInput label="Due Date" name="due_date" id="due_date" />
              <div className="field is-grouped">
                {task.id ? 
                  <Button label="Save Changes" buttonStyles="is-primary" type="submit"/> :
                  <Button label="Add Task" buttonStyles="is-primary" type="submit"/>
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
