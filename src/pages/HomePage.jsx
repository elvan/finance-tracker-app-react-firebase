import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import { useAuthContext } from '../hooks/useAuthContext';
import { useCollection } from '../hooks/useCollection';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    'transactions',
    // @ts-ignore
    ['userId', '==', user.uid],
    ['createdAt', 'desc']
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}

        {/* @ts-ignore */}
        {documents && documents.length === 0 && <p>You have no transactions</p>}

        {/* @ts-ignore */}
        {documents && documents.length > 0 && (
          <TransactionList transactions={documents} />
        )}
      </div>

      <div className={styles.sidebar}>
        {/* @ts-ignore */}
        <TransactionForm userId={user.uid} />
      </div>
    </div>
  );
}
