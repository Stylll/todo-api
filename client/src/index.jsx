import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, browserHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import {toast, ToastContainer} from 'react-toastify';
import jwt from 'jsonwebtoken';
import routes from '../src/routes';
import configureStore from './store/configureStore';
import {loginSuccess} from './actions/authActions';
import {getTodo} from './actions/todoActions';
import setAuthorizationToken from './utils/setAuthorizationToken';
import '../../node_modules/materialize-css/dist/css/materialize.min.css';
import './styles/style.css';
import '../../node_modules/jquery/dist/jquery.min';
import '../../node_modules/materialize-css/dist/js/materialize.min';

const store = configureStore();

// if token exists then log user in
if(localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(loginSuccess(jwt.decode(localStorage.jwtToken).user));
  store.dispatch(getTodo());
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app')
);