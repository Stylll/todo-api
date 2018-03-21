import 'babel-polyfill';
import React from 'react';
import NavBar from './common/NavBar';

/* eslint-disable react/prefer-stateless-function */
class Main extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        This is the master page
      </div>
    );
  }
}

export default Main;