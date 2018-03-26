import { showLoading, hideLoading } from 'react-redux-loading-bar';
import * as types from './actionTypes';

/**
 * Action to initiate the loading bar.
 * Dispatches showLoading
 */
export const startLoading = () => dispatch => dispatch(showLoading());

/**
 * Action to stop the loading bar
 * Dispatches hideLoading
 */
export const stopLoading = () => dispatch => dispatch(hideLoading());
