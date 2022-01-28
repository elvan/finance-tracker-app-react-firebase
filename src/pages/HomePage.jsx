import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import { useAuthContext } from '../hooks/useAuthContext';
import { useCollection } from '../hooks/useCollection';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection('transactions', [
    'userId',
    '==',
    // @ts-ignore
    user.uid,
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>

      <div className={styles.sidebar}>
        {/* @ts-ignore */}
        <TransactionForm userId={user.uid} />
      </div>
    </div>
  );
}
