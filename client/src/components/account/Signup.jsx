import React from 'react';
import PropTypes from 'prop-types';
import {NavLink, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AccountMaster from '../common/AccountMaster';
import TextInput from '../common/TextInput';
import {validateSignupInput} from '../../utils/validateInput';
import {signup} from '../../actions/authActions';

/* eslint-disable react/prefer-stateless-function */

class Signup extends React.Component {
  constructor(props) {
    super(props);

    //set state
    this.state = {
      email: '',
      username: '',
      password: '',
      errors: {}
    };

    //bind functions to component
    this.handleChange = this.handleChange.bind(this);
    this.isValid = this.isValid.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * handles change event of textinput
   * sets the state value for the textinput
   * @param {*} event 
   */
  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * Validates the signup form
   * updates state with error details
   * @returns {object} isValid object stating true | false
   */
  isValid(){
    const {errors, isValid} = validateSignupInput(this.state);
    this.setState({
      errors
    });
    return isValid;
  }

  /**
   * handles signup form submission
   * validates user inputs
   * @returns {void}
   */  
  handleSubmit(event){
    event.preventDefault();
    if(this.isValid()){
      this.props.actions.signup(this.state);
    }
  }

  render() {
    if(this.props.isAuthenticated) {
      return (
        <Redirect to="/home" />
      );
    }
    return (
      <AccountMaster>
        <div className="container white content-form">
          <br />
          <h6 className="secondary-text-color center">CREATE AN ACCOUNT</h6>
          <div className="row no-margin">
            <form className="col s12 m12 l12">
              <TextInput
                name="username"
                value={this.state.username}
                type="text"
                label="username"
                onChange={this.handleChange}
                error={this.state.errors.username} />

              <TextInput
                name="email"
                value={this.state.email}
                type="email"
                label="email"
                onChange={this.handleChange}
                error={this.state.errors.email} />

              <TextInput
                name="password"
                value={this.state.password}
                type="password"
                label="password"
                onChange={this.handleChange}
                error={this.state.errors.password} />

              <div className="row">
                <div className="col s12">
                  <div className="row">
                    <div className="col s12 m4 l4 xl4 center">
                      <button onClick={this.handleSubmit} className="btn waves-effect waves-light btn-secondary" type="button">
                        Sign Up
                        <i className="material-icons right">send</i>
                      </button>
                    </div>
                    <div className="col s12 m8 l8 xl8">
                      <NavLink to="/login" className="primary-text-color">
                        Already have an account ?. Click here to log in.
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

// set prop types
Signup.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

/**
 * Maps a portion of the state to props for access
 * @param {object} state 
 * @returns {object} props retrieved from state
 */
const mapStateToProps = state => (
  {isAuthenticated: state.auth.isAuthenticated}
);

/**
 * Maps actions for component
 * @param {*} dispatch 
 * @returns {object} actions retrieved from redux actions
 */
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({signup}, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);