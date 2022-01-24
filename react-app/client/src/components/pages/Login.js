import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../useUser'
import './login.css'


export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {isLoginLoading, isLoginError, login, isLogged} = useUser();
  
  useEffect(() => {
    if (isLogged) navigate('/home')
  }, [isLogged, navigate]);

  const handleSummit = (e) => {
    e.preventDefault();
    login({ email, password })
  }

  
  return (
    <div className="login-box">
      <h2>Login</h2>
      { isLoginLoading && <strong>Loading...</strong>}
      <form onSubmit={handleSummit}>
        <div className="user-box">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <label>Email</label>
          <br />
        </div>
        <div className="user-box">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <label>Password</label>
          <br />
        </div>
        <a type="button" onClick={handleSummit}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Submit
    </a>
      </form>
      {isLoginError && <strong>Credential Error</strong>}
    </div>
    
  );
}

