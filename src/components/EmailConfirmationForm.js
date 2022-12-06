import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import AuthService from '../services/AuthService';
import Alert from './Alert';
import TextInput from './form/TextInput';
import Button from './form/Button';
import '../styles/Form.css'

function EmailConfirmationForm() {
  const [flash, setFlash] = useState(null);

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    return errors;
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    AuthService.resendConfirmationEmail(values.email)
    .then((data) => {
      if (!data.error) {
        setFlash({
          type: 'success',
          message: 'Confirmation email sent!',
          body: 'Check your email for instructions on how to confirm your account.'
        })
        resetForm();
      } else {
        setFlash({
          type: 'danger',
          message: 'Unable to send confirmation email:',
          details: data.error.details
        });
        setSubmitting(false);
      }
    })
  };

  return (
    <div className="Form-container">
      {flash ? <Alert {...flash} /> : null}
      <h1 className="Form-header">Confirm Email</h1>
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
