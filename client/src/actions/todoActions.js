import axios from 'axios';
import { toast } from 'react-toastify';
import * as types from './actionTypes';
import api from '../utils/api';
import {startLoading, stopLoading} from './loadingAction';

/**
 * Actions for managing Todos
 */

 /**
  * Action to get list of Todo from api
  * @param {object} querystring object
  * @returns {function} dispatch function
  */
export const getTodo = params => {
  return dispatch => {
    dispatch(startLoading());
    return axios.get(api.todo.get, {
      params: params
    }).then((resp) => {
      dispatch(stopLoading());
      dispatch(getTodoSuccess(resp.data));
    }).catch((err) => {
      dispatch(stopLoading());
      dispatch(getTodoFailed(err.response.data.message));
    })
  };
};

/**
 * Action to handle successful todo api get call
 * @param {array} todoList 
 * @returns {object} containing action type and payload
 */
export const getTodoSuccess = todos => {
  return {type: types.GET_TODO_SUCCESS, todos };
};

/**
 * Action to handle errors when requesting Todo list from api
 * @param {String} message 
 * displays toast message of the error encountered
 * @returns {object} containing action type
 */
export const getTodoFailed = message => {
  toast.error(message);
  return {
    type: types.GET_TODO_FAILED
  };
};

/**
 * Action to handling creating and updating todo
 * @param {*} todo 
 * @returns {func} dispatch function to handle success / error
 */
export const saveTodo = todo => {
  return dispatch => {
    dispatch(startLoading());
    if (todo.id) {
      //means the todo already exists. We are trying to update it
      return axios.put(`${api.todo.update}/${todo.id}`, todo)
        .then((resp) => {
          dispatch(stopLoading());
          dispatch(saveTodoSuccess(resp.data));
        })
        .catch((err) => {
          dispatch(stopLoading());
          dispatch(saveTodoFailed(err.response.data.message));
        });
    }
    else {
      //means we are creating a new todo
      return axios.post(api.todo.create, todo)
        .then((resp) => {
          dispatch(stopLoading());
          dispatch(saveTodoSuccess(resp.data));
        })
        .catch((err) => {
          dispatch(stopLoading());
          dispatch(saveTodoFailed(err.response.data.message));
        });

    }
  };
};

/**
 * Action to handle successful todo save api call
 * @param {*} todo 
 * @returns {obj} object for reducers
 */
export const saveTodoSuccess = todo => {
  toast.success('Todo Saved');
  return {type: types.SAVE_TODO_SUCCESS, todo};
};

/**
 * Action to handle failed todo save api call
 * @param {*} message 
 * @returns {obj} object for reducers
 */
export const saveTodoFailed = message => {
  toast.error(message);
  return {type: types.SAVE_TODO_FAILED};
};

/**
 * Action to handle deletion of todo
 * @param {*} todo
 * @returns {func} dispatch function
 */
export const deleteTodo = todo => {
  return dispatch => {
    dispatch(startLoading());
    return axios.delete(`${api.todo.delete}/${todo.id}`)
      .then((resp) => {
        dispatch(stopLoading());
        dispatch(deleteTodoSuccess());
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(deleteTodoFailed(err.response.data.message));
      });
  };
};

/**
 * Action to handle successful deletion of a todo
 * @returns {obj} object for reducers
 */
export const deleteTodoSuccess = () => {
  toast.success('Todo Deleted');
  return {type: types.DELETE_TODO_SUCCESS};
};

/**
 * Action to handle failed deletion of a todo
 * @returns {obj} object for reducers
 */
export const deleteTodoFailed = message => {
  toast.error(message);
  return {type: types.DELETE_TODO_FAILED};
};