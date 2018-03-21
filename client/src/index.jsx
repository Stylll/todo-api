import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, browserHistory} from 'react-router-dom';
import routes from '../src/routes';
import './styles/style.css';
import '../../node_modules/materialize-css/dist/css/materialize.min.css';
import '../../node_modules/jquery/dist/jquery.min';
import '../../node_modules/materialize-css/dist/js/materialize.min';

render(
  <Router history={browserHistory}>
    {routes}
  </Router> , 
  document.getElementById('app')
);