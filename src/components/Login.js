import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import AuthService from '../services/AuthService';
import { withRouter } from './helpers/withRouter';
import Alert from './Alert';
import '../styles/Form.css'

function Login(props) {
  const [errorMessage, setErrorMessage] = useState([]);

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
        props.router.navigate('/inbox');
        window.location.reload();
      } else {
        console.log(data.error);
        setErrorMessage([data.error]);
      }
      setSubmitting(false);
    })
  };

  return (
    <div className="Form-container">
      {errorMessage.length > 0 && <Alert type="danger" message="Error attempting to sign in:" details={errorMessage} />}
      <Formik
        initialValues={{email: '', password: ''}}
        validate={validate}
        onSubmit={handleLogin}
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

            <div className="control">
              <button className="button full" type="submit">Log in</button>
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

export default withRouter(Login);
