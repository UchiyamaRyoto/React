import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3002/register', {
        username: signupUsername,
        email: signupEmail,
        password: signupPassword,
      });
      console.log('Signup successful', response.data);
      // サインアップ成功後、ログインページにリダイレクトする場合など
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div>
      <h2>新規登録</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="signupUsername">Username</label>
          <input
            type="text"
            id="signupUsername"
            value={signupUsername}
            onChange={(e) => setSignupUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="signupEmail">Email</label>
          <input
            type="email"
            id="signupEmail"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="signupPassword">Password</label>
          <input
            type="password"
            id="signupPassword"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
