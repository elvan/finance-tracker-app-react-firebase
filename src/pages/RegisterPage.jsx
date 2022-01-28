import { useState } from 'react';
import styles from './RegisterPage.module.css';

export default function RegisterPage() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfigmation] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('display name:', displayName);
    console.log('email:', email);
    console.log('password:', password);
    console.log('password confirmation:', passwordConfirmation);

    if (password !== passwordConfirmation) {
      alert('Passwords do not match!');
      return;
    }

    setDisplayName('');
    setEmail('');
    setPassword('');
    setPasswordConfigmation('');
  };

  return (
    <div>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <h2>Register</h2>
        <label htmlFor='email'>
          <span>Display Name</span>
          <input
            id='displayName'
            type='text'
            name='displayName'
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
          />
        </label>
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
        <label htmlFor='password'>
          <span>Confirm Password</span>
          <input
            id='passwordConfirmation'
            name='passwordConfirmation'
            type='password'
            value={passwordConfirmation}
            onChange={(event) => setPasswordConfigmation(event.target.value)}
          />
        </label>
        <button className='btn' type='submit'>
          Login
        </button>
      </form>
    </div>
  );
}
