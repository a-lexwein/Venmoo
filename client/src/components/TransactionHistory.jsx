import React from 'react';
import TransactionEntry from './TransactionEntry.jsx';

const TransactionHistory = props => (
  <div className="container">

    {props.transactionHist
      .filter(entry => (entry.status === 'approved'))
      .sort((a, b) => a.resolved_timestamp < b.resolved_timestamp ? 1 : -1 )
      .map(entry => {
      return <TransactionEntry
            transaction={entry}
            key={entry.transaction_id}
            user={props.user}/>
    })}
  </div>
);

export default TransactionHistory;
