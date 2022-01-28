import { useState } from 'react';

export default function TransactionForm() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(`Submitting transaction: ${name} ${amount}`);
  };

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
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          <span>Amount ($):</span>
          <input
            value={amount}
            type='number'
            required
            onChange={(event) => setAmount(event.target.value)}
          />
        </label>
        <button className='btn' type='submit'>
          Add Transaction
        </button>
      </form>
    </>
  );
}
