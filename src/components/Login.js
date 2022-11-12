import React, { useState } from 'react';
import AuthService from '../services/AuthService';
import { withRouter } from './helpers/withRouter';
import '../styles/Login.css'

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    AuthService.login(email, password)
    .then((data) => {
      if (!data.error) {
        props.router.navigate('/inbox');
        window.location.reload();
      } else {
        console.log(data);
      }
    })
  }

  return (
    <div className="Login">
      <form className="Form" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="user[email]" value={email} onChange={onEmailChange}></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onPasswordChange}></input>
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
    </div>
  );
}

export default withRouter(Login);
