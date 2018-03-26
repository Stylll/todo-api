import axios from 'axios';
import {
  toast
} from 'react-toastify';
import * as types from './actionTypes';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import {
  startLoading,
  stopLoading
} from './loadingAction';
import api from '../utils/api';

/**
 * Actions for authenticating users
 */
export const login = loginDetails => {
  //call api to login
  return function (dispatch) {
    dispatch(startLoading());
    return axios.post(api.user.signIn, loginDetails)
      .then((resp) => {
        localStorage.setItem('jwtToken', resp.data.token);
        setAuthorizationToken(resp.data.token);
        dispatch(loginSuccess(resp.data.user));
        dispatch(stopLoading());
      })
      .catch((err) => {
        dispatch(loginFailed(err.response.data.message));
        dispatch(stopLoading());
      });
  };
};

export const loginSuccess = user => {
  toast.success('Welcome back.');
  return {
    type: types.LOGIN_SUCCESS,
    user
  };
};

export const loginFailed = errorMessage => {
  toast.error(errorMessage);
  return {
    type: types.LOGIN_FAILED
  };
};

export const signup = signupDetails => {
  return function (dispatch) {
    dispatch(startLoading());
    return axios.post(api.user.signUp, signupDetails)
      .then((resp) => {
        localStorage.setItem('jwtToken', resp.data.token);
        setAuthorizationToken(resp.data.token);
        dispatch(stopLoading());
        dispatch(signupSuccess(resp.data.user));
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(signupFailed(err.response.data.message));
      });
  };
};

export const signupSuccess = user => {
  toast.success('Welcome');
  return {
    type: types.SIGNUP_SUCCESS,
    user
  };
};

export const signupFailed = errorMessage => {
  toast.error(errorMessage);
  return {
    type: types.SIGNUP_FAILED
  };
};

export const logout = () => {
  localStorage.removeItem('jwtToken');
  setAuthorizationToken(false);
  return {
    type: types.LOGOUT
  };
};

export const forgotPassword = (emailObject) => {
  return dispatch => {
    dispatch(startLoading());
    return axios.put(api.user.forgotPassword, emailObject)
      .then((resp) => {
        dispatch(stopLoading());
        dispatch(forgotPasswordSuccess(resp.data.message));
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(forgotPasswordFailed(err.response.data.message));
      });
  };
};

export const forgotPasswordSuccess = (message) => {
  toast.success('Reset token Sent.');
  return {
    type: types.FORGOT_PASSWORD_SUCCESS
  };
};

export const forgotPasswordFailed = (message) => {
  toast.error(message);
  return {
    type: types.FORGOT_PASSWORD_FAILED
  };
};

export const resetPassword = (resetDetails) => {
  return dispatch => {
    dispatch(startLoading());
    return axios.put(`${api.user.resetPassword}/${resetDetails.token}`, resetDetails)
      .then((resp) => {
        dispatch(stopLoading());
        dispatch(resetPasswordSuccess());
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(resetPasswordFailed(err.response.data.message));
      });
  }
};

export const resetPasswordSuccess = () => {
  toast.success('Password Reset Successful');
  return {
    type: types.RESET_PASSWORD_SUCCESS
  };
};

export const resetPasswordFailed = message => {
  toast.error(message);
  return {
    type: types.RESET_PASSWORD_FAILED
  };
};
