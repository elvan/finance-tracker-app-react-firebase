import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { isPending, logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>
          <Link to='/'>FinanceTracker</Link>
        </li>

        {!user && (
          <>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
          </>
        )}

        {user && (
          <>
            {/* @ts-ignore */}
            <li>Hello, {user.displayName}</li>
            <li>
              <button className='btn' onClick={logout} disabled={isPending}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
