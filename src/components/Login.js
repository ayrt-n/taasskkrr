import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import AuthService from '../services/AuthService';
import Alert from './Alert';
import TextInput from './form/TextInput';
import Button from './form/Button';
import '../styles/Form.css'

function Login({ message }) {
  const [errorMessage, setErrorMessage] = useState([]);
  const routerNavigate = useNavigate();

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Required';
    }

    if (!values.password) {
      errors.password = 'Required';
    }

    return errors;
  };

  const handleLogin = (values, { setSubmitting }) => {
    AuthService.login(values.email, values.password)
    .then((data) => {
      if (!data.error) {
        routerNavigate('/');
        window.location.reload();
      } else {
        setErrorMessage(data.error.details);
      }
      setSubmitting(false);
    })
  };

  return (
    <div className="Form-container">
      {errorMessage.length > 0 && <Alert type="danger" message="Login failed:" details={errorMessage} />}
      <Formik
        initialValues={{email: '', password: ''}}
        validate={validate}
        onSubmit={handleLogin}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <TextInput label="Email" name="email" id="email" type="text" />
            <TextInput label="Password" name="password" id="password" type="password" />
            <Button label="Sign up" buttonStyles="is-primary full" type="submit" />
          </form>
        )}
      </Formik>
      <div className="Form-links">
        <p>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
        <p>
          <Link to="/register">Forgot your password?</Link>
        </p>
        <p>
          <Link to="/confirmations">Didn't receive confirmation instructions?</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
