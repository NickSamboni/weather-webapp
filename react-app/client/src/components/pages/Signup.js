import { useState } from 'react';
import React from 'react';

function App() {
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
    <div>
      <h1> Signup </h1>
      <form onSubmit={registerUser}>
        <input
          value={username}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="User"
        />
      <br />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
      />
      <br />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="password"
      />
      <br />
      <input type="submit" value="Register"></input>
    </form>
    </div>
  );
}

export default App
