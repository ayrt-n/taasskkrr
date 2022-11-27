import React, { useState } from 'react';
import { Formik } from 'formik';
import TextInput from '../form/TextInput';
import Button from '../form/Button';
import Alert from '../Alert';
import closeIcon from '../../assets/icons/close.svg';
import '../../styles/Form.css';
import TaskService from '../../services/TaskService';
import eventBus from '../common/EventBus';

function SectionForm({ section, projectId, closeModal, afterSubmit }) {
  const [errorMessage, setErrorMessage] = useState([]);
  
  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = 'Required';
    }

    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    if (section.id) {
      TaskService.updateSection(values.title, section.id).then((data) => {
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
    } else {
      TaskService.createSection(values.title, projectId).then((data) => {
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
      <div className="Modal-header-container">
        <h2>{section.id ? 'Edit Section' : 'Add Section'}</h2>
        <button className="Close-modal-button" onClick={closeModal}>
          <img src={closeIcon} alt="" />
        </button>
      </div>
      <div className="Modal-content-container">
        <Formik
          initialValues={{title: section.title}}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {formik => (
            <form onSubmit={formik.handleSubmit}>
              <TextInput label="Title" name="title" id="title" type="text" autoFocus/>
              <div className="field is-grouped">
                {section.id ? 
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
