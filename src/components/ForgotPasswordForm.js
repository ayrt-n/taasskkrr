import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import AccountServices from '../services/AccountServices';
import Alert from './Alert';
import TextInput from './form/TextInput';
import Button from './form/Button';
import '../styles/Form.css'

function ForgotPasswordForm() {
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
    AccountServices.sendPasswordReset(values.email)
    .then((data) => {
      if (!data.error) {
        console.log(data);
      } else {
        setErrorMessage(data.error.details)
      }
      setSubmitting(false);
    });
  };

  return (
    <div className="Form-container">
      {errorMessage.length > 0 && <Alert type="danger" message="Unable to send password reset instructions:" details={errorMessage} />}
      <Formik
        initialValues={{email: ''}}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <TextInput label="Email" name="email" id="email" type="text" />
            <Button label="Send Reset Instructions" buttonStyles="is-primary full" type="submit" />
          </form>
        )}
      </Formik>
      <div className="Form-links">
        <p>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
