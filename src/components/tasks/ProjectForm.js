import React, { useState } from 'react';
import { Formik } from 'formik';
import TextInput from '../form/TextInput';
import Button from '../form/Button';
import Alert from '../Alert';
import closeIcon from '../../assets/icons/close.svg';
import '../../styles/Form.css';
import TaskService from '../../services/TaskService';

function SectionForm({ project, closeModal, afterSubmit }) {
  const [errorMessage, setErrorMessage] = useState([]);

  console.log(project);
  
  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = 'Required';
    }

    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    if (project.id) {
      TaskService.updateProject(values.title, project.id).then((data) => {
        if (!data.error) {
          afterSubmit(data);
          closeModal();
          setSubmitting(false);
        } else {
          console.log(data.error);
          setErrorMessage(data.error);
          // TODO NEED TO DISPLAY ERRORS
        }
      });
    } else {
      TaskService.createProject(values.title).then((data) => {
        if (!data.error) {
          afterSubmit(data);
          closeModal();
          setSubmitting(false);
        } else {
          console.log(data.error);
          setErrorMessage(data.error);
          // TODO NEED TO DISPLAY ERRORS
        }
      });
    }
  };

  return (
    <>
      <div className="Modal-header-container">
        <h2>{project.id ? 'Edit Project' : 'Add Project'}</h2>
        <button className="Close-modal-button" onClick={closeModal}>
          <img src={closeIcon} alt="" />
        </button>
      </div>
      <div className="Modal-content-container">
        <Formik
          initialValues={{title: project.title}}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {formik => (
            <form onSubmit={formik.handleSubmit}>
              <TextInput label="Title" name="title" id="title" type="text" autoFocus/>
              <div className="field is-grouped">
                {project.id ? 
                  <Button label="Save Changes" primary type="submit"/> :
                  <Button label="Add Section" primary type="submit"/>
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

export default SectionForm;
