import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { pending, logout } = useLogout();

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>
          <Link to='/'>FinanceTracker</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <button className='btn' onClick={logout} disabled={pending}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
