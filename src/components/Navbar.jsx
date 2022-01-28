import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
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
      </ul>
    </nav>
  );
}
