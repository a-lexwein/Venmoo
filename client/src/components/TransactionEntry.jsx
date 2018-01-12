import React from 'react';
import { Card, CardBody, CardSubtitle, CardTitle, CardText, Button } from 'reactstrap'

// const TransactionEntry = props => (
//   <div>
//     Entry
//   </div>
// );
const capitalize = function (string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1);
};

class TransactionEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { transaction, user } = this.props;
    const sender = capitalize(transaction.sender_name === user.name ? 'you' : transaction.sender_name);
    const receiver = capitalize(transaction.receiver_name === user.name ? 'you' : transaction.receiver_name);

    let text;
    let timestamp;

    if (transaction.type === 'payment') {
      text = `${sender} paid ${receiver} ${transaction.amount}`;
      timestamp = transaction.resolved_timestamp;
    } else if (transaction.type === 'request') {
      text = `${receiver} charged ${sender} ${transaction.amount}`;
      timestamp = transaction.created_timestamp;
    }

    return (
      <p>
        {text} <br />
        <span>
          {timestamp}
        </span>
      </p>
    )
  }
}
// This change here works for the cards, need to refactor below to render top
// const TransactionEntry = props => (
//   <div id="transactionCard">
//     <Card>
//       <CardBody>
//         <CardTitle>Transaction:</CardTitle>
//         <CardSubtitle>???</CardSubtitle>
//         <CardText>
//           Some quick example text to build on the card title and make up the
//           bulk of the card's content.
//         </CardText>
//         <Button>Button</Button>
//       </CardBody>
//     </Card>
//   </div>
// );

export default TransactionEntry;
