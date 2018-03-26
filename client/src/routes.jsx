import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Main from './components/Main';
import Dummy from './components/dummy';
import Login from './components/account/Login';
import Signup from './components/account/Signup';
import ForgotPassword from './components/account/ForgotPassword';
import ResetPassword from './components/account/ResetPassword';

export default (
  <div>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/dummy" component={Dummy} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/forgotpassword" component={ForgotPassword} />
      <Route path="/resetpassword/:token" component={ResetPassword} />
    </Switch>
  </div>
);