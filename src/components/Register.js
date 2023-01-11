import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { register } from '../services/authService';
import Alert from './Alert';
import TextInput from './form/TextInput';
import Button from './form/Button';
import '../styles/Form.css'

// User registration form component, used to register users for an account
function Register() {
  const [flash, setFlash] = useState(null);
  const routerNavigate = useNavigate();

  // Validate email, password, and password confirmation
  // Return errors if present
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

  // On submit send API request to register user
  // If success, redirect to login with success message
  // Otherwise, display error message
  const handleRegister = (values, { setSubmitting }) => {
    register(values.email, values.password, values.passwordConfirmation)
    .then((data) => {
      if (!data.error) {
        routerNavigate(
          '/login',
          { state: {
              type: 'success',
              message: 'Registration complete!',
              body: 'Check your email for instructions on how to confirm your email.'
            }
          }
        );
        window.location.reload();
      } else {
        setFlash({
          type: 'danger',
          message: 'Sign up failed:',
          details: data.error.details
        })
      }
      setSubmitting(false);
    })
  }

  return (
    <div className="Form-container">
      {flash ? <Alert {...flash} /> : null}
      <h1 className="Form-header">Sign up</h1>
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
      <div className="Form-links">
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </div>
  );
}

export default Register;
