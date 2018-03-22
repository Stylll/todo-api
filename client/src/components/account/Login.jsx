import 'babel-polyfill';
import React from 'react';
import AccountMaster from '../common/AccountMaster';

/* eslint-disable react/prefer-stateless-function */

class Login extends React.Component {
  render() {
    return (
      <AccountMaster>
        <div>
          <h1>Login page</h1>
        </div>
      </AccountMaster>
    );
  }
}

export default Login;