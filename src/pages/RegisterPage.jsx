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
        <label htmlFor='displayName'>
          <span>Display Name</span>
          <input
            value={displayName}
            id='displayName'
            name='displayName'
            type='text'
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
