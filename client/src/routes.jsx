import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Main from './components/Main';
import Dummy from './components/dummy';
import Login from './components/account/Login';

export default (
  <div>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/dummy" component={Dummy} />
      <Route path="/Login" component={Login} />
    </Switch>
  </div>
);