import {isEmpty, trim} from 'lodash';
import validator from 'validator';
/**
 * Validates form input
 */

/**
 * validates the login input
 * @param {state} 
 * @returns {object} returns errors and isValid status
 */
const validateLoginInput = state => {
  const errors = {};

  if (trim(state.email).length === 0) {
    errors.email = 'Email is required.';
  }
  if (trim(state.password).length === 0) {
    errors.password = 'Password is required.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

/**
 * validates the signup input
 * @param {state} 
 * @returns {object} returns errors and isValid status
 */
const validateSignupInput = state => {
  const errors = {};
  if(trim(state.username).length === 0) {
    errors.username = 'Username is required.';
  }
  if(trim(state.email).length === 0) {
    errors.email = 'Email is required';
  }
  else if(!validator.isEmail(trim(state.email))) {
    errors.email = 'Email format is incorrect';
  }
  
  if(trim(state.password).length === 0) {
    errors.password = 'Password is required';
  }

  return {
    isValid: isEmpty(errors),
    errors
  };
};

/**
 * validates the forget password form input
 * @param {state} 
 * @returns {object} returns errors and isValid status
 */
const validateForgetPasswordInput = state => {
  const errors = {};
  if (trim(state.email).length === 0) {
    errors.email = 'Email is required.';
  } else if (!validator.isEmail(trim(state.email))) {
    errors.email = 'please enter a valid email.';
  }
  return {
    isValid: isEmpty(errors),
    errors
  };
};

/**
 * validates the reset password form input
 * @param {state} 
 * @returns {object} returns errors and isValid status
 */
const validateResetPasswordInput = state => {
  const errors = {};
  if(trim(state.password).length === 0) {
    errors.password = 'A new password is required.';
  }

  return {
    isValid: isEmpty(errors),
    errors
  };
};

/**
 * validates the title input of the edit todo page
 * @param {*} state 
 * @returns {object} returns errors and isValid status
 */
const validateTodoInput = state => {
  const errors = {};
  if(trim(state.title).length === 0) {
    errors.title = 'Todo title is required.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

/**
 * validates the title input of the edit todo item page
 * @param {*} state 
 * @returns {object} returns errors and isValid status
 */
const validateTodoItemInput = state => {
  const errors = {};
  if(trim(state.content).length === 0) {
    errors.content = 'Item content is required.';
  }

  return {
    isValid: isEmpty(errors),
    errors
  };
};

export {
  validateLoginInput,
  validateSignupInput,
  validateForgetPasswordInput,
  validateResetPasswordInput,
  validateTodoInput,
  validateTodoItemInput
};
