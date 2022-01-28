import TransactionForm from '../components/TransactionForm';
import { useAuthContext } from '../hooks/useAuthContext';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { user } = useAuthContext();

  return (
    <div className={styles.container}>
      <div className={styles.content}>Transaction List</div>
      <div className={styles.sidebar}>
        {/* @ts-ignore */}
        <TransactionForm userId={user.uid} />
      </div>
    </div>
  );
}
