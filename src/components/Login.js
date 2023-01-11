import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import { login } from '../services/authService';
import Alert from './Alert';
import TextInput from './form/TextInput';
import Button from './form/Button';
import '../styles/Form.css'

// Login form component used to log user in
// Additionally, provides user with number of links to signup,
// recover password, resend confirmation email, etc
function Login() {
  // Use state from useLocation if passed (null if no state passed) and use
  // state to set alert/flash message
  const { state } = useLocation();
  const [flash, setFlash] = useState(state);
  const routerNavigate = useNavigate();

  // Validate email and password, return errors if present
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

  // On submit send API request to login
  // If success, redirect user to app
  // Otherwise, display error messages
  const handleLogin = (values, { setSubmitting }) => {
    login(values.email, values.password)
    .then((data) => {
      if (!data.error) {
        // If successful login (no error) redirect to app
        routerNavigate('/app');
      } else {
        // If error logging in, set flash state to render errors
        setFlash({
          type: 'danger',
          message: 'Login failed:',
          details: data.error.details
        })
      }
      setSubmitting(false);
    })
  };

  return (
    <div className="Form-container">
      {flash ? <Alert {...flash} /> : null}
      <h1 className="Form-header">Log in</h1>
      <Formik
        initialValues={{email: '', password: ''}}
        validate={validate}
        onSubmit={handleLogin}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <TextInput label="Email" name="email" id="email" type="text" />
            <TextInput label="Password" name="password" id="password" type="password" />
            <Button label="Sign in" buttonStyles="is-primary full" type="submit" />
          </form>
        )}
      </Formik>
      <div className="Form-links">
        <p>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
        <p>
          <Link to="/forgot_password">Forgot your password?</Link>
        </p>
        <p>
          <Link to="/confirmations">Didn't receive confirmation instructions?</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
