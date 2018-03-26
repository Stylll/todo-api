import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import Main from '../Main';
import TopBar from '../common/TopBar';
import TextInput from '../common/TextInput';
import { validateResetPasswordInput } from '../../utils/validateInput';
import { resetPassword } from '../../actions/authActions';
import Display from '../common/Display';

/*eslint-disable react/prefer-stateless-function */
class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

    // set initial state of the component
    this.state = {
      password: '',
      errors: {}
    };

    //bind functions to component
    this.handleChange = this.handleChange.bind(this);
    this.isValid = this.isValid.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * handles change event for input fields
   * @param {*} event 
   */
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * validates the form before posting to reset password
   */
  isValid() {
    const { isValid, errors } = validateResetPasswordInput(this.state);
    this.setState({
      errors
    });
    return isValid;
  }

  /**
   * Handles form submission
   * validats form before submission
   * @param {*} event 
   */
  handleSubmit(event) {
    event.preventDefault();
    const resetDetails = {
      token: this.props.match.params.token,
      password: this.state.password
    };
    if (this.isValid()) {
      this.props.actions.resetPassword(resetDetails);
      this.setState({
        errors: {}
      });
    }
  }


  render() {
    const title = 'Reset password';
    const currDate = (new Date()).toString();
    return (
      <Main allowAnonymous >
        <TopBar title={title} date={currDate} />
        {/*Content Starts here*/}
        <Display check={!this.props.isPasswordReset}>
          <div className="white">
            <br />
            <div className="container">
              <div>
                <h4 className="secondary-text-color">Please enter your new password below.</h4>
              </div>

              <div className="container">
                <form>
                  <TextInput
                    name="password"
                    type="password"
                    value={this.state.password}
                    placeholder="Enter password here..."
                    onChange={this.handleChange}
                    error={this.state.errors.password}
                  />

                  <div className="row">
                    <div className="col s12 m12 l12 xl2">
                      <button type="button" onClick={this.handleSubmit} value="Save" className="btn waves-effect waves-light btn-secondary">
                        Reset Password
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Display>
        <Display check={this.props.isPasswordReset}>
          <div className="white">
            <br />
            <div className="container">
              <div>
                <h4 className="secondary-text-color">Hurray !. Password reset was successful.</h4>
                <h5><NavLink to="/login">Click here</NavLink> to login with your new password.</h5>
              </div>
            </div>
          </div>
        </Display>
      </Main>
    );
  }
}

// prop types
ResetPassword.propTypes = {
  isPasswordReset: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

/**
 * Maps a portion of the state to the component
 * @param {*} state 
 */
const mapStateToProps = state => ({
  isPasswordReset: state.auth.isPasswordReset
});

/**
 * Maps actions to component's props
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ resetPassword }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
