import styles from '../pages/HomePage.module.css';

const TransactionList = ({ transactions }) => {
  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <p className={styles.name}>{transaction.name}</p>
          <p className={styles.amount}>${transaction.amount}</p>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
