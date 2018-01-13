import React from 'react';
import TransactionEntry from './TransactionEntry.jsx';

const TransactionHistory = props => (
  <div className="container">

    {props.transactionHist.map((entry) => {
      return (
        <TransactionEntry
          transaction={entry}
          key={entry.transaction_id}
          user={props.user}
        />);
    })}
  </div>
);

export default TransactionHistory;
