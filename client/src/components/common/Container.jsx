import 'babel-polyfill';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreator} from 'redux';

/* eslint-disable react/prefer-stateless-function */
class Container extends React.Component {

  render() {
    return(
      <div>
        {/*Content goes here */}
        {this.props.children}
      </div>
    );
  }
}

