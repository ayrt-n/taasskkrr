import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Formik } from 'formik';
import AccountServices from '../services/AccountServices';
import Alert from './Alert';
import TextInput from './form/TextInput';
import Button from './form/Button';
import '../styles/Form.css'

function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState([]);

  const validate = (values) => {
    const errors = {};

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be 6 characters or greater';
    }

    if (!values.passwordConfirmation) {
      errors.passwordConfirmation = 'Required';
    } else if (values.password !== values.passwordConfirmation) {
      errors.passwordConfirmation = 'Password confirmation does not match password';
    }

    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const resetToken = searchParams.get('reset_password_token');
    AccountServices.resetPassword(values.password, values.passwordConfirmation, resetToken)
    .then((data) => {
      if (!data.error) {
        // TODO: HOW SHOULD WE HANDLE SUCCESSFUL SUBMITS?
        // Could redirect to login with flash message or replace form with success alert
        console.log(data);
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
        initialValues={{password: '', passwordConfirmation: ''}}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <TextInput label="Password" name="password" id="password" type="password" />
            <TextInput label="Confirm Password" name="passwordConfirmation" id="passwordConfirmation" type="password" />
            <Button label="Reset Password" buttonStyles="is-primary full" type="submit" />
          </form>
        )}
      </Formik>
    </div>
  );
}

export default ResetPasswordForm;
