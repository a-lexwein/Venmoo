import React from 'react';
import { Link } from 'react-router-dom';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
    <div id="contentSignUp">
      <div>
        <form action="/signup" method="post">
          <div>
            <label>Choose a username:</label>
            <input type="text" name="username" />
          </div>
          <div>
            <label>Choose a password:</label>
            <input type="password" name="password" />
          </div>
          <div>
            <label>Confirm password:</label>
            <input type="password" name="password" />
          </div>
          <div>
            <label>Email:</label>
            <br/>
            <input type="password" name="password" />
          </div>
          <div>
            <label>Credit Card Number:</label>
            <br/>
            <input type="password" name="password" />
          </div>
          <div>
            <label>CVV:</label>
            <br/>
            <input type="password" name="password" />
          </div>
          <div>
            <label>expiration date:</label>
            <br/>
            <input type="password" name="password" />
          </div>
          <div>
            <br/>
            <Link to="/profilepage">
              <input type="submit" value="Sign up!" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
  }
}

export default SignUp;
