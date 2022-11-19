import React, { useState } from 'react';
import { Field, Formik } from 'formik';
import TextInput from '../form/TextInput';
import SelectInput from '../form/SelectInput';
import DatePickerInput from '../form/DatePickerInput';
import Button from '../form/Button';
import Alert from '../Alert';
import closeIcon from '../../assets/icons/close.svg';
import '../../styles/Form.css';
import TaskService from '../../services/TaskService';

function TaskForm({ task, closeModal, afterSubmit }) {
  const [errorMessage, setErrorMessage] = useState([]);
  
  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = 'Required';
    }
  };

  const handleSubmit = (values, { setSubmitting }) => {
    if (task.id) {
      TaskService.updateTask(values).then((data) => {
        if (!data.error) {
          afterSubmit(data);
          closeModal();
        } else {
          console.log(data.error);
          setErrorMessage(data.error);
        }
        setSubmitting(false);
      });
    }
  };

  return (
    <Formik
      initialValues={{...task}}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {formik => (
        <>
          <div className="Modal-header-container">
            <h2>Edit Task</h2>
            <button className="Close-modal-button" onClick={closeModal}>
              <img src={closeIcon} alt="" />
            </button>
          </div>
          <div className="Modal-content-container">
            <form onSubmit={formik.handleSubmit}>
              <TextInput label="Title" name="title" id="title" type="text"/>
              <TextInput label="Description" name="description" id="description" type="text"/>
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
                <Button label="Save Changes" primary type="submit"/>
                <Button label="Cancel" onClick={closeModal}/>
              </div>
            </form>
          </div>
        </>
      )}
    </Formik>
  );
}

export default TaskForm;
