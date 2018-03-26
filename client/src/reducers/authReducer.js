import initialState from './initialState';
import * as types from '../actions/actionTypes';

const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.user,
        isResetMailSent: false,
        isPasswordReset: false
      };

    case types.LOGIN_FAILED:
      return state;

    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.user,
        isResetMailSent: false,
        isPasswordReset: false
      };

    case types.SIGNUP_FAILED:
      return state;

    case types.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        currentUser: {},
        isResetMailSent: false,
        isPasswordReset: false
      };

    case types.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isResetMailSent: true,
        isPasswordReset: false
      };

    case types.FORGOT_PASSWORD_FAILED:
      return state;

    case types.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isResetMailSent: false,
        isPasswordReset: true
      };

    case types.RESET_PASSWORD_FAILED:
      return state;

    default:
      return state;
  }
};

export default authReducer;
