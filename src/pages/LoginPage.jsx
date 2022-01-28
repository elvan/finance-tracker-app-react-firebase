import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isPending, error, login } = useLogin();

  const handleSubmit = (event) => {
    event.preventDefault();

    login(email, password);
  };

  return (
    <div>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error.message && <p style={{ color: 'red' }}>{error.message}</p>}

        <label htmlFor='email'>
          <span>Email</span>
          <input
            value={email}
            id='email'
            type='email'
            name='email'
            disabled={isPending}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label htmlFor='password'>
          <span>Password</span>
          <input
            value={password}
            id='password'
            name='password'
            type='password'
            disabled={isPending}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button className='btn' type='submit' disabled={isPending}>
          {isPending ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
