import axios from 'axios';
import { toast } from 'react-toastify';
import * as types from './actionTypes';
import api from '../utils/api';
import {startLoading, stopLoading} from './loadingAction';

/**
 * Actions to manage todo items
 */

 /**
  * Action to retrieve todo items
  * @param {object} querystring {todoId: 1}
  * @returns {function} dispatch function
  */
export const getTodoItems = param => {
  return dispatch => {
    dispatch(startLoading());
    return axios.get(api.todoItem.get(param.todoId))
      .then((resp) => {
        dispatch(stopLoading());
        dispatch(getTodoItemSuccess(resp.data));
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getTodoItemsFailed(err.response.data.message));
      });
  };
};

/**
 * Action to handle successful todo item api get call
 * @param {array} items 
 * @returns {object} containing action type and payload
 */
export const getTodoItemSuccess = items => {
  return {type: types.GET_TODOITEMS_SUCCESS, items};
};

/**
 * Action to handle failed todo item api get call
 * @param {string} error message 
 * @returns {object} containing action type and payload
 */
export const getTodoItemsFailed = message => {
  toast.error(message);
  return {type: types.GET_TODOITEMS_FAILED};
};

/**
  * Action to save todo items
  * @param {item} querystring & item object
  * @returns {function} dispatch function
  */
export const saveTodoItem = item => {
  return dispatch => {
    dispatch(startLoading());
    if(item.id){
      // means we are trying to update an item
      return axios.put(api.todoItem.update(item.todoId, item.id), item)
        .then((resp) => {
          dispatch(stopLoading());
          dispatch(saveTodoItemSuccess());
        })
        .catch((err) => {
          dispatch(stopLoading());
          dispatch(saveTodoItemFailed(err.response.data.message));
        });
    }
    else {
      // means we are saving a new item
      return axios.post(api.todoItem.create(item.todoId), item)
        .then((resp) => {
          dispatch(stopLoading());
          dispatch(saveTodoItemSuccess());
        })
        .catch((err) => {
          dispatch(stopLoading());
          dispatch(saveTodoItemFailed(err.response.data.message));
        });
    }
  };
};

/**
 * Action to handle successful todo item api post/put call
 * 
 * @returns {object} containing action type
 */
export const saveTodoItemSuccess = () => {
  return {type: types.SAVE_TODOITEMS_SUCCESS};
};

/**
 * Action to handle failed todo item api post/put call
 * @param {string} error message 
 * @returns {object} containing action type
 */
export const saveTodoItemFailed = message => {
  toast.error(message);
  return {type: types.SAVE_TODOITEMS_FAILED};
};

/**
  * Action to delete todo items
  * @param {item} querystring containing todoId & itemId
  * @returns {function} dispatch function
  */
export const deleteTodoItem = item => {
  return dispatch => {
    dispatch(startLoading());
    return axios.delete(api.todoItem.delete(item.todoId, item.id))
      .then((resp) => {
        dispatch(stopLoading());
        dispatch(deleteTodoItemSuccess());
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(deleteTodoItemFailed(err.response.data.message));
      });
  }
};

/**
 * Action to handle successful todo item api delete call
 * 
 * @returns {object} containing action type
 */
export const deleteTodoItemSuccess = () => {
  return {type: types.DELETE_TODOITEMS_SUCCESS};
};

/**
 * Action to handle failed todo item api delete call
 * @param {string} error message 
 * @returns {object} containing action type
 */
export const deleteTodoItemFailed = message => {
  toast.error(message);
  return {type: types.DELETE_TODOITEMS_FAILED};
};