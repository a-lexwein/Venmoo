import React from 'react';
import axios from 'axios';
const moment = require('moment');


// const PendingEntry = (props) => {
//   const id = props.entry.transaction_id;
//   const accept = () => axios.post(`/transaction/accept/${id}-approved`);
//   const decline = () => axios.post(`/transaction/accept/${id}-declined`);
//   return (
//     <li className="pendingItem">
//       {props.entry.receiver_name} is requesting {props.entry.amount}
//       <button onClick={accept}>agree to pay</button>
//       <button onClick={decline}>decline request</button>
//     </li>
//   );
// };


class PendingEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: props.entry,
      isVisible: true,
    };

    this.updateState = props.updateState;
  }

  hide() {
    this.setState({ isVisible: false });
  }

  // &npbsp; is a single space
  render() {
    const id = this.state.entry.transaction_id;
    const accept = () => {
      axios.post(`/transaction/accept/${id}-approved`);
      this.hide();
      this.updateState();
    };
    const decline = () => {
      axios.post(`/transaction/accept/${id}-declined`);
      this.hide();
    };
    return (
      this.state.isVisible === true ?
        <li className="pendingItem">
          At {moment(this.state.entry.created_timestamp).format('lll')},&nbsp;
          {this.state.entry.receiver_name} requested&nbsp;
          <span className="bold">&nbsp;{this.state.entry.amount}&nbsp;</span>
          <button onClick={accept}>agree to pay</button>
          <button onClick={decline}>decline request</button>
        </li>
        :
        null
    );
  }
}

export default PendingEntry;
