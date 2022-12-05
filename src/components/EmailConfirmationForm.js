import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import AuthService from '../services/AuthService';
import Alert from './Alert';
import TextInput from './form/TextInput';
import Button from './form/Button';
import '../styles/Form.css'

function EmailConfirmationForm() {
  const [errorMessage, setErrorMessage] = useState([]);

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    AuthService.resendConfirmationEmail(values.email)
    .then((data) => {
      if (!data.error) {
        // TODO: HOW SHOULD WE HANDLE SUCCESSFUL SUBMITS?
        // Could redirect to login with flash message or replace form with success alert
      } else {
        setErrorMessage(data.error.details)
      }
      setSubmitting(false);
    })
  };

  return (
    <div className="Form-container">
      {errorMessage.length > 0 && <Alert type="danger" message="Unable to send confirmation email:" details={errorMessage} />}
      <Formik
        initialValues={{email: ''}}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <TextInput label="Email" name="email" id="email" type="text" />
            <Button label="Send Confirmation Instructions" buttonStyles="is-primary full" type="submit" />
          </form>
        )}
      </Formik>
      <div className="Form-links">
        <p>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
        <p>
          Already confirmed? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default EmailConfirmationForm;
