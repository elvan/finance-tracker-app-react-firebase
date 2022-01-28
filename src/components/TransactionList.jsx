import { useFirestore } from '../hooks/useFirestore';
import styles from '../pages/HomePage.module.css';

const TransactionList = ({ transactions }) => {
  const { deleteDocument, response } = useFirestore('transactions');

  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <p className={styles.name}>{transaction.name}</p>
          <p className={styles.amount}>${transaction.amount}</p>
          <button
            onClick={() => deleteDocument(transaction.id)}
            disabled={response.isPending}
          >
            X
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
