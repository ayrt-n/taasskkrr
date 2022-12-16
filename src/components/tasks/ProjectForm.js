import React, { useState } from 'react';
import { Formik } from 'formik';
import TextInput from '../form/TextInput';
import Button from '../form/Button';
import Alert from '../Alert';
import '../../styles/Form.css';
import { updateProject, createProject } from '../../services/taskService';
import eventBus from '../common/EventBus';

function SectionForm({ project, closeModal, afterSubmit }) {
  const [errorMessage, setErrorMessage] = useState([]);

  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = 'Required';
    }

    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    if (project.id) {
      updateProject(values.title, project.id).then((data) => {
        if (!data.error) {
          afterSubmit(data);
          closeModal();
          setSubmitting(false);
        } else {
          if (data.error.details[0] === "Signature has expired") {
            eventBus.dispatch('logout');
          } else {
            setErrorMessage(data.error.details);
          }
        }
      });
    } else {
      createProject(values.title).then((data) => {
        if (!data.error) {
          afterSubmit(data);
          closeModal();
          setSubmitting(false);
        } else {
          if (data.error.details[0] === "Signature has expired") {
            eventBus.dispatch('logout');
          } else {
            setErrorMessage(data.error.details);
          }
        }
      });
    }
  };

  return (
    <>
      <div className="Modal-content-container">
        {errorMessage.length > 0 && <Alert type="danger" message="Unable to save project:" details={errorMessage} />}
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
                  <Button label="Save Changes" buttonStyles="is-primary" type="submit"/> :
                  <Button label="Add Project" buttonStyles="is-primary" type="submit"/>
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
