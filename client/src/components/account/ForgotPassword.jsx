import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Main from '../Main';
import { forgotPassword } from '../../actions/authActions';
import TopBar from '../common/TopBar';
import TextInput from '../common/TextInput';
import { validateForgetPasswordInput } from '../../utils/validateInput';
import Display from '../common/Display';

/* eslint-disable react/prefer-stateless-function */
class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    // set the state
    this.state = {
      email: '',
      errors: {}
    };

    // bind the functions to the component
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
    const { isValid, errors } = validateForgetPasswordInput(this.state);
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
    if (this.isValid()) {
      this.props.actions.forgotPassword(this.state);
      this.setState({
        errors: {}
      });
    }
  }

  /**
   * Renders component into the interface
   */
  render() {
    const title = 'Having issues logging in ?.';
    const currDate = (new Date());
    return (
      <Main allowAnonymous>
        <TopBar title={title} date={currDate} />
        {/*Content Starts Here */}
        <div className="white">
          <br />
          <Display check={!this.props.isResetMailSent}>
            <div className="container">
              <div>
                <h4 className="secondary-text-color">Enter your email address below so we can send you a reset token.</h4>
              </div>
              <div className="container">
                <form>
                  <TextInput
                    name="email"
                    value={this.state.email}
                    type="email"
                    placeholder="username@company.com..."
                    onChange={this.handleChange}
                    error={this.state.errors.email}
                  />
                  <div className="row">
                    <div className="col s12 m12 l12 xl2">
                      <button onClick={this.handleSubmit} type="button" className="btn waves-effect waves-light btn-secondary">
                        Send
                      </button>
                    </div>
                  </div>
                </form>
              </div>

            </div>
          </Display>
          <Display check={this.props.isResetMailSent}>
            <div className="container">
              <h4 className="secondary-text-color">A reset link has been sent to your email.</h4>
              <h5>Check your email for further instructions.</h5>
            </div>
          </Display>
        </div>
      </Main>
    );
  }
}

//prop types
ForgotPassword.propTypes = {
  isResetMailSent: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

/**
 * Maps a portion of the state to the component
 * @param {*} state 
 */
const mapStateToProps = state => ({
  isResetMailSent: state.auth.isResetMailSent
});

/**
 * Maps actions to component's props
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ forgotPassword }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);