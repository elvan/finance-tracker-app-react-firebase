import { useState } from 'react';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('email:', email);
    console.log('password:', password);
  };

  return (
    <div>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor='email'>
          <span>Email</span>
          <input
            id='email'
            type='email'
            name='email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label htmlFor='password'>
          <span>Password</span>
          <input
            id='password'
            name='password'
            type='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button className='btn' type='submit'>
          Login
        </button>
      </form>
    </div>
  );
}
