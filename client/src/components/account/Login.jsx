import 'babel-polyfill';
import React from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import AccountMaster from '../common/AccountMaster';
import TextInput from '../common/TextInput';
import {validateLoginInput} from '../../utils/validateInput';
import { login } from '../../actions/authActions';


/* eslint-disable react/prefer-stateless-function */

class Login extends React.Component {
  constructor(props) {
    super(props);
    // set state for login management
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    // bind all methods used in the component
    this.handleChange = this.handleChange.bind(this);
    this.isValid = this.isValid.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Handles the value change event of the input
   * @param {*} event 
   * sets state with current value
   */
  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * Validates the login input
   * @returns {true | false}
   * sets error state
   */
  isValid() {
    const {errors, isValid} = validateLoginInput(this.state);
    this.setState({errors});
    return isValid;
  }

  /**
   * handles login form submission
   * validates user inputs
   * @returns {void}
   */
  handleSubmit(event) {
    event.preventDefault();
    if(this.isValid()) {
      this.props.actions.login(this.state);
    }
  }

  /**
   * Handles output rendered to the interface
   * @returns {jsx} form of the component
   */
  render() {
    // redirect to user page is authenticated
    if (this.props.isAuthenticated) {
      return (
        <Redirect to="/home" />
      );
    }
    return (
      <AccountMaster>
        <div className="container white content-form">
          <br />
          <h6 className="secondary-text-color center">LOGIN TO YOUR ACCOUNT</h6>
          <div className="row no-margin">
            <form className="col s12">
              <TextInput
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
                label="email"
                error={this.state.errors.email} />

              <TextInput
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
                label="password"
                error={this.state.errors.password} />
              
              <div className="row">
                <div className="input-field col s12">
                  <NavLink to="/forgotPassword" className="primary-text-color right">forgot password ?</NavLink>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <div className="row">
                    <div className="col s12 m4 l4 xl4 center">
                      <button onClick={this.handleSubmit} type="button" className="btn waves-effect waves-light btn-secondary">
                        Login
                        <i className="material-icons right">send</i>
                      </button>
                    </div>
                    <div className="col s12 m8 l8 xl8">
                      <NavLink to="/Signup" className="primary-text-color">
                      Dont have an account ?. Click here to signup.
                      </NavLink>
                    </div>
                  </div>

                </div>
              </div>
            </form>
          </div>
        </div>
      </AccountMaster>
    );
  }
}

// set proptypes
Login.propTypes = {
  actions: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

/**
 * Maps a portion of the state to props for access
 * @param {object} state 
 * @returns {object} props retrieved from state
 */
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

/**
 * Maps actions for component
 * @param {*} dispatch 
 * @returns {object} actions retrieved from redux actions
 */
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({login}, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);