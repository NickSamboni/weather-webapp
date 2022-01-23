import { useState } from 'react';
import React from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function LoginUser(event) {
    event.preventDefault()
    const response = await fetch('http://localhost:4000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email,
        password,
      }),
    })
    await response.json()
  }
  return (
    <div>
      <h1> login </h1>
      <form onSubmit={LoginUser}>
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
