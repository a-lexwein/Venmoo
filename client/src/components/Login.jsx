import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import jquery from 'jquery';
import Axios from 'axios';

import ProfilePage from './ProfilePage.jsx';

class Login extends React.Component {
  constructor(props) {
    super(props);
    console.log('login: ', props);
    this.state = {
      redirectToProfilePage: props.redirectToProfilePage,
      username: '',
      password: '',
    };
    console.log(this.state);
  }

  postRequest(username, password) {
    Axios.post('/profilepage', {
      username,
      password,
    })
      .then((res) => {
        console.log('data: ', res.data);
        this.props.renderUser(res.data.user, res.data.transactions);
      })
      .catch(err => console.error(err));
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault()
    this.postRequest(this.state.username, this.state.password);
  }

  render() {

    return (<div id="contentLogin">
        <div>
          <form>
            <div>
              <br />
              <br />
              <br />
              <label>Username:</label>
              <input type="text" onChange={this.handleUsernameChange.bind(this)} name="username" />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" onChange={this.handlePasswordChange.bind(this)} name="password" />
            </div>
            <div>
              
                <input className="loginButton" type="submit" onClick={this.handleSubmit.bind(this)} value="Log In" />
              
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <Link to="/signup">
                <input className="loginButton" type="submit" value="No Account? Sign Up Here" />
              </Link>
            </div>
          </form>
        </div>
      </div>);
  }
}


export default Login;
