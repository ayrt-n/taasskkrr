import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { withRouter } from './helpers/withRouter';
import Alert from './Alert';
import '../styles/Form.css'

function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState([]);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onPasswordConfirmationChange = (e) => {
    setPasswordConfirmation(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    AuthService.register(email, password, passwordConfirmation)
    .then((data) => {
      if (!data.error) {
        props.router.navigate('/login');
        // window.location.reload();
      } else {
        console.log(data.error);
        setErrors(data.error.details)
      }
    })
  }

  return (
    <div className="Form-container">
      {errors.length > 0 && <Alert type="danger" message="One or more errors prevented us from creating your account:" details={errors} />}
      <form className="Form" onSubmit={handleLogin} autoComplete="new-password">
        <div className="field">
          <label htmlFor="email" className="label">Email</label>
          <input autoComplete="new-password" type="text" name="user[email]" id="email" value={email} onChange={onEmailChange} className="input" />
        </div>
        <div className="field">
          <label htmlFor="password" className="label">Password</label>
          <input autoComplete="new-password" type="password" name="password" id="password" value={password} onChange={onPasswordChange} className="input" />
        </div>
        <div className="field">
          <label htmlFor="password_confirmation" className="label">Confirm Password</label>
          <input autoComplete="off" type="password" name="password_confirmation" id="password_confirmation" value={passwordConfirmation} onChange={onPasswordConfirmationChange} className="input" />
        </div>
        <div className="control">
          <button className="button full">Sign up</button>
        </div>
      </form>
      <div style={{'textAlign': 'center'}}>
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </div>
  );
}

export default withRouter(Register);
