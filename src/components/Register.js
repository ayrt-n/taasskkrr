import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import AuthService from '../services/AuthService';
import Alert from './Alert';
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
    } else if (values.password < 6) {
      errors.password = 'Must be 6 characters or more';
    }

    if (!values.passwordConfirmation) {
      errors.passwordConfirmation = 'Required';
    } else if (values.password !== values.passwordConfirmation) {
      errors.passwordConfirmation = 'Must match password';
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
      {errorMessage.length > 0 && <Alert type="danger" message="One or more errors prevented us from creating your account:" details={errorMessage} />}
      <Formik
        initialValues={{email: '', password: '', passwordConfirmation: ''}}
        validate={validate}
        onSubmit={handleRegister}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
             <div className="field">
              <label htmlFor="email" className="label">Email</label>
              <input type="text" id="email" className="input" {...formik.getFieldProps("email")} />
              {formik.touched.email && formik.errors.email ? (
                <div className="Form-error-message">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="field">
              <label htmlFor="password" className="label">Password</label>
              <input type="password" id="password" className="input" {...formik.getFieldProps("password")} />
              {formik.touched.password && formik.errors.password ? (
                <div className="Form-error-message">{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="field">
              <label htmlFor="passwordConfirmation" className="label">Confirm Password</label>
              <input type="password" id="passwordConfirmation" className="input" {...formik.getFieldProps("passwordConfirmation")} />
              {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? (
                <div className="Form-error-message">{formik.errors.passwordConfirmation}</div>
              ) : null}
            </div>

            <div className="control">
              <button className="button full" type="submit">Sign up</button>
            </div>
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
