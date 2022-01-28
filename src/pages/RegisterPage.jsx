import { useState } from 'react';
import { useRegister } from '../hooks/useRegister';
import styles from './RegisterPage.module.css';

export default function RegisterPage() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfigmation] = useState('');

  const { pending, error, register } = useRegister();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      alert('Passwords do not match!');
      return;
    }

    register({ displayName, email, password });

    setDisplayName('');
    setEmail('');
    setPassword('');
    setPasswordConfigmation('');
  };

  return (
    <div>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        {error.message && <p>{error.message}</p>}

        <h2>Register</h2>
        <label htmlFor='displayName'>
          <span>Display Name</span>
          <input
            value={displayName}
            id='displayName'
            name='displayName'
            type='text'
            minLength={2}
            maxLength={25}
            required
            disabled={pending}
            onChange={(event) => setDisplayName(event.target.value)}
          />
        </label>
        <label htmlFor='email'>
          <span>Email</span>
          <input
            value={email}
            id='email'
            name='email'
            type='email'
            minLength={5}
            maxLength={64}
            required
            disabled={pending}
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
            minLength={8}
            maxLength={64}
            required
            disabled={pending}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <label htmlFor='passwordConfirmation'>
          <span>Confirm Password</span>
          <input
            value={passwordConfirmation}
            id='passwordConfirmation'
            name='passwordConfirmation'
            type='password'
            minLength={8}
            maxLength={64}
            required
            disabled={pending}
            onChange={(event) => setPasswordConfigmation(event.target.value)}
          />
        </label>
        <button className='btn' type='submit' disabled={pending}>
          {pending ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
