import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Main from './components/Main';
import Dummy from './components/dummy';
import Login from './components/account/Login';
import Signup from './components/account/Signup';
import ForgotPassword from './components/account/ForgotPassword';
import ResetPassword from './components/account/ResetPassword';
import Slate from './components/slate/Slate';
import EditSlate from './components/slate/EditSlate';
import SlateItem from './components/slateItem/SlateItem';
import EditSlateItem from './components/slateItem/EditSlateItem';

export default (
  <div>
    <Switch>
      <Route exact path="/" component={Slate} />
      <Route path="/dummy" component={Dummy} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/forgotpassword" component={ForgotPassword} />
      <Route path="/resetpassword/:token" component={ResetPassword} />
      <Route exact path="/edit" component={EditSlate} />
      <Route path="/edit/:id" component={EditSlate} />
      <Route exact path="/item/:todoId" component={SlateItem} />
      <Route exact path="/item/:todoId/edit/:id" component={EditSlateItem} />
      <Route exact path="/item/:todoId/edit" component={EditSlateItem} />
    </Switch>
  </div>
);