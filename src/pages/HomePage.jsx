// @ts-nocheck

import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import { useAuthContext } from '../hooks/useAuthContext';
import { useCollection } from '../hooks/useCollection';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    'transactions',
    ['uid', '==', user.uid],
    ['createdAt', 'desc']
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}

        {documents && documents.length === 0 && <p>You have no transactions</p>}

        {documents && documents.length > 0 && (
          <TransactionList transactions={documents} />
        )}
      </div>

      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
}
