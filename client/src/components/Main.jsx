import 'babel-polyfill';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Redirect} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import LoadingBar from 'react-redux-loading-bar';
import NavBar from './common/NavBar';
import {logout} from '../actions/authActions';

/* eslint-disable react/prefer-stateless-function */
class Main extends React.Component {
  constructor(props) {
    super(props);

    //bind methods to component
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.actions.logout();
  }

  render() {
    
    /**
     * checks if page can be accessed by anonymous and not authenticated users.
     * if user is authenticated, it redirects to home page.
     */
    if(this.props.allowAnonymous && !this.props.allowAuthenticated) {
      if (this.props.isAuthenticated) {
        return (
          <Redirect to="/home" />
        );
      }
    }
    /**
     * checks if page cannot be accessed by anonymous but can be accessed authenticated users.
     * if user is not authenticated, it redirects to login page.
     */
    if(!this.props.allowAnonymous && this.props.allowAuthenticated) {
      if (!this.props.isAuthenticated) {
        return (
          <Redirect to="/login" />
        );
      }
    }
    /**
     * checks if page cannot be accessed by anonymous or authenticated users.
     * it redirects to login page.
     */ 
    if (!this.props.allowAnonymous && !this.props.allowAuthenticated) {
        return (
          <Redirect to="/login" />
        );
    } 

    /**
     * Handles output rendered by the component.
     * @returns {jsx} form of the component.
     */
    return (
      <div className="primary-bg-color">
        <LoadingBar className="loadingBar" />
        <ToastContainer autoClose={10000} />
        <NavBar authenticated={this.props.isAuthenticated} logout={this.logout} />
        {this.props.children}
      </div>
    );
  }
}

// proptypes
Main.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  allowAnonymous: PropTypes.bool,
  allowAuthenticated: PropTypes.bool
};

// default proptypes
Main.defaultProps = {
  allowAnonymous: false,
  allowAuthenticated: false
};

/**
 * Adds a portion of the state to props
 * @param {*} state 
 */
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

/**
 * Adds a portion of the actions for dispatch to props
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({logout}, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);