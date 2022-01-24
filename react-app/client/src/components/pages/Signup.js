import { useState } from 'react';
import React from 'react';
import './login.css'

export default function App() {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function registerUser(event) {
    event.preventDefault()
    const response = await fetch('http://localhost:4000/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
    await response.json()
  }
  return (
    <div className="login-box">
      <h2> Signup </h2>
      <form onSubmit={registerUser}>
        <div className="user-box">
          <input
            value={username}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
          <label>Username</label>
          <br />
        </div>
        <div className="user-box">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <label>Email</label>
          <br />
        </div>
        <div class="user-box">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <label>Password</label>
          <br />
        </div>
        <a href="#">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Submit
    </a>
      </form>
    </div>
  );
}
