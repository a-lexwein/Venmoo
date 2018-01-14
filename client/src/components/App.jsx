import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';

import { response } from './../../../database/dummy-data.js';
import Login from './Login.jsx';
import Main from './Main.jsx';
import ProfilePage from './ProfilePage.jsx';
import VenmooTitle from './VenmooTitle.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToProfilePage: false,
      user: {},
      transactionHist: [],
    };
    this.renderUser = this.renderUser.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  updateState() {
    axios.get(`/user/${this.state.user.id}`)
      .then((data) => {
        this.setState({
          user: data.data.user,
          transactionHist: data.data.transactions,
        });
      })
      .catch(console.log);
  }


  renderUser(user, transactionHist) {
    this.setState({
      user,
      transactionHist,
      redirectToProfilePage: true,
    });
  }

  render() {
    return (
      <div className="appbody">
        <VenmooTitle />
        <Main
          user={this.state.user}
          transactionHist={this.state.transactionHist}
          renderUser={this.renderUser}
          redirectToProfilePage={this.state.redirectToProfilePage}
          updateState={this.updateState}
        />
      </div>
    );
  }
}

export default App;
