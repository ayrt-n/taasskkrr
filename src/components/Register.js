import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import AuthService from '../services/AuthService';
import Alert from './Alert';
import TextInput from './form/TextInput';
import Button from './form/Button';
import '../styles/Form.css'

function Register() {
  const [errorMessage, setErrorMessage] = useState([]);
  const routerNavigate = useNavigate();

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

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

  const handleRegister = (values, { setSubmitting }) => {
    AuthService.register(values.email, values.password, values.passwordConfirmation)
    .then((data) => {
      if (!data.error) {
        routerNavigate('/login');
        window.location.reload();
      } else {
        console.log(data.error);
        setErrorMessage(data.error.details)
      }
      setSubmitting(false);
    })
  }

  return (
    <div className="Form-container">
      {errorMessage.length > 0 && <Alert type="danger" message="Sign up failed:" details={errorMessage} />}
      <Formik
        initialValues={{email: '', password: '', passwordConfirmation: ''}}
        validate={validate}
        onSubmit={handleRegister}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <TextInput label="Email" name="email" id="email" type="text" />
            <TextInput label="Password" name="password" id="password" type="password" />
            <TextInput label="Confirm Password" name="passwordConfirmation" id="passwordConfirmation" type="password" />
            <Button label="Sign up" buttonStyles="is-primary full" type="submit" />
          </form>
        )}
      </Formik>
      <div style={{'textAlign': 'center'}}>
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </div>
  );
}

export default Register;
