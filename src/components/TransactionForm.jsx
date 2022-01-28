import { useEffect, useState } from 'react';
import { useFirestore } from '../hooks/useFirestore';

export default function TransactionForm({ userId }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const { addDocument, response } = useFirestore('transactions');

  const handleSubmit = (event) => {
    event.preventDefault();

    addDocument({
      userId: userId,
      name: name,
      amount: Number(amount),
    });
  };

  useEffect(() => {
    if (response?.isSuccess) {
      setName('');
      setAmount('');
    }
  }, [response?.isSuccess]);

  return (
    <>
      <h3>Add New Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction Name:</span>
          <input
            value={name}
            type='text'
            required
            minLength={3}
            maxLength={50}
            disabled={response?.isPending}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          <span>Amount ($):</span>
          <input
            value={amount}
            type='number'
            required
            disabled={response?.isPending}
            onChange={(event) => setAmount(event.target.value)}
          />
        </label>
        <button className='btn' type='submit' disabled={response?.isPending}>
          {response?.isPending ? 'Adding Transaction...' : 'Add Transaction'}
        </button>
      </form>
    </>
  );
}
