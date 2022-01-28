import TransactionForm from '../components/TransactionForm';
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>Transaction List</div>
      <div className={styles.sidebar}>
        <TransactionForm />
      </div>
    </div>
  );
}
